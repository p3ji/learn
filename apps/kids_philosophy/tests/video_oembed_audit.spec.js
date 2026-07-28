const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

/**
 * Audits the videos the app ACTUALLY ships.
 *
 * The previous version of this file restated video IDs by hand and drifted badly:
 * it audited 25 IDs of which only 7 were still in the app, so it passed green
 * while over half the shipped videos were dead. IDs are now read out of the live
 * data at runtime, which makes that class of drift impossible.
 *
 * Note: the data objects are declared with `const` at script top level, so they
 * are globals but NOT properties of `window` - they must be referenced bare.
 */

async function shippedVideos(page) {
    await page.goto(indexPath);
    await page.waitForFunction(() => typeof thinkersData !== 'undefined');

    return page.evaluate(() => {
        const out = [];
        if (typeof thinkersData !== 'undefined') {
            thinkersData.forEach(t => {
                if (t.videoId) out.push({ source: 'thinkers', id: t.id, name: t.name, videoId: t.videoId });
            });
        }
        if (typeof mentalModelsData !== 'undefined') {
            Object.values(mentalModelsData).forEach(m => {
                if (m.videoId) out.push({ source: 'mental_models', id: m.id, name: m.name, videoId: m.videoId });
            });
        }
        if (typeof experimentData !== 'undefined') {
            Object.values(experimentData).forEach(e => {
                if (e.videoId) out.push({ source: 'experiments', id: e.id, name: e.name, videoId: e.videoId });
            });
        }
        return out;
    });
}

async function oembed(request, videoId) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await request.get(url, { timeout: 20000, failOnStatusCode: false });
    return res.ok() ? { ok: true, meta: await res.json() } : { ok: false, status: res.status() };
}

test.describe('Shipped video integrity', () => {

    test('video IDs can be read straight out of the shipped data', async ({ page }) => {
        const videos = await shippedVideos(page);
        expect(videos.length, 'no videoIds found - did the data objects stop being reachable?')
            .toBeGreaterThan(10);
    });

    test('every shipped video ID resolves on YouTube', async ({ page, request }) => {
        test.slow();
        const videos = await shippedVideos(page);
        const dead = [];

        for (const v of videos) {
            const result = await oembed(request, v.videoId);
            if (!result.ok) {
                dead.push(`${v.source}/${v.id} (${v.name}) -> ${v.videoId} [HTTP ${result.status}]`);
            }
        }

        expect(dead, `dead videos show a broken embed to a child:\n${dead.join('\n')}`).toEqual([]);
    });

    test('no video ID is reused across unrelated topics', async ({ page }) => {
        const videos = await shippedVideos(page);
        const byId = {};
        videos.forEach(v => { (byId[v.videoId] = byId[v.videoId] || []).push(`${v.source}/${v.id}`); });

        // Sharing an ID is legitimate only when one lesson genuinely covers both
        // topics. Listing those explicitly means any NEW reuse fails this test.
        const ALLOWED_REUSE = {
            'wf-sGqBsWv4': ['thinkers/popper', 'mental_models/black_swan'],   // falsification underpins both
            'dItUGF8GdTw': ['thinkers/mill', 'mental_models/inversion']       // general critical-thinking lesson
        };

        const offenders = Object.entries(byId)
            .filter(([, topics]) => topics.length > 1)
            .filter(([id, topics]) => {
                const allowed = ALLOWED_REUSE[id];
                return !allowed || topics.some(t => !allowed.includes(t));
            })
            .map(([id, topics]) => `${id} used by ${topics.join(', ')}`);

        expect(offenders, `same video served as different lessons:\n${offenders.join('\n')}`).toEqual([]);
    });

    test('embeds are privacy-hardened and external links are safe', async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
        await page.evaluate(() => { selectTopic('socrates', 'thinkers'); switchTopicTab(2); });

        const iframeSrc = await page.getAttribute('#topicTabContent2 iframe', 'src');
        expect(iframeSrc, 'use youtube-nocookie so the embed cannot set tracking cookies on a child')
            .toContain('youtube-nocookie.com');

        const rels = await page.$$eval('#topicTabContent2 a[target="_blank"]',
            els => els.map(e => e.getAttribute('rel') || ''));
        expect(rels.length, 'expected the "watch on YouTube" link').toBeGreaterThan(0);
        rels.forEach(rel => expect(rel).toContain('noopener'));
    });
});

const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

const NEW_THINKERS = ['buddha', 'zhuangzi', 'ibn_sina', 'zera_yacob', 'wollstonecraft', 'du_bois'];
// No age-appropriate video from a publisher worth trusting exists for these three.
const NO_VIDEO = ['zhuangzi', 'ibn_sina', 'zera_yacob'];

test.describe('New thinkers', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
    });

    test('the roster now covers the gaps it was missing', async ({ page }) => {
        const stats = await page.evaluate(() => ({
            count: thinkersData.length,
            eras: thinkersData.map(t => t.era).join(' ')
        }));
        expect(stats.count, 'roster size').toBe(17);
        // The 1,181-year hole between Hypatia (415) and Descartes (1596) is closed.
        expect(stats.eras, 'Ibn Sina fills the Islamic Golden Age').toMatch(/1037/);
        expect(stats.eras, 'Zera Yacob fills sub-Saharan Africa').toMatch(/1692/);
    });

    test('each new thinker has full content, not a stub', async ({ page }) => {
        const bad = await page.evaluate((ids) => {
            const out = [];
            ids.forEach(id => {
                const t = thinkersData.find(x => x.id === id);
                if (!t) { out.push(`${id}: missing`); return; }
                if (t.storyScenes.length !== 4) out.push(`${id}: ${t.storyScenes.length} scenes`);
                if (!t.p4cInquiry || !t.p4cInquiry.length) out.push(`${id}: no p4cInquiry`);
                if (!t.discussionPrompts || !t.discussionPrompts.length) out.push(`${id}: no discussionPrompts`);
                if (!t.vocabCards || t.vocabCards.length < 3) out.push(`${id}: thin vocab`);
                if (!t.caseStudies || !t.caseStudies.length) out.push(`${id}: no caseStudies`);
                t.storyScenes.forEach((s, i) => {
                    if (!s.factBox) out.push(`${id} scene ${i + 1}: no factBox`);
                    if (s.text.length < 150) out.push(`${id} scene ${i + 1}: text too short`);
                });
                const p = t.p4cInquiry[0].perspectives;
                if (!p.a || !p.b || !p.c) out.push(`${id}: fewer than 3 perspectives`);
            });
            return out;
        }, NEW_THINKERS);
        expect(bad).toEqual([]);
    });

    test('thinkers without a vetted video show an honest note, not a broken player', async ({ page }) => {
        const bad = await page.evaluate((ids) => {
            const out = [];
            ids.forEach(id => {
                selectTopic(id, 'thinkers');
                switchTopicTab(2);
                const panel = document.getElementById('topicTabContent2');
                if (panel.querySelector('iframe')) out.push(`${id}: rendered a player with no videoId`);
                if (!/No video for this thinker yet/i.test(panel.innerText)) out.push(`${id}: no explanation shown`);
            });
            return out;
        }, NO_VIDEO);
        expect(bad).toEqual([]);
    });

    test('no topic anywhere embeds an undefined video', async ({ page }) => {
        const bad = await page.evaluate(() => {
            const out = [];
            thinkersData.forEach(t => {
                selectTopic(t.id, 'thinkers');
                switchTopicTab(2);
                const html = document.getElementById('topicTabContent2').innerHTML;
                if (html.includes('embed/undefined') || html.includes('v=undefined')) out.push(t.id);
            });
            return out;
        });
        expect(bad).toEqual([]);
    });

    test('Zera Yacob has no portrait anywhere, and gives his own reason', async ({ page }) => {
        await page.evaluate(() => {
            selectTopic('zera_yacob', 'thinkers');
            for (let i = 0; i < 4; i++) changeStorySlide('zera_yacob', 1);
        });
        const panel = page.locator('#topicTabContent1');
        await expect(panel).toContainText('no picture of Zera Yacob');
        // His reason differs from Popper's: not copyright, simply never drawn.
        await expect(panel).not.toContainText('under copyright');
        expect(await panel.locator('img').count()).toBe(0);
    });

    test('every thinker avatar in the catalog is unique', async ({ page }) => {
        const dupes = await page.evaluate(() => {
            const seen = {}, out = [];
            TOPIC_CATALOG.thinkers.forEach(t => {
                if (seen[t.avatar]) out.push(`${t.avatar}: ${seen[t.avatar]} and ${t.id}`);
                seen[t.avatar] = t.id;
            });
            return out;
        });
        expect(dupes, 'two thinkers sharing an avatar').toEqual([]);
    });

    test('new thinkers connect to ones already in the app', async ({ page }) => {
        // The roster should read as a conversation, not a list.
        const links = await page.evaluate(() => {
            const pick = id => JSON.stringify(thinkersData.find(t => t.id === id));
            return {
                ibnSinaCitesDescartes: /Descartes/.test(pick('ibn_sina')),
                zhuangziCitesDescartes: /Descartes/.test(pick('zhuangzi')),
                zeraYacobCitesDescartes: /Descartes/.test(pick('zera_yacob')),
                wollstonecraftCitesKant: /Kant/.test(pick('wollstonecraft')),
                duBoisCitesSocrates: /Socrates/.test(pick('du_bois'))
            };
        });
        Object.entries(links).forEach(([k, v]) => expect(v, `${k} — cross-reference missing`).toBe(true));
    });
});

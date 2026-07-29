const { test, expect } = require('@playwright/test');

/**
 * Smoke test against the deployed GitHub Pages site, not the local files.
 * Run explicitly: npx playwright test live_smoke
 * Skipped by default so a network outage cannot fail the normal suite.
 */

const LIVE = 'https://p3ji.github.io/learn/apps/kids_philosophy/index.html';

test.describe('Deployed site', () => {
    test.skip(!process.env.CHECK_LIVE, 'set CHECK_LIVE=1 to run against production');

    test('the live app boots and renders a topic', async ({ page }) => {
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));

        await page.goto(LIVE, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => typeof selectTopic === 'function', { timeout: 15000 });

        await expect(page.locator('#unifiedFocusStage .spotlight-card')).toBeVisible();
        expect(errors, 'uncaught errors on the live site').toEqual([]);
    });

    test('the live app has this session\'s work', async ({ page }) => {
        await page.goto(LIVE, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => typeof selectTopic === 'function');

        const state = await page.evaluate(() => {
            selectTopic('lao_tzu', 'thinkers');
            const heading = document.querySelector('#unifiedFocusStage h2').innerText;
            const portrait = document.querySelector('#topicTabContent1 .story-scene-figure svg');
            selectTopic('monster_spotter', 'fallacies');
            return {
                laoTzuHeading: heading,
                hasPortrait: !!portrait,
                scenes: thinkersData.find(t => t.id === 'lao_tzu').storyScenes.length,
                fallacyCount: typeof fallacyScenarios !== 'undefined' ? fallacyScenarios.length : 0,
                monsterNames: typeof fallacyScenarios !== 'undefined'
                    ? fallacyScenarios.slice(0, 3).map(s => s.monster) : []
            };
        });

        expect(state.laoTzuHeading, 'lao_tzu id fix').toContain('Lao Tzu');
        expect(state.hasPortrait, 'SVG portraits deployed').toBe(true);
        expect(state.scenes, 'rewritten story scenes').toBe(4);
        expect(state.fallacyCount, 'rebuilt fallacy game').toBeGreaterThanOrEqual(25);
        state.monsterNames.forEach(n => expect(n.toLowerCase()).not.toContain('fallacy'));
    });

    test('the live videos all still resolve', async ({ page, request }) => {
        test.slow();
        await page.goto(LIVE, { waitUntil: 'networkidle' });
        await page.waitForFunction(() => typeof thinkersData !== 'undefined');

        const ids = await page.evaluate(() => {
            const out = new Set();
            thinkersData.forEach(t => t.videoId && out.add(t.videoId));
            Object.values(mentalModelsData).forEach(m => m.videoId && out.add(m.videoId));
            Object.values(experimentData).forEach(e => e.videoId && out.add(e.videoId));
            return [...out];
        });

        const dead = [];
        for (const id of ids) {
            const r = await request.get(
                `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
                { failOnStatusCode: false, timeout: 20000 });
            if (!r.ok()) dead.push(id);
        }
        expect(dead, 'dead videos on the live site').toEqual([]);
    });
});

const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

const THINKERS = ['socrates', 'hypatia', 'aristotle', 'aurelius', 'descartes', 'popper',
                  'mill', 'confucius', 'lao_tzu', 'kant', 'lovelace'];

test.describe('Thinker story scenes', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
    });

    test('every thinker has 4 substantial scenes, each with a fact box', async ({ page }) => {
        const bad = await page.evaluate((ids) => {
            const out = [];
            ids.forEach(id => {
                const t = thinkersData.find(x => x.id === id);
                if (!t) { out.push(`${id}: missing`); return; }
                if (t.storyScenes.length < 4) out.push(`${id}: only ${t.storyScenes.length} scenes`);
                t.storyScenes.forEach((s, i) => {
                    if (!s.factBox) out.push(`${id} scene ${i + 1}: no factBox`);
                    if (s.text.length < 150) out.push(`${id} scene ${i + 1}: text too short (${s.text.length})`);
                });
            });
            return out;
        }, THINKERS);
        expect(bad).toEqual([]);
    });

    test('every thinker renders a portrait with a real alt description', async ({ page }) => {
        const bad = await page.evaluate((ids) => {
            const out = [];
            ids.forEach(id => {
                selectTopic(id, 'thinkers');
                const svg = document.querySelector('#topicTabContent1 .story-scene-figure svg');
                if (!svg) { out.push(`${id}: no portrait`); return; }
                const label = svg.getAttribute('aria-label') || '';
                if (svg.getAttribute('role') !== 'img') out.push(`${id}: portrait not role=img`);
                if (label.length < 40) out.push(`${id}: alt too thin ("${label}")`);
            });
            return out;
        }, THINKERS);
        expect(bad).toEqual([]);
    });

    test('portraits are visually distinct from one another', async ({ page }) => {
        const sigs = await page.evaluate((ids) => ids.map(id => {
            selectTopic(id, 'thinkers');
            const svg = document.querySelector('#topicTabContent1 .story-scene-figure svg');
            return svg ? svg.outerHTML.length + ':' + (svg.getAttribute('aria-label') || '').slice(0, 24) : 'none';
        }), THINKERS);
        expect(new Set(sigs).size, 'duplicate or missing portraits').toBe(THINKERS.length);
    });

    test('the fact box is shown and read aloud with the scene', async ({ page }) => {
        await page.evaluate(() => selectTopic('lovelace', 'thinkers'));
        await expect(page.locator('#topicTabContent1')).toContainText('How we know');
        const readAloud = await page.getAttribute(
            '#topicTabContent1 button[onclick^="speakStoryText"]', 'onclick');
        expect(readAloud, 'read-aloud should include the fact box').toContain('How we know');
    });

    test('scenes advance through all four and the portrait persists', async ({ page }) => {
        await page.evaluate(() => selectTopic('confucius', 'thinkers'));
        for (let i = 1; i < 4; i++) {
            await page.evaluate(() => changeStorySlide('confucius', 1));
            await expect(page.locator('#topicTabContent1')).toContainText(`Story Scene ${i + 1} of 4`);
            expect(await page.locator('#topicTabContent1 .story-scene-figure svg').count()).toBe(1);
        }
    });
});

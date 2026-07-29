const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

const THINKERS = ['socrates', 'hypatia', 'aristotle', 'aurelius', 'descartes', 'popper',
                  'mill', 'confucius', 'lao_tzu', 'kant', 'lovelace',
                  'buddha', 'zhuangzi', 'ibn_sina', 'zera_yacob', 'wollstonecraft', 'du_bois'];

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

    test('scenes advance through the 4 authored scenes and the drawn portrait persists', async ({ page }) => {
        await page.evaluate(() => selectTopic('confucius', 'thinkers'));
        for (let i = 1; i < 4; i++) {
            await page.evaluate(() => changeStorySlide('confucius', 1));
            await expect(page.locator('#topicTabContent1')).toContainText(`Story Scene ${i + 1} of 5`);
            expect(await page.locator('#topicTabContent1 .story-scene-figure svg').count()).toBe(1);
        }
    });
});

test.describe('Real portrait slide (5th slide)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
    });

    test('every thinker with a real portrait entry shows a real image and a source link', async ({ page }) => {
        const WITH_PHOTO = THINKERS.filter(id => !['popper', 'zera_yacob'].includes(id));
        const bad = await page.evaluate((ids) => {
            const out = [];
            ids.forEach(id => {
                selectTopic(id, 'thinkers');
                // Scene count is always 4 for the authored story; the photo is slide index 4 (5th).
                for (let i = 0; i < 4; i++) changeStorySlide(id, 1);
                const img = document.querySelector('#topicTabContent1 img');
                const link = document.querySelector('#topicTabContent1 a[href*="wikimedia.org"]');
                if (!img) out.push(`${id}: no <img> on the photo slide`);
                else if (!img.getAttribute('src')) out.push(`${id}: <img> has no src`);
                if (!link) out.push(`${id}: no Wikimedia Commons source link`);
                else if (link.getAttribute('rel') !== 'noopener noreferrer') out.push(`${id}: source link missing rel=noopener`);
            });
            return out;
        }, WITH_PHOTO);
        expect(bad).toEqual([]);
    });

    test('every portrait image file actually exists and is non-empty', async ({ page }) => {
        const files = await page.evaluate(() =>
            Object.values(PORTRAIT_PHOTOS).filter(p => p.file).map(p => p.file));
        expect(files.length).toBeGreaterThanOrEqual(10);

        // Local files, not served over HTTP - check directly on disk rather than
        // through Playwright's request API, which doesn't handle file:// URLs.
        const fs = require('fs');
        for (const rel of files) {
            const abs = path.resolve(__dirname, '..', rel);
            expect(fs.existsSync(abs), `${rel} should exist on disk`).toBe(true);
            expect(fs.statSync(abs).size, `${rel} should not be empty`).toBeGreaterThan(1000);
        }
    });

    test('Popper explains why no photo exists, instead of silently differing', async ({ page }) => {
        await page.evaluate(() => { selectTopic('popper', 'thinkers'); for (let i = 0; i < 4; i++) changeStorySlide('popper', 1); });
        const panel = page.locator('#topicTabContent1');
        await expect(panel).toContainText('Why No Photo?');
        await expect(panel).toContainText('still under copyright');
        // Popper's slide falls back to the drawn SVG, not a broken <img>.
        expect(await panel.locator('img').count()).toBe(0);
        expect(await panel.locator('svg').count()).toBe(1);
    });

    test('captions are honest about lifetime vs. later imagining', async ({ page }) => {
        const bad = await page.evaluate(() => {
            const out = [];
            Object.entries(PORTRAIT_PHOTOS).forEach(([id, p]) => {
                if (p.noPhoto) return;
                if (typeof p.lifetime !== 'boolean') { out.push(`${id}: missing lifetime flag`); return; }
                const saysLater = /later|centuries|imagin|no .*survive|no .*portrait/i.test(p.caption);
                const saysLife = /life|photograph|painted (during|from)/i.test(p.caption);
                if (p.lifetime && !saysLife) out.push(`${id}: marked lifetime=true but caption doesn't say so`);
                if (!p.lifetime && !saysLater) out.push(`${id}: marked lifetime=false but caption doesn't say so`);
            });
            return out;
        });
        expect(bad).toEqual([]);
    });

    // The storybook's own "Next Scene" button, not the separate
    // "Continue to Step 2" button that also lives in #topicTabContent1.
    // .story-next-btn is present on both the authored-scene and photo-slide
    // renderers, even though only the former carries an onclick attribute.
    const nextSceneBtn = (page) => page.locator('#topicTabContent1 button.story-next-btn');

    test('the Next button on the last authored scene reaches the photo slide, and stops there', async ({ page }) => {
        await page.evaluate(() => selectTopic('lovelace', 'thinkers'));
        for (let i = 0; i < 3; i++) await page.evaluate(() => changeStorySlide('lovelace', 1));
        await expect(nextSceneBtn(page)).toContainText('See a Real Portrait');

        await page.evaluate(() => changeStorySlide('lovelace', 1));
        await expect(page.locator('#topicTabContent1')).toContainText('A Real Portrait');
        await expect(nextSceneBtn(page)).toBeDisabled();
    });

    test('the slide index is clamped, so it cannot run past the end and blank the stage', async ({ page }) => {
        const result = await page.evaluate(() => {
            selectTopic('kant', 'thinkers');
            for (let i = 0; i < 20; i++) changeStorySlide('kant', 1);
            const afterNext = activeStorySlide['kant'];
            const renders = !!document.querySelector('#topicTabContent1 .nb-badge');
            for (let i = 0; i < 20; i++) changeStorySlide('kant', -1);
            return {
                afterNext,
                afterPrev: activeStorySlide['kant'],
                renders,
                slides: storySlideCount('kant'),
                renderError: window.__lastRenderError || null
            };
        });
        expect(result.slides, '4 scenes + 1 portrait slide').toBe(5);
        expect(result.afterNext, 'clamped to the last slide').toBe(4);
        expect(result.afterPrev, 'clamped to the first slide').toBe(0);
        expect(result.renders, 'stage still renders after over-advancing').toBe(true);
        expect(result.renderError, 'no swallowed render error').toBeNull();
    });

    test('non-thinker topics are unaffected: no photo slide, Next still disables at the real last scene', async ({ page }) => {
        await page.evaluate(() => { selectCategory('mental_models'); selectTopic('first_principles', 'mental_models'); });
        const scenes = await page.evaluate(() => mentalModelsData.first_principles.storyScenes.length);
        for (let i = 1; i < scenes; i++) await page.evaluate(() => changeStorySlide('first_principles', 1));
        await expect(page.locator('#topicTabContent1')).toContainText(`Story Scene ${scenes} of ${scenes}`);
        await expect(nextSceneBtn(page)).toBeDisabled();
    });
});

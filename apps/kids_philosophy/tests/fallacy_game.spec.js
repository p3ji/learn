const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

/**
 * The three shortcuts that used to let a child win without reading anything:
 *   1. the monster's name WAS the answer
 *   2. the correct option was first in all ten questions
 *   3. ten questions in a fixed cycle
 */

test.describe('Fallacy game has no shortcuts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
        await page.evaluate(() => { selectTopic('monster_spotter', 'fallacies'); switchTopicTab(3); });
    });

    test('there are at least 25 arguments covering every fallacy type', async ({ page }) => {
        const stats = await page.evaluate(() => {
            const counts = {};
            fallacyScenarios.forEach(s => { counts[s.fallacy] = (counts[s.fallacy] || 0) + 1; });
            return {
                scenarios: fallacyScenarios.length,
                types: Object.keys(FALLACY_LIBRARY).length,
                uncovered: Object.keys(FALLACY_LIBRARY).filter(k => !counts[k])
            };
        });
        expect(stats.scenarios).toBeGreaterThanOrEqual(25);
        expect(stats.uncovered, 'fallacy types with no question').toEqual([]);
    });

    test('no monster name contains its own answer', async ({ page }) => {
        const leaks = await page.evaluate(() => fallacyScenarios.filter(s => {
            const words = FALLACY_LIBRARY[s.fallacy].name.toLowerCase().split(/\s+/);
            const name = s.monster.toLowerCase();
            return words.some(w => w.length > 3 && name.includes(w));
        }).map(s => `${s.monster} -> ${FALLACY_LIBRARY[s.fallacy].name}`));
        expect(leaks, 'monster name gives away the answer').toEqual([]);
    });

    test('the correct answer is not always in the same position', async ({ page }) => {
        // Build options many times and confirm the answer moves around.
        const positions = await page.evaluate(() => {
            const seen = new Set();
            for (let i = 0; i < 60; i++) {
                const opts = buildOptions(fallacyScenarios[i % fallacyScenarios.length]);
                seen.add(opts.findIndex(o => o.correct));
            }
            return [...seen].sort();
        });
        expect(positions.length, 'answer position never varies').toBeGreaterThan(1);
    });

    test('the fallacy name is hidden until after you answer', async ({ page }) => {
        const before = await page.locator('#fallacyGameBox').innerText();
        const answerName = await page.evaluate(() =>
            FALLACY_LIBRARY[currentScenario().fallacy].name);

        // The name appears among the three options, but must not be stated
        // anywhere that identifies it as THE answer.
        expect(before).not.toContain('Yes - that was');

        await page.evaluate(() => {
            const i = currentOptions.findIndex(o => o.correct);
            checkFallacyAnswer(i);
        });
        await expect(page.locator('#fallacyFeedback')).toContainText(`that was ${answerName}`);
    });

    test('a wrong answer explains why that specific trick does not fit', async ({ page }) => {
        const wrongName = await page.evaluate(() => {
            const i = currentOptions.findIndex(o => !o.correct);
            checkFallacyAnswer(i);
            return FALLACY_LIBRARY[currentOptions[i].key].name;
        });
        const fb = await page.locator('#fallacyFeedback').innerText();
        expect(fb).toContain(wrongName);
        expect(fb.toLowerCase()).toContain('means:');
        expect(fb, 'should not be a bare retry prompt').not.toMatch(/^.{0,40}try again/i);
    });

    test('questions do not repeat until the deck is exhausted', async ({ page }) => {
        const monsters = await page.evaluate(() => {
            const out = [];
            for (let i = 0; i < fallacyScenarios.length; i++) {
                out.push(currentScenario().monster);
                nextFallacyScenario();
            }
            return out;
        });
        expect(new Set(monsters).size, 'a lap should show every argument once').toBe(monsters.length);
    });

    test('re-solving the same argument pays no extra XP', async ({ page }) => {
        const gained = await page.evaluate(() => {
            const start = currentProfile.xp;
            for (let i = 0; i < 4; i++) {
                checkFallacyAnswer(currentOptions.findIndex(o => o.correct));
            }
            return currentProfile.xp - start;
        });
        // 25 for the solve + a one-time 150 badge, and nothing for the repeats.
        expect(gained).toBeLessThanOrEqual(175);
    });
});

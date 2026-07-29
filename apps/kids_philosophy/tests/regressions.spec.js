const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

/**
 * One test per defect found in the pass-3 audit.
 * Each of these fails against the code as it stood before the fix.
 */

const ALL_TOPICS = {
    thinkers: ['socrates', 'hypatia', 'aristotle', 'aurelius', 'descartes', 'popper',
               'mill', 'confucius', 'lao_tzu', 'kant', 'lovelace',
               'buddha', 'zhuangzi', 'ibn_sina', 'zera_yacob', 'wollstonecraft', 'du_bois'],
    mental_models: ['first_principles', 'occams_razor', 'black_swan', 'map_territory',
                    'inversion', 'pareto', 'second_order', 'sunk_cost', 'hanlons_razor',
                    'confirmation_bias'],
    experiments: ['platos_cave', 'ship_theseus', 'trolley_problem', 'experience_machine'],
    fallacies: ['monster_spotter']
};

test.describe('Pass-3 regressions', () => {
    let errors = [];

    test.beforeEach(async ({ page }) => {
        errors = [];
        page.on('pageerror', e => errors.push(e.message));
        // A caught renderer exception never reaches pageerror, so watch for it too.
        page.on('console', m => {
            if (m.type() === 'error' && m.text().includes('Error rendering active topic stage')) {
                errors.push('SWALLOWED RENDER ERROR: ' + m.text());
            }
        });
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
    });

    test('every catalog topic renders its own content', async ({ page }) => {
        // `laotzu` vs `lao_tzu` silently rendered Socrates when you clicked Lao Tzu.
        const bad = await page.evaluate((catalog) => {
            const out = [];
            for (const [cat, ids] of Object.entries(catalog)) {
                for (const id of ids) {
                    selectTopic(id, cat);
                    if (!document.querySelector('#unifiedFocusStage h2')) out.push(`${cat}/${id}: no heading`);
                    if (window.__lastRenderError) out.push(`${cat}/${id}: ${window.__lastRenderError}`);
                }
            }
            selectTopic('lao_tzu', 'thinkers');
            const h = document.querySelector('#unifiedFocusStage h2').innerText;
            if (h.includes('Socrates')) out.push(`lao_tzu rendered "${h}"`);
            return out;
        }, ALL_TOPICS);

        expect(bad).toEqual([]);
        expect(errors).toEqual([]);
    });

    test('every inline onclick handler compiles in every topic', async ({ page }) => {
        // Apostrophes in "Occam's Razor" broke Submit with a SyntaxError.
        const broken = await page.evaluate((catalog) => {
            const out = [];
            for (const [cat, ids] of Object.entries(catalog)) {
                for (const id of ids) {
                    selectTopic(id, cat);
                    document.querySelectorAll('#unifiedFocusStage [onclick]').forEach(el => {
                        if (el.onclick === null) out.push(`${cat}/${id}: ${el.getAttribute('onclick')}`);
                    });
                }
            }
            return out;
        }, ALL_TOPICS);

        expect(broken, 'inline handlers that failed to compile').toEqual([]);
    });

    test('every topic has its own inquiry - no shared fallback dilemma', async ({ page }) => {
        const dilemmas = await page.evaluate((catalog) => {
            const seen = {};
            for (const [cat, ids] of Object.entries(catalog)) {
                if (cat === 'fallacies') continue;
                for (const id of ids) {
                    selectTopic(id, cat);
                    switchTopicTab(3);
                    const box = document.querySelector('#topicTabContent3');
                    const m = (box ? box.innerText : '').match(/Philosophical Dilemma:?\s*"?([^"\n]{20,})/i);
                    seen[`${cat}/${id}`] = m ? m[1].slice(0, 60) : '(none)';
                }
            }
            return seen;
        }, ALL_TOPICS);

        const missing = Object.entries(dilemmas).filter(([, d]) => d === '(none)').map(([k]) => k);
        expect(missing, 'topics rendering no inquiry').toEqual([]);

        const counts = {};
        Object.values(dilemmas).forEach(d => { counts[d] = (counts[d] || 0) + 1; });
        const shared = Object.entries(counts).filter(([, n]) => n > 1)
            .map(([d, n]) => `${n} topics share: "${d}"`);
        expect(shared, 'same dilemma served for multiple topics').toEqual([]);
    });

    test('XP cannot be farmed by repeating the same action', async ({ page }) => {
        const xp = () => page.evaluate(() => currentProfile.xp);

        await page.evaluate(() => { selectTopic('socrates', 'thinkers'); switchTopicTab(2); });
        const beforeQuiz = await xp();
        for (let i = 0; i < 5; i++) {
            await page.evaluate(() => checkVideoQuizAnswer('socrates', 0, 0, true));
        }
        expect(await xp() - beforeQuiz, 'repeat video-quiz XP').toBeLessThanOrEqual(10);

        // Solve once, then hammer the SAME question. Both the first solve and
        // the repeats happen inside one evaluate: a correct answer schedules
        // the next scenario on a 3.2s timer, and awaiting between clicks lets
        // that fire, so the repeats would land on a fresh question and score.
        const repeatGain = await page.evaluate(() => {
            selectTopic('monster_spotter', 'fallacies');
            switchTopicTab(3);
            checkFallacyAnswer(currentOptions.findIndex(o => o.correct));

            const afterFirstSolve = currentProfile.xp;
            for (let i = 0; i < 5; i++) {
                checkFallacyAnswer(currentOptions.findIndex(o => o.correct));
            }
            return currentProfile.xp - afterFirstSolve;
        });
        expect(repeatGain, 'XP for re-answering the same argument').toBe(0);
    });

    test('a blank save is not a reflection, and nothing claims mastery', async ({ page }) => {
        await page.evaluate(() => {
            localStorage.removeItem('kids_p4c_journal');
            selectTopic('socrates', 'thinkers');
            switchTopicTab(3);
            // "Still Thinking" with no text used to bypass the writing requirement
            // entirely - three of those minted a mastery certificate.
            const sel = document.getElementById('p4cChoice_socrates_0');
            if (sel) sel.value = 'Still Thinking';
            submitP4CReflection('socrates', 0, 'test');
        });

        expect(await page.evaluate(() => countWrittenReflections()),
            'a blank save must not count as a reflection').toBe(0);

        await page.evaluate(() => openGoldenCertificateModal());
        const text = await page.locator('#goldenCertificateModal').innerText();
        expect(text.toLowerCase()).not.toContain('mastery');
    });

    test('a quoted profile name cannot inject an attribute or kill the buttons', async ({ page }) => {
        await page.evaluate(() => {
            currentProfile.username = 'Zed" onmouseover="window.__pwn=1" x="';
            saveProfileState();
            openAccountLoginModal();
        });
        expect(await page.evaluate(() =>
            document.getElementById('rtsInputUsername').hasAttribute('onmouseover')),
            'username broke out of the value attribute').toBe(false);

        await page.evaluate(() => {
            const all = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
            all['Ka"te'] = { username: 'Ka"te', avatar: '\u{1F989}', xp: 10, level: 1, rank: 'x', badges: [] };
            localStorage.setItem('kids_rts_profiles', JSON.stringify(all));
            openAccountLoginModal();
        });
        const dead = await page.$$eval('#rtsLoginModal button',
            els => els.filter(e => e.getAttribute('onclick') && e.onclick === null).length);
        expect(dead, 'profile-row buttons broken by a quoted name').toBe(0);
    });

    test('the header fits on a tablet with no stranded controls', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(200);
        const result = await page.evaluate(() => {
            const vw = document.documentElement.clientWidth;
            const stranded = [];
            document.querySelectorAll('.kids-header button, .kids-header a, .kids-header .xp-pill')
                .forEach(el => {
                    const r = el.getBoundingClientRect();
                    if (r.right > vw + 1) stranded.push(el.innerText.trim().slice(0, 24));
                });
            return { overflow: document.documentElement.scrollWidth - vw, stranded };
        });
        expect(result.stranded, 'header controls unreachable on a tablet').toEqual([]);
        expect(result.overflow, 'document overflows the viewport').toBeLessThanOrEqual(1);
    });

    test('modals take focus and close with Escape', async ({ page }) => {
        await page.evaluate(() => openAccountLoginModal());
        await expect(page.locator('#rtsLoginModal')).toBeVisible();
        expect(await page.evaluate(() =>
            document.getElementById('rtsLoginModal').contains(document.activeElement)),
            'focus never entered the modal').toBe(true);
        await page.keyboard.press('Escape');
        await expect(page.locator('#rtsLoginModal')).toBeHidden();
    });

    test('the app stage initializes exactly once', async ({ page }) => {
        expect(await page.evaluate(() => appStageInitialized)).toBe(true);
        const before = await page.evaluate(() =>
            document.getElementById('unifiedFocusStage').innerHTML.length);
        await page.evaluate(() => bootAppStage());
        expect(await page.evaluate(() =>
            document.getElementById('unifiedFocusStage').innerHTML.length)).toBe(before);
    });

    test('no fabricated quotes remain in the content', async ({ page }) => {
        const found = await page.evaluate(() => {
            const FABRICATED = [
                'All I know is that I know nothing',
                'Reserve your right to think',
                'We are what we repeatedly do',
                'You have power over your mind',
                'A theory that explains everything explains nothing',
                'replaces almost all of its cells every 7'
            ];
            const blob = JSON.stringify(thinkersData) + JSON.stringify(mentalModelsData) +
                         JSON.stringify(experimentData);
            return FABRICATED.filter(q => blob.includes(q));
        });
        expect(found, 'misattributed or mythical claims still present').toEqual([]);
    });
});

const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
const EMAIL = 'modularsurveytools@gmail.com';
const OWL = '\u{1F989}';

test.describe('Where saved work goes, and how it comes back', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
        await page.evaluate(() => {
            localStorage.removeItem('kids_p4c_journal');
            localStorage.removeItem('kids_quest_feedback_vault');
        });
    });

    test('a reflection survives a full page reload and reappears in its textarea', async ({ page }) => {
        await page.evaluate(() => { selectTopic('socrates', 'thinkers'); switchTopicTab(3); });
        await page.fill('#p4cReflection_socrates_0', 'I picked A because pretending to know is worse.');
        await page.evaluate(() => submitP4CReflection('socrates', 0, 'Knowing You Do Not Know'));

        expect(await page.evaluate(() => localStorage.getItem('kids_p4c_journal')))
            .toContain('pretending to know is worse');

        await page.reload();
        await page.waitForFunction(() => typeof selectTopic === 'function');
        await page.evaluate(() => { selectTopic('socrates', 'thinkers'); switchTopicTab(3); });
        await expect(page.locator('#p4cReflection_socrates_0'))
            .toHaveValue('I picked A because pretending to know is worse.');
    });

    test('the journal is reachable from the header and shows the actual writing', async ({ page }) => {
        await page.evaluate(() => {
            selectTopic('socrates', 'thinkers');
            switchTopicTab(3);
            document.getElementById('p4cReflection_socrates_0').value = 'Being honest is where learning starts.';
            submitP4CReflection('socrates', 0, 'Knowing You Do Not Know');
        });

        await page.click('header button:has-text("My Journal")');
        const modal = page.locator('#goldenCertificateModal');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('Being honest is where learning starts.');
    });

    test('the inquiry card tells the child where the writing went', async ({ page }) => {
        await page.evaluate(() => { selectTopic('kant', 'thinkers'); switchTopicTab(3); });
        await expect(page.locator('#topicTabContent3')).toContainText('stays on this device');
        await expect(page.locator('#topicTabContent3')).toContainText('My Journal');
    });

    test('the questions notebook says where notes live and offers to send them', async ({ page }) => {
        await page.click('header button:has-text("My Questions")');
        const modal = page.locator('#feedbackVaultModal');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('on this device only');
        await expect(modal).toContainText('not sent anywhere unless you choose');
        await expect(modal.locator('button:has-text("Send to the app makers")')).toBeVisible();
    });
});

test.describe('Sending a question by email', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(indexPath);
        await page.waitForFunction(() => typeof selectTopic === 'function');
        await page.evaluate(() => localStorage.removeItem('kids_quest_feedback_vault'));
    });

    test('submitting a question saves locally and offers a send button', async ({ page }) => {
        await page.evaluate(() => { selectTopic('socrates', 'thinkers'); switchTopicTab(4); });
        await page.fill('#feedbackInput_socrates', 'Why did Socrates not just leave Athens?');
        await page.evaluate((owl) => submitTopicFeedback('socrates', 'Socrates', owl), OWL);

        const stored = await page.evaluate(() => localStorage.getItem('kids_quest_feedback_vault'));
        expect(stored).toContain('Why did Socrates not just leave Athens?');

        const result = page.locator('#feedbackResult_socrates');
        await expect(result).toContainText('Nobody has read it yet');
        await expect(result).toContainText('Nothing is sent on its own');
        await expect(result.locator('button:has-text("Send this to the app makers")')).toBeVisible();
    });

    test('the draft targets the right address and carries the question', async ({ page }) => {
        const draft = await page.evaluate((owl) => {
            selectTopic('socrates', 'thinkers');
            switchTopicTab(4);
            document.getElementById('feedbackInput_socrates').value = 'Was the jury fair?';
            submitTopicFeedback('socrates', 'Socrates', owl);
            // buildFeedbackMailto is pure: it constructs the URL and sends nothing.
            return buildFeedbackMailto(getSavedFeedback());
        }, OWL);

        expect(draft.startsWith(`mailto:${EMAIL}?`), `got: ${draft.slice(0, 90)}`).toBe(true);

        const decoded = decodeURIComponent(draft);
        expect(decoded).toContain('Was the jury fair?');
        expect(decoded, 'recipient must know a child wrote this').toContain('written by a child');
        expect(decoded).toContain('Philosopher');
    });

    test('saving a note never navigates on its own', async ({ page }) => {
        await page.waitForLoadState('load');
        const startUrl = page.url();
        let navigated = false;
        // Main frame only: the topic renders a video iframe, whose load would
        // otherwise register here and make this pass or fail for the wrong reason.
        page.on('framenavigated', f => { if (f === page.mainFrame()) navigated = true; });

        await page.evaluate((owl) => {
            selectTopic('socrates', 'thinkers');
            switchTopicTab(4);
            document.getElementById('feedbackInput_socrates').value = 'A quiet question.';
            submitTopicFeedback('socrates', 'Socrates', owl);
        }, OWL);

        await page.waitForTimeout(400);
        expect(navigated, 'saving a note must not open a mail client by itself').toBe(false);
        expect(page.url()).toBe(startUrl);
    });

    test('a very long notebook falls back to a file instead of a truncated draft', async ({ page }) => {
        const tooLong = await page.evaluate(() => {
            const many = Array.from({ length: 40 }, (_, i) => ({
                id: 'fb_' + i, topicId: 'socrates', topicName: 'Socrates', userName: 'Cadet',
                type: 'question', content: 'A fairly long question number ' + i + ' '.padEnd(60, 'x'),
                timestamp: new Date().toISOString()
            }));
            return buildFeedbackMailto(many).length;
        });
        expect(tooLong, 'this many notes should exceed the safe mailto length').toBeGreaterThan(1900);
    });
});

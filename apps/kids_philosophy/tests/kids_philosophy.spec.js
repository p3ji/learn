const { test, expect } = require('@playwright/test');
const path = require('path');

const indexPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

test.describe("Philosopher's Quest & Mental Models - Playwright E2E Suite", () => {
    let pageErrors = [];

    test.beforeEach(async ({ page }) => {
        pageErrors = [];
        page.on('pageerror', error => {
            console.error('Browser Page Error:', error.message);
            pageErrors.push(error.message);
        });

        await page.goto(indexPath);
    });

    test.afterEach(async () => {
        // Assert ZERO uncaught browser page exceptions
        expect(pageErrors).toEqual([]);
    });

    test('1. Initial Load: Header, Hero, and Unified Focus Stage Render Properly', async ({ page }) => {
        await expect(page.locator('.kids-logo-title')).toContainText("Philosopher's Quest");
        await expect(page.locator('#xpTextDisplay')).toBeVisible();

        const focusStage = page.locator('#unifiedFocusStage');
        await expect(focusStage).toBeVisible();
        await expect(focusStage.locator('.spotlight-card')).toBeVisible();
    });

    test('2. Socrates Topic Selection & Scenario Pill Switching (No ReferenceErrors)', async ({ page }) => {
        await page.click('button[data-cat="thinkers"]');
        const socratesBtn = page.locator('button.topic-carousel-btn', { hasText: 'Socrates' });
        await socratesBtn.click();

        const focusStage = page.locator('#unifiedFocusStage');
        await expect(focusStage.locator('h2')).toContainText("Socrates's Deep-Dive Stage");
        await expect(focusStage).toContainText("The unexamined life is not worth living");

        // Go to Step 3: Open P4C Inquiry
        await page.click('#topicTabBtn3');
        await expect(page.locator('#topicTabContent3')).toBeVisible();

        // Click Scenario 1 pill - verifies switchGameLevel is defined and doesn't throw
        const scenario1Btn = page.locator('button.viz-step-btn', { hasText: 'Scenario 1' });
        await expect(scenario1Btn).toBeVisible();
        await scenario1Btn.click();
        await expect(page.locator('#topicTabContent3')).toContainText('Open Socratic Dialectic');
    });

    test('3. Category Switcher: All 4 Master Categories Render Relevant Carousel Items', async ({ page }) => {
        await page.click('button[data-cat="thinkers"]');
        await expect(page.locator('#topicCarouselBar')).toContainText('Socrates');
        await expect(page.locator('#topicCarouselBar')).toContainText('John Stuart Mill');

        await page.click('button[data-cat="mental_models"]');
        await expect(page.locator('#topicCarouselBar')).toContainText('First Principles');
        await expect(page.locator('#topicCarouselBar')).toContainText("Occam's Razor");
        await expect(page.locator('#topicCarouselBar')).toContainText('Inversion');

        await page.click('button[data-cat="experiments"]');
        await expect(page.locator('#topicCarouselBar')).toContainText("Plato's Cave");
        await expect(page.locator('#topicCarouselBar')).toContainText('Ship of Theseus');

        await page.click('button[data-cat="fallacies"]');
        await expect(page.locator('#topicCarouselBar')).toContainText('Fallacy Monster Spotter');
    });

    test('4. All Mental Models Carousel Items Load Without Error', async ({ page }) => {
        await page.click('button[data-cat="mental_models"]');

        const modelsToTest = [
            'First Principles',
            "Occam's Razor",
            'Black Swan',
            'Inversion',
            'Pareto',
            'Second-Order',
            'Sunk Cost'
        ];

        for (const modelTitle of modelsToTest) {
            const btn = page.locator('button.topic-carousel-btn', { hasText: modelTitle });
            await btn.click();
            
            const spotlightHeader = page.locator('#unifiedFocusStage h2');
            await expect(spotlightHeader).toBeVisible();
        }
    });

    test('5. P4C Reflection Journal Persistence: Saving Reflection Persists to localStorage', async ({ page }) => {
        await page.click('button[data-cat="thinkers"]');
        await page.locator('button.topic-carousel-btn', { hasText: 'Socrates' }).click();

        // Switch to Step 3: Open P4C Inquiry
        await page.click('#topicTabBtn3');

        // Type a reflection in the textarea
        const reflectionInput = page.locator('#p4cReflection_socrates_0');
        await expect(reflectionInput).toBeVisible();
        await reflectionInput.fill('Asking questions helps us discover what is fair and true.');

        // Click Save Reflection
        await page.click('button:has-text("Save Reflection to Journal")');

        // Assert feedback message appears
        await expect(page.locator('#p4cJournalFeedback_socrates')).toContainText('Reflection Saved to Journal');

        // Reload page to verify persistence
        await page.reload();
        await page.click('button[data-cat="thinkers"]');
        await page.locator('button.topic-carousel-btn', { hasText: 'Socrates' }).click();
        await page.click('#topicTabBtn3');

        // Verify textarea is auto-populated with saved reflection
        await expect(page.locator('#p4cReflection_socrates_0')).toHaveValue('Asking questions helps us discover what is fair and true.');
    });

    test('6. Modals: Account Manager, Golden Certificate, and Streak Modals Open and Close', async ({ page }) => {
        // 1. Account Manager Modal
        await page.click('button:has-text("Account")');
        const accountModal = page.locator('#rtsLoginModal');
        await expect(accountModal).toBeVisible();
        await expect(accountModal).toContainText('Thinker Cadet Profiles');
        await page.evaluate(() => closeAccountLoginModal());
        await expect(accountModal).toBeHidden();

        // 2. Golden Certificate Modal (Gated check)
        await page.click('button:has-text("Certificate")');
        const certModal = page.locator('#goldenCertificateModal');
        await expect(certModal).toBeVisible();
        await page.evaluate(() => document.getElementById('goldenCertificateModal').style.display = 'none');
        await expect(certModal).toBeHidden();

        // 3. Streak Dashboard Modal
        await page.click('#headerStreakContainer .xp-pill');
        const streakModal = page.locator('#duolingoDashboardModal');
        await expect(streakModal).toBeVisible();
        await page.evaluate(() => document.getElementById('duolingoDashboardModal').style.display = 'none');
        await expect(streakModal).toBeHidden();
    });

});

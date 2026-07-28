const { test, expect } = require('@playwright/test');

const VIDEO_IDS = [
    // Thinkers
    { topic: 'Socrates', id: 'vdqb__y-K34' },
    { topic: 'Hypatia', id: '4K91pT04I0s' },
    { topic: 'Aristotle', id: 'tBg4y39031c' },
    { topic: 'Marcus Aurelius', id: '5897dMWJiSM' },
    { topic: 'Descartes', id: '0A6UKoMcE10' },
    { topic: 'Karl Popper', id: 'XlFJWl_F8wg' },
    { topic: 'John Stuart Mill', id: 'uBbV4mG7L1A' },
    { topic: 'Confucius', id: 'tUhGRh4vhi8' },
    { topic: 'Lao Tzu', id: 'dFb7Hxva5rg' },
    { topic: 'Immanuel Kant', id: 'nsgA4hzo06U' },
    { topic: 'Ada Lovelace', id: 'J34k52xP4D4' },
    // Mental Models
    { topic: 'First Principles', id: 'g918y-DkW9M' },
    { topic: 'Occam\'s Razor', id: 'pQ33gAyhg2c' },
    { topic: 'Black Swan', id: '7H7pU57GfJ8' },
    { topic: 'Map vs Territory', id: 'zWwA_u6h7G0' },
    { topic: 'Inversion', id: 'gZ_q2J8w784' },
    { topic: 'Pareto 80/20', id: '1-1eXpQ62jM' },
    { topic: 'Second-Order Thinking', id: '2Y4-f254eZ8' },
    { topic: 'Sunk Cost', id: 'e-f-Wv_9B5M' },
    { topic: 'Hanlon\'s Razor', id: 'oX0R84e-x6M' },
    { topic: 'Confirmation Bias', id: 't2p_7Qn3Z3Y' },
    // Thought Experiments
    { topic: 'Plato\'s Cave', id: '1RWOpQXTltA' },
    { topic: 'Ship of Theseus', id: 'k-f4r_863vM' },
    { topic: 'Trolley Problem', id: 'bOpf6KcWYyw' },
    { topic: 'Experience Machine', id: 'y5h57r65H5c' }
];

test.describe("Video ID oEmbed API Validity Audit", () => {

    for (const item of VIDEO_IDS) {
        test(`Verify YouTube Video for '${item.topic}' (ID: ${item.id}) exists via oEmbed`, async ({ request }) => {
            const res = await request.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.id}&format=json`);
            expect(res.status(), `Video ID ${item.id} for topic ${item.topic} failed oEmbed check`).toBe(200);
        });
    }

});

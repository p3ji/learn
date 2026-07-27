// Logical Fallacy Monster Spotter Mini-Game

const fallacyMonsters = [
    {
        name: "The Strawman Monster 👹",
        argument: "Person A: 'We should eat more vegetables.' \nMonster: 'So you want to ban all pizza forever and starve everyone?!'",
        options: [
            { text: "Strawman Fallacy (Exaggerating & twisting their words into something silly!)", correct: true },
            { text: "Ad Hominem (Insulting their shoes)", correct: false },
            { text: "Bandwagon (Doing it because everyone else does)", correct: false }
        ],
        explanation: "Correct! A Strawman Fallacy replaces the real argument with a fake, extreme version that is easy to knock down!"
    },
    {
        name: "The Ad Hominem Goblin 👺",
        argument: "Person A: 'We need to recycle paper to save trees.' \nGoblin: 'Don't listen to him, he smells like old cheese and plays video games!'",
        options: [
            { text: "Ad Hominem Attack (Attacking the person instead of addressing their argument!)", correct: true },
            { text: "Strawman Fallacy", correct: false },
            { text: "Slippery Slope", correct: false }
        ],
        explanation: "Correct! Ad Hominem means 'against the person'. Calling names doesn't prove an argument wrong!"
    },
    {
        name: "The Bandwagon Dragon 🐉",
        argument: "Dragon: '10 million people buy this sugary cereal, so it MUST be the healthiest breakfast on Earth!'",
        options: [
            { text: "Bandwagon Fallacy (Claiming something is true just because it's popular!)", correct: true },
            { text: "Strawman Fallacy", correct: false },
            { text: "Ad Hominem", correct: false }
        ],
        explanation: "Correct! Just because lots of people do or believe something doesn't automatically make it true or healthy!"
    }
];

let currentMonsterIdx = 0;

function renderFallacyGame() {
    const container = document.getElementById('fallacyGameBox');
    if (!container) return;

    const m = fallacyMonsters[currentMonsterIdx];

    container.innerHTML = `
        <div class="fallacy-card">
            <div class="monster-box">
                <div class="monster-icon">${m.name.slice(-2)}</div>
                <div>
                    <div style="color: var(--pink-energy); font-weight:800; font-size:1.2rem;">${m.name}</div>
                    <div class="monster-dialogue">"${escapeHtml(m.argument)}"</div>
                </div>
            </div>

            <div style="font-weight:700; color: var(--gold-star); margin-bottom:12px;">Defeat the Monster by Spotting the Fallacy:</div>
            <div class="fallacy-options">
                ${m.options.map((opt, idx) => `
                    <button class="fallacy-opt-btn" onclick="checkFallacyAnswer(${idx})">${opt.text}</button>
                `).join('')}
            </div>

            <div id="fallacyFeedback" style="display:none; margin-top:20px; padding:16px; border-radius:12px; font-weight:700;"></div>
        </div>
    `;
}

function checkFallacyAnswer(optIdx) {
    const m = fallacyMonsters[currentMonsterIdx];
    const feedback = document.getElementById('fallacyFeedback');
    const selected = m.options[optIdx];

    feedback.style.display = 'block';

    if (selected.correct) {
        feedback.style.background = 'rgba(16, 185, 129, 0.2)';
        feedback.style.border = '1.5px solid var(--green-hero)';
        feedback.style.color = 'var(--green-hero)';
        feedback.innerHTML = `🎉 MONSTER DEFEATED! ${m.explanation} (+100 XP)`;
        addXP(100);
        unlockBadge('fallacy_detective');

        setTimeout(() => {
            currentMonsterIdx = (currentMonsterIdx + 1) % fallacyMonsters.length;
            renderFallacyGame();
        }, 2500);
    } else {
        feedback.style.background = 'rgba(239, 68, 68, 0.2)';
        feedback.style.border = '1.5px solid #EF4444';
        feedback.style.color = '#EF4444';
        feedback.innerHTML = `❌ Monster blocked your attack! Think carefully: Is this attacking the person, exaggerating, or following the crowd? Try again!`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderFallacyGame();
});

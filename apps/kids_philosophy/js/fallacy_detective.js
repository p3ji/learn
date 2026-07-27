// Logical Fallacy Monster Battle Arena Mini-Game

const fallacyMonsters = [
    {
        name: "The Strawman Monster 👹",
        hp: 100,
        argument: "Person A: 'We should eat more vegetables.' \nMonster: 'So you want to ban all pizza forever and starve everyone?!'",
        options: [
            { text: "🛡️ Strawman Fallacy (Exaggerating & twisting words into something silly!)", correct: true },
            { text: "🛡️ Ad Hominem (Insulting their shoes)", correct: false },
            { text: "🛡️ Bandwagon (Doing it because everyone else does)", correct: false }
        ],
        explanation: "CRITICAL HIT! A Strawman Fallacy replaces the real argument with a fake, extreme version that is easy to knock down!"
    },
    {
        name: "The Ad Hominem Goblin 👺",
        hp: 100,
        argument: "Person A: 'We need to recycle paper to save trees.' \nGoblin: 'Don't listen to him, he smells like old cheese and plays video games!'",
        options: [
            { text: "🛡️ Ad Hominem Attack (Attacking the person instead of their argument!)", correct: true },
            { text: "🛡️ Strawman Fallacy", correct: false },
            { text: "🛡️ Slippery Slope", correct: false }
        ],
        explanation: "CRITICAL HIT! Ad Hominem means 'against the person'. Calling names doesn't prove an argument wrong!"
    },
    {
        name: "The Bandwagon Dragon 🐉",
        hp: 100,
        argument: "Dragon: '10 million people buy this sugary cereal, so it MUST be the healthiest breakfast on Earth!'",
        options: [
            { text: "🛡️ Bandwagon Fallacy (Claiming something is true just because it's popular!)", correct: true },
            { text: "🛡️ Strawman Fallacy", correct: false },
            { text: "🛡️ Ad Hominem", correct: false }
        ],
        explanation: "CRITICAL HIT! Just because lots of people do or believe something doesn't automatically make it true or healthy!"
    }
];

let currentMonsterIdx = 0;
let monsterCurrentHP = 100;

function renderFallacyGame() {
    const container = document.getElementById('fallacyGameBox');
    if (!container) return;

    const m = fallacyMonsters[currentMonsterIdx];

    container.innerHTML = `
        <div class="fallacy-card">
            <!-- Monster Health & Title -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div style="font-weight: 900; font-size: 1.3rem; color: var(--pink-energy);">${m.name}</div>
                <div style="background: rgba(0,0,0,0.5); padding: 6px 14px; border-radius: 12px; border: 1px solid var(--pink-energy);">
                    <span style="font-weight: 800; color: #FFF; font-size: 0.85rem;">Monster HP:</span>
                    <div style="display: inline-block; width: 100px; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; vertical-align: middle; margin-left: 8px;">
                        <div id="monsterHpBar" style="width: ${monsterCurrentHP}%; height: 100%; background: var(--pink-energy); transition: width 0.4s ease;"></div>
                    </div>
                </div>
            </div>

            <!-- Monster Speech Bubble -->
            <div class="monster-box">
                <div class="monster-icon">${m.name.slice(-2)}</div>
                <div>
                    <div style="font-size: 0.8rem; color: var(--gold-star); font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">Monster's Trick Argument:</div>
                    <div class="monster-dialogue">"${escapeHtml(m.argument)}"</div>
                </div>
            </div>

            <div style="font-weight:800; color: var(--gold-star); margin-bottom: 12px;">Select the Logic Shield to Defeat the Monster:</div>
            <div class="fallacy-options">
                ${m.options.map((opt, idx) => `
                    <button class="fallacy-opt-btn" onclick="checkFallacyAnswer(${idx})">${opt.text}</button>
                `).join('')}
            </div>

            <div id="fallacyFeedback" style="display:none; margin-top:20px; padding:16px; border-radius:12px; font-weight:700; font-size: 1rem;"></div>
        </div>
    `;
}

function checkFallacyAnswer(optIdx) {
    const m = fallacyMonsters[currentMonsterIdx];
    const feedback = document.getElementById('fallacyFeedback');
    const selected = m.options[optIdx];

    feedback.style.display = 'block';

    if (selected.correct) {
        monsterCurrentHP = 0;
        const hpBar = document.getElementById('monsterHpBar');
        if (hpBar) hpBar.style.width = '0%';

        feedback.style.background = 'rgba(16, 185, 129, 0.2)';
        feedback.style.border = '1.5px solid var(--green-hero)';
        feedback.style.color = 'var(--green-hero)';
        feedback.innerHTML = `⚔️ ${m.explanation} MONSTER DEFEATED (+100 XP)!`;
        addXP(100);
        unlockBadge('fallacy_detective');

        setTimeout(() => {
            currentMonsterIdx = (currentMonsterIdx + 1) % fallacyMonsters.length;
            monsterCurrentHP = 100;
            renderFallacyGame();
        }, 2500);
    } else {
        feedback.style.background = 'rgba(239, 68, 68, 0.2)';
        feedback.style.border = '1.5px solid #EF4444';
        feedback.style.color = '#EF4444';
        feedback.innerHTML = `🛡️ Monster blocked your shield! Think carefully: Is this attacking the person, exaggerating, or following the crowd? Try again!`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderFallacyGame();
});

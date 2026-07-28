// Logical Fallacy Monster Battle Arena Mini-Game - Single Topic Stage Renderer

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

function renderFallacyMonsterStage() {
    return `
        <div class="spotlight-card">
            <!-- Header Banner -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;">🕵️</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">Logical Fallacy Monster Spotter</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">Defeat Trick Arguments with Logic Shields</span>
                    </div>
                </div>
                <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">🕵️ Fallacy Detective</div>
            </div>

            <!-- 4-Step Flow Controls -->
            <div class="viz-controls" style="margin-bottom: 24px;">
                <button class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Core Intro</button>
                <button class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. Fallacy Types</button>
                <button class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Monster Battle Game</button>
                <button class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Ask & Suggest Upgrade</button>
            </div>

            <!-- Tab 1: Intro -->
            <div id="topicTabContent1" class="flow-content-block">
                <h3 style="color: var(--gold-star); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 10px;">What is a Logical Fallacy?</h3>
                <p style="color: var(--text-main); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    A <strong>logical fallacy</strong> is a flaw in reasoning. Logical fallacies are like trick traps in an argument — they sound convincing at first, but when you inspect them closely, they break down! Learning to spot fallacies gives you a <strong>Logic Shield</strong> against bad arguments.
                </p>
                <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: Learn Fallacy Monsters ➔</button>
            </div>

            <!-- Tab 2: Types -->
            <div id="topicTabContent2" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 14px;">Meet the 3 Fallacy Monsters</h3>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
                    <div style="background: rgba(236,72,153,0.1); border: 1px solid var(--pink-energy); border-radius: 12px; padding: 16px;">
                        <h4 style="color: var(--pink-energy); margin-bottom: 6px;">👹 Strawman Monster</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Exaggerates your argument into something silly that you never actually said, then attacks that fake argument!</p>
                    </div>
                    <div style="background: rgba(6,182,212,0.1); border: 1px solid var(--cyan-magic); border-radius: 12px; padding: 16px;">
                        <h4 style="color: var(--cyan-magic); margin-bottom: 6px;">👺 Ad Hominem Goblin</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Attacks the person making the argument (calling names) instead of addressing the actual facts!</p>
                    </div>
                    <div style="background: rgba(245,158,11,0.1); border: 1px solid var(--gold-star); border-radius: 12px; padding: 16px;">
                        <h4 style="color: var(--gold-star); margin-bottom: 6px;">🐉 Bandwagon Dragon</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Claims something must be true or good just because a lot of people or celebrities do it!</p>
                    </div>
                </div>

                <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Battle the Monsters! ➔</button>
            </div>

            <!-- Tab 3: Monster Battle Game -->
            <div id="topicTabContent3" class="flow-content-block" style="display:none;">
                <div id="fallacyGameBox">
                    <!-- Loaded dynamically below -->
                </div>
            </div>

            <!-- Tab 4: Question & Upgrade Vault -->
            <div id="topicTabContent4" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest a New Monster</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about logical fallacies or want to suggest a new fallacy monster to add to this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_monster_spotter" class="sandbox-input" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_monster_spotter" class="sandbox-input" placeholder="Type your question or new monster idea here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('monster_spotter', 'Fallacy Monster Spotter', '🕵️')">Submit to Upgrade Vault</button>
                    
                    <div id="feedbackResult_monster_spotter" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for Fallacy Monsters:</h4>
                <div id="savedFeedbackList_monster_spotter">
                    <!-- Dynamically populated by feedback_vault.js -->
                </div>
            </div>
        </div>
    `;
}

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

    if (!feedback) return;
    feedback.style.display = 'block';

    if (selected.correct) {
        monsterCurrentHP = 0;
        const hpBar = document.getElementById('monsterHpBar');
        if (hpBar) hpBar.style.width = '0%';

        feedback.style.background = 'rgba(16, 185, 129, 0.2)';
        feedback.style.border = '1.5px solid var(--green-hero)';
        feedback.style.color = 'var(--green-hero)';
        feedback.innerHTML = `⚔️ ${m.explanation} MONSTER DEFEATED (+100 XP)!`;
        if (typeof addXP === 'function') addXP(100);
        if (typeof unlockBadge === 'function') unlockBadge('fallacy_detective');

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

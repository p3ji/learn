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
    },
    {
        name: "The Slippery Slope Yeti 🛷",
        hp: 100,
        argument: "Yeti: 'If we allow 5 extra minutes of recess today, tomorrow no one will study, and by next week the entire school will collapse!'",
        options: [
            { text: "🛡️ Slippery Slope (Claiming one small action automatically triggers a disaster without proof!)", correct: true },
            { text: "🛡️ Circular Reasoning", correct: false },
            { text: "🛡️ Red Herring", correct: false }
        ],
        explanation: "CRITICAL HIT! Slippery Slope assumes a chain reaction of terrible events will happen without showing evidence!"
    },
    {
        name: "The Either-Or Specter 🔀",
        hp: 100,
        argument: "Specter: 'Either you eat spinach for every single meal, or you hate healthy food completely and want to get sick!'",
        options: [
            { text: "🛡️ False Dilemma / Either-Or (Pretending there are only 2 extreme options!)", correct: true },
            { text: "🛡️ Bandwagon Fallacy", correct: false },
            { text: "🛡️ Ad Hominem", correct: false }
        ],
        explanation: "CRITICAL HIT! False Dilemma forces you to choose between two extremes while ignoring middle options!"
    },
    {
        name: "The Red Herring Fox 🦊",
        hp: 100,
        argument: "Parent: 'Why didn't you clean your bedroom today?' \nFox: 'Why talk about my room when the kitchen sink has dirty dishes in it?!'",
        options: [
            { text: "🛡️ Red Herring (Changing the subject suddenly to distract from the real question!)", correct: true },
            { text: "🛡️ Strawman Fallacy", correct: false },
            { text: "🛡️ False Cause", correct: false }
        ],
        explanation: "CRITICAL HIT! Red Herring pulls a smelly fish across the path to distract everyone from the topic!"
    },
    {
        name: "The Crowned Authority Owl 👑",
        hp: 100,
        argument: "Owl: 'A famous video game streamer said this soda cures colds, so science has proven it works!'",
        options: [
            { text: "🛡️ Appeal to Authority (Assuming something is true because a famous person said it outside their field!)", correct: true },
            { text: "🛡️ Slippery Slope", correct: false },
            { text: "🛡️ No True Scotsman", correct: false }
        ],
        explanation: "CRITICAL HIT! Being famous or great at gaming doesn't make someone a medical science authority!"
    },
    {
        name: "The Circular Reasoning Snake 🐍",
        hp: 100,
        argument: "Snake: 'This storybook is 100% true and factual because page 1 states that it never tells a lie!'",
        options: [
            { text: "🛡️ Circular Reasoning (Using the claim itself as the proof for the claim!)", correct: true },
            { text: "🛡️ Red Herring", correct: false },
            { text: "🛡️ Bandwagon Fallacy", correct: false }
        ],
        explanation: "CRITICAL HIT! Circular reasoning goes in circles—saying 'X is true because X says it's true' proves nothing!"
    },
    {
        name: "The False Cause Rooster 🐓",
        hp: 100,
        argument: "Rooster: 'I wore my lucky socks today and scored a goal, so wearing these socks caused me to score!'",
        options: [
            { text: "🛡️ False Cause / Post Hoc (Assuming A caused B just because B happened after A!)", correct: true },
            { text: "🛡️ False Dilemma", correct: false },
            { text: "🛡️ Ad Hominem", correct: false }
        ],
        explanation: "CRITICAL HIT! Just because two events happen one after the other doesn't mean one caused the other!"
    },
    {
        name: "The No True Scotsman Gatekeeper 🚪",
        hp: 100,
        argument: "Gatekeeper: 'No kid likes broccoli.' \nChild: 'My sister loves broccoli!' \nGatekeeper: 'Well, no TRUE kid likes broccoli!'",
        options: [
            { text: "🛡️ No True Scotsman (Changing definitions or moving goalposts when proven wrong!)", correct: true },
            { text: "🛡️ Strawman Fallacy", correct: false },
            { text: "🛡️ Circular Reasoning", correct: false }
        ],
        explanation: "CRITICAL HIT! Changing the rules of the group when shown a real counter-example is moving the goalposts!"
    }
];

let currentMonsterIdx = 0;
let monsterCurrentHP = 100;
// Monsters already beaten, so re-clearing the fixed monster cycle cannot farm XP.
const defeatedMonsters = new Set();

function renderFallacyMonsterStage() {
    return `
        <div class="spotlight-card">
            <!-- Header Banner -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;">🕵️</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">Logical Fallacy Monster Spotter</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">Defeat 10 Trick Arguments with Logic Shields</span>
                    </div>
                </div>
                <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">🕵️ Fallacy Detective (10 Monsters)</div>
            </div>

            <!-- 4-Step Flow Controls -->
            <div class="viz-controls" role="tablist" aria-label="Deep-dive steps" style="margin-bottom: 24px;">
                <button role="tab" aria-selected="true" aria-controls="topicTabContent1" class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Core Intro</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent2" class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. 10 Fallacy Types</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent3" class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Monster Battle Game</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent4" class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Ask & Suggest Upgrade</button>
            </div>

            <!-- Tab 1: Intro -->
            <div id="topicTabContent1" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn1" tabindex="0">
                <h3 style="color: var(--gold-star); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 10px;">What is a Logical Fallacy?</h3>
                <p style="color: var(--text-main); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    A <strong>logical fallacy</strong> is a flaw in reasoning. Logical fallacies are like trick traps in an argument — they sound convincing at first, but when you inspect them closely, they break down! Learning to spot fallacies gives you a <strong>Logic Shield</strong> against bad arguments.
                </p>
                <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: Learn 10 Fallacy Monsters ➔</button>
            </div>

            <!-- Tab 2: 10 Fallacy Types Showcase -->
            <div id="topicTabContent2" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn2" tabindex="0" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 14px;">Meet the 10 Fallacy Monsters</h3>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
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
                    <div style="background: rgba(59,130,246,0.1); border: 1px solid #3B82F6; border-radius: 12px; padding: 16px;">
                        <h4 style="color: #3B82F6; margin-bottom: 6px;">🛷 Slippery Slope Yeti</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Claims one small action will trigger a crazy chain reaction of disasters without any proof!</p>
                    </div>
                    <div style="background: rgba(168,85,247,0.1); border: 1px solid #A855F7; border-radius: 12px; padding: 16px;">
                        <h4 style="color: #A855F7; margin-bottom: 6px;">🔀 Either-Or Specter</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Pretends there are only TWO extreme choices when middle options exist!</p>
                    </div>
                    <div style="background: rgba(249,115,22,0.1); border: 1px solid #F97316; border-radius: 12px; padding: 16px;">
                        <h4 style="color: #F97316; margin-bottom: 6px;">🦊 Red Herring Fox</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Suddenly changes the topic to a completely different subject to distract from the question!</p>
                    </div>
                    <div style="background: rgba(234,179,8,0.1); border: 1px solid #EAB308; border-radius: 12px; padding: 16px;">
                        <h4 style="color: #EAB308; margin-bottom: 6px;">👑 Crowned Authority Owl</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Claims something is true just because a famous person said it outside their expertise!</p>
                    </div>
                    <div style="background: rgba(16,185,129,0.1); border: 1px solid var(--green-hero); border-radius: 12px; padding: 16px;">
                        <h4 style="color: var(--green-hero); margin-bottom: 6px;">🐍 Circular Reasoning Snake</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Goes in circles: claims X is true simply because X states that it is true!</p>
                    </div>
                    <div style="background: rgba(239,68,68,0.1); border: 1px solid #EF4444; border-radius: 12px; padding: 16px;">
                        <h4 style="color: #EF4444; margin-bottom: 6px;">🐓 False Cause Rooster</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Assumes event A caused event B simply because B happened after A!</p>
                    </div>
                    <div style="background: rgba(99,102,241,0.1); border: 1px solid #6366F1; border-radius: 12px; padding: 16px;">
                        <h4 style="color: #6366F1; margin-bottom: 6px;">🚪 No True Scotsman Gatekeeper</h4>
                        <p style="font-size: 0.88rem; color: var(--text-main);">Moves the goalposts and changes rules when shown a real counter-example!</p>
                    </div>
                </div>

                <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Battle the 10 Monsters! ➔</button>
            </div>

            <!-- Tab 3: Monster Battle Game -->
            <div id="topicTabContent3" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn3" tabindex="0" style="display:none;">
                <div id="fallacyGameBox">
                    <!-- Loaded dynamically below -->
                </div>
            </div>

            <!-- Tab 4: Question & Upgrade Vault -->
            <div id="topicTabContent4" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn4" tabindex="0" style="display:none;">
                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest a New Monster</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about logical fallacies or want to suggest a new fallacy monster to add to this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_monster_spotter" class="sandbox-input" aria-label="Type of message" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_monster_spotter" class="sandbox-input" aria-label="Your question or idea" placeholder="Type your question or new monster idea here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('monster_spotter', 'Fallacy Monster Spotter', '🕵️')">Submit to Upgrade Vault</button>
                    
                    <div id="feedbackResult_monster_spotter" role="status" aria-live="polite" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <div style="font-weight: 900; font-size: 1.3rem; color: var(--pink-energy);">${m.name}</div>
                    <span style="color: var(--cyan-magic); font-weight: 800; font-size: 0.85rem;">Monster ${currentMonsterIdx + 1} of ${fallacyMonsters.length}</span>
                </div>
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
        const isFirstDefeat = !defeatedMonsters.has(currentMonsterIdx);
        feedback.innerHTML = `⚔️ ${m.explanation} MONSTER DEFEATED${isFirstDefeat ? ' (+25 XP)' : ''}!`;
        if (isFirstDefeat) {
            defeatedMonsters.add(currentMonsterIdx);
            if (typeof addXP === 'function') addXP(25);
        }
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
        feedback.innerHTML = `🛡️ Monster blocked your shield! Think carefully: Is this attacking the person, exaggerating, changing the subject, or assuming false causes? Try again!`;
    }
}

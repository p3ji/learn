// Logical Fallacy Monster Spotter
//
// Three things this game deliberately avoids, because each of them let a child
// win without reading the argument:
//   1. The monster's name used to BE the answer ("The Ad Hominem Goblin").
//      Names are now just names. The fallacy is only revealed after answering.
//   2. The correct option used to be first in all ten questions. Options are
//      now shuffled per question.
//   3. Ten questions in a fixed cycle. There are now 30, in a shuffled order.
//
// Wrong answers explain why THAT fallacy does not fit, rather than saying
// "try again" - so a miss teaches something.

const FALLACY_LIBRARY = {
    strawman:      { name: "Strawman",            short: "Twisting someone's argument into a sillier version, then attacking that" },
    ad_hominem:    { name: "Ad Hominem",          short: "Attacking the person instead of their argument" },
    bandwagon:     { name: "Bandwagon",           short: "Saying it must be true because lots of people believe it" },
    slippery:      { name: "Slippery Slope",      short: "Claiming one small step must lead to disaster, with no proof" },
    false_dilemma: { name: "False Dilemma",       short: "Pretending there are only two options when there are more" },
    red_herring:   { name: "Red Herring",         short: "Changing the subject to distract from the real question" },
    authority:     { name: "Appeal to Authority", short: "Trusting a famous person on something outside what they know about" },
    circular:      { name: "Circular Reasoning",  short: "Using the claim itself as the proof for the claim" },
    false_cause:   { name: "False Cause",         short: "Assuming A caused B just because B happened after A" },
    no_true:       { name: "No True Scotsman",    short: "Changing your definition when someone proves you wrong" },
    hasty:         { name: "Hasty Generalisation", short: "Drawing a big conclusion from one or two examples" },
    tradition:     { name: "Appeal to Tradition", short: "Saying it must be right because it has always been done that way" },
    tu_quoque:     { name: "Whataboutism",        short: "Dodging a criticism by pointing at someone else's faults" },
    loaded_q:      { name: "Loaded Question",     short: "A question that sneaks in an accusation you never agreed to" },
    popularity:    { name: "Appeal to Novelty",   short: "Assuming newer automatically means better" }
};

// Names carry no hint about the answer. That is the point.
const fallacyScenarios = [
    { monster: "Grubbin", emoji: "👺", fallacy: "strawman", distractors: ["ad_hominem", "red_herring"],
      argument: "Maya: 'I think we should have a bit more time for reading in class.'\nGrubbin: 'So you want to cancel maths forever and let everyone grow up unable to count!'",
      explanation: "Maya asked for a bit more reading time. Grubbin swapped that for a wild version nobody said, then knocked the wild version down." },

    { monster: "Snagtooth", emoji: "👹", fallacy: "ad_hominem", distractors: ["strawman", "slippery"],
      argument: "Ben: 'We should recycle the paper from the art room - it saves trees.'\nSnagtooth: 'Don't listen to him. His jumper is stained and he can't even ride a bike.'",
      explanation: "Snagtooth never mentioned paper, trees or recycling. Attacking Ben tells you nothing about whether Ben is right." },

    { monster: "Mizzle", emoji: "🐉", fallacy: "bandwagon", distractors: ["authority", "tradition"],
      argument: "Mizzle: 'Ten million people bought this sugary cereal last year. That proves it must be the healthiest breakfast there is!'",
      explanation: "Lots of people buying something tells you it sells well. It does not tell you what is in it." },

    { monster: "Old Thistlewick", emoji: "🛷", fallacy: "slippery", distractors: ["false_cause", "hasty"],
      argument: "Thistlewick: 'If we allow five extra minutes of break today, tomorrow nobody will study, and by next month the school will fall down.'",
      explanation: "Each step is just asserted. Nobody has shown that five extra minutes actually leads to any of it." },

    { monster: "The Fen Wraith", emoji: "🔀", fallacy: "false_dilemma", distractors: ["slippery", "strawman"],
      argument: "Fen Wraith: 'Either you let me copy your homework, or you are admitting you don't care about our friendship at all.'",
      explanation: "There are obviously other options - like helping without copying. Being handed two choices does not mean there are only two." },

    { monster: "Ferrin Foxglove", emoji: "🦊", fallacy: "red_herring", distractors: ["strawman", "tu_quoque"],
      argument: "Teacher: 'Your homework is three days late.'\nFerrin: 'But have you SEEN how expensive school lunches have got? It's outrageous!'",
      explanation: "Lunch prices might be a real problem. They are still not an answer to the question that was asked." },

    { monster: "Quillby", emoji: "👑", fallacy: "authority", distractors: ["bandwagon", "circular"],
      argument: "Quillby: 'My favourite footballer says this vitamin drink cures colds, and he's the best striker in the league - so it must work.'",
      explanation: "He may well be a brilliant striker. Being good at football is not evidence about medicine." },

    { monster: "Sable the Snake", emoji: "🐍", fallacy: "circular", distractors: ["authority", "no_true"],
      argument: "Sable: 'This book tells the truth.'\nAsker: 'How do you know?'\nSable: 'Because it says so on the first page.'",
      explanation: "The proof and the claim are the same thing. Any book at all could pass that test." },

    { monster: "Barnaby Bogwhistle", emoji: "🐓", fallacy: "false_cause", distractors: ["hasty", "slippery"],
      argument: "Barnaby: 'I wore my lucky socks and we won the match. The socks won us the game.'",
      explanation: "The socks came first and the win came after - but that is only an order of events, not a cause." },

    { monster: "The Gatekeeper", emoji: "🚪", fallacy: "no_true", distractors: ["circular", "strawman"],
      argument: "Gatekeeper: 'No real fan of this band skips a single song.'\nFriend: 'I've loved them for years and I skip one.'\nGatekeeper: 'Then you were never a real fan.'",
      explanation: "Rather than accept the counter-example, the Gatekeeper quietly rewrote what 'real fan' means so he could never be wrong." },

    { monster: "Nettle", emoji: "🌿", fallacy: "hasty", distractors: ["false_cause", "bandwagon"],
      argument: "Nettle: 'I met two people from that town and both were rude. Everyone from there is rude.'",
      explanation: "Two people is not enough to know anything about a whole town." },

    { monster: "Grandmother Bramble", emoji: "🕰️", fallacy: "tradition", distractors: ["authority", "bandwagon"],
      argument: "Bramble: 'We have always made the youngest child carry all the bags. That is how it has been for a hundred years, so it must be fair.'",
      explanation: "Something can be very old and still unfair. Age is not the same as fairness." },

    { monster: "Pipkin", emoji: "🔁", fallacy: "tu_quoque", distractors: ["red_herring", "ad_hominem"],
      argument: "Parent: 'You left your bike out in the rain again.'\nPipkin: 'Well YOU left the car window open last week!'",
      explanation: "The parent may well have done that. It still does not make the bike less rusty." },

    { monster: "Mimsy the Meddler", emoji: "❓", fallacy: "loaded_q", distractors: ["red_herring", "false_dilemma"],
      argument: "Mimsy: 'So, have you stopped cheating at cards yet? Just answer yes or no.'",
      explanation: "Both answers admit you were cheating. The accusation is smuggled into the question itself." },

    { monster: "Cogsworth", emoji: "✨", fallacy: "popularity", distractors: ["bandwagon", "authority"],
      argument: "Cogsworth: 'This tablet came out last month, so it is obviously better than the one that came out two years ago.'",
      explanation: "Newer things are sometimes better and sometimes worse. The date on the box is not evidence either way." },

    { monster: "Wobblejack", emoji: "🎭", fallacy: "strawman", distractors: ["false_dilemma", "loaded_q"],
      argument: "Sam: 'I don't think eight-year-olds should have phones at the dinner table.'\nWobblejack: 'Sam thinks children should be banned from all technology and live in a cave!'",
      explanation: "Sam said one specific thing about dinner. Wobblejack replaced it with something much bigger and easier to mock." },

    { monster: "The Puddle Troll", emoji: "🪣", fallacy: "false_cause", distractors: ["circular", "tradition"],
      argument: "Puddle Troll: 'Ice cream sales go up in the same weeks that more people get sunburnt. Ice cream must cause sunburn.'",
      explanation: "Both go up in hot sunny weather. Something else is causing both - which is why 'they happen together' is not enough." },

    { monster: "Thatcher Crane", emoji: "🗞️", fallacy: "ad_hominem", distractors: ["authority", "tu_quoque"],
      argument: "Scientist: 'My measurements show the river is polluted.'\nThatcher: 'She's only twenty-six. Far too young to know anything about rivers.'",
      explanation: "Her age is not a measurement. If the numbers are wrong, show that they are wrong." },

    { monster: "Skarrow", emoji: "🐦‍⬛", fallacy: "false_dilemma", distractors: ["bandwagon", "slippery"],
      argument: "Skarrow: 'You're either with our team completely, or you're against us. There's no middle.'",
      explanation: "Most real situations have a middle. Removing it is a way of making you pick fast instead of think." },

    { monster: "Tansy Twill", emoji: "🎣", fallacy: "red_herring", distractors: ["ad_hominem", "loaded_q"],
      argument: "Coach: 'You missed three training sessions this month.'\nTansy: 'Why does nobody ever talk about how bad the changing room smells?'",
      explanation: "The changing rooms may be grim. That is a different conversation from the one the coach started." },

    { monster: "Hoggle Brassbutton", emoji: "📣", fallacy: "bandwagon", distractors: ["tradition", "popularity"],
      argument: "Hoggle: 'Everybody in our year is saying the new teacher is unfair, so she definitely is.'",
      explanation: "A rumour repeated by thirty people is still the same rumour. Popularity is not evidence." },

    { monster: "The Chalk Golem", emoji: "🧱", fallacy: "circular", distractors: ["no_true", "tradition"],
      argument: "Chalk Golem: 'Our rules are the fairest rules.'\nAsker: 'Why?'\nGolem: 'Because we only make fair rules.'",
      explanation: "It walks in a circle and lands back where it started, without ever touching the outside world." },

    { monster: "Murkwood Mick", emoji: "🌫️", fallacy: "slippery", distractors: ["false_dilemma", "false_cause"],
      argument: "Mick: 'If you let one person bring a dog to school, next term there'll be horses in the corridor and the whole place will be a zoo.'",
      explanation: "One dog to a corridor full of horses, with nothing in between except confident predicting." },

    { monster: "Prunella Prim", emoji: "🏅", fallacy: "authority", distractors: ["tradition", "hasty"],
      argument: "Prunella: 'A famous actor said this diet is the healthiest way to eat. He has won three awards, so it must be true.'",
      explanation: "Awards for acting are awards for acting. On food, he is just a person with an opinion." },

    { monster: "Bellows", emoji: "🐸", fallacy: "hasty", distractors: ["false_cause", "no_true"],
      argument: "Bellows: 'The first two chapters of this book were boring, so the whole book is rubbish and so is everything the author has ever written.'",
      explanation: "Two chapters is a small sample, and it certainly says nothing about the author's other books." },

    { monster: "The Lantern Ghost", emoji: "🏮", fallacy: "loaded_q", distractors: ["strawman", "ad_hominem"],
      argument: "Lantern Ghost: 'Why are you always so lazy about your chores? I'm just asking a simple question.'",
      explanation: "It is not simple. It assumes you are always lazy, and any answer accepts that." },

    { monster: "Wisp", emoji: "🌬️", fallacy: "no_true", distractors: ["hasty", "circular"],
      argument: "Wisp: 'Nobody who is truly kind ever gets angry.'\nFriend: 'My gran is the kindest person I know and she got angry yesterday.'\nWisp: 'Then she isn't truly kind.'",
      explanation: "Every counter-example gets pushed outside the definition, so the claim can never be tested." },

    { monster: "Rooktoe", emoji: "⚡", fallacy: "false_cause", distractors: ["slippery", "bandwagon"],
      argument: "Rooktoe: 'Ever since the new bins arrived, the school has been colder. The bins are making it cold.'",
      explanation: "The bins arrived and then it got colder - in autumn. Order of events is not cause." },

    { monster: "Gristle", emoji: "🪞", fallacy: "tu_quoque", distractors: ["strawman", "false_dilemma"],
      argument: "Friend: 'You promised to keep my secret and you told two people.'\nGristle: 'You told someone MY secret in Year 3!'",
      explanation: "Perhaps they did. Two broken promises do not add up to one kept promise." },

    { monster: "Fenwick Drear", emoji: "🕯️", fallacy: "tradition", distractors: ["circular", "popularity"],
      argument: "Fenwick: 'Our club has never let anyone under twelve join. That's the tradition, so it must be the right rule.'",
      explanation: "A rule being old tells you it is old. Whether it is a good rule is a separate question you still have to answer." }
];

// Question order and option order are both shuffled, so neither position nor
// the monster's name can be used as a shortcut.
let scenarioOrder = [];
let currentScenarioPos = 0;
let currentOptions = [];
let monsterCurrentHP = 100;
let questionAnswered = false;
const solvedScenarios = new Set();   // XP is paid once per scenario

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function currentScenario() {
    if (scenarioOrder.length === 0) scenarioOrder = shuffle(fallacyScenarios.map((_, i) => i));
    return fallacyScenarios[scenarioOrder[currentScenarioPos]];
}

function buildOptions(scenario) {
    return shuffle([
        { key: scenario.fallacy, correct: true },
        ...scenario.distractors.map(k => ({ key: k, correct: false }))
    ]);
}

function renderFallacyMonsterStage() {
    const total = fallacyScenarios.length;
    const types = Object.keys(FALLACY_LIBRARY).length;

    return `
        <div class="spotlight-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;" aria-hidden="true">🕵️</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">Logical Fallacy Monster Spotter</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">Read the argument. The monster's name won't help you.</span>
                    </div>
                </div>
                <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">🕵️ ${total} arguments &middot; ${types} tricks</div>
            </div>

            <div class="viz-controls" role="tablist" aria-label="Deep-dive steps" style="margin-bottom: 24px;">
                <button role="tab" aria-selected="true" aria-controls="topicTabContent1" class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Core Intro</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent2" class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. The ${types} Tricks</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent3" class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Monster Battle Game</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent4" class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Ask &amp; Suggest Upgrade</button>
            </div>

            <div id="topicTabContent1" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn1" tabindex="0">
                <h3 style="color: var(--gold-star); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 10px;">What is a Logical Fallacy?</h3>
                <p style="color: var(--text-main); font-size: 1.1rem; line-height: 1.6; margin-bottom: 16px; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    A <strong>logical fallacy</strong> is a flaw in reasoning. They are like trick traps in an argument: convincing at first, but they fall apart when you look closely. Spotting them gives you a <strong>Logic Shield</strong>.
                </p>
                <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px; background: rgba(6,182,212,0.08); border-left: 3px solid var(--cyan-magic); padding: 16px; border-radius: 12px;">
                    <strong>The hard part:</strong> real fallacies do not come with a label. They come from people you like, in arguments you agree with. In this game the monsters have ordinary names on purpose &mdash; the only way to win is to read what they actually said.
                </p>
                <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: Learn the ${types} Tricks ➔</button>
            </div>

            <div id="topicTabContent2" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn2" tabindex="0" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 14px;">The ${types} Tricks</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap: 14px; margin-bottom: 20px;">
                    ${Object.values(FALLACY_LIBRARY).map(f => `
                        <div style="background: rgba(139,92,246,0.09); border: 1px solid var(--purple-primary); border-radius: 12px; padding: 14px;">
                            <h4 style="color: var(--purple-glow); margin: 0 0 6px; font-size: 1rem;">${f.name}</h4>
                            <p style="font-size: 0.92rem; color: var(--text-main); margin: 0; line-height: 1.5;">${f.short}</p>
                        </div>
                    `).join('')}
                </div>
                <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Battle the Monsters! ➔</button>
            </div>

            <div id="topicTabContent3" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn3" tabindex="0" style="display:none;">
                <div id="fallacyGameBox"></div>
            </div>

            <div id="topicTabContent4" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn4" tabindex="0" style="display:none;">
                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest a New Monster</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Spotted a trick argument in real life? Write it down here.</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
                        <select id="feedbackType_monster_spotter" class="sandbox-input" aria-label="Type of message" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_monster_spotter" class="sandbox-input" aria-label="Your question or idea" placeholder="Type your question or new monster idea here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('monster_spotter', 'Fallacy Monster Spotter', '🕵️')">Save to My Notebook</button>
                    <div id="feedbackResult_monster_spotter" role="status" aria-live="polite" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for Fallacy Monsters:</h4>
                <div id="savedFeedbackList_monster_spotter"></div>
            </div>
        </div>
    `;
}

function renderFallacyGame() {
    const container = document.getElementById('fallacyGameBox');
    if (!container) return;

    const sc = currentScenario();
    if (currentOptions.length === 0) currentOptions = buildOptions(sc);
    questionAnswered = false;

    container.innerHTML = `
        <div class="fallacy-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <div style="font-weight: 900; font-size: 1.3rem; color: var(--pink-energy);">${escapeHtml(sc.monster)} <span aria-hidden="true">${sc.emoji}</span></div>
                    <span style="color: var(--cyan-magic); font-weight: 800; font-size: 0.85rem;">
                        Argument ${currentScenarioPos + 1} of ${fallacyScenarios.length}
                        &middot; ${solvedScenarios.size} solved
                    </span>
                </div>
                <div style="background: rgba(0,0,0,0.5); padding: 6px 14px; border-radius: 12px; border: 1px solid var(--pink-energy);">
                    <span style="font-weight: 800; color: #FFF; font-size: 0.85rem;">Monster HP:</span>
                    <div style="display: inline-block; width: 100px; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; vertical-align: middle; margin-left: 8px;">
                        <div id="monsterHpBar" style="width: ${monsterCurrentHP}%; height: 100%; background: var(--pink-energy); transition: width 0.4s ease;"></div>
                    </div>
                </div>
            </div>

            <div class="monster-box">
                <div class="monster-icon" aria-hidden="true">${sc.emoji}</div>
                <div>
                    <div style="font-size: 0.8rem; color: var(--gold-star); font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">The trick argument:</div>
                    <div class="monster-dialogue" style="white-space: pre-line;">${escapeHtml(sc.argument)}</div>
                </div>
            </div>

            <div style="font-weight:800; color: var(--gold-star); margin: 16px 0 12px;">Which trick is this?</div>
            <div class="fallacy-options">
                ${currentOptions.map((opt, idx) => `
                    <button class="fallacy-opt-btn" onclick="checkFallacyAnswer(${idx})">
                        🛡️ ${FALLACY_LIBRARY[opt.key].name} <span style="opacity:0.85; font-weight:500;">(${FALLACY_LIBRARY[opt.key].short})</span>
                    </button>
                `).join('')}
            </div>

            <div id="fallacyFeedback" role="status" aria-live="polite" style="display:none; margin-top:20px; padding:16px; border-radius:12px; font-weight:700; font-size: 1rem;"></div>

            <div style="display:flex; justify-content:flex-end; margin-top:16px;">
                <button class="fb-action-btn outline" onclick="skipFallacyScenario()">Different argument ▶</button>
            </div>
        </div>
    `;
}

function nextFallacyScenario() {
    currentScenarioPos += 1;
    if (currentScenarioPos >= fallacyScenarios.length) {
        currentScenarioPos = 0;
        scenarioOrder = shuffle(fallacyScenarios.map((_, i) => i));   // reshuffle each lap
    }
    currentOptions = [];
    monsterCurrentHP = 100;
    renderFallacyGame();
}

function skipFallacyScenario() {
    nextFallacyScenario();
}

function checkFallacyAnswer(optIdx) {
    const sc = currentScenario();
    const feedback = document.getElementById('fallacyFeedback');
    const selected = currentOptions[optIdx];
    if (!feedback || !selected || questionAnswered) return;

    feedback.style.display = 'block';

    if (selected.correct) {
        questionAnswered = true;
        monsterCurrentHP = 0;
        const hpBar = document.getElementById('monsterHpBar');
        if (hpBar) hpBar.style.width = '0%';

        const scenarioId = scenarioOrder[currentScenarioPos];
        const isFirstSolve = !solvedScenarios.has(scenarioId);

        feedback.style.background = 'rgba(16, 185, 129, 0.2)';
        feedback.style.border = '1.5px solid var(--green-hero)';
        feedback.style.color = 'var(--green-hero)';
        feedback.innerHTML =
            `⚔️ <strong>Yes - that was ${FALLACY_LIBRARY[sc.fallacy].name}.</strong> ` +
            `${escapeHtml(sc.explanation)}${isFirstSolve ? ' (+25 XP)' : ''}`;

        if (isFirstSolve) {
            solvedScenarios.add(scenarioId);
            if (typeof addXP === 'function') addXP(25);
        }
        if (typeof unlockBadge === 'function') unlockBadge('fallacy_detective');

        setTimeout(nextFallacyScenario, 3200);
    } else {
        // Say why THIS wrong answer does not fit, rather than "try again".
        const picked = FALLACY_LIBRARY[selected.key];
        feedback.style.background = 'rgba(239, 68, 68, 0.15)';
        feedback.style.border = '1.5px solid #F87171';
        feedback.style.color = '#F87171';
        feedback.innerHTML =
            `🛡️ Not this time. <strong>${picked.name}</strong> means: ${picked.short.toLowerCase()}. ` +
            `Read what ${escapeHtml(sc.monster)} actually said - is that what is happening here?`;
    }
}

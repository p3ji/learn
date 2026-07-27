// Philosopher Trading Cards & Inline 3-Step Spotlight Stage
const thinkersData = [
    {
        id: "socrates",
        name: "Socrates",
        era: "Ancient Greece (469 - 399 BCE)",
        avatar: "🦉",
        quote: "The unexamined life is not worth living.",
        superpower: "The Socratic Questioning Method",
        conceptIntro: "Socrates believed that true wisdom begins when we admit we don't know everything. Instead of giving boring lectures, he asked deep 'Why?' questions to help people discover truth themselves!",
        example: "Imagine a friend says 'Cheating in video games is bad.' A Socratic thinker asks: 'Why is it bad?' ➔ 'Because it makes it unfair!' ➔ 'Why is fairness important?' ➔ Reaching first principles!",
        videoId: "bJYe5P3uJic", // Wireless Philosophy / TED-Ed Socratic Method (4 min)
        activity: {
            title: "Socratic Questioning Challenge",
            question: "Why do people need rules in society?",
            options: [
                { text: "🛡️ To stop people from hurting others so everyone can live safely!", correct: true },
                { text: "🗣️ Because grown-ups just like telling us what to do!", correct: false },
                { text: "🎮 To make games less fun!", correct: false }
            ],
            followUp: "Socrates asks: 'Why is safety important for a happy life?'",
            followUpOptions: [
                { text: "🤝 Safety lets people trust each other and build great cities together!", correct: true },
                { text: "🏆 So we can win arguments easily!", correct: false }
            ]
        }
    },
    {
        id: "hypatia",
        name: "Hypatia of Alexandria",
        era: "Ancient Egypt/Greece (360 - 415 CE)",
        avatar: "📐",
        quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
        superpower: "Mathematical Truth & Clear Evidence",
        conceptIntro: "Hypatia taught that we must test ideas with real measurements and geometry, rather than accepting rumors or superstitions.",
        example: "If someone tells you 'It rains because the sky is sad', Hypatia asks you to measure cloud humidity, water evaporation, and rainfall!",
        videoId: "k0Z4dJ9Vw6k",
        activity: {
            title: "Hypatia's Evidence Lab",
            question: "How do we prove if a scientific theory is true?",
            options: [
                { text: "🔬 By doing experiments and measuring real data!", correct: true },
                { text: "📢 By choosing whoever shouts the loudest!", correct: false }
            ]
        }
    },
    {
        id: "aristotle",
        name: "Aristotle",
        era: "Ancient Greece (384 - 322 BCE)",
        avatar: "📜",
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        superpower: "Categorization & Habit Formation",
        conceptIntro: "Aristotle organized all human knowledge into logical categories (animals, plants, ethics) and showed that great character is built by practicing good habits every day.",
        example: "You don't become a master pianist by playing once; you become a master through 100 days of small daily practice habits!",
        videoId: "O2dEuMFR8kw",
        activity: {
            title: "Aristotle's Habit & Logic Quest",
            question: "According to Aristotle, how do you become brave?",
            options: [
                { text: "🦁 By practicing small acts of bravery every day until it becomes habit!", correct: true },
                { text: "🪄 By waiting for a magic potion!", correct: false }
            ]
        }
    },
    {
        id: "aurelius",
        name: "Marcus Aurelius",
        era: "Roman Empire (121 - 180 CE)",
        avatar: "🏛️",
        quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        superpower: "Stoic Mindset & Emotional Resilience",
        conceptIntro: "Marcus Aurelius was a Roman Emperor who wrote a personal diary reminding himself that we cannot control bad weather or mean people, but we CAN control our own reaction!",
        example: "If it rains on your birthday picnic, a Stoic says: 'I can't stop the rain, but I CAN choose to have an awesome indoor board game party instead!'",
        videoId: "0t9yY59-Vls",
        activity: {
            title: "Marcus Aurelius' Stoic Control Test",
            question: "What is inside your total control?",
            options: [
                { text: "🧠 Your thoughts, choices, and how you treat others!", correct: true },
                { text: "🌧️ The weather and traffic jams!", correct: false }
            ]
        }
    },
    {
        id: "descartes",
        name: "René Descartes",
        era: "France (1596 - 1650)",
        avatar: "💭",
        quote: "I think, therefore I am.",
        superpower: "Radical Doubt & First Principles",
        conceptIntro: "Descartes doubted everything he saw to find what was 100% true. He realized: even if a trickster dragon was tricking his senses, he WAS thinking, which proved he existed!",
        example: "When you see a stick looking bent in water, Descartes reminds you that your eyes can be tricked — rely on mathematical logic instead!",
        videoId: "1RWgn9wjRVs",
        activity: {
            title: "Descartes' Certainty Puzzle",
            question: "What is 100% impossible to doubt?",
            options: [
                { text: "💭 The fact that you are currently thinking right now!", correct: true },
                { text: "👀 Everything your eyes see at a magic show!", correct: false }
            ]
        }
    },
    {
        id: "popper",
        name: "Karl Popper",
        era: "Austria/UK (1902 - 1994)",
        avatar: "🦢",
        quote: "A theory that explains everything explains nothing.",
        superpower: "Falsification (Finding Black Swans)",
        conceptIntro: "Karl Popper proved that real scientists don't just look for clues that agree with them. They actively hunt for counter-examples ('black swans') to test their theories!",
        example: "Seeing 1,000 white swans doesn't prove all swans are white. Discovering just ONE black swan instantly proves the old rule wrong!",
        videoId: "g3q-W5FjW9M",
        activity: {
            title: "Popper's Black Swan Test",
            question: "How do scientists test a theory?",
            options: [
                { text: "🔍 By searching for counter-examples that could prove it wrong!", correct: true },
                { text: "🙈 By ignoring evidence that disagrees with them!", correct: false }
            ]
        }
    }
];

let selectedThinkerId = 'socrates';

function renderThinkerCards() {
    const container = document.getElementById('thinkersGrid');
    if (!container) return;

    container.innerHTML = thinkersData.map(t => `
        <div class="thinker-card ${t.id === selectedThinkerId ? 'selected-card' : ''}" onclick="selectThinkerInline('${t.id}')">
            <div class="thinker-avatar">${t.avatar}</div>
            <h3 class="thinker-name">${t.name}</h3>
            <div class="thinker-era">${t.era}</div>
            <p class="thinker-quote">"${t.quote}"</p>
            <div class="thinker-superpower">⚡ ${t.superpower}</div>
            <div style="margin-top:12px; font-weight:800; color:var(--gold-star); font-size:0.85rem;">Click to Spotlight ➔</div>
        </div>
    `).join('');

    renderThinkerSpotlightStage(selectedThinkerId);
}

function selectThinkerInline(thinkerId) {
    selectedThinkerId = thinkerId;
    renderThinkerCards();
    
    // Smooth scroll to spotlight stage
    const stage = document.getElementById('thinkerSpotlightStage');
    if (stage) {
        stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function renderThinkerSpotlightStage(thinkerId) {
    const stage = document.getElementById('thinkerSpotlightStage');
    if (!stage) return;

    const t = thinkersData.find(x => x.id === thinkerId) || thinkersData[0];

    stage.innerHTML = `
        <div class="spotlight-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;">${t.avatar}</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">${t.name}'s Wisdom Spotlight</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">${t.era}</span>
                    </div>
                </div>
                <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">⚡ Superpower: ${t.superpower}</div>
            </div>

            <!-- 3-Step Flow Indicator Bar -->
            <div class="viz-controls" style="margin-bottom: 24px;">
                <button class="viz-step-btn active" id="tStepBtn1" onclick="switchThinkerStep(1)">Step 1: Concept Intro</button>
                <button class="viz-step-btn" id="tStepBtn2" onclick="switchThinkerStep(2)">Step 2: Video (&lt;10m) & Example</button>
                <button class="viz-step-btn" id="tStepBtn3" onclick="switchThinkerStep(3)">Step 3: Interactive Challenge</button>
            </div>

            <!-- Step 1: Concept Intro -->
            <div id="tStepContent1" class="flow-content-block">
                <h3 style="color: var(--gold-star); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 10px;">Step 1: What is ${t.superpower}?</h3>
                <p style="color: var(--text-main); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border-left: 4px solid var(--purple-primary);">${t.conceptIntro}</p>
                <button class="fb-action-btn gold" onclick="switchThinkerStep(2)">Continue to Step 2: Watch Video & Real Example ➔</button>
            </div>

            <!-- Step 2: Video & Real Example -->
            <div id="tStepContent2" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 10px;">Step 2: Real-World Example & Video Lesson</h3>
                <p style="color: var(--text-main); font-size: 1rem; margin-bottom: 16px; background: rgba(6, 182, 212, 0.1); padding: 14px; border-radius: 10px; border: 1px solid var(--cyan-magic);"><strong>Real-Life Example:</strong> ${t.example}</p>

                <!-- Responsive Embedded YouTube Player -->
                <div style="background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%; border: 2px solid var(--purple-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <iframe src="https://www.youtube.com/embed/${t.videoId}" title="${t.name} Educational Lesson" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
                    <a href="https://www.youtube.com/watch?v=${t.videoId}" target="_blank" class="fb-action-btn outline" style="text-decoration:none;">▶ Direct Link: Open in YouTube App</a>
                    <button class="fb-action-btn gold" onclick="switchThinkerStep(3)">Continue to Step 3: Try the Challenge ➔</button>
                </div>
            </div>

            <!-- Step 3: Interactive Challenge -->
            <div id="tStepContent3" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--accent-purple); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 12px;">Step 3: ${t.activity.title}</h3>
                
                <div style="background: rgba(139, 92, 246, 0.15); border: 2px solid var(--purple-primary); border-radius: 16px; padding: 24px; margin-bottom: 16px;" id="spotlightActivityBox">
                    <div style="font-size: 1.2rem; font-weight: 800; color: #FFF; margin-bottom: 18px;">"${t.activity.question}"</div>
                    <div class="fallacy-options">
                        ${t.activity.options.map((opt, i) => `
                            <button class="fallacy-opt-btn" onclick="checkSpotlightAnswer(${i}, '${t.id}')">${opt.text}</button>
                        `).join('')}
                    </div>
                </div>

                <div id="spotlightResultMsg" style="display:none; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 1rem;"></div>
            </div>
        </div>
    `;
}

function switchThinkerStep(stepNum) {
    document.querySelectorAll('#thinkerSpotlightStage .flow-content-block').forEach(b => b.style.display = 'none');
    document.querySelectorAll('#thinkerSpotlightStage .viz-step-btn').forEach(b => b.classList.remove('active'));

    const btn = document.getElementById(`tStepBtn${stepNum}`);
    const content = document.getElementById(`tStepContent${stepNum}`);

    if (btn) btn.classList.add('active');
    if (content) content.style.display = 'block';
}

function checkSpotlightAnswer(choiceIdx, thinkerId) {
    const t = thinkersData.find(x => x.id === thinkerId) || thinkersData[0];
    const opt = t.activity.options[choiceIdx];
    const msg = document.getElementById('spotlightResultMsg');

    msg.style.display = 'block';

    if (opt.correct) {
        msg.style.background = 'rgba(16, 185, 129, 0.2)';
        msg.style.border = '1.5px solid var(--green-hero)';
        msg.style.color = 'var(--green-hero)';
        msg.innerHTML = `🎉 WISDOM UNLOCKED! You applied ${t.name}'s superpower (${t.superpower}) perfectly! (+100 XP)`;
        addXP(100);
        unlockBadge('socratic_master');
    } else {
        msg.style.background = 'rgba(239, 68, 68, 0.2)';
        msg.style.border = '1.5px solid #EF4444';
        msg.style.color = '#EF4444';
        msg.innerHTML = `❌ Keep thinking! Remember ${t.name}'s key lesson: test evidence and ask "Why?" again.`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderThinkerCards();
});

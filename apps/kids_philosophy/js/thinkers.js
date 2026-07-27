// Philosopher Trading Cards & Structured 3-Step Socratic Flow
const thinkersData = [
    {
        id: "socrates",
        name: "Socrates",
        era: "Ancient Greece (469 - 399 BCE)",
        avatar: "🦉",
        quote: "The unexamined life is not worth living.",
        superpower: "The Socratic Questioning Method",
        conceptIntro: "Socrates believed that true wisdom begins by admitting we don't know everything. Instead of lecturing people, he asked deep 'Why?' questions to help them discover truth themselves!",
        example: "Imagine a friend says 'Cheating in games is bad.' A Socratic thinker asks: 'Why is it bad?' -> 'Because it makes it unfair!' -> 'Why is fairness important?' -> Reaching first principles!",
        videoId: "bJYe5P3uJic", // Wireless Philosophy: Socratic Method (4 min)
        activity: {
            question: "Why do people need rules in society?",
            options: [
                { text: "To stop people from hurting others and keep everyone safe!", correct: true },
                { text: "Because grown-ups said so!", correct: false },
                { text: "To make games boring!", correct: false }
            ],
            followUp: "Socrates asks: 'Why is safety important for a happy life?'",
            followUpOptions: [
                { text: "Safety lets people trust each other and build great things together!", correct: true },
                { text: "So we can win arguments!", correct: false }
            ]
        }
    },
    {
        id: "hypatia",
        name: "Hypatia of Alexandria",
        era: "Ancient Egypt/Greece (360 - 415 CE)",
        avatar: "📐",
        quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
        superpower: "Mathematical Truth & Clear Thinking",
        conceptIntro: "Hypatia taught that we must test ideas with evidence and math, rather than accepting rumors or superstitions.",
        example: "If someone tells you 'It rains because the sky is sad', Hypatia asks you to observe clouds, water evaporation, and rain measurements!",
        videoId: "k0Z4dJ9Vw6k",
        activity: {
            question: "How do we test if a theory about nature is true?",
            options: [
                { text: "By doing experiments and collecting real measurements!", correct: true },
                { text: "By asking who is the loudest speaker!", correct: false }
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
        bio: "Aristotle organized all knowledge into logical categories and showed that good character is built by practicing good habits every day."
    }
];

function renderThinkerCards() {
    const container = document.getElementById('thinkersGrid');
    if (!container) return;

    container.innerHTML = thinkersData.map(t => `
        <div class="thinker-card" onclick="openSocratic3StepFlow('${t.id}')">
            <div class="thinker-avatar">${t.avatar}</div>
            <h3 class="thinker-name">${t.name}</h3>
            <div class="thinker-era">${t.era}</div>
            <p class="thinker-quote">"${t.quote}"</p>
            <div class="thinker-superpower">⚡ ${t.superpower}</div>
        </div>
    `).join('');
}

function openSocratic3StepFlow(thinkerId) {
    const t = thinkersData.find(x => x.id === thinkerId) || thinkersData[0];

    let modal = document.getElementById('socraticModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'socraticModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="concept-modal-card">
            <button class="concept-modal-close" onclick="closeSocraticModal()">&times;</button>
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <div class="thinker-avatar" style="width:60px; height:60px; font-size:1.8rem; margin:0;">${t.avatar}</div>
                <div>
                    <h2 class="concept-title" style="margin:0;">${t.name}'s Wisdom Quest</h2>
                    <span class="thinker-era">${t.era}</span>
                </div>
            </div>

            <!-- 3-Step Flow Indicator -->
            <div class="viz-controls" style="margin-bottom: 20px;">
                <button class="viz-step-btn active" id="flowStepBtn1" onclick="showFlowStep(1)">Step 1: Concept Intro</button>
                <button class="viz-step-btn" id="flowStepBtn2" onclick="showFlowStep(2)">Step 2: Video & Example</button>
                <button class="viz-step-btn" id="flowStepBtn3" onclick="showFlowStep(3)">Step 3: Interactive Activity</button>
            </div>

            <!-- Step 1 Content -->
            <div id="flowContent1" class="flow-content-block">
                <h3 style="color: var(--gold-star); font-family: var(--font-heading); margin-bottom: 8px;">Step 1: What is ${t.superpower}?</h3>
                <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-bottom: 16px;">${t.conceptIntro}</p>
                <button class="fb-action-btn gold" onclick="showFlowStep(2)">Continue to Step 2: Watch Video ➔</button>
            </div>

            <!-- Step 2 Content -->
            <div id="flowContent2" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); margin-bottom: 8px;">Step 2: Real-World Example & Short Video</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;"><strong>Real Example:</strong> ${t.example}</p>
                
                <div style="background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%;">
                    <iframe src="https://www.youtube.com/embed/${t.videoId || 'bJYe5P3uJic'}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                <button class="fb-action-btn gold" onclick="showFlowStep(3)">Continue to Step 3: Try the Activity ➔</button>
            </div>

            <!-- Step 3 Content -->
            <div id="flowContent3" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--accent-purple); font-family: var(--font-heading); margin-bottom: 8px;">Step 3: Put It into Practice!</h3>
                <div style="background: rgba(139, 92, 246, 0.15); border: 2px solid var(--purple-primary); border-radius: 16px; padding: 20px;" id="socraticActivityBox">
                    <div style="font-size: 1.1rem; font-weight: 800; color: #FFF; margin-bottom: 16px;">"${t.activity.question}"</div>
                    <div class="fallacy-options">
                        ${t.activity.options.map((opt, i) => `
                            <button class="fallacy-opt-btn" onclick="checkSocraticActivity(${i}, '${t.id}')">${opt.text}</button>
                        `).join('')}
                    </div>
                </div>
                <div id="socraticResultMsg" style="display:none; margin-top: 16px; font-weight:700;"></div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function showFlowStep(stepNum) {
    document.querySelectorAll('.flow-content-block').forEach(b => b.style.display = 'none');
    document.querySelectorAll('.viz-step-btn').forEach(b => b.classList.remove('active'));

    const btn = document.getElementById(`flowStepBtn${stepNum}`);
    const content = document.getElementById(`flowContent${stepNum}`);

    if (btn) btn.classList.add('active');
    if (content) content.style.display = 'block';
}

function checkSocraticActivity(choiceIdx, thinkerId) {
    const t = thinkersData.find(x => x.id === thinkerId) || thinkersData[0];
    const opt = t.activity.options[choiceIdx];
    const msg = document.getElementById('socraticResultMsg');

    msg.style.display = 'block';

    if (opt.correct) {
        msg.style.color = 'var(--green-hero)';
        msg.innerHTML = `🎉 WISDOM UNLOCKED! You applied ${t.superpower} perfectly! (+100 XP)`;
        addXP(100);
        unlockBadge('socratic_master');
    } else {
        msg.style.color = '#EF4444';
        msg.innerHTML = `❌ Keep digging! Think about first principles and ask "Why?" again.`;
    }
}

function closeSocraticModal() {
    const modal = document.getElementById('socraticModal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderThinkerCards();
});

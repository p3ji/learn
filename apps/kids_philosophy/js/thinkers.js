// Philosopher Trading Cards & Socratic Simulator Data
const thinkersData = [
    {
        id: "socrates",
        name: "Socrates",
        era: "Ancient Greece (469 - 399 BCE)",
        avatar: "🦉",
        quote: "The unexamined life is not worth living.",
        superpower: "The Socratic Question (Asking 'Why?' to find truth)",
        bio: "Socrates walked around Athens asking people tricky questions about justice, courage, and truth until they realized they didn't know as much as they thought!"
    },
    {
        id: "hypatia",
        name: "Hypatia of Alexandria",
        era: "Ancient Egypt/Greece (360 - 415 CE)",
        avatar: "📐",
        quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
        superpower: "Mathematical Truth & Astronomical Wonder",
        bio: "Hypatia was a brilliant astronomer and mathematician who taught students from all over the world how to solve complex geometric puzzles!"
    },
    {
        id: "aristotle",
        name: "Aristotle",
        era: "Ancient Greece (384 - 322 BCE)",
        avatar: "📜",
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        superpower: "Categorization & Logic Trees",
        bio: "Aristotle loved organizing everything in the universe into categories — animals, plants, politics, and logic rules!"
    },
    {
        id: "aurelius",
        name: "Marcus Aurelius",
        era: "Roman Empire (121 - 180 CE)",
        avatar: "🏛️",
        quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        superpower: "Stoic Mindset (Mastering Emotions)",
        bio: "A Roman Emperor who wrote a personal diary ('Meditations') reminding himself to stay calm, kind, and brave even during hard times."
    },
    {
        id: "descartes",
        name: "René Descartes",
        era: "France (1596 - 1650)",
        avatar: "💭",
        quote: "I think, therefore I am.",
        superpower: "Radical Doubt & First Principles",
        bio: "Descartes wondered if everything he saw could be a dream, but realized one thing was 100% certain: he was thinking!"
    },
    {
        id: "popper",
        name: "Karl Popper",
        era: "Austria/UK (1902 - 1994)",
        avatar: "🦢",
        quote: "A theory that explains everything explains nothing.",
        superpower: "Falsification (Finding Black Swans)",
        bio: "Popper showed that true science tries to PROVE theories wrong by hunting for counter-examples instead of just collecting easy clues."
    },
    {
        id: "beauvoir",
        name: "Simone de Beauvoir",
        era: "France (1908 - 1986)",
        avatar: "🌟",
        quote: "Change your life today. Don't gamble on the future, act now, without delay.",
        superpower: "Existential Freedom & Choosing Your Identity",
        bio: "Simone argued that you aren't born with a fixed destiny — you create who you are through your choices every single day!"
    }
];

function renderThinkerCards() {
    const container = document.getElementById('thinkersGrid');
    if (!container) return;

    container.innerHTML = thinkersData.map(t => `
        <div class="thinker-card" onclick="openSocraticDialogue('${t.id}')">
            <div class="thinker-avatar">${t.avatar}</div>
            <h3 class="thinker-name">${t.name}</h3>
            <div class="thinker-era">${t.era}</div>
            <p class="thinker-quote">"${t.quote}"</p>
            <div class="thinker-superpower">⚡ ${t.superpower}</div>
        </div>
    `).join('');
}

// Socratic Challenge State
let socraticStep = 0;
let currentQuestion = "";

function openSocraticDialogue(thinkerId) {
    const thinker = thinkersData.find(t => t.id === thinkerId);
    if (!thinker) return;

    socraticStep = 1;
    currentQuestion = "Why do people need rules in society?";

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
                <div class="thinker-avatar" style="width:60px; height:60px; font-size:1.8rem; margin:0;">${thinker.avatar}</div>
                <div>
                    <h2 class="concept-title" style="margin:0;">Socratic Challenge with ${thinker.name}</h2>
                    <span class="thinker-era">${thinker.era}</span>
                </div>
            </div>

            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">${thinker.bio}</p>

            <div style="background: rgba(139, 92, 246, 0.15); border: 2px solid var(--purple-primary); border-radius: 16px; padding: 20px; margin-bottom: 20px;" id="socraticBox">
                <div style="font-size: 0.8rem; color: var(--gold-star); font-weight: 800; text-transform: uppercase; margin-bottom: 6px;">Socratic Question #1:</div>
                <div style="font-size: 1.15rem; font-weight: 800; color: #FFF; margin-bottom: 16px;">"${currentQuestion}"</div>
                
                <div class="fallacy-options">
                    <button class="fallacy-opt-btn" onclick="answerSocratic(1)">To stop people from doing bad things!</button>
                    <button class="fallacy-opt-btn" onclick="answerSocratic(2)">So that everyone can share and live safely!</button>
                    <button class="fallacy-opt-btn" onclick="answerSocratic(3)">Because grown-ups said so!</button>
                </div>
            </div>

            <div id="socraticResult" style="display:none; background: rgba(16, 185, 129, 0.15); border: 1.5px solid var(--green-hero); border-radius: 12px; padding: 16px; color: var(--green-hero); font-weight:700;"></div>
        </div>
    `;

    modal.style.display = 'flex';
}

function answerSocratic(choiceNum) {
    const box = document.getElementById('socraticBox');
    const res = document.getElementById('socraticResult');

    if (socraticStep === 1) {
        socraticStep = 2;
        box.innerHTML = `
            <div style="font-size: 0.8rem; color: var(--gold-star); font-weight: 800; text-transform: uppercase; margin-bottom: 6px;">Socratic Follow-Up #2 (Digging Deeper):</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #FFF; margin-bottom: 16px;">"Interesting! But WHY is sharing and living safely good? What makes something 'good'?"</div>
            
            <div class="fallacy-options">
                <button class="fallacy-opt-btn" onclick="answerSocratic(1)">Good means helping others feel happy and healthy!</button>
                <button class="fallacy-opt-btn" onclick="answerSocratic(2)">Good is whatever makes me win the game!</button>
            </div>
        `;
    } else if (socraticStep === 2) {
        socraticStep = 3;
        box.style.display = 'none';
        res.style.display = 'block';
        res.innerHTML = `🎉 WISDOM UNLOCKED (+100 XP)! You asked "Why?" 3 times and reached a First Principle! Socrates approves of your curious mind!`;
        addXP(100);
        unlockBadge('socratic_master');
    }
}

function closeSocraticModal() {
    const modal = document.getElementById('socraticModal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderThinkerCards();
});

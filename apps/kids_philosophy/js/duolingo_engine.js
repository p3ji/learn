// Daily streak and daily goals.
//
// Deliberately NOT here: a leaderboard. It previously ranked the child against
// five invented children with invented scores. Manufacturing peers to make an
// 8-year-old feel behind has nothing to do with philosophy, so it is gone.

let streakState = {
    currentStreak: 1,
    lastLoginDate: new Date().toDateString(),
    questsCompleted: [false, false, false]
};

// Each goal is completed by DOING the thing (see markDailyQuest callers).
// There is no "claim" button: the reward follows the work, never precedes it.
const DAILY_QUESTS = [
    { id: 1, title: "📖 Read a story scene", xp: 20, req: "story", hint: "Open any topic and move through the story." },
    { id: 2, title: "✍️ Write one reflection", xp: 60, req: "reflect", hint: "Open Inquiry tab - say which idea convinces you, and why." },
    { id: 3, title: "❓ Save a question to discuss", xp: 40, req: "question", hint: "Socratic Journal - write something you want to ask a grown-up." }
];

function markDailyQuest(req) {
    const idx = DAILY_QUESTS.findIndex(q => q.req === req);
    if (idx === -1 || streakState.questsCompleted[idx]) return;
    streakState.questsCompleted[idx] = true;
    saveStreakState();
    if (typeof addXP === 'function') addXP(DAILY_QUESTS[idx].xp);
    if (typeof showToast === 'function') showToast(`Daily goal done: ${DAILY_QUESTS[idx].title}`, 'green');
}

function initDuolingoEngine() {
    loadStreakState();
    renderHeaderStreakPill();
}

function loadStreakState() {
    const saved = localStorage.getItem('kids_quest_streak_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();

            if (parsed.lastLoginDate === today) {
                streakState = parsed;
            } else if (parsed.lastLoginDate === yesterday) {
                parsed.currentStreak += 1;
                parsed.lastLoginDate = today;
                parsed.questsCompleted = [false, false, false];
                streakState = parsed;
            } else {
                parsed.currentStreak = 1;
                parsed.lastLoginDate = today;
                parsed.questsCompleted = [false, false, false];
                streakState = parsed;
            }
            saveStreakState();
        } catch (e) {
            console.error(e);
        }
    } else {
        saveStreakState();
    }
}

function saveStreakState() {
    localStorage.setItem('kids_quest_streak_state', JSON.stringify(streakState));
}

function renderHeaderStreakPill() {
    let container = document.getElementById('headerStreakContainer');
    if (!container) {
        const xpPill = document.querySelector('.xp-pill');
        if (xpPill && xpPill.parentElement) {
            container = document.createElement('div');
            container.id = 'headerStreakContainer';
            container.style.display = 'inline-block';
            container.style.marginRight = '12px';
            xpPill.parentElement.insertBefore(container, xpPill);
        }
    }

    if (container) {
        container.innerHTML = `
            <button type="button" class="xp-pill" aria-label="${streakState.currentStreak} day streak. Open today's goals." style="background: rgba(239, 68, 68, 0.15); border-color: var(--red-streak-text); cursor: pointer; font: inherit;" onclick="openDuolingoDashboardModal()">
                <span aria-hidden="true" style="font-size: 1.2rem;">🔥</span>
                <span style="color: var(--red-streak-text); font-weight: 900; font-size: 1rem;">${streakState.currentStreak} Day Streak</span>
            </button>
        `;
    }
}

function openDuolingoDashboardModal() {
    let modal = document.getElementById('duolingoDashboardModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'duolingoDashboardModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    const totalXP = (typeof currentProfile !== 'undefined') ? currentProfile.xp : 150;
    const writtenCount = (typeof countWrittenReflections === 'function') ? countWrittenReflections() : 0;

    modal.innerHTML = `
        <div class="concept-modal-card" style="max-width: 650px;">
            <button class="concept-modal-close" onclick="document.getElementById('duolingoDashboardModal').style.display='none'">&times;</button>
            
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">
                <div style="font-size: 3rem; background: rgba(239, 68, 68, 0.2); padding: 8px 16px; border-radius: 20px; border: 1.5px solid #EF4444;">🔥</div>
                <div>
                    <h2 class="concept-title" style="margin: 0; font-size: 1.6rem;">${streakState.currentStreak} Day Learning Streak!</h2>
                    <span style="color: var(--gold-star); font-weight: 700; font-size: 0.9rem;">Keep learning daily to maintain your fire!</span>
                </div>
            </div>

            <!-- Daily Quests Section -->
            <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--purple-primary); border-radius: 16px; padding: 18px; margin-bottom: 20px;">
                <h3 style="color: var(--gold-star); font-size: 1.1rem; margin-bottom: 12px;">🎯 Today's Goals</h3>
                ${DAILY_QUESTS.map((q, i) => `
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; background: rgba(255,255,255,0.04); padding: 12px 16px; border-radius: 12px; margin-bottom: 8px;">
                        <div>
                            <span style="font-weight: 800; color: #FFF; font-size: 1rem;">${q.title}</span>
                            <span style="color: var(--gold-star); font-weight: 700; font-size: 0.85rem; margin-left: 10px;">+${q.xp} XP</span>
                            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">${q.hint}</div>
                        </div>
                        <span class="nb-badge" style="white-space: nowrap; background: ${streakState.questsCompleted[i] ? 'var(--green-hero)' : 'rgba(255,255,255,0.1)'}; color: ${streakState.questsCompleted[i] ? '#000' : 'var(--text-muted)'};">
                            ${streakState.questsCompleted[i] ? '✓ Done' : 'Not yet'}
                        </span>
                    </div>
                `).join('')}
            </div>

            <!-- Personal Reflection Mastery Trail -->
            <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--cyan-magic); border-radius: 16px; padding: 18px;">
                <h3 style="color: var(--cyan-magic); font-size: 1.1rem; margin-bottom: 12px;">📜 Personal Reflection Mastery Trail</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                    <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid var(--cyan-magic); padding: 14px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; color: var(--cyan-magic); font-weight: 900;">${writtenCount}</div>
                        <div style="font-size: 0.85rem; color: #FFF; font-weight: 700;">Reflections written</div>
                    </div>
                    <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid var(--gold-star); padding: 14px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; color: var(--gold-star); font-weight: 900;">${totalXP} XP</div>
                        <div style="font-size: 0.85rem; color: #FFF; font-weight: 700;">Total Reflective XP</div>
                    </div>
                </div>

                <div style="text-align: center;">
                    <button class="fb-action-btn gold" onclick="exportStudentReflectionJournal()">📄 Export Full Reflection Journal for Parents & Teachers</button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

// `claimDailyQuest` is deliberately gone. It granted XP for pressing a button
// labelled with a task the child had not done. Goals now complete via
// markDailyQuest(), called from the code path that performs the actual work.

document.addEventListener('DOMContentLoaded', () => {
    initDuolingoEngine();
});

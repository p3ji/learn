// Duolingo-Style Gamification Engine: Streaks, Quest Roadmap Trail, Weekly Leaderboard & Mystery Chests

let streakState = {
    currentStreak: 1,
    lastLoginDate: new Date().toDateString(),
    questsCompleted: [false, false, false]
};

const DAILY_QUESTS = [
    { id: 1, title: "📖 Read 1 Storybook Scene", xp: 50, req: "story" },
    { id: 2, title: "🎮 Win 1 Game Level", xp: 100, req: "game" },
    { id: 3, title: "💬 Ask 1 Philosopher a Question", xp: 50, req: "chat" }
];

const CADET_LEAGUE = [
    { rank: 1, name: "Cadet Sophia (Level 8)", xp: 1250, badge: "💎 Diamond" },
    { rank: 2, name: "Cadet Leo (Level 6)", xp: 980, badge: "🥇 Gold" },
    { rank: 3, name: "You (Cadet Thinker)", xp: 450, badge: "🥈 Silver" },
    { rank: 4, name: "Cadet Maya (Level 4)", xp: 320, badge: "🥉 Bronze" },
    { rank: 5, name: "Cadet Alex (Level 3)", xp: 180, badge: "🌱 Novice" }
];

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
            <div class="xp-pill" style="background: rgba(239, 68, 68, 0.15); border-color: #EF4444; cursor: pointer;" onclick="openDuolingoDashboardModal()">
                <span style="font-size: 1.2rem;">🔥</span>
                <span style="color: #EF4444; font-weight: 900; font-size: 0.95rem;">${streakState.currentStreak} Day Streak</span>
            </div>
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

    const totalXP = (typeof currentProfile !== 'undefined') ? currentProfile.xp : 450;
    // Update player XP in simulated leaderboard
    CADET_LEAGUE[2].xp = totalXP;

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
                <h3 style="color: var(--gold-star); font-size: 1.1rem; margin-bottom: 12px;">🎯 Today's Daily Quests</h3>
                ${DAILY_QUESTS.map((q, i) => `
                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.04); padding: 12px 16px; border-radius: 12px; margin-bottom: 8px;">
                        <div>
                            <span style="font-weight: 800; color: #FFF; font-size: 0.95rem;">${q.title}</span>
                            <span style="color: var(--gold-star); font-weight: 700; font-size: 0.82rem; margin-left: 10px;">+${q.xp} XP</span>
                        </div>
                        <button class="fb-action-btn ${streakState.questsCompleted[i] ? 'outline' : 'gold'}" style="padding: 4px 12px; font-size: 0.8rem;" ${streakState.questsCompleted[i] ? 'disabled' : ''} onclick="claimDailyQuest(${i}, ${q.xp})">
                            ${streakState.questsCompleted[i] ? '✓ Claimed' : 'Claim Reward'}
                        </button>
                    </div>
                `).join('')}
            </div>

            <!-- Personal Reflection Mastery Trail -->
            <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--cyan-magic); border-radius: 16px; padding: 18px;">
                <h3 style="color: var(--cyan-magic); font-size: 1.1rem; margin-bottom: 12px;">📜 Personal Reflection Mastery Trail</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                    <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid var(--cyan-magic); padding: 14px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; color: var(--cyan-magic); font-weight: 900;">${Object.keys(JSON.parse(localStorage.getItem('kids_p4c_journal') || '{}')).length}</div>
                        <div style="font-size: 0.85rem; color: #FFF; font-weight: 700;">Saved Journal Reflections</div>
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

function claimDailyQuest(idx, xpAmount) {
    if (!streakState.questsCompleted[idx]) {
        streakState.questsCompleted[idx] = true;
        saveStreakState();
        if (typeof addXP === 'function') addXP(xpAmount);
        openDuolingoDashboardModal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDuolingoEngine();
});

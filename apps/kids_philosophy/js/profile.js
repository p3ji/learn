// RTS Commander Account & Profile Manager

let currentProfile = {
    username: "Cadet Thinker",
    avatar: "🦉",
    xp: 150,
    level: 1,
    rank: "Novice Thinker",
    badges: ["young_thinker"]
};

function initProfileSystem() {
    const savedActive = localStorage.getItem('kids_active_profile');
    if (savedActive) {
        const allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
        if (allProfiles[savedActive]) {
            currentProfile = allProfiles[savedActive];
        }
    } else {
        saveProfileState();
    }
    updateProfileUI();
}

function saveProfileState() {
    let allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
    allProfiles[currentProfile.username] = currentProfile;
    localStorage.setItem('kids_rts_profiles', JSON.stringify(allProfiles));
    localStorage.setItem('kids_active_profile', currentProfile.username);
}

function updateProfileUI() {
    const level = Math.floor(currentProfile.xp / 200) + 1;
    currentProfile.level = level;
    
    if (level === 1) currentProfile.rank = "Cadet Thinker";
    else if (level === 2) currentProfile.rank = "Scholar Thinker";
    else if (level === 3) currentProfile.rank = "Socratic Knight";
    else currentProfile.rank = "Grand Philosopher";

    // Update Header Pill
    const avatarEl = document.getElementById('rtsUserAvatar');
    const nameEl = document.getElementById('rtsUserName');
    const levelBadge = document.getElementById('xpLevelBadge');
    const xpBar = document.getElementById('xpBarFill');
    const xpText = document.getElementById('xpTextDisplay');

    if (avatarEl) avatarEl.innerText = currentProfile.avatar;
    if (nameEl) nameEl.innerText = currentProfile.username;
    if (levelBadge) levelBadge.innerText = `Lvl ${currentProfile.level}: ${currentProfile.rank}`;
    
    const percent = Math.min(100, Math.round(((currentProfile.xp % 200) / 200) * 100));
    if (xpBar) xpBar.style.width = `${percent}%`;
    if (xpText) xpText.innerText = `${currentProfile.xp} XP`;

    saveProfileState();
}

function openAccountLoginModal() {
    let modal = document.getElementById('rtsLoginModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'rtsLoginModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    const allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
    const profileKeys = Object.keys(allProfiles);

    modal.innerHTML = `
        <div class="concept-modal-card">
            <button class="concept-modal-close" onclick="closeAccountLoginModal()">&times;</button>
            <div class="concept-badge-tag">RTS COMMANDER PROFILE</div>
            <h2 class="concept-title" style="margin-bottom: 6px;">Thinker Account Manager</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Log in, switch profile (for 8 & 12 yr olds), or customize your avatar!</p>

            <div style="background: rgba(139, 92, 246, 0.15); border: 1.5px solid var(--purple-primary); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: var(--gold-star); font-size: 1.1rem; margin-bottom: 12px;">Active Commander:</h3>
                
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                    <div style="font-size: 3rem; background: rgba(0,0,0,0.4); padding: 8px 14px; border-radius: 16px;">${currentProfile.avatar}</div>
                    <div>
                        <div style="font-weight: 800; font-size: 1.2rem; color: #FFF;">${escapeHtml(currentProfile.username)}</div>
                        <div style="color: var(--cyan-magic); font-weight: 700; font-size: 0.9rem;">${currentProfile.rank} (${currentProfile.xp} Total XP)</div>
                    </div>
                </div>

                <div class="sandbox-input-group" style="margin-bottom: 12px;">
                    <label class="sandbox-label">Change Call-Sign / Username:</label>
                    <input type="text" id="rtsInputUsername" class="sandbox-input" value="${escapeHtml(currentProfile.username)}">
                </div>

                <div class="sandbox-input-group">
                    <label class="sandbox-label">Choose Avatar Badge:</label>
                    <div style="display: flex; gap: 10px; font-size: 1.8rem;">
                        <button class="fallacy-opt-btn" onclick="selectAvatar('🦉')">🦉</button>
                        <button class="fallacy-opt-btn" onclick="selectAvatar('🧙')">🧙</button>
                        <button class="fallacy-opt-btn" onclick="selectAvatar('🚀')">🚀</button>
                        <button class="fallacy-opt-btn" onclick="selectAvatar('🐉')">🐉</button>
                        <button class="fallacy-opt-btn" onclick="selectAvatar('🏛️')">🏛️</button>
                        <button class="fallacy-opt-btn" onclick="selectAvatar('🦊')">🦊</button>
                    </div>
                </div>

                <button class="fb-action-btn gold" style="width: 100%; margin-top: 12px;" onclick="saveCurrentProfileEdits()">Save Profile Edits</button>
            </div>

            <div>
                <h3 style="color: var(--gold-star); font-size: 1.05rem; margin-bottom: 10px;">Switch Commander Account:</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${profileKeys.map(k => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.5); padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
                            <span>${allProfiles[k].avatar} <strong>${escapeHtml(k)}</strong> (${allProfiles[k].xp} XP)</span>
                            <button class="fb-action-btn outline" onclick="switchActiveProfile('${escapeJsString(k)}')">Log In</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeAccountLoginModal() {
    const modal = document.getElementById('rtsLoginModal');
    if (modal) modal.style.display = 'none';
}

function selectAvatar(emoji) {
    currentProfile.avatar = emoji;
    saveProfileState();
    updateProfileUI();
}

function saveCurrentProfileEdits() {
    const newName = document.getElementById('rtsInputUsername').value.trim();
    if (newName && newName !== currentProfile.username) {
        currentProfile.username = newName;
    }
    saveProfileState();
    updateProfileUI();
    closeAccountLoginModal();
    alert("Commander Profile Updated!");
}

function switchActiveProfile(username) {
    const allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
    if (allProfiles[username]) {
        currentProfile = allProfiles[username];
        saveProfileState();
        updateProfileUI();
        closeAccountLoginModal();
        alert(`Logged in as Commander ${username}!`);
    }
}

function addXP(amount) {
    currentProfile.xp += amount;
    updateProfileUI();
}

function unlockBadge(badgeId) {
    if (!currentProfile.badges.includes(badgeId)) {
        currentProfile.badges.push(badgeId);
        saveProfileState();
        updateBadgeDisplay();
        alert(`🏆 BADGE UNLOCKED! You earned the '${badgeId.toUpperCase().replace('_', ' ')}' Commander Badge!`);
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeJsString(text) {
    return text.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}

document.addEventListener('DOMContentLoaded', () => {
    initProfileSystem();
});

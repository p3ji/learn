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

let selectedNewAvatar = "🦉";

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
        <div class="concept-modal-card" style="max-width: 600px;">
            <button class="concept-modal-close" onclick="closeAccountLoginModal()">&times;</button>
            <div class="nb-badge" style="background: var(--purple-primary); color: #FFF; font-size: 0.8rem; margin-bottom: 8px;">👤 ACCOUNT MANAGER</div>
            <h2 class="concept-title" style="margin-bottom: 6px;">Thinker Cadet Profiles</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Log in, create a new cadet account, or customize your avatar!</p>

            <!-- Active Commander Profile Customizer -->
            <div style="background: rgba(139, 92, 246, 0.15); border: 1.5px solid var(--purple-primary); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: var(--gold-star); font-size: 1.05rem; margin-bottom: 12px;">Active Profile Settings:</h3>
                
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                    <div style="font-size: 3rem; background: rgba(0,0,0,0.4); padding: 8px 14px; border-radius: 16px; border: 1px solid var(--gold-star);">${currentProfile.avatar}</div>
                    <div>
                        <div style="font-weight: 800; font-size: 1.2rem; color: #FFF;">${escapeHtml(currentProfile.username)}</div>
                        <div style="color: var(--cyan-magic); font-weight: 700; font-size: 0.9rem;">${currentProfile.rank} (${currentProfile.xp} Total XP)</div>
                    </div>
                </div>

                <div class="sandbox-input-group" style="margin-bottom: 12px;">
                    <label class="sandbox-label" style="color: var(--gold-star); font-weight:700;">Edit Username / Call-Sign:</label>
                    <input type="text" id="rtsInputUsername" class="sandbox-input" value="${escapeHtml(currentProfile.username)}">
                </div>

                <div class="sandbox-input-group" style="margin-bottom: 12px;">
                    <label class="sandbox-label" style="color: var(--cyan-magic); font-weight:700;">Choose Avatar:</label>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${['🦉', '🧙', '🚀', '🐉', '🏛️', '🦊', '🎨', '⚔️', '🌊', '⚡'].map(e => `
                            <button class="fb-action-btn ${currentProfile.avatar === e ? 'gold' : 'outline'}" style="font-size: 1.4rem; padding: 6px 12px;" onclick="selectAvatar('${e}')">${e}</button>
                        `).join('')}
                    </div>
                </div>

                <button class="fb-action-btn gold" style="width: 100%; margin-top: 8px;" onclick="saveCurrentProfileEdits()">Save Profile Changes</button>
            </div>

            <!-- Create New Cadet Profile Section -->
            <div style="background: rgba(6, 182, 212, 0.08); border: 1.5px solid var(--cyan-magic); border-radius: 16px; padding: 18px; margin-bottom: 20px;">
                <h3 style="color: var(--cyan-magic); font-size: 1.05rem; margin-bottom: 10px;">➕ Create New Cadet Account:</h3>
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <input type="text" id="newCadetUsername" class="sandbox-input" placeholder="Type new Cadet name..." style="flex:1;">
                    <button class="fb-action-btn gold" onclick="createNewCadetProfile()">Create & Log In</button>
                </div>
            </div>

            <!-- All Saved Accounts List -->
            <div>
                <h3 style="color: var(--gold-star); font-size: 1.05rem; margin-bottom: 10px;">Switch Between Saved Accounts:</h3>
                <div style="display: flex; flex-direction: column; gap: 8px; max-height: 180px; overflow-y: auto;">
                    ${profileKeys.map(k => {
                        const isCurrent = k === currentProfile.username;
                        const p = allProfiles[k];
                        return `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.5); padding: 10px 16px; border-radius: 10px; border: ${isCurrent ? '1.5px solid var(--gold-star)' : '1px solid rgba(255,255,255,0.1)'};">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <span style="font-size: 1.4rem;">${p.avatar}</span>
                                    <strong style="color: ${isCurrent ? 'var(--gold-star)' : '#FFF'};">${escapeHtml(k)}</strong>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);">(${p.xp} XP)</span>
                                </div>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    ${isCurrent ? `
                                        <span class="nb-badge" style="background: var(--gold-star); color: #000; font-size: 0.75rem;">Active</span>
                                    ` : `
                                        <button class="fb-action-btn gold" style="padding: 4px 12px; font-size: 0.8rem;" onclick="switchActiveProfile('${escapeJsString(k)}')">Log In</button>
                                        <button class="fb-action-btn outline" style="padding: 4px 8px; font-size: 0.8rem; border-color:#EF4444; color:#EF4444;" onclick="deleteCadetProfile('${escapeJsString(k)}')">🗑️</button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
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
    openAccountLoginModal();
}

function saveCurrentProfileEdits() {
    const input = document.getElementById('rtsInputUsername');
    if (!input) return;
    const newName = input.value.trim();
    const oldName = currentProfile.username;

    if (newName && newName !== oldName) {
        let allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
        delete allProfiles[oldName];
        currentProfile.username = newName;
        allProfiles[newName] = currentProfile;
        localStorage.setItem('kids_rts_profiles', JSON.stringify(allProfiles));
        localStorage.setItem('kids_active_profile', newName);
    } else {
        saveProfileState();
    }

    updateProfileUI();
    openAccountLoginModal();
    alert("Commander Profile Updated!");
}

function createNewCadetProfile() {
    const input = document.getElementById('newCadetUsername');
    if (!input || !input.value.trim()) {
        alert("Please enter a username for the new Cadet!");
        return;
    }
    const name = input.value.trim();
    let allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');

    currentProfile = {
        username: name,
        avatar: "🦉",
        xp: 150,
        level: 1,
        rank: "Novice Thinker",
        badges: ["young_thinker"]
    };

    allProfiles[name] = currentProfile;
    localStorage.setItem('kids_rts_profiles', JSON.stringify(allProfiles));
    localStorage.setItem('kids_active_profile', name);

    updateProfileUI();
    openAccountLoginModal();
    alert(`Welcome to Philosopher's Quest, Cadet ${name}! Account created & logged in!`);
}

function switchActiveProfile(username) {
    const allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
    if (allProfiles[username]) {
        currentProfile = allProfiles[username];
        localStorage.setItem('kids_active_profile', username);
        updateProfileUI();
        openAccountLoginModal();
        alert(`Logged in as Commander ${username}!`);
    }
}

function deleteCadetProfile(username) {
    if (confirm(`Are you sure you want to delete profile '${username}'?`)) {
        let allProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
        delete allProfiles[username];
        localStorage.setItem('kids_rts_profiles', JSON.stringify(allProfiles));
        openAccountLoginModal();
    }
}

function addXP(amount) {
    currentProfile.xp += amount;
    updateProfileUI();
    showFloatingXP(amount);
}

function showFloatingXP(amount) {
    const pop = document.createElement('div');
    pop.className = 'xp-popup-floating';
    pop.innerHTML = `+${amount} XP ✨`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1800);
}

function unlockBadge(badgeId) {
    if (!currentProfile.badges.includes(badgeId)) {
        currentProfile.badges.push(badgeId);
        saveProfileState();
        updateBadgeDisplay();
        showFloatingXP(150);
        alert(`🏆 BADGE UNLOCKED! You earned the '${badgeId.toUpperCase().replace('_', ' ')}' Commander Badge!`);
    }
}

function openTrophyDetailModal(badgeId) {
    let modal = document.getElementById('trophyDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'trophyDetailModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    const isUnlocked = currentProfile.badges.includes(badgeId);
    const badgeNames = {
        young_thinker: { title: "🌱 Young Thinker", desc: "Welcome to Philosopher's Quest! Unlocked upon joining.", reward: "+50 XP" },
        socratic_master: { title: "🦉 Socratic Master", desc: "Master the Socratic Questioning Challenge under Socrates.", reward: "+100 XP" },
        first_principles: { title: "⚡ First Principles", desc: "Complete the Chef vs Recipe & Snowmobile Dismantler Game.", reward: "+100 XP" },
        occams_razor: { title: "🗡️ Razor Sharp", desc: "Trim away wild mystery theories with Occam's Razor.", reward: "+75 XP" },
        cave_explorer: { title: "☀️ Cave Explorer", desc: "Escape Plato's Cave and step outside into the sunlight!", reward: "+100 XP" },
        fallacy_detective: { title: "🕵️ Fallacy Detective", desc: "Defeat a trick Fallacy Monster using your Logic Shield.", reward: "+100 XP" }
    };

    const info = badgeNames[badgeId] || { title: badgeId, desc: "Special achievement badge.", reward: "+50 XP" };

    modal.innerHTML = `
        <div class="concept-modal-card" style="text-align: center;">
            <button class="concept-modal-close" onclick="document.getElementById('trophyDetailModal').style.display='none'">&times;</button>
            <div style="font-size: 3.5rem; margin-bottom: 12px;">${info.title.split(' ')[0]}</div>
            <h2 class="concept-title" style="margin-bottom: 6px;">${escapeHtml(info.title)}</h2>
            <div class="nb-badge" style="font-size: 0.85rem; margin-bottom: 16px; background: ${isUnlocked ? 'var(--gold-star)' : 'rgba(255,255,255,0.1)'}; color: ${isUnlocked ? '#000' : 'var(--text-muted)'};">
                ${isUnlocked ? '✅ UNLOCKED' : '🔒 LOCKED BADGE'}
            </div>
            <p style="color: var(--text-main); font-size: 1.05rem; margin-bottom: 20px;">${escapeHtml(info.desc)}</p>
            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid var(--gold-star); border-radius: 12px; padding: 12px; color: var(--gold-star); font-weight: 800; display: inline-block;">
                Reward: ${info.reward}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function updateBadgeDisplay() {
    document.querySelectorAll('.badge-item').forEach(b => {
        const id = b.getAttribute('data-badge-id');
        if (currentProfile.badges.includes(id)) {
            b.classList.add('unlocked');
        }
        b.onclick = () => openTrophyDetailModal(id);
    });
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeJsString(text) {
    return text.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}

document.addEventListener('DOMContentLoaded', () => {
    initProfileSystem();
    updateBadgeDisplay();
});


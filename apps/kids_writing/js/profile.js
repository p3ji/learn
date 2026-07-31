// Writer profile, XP, badges and shared UI helpers.
//
// Storage keys are namespaced `kw_*` so this app's profiles never collide with
// the philosophy app's `kids_rts_profiles`. Same shape, separate save file.

const KW_PROFILES_KEY = 'kw_writer_profiles';
const KW_ACTIVE_KEY = 'kw_active_writer';

const KW_AVATARS = ['✍️', '🦊', '🐉', '🚀', '🧝', '🐙', '🦄', '🕵️', '🐺', '🌟'];

function kwBlankProfile(name) {
    return {
        username: name,
        avatar: '✍️',
        xp: 0,
        level: 1,
        rank: 'Apprentice Scribe',
        badges: [],
        // Daily writing habit: { 'YYYY-MM-DD': wordsWritten }
        dailyWords: {},
        dailyGoal: 150,
        drillsCorrect: 0,
        craftCardsRead: []
    };
}

let currentProfile = kwBlankProfile('New Writer');

function kwSyncPassportProfile() {
    if (typeof window !== 'undefined' && window.SuitePassport && currentProfile && currentProfile.username) {
        window.SuitePassport.updateProfile({
            name: currentProfile.username,
            avatar: currentProfile.avatar || '✍️'
        });
    }
}

function initProfileSystem() {
    const active = localStorage.getItem(KW_ACTIVE_KEY);
    const all = kwAllProfiles();
    if (active && all[active]) {
        // Merge over a blank so profiles saved by an older build gain new fields.
        currentProfile = Object.assign(kwBlankProfile(active), all[active]);
    } else if (typeof window !== 'undefined' && window.SuitePassport) {
        const passportProf = window.SuitePassport.getProfile();
        if (passportProf && passportProf.name) {
            currentProfile = kwBlankProfile(passportProf.name);
            currentProfile.avatar = passportProf.avatar || '✍️';
        } else {
            currentProfile = kwBlankProfile('New Writer');
        }
    } else {
        currentProfile = kwBlankProfile('New Writer');
    }
    saveProfileState();
    updateProfileUI();
}

function kwAllProfiles() {
    try {
        return JSON.parse(localStorage.getItem(KW_PROFILES_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveProfileState() {
    const all = kwAllProfiles();
    all[currentProfile.username] = currentProfile;
    localStorage.setItem(KW_PROFILES_KEY, JSON.stringify(all));
    localStorage.setItem(KW_ACTIVE_KEY, currentProfile.username);
    kwSyncPassportProfile();
}

const KW_XP_PER_LEVEL = 250;
const KW_RANKS = [
    'Apprentice Scribe',      // 1
    'Word Wrangler',          // 2
    'Scene Builder',          // 3
    'Chapter Champion',       // 4
    'Master Storyteller'      // 5+
];

function updateProfileUI() {
    currentProfile.level = Math.floor(currentProfile.xp / KW_XP_PER_LEVEL) + 1;
    currentProfile.rank = KW_RANKS[Math.min(currentProfile.level - 1, KW_RANKS.length - 1)];

    const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
    set('kwUserAvatar', el => el.textContent = currentProfile.avatar);
    set('kwUserName', el => el.textContent = currentProfile.username);
    set('xpLevelBadge', el => el.textContent = `Lvl ${currentProfile.level}: ${currentProfile.rank}`);
    set('xpTextDisplay', el => el.textContent = `${currentProfile.xp} XP`);
    set('xpBarFill', el => {
        const pct = Math.round(((currentProfile.xp % KW_XP_PER_LEVEL) / KW_XP_PER_LEVEL) * 100);
        el.style.width = `${pct}%`;
    });

    saveProfileState();
}

// ---------- XP & badges (single source of truth) ----------

function addXP(amount) {
    currentProfile.xp += amount;
    updateProfileUI();
    showFloatingXP(amount);
}

const KW_BADGES = {
    first_words:    { title: '🌱 First Words',      desc: 'Write your first 100 words in Story Forge.',            reward: 100 },
    strong_verbs:   { title: '💪 Verb Power',       desc: 'Finish the Strong Verbs drill set with no misses.',     reward: 120 },
    show_dont_tell: { title: '🎬 Show, Don\'t Tell', desc: 'Finish the Show-Don\'t-Tell drill set.',                reward: 120 },
    dialogue_pro:   { title: '💬 Dialogue Pro',     desc: 'Punctuate five lines of dialogue correctly.',           reward: 120 },
    reviser:        { title: '🔍 Brave Reviser',    desc: 'Run the Revision Lab on the same chapter twice.',       reward: 100 },
    planner:        { title: '🗺️ Story Architect',  desc: 'Fill in every part of a Story Spine.',                  reward: 100 },
    streak_5:       { title: '🔥 Five-Day Streak',  desc: 'Hit your daily word goal five days in a row.',          reward: 200 },
    novelist:       { title: '📚 Novelist',         desc: 'Reach 5,000 words across all your books.',              reward: 250 }
};

function unlockBadge(badgeId) {
    if (currentProfile.badges.includes(badgeId)) return;
    currentProfile.badges.push(badgeId);
    const info = KW_BADGES[badgeId];
    addXP(info ? info.reward : 100);
    saveProfileState();
    updateBadgeDisplay();
    showToast(`🏆 Badge unlocked: ${info ? info.title : badgeId.replace(/_/g, ' ')}`);
}

function updateBadgeDisplay() {
    document.querySelectorAll('.badge-item').forEach(b => {
        const id = b.getAttribute('data-badge-id');
        b.classList.toggle('unlocked', currentProfile.badges.includes(id));
        b.onclick = () => openTrophyDetailModal(id);
    });
}

function openTrophyDetailModal(badgeId) {
    const info = KW_BADGES[badgeId] || { title: badgeId, desc: 'Special achievement.', reward: 100 };
    const unlocked = currentProfile.badges.includes(badgeId);
    kwShowModal('kwTrophyModal', `
        <div style="text-align:center;">
            <div style="font-size:3.4rem; margin-bottom:10px;">${escapeHtml(info.title.split(' ')[0])}</div>
            <h2 class="concept-title">${escapeHtml(info.title)}</h2>
            <div class="nb-badge" style="margin:12px 0; background:${unlocked ? 'var(--gold-star)' : 'rgba(255,255,255,.1)'}; color:${unlocked ? '#000' : 'var(--text-muted)'}; border-color:${unlocked ? 'var(--gold-star)' : 'rgba(255,255,255,.2)'};">
                ${unlocked ? '✅ UNLOCKED' : '🔒 LOCKED'}
            </div>
            <p style="margin-bottom:18px;">${escapeHtml(info.desc)}</p>
            <div style="display:inline-block; background:rgba(245,158,11,.1); border:1px solid var(--gold-star); border-radius:12px; padding:10px 18px; color:var(--gold-star); font-weight:800;">
                Reward: +${info.reward} XP
            </div>
        </div>
    `);
}

// ---------- Daily habit ----------

function kwTodayKey(d) {
    const t = d || new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

// Called with the *delta* in words, not a total — the editor tracks the change
// since last save so a child re-opening a finished chapter doesn't re-earn it.
function recordWordsWritten(delta) {
    if (delta <= 0) return;
    const key = kwTodayKey();
    currentProfile.dailyWords[key] = (currentProfile.dailyWords[key] || 0) + delta;
    saveProfileState();
    if (kwStreakLength() >= 5) unlockBadge('streak_5');
}

function kwStreakLength() {
    let n = 0;
    const day = new Date();
    for (;;) {
        const words = currentProfile.dailyWords[kwTodayKey(day)] || 0;
        if (words >= currentProfile.dailyGoal) n++;
        else break;
        day.setDate(day.getDate() - 1);
    }
    return n;
}

// ---------- Account modal ----------

function openAccountLoginModal() {
    const all = kwAllProfiles();
    const names = Object.keys(all);

    kwShowModal('kwLoginModal', `
        <div class="nb-badge" style="background:var(--pink-energy); color:#FFF; border-color:var(--pink-energy);">👤 WRITER ACCOUNTS</div>
        <h2 class="concept-title" style="margin:8px 0 4px;">Who's writing today?</h2>
        <p style="color:var(--text-muted); font-size:.9rem; margin-bottom:18px;">Each writer gets their own books, badges and streak.</p>

        <div style="background:rgba(236,72,153,.12); border:1.5px solid var(--pink-energy); border-radius:16px; padding:18px; margin-bottom:18px;">
            <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
                <div style="font-size:2.6rem; background:rgba(0,0,0,.4); padding:6px 12px; border-radius:14px;">${escapeHtml(currentProfile.avatar)}</div>
                <div>
                    <div style="font-weight:800; font-size:1.15rem;">${escapeHtml(currentProfile.username)}</div>
                    <div style="color:var(--cyan-magic); font-weight:700; font-size:.88rem;">${escapeHtml(currentProfile.rank)} · ${currentProfile.xp} XP · 🔥 ${kwStreakLength()} day streak</div>
                </div>
            </div>

            <div class="sandbox-input-group">
                <label class="sandbox-label" for="kwInputUsername">Pen name</label>
                <input type="text" id="kwInputUsername" class="sandbox-input" value="${escapeHtml(currentProfile.username)}">
            </div>

            <div class="sandbox-input-group">
                <label class="sandbox-label" for="kwInputGoal">Daily word goal</label>
                <input type="number" id="kwInputGoal" class="sandbox-input" min="25" max="2000" step="25" value="${Number(currentProfile.dailyGoal) || 150}">
            </div>

            <div class="sandbox-input-group">
                <span class="sandbox-label">Avatar</span>
                <div style="display:flex; gap:7px; flex-wrap:wrap;">
                    ${KW_AVATARS.map(e => `
                        <button class="fb-action-btn ${currentProfile.avatar === e ? 'gold' : 'outline'}" style="font-size:1.3rem; padding:5px 11px;" data-avatar="${escapeHtml(e)}" aria-label="Choose avatar ${escapeHtml(e)}">${e}</button>
                    `).join('')}
                </div>
            </div>

            <button class="fb-action-btn gold" style="width:100%;" id="kwSaveProfileBtn">Save changes</button>
        </div>

        <div style="background:rgba(6,182,212,.08); border:1.5px solid var(--cyan-magic); border-radius:16px; padding:16px; margin-bottom:18px;">
            <h3 style="color:var(--cyan-magic); font-size:1rem; margin-bottom:9px;">➕ New writer</h3>
            <div style="display:flex; gap:9px;">
                <input type="text" id="kwNewWriterName" class="sandbox-input" placeholder="Pen name..." aria-label="New writer pen name" style="flex:1;">
                <button class="fb-action-btn cyan" id="kwCreateWriterBtn">Create</button>
            </div>
        </div>

        <h3 style="color:var(--gold-star); font-size:1rem; margin-bottom:9px;">Switch writer</h3>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto;">
            ${names.map(k => {
                const isCurrent = k === currentProfile.username;
                const p = all[k];
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,.45); padding:9px 14px; border-radius:11px; border:${isCurrent ? '1.5px solid var(--gold-star)' : '1px solid rgba(255,255,255,.1)'};">
                        <span style="display:flex; align-items:center; gap:9px;">
                            <span style="font-size:1.3rem;">${escapeHtml(p.avatar || '✍️')}</span>
                            <strong style="color:${isCurrent ? 'var(--gold-star)' : '#FFF'};">${escapeHtml(k)}</strong>
                            <span style="font-size:.78rem; color:var(--text-muted);">${Number(p.xp) || 0} XP</span>
                        </span>
                        ${isCurrent
                            ? '<span class="nb-badge" style="background:var(--gold-star); color:#000; border-color:var(--gold-star);">Active</span>'
                            : `<span style="display:flex; gap:7px;">
                                 <button class="fb-action-btn gold" style="padding:4px 11px; font-size:.8rem;" data-switch-profile="${escapeHtml(k)}">Log in</button>
                                 <button class="fb-action-btn outline" style="padding:4px 8px; font-size:.8rem; border-color:var(--red-alert); color:var(--red-alert);" data-delete-profile="${escapeHtml(k)}" aria-label="Delete writer ${escapeHtml(k)}">🗑️</button>
                               </span>`}
                    </div>`;
            }).join('')}
        </div>
    `);

    // Listeners rather than inline onclick: a pen name containing a quote would
    // otherwise break out of the attribute and disable the button.
    const modal = document.getElementById('kwLoginModal');
    modal.querySelectorAll('[data-avatar]').forEach(b =>
        b.addEventListener('click', () => selectAvatar(b.dataset.avatar)));
    modal.querySelectorAll('[data-switch-profile]').forEach(b =>
        b.addEventListener('click', () => switchActiveProfile(b.dataset.switchProfile)));
    modal.querySelectorAll('[data-delete-profile]').forEach(b =>
        b.addEventListener('click', () => deleteWriterProfile(b.dataset.deleteProfile)));
    modal.querySelector('#kwSaveProfileBtn').addEventListener('click', saveCurrentProfileEdits);
    modal.querySelector('#kwCreateWriterBtn').addEventListener('click', createNewWriterProfile);
}

function selectAvatar(emoji) {
    currentProfile.avatar = emoji;
    updateProfileUI();
    openAccountLoginModal();
}

function saveCurrentProfileEdits() {
    const nameInput = document.getElementById('kwInputUsername');
    const goalInput = document.getElementById('kwInputGoal');
    if (!nameInput) return;

    const goal = parseInt(goalInput && goalInput.value, 10);
    if (goal >= 25) currentProfile.dailyGoal = goal;

    const newName = nameInput.value.trim();
    const oldName = currentProfile.username;
    if (newName && newName !== oldName) {
        const all = kwAllProfiles();
        delete all[oldName];
        currentProfile.username = newName;
        all[newName] = currentProfile;
        localStorage.setItem(KW_PROFILES_KEY, JSON.stringify(all));
        localStorage.setItem(KW_ACTIVE_KEY, newName);
        // Books are keyed by writer name, so carry them across the rename.
        if (typeof renameLibraryOwner === 'function') renameLibraryOwner(oldName, newName);
    }

    updateProfileUI();
    closeModal('kwLoginModal');
    showToast('Profile saved!', 'green');
    if (typeof renderCurrentView === 'function') renderCurrentView();
}

function createNewWriterProfile() {
    const input = document.getElementById('kwNewWriterName');
    const name = input ? input.value.trim() : '';
    if (!name) { showToast('Type a pen name first.', 'red'); return; }

    const all = kwAllProfiles();
    if (all[name]) { showToast('That pen name is taken.', 'red'); return; }

    currentProfile = kwBlankProfile(name);
    saveProfileState();
    updateProfileUI();
    openAccountLoginModal();
    showToast(`Welcome, ${name}!`, 'green');
    if (typeof renderCurrentView === 'function') renderCurrentView();
}

function switchActiveProfile(username) {
    const all = kwAllProfiles();
    if (!all[username]) return;
    currentProfile = Object.assign(kwBlankProfile(username), all[username]);
    localStorage.setItem(KW_ACTIVE_KEY, username);
    updateProfileUI();
    updateBadgeDisplay();
    closeModal('kwLoginModal');
    showToast(`Now writing as ${username}.`, 'green');
    if (typeof renderCurrentView === 'function') renderCurrentView();
}

function deleteWriterProfile(username) {
    if (!confirm(`Delete the writer "${username}"? Their books stay saved but become hidden.`)) return;
    const all = kwAllProfiles();
    delete all[username];
    localStorage.setItem(KW_PROFILES_KEY, JSON.stringify(all));
    openAccountLoginModal();
}

// ---------- Shared UI helpers ----------

function kwShowModal(id, innerHtml) {
    let modal = document.getElementById(id);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = id;
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div class="concept-modal-card">
            <button class="concept-modal-close" data-close-modal="${id}">&times;</button>
            ${innerHtml}
        </div>`;
    modal.querySelector('[data-close-modal]').addEventListener('click', () => closeModal(id));
    modal.style.display = 'flex';
    return modal;
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.style.display = 'none';
}

function showFloatingXP(amount) {
    const pop = document.createElement('div');
    pop.className = 'xp-popup-floating';
    pop.setAttribute('role', 'status');
    pop.textContent = `+${amount} XP ✨`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1800);
}

function showToast(message, tone = 'gold') {
    const colours = { gold: 'var(--gold-star)', green: 'var(--green-hero)', red: 'var(--red-alert)', cyan: 'var(--cyan-magic)' };
    const toast = document.createElement('div');
    toast.className = 'kids-toast';
    toast.setAttribute('role', 'status');
    toast.style.borderColor = colours[tone] || colours.gold;
    toast.style.color = colours[tone] || colours.gold;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

// Escapes quotes too: without them a value can break out of an HTML attribute
// and graft a live event handler onto the element.
function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

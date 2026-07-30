// Boot and minimal shared state (no persistent profile for grammar — it's
// stateless and instant-to-play, unlike the writing app).

let currentProfile = { username: 'Student', avatar: '📚', xp: 0, level: 1, rank: 'Learner', badges: [] };

function addXP(amount) {
    currentProfile.xp += amount;
    updateProfileUI();
    showFloatingXP(amount);
}

function unlockBadge(badgeId) {
    if (currentProfile.badges.includes(badgeId)) return;
    currentProfile.badges.push(badgeId);
    addXP(150);
    updateBadgeDisplay();
    showToast(`🏆 Badge unlocked: ${badgeId.replace(/_/g, ' ')}`);
}

function updateProfileUI() {
    const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
    set('kgUserAvatar', el => el.textContent = currentProfile.avatar);
    set('kgUserName', el => el.textContent = currentProfile.username);
    set('kgLevelBadge', el => el.textContent = `Lvl ${currentProfile.level}`);
    set('kgXpDisplay', el => el.textContent = `${currentProfile.xp} XP`);
    set('kgXpBar', el => {
        const pct = (currentProfile.xp % 300) / 3;
        el.style.width = `${pct}%`;
    });
}

function updateBadgeDisplay() {
    document.querySelectorAll('.badge-item').forEach(b => {
        const id = b.getAttribute('data-badge-id');
        b.classList.toggle('unlocked', currentProfile.badges.includes(id));
        b.onclick = () => openBadgeModal(id);
    });
}

function openBadgeModal(badgeId) {
    const badges = {
        confusable_champ: { title: '🔑 Confusable Champ', desc: 'Master its/it\'s and the their/there/they\'re trio.' },
        agreement_ace: { title: '🤝 Agreement Ace', desc: 'Make every subject and verb match perfectly.' },
        punctuation_pro: { title: '❜ Punctuation Pro', desc: 'Apostrophes, capitals and commas in the right place.' },
        sentence_surgeon: { title: '🧩 Sentence Surgeon', desc: 'Fix fragments, run-ons and every sentence shape.' }
    };
    const info = badges[badgeId] || { title: badgeId, desc: 'Achievement' };
    const unlocked = currentProfile.badges.includes(badgeId);
    kwShowModal('kgBadgeModal', `
        <div style="text-align:center;">
            <div style="font-size:3rem;">${info.title.split(' ')[0]}</div>
            <h2 class="concept-title">${info.title}</h2>
            <div class="nb-badge" style="margin:12px 0; background:${unlocked ? 'var(--gold-star)' : 'rgba(255,255,255,.1)'}; color:${unlocked ? '#000' : 'var(--text-muted)'}; border-color:${unlocked ? 'var(--gold-star)' : 'rgba(255,255,255,.2)'};">
                ${unlocked ? '✅ UNLOCKED' : '🔒 LOCKED'}
            </div>
            <p>${info.desc}</p>
        </div>
    `);
}

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
    pop.textContent = `+${amount} XP ✨`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1800);
}

function showToast(message, tone = 'gold') {
    const colours = { gold: 'var(--gold-star)', green: 'var(--green-hero)', red: '#F87171', cyan: 'var(--cyan-magic)' };
    const toast = document.createElement('div');
    toast.className = 'kids-toast';
    toast.style.borderColor = colours[tone] || colours.gold;
    toast.style.color = colours[tone] || colours.gold;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-view]').forEach(b =>
        b.addEventListener('click', () => goToView(b.dataset.view)));
    updateProfileUI();
    renderCurrentView();
});

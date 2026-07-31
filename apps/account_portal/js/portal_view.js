/**
 * Account Portal UI Controller & View Renderer
 */

class AccountPortalView {
  constructor() {
    this.currentTab = 'profile';
    this.selectedAppFilter = 'all';
    this.searchQuery = '';
    this.selectedAvatar = '🦉';
  }

  init() {
    this.render();
  }

  setTab(tabName) {
    this.currentTab = tabName;
    this.render();
  }

  setAppFilter(appId) {
    this.selectedAppFilter = appId;
    this.render();
  }

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.render();
  }

  openProfileModal() {
    const p = window.SuitePassport.getProfile();
    this.selectedAvatar = p.avatar;

    const avatars = ['🦉', '🧮', '✍️', '🚀', '✏️', '🎮', '🤖', '👑', '🌌', '🦊', '🐲', '🎨'];
    const gridHtml = avatars.map(a => `
      <div class="avatar-option ${a === this.selectedAvatar ? 'selected' : ''}" onclick="portal.selectAvatar('${a}')">${a}</div>
    `).join('');

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) portal.closeModal()">
        <div class="modal-content">
          <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 16px;">Customize Learner Passport</h2>
          <form onsubmit="portal.saveProfile(event)">
            <div class="form-group">
              <label class="form-label">Choose Avatar Icon</label>
              <div class="avatar-grid" id="avatar-selector-grid">
                ${gridHtml}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Learner Name</label>
              <input type="text" id="profile-name-input" class="form-input" value="${p.name}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Grade / Level Preference</label>
              <select id="profile-grade-input" class="form-select">
                <option value="grade3" ${p.grade === 'grade3' ? 'selected' : ''}>Grade 3 (Primary)</option>
                <option value="grade8" ${p.grade === 'grade8' ? 'selected' : ''}>Grade 8 (Intermediate)</option>
                <option value="pro" ${p.grade === 'pro' ? 'selected' : ''}>Professional / Advanced</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Personal Learning Goal / Bio</label>
              <input type="text" id="profile-bio-input" class="form-input" value="${p.bio}">
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
              <button type="button" class="btn-secondary" onclick="portal.closeModal()">Cancel</button>
              <button type="submit" class="btn-primary">Save Passport</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.getElementById('modal-container').innerHTML = modalHtml;
  }

  selectAvatar(avatar) {
    this.selectedAvatar = avatar;
    const options = document.querySelectorAll('.avatar-option');
    options.forEach(opt => {
      if (opt.textContent === avatar) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  saveProfile(e) {
    e.preventDefault();
    const name = document.getElementById('profile-name-input').value.trim();
    const grade = document.getElementById('profile-grade-input').value;
    const bio = document.getElementById('profile-bio-input').value;

    if (name) {
      window.SuitePassport.updateProfile({
        name: name,
        avatar: this.selectedAvatar,
        grade: grade,
        bio: bio
      });

      // Sync sub-app profile stores if present
      try {
        const activePh = localStorage.getItem('kids_active_profile');
        let phProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
        if (activePh && phProfiles[activePh]) {
          const pData = phProfiles[activePh];
          delete phProfiles[activePh];
          pData.username = name;
          pData.avatar = this.selectedAvatar;
          phProfiles[name] = pData;
          localStorage.setItem('kids_rts_profiles', JSON.stringify(phProfiles));
          localStorage.setItem('kids_active_profile', name);
        }

        const activeKw = localStorage.getItem('kw_active_writer');
        let kwProfiles = JSON.parse(localStorage.getItem('kw_writer_profiles') || '{}');
        if (activeKw && kwProfiles[activeKw]) {
          const kwData = kwProfiles[activeKw];
          delete kwProfiles[activeKw];
          kwData.username = name;
          kwData.avatar = this.selectedAvatar;
          kwProfiles[name] = kwData;
          localStorage.setItem('kw_writer_profiles', JSON.stringify(kwProfiles));
          localStorage.setItem('kw_active_writer', name);
        }
      } catch (err) {
        console.error('Failed to sync sub-app profile stores', err);
      }
    }

    this.closeModal();
    this.render();
  }

  openNewJournalModal() {
    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) portal.closeModal()">
        <div class="modal-content">
          <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 16px;">📝 New Saved Journal Entry</h2>
          <form onsubmit="portal.saveNewJournalEntry(event)">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" id="journal-title-input" class="form-input" placeholder="e.g. My Reflections on Plato's Cave" required>
            </div>
            <div class="form-group">
              <label class="form-label">App Category</label>
              <select id="journal-app-input" class="form-select">
                <option value="kids_writing">✍️ Story Forge (Writing)</option>
                <option value="kids_math">🧮 MathForge (Math)</option>
                <option value="kids_philosophy">🚀 Philosopher's Quest</option>
                <option value="kids_grammar">✏️ Grammar Gym</option>
                <option value="kids_github">🎮 GitHub Quest</option>
                <option value="general">📓 General Journal</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Entry Content</label>
              <textarea id="journal-content-input" class="form-textarea" placeholder="Write your draft, notes, or reflection..." required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Tags (comma separated)</label>
              <input type="text" id="journal-tags-input" class="form-input" placeholder="reflection, chapter1, notes">
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
              <button type="button" class="btn-secondary" onclick="portal.closeModal()">Cancel</button>
              <button type="submit" class="btn-primary">Save to Passport (+15 XP)</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.getElementById('modal-container').innerHTML = modalHtml;
  }

  saveNewJournalEntry(e) {
    e.preventDefault();
    const title = document.getElementById('journal-title-input').value;
    const appId = document.getElementById('journal-app-input').value;
    const content = document.getElementById('journal-content-input').value;
    const tagsStr = document.getElementById('journal-tags-input').value;
    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const appNames = {
      kids_writing: 'Story Forge',
      kids_math: 'MathForge Ottawa',
      kids_philosophy: "Philosopher's Quest",
      kids_grammar: 'Grammar Gym',
      kids_github: 'GitHub Quest',
      general: 'Learner Journal'
    };

    window.SuitePassport.saveJournalEntry({
      appId: appId,
      appName: appNames[appId] || 'Learner Journal',
      title: title,
      category: 'Saved Note',
      content: content,
      tags: tags
    });

    this.closeModal();
    this.render();
  }

  openJournalViewModal(entryId) {
    const entries = window.SuitePassport.getJournalEntries('all');
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) portal.closeModal()">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="journal-app-badge">${entry.appName}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${entry.date}</span>
          </div>
          <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 16px;">${entry.title}</h2>
          
          <div style="background: var(--bg-primary); border: 1px solid var(--card-border); padding: 16px; border-radius: var(--radius-md); white-space: pre-line; line-height: 1.6; margin-bottom: 20px; font-family: inherit;">
            ${entry.content}
          </div>

          ${entry.tags && entry.tags.length > 0 ? `
            <div style="margin-bottom: 20px;">
              ${entry.tags.map(t => `<span style="background: rgba(255,255,255,0.08); font-size: 0.8rem; padding: 2px 8px; border-radius: 6px; margin-right: 6px;">#${t}</span>`).join('')}
            </div>
          ` : ''}

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="btn-danger" onclick="portal.deleteEntry('${entry.id}')">🗑️ Delete Entry</button>
            <div style="display: flex; gap: 10px;">
              <button class="btn-secondary" onclick="navigator.clipboard.writeText(\`${entry.content.replace(/`/g, '\\`')}\`); alert('Content copied to clipboard!');">📋 Copy Text</button>
              <button class="btn-primary" onclick="portal.closeModal()">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('modal-container').innerHTML = modalHtml;
  }

  deleteEntry(entryId) {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      window.SuitePassport.deleteJournalEntry(entryId);
      this.closeModal();
      this.render();
    }
  }

  closeModal() {
    document.getElementById('modal-container').innerHTML = '';
  }

  exportData() {
    const jsonStr = window.SuitePassport.exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learner_passport_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }

  importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const success = window.SuitePassport.importDataJSON(event.target.result);
      if (success) {
        alert('Passport data imported successfully!');
        this.render();
      } else {
        alert('Failed to import backup file. Please check file format.');
      }
    };
    reader.readAsText(file);
  }

  render() {
    const p = window.SuitePassport.getProfile();
    const nextLevelXP = p.level * 100;
    const currentLevelBase = (p.level - 1) * 100;
    const levelProgress = Math.min(100, Math.max(0, ((p.xp - currentLevelBase) / (nextLevelXP - currentLevelBase)) * 100));

    // Render Passport Card Header
    const passportCardHtml = `
      <div class="passport-card">
        <div class="avatar-large" onclick="portal.openProfileModal()" title="Click to change avatar">${p.avatar}</div>
        <div class="profile-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
            <div>
              <h1 class="profile-name">${p.name}</h1>
              <p class="profile-bio">${p.bio}</p>
            </div>
            <button class="btn-secondary" style="font-size: 0.85rem;" onclick="portal.openProfileModal()">✏️ Edit Profile</button>
          </div>

          <div style="display: flex; gap: 16px; margin-top: 12px; font-weight: 700; font-size: 0.9rem;">
            <span>⭐ Level ${p.level}</span>
            <span>🔥 ${p.streak} Day Streak</span>
            <span style="color: var(--accent-gold);">Total XP: ${p.xp}</span>
          </div>

          <div class="xp-progress-bar">
            <div class="xp-fill" style="width: ${levelProgress}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
            <span>${p.xp} XP</span>
            <span>Next Level: ${nextLevelXP} XP</span>
          </div>
        </div>
      </div>
    `;

    // Render Tab Buttons
    const tabsHtml = `
      <div class="nav-tabs">
        <button class="tab-btn ${this.currentTab === 'profile' ? 'active' : ''}" onclick="portal.setTab('profile')">
          👤 Profile &amp; Overview
        </button>
        <button class="tab-btn ${this.currentTab === 'journal' ? 'active' : ''}" onclick="portal.setTab('journal')">
          📓 Journal &amp; Saved Inputs
        </button>
        <button class="tab-btn ${this.currentTab === 'trophies' ? 'active' : ''}" onclick="portal.setTab('trophies')">
          🏆 Trophy Cabinet
        </button>
        <button class="tab-btn ${this.currentTab === 'backup' ? 'active' : ''}" onclick="portal.setTab('backup')">
          ⚙️ Data &amp; Backup
        </button>
      </div>
    `;

    let mainContentHtml = '';

    if (this.currentTab === 'profile') {
      const stats = window.SuitePassport.getAppStats();
      mainContentHtml = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px;">
          <div style="background: var(--card-bg); border: 1px solid var(--card-border); padding: 24px; border-radius: var(--radius-lg);">
            <h3 style="font-family: var(--font-heading); margin-bottom: 8px;">🧮 MathForge Progress</h3>
            <p style="font-size: 1.5rem; font-weight: 800; color: var(--accent-cyan);">${stats.kids_math ? stats.kids_math.xp : 0} XP</p>
            <p style="color: var(--text-muted); font-size: 0.88rem;">${stats.kids_math ? stats.kids_math.count : 0} exercises completed</p>
          </div>
          <div style="background: var(--card-bg); border: 1px solid var(--card-border); padding: 24px; border-radius: var(--radius-lg);">
            <h3 style="font-family: var(--font-heading); margin-bottom: 8px;">✍️ Story Forge Progress</h3>
            <p style="font-size: 1.5rem; font-weight: 800; color: var(--accent-pink);">${stats.kids_writing ? stats.kids_writing.xp : 0} XP</p>
            <p style="color: var(--text-muted); font-size: 0.88rem;">${stats.kids_writing ? stats.kids_writing.count : 0} revisions saved</p>
          </div>
          <div style="background: var(--card-bg); border: 1px solid var(--card-border); padding: 24px; border-radius: var(--radius-lg);">
            <h3 style="font-family: var(--font-heading); margin-bottom: 8px;">✏️ Grammar Gym Progress</h3>
            <p style="font-size: 1.5rem; font-weight: 800; color: var(--accent-blue);">${stats.kids_grammar ? stats.kids_grammar.xp : 0} XP</p>
            <p style="color: var(--text-muted); font-size: 0.88rem;">${stats.kids_grammar ? stats.kids_grammar.count : 0} errors fixed</p>
          </div>
        </div>
      `;
    } else if (this.currentTab === 'journal') {
      const entries = window.SuitePassport.getJournalEntries(this.selectedAppFilter, this.searchQuery);

      let entriesGridHtml = '';
      if (entries.length === 0) {
        entriesGridHtml = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--card-bg); border: 1px dashed var(--card-border); border-radius: var(--radius-lg);">
            <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 16px;">No saved entries found.</p>
            <button class="btn-primary" onclick="portal.openNewJournalModal()">+ Write First Journal Entry</button>
          </div>
        `;
      } else {
        entriesGridHtml = entries.map(e => `
          <div class="journal-card">
            <div>
              <div class="journal-meta">
                <span class="journal-app-badge">${e.appName}</span>
                <span>${e.date}</span>
              </div>
              <h3 class="journal-title">${e.title}</h3>
              <p class="journal-snippet">${e.content}</p>
            </div>
            <div class="journal-footer">
              <button class="btn-secondary" style="font-size: 0.85rem;" onclick="portal.openJournalViewModal('${e.id}')">View Entry ➔</button>
            </div>
          </div>
        `).join('');
      }

      mainContentHtml = `
        <div class="journal-controls">
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <input type="text" class="search-input" placeholder="Search journal & inputs..." value="${this.searchQuery}" oninput="portal.handleSearch(event)">
            <select class="search-input" style="min-width: auto;" onchange="portal.setAppFilter(this.value)">
              <option value="all" ${this.selectedAppFilter === 'all' ? 'selected' : ''}>All Apps</option>
              <option value="kids_math" ${this.selectedAppFilter === 'kids_math' ? 'selected' : ''}>🧮 MathForge</option>
              <option value="kids_writing" ${this.selectedAppFilter === 'kids_writing' ? 'selected' : ''}>✍️ Story Forge</option>
              <option value="kids_philosophy" ${this.selectedAppFilter === 'kids_philosophy' ? 'selected' : ''}>🚀 Philosopher's Quest</option>
              <option value="kids_grammar" ${this.selectedAppFilter === 'kids_grammar' ? 'selected' : ''}>✏️ Grammar Gym</option>
              <option value="kids_github" ${this.selectedAppFilter === 'kids_github' ? 'selected' : ''}>🎮 GitHub Quest</option>
            </select>
          </div>
          <button class="btn-primary" onclick="portal.openNewJournalModal()">+ New Journal Entry</button>
        </div>

        <div class="journal-grid">
          ${entriesGridHtml}
        </div>
      `;
    } else if (this.currentTab === 'trophies') {
      const achievements = window.SuitePassport.getAchievements();
      const badgesHtml = achievements.map(b => `
        <div class="badge-card ${b.unlocked ? 'unlocked' : ''}">
          <div class="badge-icon">${b.icon}</div>
          <h4 class="badge-title">${b.name}</h4>
          <p class="badge-desc">${b.desc}</p>
          <div style="margin-top: 10px; font-size: 0.75rem; font-weight: 800; color: ${b.unlocked ? 'var(--accent-gold)' : 'var(--text-muted)'};">
            ${b.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
          </div>
        </div>
      `).join('');

      mainContentHtml = `
        <div class="badges-grid">
          ${badgesHtml}
        </div>
      `;
    } else if (this.currentTab === 'backup') {
      mainContentHtml = `
        <div style="background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius-lg); padding: 32px; max-width: 650px; margin: 0 auto 40px;">
          <h2 style="font-family: var(--font-heading); margin-bottom: 12px;">⚙️ Passport Backup &amp; Portability</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">
            Save your entire profile, achievements, and journal entries to a JSON backup file so you can transfer your progress to another computer or browser.
          </p>

          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <button class="btn-primary" onclick="portal.exportData()">💾 Download Backup (JSON)</button>
            <label class="btn-secondary" style="cursor: pointer; display: inline-flex; align-items: center;">
              📂 Restore Backup
              <input type="file" accept=".json" style="display: none;" onchange="portal.importData(event)">
            </label>
          </div>
        </div>
      `;
    }

    document.getElementById('portal-main-area').innerHTML = `
      ${passportCardHtml}
      ${tabsHtml}
      ${mainContentHtml}
    `;
  }
}

window.portal = new AccountPortalView();
window.addEventListener('DOMContentLoaded', () => window.portal.init());

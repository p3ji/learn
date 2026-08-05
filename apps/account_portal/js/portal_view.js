/**
 * Account Portal UI Controller & View Renderer with Avatar Shop Integration
 */

class AccountPortalView {
  constructor() {
    this.currentTab = 'profile';
    this.selectedAppFilter = 'all';
    this.searchQuery = '';
    this.selectedAvatar = '🦉';
    this.shopCategory = 'skins';
  }

  init() {
    this.render();
  }

  setTab(tabName) {
    this.currentTab = tabName;
    this.render();
  }

  setShopCategory(catName) {
    this.shopCategory = catName;
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

    const avatars = ['🦉', '🧙‍♂️', '🤖', '🦊', '🚀', '🦁', '🐲', '👑', '🌌', '🎨', '✏️', '🎮'];
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
      this.closeModal();
    }
  }

  openNewJournalModal() {
    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) portal.closeModal()">
        <div class="modal-content">
          <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 16px;">New Journal Entry</h2>
          <form onsubmit="portal.saveNewJournalEntry(event)">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" id="journal-title-input" class="form-input" placeholder="E.g., Today's Reflection or Hard Math Problem" required>
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select id="journal-category-input" class="form-select">
                <option value="Reflection">Reflection</option>
                <option value="Notes">Notes</option>
                <option value="Idea">Idea</option>
                <option value="Question">Question</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Content</label>
              <textarea id="journal-content-input" class="form-input" style="height: 120px; resize: vertical;" placeholder="Write your thoughts, solution steps, or notes..." required></textarea>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
              <button type="button" class="btn-secondary" onclick="portal.closeModal()">Cancel</button>
              <button type="submit" class="btn-primary">Save Entry (+15 XP)</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.getElementById('modal-container').innerHTML = modalHtml;
  }

  saveNewJournalEntry(e) {
    e.preventDefault();
    const title = document.getElementById('journal-title-input').value.trim();
    const category = document.getElementById('journal-category-input').value;
    const content = document.getElementById('journal-content-input').value.trim();

    if (title && content) {
      window.SuitePassport.saveJournalEntry({
        appId: 'account_portal',
        appName: 'Account Portal',
        title: title,
        category: category,
        content: content,
        tags: ['user_note', category.toLowerCase()]
      });
      this.closeModal();
      this.render();
    }
  }

  openJournalViewModal(entryId) {
    const entries = window.SuitePassport.getJournalEntries('all');
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    const modalHtml = `
      <div class="modal-overlay" onclick="if(event.target === this) portal.closeModal()">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span class="journal-app-badge">${entry.appName}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${entry.date}</span>
          </div>
          <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 16px;">${entry.title}</h2>
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--card-border); padding: 16px; border-radius: var(--radius-md); font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; margin-bottom: 24px;">
            ${entry.content}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="btn-secondary" style="color: #EF4444; border-color: #EF4444;" onclick="portal.deleteJournalEntry('${entry.id}')">🗑️ Delete Entry</button>
            <button class="btn-primary" onclick="portal.closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('modal-container').innerHTML = modalHtml;
  }

  deleteJournalEntry(entryId) {
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
    a.download = `Learner_Passport_${window.SuitePassport.getProfile().name}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const success = window.SuitePassport.importDataJSON(e.target.result);
      if (success) {
        alert('Passport data successfully restored!');
        this.render();
      } else {
        alert('Error: Could not import file. Make sure it is a valid Passport JSON backup.');
      }
    };
    reader.readAsText(file);
  }

  render() {
    const p = window.SuitePassport.getProfile();
    const coins = window.SuitePassport.getCoins();
    const cfg = window.SuitePassport.getAvatarConfig();
    const catalog = window.SuitePassport.SHOP_CATALOG;

    const currentSkin = catalog.skins.find(s => s.id === cfg.equipped.skin) || catalog.skins[0];
    const currentFrame = catalog.frames.find(f => f.id === cfg.equipped.frame) || catalog.frames[0];
    const currentTitle = catalog.titles.find(t => t.id === cfg.equipped.title) || catalog.titles[0];

    const nextLevelXP = p.level * 100;
    const currentLevelBase = (p.level - 1) * 100;
    const levelProgress = Math.min(100, Math.max(0, ((p.xp - currentLevelBase) / (nextLevelXP - currentLevelBase)) * 100));

    // Render Passport Card Header
    const passportCardHtml = `
      <div class="passport-card" style="border: 2px solid ${currentFrame.color || 'var(--card-border)'}; box-shadow: 0 0 25px ${currentFrame.color || 'transparent'}35;">
        <div class="avatar-large" onclick="portal.openProfileModal()" title="Click to change avatar" style="border: 3px solid ${currentFrame.color || '#F59E0B'};">${currentSkin.icon}</div>
        <div class="profile-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
            <div>
              <h1 class="profile-name">${p.name}</h1>
              <p style="color: var(--accent-gold); font-weight: 800; font-size: 1rem; margin-top: 2px;">${currentTitle.icon} ${currentTitle.name}</p>
              <p class="profile-bio">${p.bio}</p>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn-primary" style="background: linear-gradient(135deg, #10B981, #059669);" onclick="portal.setTab('shop')">🛍️ Open Avatar Shop</button>
              <button class="btn-secondary" style="font-size: 0.85rem;" onclick="portal.openProfileModal()">✏️ Edit Profile</button>
            </div>
          </div>

          <div style="display: flex; gap: 16px; margin-top: 12px; font-weight: 700; font-size: 0.95rem; flex-wrap: wrap;">
            <span>⭐ Level ${p.level}</span>
            <span>🔥 ${p.streak} Day Streak</span>
            <span style="color: var(--accent-gold);">Total XP: ${p.xp}</span>
            <span style="color: #34D399; font-weight: 900; background: rgba(52,211,153,0.15); padding: 2px 10px; border-radius: 12px; border: 1px solid #34D399;">🪙 ${coins} Coins</span>
          </div>

          <div class="xp-progress-bar" style="margin-top:12px;">
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
        <button class="tab-btn ${this.currentTab === 'shop' ? 'active' : ''}" onclick="portal.setTab('shop')">
          🛍️ Avatar Shop (${coins} 🪙)
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
    } else if (this.currentTab === 'shop') {
      const activeCat = this.shopCategory || 'skins';
      const items = catalog[activeCat] || [];

      mainContentHtml = `
        <div style="background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--radius-lg); padding: 28px; margin-bottom: 40px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 4px;">🛍️ Learner Avatar Shop</h2>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Spend your hard-earned Coins (1 XP = 1 Coin) to unlock avatars, glowing frames, and badges!</p>
            </div>
            <div style="background: rgba(52,211,153,0.15); border: 1.5px solid #34D399; padding: 10px 18px; border-radius: 14px; color: #34D399; font-weight: 900; font-size: 1.25rem;">
              🪙 ${coins} Coins Available
            </div>
          </div>

          <!-- Category Selector Buttons -->
          <div style="display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap;">
            <button onclick="portal.setShopCategory('skins')" class="btn-secondary" style="${activeCat === 'skins' ? 'background: #10B981; border-color: #10B981; color: #FFF;' : ''}">🦉 Avatars (${catalog.skins.length})</button>
            <button onclick="portal.setShopCategory('frames')" class="btn-secondary" style="${activeCat === 'frames' ? 'background: #10B981; border-color: #10B981; color: #FFF;' : ''}">✨ Frames &amp; Auras (${catalog.frames.length})</button>
            <button onclick="portal.setShopCategory('titles')" class="btn-secondary" style="${activeCat === 'titles' ? 'background: #10B981; border-color: #10B981; color: #FFF;' : ''}">🎓 Titles &amp; Badges (${catalog.titles.length})</button>
            <button onclick="portal.setShopCategory('themes')" class="btn-secondary" style="${activeCat === 'themes' ? 'background: #10B981; border-color: #10B981; color: #FFF;' : ''}">🎨 App Themes (${catalog.themes.length})</button>
          </div>

          <!-- Item Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
            ${items.map(item => {
              const isOwned = window.SuitePassport.isItemOwned(item.id);
              const categorySingular = activeCat === 'skins' ? 'skin' : activeCat === 'frames' ? 'frame' : activeCat === 'titles' ? 'title' : 'theme';
              const isEquipped = cfg.equipped[categorySingular] === item.id;

              let btnHtml = '';
              if (isEquipped) {
                btnHtml = `<button style="width:100%; background:rgba(16,185,129,0.2); border:1.5px solid #10B981; color:#34D399; font-weight:900; padding:10px 14px; border-radius:10px; cursor:default;">🌟 Equipped</button>`;
              } else if (isOwned) {
                btnHtml = `<button onclick="window.SuitePassport.equipItem('${categorySingular}', '${item.id}'); portal.render();" class="btn-primary" style="width:100%;">Equip Item</button>`;
              } else {
                const canAfford = coins >= item.price;
                btnHtml = `<button onclick="window.SuitePassport.buyItem('${item.id}', '${categorySingular}', ${item.price}, '${item.name.replace(/'/g, "\\'")}'); portal.render();" class="btn-primary" style="width:100%; background:${canAfford ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'rgba(255,255,255,0.1)'}; color:${canAfford ? '#000' : '#94A3B8'}; cursor:${canAfford ? 'pointer' : 'not-allowed'};">${canAfford ? `Buy for 🪙 ${item.price}` : `Need 🪙 ${item.price}`}</button>`;
              }

              return `
                <div style="background: rgba(15,23,42,0.6); border: 1.5px solid ${isEquipped ? '#10B981' : item.color || 'var(--card-border)'}; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                      <span style="font-size: 2.2rem;">${item.icon}</span>
                      <span style="font-weight: 800; font-size: 0.88rem; color: ${item.price === 0 ? '#34D399' : '#FCD34D'}; background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 10px;">${item.price === 0 ? 'FREE' : `🪙 ${item.price}`}</span>
                    </div>
                    <h4 style="font-size: 1.1rem; font-weight: 800; margin: 0 0 6px 0; color: #FFF;">${item.name}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5;">${item.desc}</p>
                  </div>
                  ${btnHtml}
                </div>
              `;
            }).join('')}
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
            Save your entire profile, coins balance, unlocked avatar items, achievements, and journal entries to a JSON backup file.
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
window.addEventListener('passport:profile-changed', () => window.portal.render());

/**
 * Shared Learner Passport, XP, Coins, Avatar Shop & Central Journal Engine for Learning Suite
 */

(function(exports) {

  const STORAGE_KEY = 'LEARN_SUITE_PASSPORT_V1';

  const SHOP_CATALOG = {
    skins: [
      { id: 'owl_scholar', name: 'Owl Scholar', icon: '🦉', price: 0, desc: 'Wise & observant starting avatar.' },
      { id: 'wizard_math', name: 'Wizard of Logic', icon: '🧙‍♂️', price: 100, desc: 'Master of equations and magic formulas.' },
      { id: 'robot_tech', name: 'Cyber Bot 3000', icon: '🤖', price: 150, desc: 'Powered by high-speed algorithms.' },
      { id: 'fox_explorer', name: 'Sly Fox Scholar', icon: '🦊', price: 200, desc: 'Clever, agile, and quick-witted.' },
      { id: 'astro_cosmic', name: 'Cosmic Astronaut', icon: '🚀', price: 250, desc: 'Exploring the universe of knowledge.' },
      { id: 'lion_king', name: 'Safari Lion', icon: '🦁', price: 300, desc: 'Brave leader of the learning jungle.' },
      { id: 'dragon_golden', name: 'Golden Dragon', icon: '🐲', price: 400, desc: 'Legendary beast of infinite wisdom.' }
    ],
    frames: [
      { id: 'bronze_border', name: 'Bronze Border', icon: '🥉', price: 0, color: '#CD7F32', desc: 'Sturdy bronze avatar border.' },
      { id: 'neon_glow', name: 'Neon Cyber Glow', icon: '✨', price: 75, color: '#38BDF8', desc: 'Glowing cyan energy aura.' },
      { id: 'emerald_aura', name: 'Emerald Magic', icon: '🌲', price: 125, color: '#10B981', desc: 'Enchanted forest emerald light.' },
      { id: 'fire_flame', name: 'Dragon Flame', icon: '🔥', price: 175, color: '#F59E0B', desc: 'Blazing fire element border.' },
      { id: 'diamond_ring', name: 'Diamond Crystal', icon: '💎', price: 300, color: '#A855F7', desc: 'Shimmering diamond ring.' },
      { id: 'rainbow_aura', name: 'Prismatic Rainbow', icon: '🌈', price: 350, color: '#EC4899', desc: 'Radiant full-spectrum aura.' }
    ],
    titles: [
      { id: 'Novice Learner', name: 'Novice Learner', icon: '🌱', price: 0, desc: 'Starting title for every cadet.' },
      { id: 'Mind Master', name: 'Mind Master', icon: '🧠', price: 50, desc: 'For students who love deep thought.' },
      { id: 'Lightning Thinker', name: 'Lightning Thinker', icon: '⚡', price: 100, desc: 'Fast calculation and quick recall.' },
      { id: 'Polymath Explorer', name: 'Polymath Explorer', icon: '🎨', price: 200, desc: 'Master of multiple subjects.' },
      { id: 'Grand Academician', name: 'Grand Academician', icon: '🎓', price: 350, desc: 'Top scholar of Ottawa.' },
      { id: 'Royalty of Ottawa', name: 'Royalty of Ottawa', icon: '👑', price: 500, desc: 'Ultimate honorific badge.' }
    ],
    themes: [
      { id: 'default', name: 'Midnight Slate', icon: '🌓', price: 0, desc: 'Classic sleek dark theme.' },
      { id: 'theme_space', name: 'Deep Space', icon: '🌌', price: 150, desc: 'Cosmic purple space background.' },
      { id: 'theme_emerald', name: 'Emerald Forest', icon: '🌲', price: 200, desc: 'Lush green nature aesthetic.' },
      { id: 'theme_cyber', name: 'Cyberpunk Neon', icon: '🏙️', price: 300, desc: 'High-contrast neon city vibe.' }
    ]
  };

  const DEFAULT_PASSPORT = {
    profile: {
      name: 'Learner',
      avatar: '🦉',
      grade: 'grade3',
      bio: 'Exploring math, writing, philosophy, and technology!',
      xp: 0,
      coins: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0]
    },
    avatarConfig: {
      equipped: {
        skin: 'owl_scholar',
        frame: 'bronze_border',
        title: 'Novice Learner',
        theme: 'default'
      },
      inventory: ['owl_scholar', 'bronze_border', 'Novice Learner', 'default']
    },
    journal: [],
    achievements: {
      "first_step": { id: "first_step", name: "First Step", desc: "Complete your first learning activity", icon: "🌱", unlocked: false },
      "polymath": { id: "polymath", name: "Polymath", desc: "Use 3 different learning apps", icon: "🎨", unlocked: false },
      "journal_keeper": { id: "journal_keeper", name: "Journal Keeper", desc: "Save 3 entries in your central journal", icon: "📓", unlocked: false },
      "math_whiz": { id: "math_whiz", name: "Math Whiz", desc: "Earn 100 XP in MathForge", icon: "🧮", unlocked: false },
      "story_master": { id: "story_master", name: "Story Master", desc: "Save a writing draft or story revision", icon: "✍️", unlocked: false },
      "grammar_doctor": { id: "grammar_doctor", name: "Sentence Doctor", desc: "Fix errors in Grammar Gym", icon: "✏️", unlocked: false },
      "thinker": { id: "thinker", name: "Deep Thinker", desc: "Complete a philosophy thought experiment", icon: "🚀", unlocked: false },
      "git_coder": { id: "git_coder", name: "Git Navigator", desc: "Commit a chapter in GitHub Quest", icon: "🎮", unlocked: false },
      "level_5": { id: "level_5", name: "Rising Scholar", desc: "Reach Passport Level 5", icon: "⭐", unlocked: false }
    },
    appStats: {
      kids_math: { xp: 0, count: 0 },
      kids_writing: { xp: 0, count: 0 },
      kids_grammar: { xp: 0, count: 0 },
      kids_philosophy: { xp: 0, count: 0 },
      kids_github: { xp: 0, count: 0 }
    },
    masteredTopics: {}
  };

  class SuitePassportEngine {
    constructor() {
      this.SHOP_CATALOG = SHOP_CATALOG;
      this.data = this.load();
      this.updateStreak();
    }

    load() {
      try {
        const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
        if (raw) {
          const parsed = JSON.parse(raw);
          const loadedProfile = { ...DEFAULT_PASSPORT.profile, ...(parsed.profile || {}) };
          
          // Retroactively set coins commensurate to total XP for existing learners!
          if (loadedProfile.coins === undefined || loadedProfile.coins === null) {
            loadedProfile.coins = loadedProfile.xp || 0;
          }

          const loadedAvatarConfig = {
            equipped: { ...DEFAULT_PASSPORT.avatarConfig.equipped, ...((parsed.avatarConfig && parsed.avatarConfig.equipped) || {}) },
            inventory: Array.isArray(parsed.avatarConfig && parsed.avatarConfig.inventory) ? parsed.avatarConfig.inventory : DEFAULT_PASSPORT.avatarConfig.inventory.slice()
          };

          return {
            ...DEFAULT_PASSPORT,
            ...parsed,
            profile: loadedProfile,
            avatarConfig: loadedAvatarConfig,
            achievements: { ...DEFAULT_PASSPORT.achievements, ...(parsed.achievements || {}) },
            appStats: { ...DEFAULT_PASSPORT.appStats, ...(parsed.appStats || {}) },
            masteredTopics: { ...(parsed.masteredTopics || {}) }
          };
        }
      } catch (e) {
        console.error('Failed to load Passport data from localStorage', e);
      }
      return JSON.parse(JSON.stringify(DEFAULT_PASSPORT));
    }

    save() {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        }
      } catch (e) {
        console.error('Failed to save Passport data', e);
      }
    }

    updateStreak() {
      const today = new Date().toISOString().split('T')[0];
      const last = this.data.profile.lastActiveDate;

      if (last !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (last === yesterday) {
          this.data.profile.streak += 1;
        } else if (last < yesterday) {
          this.data.profile.streak = 1;
        }
        this.data.profile.lastActiveDate = today;
        this.save();
      }
    }

    getAccounts() {
      try {
        if (typeof localStorage !== 'undefined') {
          const raw = localStorage.getItem('SUITE_PROFILES_V1');
          if (raw) return JSON.parse(raw);
        }
      } catch (e) {}
      const cur = this.data.profile.name || 'Learner';
      return { [cur]: { ...this.data.profile } };
    }

    saveAccounts(accountsObj) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('SUITE_PROFILES_V1', JSON.stringify(accountsObj));
        }
      } catch (e) {}
    }

    notifyProfileChange() {
      if (this._isNotifying) return;
      this._isNotifying = true;
      try {
        this.save();
        const accounts = this.getAccounts();
        accounts[this.data.profile.name] = { ...this.data.profile };
        this.saveAccounts(accounts);

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('kids_active_profile', this.data.profile.name);
          try {
            let rtsProfiles = JSON.parse(localStorage.getItem('kids_rts_profiles') || '{}');
            rtsProfiles[this.data.profile.name] = {
              username: this.data.profile.name,
              avatar: this.data.profile.avatar,
              xp: this.data.profile.xp,
              level: this.data.profile.level,
              coins: this.data.profile.coins,
              rank: `Lvl ${this.data.profile.level} Learner`,
              badges: []
            };
            localStorage.setItem('kids_rts_profiles', JSON.stringify(rtsProfiles));
          } catch (e) {}
        }

        if (typeof window !== 'undefined') {
          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('passport:profile-changed', { detail: this.data.profile }));
          }
          if (typeof document !== 'undefined') {
            const el = document.getElementById('passport-pill-container');
            if (el) this.renderPassportPill('passport-pill-container', this.currentRootPrefix || '');
          }
        }
      } finally {
        this._isNotifying = false;
      }
    }

    getProfile() {
      return this.data.profile;
    }

    getCoins() {
      if (this.data.profile.coins === undefined || this.data.profile.coins === null) {
        this.data.profile.coins = this.data.profile.xp || 0;
      }
      return this.data.profile.coins;
    }

    getAvatarConfig() {
      if (!this.data.avatarConfig) {
        this.data.avatarConfig = JSON.parse(JSON.stringify(DEFAULT_PASSPORT.avatarConfig));
      }
      return this.data.avatarConfig;
    }

    isItemOwned(itemId) {
      const cfg = this.getAvatarConfig();
      return cfg.inventory.includes(itemId);
    }

    buyItem(itemId, category, price, titleStr) {
      const currentCoins = this.getCoins();
      if (currentCoins < price) {
        if (typeof alert !== 'undefined') alert(`🔒 Not enough Coins! You need ${price} Coins, but you have ${currentCoins} Coins.`);
        return false;
      }
      if (this.isItemOwned(itemId)) {
        this.equipItem(category, itemId);
        return true;
      }

      this.data.profile.coins -= price;
      this.data.avatarConfig.inventory.push(itemId);
      this.equipItem(category, itemId);

      this.saveJournalEntry({
        appId: 'account_portal',
        appName: 'Avatar Shop',
        title: `🛍️ Purchased: ${titleStr}`,
        category: 'Purchase',
        content: `Unlocked ${titleStr} in the Avatar Shop for ${price} Coins!`,
        tags: ['shop', 'purchase', category],
        awardXP: false
      });

      const toastMsg = `🛍️ Unlocked ${titleStr}! (${price} Coins spent)`;
      if (typeof showToast === 'function') {
        showToast(toastMsg, 'green');
      } else if (typeof alert !== 'undefined') {
        alert(toastMsg);
      }
      return true;
    }

    equipItem(category, itemId) {
      if (!this.isItemOwned(itemId)) return false;
      this.getAvatarConfig().equipped[category] = itemId;

      // Sync skin icon to profile.avatar if category is skin
      if (category === 'skin') {
        const itemObj = SHOP_CATALOG.skins.find(s => s.id === itemId);
        if (itemObj) this.data.profile.avatar = itemObj.icon;
      }

      this.notifyProfileChange();
      return true;
    }

    updateProfile(updates) {
      this.data.profile = { ...this.data.profile, ...updates };
      this.notifyProfileChange();
    }

    switchAccount(accountName) {
      const accounts = this.getAccounts();
      if (accounts[accountName]) {
        this.data.profile = { ...DEFAULT_PASSPORT.profile, ...accounts[accountName] };
        if (this.data.profile.coins === undefined) {
          this.data.profile.coins = this.data.profile.xp || 0;
        }
        this.notifyProfileChange();
        return true;
      }
      return false;
    }

    createAccount(name, avatar = '🦉', grade = 'grade3') {
      const trimmed = (name || '').trim();
      if (!trimmed) return false;

      const accounts = this.getAccounts();
      const newProfile = {
        name: trimmed,
        avatar: avatar || '🦉',
        grade: grade || 'grade3',
        bio: 'Exploring math, writing, philosophy, and technology!',
        xp: 0,
        coins: 0,
        level: 1,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0]
      };
      accounts[trimmed] = newProfile;
      this.saveAccounts(accounts);

      this.data.profile = newProfile;
      this.notifyProfileChange();
      return true;
    }

    deleteAccount(accountName) {
      const accounts = this.getAccounts();
      if (accounts[accountName]) {
        delete accounts[accountName];
        this.saveAccounts(accounts);

        const remainingNames = Object.keys(accounts);
        if (this.data.profile.name === accountName) {
          if (remainingNames.length > 0) {
            this.switchAccount(remainingNames[0]);
          } else {
            this.createAccount('Learner', '🦉', 'grade3');
          }
        } else {
          this.notifyProfileChange();
        }
        return true;
      }
      return false;
    }

    calculateLevel(xp) {
      return Math.floor(xp / 100) + 1;
    }

    addXP(amount, appId = 'general') {
      this.data.profile.xp += amount;
      this.data.profile.coins = (this.getCoins()) + amount; // 1 XP = 1 Coin ratio!

      const newLevel = this.calculateLevel(this.data.profile.xp);
      this.data.profile.level = newLevel;

      if (!this.data.appStats[appId]) {
        this.data.appStats[appId] = { xp: 0, count: 0 };
      }
      this.data.appStats[appId].xp += amount;
      this.data.appStats[appId].count += 1;

      this.checkAchievements();
      this.notifyProfileChange();
      return { xp: this.data.profile.xp, level: newLevel, coins: this.data.profile.coins };
    }

    saveJournalEntry({ appId, appName, title, category, content, tags = [], awardXP = true }) {
      const entry = {
        id: 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        appId: appId || 'general',
        appName: appName || 'Learning Suite',
        title: title || 'Untitled Entry',
        category: category || 'Journal',
        content: content || '',
        tags: Array.isArray(tags) ? tags : [tags],
        date: new Date().toLocaleString()
      };

      this.data.journal.unshift(entry);
      if (awardXP) this.addXP(15, appId);
      this.checkAchievements();
      this.save();
      return entry;
    }

    getJournalEntries(filterAppId = 'all', searchQuery = '') {
      return this.data.journal.filter(entry => {
        const matchesApp = filterAppId === 'all' || entry.appId === filterAppId;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          entry.title.toLowerCase().includes(q) || 
          entry.content.toLowerCase().includes(q) ||
          entry.appName.toLowerCase().includes(q) ||
          entry.tags.some(t => t.toLowerCase().includes(q));

        return matchesApp && matchesQuery;
      });
    }

    deleteJournalEntry(entryId) {
      this.data.journal = this.data.journal.filter(e => e.id !== entryId);
      this.save();
    }

    checkAchievements() {
      const p = this.data.profile;
      const j = this.data.journal;
      const ach = this.data.achievements;
      const stats = this.data.appStats;

      if (p.xp > 0) ach["first_step"].unlocked = true;
      if (j.length >= 3) ach["journal_keeper"].unlocked = true;
      if (p.level >= 5) ach["level_5"].unlocked = true;
      if (stats.kids_math && stats.kids_math.xp >= 100) ach["math_whiz"].unlocked = true;
      if (stats.kids_writing && stats.kids_writing.count >= 1) ach["story_master"].unlocked = true;
      if (stats.kids_grammar && stats.kids_grammar.count >= 1) ach["grammar_doctor"].unlocked = true;
      if (stats.kids_philosophy && stats.kids_philosophy.count >= 1) ach["thinker"].unlocked = true;
      if (stats.kids_github && stats.kids_github.count >= 1) ach["git_coder"].unlocked = true;

      const activeAppsCount = Object.keys(stats).filter(k => stats[k].count > 0).length;
      if (activeAppsCount >= 3) ach["polymath"].unlocked = true;
    }

    getAchievements() {
      return Object.values(this.data.achievements);
    }

    getAppStats() {
      return this.data.appStats;
    }

    exportDataJSON() {
      return JSON.stringify(this.data, null, 2);
    }

    importDataJSON(jsonStr) {
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.profile && parsed.journal) {
          this.data = parsed;
          if (this.data.profile.coins === undefined) {
            this.data.profile.coins = this.data.profile.xp || 0;
          }
          this.notifyProfileChange();
          return true;
        }
      } catch (e) {
        console.error('Invalid JSON import file', e);
      }
      return false;
    }

    renderPassportPill(containerId, rootPathPrefix = '') {
      this.currentRootPrefix = rootPathPrefix;
      const el = document.getElementById(containerId);
      if (!el) return;

      const p = this.getProfile();
      const coins = this.getCoins();
      const avatarCfg = this.getAvatarConfig();
      const equippedFrame = SHOP_CATALOG.frames.find(f => f.id === avatarCfg.equipped.frame) || SHOP_CATALOG.frames[0];

      el.innerHTML = `
        <div style="display:inline-flex; align-items:center; gap:8px;">
          <button type="button" onclick="window.SuitePassport.openAccountModal('${rootPathPrefix}')" title="Manage account / switch profile" style="cursor:pointer; border:none; background:none; padding:0; font:inherit; text-align:left;">
            <div style="display:inline-flex; align-items:center; gap:8px; background: rgba(255,255,255,0.08); border: 1.5px solid ${equippedFrame.color || 'rgba(255,255,255,0.15)'}; padding: 4px 12px; border-radius: 20px; color: #FFF; font-weight: 700; font-size: 0.85rem; box-shadow: 0 0 10px ${equippedFrame.color || 'transparent'}40;">
              <span style="font-size: 1.1rem;">${p.avatar}</span>
              <span>${p.name}</span>
              <span style="background: linear-gradient(135deg, #F59E0B, #6366F1); padding: 2px 8px; border-radius: 10px; font-size: 0.75rem;">Lvl ${p.level}</span>
              <span style="color: #FCD34D;">⭐ ${p.xp} XP</span>
              <span style="color: #34D399; margin-left:2px;">🪙 ${coins} Coins</span>
            </div>
          </button>
          <button type="button" onclick="window.SuitePassport.openShopModal('${rootPathPrefix}')" style="background: linear-gradient(135deg, #10B981, #059669); border: none; color: #FFF; padding: 5px 12px; border-radius: 12px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display:inline-flex; align-items:center; gap:4px;">
            🛍️ Shop
          </button>
          <button type="button" onclick="window.SuitePassport.openAccountModal('${rootPathPrefix}')" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #FFF; padding: 5px 12px; border-radius: 12px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
            👤 Account
          </button>
        </div>
      `;
    }

    openShopModal(rootPathPrefix = '') {
      this.currentRootPrefix = rootPathPrefix;
      let modalContainer = document.getElementById('sp-shop-modal-container');
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'sp-shop-modal-container';
        document.body.appendChild(modalContainer);
      }

      this.currentShopCategory = this.currentShopCategory || 'skins';
      this.renderShopModalContent(modalContainer, rootPathPrefix);
    }

    setShopModalCategory(category) {
      this.currentShopCategory = category;
      const modalContainer = document.getElementById('sp-shop-modal-container');
      if (modalContainer) this.renderShopModalContent(modalContainer, this.currentRootPrefix || '');
    }

    closeShopModal() {
      const modalContainer = document.getElementById('sp-shop-modal-container');
      if (modalContainer) modalContainer.remove();
    }

    renderShopModalContent(modalContainer, rootPathPrefix = '') {
      const p = this.getProfile();
      const coins = this.getCoins();
      const cfg = this.getAvatarConfig();
      const activeCat = this.currentShopCategory || 'skins';
      const items = SHOP_CATALOG[activeCat] || [];

      const currentSkin = SHOP_CATALOG.skins.find(s => s.id === cfg.equipped.skin) || SHOP_CATALOG.skins[0];
      const currentFrame = SHOP_CATALOG.frames.find(f => f.id === cfg.equipped.frame) || SHOP_CATALOG.frames[0];
      const currentTitle = SHOP_CATALOG.titles.find(t => t.id === cfg.equipped.title) || SHOP_CATALOG.titles[0];

      modalContainer.className = 'sp-modal-overlay';
      modalContainer.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px; font-family: 'Plus Jakarta Sans', sans-serif;" onclick="if(event.target === this) window.SuitePassport.closeShopModal()">
          <div style="background: #0F172A; border: 2px solid #334155; border-radius: 20px; width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto; padding: 26px; color: #F8FAFC; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); position: relative;">
            
            <button onclick="window.SuitePassport.closeShopModal()" style="position: absolute; top: 18px; right: 18px; background: rgba(255,255,255,0.1); border: none; color: #94A3B8; font-size: 1.4rem; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Close">&times;</button>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
              <div>
                <span style="background: linear-gradient(135deg, #10B981, #059669); color: #FFF; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 12px; text-transform: uppercase;">🛍️ SUITE AVATAR SHOP</span>
                <h2 style="font-size: 1.5rem; font-weight: 900; margin: 4px 0 0 0; color: #FFF;">Customize Avatar &amp; Unlock Rewards</h2>
              </div>
              <div style="background: rgba(16, 185, 129, 0.15); border: 1.5px solid #10B981; padding: 8px 16px; border-radius: 14px; color: #34D399; font-weight: 900; font-size: 1.15rem;">
                🪙 ${coins} Coins
              </div>
            </div>

            <!-- Avatar Preview Box -->
            <div style="background: linear-gradient(135deg, #1E293B, #0F172A); border: 1.5px solid ${currentFrame.color || '#3B82F6'}; border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 20px; box-shadow: 0 0 20px ${currentFrame.color || 'transparent'}30;">
              <div style="font-size: 3rem; background: rgba(0,0,0,0.4); padding: 10px 18px; border-radius: 18px; border: 2px solid ${currentFrame.color || '#334155'};">${currentSkin.icon}</div>
              <div>
                <div style="font-size: 1.2rem; font-weight: 900; color: #FFF;">${p.name}</div>
                <div style="color: #FCD34D; font-weight: 700; font-size: 0.95rem; margin-top: 2px;">${currentTitle.icon} ${currentTitle.name}</div>
                <div style="color: #94A3B8; font-size: 0.8rem; margin-top: 2px;">Equipped Frame: <strong style="color: ${currentFrame.color || '#FFF'};">${currentFrame.name}</strong></div>
              </div>
            </div>

            <!-- Sub Category Tabs -->
            <div style="display: flex; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 12px; flex-wrap: wrap;">
              <button onclick="window.SuitePassport.setShopModalCategory('skins')" style="padding: 8px 16px; border-radius: 10px; border: none; font-weight: 800; font-size: 0.9rem; cursor: pointer; background: ${activeCat === 'skins' ? '#10B981' : 'rgba(255,255,255,0.06)'}; color: ${activeCat === 'skins' ? '#FFF' : '#CBD5E1'};">🦉 Avatars (${SHOP_CATALOG.skins.length})</button>
              <button onclick="window.SuitePassport.setShopModalCategory('frames')" style="padding: 8px 16px; border-radius: 10px; border: none; font-weight: 800; font-size: 0.9rem; cursor: pointer; background: ${activeCat === 'frames' ? '#10B981' : 'rgba(255,255,255,0.06)'}; color: ${activeCat === 'frames' ? '#FFF' : '#CBD5E1'};">✨ Frames &amp; Auras (${SHOP_CATALOG.frames.length})</button>
              <button onclick="window.SuitePassport.setShopModalCategory('titles')" style="padding: 8px 16px; border-radius: 10px; border: none; font-weight: 800; font-size: 0.9rem; cursor: pointer; background: ${activeCat === 'titles' ? '#10B981' : 'rgba(255,255,255,0.06)'}; color: ${activeCat === 'titles' ? '#FFF' : '#CBD5E1'};">🎓 Titles &amp; Badges (${SHOP_CATALOG.titles.length})</button>
              <button onclick="window.SuitePassport.setShopModalCategory('themes')" style="padding: 8px 16px; border-radius: 10px; border: none; font-weight: 800; font-size: 0.9rem; cursor: pointer; background: ${activeCat === 'themes' ? '#10B981' : 'rgba(255,255,255,0.06)'}; color: ${activeCat === 'themes' ? '#FFF' : '#CBD5E1'};">🎨 App Themes (${SHOP_CATALOG.themes.length})</button>
            </div>

            <!-- Items Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
              ${items.map(item => {
                const isOwned = this.isItemOwned(item.id);
                const categorySingular = activeCat === 'skins' ? 'skin' : activeCat === 'frames' ? 'frame' : activeCat === 'titles' ? 'title' : 'theme';
                const isEquipped = cfg.equipped[categorySingular] === item.id;

                let btnHtml = '';
                if (isEquipped) {
                  btnHtml = `<button style="width:100%; background:rgba(16,185,129,0.2); border:1.5px solid #10B981; color:#34D399; font-weight:900; padding:8px 14px; border-radius:10px; cursor:default;">🌟 Equipped</button>`;
                } else if (isOwned) {
                  btnHtml = `<button onclick="window.SuitePassport.equipItem('${categorySingular}', '${item.id}'); window.SuitePassport.openShopModal('${rootPathPrefix}');" style="width:100%; background:linear-gradient(135deg, #3B82F6, #2563EB); border:none; color:#FFF; font-weight:800; padding:8px 14px; border-radius:10px; cursor:pointer;">Equip Item</button>`;
                } else {
                  const canAfford = coins >= item.price;
                  btnHtml = `<button onclick="window.SuitePassport.buyItem('${item.id}', '${categorySingular}', ${item.price}, '${item.name.replace(/'/g, "\\'")}'); window.SuitePassport.openShopModal('${rootPathPrefix}');" style="width:100%; background:${canAfford ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'rgba(255,255,255,0.1)'}; border:none; color:${canAfford ? '#000' : '#94A3B8'}; font-weight:900; padding:8px 14px; border-radius:10px; cursor:${canAfford ? 'pointer' : 'not-allowed'};">${canAfford ? `Buy for 🪙 ${item.price}` : `Need 🪙 ${item.price}`}</button>`;
                }

                return `
                  <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid ${isEquipped ? '#10B981' : item.color || '#334155'}; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 2rem;">${item.icon}</span>
                        <span style="font-weight: 800; font-size: 0.85rem; color: ${item.price === 0 ? '#34D399' : '#FCD34D'}; background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 8px;">${item.price === 0 ? 'FREE' : `🪙 ${item.price}`}</span>
                      </div>
                      <h4 style="font-size: 1rem; font-weight: 800; margin: 0 0 4px 0; color: #FFF;">${item.name}</h4>
                      <p style="font-size: 0.8rem; color: #94A3B8; margin-bottom: 14px; line-height: 1.4;">${item.desc}</p>
                    </div>
                    ${btnHtml}
                  </div>
                `;
              }).join('')}
            </div>

            <div style="text-align: center; border-top: 1px solid #334155; padding-top: 16px;">
              <a href="${rootPathPrefix}apps/account_portal/index.html" style="color: #A78BFA; font-weight: 700; font-size: 0.9rem; text-decoration: none;">📓 Open Full Account Portal &amp; Journal ➔</a>
            </div>

          </div>
        </div>
      `;
    }

    selectModalAvatar(avatar) {
      this.selectedModalAvatar = avatar;
      const display = document.getElementById('sp-active-avatar-display');
      if (display) display.innerText = avatar;
    }

    saveActiveAccountEdits() {
      const nameInput = document.getElementById('sp-edit-name-input');
      const newName = nameInput ? nameInput.value.trim() : '';
      if (newName) {
        const oldName = this.data.profile.name;
        const accounts = this.getAccounts();
        if (oldName !== newName && accounts[oldName]) {
          delete accounts[oldName];
        }
        this.data.profile.name = newName;
        if (this.selectedModalAvatar) {
          this.data.profile.avatar = this.selectedModalAvatar;
        }
        this.saveAccounts(accounts);
        this.notifyProfileChange();
        this.openAccountModal(this.currentRootPrefix || '');
      }
    }

    handleCreateAccountFromModal() {
      const nameInput = document.getElementById('sp-new-account-name');
      const name = nameInput ? nameInput.value.trim() : '';
      if (name) {
        this.createAccount(name, '🦉', 'grade3');
        this.openAccountModal(this.currentRootPrefix || '');
      }
    }

    handleSwitchAccount(accountName) {
      this.switchAccount(accountName);
      this.openAccountModal(this.currentRootPrefix || '');
    }

    handleDeleteAccount(accountName) {
      this.deleteAccount(accountName);
      this.openAccountModal(this.currentRootPrefix || '');
    }

    closeAccountModal() {
      const modalContainer = document.getElementById('sp-account-modal-container') || document.getElementById('rtsLoginModal');
      if (modalContainer) modalContainer.remove();
    }

    openAccountModal(rootPathPrefix = '') {
      this.currentRootPrefix = rootPathPrefix;
      let modalContainer = document.getElementById('sp-account-modal-container') || document.getElementById('rtsLoginModal');
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'rtsLoginModal';
        document.body.appendChild(modalContainer);
      }
      modalContainer.className = 'concept-modal-overlay sp-modal-overlay';

      if (typeof window !== 'undefined') {
        window.closeAccountLoginModal = () => this.closeAccountModal();
      }

      const p = this.getProfile();
      this.selectedModalAvatar = p.avatar;
      const accountsMap = this.getAccounts();
      const accountNames = Object.keys(accountsMap);
      const avatars = ['🦉', '🧮', '✍️', '🚀', '✏️', '🎮', '🤖', '👑', '🌌', '🦊', '🐲', '🎨'];

      modalContainer.innerHTML = `
        <div class="sp-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 20px; font-family: 'Plus Jakarta Sans', sans-serif;" onclick="if(event.target === this) window.SuitePassport.closeAccountModal()">
          <div class="sp-modal-card" style="background: #0F172A; border: 2px solid #334155; border-radius: 20px; width: 100%; max-width: 620px; max-height: 90vh; overflow-y: auto; padding: 26px; color: #F8FAFC; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); position: relative;">
            
            <button onclick="window.SuitePassport.closeAccountModal()" style="position: absolute; top: 18px; right: 18px; background: rgba(255,255,255,0.1); border: none; color: #94A3B8; font-size: 1.4rem; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Close">&times;</button>
            
            <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); color: #FFF; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 12px; display: inline-block; margin-bottom: 8px; text-transform: uppercase;">👤 LEARNER PASSPORT &amp; ACCOUNT MANAGER</div>
            <h2 style="font-size: 1.6rem; font-weight: 900; margin: 0 0 6px 0; color: #FFF;">Thinker Cadet Profiles &amp; Learner Sign In</h2>
            <p style="font-size: 0.9rem; color: #94A3B8; margin-bottom: 20px;">Sign in, create a new learner account, or switch profiles across the Learning Suite!</p>

            <!-- Active Account Settings Card -->
            <div style="background: rgba(139, 92, 246, 0.12); border: 1.5px solid #8B5CF6; border-radius: 16px; padding: 18px; margin-bottom: 20px;">
              <h3 style="color: #FCD34D; font-size: 1.05rem; font-weight: 800; margin: 0 0 12px 0;">Active Account Settings:</h3>
              
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
                <div style="font-size: 2.8rem; background: rgba(0,0,0,0.4); padding: 8px 14px; border-radius: 16px; border: 1px solid #F59E0B;" id="sp-active-avatar-display">${p.avatar}</div>
                <div>
                  <div style="font-weight: 900; font-size: 1.25rem; color: #FFF;">${p.name}</div>
                  <div style="color: #38BDF8; font-weight: 700; font-size: 0.9rem;">Level ${p.level} Scholar • ${p.xp} Total XP • 🪙 ${this.getCoins()} Coins</div>
                </div>
              </div>

              <div style="margin-bottom: 12px;">
                <label for="sp-edit-name-input" style="font-size: 0.85rem; font-weight: 700; color: #FCD34D; display: block; margin-bottom: 6px;">Learner Name / Call-Sign:</label>
                <input type="text" id="sp-edit-name-input" value="${p.name}" style="width: 100%; background: #1E293B; border: 1px solid #475569; border-radius: 10px; color: #FFF; padding: 10px 14px; font-size: 0.95rem; font-weight: 600;">
              </div>

              <div style="margin-bottom: 12px;">
                <label style="font-size: 0.85rem; font-weight: 700; color: #38BDF8; display: block; margin-bottom: 6px;">Choose Avatar Icon:</label>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  ${avatars.map(a => `
                    <button type="button" onclick="window.SuitePassport.selectModalAvatar('${a}')" style="font-size: 1.4rem; padding: 6px 12px; border-radius: 10px; border: 1.5px solid ${a === p.avatar ? '#F59E0B' : 'rgba(255,255,255,0.15)'}; background: ${a === p.avatar ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.05)'}; cursor: pointer;">${a}</button>
                  `).join('')}
                </div>
              </div>

              <button type="button" onclick="window.SuitePassport.saveActiveAccountEdits()" style="width: 100%; background: linear-gradient(135deg, #F59E0B, #D97706); border: none; color: #000; font-weight: 900; padding: 10px 16px; border-radius: 10px; font-size: 0.95rem; cursor: pointer; margin-top: 6px;">💾 Save Profile Changes</button>
            </div>

            <!-- Create New Account Card -->
            <div style="background: rgba(6, 182, 212, 0.1); border: 1.5px solid #06B6D4; border-radius: 16px; padding: 18px; margin-bottom: 20px;">
              <h3 style="color: #38BDF8; font-size: 1.05rem; font-weight: 800; margin: 0 0 10px 0;">➕ Create New Learner Account (Sign Up):</h3>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <input type="text" id="sp-new-account-name" placeholder="Type new Learner name..." style="flex: 1; min-width: 180px; background: #1E293B; border: 1px solid #475569; border-radius: 10px; color: #FFF; padding: 10px 14px; font-size: 0.95rem;">
                <button type="button" onclick="window.SuitePassport.handleCreateAccountFromModal()" style="background: linear-gradient(135deg, #06B6D4, #3B82F6); border: none; color: #FFF; font-weight: 800; padding: 10px 18px; border-radius: 10px; font-size: 0.92rem; cursor: pointer;">Create &amp; Sign In</button>
              </div>
            </div>

            <!-- Switch Accounts Card -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid #334155; border-radius: 16px; padding: 18px; margin-bottom: 18px;">
              <h3 style="color: #FCD34D; font-size: 1.05rem; font-weight: 800; margin: 0 0 10px 0;">👥 Switch Between Saved Accounts:</h3>
              <div style="display: flex; flex-direction: column; gap: 8px; max-height: 180px; overflow-y: auto;">
                ${accountNames.map(accName => {
                  const acc = accountsMap[accName];
                  const isCurrent = accName === p.name;
                  return `
                    <div style="display: flex; justify-content: space-between; align-items: center; background: ${isCurrent ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${isCurrent ? '#F59E0B' : 'rgba(255,255,255,0.1)'}; padding: 10px 14px; border-radius: 10px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.4rem;">${acc.avatar || '🦉'}</span>
                        <div>
                          <span style="font-weight: 800; color: #FFF; font-size: 0.95rem;">${accName}</span>
                          <span style="color: #94A3B8; font-size: 0.8rem; margin-left: 8px;">Lvl ${acc.level || 1} • ${acc.xp || 0} XP</span>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        ${isCurrent ? 
                          '<span style="color: #4ADE80; font-weight: 800; font-size: 0.85rem; padding: 4px 10px; background: rgba(74,222,128,0.15); border-radius: 8px;">✓ Active</span>' :
                          `<button type="button" onclick="window.SuitePassport.handleSwitchAccount('${accName.replace(/'/g, "\\'")}')" style="background: rgba(59,130,246,0.2); border: 1px solid #3B82F6; color: #60A5FA; padding: 4px 12px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">Sign In</button>`
                        }
                        ${accountNames.length > 1 ? `<button type="button" onclick="window.SuitePassport.handleDeleteAccount('${accName.replace(/'/g, "\\'")}')" style="background: rgba(239,68,68,0.15); border: 1px solid #EF4444; color: #F87171; padding: 4px 8px; border-radius: 8px; font-size: 0.8rem; cursor: pointer;" title="Delete account">🗑️</button>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${rootPathPrefix}apps/account_portal/index.html" style="color: #A78BFA; font-weight: 700; font-size: 0.9rem; text-decoration: none;">📓 Open Full Central Account Portal &amp; Journal ➔</a>
            </div>

          </div>
        </div>
      `;
    }

    toggleMasteredTopic(appId, topicTitle, btnElement = null) {
      if (!this.data.masteredTopics) this.data.masteredTopics = {};
      if (!this.data.masteredHistory) this.data.masteredHistory = {};
      const key = `${appId}:${topicTitle}`;
      const isMastered = !this.data.masteredTopics[key];

      let awardedXP = false;
      if (isMastered) {
        this.data.masteredTopics[key] = { date: new Date().toLocaleDateString(), appId, topicTitle };
        if (!this.data.masteredHistory[key]) {
          this.data.masteredHistory[key] = true;
          this.addXP(20, appId);
          awardedXP = true;
        }
      } else {
        delete this.data.masteredTopics[key];
      }

      this.save();

      if (btnElement) {
        if (isMastered) {
          btnElement.style.background = 'rgba(245,158,11,0.25)';
          btnElement.style.borderColor = '#F59E0B';
          btnElement.style.color = '#F59E0B';
          btnElement.innerText = '🌟 Mastered!';
        } else {
          btnElement.style.background = 'transparent';
          btnElement.style.borderColor = 'rgba(255,255,255,0.2)';
          btnElement.style.color = 'var(--text-muted, #94A3B8)';
          btnElement.innerText = '⭐ Mark Mastered';
        }
      }

      const msg = isMastered 
        ? (awardedXP ? `🌟 "${topicTitle}" marked as Mastered! (+20 XP) 🏆` : `🌟 "${topicTitle}" marked as Mastered!`)
        : `Un-marked "${topicTitle}".`;
      if (typeof showToast === 'function') {
        showToast(msg, isMastered ? 'green' : 'gold');
      } else if (typeof alert !== 'undefined') {
        alert(msg);
      }

      return isMastered;
    }

    isTopicMastered(appId, topicTitle) {
      if (!this.data.masteredTopics) return false;
      return !!this.data.masteredTopics[`${appId}:${topicTitle}`];
    }

    openFeedbackModal({ appId, appName, topicTitle, defaultType = 'needs_practice', rootPathPrefix = '' }) {
      let modalContainer = document.getElementById('modal-container');
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);
      }

      const modalHtml = `
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px;" onclick="if(event.target === this) window.SuitePassport.closeFeedbackModal()">
          <div class="modal-content" style="background: #1E293B; border: 1px solid #334155; border-radius: 16px; width: 100%; max-width: 540px; padding: 24px; color: #F8FAFC; font-family: sans-serif; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="background: rgba(245, 158, 11, 0.2); color: #F59E0B; border: 1px solid #F59E0B; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">${appName || 'Learner Suite'}</span>
              <button onclick="window.SuitePassport.closeFeedbackModal()" style="background: none; border: none; color: #94A3B8; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            
            <h2 style="font-size: 1.3rem; margin-bottom: 4px; color: #FFF;">🎯 ${topicTitle ? `Topic: ${topicTitle}` : 'Concept Tracker & Feedback'}</h2>
            <p style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 16px;">Track your mastery, mark topics for extra review, or save notes for the developer in your Account Portal.</p>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; font-weight: 700; color: #CBD5E1; display: block; margin-bottom: 6px;">Entry Type:</label>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <label style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.05); border: 1px solid #475569; padding: 8px 10px; border-radius: 8px; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  <input type="radio" name="sp_note_type" value="needs_practice" ${defaultType === 'needs_practice' ? 'checked' : ''}>
                  📌 Needs Practice
                </label>
                <label style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.05); border: 1px solid #475569; padding: 8px 10px; border-radius: 8px; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  <input type="radio" name="sp_note_type" value="mastered" ${defaultType === 'mastered' ? 'checked' : ''}>
                  🌟 Concept Mastered
                </label>
                <label style="flex: 1; min-width: 140px; background: rgba(255,255,255,0.05); border: 1px solid #475569; padding: 8px 10px; border-radius: 8px; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  <input type="radio" name="sp_note_type" value="dev_note" ${defaultType === 'dev_note' ? 'checked' : ''}>
                  💬 Developer Note
                </label>
              </div>
            </div>

            <div style="margin-bottom: 16px;">
              <label for="sp_note_text" style="font-size: 0.85rem; font-weight: 700; color: #CBD5E1; display: block; margin-bottom: 6px;">Your Note / Self-Reflection (Optional):</label>
              <textarea id="sp_note_text" style="width: 100%; height: 75px; background: #0F172A; border: 1px solid #334155; border-radius: 8px; color: #FFF; padding: 10px; font-family: inherit; font-size: 0.9rem; resize: vertical;" placeholder="E.g., Mastered this easily, or need to review multiplying negative numbers..."></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px;">
              <button onclick="window.SuitePassport.closeFeedbackModal()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FFF; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer;">Cancel</button>
              <button onclick="window.SuitePassport.submitFeedbackModal('${appId || 'general'}', '${(appName || 'Learner Suite').replace(/'/g, "\\'")}', '${(topicTitle || 'General Topic').replace(/'/g, "\\'")}')" style="background: linear-gradient(135deg, #3B82F6, #6366F1); border: none; color: #FFF; padding: 8px 18px; border-radius: 8px; font-weight: 700; cursor: pointer;">💾 Save to Account Portal</button>
            </div>
          </div>
        </div>
      `;

      modalContainer.innerHTML = modalHtml;
    }

    closeFeedbackModal() {
      const modalContainer = document.getElementById('modal-container');
      if (modalContainer) modalContainer.innerHTML = '';
    }

    submitFeedbackModal(appId, appName, topicTitle) {
      const typeEl = document.querySelector('input[name="sp_note_type"]:checked');
      const noteType = typeEl ? typeEl.value : 'needs_practice';
      const textVal = (document.getElementById('sp_note_text')?.value || '').trim();

      let category = 'Needs Practice';
      let icon = '📌';
      let toastMsg = 'Saved to your Account Portal Passport Journal! 📓';

      if (noteType === 'mastered') {
        category = 'Concept Mastered';
        icon = '🌟';
        const key = `${appId}:${topicTitle}`;
        if (!this.data.masteredHistory) this.data.masteredHistory = {};
        if (!this.data.masteredTopics) this.data.masteredTopics = {};
        this.data.masteredTopics[key] = { date: new Date().toLocaleDateString(), appId, topicTitle };

        if (!this.data.masteredHistory[key]) {
          this.data.masteredHistory[key] = true;
          this.addXP(20, appId);
          toastMsg = '🌟 Topic marked as Mastered! (+20 XP awarded to your Passport) 🏆';
        } else {
          toastMsg = '🌟 Topic marked as Mastered in your Journal!';
        }
      } else if (noteType === 'dev_note') {
        category = 'Developer Note';
        icon = '💬';
        toastMsg = '💬 Developer Note saved to your Account Portal Journal!';
      }

      const title = `${icon} ${category}: ${topicTitle}`;
      const content = textVal ? `Topic: ${topicTitle}\nNote: ${textVal}` : `Topic "${topicTitle}" logged as ${category.toLowerCase()}.`;
      const tags = [noteType, appId, topicTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')];

      this.saveJournalEntry({
        appId: appId,
        appName: appName,
        title: title,
        category: category,
        content: content,
        tags: tags
      });

      this.closeFeedbackModal();

      if (typeof showToast === 'function') {
        showToast(toastMsg, 'green');
      } else {
        alert(toastMsg);
      }
    }
  }

  exports.SuitePassport = new SuitePassportEngine();

})(typeof window !== 'undefined' ? window : global);

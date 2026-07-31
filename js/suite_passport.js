/**
 * Shared Learner Passport, XP, Achievement & Central Journal Engine for Learning Suite
 */

(function(exports) {

  const STORAGE_KEY = 'LEARN_SUITE_PASSPORT_V1';

  const DEFAULT_PASSPORT = {
    profile: {
      name: 'Learner',
      avatar: '🦉',
      grade: 'grade3',
      bio: 'Exploring math, writing, philosophy, and technology!',
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0]
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
      this.data = this.load();
      this.updateStreak();
    }

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            ...DEFAULT_PASSPORT,
            ...parsed,
            profile: { ...DEFAULT_PASSPORT.profile, ...(parsed.profile || {}) },
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
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

    getProfile() {
      return this.data.profile;
    }

    updateProfile(updates) {
      this.data.profile = { ...this.data.profile, ...updates };
      this.save();
      if (typeof document !== 'undefined') {
        const el = document.getElementById('passport-pill-container');
        if (el) this.renderPassportPill('passport-pill-container');
      }
    }

    calculateLevel(xp) {
      // Level formula: Level = Math.floor(xp / 100) + 1
      return Math.floor(xp / 100) + 1;
    }

    addXP(amount, appId = 'general') {
      this.data.profile.xp += amount;
      const newLevel = this.calculateLevel(this.data.profile.xp);
      this.data.profile.level = newLevel;

      if (!this.data.appStats[appId]) {
        this.data.appStats[appId] = { xp: 0, count: 0 };
      }
      this.data.appStats[appId].xp += amount;
      this.data.appStats[appId].count += 1;

      this.checkAchievements();
      this.save();
      return { xp: this.data.profile.xp, level: newLevel };
    }

    saveJournalEntry({ appId, appName, title, category, content, tags = [] }) {
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
      this.addXP(15, appId);
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

      // Count active apps used
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
          this.save();
          return true;
        }
      } catch (e) {
        console.error('Invalid JSON import file', e);
      }
      return false;
    }

    renderPassportPill(containerId, rootPathPrefix = '') {
      const el = document.getElementById(containerId);
      if (!el) return;

      const p = this.getProfile();
      el.innerHTML = `
        <a href="${rootPathPrefix}apps/account_portal/index.html" class="passport-pill-link" style="text-decoration:none; display:inline-flex; align-items:center; gap:8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 20px; color: #FFF; font-weight: 700; font-size: 0.85rem; transition: all 0.2s ease;">
          <span style="font-size: 1.1rem;">${p.avatar}</span>
          <span>${p.name}</span>
          <span style="background: linear-gradient(135deg, #F59E0B, #6366F1); padding: 2px 8px; border-radius: 10px; font-size: 0.75rem;">Lvl ${p.level}</span>
          <span style="color: #FCD34D;">⭐ ${p.xp} XP</span>
        </a>
      `;
    }

    toggleMasteredTopic(appId, topicTitle, btnElement = null) {
      if (!this.data.masteredTopics) this.data.masteredTopics = {};
      const key = `${appId}:${topicTitle}`;
      const isMastered = !this.data.masteredTopics[key];

      if (isMastered) {
        this.data.masteredTopics[key] = { date: new Date().toLocaleDateString(), appId, topicTitle };
        this.addXP(20, appId);
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

      const msg = isMastered ? `🌟 "${topicTitle}" marked as Mastered! (+20 XP) 🏆` : `Un-marked "${topicTitle}".`;
      if (typeof showToast === 'function') {
        showToast(msg, isMastered ? 'green' : 'gold');
      } else {
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
        toastMsg = '🌟 Topic marked as Mastered! +20 XP awarded to your Passport! 🏆';
        this.addXP(20, appId);
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

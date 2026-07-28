// Unified XP & Badge system. Single source of truth - do not redefine these in profile.js.

function addXP(amount) {
    if (typeof currentProfile !== 'undefined') {
        currentProfile.xp += amount;
        updateProfileUI();
        if (typeof showFloatingXP === 'function') showFloatingXP(amount);
    }
}

const BADGE_XP = 150;

function unlockBadge(badgeId) {
    if (typeof currentProfile !== 'undefined' && !currentProfile.badges.includes(badgeId)) {
        currentProfile.badges.push(badgeId);
        // addXP renders the floating "+150 XP". Previously the popup was shown
        // without granting anything, so the number on screen never moved.
        if (typeof addXP === 'function') addXP(BADGE_XP);
        saveProfileState();
        if (typeof updateBadgeDisplay === 'function') updateBadgeDisplay();
        if (typeof showToast === 'function') {
            showToast(`🏆 Badge unlocked: ${badgeId.replace(/_/g, ' ')}`);
        }
    }
}

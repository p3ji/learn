// Unified XP & Profile Proxy (Delegates to profile.js for single source of truth)

function addXP(amount) {
    if (typeof currentProfile !== 'undefined') {
        currentProfile.xp += amount;
        updateProfileUI();
        if (typeof showFloatingXP === 'function') showFloatingXP(amount);
    }
}

function unlockBadge(badgeId) {
    if (typeof currentProfile !== 'undefined' && !currentProfile.badges.includes(badgeId)) {
        currentProfile.badges.push(badgeId);
        saveProfileState();
        if (typeof updateBadgeDisplay === 'function') updateBadgeDisplay();
        if (typeof showFloatingXP === 'function') showFloatingXP(150);
    }
}

// Quest Controller, XP Leveling & Badge System for Kids Arcade

let userXP = parseInt(localStorage.getItem('kids_quest_xp') || '150');
let unlockedBadges = JSON.parse(localStorage.getItem('kids_quest_badges') || '["young_thinker"]');

function addXP(amount) {
    userXP += amount;
    localStorage.setItem('kids_quest_xp', userXP.toString());
    updateXPDisplay();
}

function unlockBadge(badgeId) {
    if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        localStorage.setItem('kids_quest_badges', JSON.stringify(unlockedBadges));
        updateBadgeDisplay();
        showBadgePopup(badgeId);
    }
}

function updateXPDisplay() {
    const level = Math.floor(userXP / 200) + 1;
    const progressInLevel = userXP % 200;
    const percent = Math.min(100, Math.round((progressInLevel / 200) * 100));

    const levelBadge = document.getElementById('xpLevelBadge');
    const xpBar = document.getElementById('xpBarFill');
    const xpText = document.getElementById('xpTextDisplay');

    if (levelBadge) levelBadge.innerText = `Level ${level}: Young Philosopher`;
    if (xpBar) xpBar.style.width = `${percent}%`;
    if (xpText) xpText.innerText = `${userXP} XP`;
}

function updateBadgeDisplay() {
    document.querySelectorAll('.badge-item').forEach(b => {
        const id = b.getAttribute('data-badge-id');
        if (unlockedBadges.includes(id)) {
            b.classList.add('unlocked');
        }
    });
}

function showBadgePopup(badgeId) {
    alert(`🏆 CONGRATULATIONS! You unlocked the '${badgeId.toUpperCase().replace('_', ' ')}' Brain Badge! Check your Trophy Showcase!`);
}

document.addEventListener('DOMContentLoaded', () => {
    updateXPDisplay();
    updateBadgeDisplay();
});

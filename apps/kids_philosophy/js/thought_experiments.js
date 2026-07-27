// Interactive Thought Experiments for Kids (Plato's Cave, Ship of Theseus, Ring of Gyges)

function renderThoughtExperiment(expKey) {
    const stage = document.getElementById('thoughtStage');
    if (!stage) return;

    if (expKey === 'platos_cave') {
        stage.innerHTML = `
            <div style="text-align: center;">
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">🌌 Plato's Cave (Shadows vs Reality)</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">People chained inside a cave only see flickering shadows on a wall and think the shadows are real life!</p>

                <div id="caveDisplay" style="background: #000; border: 2px solid var(--purple-primary); border-radius: 20px; padding: 40px; margin-bottom: 20px; min-height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <div id="caveVisual" style="font-size: 5rem; filter: brightness(0.2) blur(2px); transition: all 0.5s ease;">👤 🐕 🌳</div>
                    <div id="caveText" style="color: var(--text-muted); margin-top: 16px; font-weight:700;">Cave Mode: You only see dark flickering shadows on the cave wall!</div>
                </div>

                <div style="display: flex; justify-content: center; gap: 12px;">
                    <button class="fb-action-btn gold" onclick="toggleCaveLight(true)">☀️ Turn On The Sun & Step Outside!</button>
                    <button class="fb-action-btn outline" onclick="toggleCaveLight(false)">🔥 Go Back Inside Cave</button>
                </div>
            </div>
        `;
    } else if (expKey === 'ship_theseus') {
        stage.innerHTML = `
            <div style="text-align: center;">
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">⛵ The Ship of Theseus (Identity Puzzle)</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">If you replace every wooden plank on a ship over 10 years, is it still the SAME ship?</p>

                <div style="font-size: 5rem; margin-bottom: 12px;" id="theseusShipIcon">⛵</div>
                <div id="shipPlankCount" style="font-size: 1.1rem; font-weight:800; color: var(--cyan-magic); margin-bottom: 16px;">Planks Replaced: 0%</div>

                <button class="fb-action-btn gold" onclick="replacePlank()">🔨 Replace 25% Old Planks with New Wood</button>
                <div id="shipResult" style="margin-top: 16px; font-weight:700; color: var(--gold-star);"></div>
            </div>
        `;
    }
}

let caveState = false;
function toggleCaveLight(showSun) {
    const visual = document.getElementById('caveVisual');
    const text = document.getElementById('caveText');

    if (showSun) {
        visual.style.filter = 'brightness(1) blur(0px)';
        text.style.color = 'var(--gold-star)';
        text.innerHTML = '☀️ SUNLIGHT REALITY: You stepped outside! The shadows were just a small reflection of the real colorful world!';
        addXP(75);
        unlockBadge('cave_explorer');
    } else {
        visual.style.filter = 'brightness(0.2) blur(2px)';
        text.style.color = 'var(--text-muted)';
        text.innerHTML = 'Cave Mode: You only see dark flickering shadows on the cave wall!';
    }
}

let shipPlanks = 0;
function replacePlank() {
    shipPlanks += 25;
    if (shipPlanks > 100) shipPlanks = 100;

    document.getElementById('shipPlankCount').innerText = `Planks Replaced: ${shipPlanks}%`;

    const res = document.getElementById('shipResult');
    if (shipPlanks === 100) {
        res.innerHTML = `🎉 100% OF PLANKS REPLACED! Is it the same ship or a brand new ship? (Aristotle says: Its identity is defined by its form & purpose, not just the raw wood!) (+75 XP)`;
        addXP(75);
    } else {
        res.innerHTML = `Replaced ${shipPlanks}% of the old wood planks! Keep going...`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderThoughtExperiment('platos_cave');
});

// Visually Impressive Interactive Thought Experiments (Plato's Cave & Ship of Theseus)

const experimentData = {
    platos_cave: {
        title: "🌌 Plato's Cave (Shadows vs Reality)",
        intro: "Plato imagined people trapped inside a dark cave, facing a blank wall. Behind them, a fire burns and puppets cast flickering shadows on the wall. The prisoners think the shadows ARE real life, until someone escapes outside into the real sunlight!",
        example: "Watching a CGI movie of a dragon on TV is like looking at cave shadows. The movie is a 2D projection, but real life has 3D physics, weather, and real animals!",
        videoId: "1RWgn9wjRVs", // TED-Ed Plato's Cave (4 min)
        activityTitle: "Step 3: Interactive Cave Light Switch & Sunlight Escape"
    },
    ship_theseus: {
        title: "⛵ The Ship of Theseus (Identity Puzzle)",
        intro: "Theseus sailed a famous wooden ship. Over 20 years, every single rotten wooden plank, sail, mast, and wheel was replaced one by one until 100% of the ship was new. Is it still the SAME ship, or a brand new one?",
        example: "Your body replaces almost all its skin cells every month! Are you still the same person as when you were 5 years old? Yes, because your form, memory, and consciousness continue!",
        videoId: "k0Z4dJ9Vw6k", // TED-Ed Ship of Theseus (5 min)
        activityTitle: "Step 3: Interactive Ship Rebuilder & Aristotle's 4 Causes"
    }
};

let activeExpKey = 'platos_cave';

function renderThoughtExperiment(expKey) {
    activeExpKey = expKey;
    const stage = document.getElementById('thoughtStage');
    if (!stage) return;

    document.querySelectorAll('.exp-tab-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    const exp = experimentData[expKey];

    stage.innerHTML = `
        <div>
            <!-- 3-Step Flow Indicator Controls -->
            <div class="viz-controls" style="margin-bottom: 20px;">
                <button class="viz-step-btn active" id="expStepBtn1" onclick="switchExpStep(1)">Step 1: Concept Intro</button>
                <button class="viz-step-btn" id="expStepBtn2" onclick="switchExpStep(2)">Step 2: Video (&lt;10m) & Example</button>
                <button class="viz-step-btn" id="expStepBtn3" onclick="switchExpStep(3)">Step 3: Interactive Game</button>
            </div>

            <!-- Step 1: Intro -->
            <div id="expContent1" class="flow-content-block">
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">${exp.title}</h3>
                <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border-left: 4px solid var(--purple-primary);">${exp.intro}</p>
                <button class="fb-action-btn gold" onclick="switchExpStep(2)">Continue to Step 2: Watch Short Video ➔</button>
            </div>

            <!-- Step 2: Video & Example -->
            <div id="expContent2" class="flow-content-block" style="display:none;">
                <h3 style="font-family: var(--font-heading); color: var(--cyan-magic); font-size: 1.4rem; margin-bottom: 8px;">Real-World Example & TED-Ed Video Lesson</h3>
                <p style="color: var(--text-main); font-size: 1rem; margin-bottom: 16px; background: rgba(6, 182, 212, 0.1); padding: 14px; border-radius: 10px; border: 1px solid var(--cyan-magic);"><strong>Real Example:</strong> ${exp.example}</p>

                <div style="background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%; border: 2px solid var(--purple-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <iframe src="https://www.youtube.com/embed/${exp.videoId}" title="${exp.title}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <a href="https://www.youtube.com/watch?v=${exp.videoId}" target="_blank" class="fb-action-btn outline" style="text-decoration:none;">▶ Open Video on YouTube</a>
                    <button class="fb-action-btn gold" onclick="switchExpStep(3)">Continue to Step 3: Play Interactive Game ➔</button>
                </div>
            </div>

            <!-- Step 3: Interactive Game -->
            <div id="expContent3" class="flow-content-block" style="display:none;">
                <h3 style="font-family: var(--font-heading); color: var(--accent-purple); font-size: 1.4rem; margin-bottom: 16px;">${exp.activityTitle}</h3>
                
                ${expKey === 'platos_cave' ? `
                    <div id="caveDisplay" class="cave-interactive-arena">
                        <div id="caveFireGlow" class="cave-fire-glow"></div>
                        <div id="caveVisual" class="cave-visual-shadows">🔥 👤 🐕 🌳</div>
                        <div id="caveText" class="cave-status-text">🔥 Cave Mode: You are looking at dark, flickering shadows cast by firelight on a stone wall!</div>
                    </div>

                    <div style="display: flex; justify-content: center; gap: 16px; margin-top: 20px;">
                        <button class="fb-action-btn gold" style="font-size: 1.05rem; padding: 12px 24px;" onclick="toggleCaveLight(true)">☀️ Turn On The Sun & Step Outside!</button>
                        <button class="fb-action-btn outline" style="padding: 12px 24px;" onclick="toggleCaveLight(false)">🔥 Go Back Inside Cave</button>
                    </div>
                ` : `
                    <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--purple-primary); border-radius: 20px; padding: 24px; text-align: center;">
                        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; font-size: 3.5rem;" id="theseusVisualParts">
                            <span id="partHull" title="Hull">🪵</span>
                            <span id="partMast" title="Mast">⛵</span>
                            <span id="partSails" title="Sails">🌬️</span>
                            <span id="partWheel" title="Wheel">☸️</span>
                        </div>

                        <div id="shipPlankCount" style="font-size: 1.2rem; font-weight:800; color: var(--gold-star); margin-bottom: 16px;">Ship Transformation: 0% New Golden Materials</div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 20px;">
                            <button class="fallacy-opt-btn" onclick="replacePart('Hull')">🔨 Replace Wooden Hull (25%)</button>
                            <button class="fallacy-opt-btn" onclick="replacePart('Mast')">🔨 Replace Wooden Mast (25%)</button>
                            <button class="fallacy-opt-btn" onclick="replacePart('Sails')">🔨 Replace Canvas Sails (25%)</button>
                            <button class="fallacy-opt-btn" onclick="replacePart('Wheel')">🔨 Replace Steering Wheel (25%)</button>
                        </div>

                        <div id="shipResult" style="padding: 16px; border-radius: 12px; font-weight:700; background: rgba(255,255,255,0.03);">
                            Click the buttons above to replace old wooden parts with brand new golden components!
                        </div>
                    </div>
                `}
            </div>
        </div>
    `;
}

function switchExpStep(stepNum) {
    document.querySelectorAll('#thoughtStage .flow-content-block').forEach(b => b.style.display = 'none');
    document.querySelectorAll('#thoughtStage .viz-step-btn').forEach(b => b.classList.remove('active'));

    const btn = document.getElementById(`expStepBtn${stepNum}`);
    const content = document.getElementById(`expContent${stepNum}`);

    if (btn) btn.classList.add('active');
    if (content) content.style.display = 'block';
}

function toggleCaveLight(showSun) {
    const visual = document.getElementById('caveVisual');
    const text = document.getElementById('caveText');
    const fire = document.getElementById('caveFireGlow');

    if (showSun) {
        visual.style.filter = 'brightness(1) blur(0px)';
        visual.innerHTML = '☀️ 👤 🐕 🌳 🌈 (REAL WORLD!)';
        if (fire) fire.style.background = 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)';
        text.style.color = 'var(--gold-star)';
        text.innerHTML = '☀️ SUNLIGHT REALITY: You stepped outside! The dark shadows were just a small reflection of the real, colorful world! (+100 XP)';
        addXP(100);
        unlockBadge('cave_explorer');
    } else {
        visual.style.filter = 'brightness(0.2) blur(2px)';
        visual.innerHTML = '🔥 👤 🐕 🌳';
        if (fire) fire.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)';
        text.style.color = 'var(--text-muted)';
        text.innerHTML = '🔥 Cave Mode: You are looking at dark, flickering shadows cast by firelight on a stone wall!';
    }
}

let replacedParts = { Hull: false, Mast: false, Sails: false, Wheel: false };

function replacePart(partName) {
    replacedParts[partName] = true;
    
    if (partName === 'Hull') document.getElementById('partHull').innerText = '✨✨';
    if (partName === 'Mast') document.getElementById('partMast').innerText = '🚀';
    if (partName === 'Sails') document.getElementById('partSails').innerText = '⚡';
    if (partName === 'Wheel') document.getElementById('partWheel').innerText = '👑';

    const count = Object.values(replacedParts).filter(Boolean).length;
    const percent = count * 25;

    document.getElementById('shipPlankCount').innerText = `Ship Transformation: ${percent}% New Golden Materials`;

    const res = document.getElementById('shipResult');
    if (percent === 100) {
        res.style.background = 'rgba(16, 185, 129, 0.2)';
        res.style.border = '1.5px solid var(--green-hero)';
        res.style.color = 'var(--green-hero)';
        res.innerHTML = `🎉 100% OF PARTS REPLACED! Is it the same ship or a new ship? (Aristotle's Answer: Its identity is defined by its Form & Purpose, not just raw materials!) (+100 XP)`;
        addXP(100);
    } else {
        res.style.color = 'var(--gold-star)';
        res.innerHTML = `Replaced ${partName}! The ship is now ${percent}% transformed!`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderThoughtExperiment('platos_cave');
});

// Interactive 3-Step Thought Experiment Arcade (Concept -> Video -> Activity)

const experimentData = {
    platos_cave: {
        title: "🌌 Plato's Cave (Shadows vs Reality)",
        intro: "Plato imagined people trapped inside a dark cave, tied facing a wall. Behind them, a fire burns, and puppets cast dark shadows on the wall. The prisoners think the shadows ARE real life, until someone escapes outside into the real sunlight!",
        example: "Imagine watching a movie of a giant dragon on TV. The movie image is a shadow/representation, but the real world has physics, weather, and real animals!",
        videoId: "1RWgn9wjRVs", // TED-Ed Plato's Cave (4 min)
        activityTitle: "Step 3: Light Switch Experiment — Escape the Cave!"
    },
    ship_theseus: {
        title: "⛵ The Ship of Theseus (Identity Puzzle)",
        intro: "Theseus sailed a famous wooden ship. Over 20 years, every rotten wooden plank was replaced one by one until 100% of the ship was new wood. Is it still the SAME ship, or a brand new one?",
        example: "Your body replaces almost all its skin cells every month! Are you still the same person as you were when you were 5 years old? Yes, because your form, memory, and mind continue!",
        videoId: "k0Z4dJ9Vw6k", // TED-Ed Ship of Theseus (5 min)
        activityTitle: "Step 3: Wooden Plank Replacement Simulator"
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
            <!-- 3-Step Flow Controls -->
            <div class="viz-controls" style="margin-bottom: 20px;">
                <button class="viz-step-btn active" id="expStepBtn1" onclick="switchExpStep(1)">Step 1: Concept Intro</button>
                <button class="viz-step-btn" id="expStepBtn2" onclick="switchExpStep(2)">Step 2: Video (<10m) & Example</button>
                <button class="viz-step-btn" id="expStepBtn3" onclick="switchExpStep(3)">Step 3: Interactive Activity</button>
            </div>

            <!-- Step 1: Intro -->
            <div id="expContent1" class="flow-content-block">
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">${exp.title}</h3>
                <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;">${exp.intro}</p>
                <button class="fb-action-btn gold" onclick="switchExpStep(2)">Continue to Step 2: Watch Short Video ➔</button>
            </div>

            <!-- Step 2: Video & Example -->
            <div id="expContent2" class="flow-content-block" style="display:none;">
                <h3 style="font-family: var(--font-heading); color: var(--cyan-magic); font-size: 1.4rem; margin-bottom: 8px;">Real-World Example & TED-Ed Lesson</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;"><strong>Real Example:</strong> ${exp.example}</p>

                <div style="background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 20px; position: relative; padding-top: 56.25%;">
                    <iframe src="https://www.youtube.com/embed/${exp.videoId}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                <button class="fb-action-btn gold" onclick="switchExpStep(3)">Continue to Step 3: Interactive Activity ➔</button>
            </div>

            <!-- Step 3: Activity -->
            <div id="expContent3" class="flow-content-block" style="display:none;">
                <h3 style="font-family: var(--font-heading); color: var(--accent-purple); font-size: 1.4rem; margin-bottom: 16px;">${exp.activityTitle}</h3>
                
                ${expKey === 'platos_cave' ? `
                    <div id="caveDisplay" style="background: #000; border: 2px solid var(--purple-primary); border-radius: 20px; padding: 40px; margin-bottom: 20px; min-height: 200px; text-align:center;">
                        <div id="caveVisual" style="font-size: 5rem; filter: brightness(0.2) blur(2px); transition: all 0.5s ease;">👤 🐕 🌳</div>
                        <div id="caveText" style="color: var(--text-muted); margin-top: 16px; font-weight:700;">Cave Mode: You only see dark flickering shadows on the cave wall!</div>
                    </div>
                    <div style="display: flex; justify-content: center; gap: 12px;">
                        <button class="fb-action-btn gold" onclick="toggleCaveLight(true)">☀️ Turn On The Sun & Step Outside!</button>
                        <button class="fb-action-btn outline" onclick="toggleCaveLight(false)">🔥 Go Back Inside Cave</button>
                    </div>
                ` : `
                    <div style="text-align: center;">
                        <div style="font-size: 5rem; margin-bottom: 12px;">⛵</div>
                        <div id="shipPlankCount" style="font-size: 1.1rem; font-weight:800; color: var(--cyan-magic); margin-bottom: 16px;">Planks Replaced: 0%</div>
                        <button class="fb-action-btn gold" onclick="replacePlank()">🔨 Replace 25% Old Planks with New Wood</button>
                        <div id="shipResult" style="margin-top: 16px; font-weight:700; color: var(--gold-star);"></div>
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

    const countEl = document.getElementById('shipPlankCount');
    if (countEl) countEl.innerText = `Planks Replaced: ${shipPlanks}%`;

    const res = document.getElementById('shipResult');
    if (shipPlanks === 100) {
        res.innerHTML = `🎉 100% OF PLANKS REPLACED! Is it the same ship or a brand new ship? (Aristotle says: Its identity is defined by its form & purpose, not just raw wood!) (+75 XP)`;
        addXP(75);
    } else {
        res.innerHTML = `Replaced ${shipPlanks}% of the old wood planks! Keep going...`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderThoughtExperiment('platos_cave');
});

// Interactive Mental Models Arcade with Safe Event Handling

const mentalModelsData = {
    first_principles: {
        title: "⚡ First Principles Thinking (The Lego Dismantler)",
        intro: "First Principles Thinking means breaking a complex idea or object down to its most basic, unbreakable truths (raw materials/atoms), and then building up from there instead of copying what others do!",
        example: "Instead of buying a $2,000 electric bicycle because that's the market price, an engineer breaks the bicycle down into raw lithium battery cells ($80), steel tubes ($30), and electric wire ($20) to realize it only costs $130 in raw materials!",
        videoId: "g3q-W5FjW9M", // Sprouts: First Principles Thinking (5 min)
        activityTitle: "Step 3: Interactive Object Lego Dismantler"
    },
    occams_razor: {
        title: "🗡️ Occam's Razor (The Mystery Trimmer)",
        intro: "Occam's Razor states that when you have competing explanations for a mystery, the simplest explanation with the fewest wild assumptions is almost always the correct one!",
        example: "If you find your trash can knocked over, option A is 'A raccoon knocked it over', option B is 'Aliens landed, searched for batteries, and flew to Mars'. Occam's Razor trims away the alien theory!",
        videoId: "0t9yY59-Vls", // Sprouts: Occam's Razor (4 min)
        activityTitle: "Step 3: Trim the Mystery Game"
    },
    black_swan: {
        title: "🦢 Karl Popper's Black Swan Hunter (Falsification)",
        intro: "Scientist Karl Popper showed that true science doesn't just look for clues that agree with us. To test a theory, we must hunt for counter-examples ('black swans') that could prove it wrong!",
        example: "Seeing 1,000 white swans doesn't prove all swans are white. Discovering just ONE black swan instantly proves the old rule wrong!",
        videoId: "k0Z4dJ9Vw6k",
        activityTitle: "Step 3: Black Swan Counter-Example Hunter"
    },
    map_territory: {
        title: "🗺️ Map vs. Territory (The Reality Check)",
        intro: "Mental models and drawings are like maps: they simplify reality so we can understand it. But remember: THE MAP IS NOT THE TERRITORY! The real world is always richer and more complex than our model.",
        example: "A simplified map of a zoo shows 3 animal icons, but the real zoo has 400 animals, sounds, smells, and zookeepers!",
        videoId: "1RWgn9wjRVs",
        activityTitle: "Step 3: Map vs Territory Interactive Inspector"
    }
};

let activeMMKey = 'first_principles';

function renderMentalModelArcade(modelKey, evt) {
    activeMMKey = modelKey;
    const stage = document.getElementById('arcadeStage');
    if (!stage) return;

    document.querySelectorAll('.mm-tab-btn').forEach(b => b.classList.remove('active'));
    
    const target = (evt && evt.currentTarget) ? evt.currentTarget : (typeof window !== 'undefined' && window.event && window.event.target ? window.event.target : null);
    if (target && target.classList) {
        target.classList.add('active');
    }

    const mm = mentalModelsData[modelKey];

    stage.innerHTML = `
        <div>
            <!-- 3-Step Flow Controls -->
            <div class="viz-controls" style="margin-bottom: 20px;">
                <button class="viz-step-btn active" id="mmStepBtn1" onclick="switchMMStep(1)">Step 1: Concept Intro</button>
                <button class="viz-step-btn" id="mmStepBtn2" onclick="switchMMStep(2)">Step 2: Video (&lt;10m) & Example</button>
                <button class="viz-step-btn" id="mmStepBtn3" onclick="switchMMStep(3)">Step 3: Interactive Activity</button>
            </div>

            <!-- Step 1: Intro -->
            <div id="mmContent1" class="flow-content-block">
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">${mm.title}</h3>
                <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;">${mm.intro}</p>
                <button class="fb-action-btn gold" onclick="switchMMStep(2)">Continue to Step 2: Watch Short Video ➔</button>
            </div>

            <!-- Step 2: Video & Example -->
            <div id="mmContent2" class="flow-content-block" style="display:none;">
                <h3 style="font-family: var(--font-heading); color: var(--cyan-magic); font-size: 1.4rem; margin-bottom: 8px;">Real-World Example & Educational Lesson</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;"><strong>Real Example:</strong> ${mm.example}</p>

                <div style="background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 20px; position: relative; padding-top: 56.25%;">
                    <iframe src="https://www.youtube.com/embed/${mm.videoId}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <a href="https://www.youtube.com/watch?v=${mm.videoId}" target="_blank" class="fb-action-btn outline" style="text-decoration:none;">▶ Open Video on YouTube</a>
                    <button class="fb-action-btn gold" onclick="switchMMStep(3)">Continue to Step 3: Interactive Activity ➔</button>
                </div>
            </div>

            <!-- Step 3: Activity -->
            <div id="mmContent3" class="flow-content-block" style="display:none;">
                <h3 style="font-family: var(--font-heading); color: var(--accent-purple); font-size: 1.4rem; margin-bottom: 16px;">${mm.activityTitle}</h3>

                ${modelKey === 'first_principles' ? `
                    <div style="text-align: center;">
                        <p style="color: var(--text-muted); margin-bottom: 16px;">Pick an object to dismantle into its raw materials:</p>
                        <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
                            <button class="fallacy-opt-btn" style="text-align:center;" onclick="dismantleObject('rocket')">🚀 Dismantle Space Rocket</button>
                            <button class="fallacy-opt-btn" style="text-align:center;" onclick="dismantleObject('bicycle')">🚲 Dismantle Electric Bicycle</button>
                        </div>
                        <div id="legoDismantleOutput" style="background: rgba(255,255,255,0.05); border: 1px dashed var(--cyan-magic); border-radius: 16px; padding: 20px; font-family: var(--font-mono); color: var(--cyan-magic);">
                            Click an object above to break it down!
                        </div>
                    </div>
                ` : modelKey === 'occams_razor' ? `
                    <div style="background: rgba(236,72,153,0.1); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px;">
                        <div style="font-weight: 800; color: #FFF; font-size: 1.1rem; margin-bottom: 12px;">Mystery: "You woke up and saw your trash can knocked over in the backyard!"</div>
                        <div class="fallacy-options">
                            <button class="fallacy-opt-btn" onclick="applyOccamsRazor(false)">🛸 Aliens landed, searched your trash for batteries, and flew to Mars.</button>
                            <button class="fallacy-opt-btn" onclick="applyOccamsRazor(true)">🦝 A hungry raccoon knocked it over looking for food leftovers.</button>
                            <button class="fallacy-opt-btn" onclick="applyOccamsRazor(false)">🐉 An invisible dragon sneezed and blew the trash can down.</button>
                        </div>
                        <div id="razorResult" style="display:none; margin-top:16px; padding: 16px; border-radius: 12px; font-weight: 700;"></div>
                    </div>
                ` : modelKey === 'black_swan' ? `
                    <div style="text-align: center;">
                        <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 20px;" id="swanLake">
                            <span style="font-size: 3rem;">🦢</span>
                            <span style="font-size: 3rem;">🦢</span>
                            <span style="font-size: 3rem;">🦢</span>
                            <span style="font-size: 3rem;">🦢</span>
                        </div>
                        <button class="fb-action-btn gold" onclick="huntBlackSwan()">🔍 Hunt for a Counter-Example (Black Swan)</button>
                        <div id="swanResult" style="margin-top: 20px; font-weight:700;"></div>
                    </div>
                ` : `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: center;">
                        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px; padding: 20px;">
                            <div style="font-size: 3.5rem; margin-bottom: 8px;">🗺️</div>
                            <h4 style="color: var(--cyan-magic);">The Map (Model)</h4>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">Simplified drawing: "The park has 3 trees and a pond."</p>
                        </div>
                        <div style="background: rgba(255,255,255,0.05); border: 1px solid var(--gold-star); border-radius: 16px; padding: 20px;">
                            <div style="font-size: 3.5rem; margin-bottom: 8px;">🏞️</div>
                            <h4 style="color: var(--gold-star);">The Territory (Real World)</h4>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">Real park: 1,420 trees, 50 birds, muddy grass, wind, insects!</p>
                        </div>
                    </div>
                `}
            </div>
        </div>
    `;
}

function switchMMStep(stepNum, evt) {
    document.querySelectorAll('#arcadeStage .flow-content-block').forEach(b => b.style.display = 'none');
    document.querySelectorAll('#arcadeStage .viz-step-btn').forEach(b => b.classList.remove('active'));

    const target = (evt && evt.currentTarget) ? evt.currentTarget : (typeof window !== 'undefined' && window.event && window.event.target ? window.event.target : null);
    const btn = document.getElementById(`mmStepBtn${stepNum}`);
    const content = document.getElementById(`mmContent${stepNum}`);

    if (target && target.classList) target.classList.add('active');
    else if (btn) btn.classList.add('active');

    if (content) content.style.display = 'block';
}

function dismantleObject(objType) {
    const out = document.getElementById('legoDismantleOutput');
    if (!out) return;

    if (objType === 'rocket') {
        out.innerHTML = `
            🚀 <strong>Space Rocket First Principles Breakdown:</strong><br>
            • Raw Material 1: Aluminum-Lithium Metal Alloy (60%)<br>
            • Raw Material 2: Carbon Fiber Composite (25%)<br>
            • Fuel Components: Liquid Oxygen + Refined Kerosene / Methane (15%)<br>
            <br><em>First Principle Insight: SpaceX built rockets by buying raw carbon & aluminum directly at 2% of the market price!</em>
        `;
    } else {
        out.innerHTML = `
            🚲 <strong>Electric Bicycle First Principles Breakdown:</strong><br>
            • Frame: Tubular Steel / Aluminum ($30)<br>
            • Energy Storage: Lithium-Ion Battery Cells ($80)<br>
            • Propulsion: Copper-Wound Electric Hub Motor ($50)<br>
            <br><em>First Principle Insight: Anyone can build an e-bike for $160 in raw parts instead of buying a $2,000 branded bike!</em>
        `;
    }
    addXP(50);
    unlockBadge('first_principles');
}

function applyOccamsRazor(isCorrect) {
    const res = document.getElementById('razorResult');
    if (!res) return;

    res.style.display = 'block';
    if (isCorrect) {
        res.style.background = 'rgba(16, 185, 129, 0.2)';
        res.style.border = '1px solid var(--green-hero)';
        res.style.color = 'var(--green-hero)';
        res.innerHTML = '🗡️ BINGO! Occam\'s Razor trimmed away aliens and dragons! A hungry raccoon is the simplest explanation (+75 XP)!';
        addXP(75);
        unlockBadge('occams_razor');
    } else {
        res.style.background = 'rgba(239, 68, 68, 0.2)';
        res.style.border = '1px solid #EF4444';
        res.style.color = '#EF4444';
        res.innerHTML = '❌ Too many crazy assumptions! Remember Occam\'s Razor: trim away wild theories to find the simplest answer!';
    }
}

function huntBlackSwan() {
    const lake = document.getElementById('swanLake');
    const res = document.getElementById('swanResult');

    if (lake) {
        lake.innerHTML = `
            <span style="font-size: 3rem;">🦢</span>
            <span style="font-size: 3rem;">🦢</span>
            <span style="font-size: 3rem; transform: scale(1.2);">🖤</span>
            <span style="font-size: 3rem;">🦢</span>
        `;
    }

    if (res) {
        res.innerHTML = `<span style="color: var(--pink-energy); font-size: 1.1rem;">🖤 YOU FOUND A BLACK SWAN!</span><br>The theory "All swans are white" is now FALSIFIED! This is how real scientific progress happens (+75 XP)!`;
    }
    addXP(75);
}

document.addEventListener('DOMContentLoaded', () => {
    renderMentalModelArcade('first_principles');
});

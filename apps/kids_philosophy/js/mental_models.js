// Interactive Mental Models Simulators for Kids (8-12)

function renderMentalModelArcade(modelKey) {
    const stage = document.getElementById('arcadeStage');
    if (!stage) return;

    document.querySelectorAll('.arcade-tab-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    if (modelKey === 'first_principles') {
        stage.innerHTML = `
            <div style="text-align: center;">
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">⚡ First Principles Thinking (The Lego Dismantler)</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">Instead of copying others, break a complex object down to its basic building blocks (atoms/raw materials)!</p>

                <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
                    <button class="fallacy-opt-btn" style="text-align:center;" onclick="dismantleObject('rocket')">🚀 Dismantle Space Rocket</button>
                    <button class="fallacy-opt-btn" style="text-align:center;" onclick="dismantleObject('bicycle')">🚲 Dismantle Electric Bicycle</button>
                </div>

                <div id="legoDismantleOutput" style="background: rgba(255,255,255,0.05); border: 1px dashed var(--cyan-magic); border-radius: 16px; padding: 20px; font-family: var(--font-mono); color: var(--cyan-magic);">
                    Click an object above to break it down into its fundamental building blocks!
                </div>
            </div>
        `;
    } else if (modelKey === 'occams_razor') {
        stage.innerHTML = `
            <div>
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">🗡️ Occam's Razor (The Mystery Trimmer)</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">When trying to explain a mystery, the simplest explanation with the fewest wild assumptions is usually correct!</p>

                <div style="background: rgba(236,72,153,0.1); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="font-weight: 800; color: #FFF; font-size: 1.1rem; margin-bottom: 12px;">Mystery: "You woke up and saw your trash can knocked over in the backyard!"</div>
                    
                    <div class="fallacy-options">
                        <button class="fallacy-opt-btn" onclick="applyOccamsRazor(false)">🛸 Aliens landed, searched your trash for batteries, and flew back to Mars.</button>
                        <button class="fallacy-opt-btn" onclick="applyOccamsRazor(true)">🦝 A hungry raccoon knocked it over looking for food leftover.</button>
                        <button class="fallacy-opt-btn" onclick="applyOccamsRazor(false)">🐉 A invisible dragon sneezed and blew the trash can down.</button>
                    </div>
                </div>

                <div id="razorResult" style="display:none; padding: 16px; border-radius: 12px; font-weight: 700;"></div>
            </div>
        `;
    } else if (modelKey === 'black_swan') {
        stage.innerHTML = `
            <div>
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">🦢 Karl Popper's Black Swan Hunter (Falsification)</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">You can see 1,000 white swans, but seeing just ONE black swan proves the theory "All swans are white" WRONG!</p>

                <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 20px;" id="swanLake">
                    <span style="font-size: 3rem;">🦢</span>
                    <span style="font-size: 3rem;">🦢</span>
                    <span style="font-size: 3rem;">🦢</span>
                    <span style="font-size: 3rem;">🦢</span>
                </div>

                <div style="text-align: center;">
                    <button class="fb-action-btn gold" onclick="huntBlackSwan()">🔍 Hunt for a Counter-Example (Black Swan)</button>
                </div>
                
                <div id="swanResult" style="margin-top: 20px; font-weight:700; text-align:center;"></div>
            </div>
        `;
    } else if (modelKey === 'map_territory') {
        stage.innerHTML = `
            <div>
                <h3 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; margin-bottom: 8px;">🗺️ Map vs. Territory (The Reality Check)</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">"The map is not the territory." Your mental model or drawing of something is never the real complex object!</p>

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
            </div>
        `;
    }
}

function dismantleObject(objType) {
    const out = document.getElementById('legoDismantleOutput');
    if (objType === 'rocket') {
        out.innerHTML = `
            🚀 <strong>Space Rocket First Principles Breakdown:</strong><br>
            • Raw Material 1: Aluminum-Lithium Metal Alloy (60%)<br>
            • Raw Material 2: Carbon Fiber Composite (25%)<br>
            • Fuel Components: Liquid Oxygen + Refined Kerosene / Methane (15%)<br>
            <br><em>First Principle Insight: Elon Musk built SpaceX by buying raw carbon & aluminum directly at 2% the cost of a finished rocket!</em>
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

    lake.innerHTML = `
        <span style="font-size: 3rem;">🦢</span>
        <span style="font-size: 3rem;">🦢</span>
        <span style="font-size: 3rem; transform: scale(1.2);">🖤</span>
        <span style="font-size: 3rem;">🦢</span>
    `;

    res.innerHTML = `<span style="color: var(--pink-energy); font-size: 1.1rem;">🖤 YOU FOUND A BLACK SWAN!</span><br>The theory "All swans are white" is now FALSIFIED! This is how real scientific progress happens (+75 XP)!`;
    addXP(75);
}

document.addEventListener('DOMContentLoaded', () => {
    renderMentalModelArcade('first_principles');
});

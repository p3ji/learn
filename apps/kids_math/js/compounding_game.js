/**
 * Compounding Island Game & Simulator for MathForge Ottawa.
 * Teaches exponential growth, the power of compound interest (A = P(1+r)^t),
 * and the 1624 Manhattan Island thought experiment.
 */

(function(exports) {

  class CompoundingGame {
    constructor(app) {
      this.app = app;
      this.active = false;
      this.mode = 'story'; // 'story', 'guess', 'reveal', 'sandbox', 'quiz'

      // Island scenario defaults
      this.principal = 24;
      this.startYear = 1624;
      this.endYear = 2025;
      this.years = 402; // Jan 1, 1624 to Dec 31, 2025 = 402 years

      // Time machine scrubber state
      this.scrubberYear = 2025;

      // User guesses
      this.guesses = { rate4: '', rate6: '', rate8: '' };

      // Sandbox custom state
      this.sandbox = {
        principal: 1000,
        rate: 7,
        years: 30,
        frequency: 1 // 1=annual, 12=monthly, 365=daily
      };

      // Quiz state
      this.quizIndex = 0;
      this.quizScore = 0;
      this.quizAnswered = false;
    }

    /* ---------------- Core Formulas ---------------- */

    calculateCompound(P, rPercent, tYears, nFreq = 1) {
      const r = rPercent / 100;
      return P * Math.pow(1 + (r / nFreq), nFreq * tYears);
    }

    calculateSimple(P, rPercent, tYears) {
      const r = rPercent / 100;
      return P + (P * r * tYears);
    }

    formatMoney(val) {
      if (val >= 1e15) {
        return '$' + (val / 1e15).toFixed(2) + ' Quadrillion';
      }
      if (val >= 1e12) {
        return '$' + (val / 1e12).toFixed(2) + ' Trillion';
      }
      if (val >= 1e9) {
        return '$' + (val / 1e9).toFixed(2) + ' Billion';
      }
      if (val >= 1e6) {
        return '$' + (val / 1e6).toFixed(2) + ' Million';
      }
      return '$' + val.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }

    getMilestone(year) {
      if (year <= 1650) return "🏝️ 1624: Dutch purchase Manhattan Island for $24.";
      if (year <= 1720) return "📜 1687: Isaac Newton publishes Principia Mathematica.";
      if (year <= 1790) return "🇺🇸 1776: US Declaration of Independence signed.";
      if (year <= 1840) return "⚙️ 1804: Industrial Revolution accelerates; World Pop reaches 1 Billion.";
      if (year <= 1890) return "🚂 1865: Transatlantic Telegraph Cable completed.";
      if (year <= 1920) return "✈️ 1903: Wright Brothers achieve first powered flight.";
      if (year <= 1955) return "📻 1929: Golden Age of Science & Early Electronic Computing.";
      if (year <= 1990) return "🌕 1969: Apollo 11 Moon Landing.";
      if (year <= 2015) return "📱 2007: Release of the modern Smartphone & Web 2.0.";
      return "🚀 2025: Present Day (402 years of exponential compounding!).";
    }

    /* ---------------- Navigation & View Handlers ---------------- */

    setMode(mode) {
      this.mode = mode;
      if (this.app) this.app.render();
    }

    submitGuess(e) {
      if (e) e.preventDefault();
      const g4 = document.getElementById('guess-4');
      const g6 = document.getElementById('guess-6');
      const g8 = document.getElementById('guess-8');

      this.guesses = {
        rate4: g4 ? g4.value : '',
        rate6: g6 ? g6.value : '',
        rate8: g8 ? g8.value : ''
      };

      this.setMode('reveal');
    }

    updateScrubber(val) {
      this.scrubberYear = parseInt(val, 10);
      const yearEl = document.getElementById('tm-year-label');
      const milestoneEl = document.getElementById('tm-milestone');
      const v4El = document.getElementById('tm-v4');
      const v6El = document.getElementById('tm-v6');
      const v8El = document.getElementById('tm-v8');

      const t = this.scrubberYear - 1624;
      const v4 = this.calculateCompound(24, 4, t);
      const v6 = this.calculateCompound(24, 6, t);
      const v8 = this.calculateCompound(24, 8, t);

      if (yearEl) yearEl.textContent = `${this.scrubberYear} AD (${t} years elapsed)`;
      if (milestoneEl) milestoneEl.textContent = this.getMilestone(this.scrubberYear);
      if (v4El) v4El.textContent = this.formatMoney(v4);
      if (v6El) v6El.textContent = this.formatMoney(v6);
      if (v8El) v8El.textContent = this.formatMoney(v8);
    }

    updateSandbox() {
      const p = parseFloat(document.getElementById('sb-principal')?.value || 1000);
      const r = parseFloat(document.getElementById('sb-rate')?.value || 7);
      const y = parseInt(document.getElementById('sb-years')?.value || 30, 10);
      const f = parseInt(document.getElementById('sb-freq')?.value || 1, 10);

      this.sandbox = { principal: p, rate: r, years: y, frequency: f };
      if (this.app) this.app.render();
    }

    /* ---------------- Multi-Rate SVG Visualization (4% vs 6% vs 8%) ---------------- */

    renderMultiRateChartSVG() {
      const width = 640;
      const height = 320;
      const padding = 45;
      const steps = 100;
      const years = 402;
      const yearStep = years / steps;

      const pts4 = [];
      const pts6 = [];
      const pts8 = [];

      for (let i = 0; i <= steps; i++) {
        const t = i * yearStep;
        pts4.push({ t, val: this.calculateCompound(24, 4, t) });
        pts6.push({ t, val: this.calculateCompound(24, 6, t) });
        pts8.push({ t, val: this.calculateCompound(24, 8, t) });
      }

      // Log-scaled Y-axis mapping to make all 3 curves visible & striking
      const maxVal = pts8[pts8.length - 1].val;
      const maxLog = Math.log10(maxVal);

      const plotW = width - (padding * 2);
      const plotH = height - (padding * 2);

      const getX = (t) => padding + (t / years) * plotW;
      const getY = (v) => {
        if (v <= 1) return height - padding;
        const norm = Math.log10(v) / maxLog;
        return height - padding - (norm * plotH);
      };

      const path4D = pts4.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.t).toFixed(1)} ${getY(pt.val).toFixed(1)}`).join(' ');
      const path6D = pts6.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.t).toFixed(1)} ${getY(pt.val).toFixed(1)}`).join(' ');
      const path8D = pts8.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.t).toFixed(1)} ${getY(pt.val).toFixed(1)}`).join(' ');

      return `
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; background:#0B132B; border-radius:16px; border:1px solid #334155; margin: 20px 0;">
          <!-- Axes -->
          <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#475569" stroke-width="1.5"/>
          <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#475569" stroke-width="1.5"/>

          <!-- Timeline Year Markers -->
          <text x="${padding}" y="${height - 15}" fill="#94A3B8" font-size="11">1624</text>
          <text x="${padding + plotW * 0.25}" y="${height - 15}" fill="#94A3B8" font-size="11">1724</text>
          <text x="${padding + plotW * 0.5}" y="${height - 15}" fill="#94A3B8" font-size="11">1824</text>
          <text x="${padding + plotW * 0.75}" y="${height - 15}" fill="#94A3B8" font-size="11">1924</text>
          <text x="${width - padding - 25}" y="${height - 15}" fill="#FCD34D" font-size="11" font-weight="700">2025</text>

          <!-- 4% Curve (Cyan) -->
          <path d="${path4D}" fill="none" stroke="#38BDF8" stroke-width="3"/>

          <!-- 6% Curve (Gold) -->
          <path d="${path6D}" fill="none" stroke="#F59E0B" stroke-width="3.5"/>

          <!-- 8% Curve (Pink) -->
          <path d="${path8D}" fill="none" stroke="#EC4899" stroke-width="4"/>

          <!-- End Dots -->
          <circle cx="${getX(402)}" cy="${getY(pts4[steps].val)}" r="5" fill="#38BDF8"/>
          <circle cx="${getX(402)}" cy="${getY(pts6[steps].val)}" r="6" fill="#F59E0B"/>
          <circle cx="${getX(402)}" cy="${getY(pts8[steps].val)}" r="7" fill="#EC4899"/>

          <!-- Floating Legend -->
          <g transform="translate(${padding + 12}, ${padding + 10})">
            <rect x="0" y="0" width="260" height="70" rx="10" fill="#1E293B" opacity="0.95" stroke="#334155"/>
            <line x1="12" y1="16" x2="32" y2="16" stroke="#38BDF8" stroke-width="3"/>
            <text x="38" y="20" fill="#38BDF8" font-size="11" font-weight="700">4% Interest: $168.9 Million</text>
            <line x1="12" y1="35" x2="32" y2="35" stroke="#F59E0B" stroke-width="3"/>
            <text x="38" y="39" fill="#FCD34D" font-size="11" font-weight="700">6% Interest: $357.4 Billion</text>
            <line x1="12" y1="54" x2="32" y2="54" stroke="#EC4899" stroke-width="3.5"/>
            <text x="38" y="58" fill="#F472B6" font-size="11" font-weight="700">8% Interest: $655.5 Trillion!</text>
          </g>
        </svg>
      `;
    }

    /* ---------------- Single Curve SVG Sandbox Generator ---------------- */

    renderChartSVG(P, rPercent, years, nFreq = 1) {
      const width = 600;
      const height = 280;
      const padding = 40;

      const steps = Math.min(years, 100);
      const yearStep = years / steps;

      const compoundPoints = [];
      const simplePoints = [];

      let maxVal = P;
      for (let i = 0; i <= steps; i++) {
        const t = i * yearStep;
        const cVal = this.calculateCompound(P, rPercent, t, nFreq);
        const sVal = this.calculateSimple(P, rPercent, t);
        if (cVal > maxVal) maxVal = cVal;
        compoundPoints.push({ t, val: cVal });
        simplePoints.push({ t, val: sVal });
      }

      const plotW = width - (padding * 2);
      const plotH = height - (padding * 2);

      const getX = (t) => padding + (t / years) * plotW;
      const getY = (v) => height - padding - ((v / maxVal) * plotH);

      const cPathD = compoundPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.t).toFixed(1)} ${getY(pt.val).toFixed(1)}`).join(' ');
      const sPathD = simplePoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.t).toFixed(1)} ${getY(pt.val).toFixed(1)}`).join(' ');

      const endC = compoundPoints[compoundPoints.length - 1];
      const endS = simplePoints[simplePoints.length - 1];

      return `
        <svg viewBox="0 0 ${width} ${height}" class="compounding-svg" style="width:100%; height:auto; background:#0F172A; border-radius:16px; border:1px solid #334155;">
          <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#475569" stroke-width="1.5"/>
          <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#475569" stroke-width="1.5"/>

          <path d="${sPathD}" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4 4"/>
          <path d="${cPathD}" fill="none" stroke="#EC4899" stroke-width="4"/>

          <circle cx="${getX(endC.t)}" cy="${getY(endC.val)}" r="6" fill="#EC4899"/>
          <circle cx="${getX(endS.t)}" cy="${getY(endS.val)}" r="4" fill="#38BDF8"/>

          <g transform="translate(${padding + 10}, ${padding + 15})">
            <rect x="0" y="0" width="230" height="46" rx="8" fill="#1E293B" opacity="0.9" stroke="#334155"/>
            <line x1="12" y1="15" x2="32" y2="15" stroke="#EC4899" stroke-width="3"/>
            <text x="38" y="19" fill="#F8FAFC" font-size="12" font-weight="700">Compound (Exponential): ${this.formatMoney(endC.val)}</text>
            <line x1="12" y1="33" x2="32" y2="33" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 3"/>
            <text x="38" y="37" fill="#94A3B8" font-size="11" font-weight="600">Simple Interest: ${this.formatMoney(endS.val)}</text>
          </g>
        </svg>
      `;
    }

    /* ---------------- Main HTML Renderer ---------------- */

    render() {
      const val4 = this.calculateCompound(24, 4, 402);
      const val6 = this.calculateCompound(24, 6, 402);
      const val8 = this.calculateCompound(24, 8, 402);

      return `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <!-- Top Navigation Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
            <a onclick="app.showMainView()" class="back-nav" style="cursor:pointer; font-weight:700; font-size:1.05rem;">← Back to MathForge Overview</a>
            
            <div style="display:flex; gap:8px;">
              <button class="strand-tab ${this.mode === 'story' || this.mode === 'guess' || this.mode === 'reveal' ? 'active' : ''}" onclick="app.compoundingGame.setMode('story')">🏝️ The Island Story</button>
              <button class="strand-tab ${this.mode === 'sandbox' ? 'active' : ''}" onclick="app.compoundingGame.setMode('sandbox')">🎛️ Compound Simulator</button>
              <button class="strand-tab ${this.mode === 'quiz' ? 'active' : ''}" onclick="app.compoundingGame.setMode('quiz')">⚡ Rule of 72 Challenge</button>
            </div>
          </div>

          ${this.renderBody(val4, val6, val8)}
        </div>
      `;
    }

    renderBody(val4, val6, val8) {
      if (this.mode === 'story') {
        return `
          <div class="workspace-card" style="background: linear-gradient(135deg, #1E293B, #0F172A); border: 2px solid #EC4899; box-shadow: 0 20px 50px rgba(236,72,153,0.15);">
            <div style="text-align:center; max-width:760px; margin:0 auto; padding: 20px 0;">
              <span class="topic-code-pill" style="background:rgba(236,72,153,0.2); color:#F472B6; border:1px solid #EC4899;">Financial Literacy • A = P(1+r)ᵗ</span>
              <h1 class="hero-title" style="font-size:2.4rem; margin:14px 0;">The Story of an Island 🏝️</h1>
              <p style="font-size:1.15rem; color:#CBD5E1; line-height:1.7; margin-bottom:28px;">
                In <strong style="color:#FCD34D;">1624 AD</strong>, Manhattan Island was purchased for the equivalent of <strong style="color:#34D399;">$24</strong> in Dutch guilders. What if that $24 had been invested in an interest-bearing account instead?
              </p>

              <!-- Rules Card -->
              <div style="background:rgba(15,23,42,0.8); border:1px dashed #475569; border-radius:16px; padding:24px; text-align:left; margin-bottom:32px;">
                <h3 style="font-family:var(--font-heading); color:#EC4899; font-size:1.25rem; margin-bottom:14px;">📜 Rules of the Game:</h3>
                <ol style="margin-left:20px; color:#E2E8F0; font-size:1.05rem; line-height:1.8;">
                  <li>Invest <strong style="color:#34D399;">$24</strong> on <strong style="color:#FCD34D;">Jan 1, 1624</strong>.</li>
                  <li>Fixed annual compound interest rate throughout the holding period.</li>
                  <li>No money withdrawal until <strong style="color:#FCD34D;">Dec 31, 2025</strong> (Total: <strong>402 years</strong>).</li>
                </ol>
              </div>

              <button class="btn-primary" style="font-size:1.2rem; padding:14px 32px; background:linear-gradient(135deg, #EC4899, #8B5CF6); border:none;" onclick="app.compoundingGame.setMode('guess')">
                Make Your Prediction! ➔
              </button>
            </div>
          </div>
        `;
      }

      if (this.mode === 'guess') {
        return `
          <div class="workspace-card">
            <h2 style="font-family:var(--font-heading); font-size:1.8rem; margin-bottom:8px;">🤔 Make Your Guess!</h2>
            <p style="color:var(--text-muted); font-size:1.05rem; margin-bottom:24px;">
              How much money do you think <strong style="color:#34D399;">$24</strong> becomes after <strong>402 years</strong> (1624 ➔ 2025) at different interest rates?
            </p>

            <form onsubmit="app.compoundingGame.submitGuess(event)" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:32px;">
              <div style="background:#0F172A; border:1px solid #334155; padding:20px; border-radius:12px;">
                <label style="font-weight:800; font-size:1.1rem; color:#38BDF8; display:block; margin-bottom:8px;">a) At 4% Interest:</label>
                <input type="text" id="guess-4" class="math-input" placeholder="e.g. $10,000 or 1 Million" autocomplete="off" required style="width:100%;">
              </div>

              <div style="background:#0F172A; border:1px solid #334155; padding:20px; border-radius:12px;">
                <label style="font-weight:800; font-size:1.1rem; color:#F59E0B; display:block; margin-bottom:8px;">b) At 6% Interest:</label>
                <input type="text" id="guess-6" class="math-input" placeholder="e.g. $500,000 or 100 Million" autocomplete="off" required style="width:100%;">
              </div>

              <div style="background:#0F172A; border:1px solid #334155; padding:20px; border-radius:12px;">
                <label style="font-weight:800; font-size:1.1rem; color:#EC4899; display:block; margin-bottom:8px;">c) At 8% Interest:</label>
                <input type="text" id="guess-8" class="math-input" placeholder="e.g. $5 Billion or 1 Trillion" autocomplete="off" required style="width:100%;">
              </div>

              <div style="grid-column: 1 / -1; text-align:center; margin-top:12px;">
                <button type="submit" class="btn-primary" style="font-size:1.2rem; padding:14px 36px; background:linear-gradient(135deg, #10B981, #0EA5E9);">
                  💥 Reveal The Mind-Blowing Truth!
                </button>
              </div>
            </form>
          </div>
        `;
      }

      if (this.mode === 'reveal') {
        const tScrub = this.scrubberYear - 1624;
        const v4Scrub = this.calculateCompound(24, 4, tScrub);
        const v6Scrub = this.calculateCompound(24, 6, tScrub);
        const v8Scrub = this.calculateCompound(24, 8, tScrub);

        return `
          <div class="workspace-card" style="background:#0F172A; border:2px solid #F59E0B;">
            <div style="text-align:center; margin-bottom:28px;">
              <span class="topic-code-pill" style="background:rgba(245,158,11,0.2); color:#FCD34D;">Exponential Growth Revealed</span>
              <h2 style="font-family:var(--font-heading); font-size:2.2rem; margin:12px 0;">🎉 The Power of Compounding!</h2>
              <p style="color:#94A3B8; font-size:1.05rem;">Notice how a small 2% increase in interest rate creates astronomically larger fortunes over time!</p>
            </div>

            <!-- 3 Outcome Cards -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; margin-bottom:32px;">
              <!-- 4% Card -->
              <div style="background:#1E293B; border:1px solid #38BDF8; border-radius:16px; padding:24px;">
                <div style="font-size:0.9rem; font-weight:800; color:#38BDF8; margin-bottom:6px;">a) At 4% Interest Rate</div>
                <div style="font-size:1.9rem; font-weight:900; color:#FFF; margin-bottom:12px;">${this.formatMoney(val4)}</div>
                <div style="font-size:0.85rem; color:#94A3B8; line-height:1.5;">
                  <strong>Your Guess:</strong> ${this.guesses.rate4 || 'None'}<br>
                  <em>Equivalent to buying ~170 luxury mansions!</em>
                </div>
              </div>

              <!-- 6% Card -->
              <div style="background:#1E293B; border:2px solid #F59E0B; border-radius:16px; padding:24px;">
                <div style="font-size:0.9rem; font-weight:800; color:#F59E0B; margin-bottom:6px;">b) At 6% Interest Rate</div>
                <div style="font-size:1.9rem; font-weight:900; color:#FCD34D; margin-bottom:12px;">${this.formatMoney(val6)}</div>
                <div style="font-size:0.85rem; color:#94A3B8; line-height:1.5;">
                  <strong>Your Guess:</strong> ${this.guesses.rate6 || 'None'}<br>
                  <em>More than the net worth of the richest person on Earth!</em>
                </div>
              </div>

              <!-- 8% Card -->
              <div style="background:#1E293B; border:2px solid #EC4899; border-radius:16px; padding:24px;">
                <div style="font-size:0.9rem; font-weight:800; color:#EC4899; margin-bottom:6px;">c) At 8% Interest Rate</div>
                <div style="font-size:1.9rem; font-weight:900; color:#F472B6; margin-bottom:12px;">${this.formatMoney(val8)}</div>
                <div style="font-size:0.85rem; color:#94A3B8; line-height:1.5;">
                  <strong>Your Guess:</strong> ${this.guesses.rate8 || 'None'}<br>
                  <em>Enough to buy all property, gold, and companies in North America combined!</em>
                </div>
              </div>
            </div>

            <!-- Visualization 1: Interactive Multi-Curve Graph -->
            <div style="background:#1E293B; border:1px solid #334155; border-radius:16px; padding:24px; margin-bottom:32px;">
              <h3 style="font-family:var(--font-heading); color:#FCD34D; font-size:1.3rem; margin-bottom:6px;">📈 Multi-Rate Exponential Growth Comparison (1624 ➔ 2025)</h3>
              <p style="color:#94A3B8; font-size:0.95rem; margin-bottom:14px;">The curves start almost identically for the first 100 years, then split into exponentially separate orders of magnitude!</p>

              ${this.renderMultiRateChartSVG()}
            </div>

            <!-- Visualization 2: 1624 ➔ 2025 Interactive Time Machine Scrubber -->
            <div style="background:linear-gradient(135deg, #1E293B, #0F172A); border:1px solid #38BDF8; border-radius:16px; padding:24px; margin-bottom:32px;">
              <h3 style="font-family:var(--font-heading); color:#38BDF8; font-size:1.3rem; margin-bottom:6px;">⏳ Interactive Time Machine Scrubber</h3>
              <p style="color:#94A3B8; font-size:0.95rem; margin-bottom:18px;">Drag the slider to watch how the balance evolves across 402 years of world history!</p>

              <div style="margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span id="tm-year-label" style="font-size:1.25rem; font-weight:800; color:#FCD34D;">${this.scrubberYear} AD (${tScrub} years elapsed)</span>
                </div>
                <input type="range" id="tm-slider" min="1624" max="2025" step="1" value="${this.scrubberYear}" oninput="app.compoundingGame.updateScrubber(this.value)" style="width:100%;">
              </div>

              <!-- Historical Milestone Callout -->
              <div id="tm-milestone" style="background:rgba(56,189,248,0.15); border:1px solid #38BDF8; color:#7DD3FC; padding:12px 16px; border-radius:10px; font-weight:700; font-size:1.02rem; margin-bottom:20px;">
                ${this.getMilestone(this.scrubberYear)}
              </div>

              <!-- Live Balance Comparison at Scrubber Year -->
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px;">
                <div style="background:#0F172A; padding:16px; border-radius:10px; border:1px solid #38BDF8;">
                  <div style="font-size:0.8rem; font-weight:700; color:#38BDF8;">4% Value:</div>
                  <div id="tm-v4" style="font-size:1.3rem; font-weight:800; color:#FFF; margin-top:4px;">${this.formatMoney(v4Scrub)}</div>
                </div>
                <div style="background:#0F172A; padding:16px; border-radius:10px; border:1px solid #F59E0B;">
                  <div style="font-size:0.8rem; font-weight:700; color:#F59E0B;">6% Value:</div>
                  <div id="tm-v6" style="font-size:1.3rem; font-weight:800; color:#FCD34D; margin-top:4px;">${this.formatMoney(v6Scrub)}</div>
                </div>
                <div style="background:#0F172A; padding:16px; border-radius:10px; border:1px solid #EC4899;">
                  <div style="font-size:0.8rem; font-weight:700; color:#EC4899;">8% Value:</div>
                  <div id="tm-v8" style="font-size:1.3rem; font-weight:800; color:#F472B6; margin-top:4px;">${this.formatMoney(v8Scrub)}</div>
                </div>
              </div>
            </div>

            <!-- Visualization 3: Visual Scale Comparison Infographic -->
            <div style="background:rgba(236,72,153,0.1); border:1px solid #EC4899; border-radius:16px; padding:24px; margin-bottom:32px;">
              <h3 style="font-family:var(--font-heading); color:#EC4899; font-size:1.3rem; margin-bottom:12px;">📊 Tangible Scale Comparison ("What Does It Buy?")</h3>
              
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:18px;">
                <div style="background:#0F172A; padding:18px; border-radius:12px; border:1px solid #38BDF8;">
                  <div style="font-size:2rem; margin-bottom:8px;">🏰 🏰 🏰</div>
                  <div style="font-weight:800; color:#38BDF8; font-size:1.1rem; margin-bottom:4px;">4% ➔ $168.9 Million</div>
                  <div style="font-size:0.88rem; color:#CBD5E1; line-height:1.5;">Equal to 170 luxury estates or a fleet of 5,000 electric vehicles.</div>
                </div>

                <div style="background:#0F172A; padding:18px; border-radius:12px; border:1px solid #F59E0B;">
                  <div style="font-size:2rem; margin-bottom:8px;">🚀 🚀 🚀</div>
                  <div style="font-weight:800; color:#FCD34D; font-size:1.1rem; margin-bottom:4px;">6% ➔ $357.4 Billion</div>
                  <div style="font-size:0.88rem; color:#CBD5E1; line-height:1.5;">Equal to building 800 Starship space rockets or 2x the richest person on Earth.</div>
                </div>

                <div style="background:#0F172A; padding:18px; border-radius:12px; border:1px solid #EC4899;">
                  <div style="font-size:2rem; margin-bottom:8px;">🌍 🌍 🌍</div>
                  <div style="font-weight:800; color:#F472B6; font-size:1.1rem; margin-bottom:4px;">8% ➔ $655.5 Trillion</div>
                  <div style="font-size:0.88rem; color:#CBD5E1; line-height:1.5;">Equal to 800 planets made of pure gold — over 6x all existing global wealth!</div>
                </div>
              </div>
            </div>

            <!-- Formula Breakdown Box -->
            <div style="background:#1E293B; border:1px solid #475569; border-radius:16px; padding:24px; margin-bottom:32px;">
              <h3 style="font-family:var(--font-heading); color:#FFF; font-size:1.2rem; margin-bottom:10px;">💡 Mathematical Formula Breakdown</h3>
              <p style="color:#E2E8F0; font-size:1rem; line-height:1.7; margin-bottom:12px;">
                Simple interest grows linearly: <code style="color:#38BDF8;">A = P + (P × r × t)</code>.<br>
                Compound interest grows exponentially: <code style="color:#EC4899; font-weight:bold;">A = P × (1 + r)ᵗ</code> because interest earns interest!
              </p>
              <div style="font-family:var(--font-code); color:#FCD34D; background:rgba(0,0,0,0.4); padding:12px; border-radius:8px; font-size:0.95rem;">
                At 8%: $24 × (1.08)⁴⁰² = $24 × 27,311,761,150,584.67 = $655,482,267,614,032
              </div>
            </div>

            <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
              <button class="btn-primary" onclick="app.compoundingGame.setMode('sandbox')">
                🎛️ Test Custom Amounts in Simulator ➔
              </button>
              <button class="btn-secondary" onclick="app.compoundingGame.setMode('quiz')">
                ⚡ Try Rule of 72 Challenge
              </button>
            </div>
          </div>
        `;
      }

      if (this.mode === 'sandbox') {
        const { principal, rate, years, frequency } = this.sandbox;
        const cTotal = this.calculateCompound(principal, rate, years, frequency);
        const sTotal = this.calculateSimple(principal, rate, years);
        const profit = cTotal - principal;

        return `
          <div class="workspace-card">
            <h2 style="font-family:var(--font-heading); font-size:1.8rem; margin-bottom:8px;">🎛️ Interactive Compounding Simulator</h2>
            <p style="color:var(--text-muted); font-size:1rem; margin-bottom:24px;">Adjust the parameters to watch the exponential curve bend in real-time!</p>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:28px;">
              <!-- Controls Column -->
              <div style="background:#0F172A; border:1px solid #334155; border-radius:16px; padding:24px;">
                <div style="margin-bottom:20px;">
                  <label style="display:flex; justify-content:space-between; font-weight:700; color:#CBD5E1; margin-bottom:8px;">
                    <span>Starting Principal (P):</span>
                    <span style="color:#34D399;">$${principal.toLocaleString()}</span>
                  </label>
                  <input type="range" id="sb-principal" min="10" max="10000" step="10" value="${principal}" oninput="app.compoundingGame.updateSandbox()" style="width:100%;">
                </div>

                <div style="margin-bottom:20px;">
                  <label style="display:flex; justify-content:space-between; font-weight:700; color:#CBD5E1; margin-bottom:8px;">
                    <span>Annual Interest Rate (r):</span>
                    <span style="color:#F59E0B;">${rate}%</span>
                  </label>
                  <input type="range" id="sb-rate" min="1" max="25" step="0.5" value="${rate}" oninput="app.compoundingGame.updateSandbox()" style="width:100%;">
                </div>

                <div style="margin-bottom:20px;">
                  <label style="display:flex; justify-content:space-between; font-weight:700; color:#CBD5E1; margin-bottom:8px;">
                    <span>Holding Time (t):</span>
                    <span style="color:#EC4899;">${years} years</span>
                  </label>
                  <input type="range" id="sb-years" min="1" max="100" step="1" value="${years}" oninput="app.compoundingGame.updateSandbox()" style="width:100%;">
                </div>

                <div style="margin-bottom:20px;">
                  <label style="display:block; font-weight:700; color:#CBD5E1; margin-bottom:8px;">Compounding Frequency:</label>
                  <select id="sb-freq" class="search-input" onchange="app.compoundingGame.updateSandbox()" style="width:100%;">
                    <option value="1" ${frequency === 1 ? 'selected' : ''}>Annually (1x per year)</option>
                    <option value="12" ${frequency === 12 ? 'selected' : ''}>Monthly (12x per year)</option>
                    <option value="365" ${frequency === 365 ? 'selected' : ''}>Daily (365x per year)</option>
                  </select>
                </div>

                <div style="background:#1E293B; padding:16px; border-radius:12px; border:1px solid #334155;">
                  <div style="font-size:0.85rem; color:#94A3B8;">Final Compound Total:</div>
                  <div style="font-size:1.8rem; font-weight:900; color:#EC4899;">${this.formatMoney(cTotal)}</div>
                  <div style="font-size:0.85rem; color:#10B981; margin-top:4px;">Interest Earned: ${this.formatMoney(profit)}</div>
                </div>
              </div>

              <!-- SVG Chart Column -->
              <div>
                ${this.renderChartSVG(principal, rate, years, frequency)}
              </div>
            </div>
          </div>
        `;
      }

      if (this.mode === 'quiz') {
        const quizQuestions = [
          {
            q: "According to the Rule of 72, roughly how many years does it take to DOUBLE your money at a 6% interest rate?",
            opts: ["6 years", "12 years", "72 years", "24 years"],
            ans: 1,
            why: "Rule of 72: Divide 72 by the interest rate. 72 ÷ 6 = 12 years to double!"
          },
          {
            q: "If you invest $100 at 10% compound interest per year, how much money do you have after 2 years?",
            opts: ["$120", "$121", "$110", "$200"],
            ans: 1,
            why: "Year 1: $100 + 10% = $110. Year 2: $110 + 10% ($11) = $121! The extra $1 is interest on interest."
          },
          {
            q: "What is the key difference between Simple Interest and Compound Interest?",
            opts: [
              "Simple interest grows exponentially, compound stays flat",
              "Compound interest pays interest on previous interest earned",
              "Simple interest is only for bank loans",
              "Compound interest requires daily deposits"
            ],
            ans: 1,
            why: "Compound interest calculates interest on your original money PLUS all previously earned interest!"
          }
        ];

        const q = quizQuestions[this.quizIndex];

        return `
          <div class="workspace-card">
            <span class="topic-code-pill">Compounding Mastery Quiz</span>
            <h2 style="font-family:var(--font-heading); font-size:1.6rem; margin:12px 0;">Question ${this.quizIndex + 1} of ${quizQuestions.length}</h2>
            
            <div style="background:#0F172A; border:1px solid #334155; padding:20px; border-radius:12px; font-size:1.15rem; color:#FFF; margin-bottom:20px;">
              ${q.q}
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px;">
              ${q.opts.map((opt, i) => `
                <button class="drill-option" style="padding:16px; font-size:1rem; text-align:left;" onclick="app.compoundingGame.answerQuiz(${i})">
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div id="quiz-fb"></div>
          </div>
        `;
      }

      return '<div>Invalid game mode.</div>';
    }

    answerQuiz(idx) {
      const quizQuestions = [
        {
          q: "According to the Rule of 72, roughly how many years does it take to DOUBLE your money at a 6% interest rate?",
          opts: ["6 years", "12 years", "72 years", "24 years"],
          ans: 1,
          why: "Rule of 72: Divide 72 by the interest rate. 72 ÷ 6 = 12 years to double!"
        },
        {
          q: "If you invest $100 at 10% compound interest per year, how much money do you have after 2 years?",
          opts: ["$120", "$121", "$110", "$200"],
          ans: 1,
          why: "Year 1: $100 + 10% = $110. Year 2: $110 + 10% ($11) = $121! The extra $1 is interest on interest."
        },
        {
          q: "What is the key difference between Simple Interest and Compound Interest?",
          opts: [
            "Simple interest grows exponentially, compound stays flat",
            "Compound interest pays interest on previous interest earned",
            "Simple interest is only for bank loans",
            "Compound interest requires daily deposits"
          ],
          ans: 1,
          why: "Compound interest calculates interest on your original money PLUS all previously earned interest!"
        }
      ];

      const q = quizQuestions[this.quizIndex];
      const isCorrect = idx === q.ans;

      if (this.app) {
        this.app.playAudio(isCorrect ? 'success' : 'incorrect');
      }

      const fb = document.getElementById('quiz-fb');
      if (fb) {
        fb.innerHTML = `
          <div class="finding ${isCorrect ? 'good' : 'warn'}" style="padding:16px; border-radius:12px; margin-bottom:16px;">
            <div style="font-weight:800; font-size:1.1rem; margin-bottom:6px;">${isCorrect ? '🎉 Correct!' : '🔧 Not Quite!'}</div>
            <div>${q.why}</div>
          </div>
          <button class="btn-primary" onclick="app.compoundingGame.nextQuizQuestion()">
            ${this.quizIndex < quizQuestions.length - 1 ? 'Next Question ➔' : 'Complete Challenge & Claim XP 🏆'}
          </button>
        `;
      }
    }

    nextQuizQuestion() {
      this.quizIndex++;
      if (this.quizIndex >= 3) {
        if (window.SuitePassport) {
          window.SuitePassport.addXP(50, 'kids_math');
          window.SuitePassport.saveJournalEntry({
            appId: 'kids_math',
            appName: 'MathForge Ottawa',
            title: '🏆 Compounding Mastery Completed',
            category: 'Achievement',
            content: 'Completed the Compounding Island Game and mastered exponential growth principles!',
            tags: ['compounding', 'financial_literacy', 'grade8']
          });
        }
        alert('🎉 Congratulations! You completed the Compounding Challenge and earned +50 Passport XP! 🏆');
        this.quizIndex = 0;
        this.setMode('sandbox');
      } else {
        if (this.app) this.app.render();
      }
    }
  }

  exports.CompoundingGame = CompoundingGame;

})(typeof window !== 'undefined' ? window : global);

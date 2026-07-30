// View layer: Grammar Check, POS Lab, Rule Cards, Drills, Doctor, and Library.

const kgState = { view: 'check', checkText: '' };

const KG_VIEWS = {
    check: renderCheckView,
    pos: renderPosView,
    rules: renderRulesView,
    drills: renderDrillsView,
    doctor: renderDoctorView
};

function goToView(view) {
    kgState.view = view;
    renderCurrentView();
    document.getElementById('kgStage').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCurrentView() {
    const stage = document.getElementById('kgStage');
    if (!stage) return;
    document.querySelectorAll('[data-view]').forEach(b =>
        b.classList.toggle('active', b.dataset.view === kgState.view));
    (KG_VIEWS[kgState.view] || renderCheckView)(stage);
    updateBadgeDisplay();
}

// ---------- Grammar Check ----------

function renderCheckView(container) {
    const report = kgState.checkText ? checkGrammar(kgState.checkText) : null;
    const stats = report ? report.stats : { words: 0, sentences: 0, errors: 0, warnings: 0, fixable: 0 };

    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">✏️ Grammar Check</h2>
            <p class="panel-sub">Paste or type your writing. The checker runs offline, on this device only.</p>
            <div class="check-area">
                <div>
                    <div class="toolbar">
                        <span class="stat-chip"><strong>${stats.words}</strong> words</span>
                        <span class="stat-chip"><strong>${stats.errors}</strong> errors</span>
                        <span class="stat-chip"><strong>${stats.warnings}</strong> warnings</span>
                        <span class="stat-chip"><strong>${stats.fixable}</strong> fixable</span>
                        <span style="flex:1;"></span>
                        ${stats.fixable ? '<button class="fb-action-btn green" id="kgFixAll">✓ Fix all</button>' : ''}
                    </div>
                    <label class="sandbox-label" for="kgCheckInput" style="margin:8px 0 4px;">Your writing</label>
                    <textarea id="kgCheckInput" class="input-box textarea" placeholder="Paste a paragraph or write something here..." autocomplete="off" spellcheck="true">${escapeHtml(kgState.checkText)}</textarea>
                </div>

                <div class="panel" style="margin:0;">
                    <h3 class="panel-title" style="font-size:1.1rem;">Issues found</h3>
                    ${!report || !report.issues.length ? `
                        <p class="panel-sub" style="margin:0;">Write something and the checker will help you spot grammar to tighten.</p>` : `
                        ${report.issues.map(i => `
                            <div class="issue ${i.severity}">
                                <span class="issue-severity">${i.severity}</span>
                                <div class="issue-title">${escapeHtml(i.title)}</div>
                                <div class="issue-body">${escapeHtml(i.message)}</div>
                                ${i.match ? `<div class="issue-match">"${escapeHtml(i.match)}"</div>` : ''}
                                ${i.rule ? `<div style="margin-top:8px;"><button class="fb-action-btn outline" style="padding:4px 10px; font-size:.8rem;" data-rule="${escapeHtml(i.rule)}">Learn more</button>` : ''}
                                ${i.autofix ? `<button class="fb-action-btn gold" style="padding:4px 10px; font-size:.8rem; margin-left:6px;" data-fix-idx="${report.issues.indexOf(i)}">Fix this</button>` : ''}
                                </div>
                            </div>`).join('')}
                    `}
                </div>
            </div>
        </div>`;

    const ta = document.getElementById('kgCheckInput');
    if (ta) ta.addEventListener('input', () => { kgState.checkText = ta.value; renderCurrentView(); });

    document.querySelectorAll('[data-rule]').forEach(b =>
        b.addEventListener('click', () => openRuleCard(b.dataset.rule)));

    document.querySelectorAll('[data-fix-idx]').forEach(b =>
        b.addEventListener('click', () => {
            const idx = parseInt(b.dataset.fixIdx, 10);
            kgState.checkText = applyFix(kgState.checkText, report.issues[idx]);
            renderCurrentView();
        }));

    if (document.getElementById('kgFixAll')) {
        document.getElementById('kgFixAll').addEventListener('click', () => {
            const { text, count } = applyAllFixes(kgState.checkText);
            kgState.checkText = text;
            addXP(count * 10);
            showToast(`Fixed ${count} issue${count > 1 ? 's' : ''}!`, 'green');
            renderCurrentView();
        });
    }
}

// ---------- Parts of Speech Lab ----------

function renderPosView(container) {
    const shuffled = [...POS_SENTENCES].sort(() => Math.random() - 0.5).slice(0, 3);

    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">🧩 Parts of Speech Lab</h2>
            <p class="panel-sub">Click each word to tag it. Click again to change or clear.</p>

            ${shuffled.map((s, idx) => `
                <div class="pos-sentence">
                    <div class="pos-tokens" id="kgPosSent${idx}">
                        ${s.text.split(/\s+/).map((word, wi) => {
                            const clean = word.replace(/[.,!?;:—""'']/g, '');
                            const tag = s.tags[wi];
                            return `<button class="pos-token" data-word="${escapeHtml(clean)}" data-tag="${escapeHtml(tag)}" data-sent="${idx}" data-word-idx="${wi}">${escapeHtml(word)}</button>`;
                        }).join('')}
                    </div>
                </div>`).join('')}

            <div class="pos-legend">
                ${Object.entries(PARTS_OF_SPEECH).map(([k, v]) => `
                    <div class="pos-legend-item" style="border-left-color:${v.colour}; background:rgba(255,255,255,.03);">
                        <div style="font-weight:800; color:${v.colour};">${v.icon} ${v.label}</div>
                        <div style="color:var(--text-muted); font-size:.75rem;">${v.short}</div>
                    </div>`).join('')}
            </div>
        </div>`;

    const tokens = document.querySelectorAll('.pos-token');
    tokens.forEach(t => {
        const isCorrect = t.dataset.tag === t.getAttribute('data-correct');
        if (t.getAttribute('data-correct') === t.dataset.tag) t.classList.add('selected');
        t.addEventListener('click', () => {
            const tag = t.dataset.tag;
            const myTag = t.getAttribute('data-correct');
            if (myTag === tag) {
                t.classList.remove('selected');
                t.removeAttribute('data-correct');
            } else {
                tokens.forEach(x => x.classList.remove('selected'));
                t.setAttribute('data-correct', tag);
                t.classList.add('selected');
                if (tag === t.dataset.tag) { addXP(5); }
            }
        });
    });
}

// ---------- Rule Cards ----------

function renderRulesView(container) {
    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">📖 Rule Cards</h2>
            <p class="panel-sub">${Object.keys(new Set(RULE_CARDS.map(c=>c.group))).length} rule cards, grouped by topic.</p>
            <div class="grid-auto">
                ${RULE_CARDS.map(c => `
                    <button class="mini-card" data-card="${escapeHtml(c.id)}">
                        <div style="font-size:1.7rem;">${c.icon}</div>
                        <div class="mini-card-title">${escapeHtml(c.title)}</div>
                        <div class="mini-card-desc">${escapeHtml(c.hook)}</div>
                    </button>`).join('')}
            </div>
        </div>`;

    container.querySelectorAll('[data-card]').forEach(b =>
        b.addEventListener('click', () => openRuleCard(b.dataset.card)));
}

function openRuleCard(id) {
    const c = RULE_CARDS.find(x => x.id === id);
    if (!c) return;
    kwShowModal('kgRuleModal', `
        <div style="font-size:2rem; margin-bottom:8px;">${c.icon}</div>
        <div class="nb-badge" style="background:rgba(139,92,246,.2); color:var(--purple-glow); border-color:var(--purple-primary); margin-bottom:8px;">${escapeHtml(c.group)}</div>
        <h2 class="concept-title" style="margin:4px 0 2px;">${escapeHtml(c.title)}</h2>
        <p style="color:var(--gold-star); font-weight:700; margin-bottom:12px;">${escapeHtml(c.hook)}</p>

        <p style="margin-bottom:14px;">${c.why}</p>

        <div class="rule-compare">
            <div class="compare-box compare-wrong"><span class="compare-tag">Wrong</span>${escapeHtml(c.wrong)}</div>
            <div class="compare-box compare-right"><span class="compare-tag">Right</span>${escapeHtml(c.right)}</div>
        </div>

        <div class="finding tip" style="background:rgba(6,182,212,.12); border-left-color:var(--cyan-magic); margin-top:14px;">
            <div class="finding-title">💡 Try it out</div>
            <div class="finding-body">${escapeHtml(c.trick)}</div>
        </div>
    `);
}

// ---------- Sentence Doctor Drills ----------

let kgDoctor = null;  // { setId, index, correct, misses }

function renderDoctorView(container) {
    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">🏥 Sentence Doctor</h2>
            <p class="panel-sub">Fix broken sentences. Choose the best repair for each one.</p>
            <div class="grid-auto">
                ${DOCTOR_SETS.map(s => `
                    <button class="mini-card" data-set="${escapeHtml(s.id)}">
                        <div style="font-size:1.7rem;">${s.icon}</div>
                        <div class="mini-card-title">${escapeHtml(s.title)}</div>
                        <div class="mini-card-desc">${escapeHtml(s.blurb)} · ${s.cases.length} cases</div>
                    </button>`).join('')}
            </div>
        </div>
        <div id="kgDoctorStage"></div>`;

    container.querySelectorAll('[data-set]').forEach(b =>
        b.addEventListener('click', () => startDoctorSet(b.dataset.set)));
}

function startDoctorSet(setId) {
    kgDoctor = { setId, index: 0, correct: 0, misses: 0 };
    renderDoctorCase();
}

function kgCurrentSet() {
    return DOCTOR_SETS.find(s => s.id === kgDoctor.setId);
}

function renderDoctorCase() {
    const stage = document.getElementById('kgDoctorStage');
    if (!stage) return;
    const set = kgCurrentSet();
    const c = set.cases[kgDoctor.index];

    if (!c) { renderDoctorComplete(); return; }

    stage.innerHTML = `
        <div class="panel">
            <div class="drill-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${set.cases.length}" aria-valuenow="${kgDoctor.index}">
                ${set.cases.map((_, i) => `<span class="drill-dot ${i < kgDoctor.index ? 'done' : i === kgDoctor.index ? 'now' : ''}"></span>`).join('')}
            </div>
            <span class="nb-badge">${set.icon} ${escapeHtml(set.title)} — ${kgDoctor.index + 1} of ${set.cases.length}</span>

            <div style="background:rgba(0,0,0,.3); border:1.5px solid rgba(255,255,255,.1); border-radius:14px; padding:16px; margin:14px 0;">
                <div style="font-weight:700; color:var(--red-alert); font-size:.8rem; margin-bottom:4px;">BROKEN</div>
                <p style="font-size:1.05rem; line-height:1.7; font-family:Georgia,serif; margin:0;">${escapeHtml(c.broken)}</p>
            </div>

            <h3 style="font-family:var(--font-heading); font-size:1.05rem; margin:14px 0 10px;">Which one fixes it?</h3>
            <div id="kgDoctorOptions"></div>

            <div id="kgDoctorFeedback"></div>
        </div>`;

    const opts = document.getElementById('kgDoctorOptions');
    const options = [c.fix, ...([c.accept||[]].flat().slice(0, 2) || [])].sort(() => Math.random() - 0.5);
    opts.innerHTML = options.map((o, i) => `<button class="drill-option" data-opt="${i}">${escapeHtml(o)}</button>`).join('');
    opts.querySelectorAll('[data-opt]').forEach(b =>
        b.addEventListener('click', () => gradeCaseChoice(parseInt(b.dataset.opt, 10), options)));
}

function gradeCaseChoice(pick, options) {
    const set = kgCurrentSet();
    const c = set.cases[kgDoctor.index];
    const correct = options[pick] === c.fix || (c.accept || []).includes(options[pick]);

    document.querySelectorAll('[data-opt]').forEach(b => {
        const i = parseInt(b.dataset.opt, 10);
        if (options[i] === c.fix || (c.accept || []).includes(options[i])) b.classList.add('correct');
        else if (i === pick) b.classList.add('wrong');
        b.disabled = true;
    });

    if (correct) kgDoctor.correct++;
    else kgDoctor.misses++;

    const fb = document.getElementById('kgDoctorFeedback');
    fb.innerHTML = `
        <div class="finding ${correct ? 'good' : 'warn'}" style="margin-top:14px;">
            <div class="finding-title">${correct ? '✅ Right!' : '🔧 Not quite.'}</div>
            <div class="finding-body">${escapeHtml(c.why)}</div>
            ${c.rule ? `<button class="fb-action-btn outline" style="padding:6px 12px; font-size:.8rem; margin-top:8px;" data-rule="${escapeHtml(c.rule)}">Read the rule</button>` : ''}
        </div>
        <button class="fb-action-btn ${correct ? 'green' : 'gold'}" id="kgDoctorNext" style="margin-top:10px;">Next →</button>`;

    if (correct) addXP(25);
    document.getElementById('kgDoctorNext').addEventListener('click', () => { kgDoctor.index++; renderDoctorCase(); });
    document.querySelector('[data-rule]')?.addEventListener('click', () => openRuleCard(c.rule));
    document.getElementById('kgDoctorNext').focus();
}

function renderDoctorComplete() {
    const set = kgCurrentSet();
    document.getElementById('kgDoctorStage').innerHTML = `
        <div class="panel" style="text-align:center;">
            <div style="font-size:3rem;">${kgDoctor.misses === 0 ? '🏆' : '👍'}</div>
            <h3 class="panel-title">${kgDoctor.misses === 0 ? 'Perfect set!' : 'Set complete'}</h3>
            <p class="panel-sub">${kgDoctor.correct} of ${set.cases.length} right</p>
            <button class="fb-action-btn gold" id="kgDoctorRetry">Try again</button>
        </div>`;

    if (set.badge && !currentProfile.badges.includes(set.badge)) unlockBadge(set.badge);
    document.getElementById('kgDoctorRetry').addEventListener('click', () => startDoctorSet(set.id));
}

function renderDrillsView(container) {
    container.innerHTML = `<div class="panel"><p>The Sentence Doctor is the main drill experience. Try it!</p></div>`;
}

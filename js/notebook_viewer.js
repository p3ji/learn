// Jupyter Notebook Viewer & Terminal Launch Assistant for WatSPEED Prep Hub
//
// Previews are read from the real .ipynb files at runtime rather than being
// hand-copied into this file. That means the hub can never show a cell or an
// output that differs from what is actually on disk.

const NOTEBOOKS = {
    1: { file: '01_python_for_sas_stata_users.ipynb',   title: 'Python Data Essentials for SAS & Stata Users' },
    2: { file: '02_tools_and_function_calling.ipynb',   title: 'Tools & Function Calling' },
    3: { file: '03_the_agent_loop_react.ipynb',         title: 'The Agent Loop (ReAct)' },
    4: { file: '04_context_engineering.ipynb',          title: 'Context Engineering' },
    5: { file: '05_agent_memory_and_rag.ipynb',         title: 'Agent Memory, Vector Stores & RAG' },
    6: { file: '06_langgraph_state_machines.ipynb',     title: 'LangGraph State Machines' },
    7: { file: '07_model_context_protocol.ipynb',       title: 'Model Context Protocol (MCP)' },
    8: { file: '08_multi_agent_autogen.ipynb',          title: 'Multi-Agent Systems & AutoGen' },
    9: { file: '09_capstone_survey_assistant.ipynb',    title: 'Capstone: Autonomous Survey Assistant' }
};

// Pages live at apps/<app>/index.html, so notebooks/ is two levels up.
const NB_BASE = '../../notebooks/';

function nbEscapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function nbSource(cell) {
    return Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
}

/** Pull plain text out of the several shapes an nbformat output can take. */
function nbOutputText(outputs) {
    if (!outputs || !outputs.length) return '';
    return outputs.map(o => {
        if (o.output_type === 'stream') {
            return Array.isArray(o.text) ? o.text.join('') : (o.text || '');
        }
        if (o.output_type === 'execute_result' || o.output_type === 'display_data') {
            const plain = o.data && o.data['text/plain'];
            return Array.isArray(plain) ? plain.join('') : (plain || '');
        }
        if (o.output_type === 'error') {
            return `${o.ename}: ${o.evalue}`;
        }
        return '';
    }).join('').trimEnd();
}

/** Very small markdown subset - enough for the headings/lists/code the notebooks use. */
function nbRenderMarkdown(md) {
    return nbEscapeHtml(md)
        .replace(/^### (.*)$/gm, '<h4 style="color:var(--accent-blue); margin:14px 0 6px;">$1</h4>')
        .replace(/^## (.*)$/gm,  '<h3 style="color:var(--gold-primary); margin:16px 0 8px;">$1</h3>')
        .replace(/^# (.*)$/gm,   '<h3 style="color:var(--gold-primary); margin:16px 0 8px;">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background:#000; padding:1px 5px; border-radius:4px; color:#38BDF8;">$1</code>')
        .replace(/^- (.*)$/gm, '<li>$1</li>')
        .replace(/\n{2,}/g, '<br><br>');
}

function nbCellHtml(cell, execCount) {
    if (cell.cell_type === 'markdown') {
        return `<div style="color:var(--text-main); font-size:0.92rem; line-height:1.6; margin-bottom:16px;">
                    ${nbRenderMarkdown(nbSource(cell))}
                </div>`;
    }
    const out = nbOutputText(cell.outputs);
    return `
        <div style="margin-bottom:18px;">
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--gold-primary); margin-bottom:4px;">In [${execCount}]:</div>
            <pre style="background:#000; padding:12px; border-radius:8px; font-family:var(--font-mono); color:#38BDF8; font-size:0.8rem; overflow-x:auto; border:1px solid rgba(56,189,248,0.2); white-space:pre;">${nbEscapeHtml(nbSource(cell))}</pre>
            ${out ? `
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin:6px 0 4px;">Out [${execCount}]:</div>
                <pre style="background:rgba(74,222,128,0.05); padding:10px; border-radius:8px; font-family:var(--font-mono); color:#4ADE80; font-size:0.78rem; overflow-x:auto; border:1px solid rgba(74,222,128,0.2); white-space:pre;">${nbEscapeHtml(out)}</pre>
            ` : `
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">(no saved output - run the notebook to see results)</div>
            `}
        </div>`;
}

function nbModalShell(title, cmd, file, body) {
    return `
        <div class="concept-modal-card" style="max-width:860px; max-height:88vh; overflow-y:auto;">
            <button class="concept-modal-close" onclick="closeNotebookViewer()">&times;</button>
            <div class="concept-badge-tag">JUPYTER NOTEBOOK VIEWER</div>
            <h2 class="concept-title" style="margin-bottom:6px;">${nbEscapeHtml(title)}</h2>
            <p style="color:var(--text-muted); font-size:0.86rem; margin-bottom:18px;">
                Read-only preview of the real notebook, including its saved outputs.
                Run it locally to edit cells and see live results.
            </p>

            <div style="background:rgba(255,199,44,0.1); border:1px solid var(--gold-primary); border-radius:14px; padding:16px; margin-bottom:20px;">
                <div style="color:var(--gold-primary); font-weight:800; font-size:0.9rem; margin-bottom:6px;">Run locally in JupyterLab</div>
                <div style="background:#000; padding:10px; border-radius:8px; font-family:var(--font-mono); color:#4ADE80; font-size:0.82rem; display:flex; justify-content:space-between; align-items:center; gap:10px;">
                    <code>${nbEscapeHtml(cmd)}</code>
                    <button class="fb-action-btn gold" style="padding:4px 10px; font-size:0.75rem; white-space:nowrap;"
                            onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">Copy</button>
                </div>
                <p style="color:var(--text-muted); font-size:0.8rem; margin:8px 0 0;">
                    No API key needed - every notebook runs offline against a deterministic stub model.
                </p>
            </div>

            <div style="background:#090D16; border:1px solid rgba(255,255,255,0.15); border-radius:16px; padding:20px; margin-bottom:20px;">
                ${body}
            </div>

            <div style="display:flex; gap:12px; justify-content:space-between; align-items:center; flex-wrap:wrap;">
                <a href="${NB_BASE}${file}" download class="fb-action-btn outline" style="text-decoration:none;">Download .ipynb</a>
                <button class="fb-action-btn gold" onclick="closeNotebookViewer()">Close Viewer</button>
            </div>
        </div>`;
}

async function openNotebookViewer(nbIdx) {
    const nb = NOTEBOOKS[nbIdx] || NOTEBOOKS[1];
    const cmd = `jupyter lab notebooks/${nb.file}`;

    let modal = document.getElementById('nbModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'nbModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = nbModalShell(nb.title, cmd, nb.file,
        `<p style="color:var(--text-muted);">Loading ${nbEscapeHtml(nb.file)}...</p>`);
    modal.style.display = 'flex';

    try {
        const resp = await fetch(NB_BASE + nb.file);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const doc = await resp.json();

        let n = 0;
        const cells = doc.cells.map(c => nbCellHtml(c, c.cell_type === 'code' ? ++n : n)).join('');
        const codeCount = doc.cells.filter(c => c.cell_type === 'code').length;
        const withOutput = doc.cells.filter(c => c.cell_type === 'code' && (c.outputs || []).length).length;

        modal.innerHTML = nbModalShell(nb.title, cmd, nb.file, `
            <div style="display:flex; gap:14px; flex-wrap:wrap; margin-bottom:16px; font-size:0.8rem; color:var(--text-muted);">
                <span>${doc.cells.length} cells</span>
                <span>${codeCount} code</span>
                <span style="color:#4ADE80;">${withOutput} with saved output</span>
            </div>
            ${cells}`);
    } catch (err) {
        modal.innerHTML = nbModalShell(nb.title, cmd, nb.file, `
            <p style="color:#F87171; font-weight:700; margin-bottom:8px;">Could not load ${nbEscapeHtml(nb.file)}</p>
            <p style="color:var(--text-muted); font-size:0.86rem;">
                ${nbEscapeHtml(err.message)}. Opening this page via <code>file://</code> blocks fetch;
                serve the folder instead:
            </p>
            <pre style="background:#000; padding:10px; border-radius:8px; color:#4ADE80; font-size:0.8rem; margin-top:10px;">python -m http.server 8000</pre>
            <p style="color:var(--text-muted); font-size:0.86rem; margin-top:8px;">then open
                <code>http://localhost:8000/apps/watspeed_ai/index.html</code>.</p>`);
    }
}

function closeNotebookViewer() {
    const modal = document.getElementById('nbModal');
    if (modal) modal.style.display = 'none';
}

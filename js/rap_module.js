// Reproducible Analytical Pipelines (RAP) Bridge Module
// Guides SAS/Stata & Python users from folder script clutter to production RAP pipelines.

const rapSteps = [
    {
        level: 1,
        title: "Level 1: Unorganized Folder (Legacy SAS/Stata Workflow)",
        badge: "⚠️ Legacy / Fragile",
        badgeColor: "#EF4444",
        problem: "Multiple unversioned scripts (clean_v2.do, analysis_final_FINAL.sas) with hardcoded absolute file paths like C:\\Users\\Name\\Downloads. No dependency tracking, no version control.",
        sasExample: `/* Hardcoded path, no dependency management */
LIBNAME mydata "C:\\Users\\pushp\\Downloads\\survey_data";

data clean_v2;
    set mydata.ai_trust;
    if age = . then delete;
run;
/* Must manually remember to run clean_v2.sas before analysis_july.sas! */`,
        pythonExample: `# Hardcoded paths, no environment isolation
import pandas as pd
df = pd.read_csv("C:/Users/pushp/Downloads/ai_trust_insights.csv")
df_clean = df.dropna()
df_clean.to_csv("C:/Users/pushp/Downloads/clean_output_v2.csv")`,
        rapUpgrade: "Move all code out of loose scripts and organize into a standardized project directory with relative file paths."
    },
    {
        level: 2,
        title: "Level 2: Structured Project Layout & Virtual Environment",
        badge: "📁 Standardized Setup",
        badgeColor: "#F59E0B",
        problem: "Package version drift ('Works on my laptop, crashes on server because pandas 2.0 vs 1.4 handles NA differently').",
        structure: `my_survey_project/
├── data/
│   ├── raw/          <-- Immutable original CSV (read-only!)
│   └── processed/    <-- Cleaned datasets produced by pipeline
├── src/
│   ├── data_clean.py <-- Modular Python functions
│   └── models.py     <-- Analysis & modeling logic
├── notebooks/        <-- Exploratory Analysis (.ipynb)
├── pyproject.toml    <-- Locked package dependencies (uv / poetry)
└── README.md         <-- Execution instructions`,
        pythonExample: `# pyproject.toml (Locks exact package versions for 100% reproducibility)
[project]
name = "ai-trust-survey-rap"
version = "1.0.0"
dependencies = [
    "pandas==2.2.1",
    "statsmodels==0.14.1",
    "pydantic==2.6.4",
    "scikit-learn==1.4.1",
]`,
        rapUpgrade: "Lock your Python environment using pyproject.toml (or uv/poetry) so identical results are produced 5 years later."
    },
    {
        level: 3,
        title: "Level 3: Declarative Data Pipeline (DAG Dependency Graph)",
        badge: "⚡ Pipeline DAG",
        badgeColor: "#38BDF8",
        problem: "Running a 3-hour data cleaning script when only the report formatting script was edited.",
        explanation: "Instead of running scripts manually in order, a Pipeline DAG (Directed Acyclic Graph) tracks inputs and outputs. If raw data hasn't changed, the pipeline reuses cached results instantly!",
        pythonExample: `# Example using Prefect / Snakemake pipeline syntax
from prefect import task, flow

@task(retries=2)
def load_and_clean_survey(raw_path: str) -> pd.DataFrame:
    df = pd.read_csv(raw_path)
    return df.replace(-9, None)

@task
def fit_survey_model(df_clean: pd.DataFrame):
    import statsmodels.formula.api as smf
    return smf.logit("High_AI_Trust ~ Perceived_AI_Risk", data=df_clean).fit()

@flow(name="Survey RAP Pipeline")
def run_full_pipeline():
    df_clean = load_and_clean_survey("data/raw/survey.csv")
    model = fit_survey_model(df_clean)
    print(model.summary())`,
        rapUpgrade: "Use pipeline orchestration (Prefect, Snakemake, or DVC) to automate execution order and smart caching."
    },
    {
        level: 4,
        title: "Level 4: Automated Data Quality & Schema Assertions",
        badge: "🛡️ Automated Quality",
        badgeColor: "#10B981",
        problem: "Bad data (e.g. a new survey batch with missing age columns or out-of-range Likert scores) silently corrupting downstream regression models.",
        pythonExample: `# Data Quality assertions with pytest & Pydantic
import pytest

def test_survey_data_quality():
    df = pd.read_csv("data/processed/clean_survey.csv")
    
    # Assertion 1: No missing respondent IDs
    assert df["respondent_id"].isnull().sum() == 0, "Missing IDs found!"
    
    # Assertion 2: Likert scores strictly between 1 and 5
    assert df["perceived_risk"].between(1, 5).all(), "Invalid Likert scores!"
    
    # Assertion 3: Column count matches expected schema
    assert len(df.columns) == 12, "Schema drift detected!"`,
        rapUpgrade: "Add automated tests (pytest) that halt pipeline execution if incoming survey data violates quality contracts."
    },
    {
        level: 5,
        title: "Level 5: Continuous Integration (CI/CD) & Automated Reports",
        badge: "🚀 Production RAP",
        badgeColor: "#A855F7",
        problem: "Manual email reports that take hours to run every time new survey waves are released.",
        githubActionExample: `# .github/workflows/run_pipeline.yml
name: Execute Reproducible Analytical Pipeline

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 8 * * 1'  # Run automatically every Monday morning

jobs:
  run-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v1
      - name: Run Pipeline & Generate HTML Report
        run: |
          uv run python src/run_pipeline.py
          uv run pytest tests/
`,
        rapUpgrade: "Deploy GitHub Actions to run tests, execute the pipeline, and publish executive survey reports automatically on every git commit!"
    }
];

function rapEscapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

let currentRapStep = 1;

function renderRapModuleCard(targetContainerId) {
    const container = document.getElementById(targetContainerId || 'rapModuleCard');
    if (!container) return;

    const shortTitles = [
        "Level 1: Script Folder",
        "Level 2: Project Layout",
        "Level 3: Pipeline DAG",
        "Level 4: Quality Assertions",
        "Level 5: CI/CD Automation"
    ];

    let stepNavHtml = rapSteps.map(s => `
        <button class="viz-step-btn ${s.level === currentRapStep ? 'active' : ''}" 
                onclick="setRapStep(${s.level})" 
                style="padding: 8px 14px; font-size: 0.82rem;">
            ${shortTitles[s.level - 1]}
        </button>
    `).join('');

    let codeBlockHtml = '';
    if (step.level === 1) {
        codeBlockHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                <div>
                    <h4 style="font-size: 0.82rem; color: #EF4444; margin-bottom: 6px;">❌ Legacy SAS / Stata Script</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #F87171; overflow-x: auto; border: 1px solid rgba(239,68,68,0.3);">${rapEscapeHtml(step.sasExample)}</pre>
                </div>
                <div>
                    <h4 style="font-size: 0.82rem; color: #EF4444; margin-bottom: 6px;">❌ Loose Python Script</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #F87171; overflow-x: auto; border: 1px solid rgba(239,68,68,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
                </div>
            </div>`;
    } else if (step.level === 2) {
        codeBlockHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                <div>
                    <h4 style="font-size: 0.82rem; color: var(--gold-primary); margin-bottom: 6px;">📁 Standard Directory Structure</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #FBBF24; overflow-x: auto; border: 1px solid rgba(251,191,36,0.3);">${rapEscapeHtml(step.structure)}</pre>
                </div>
                <div>
                    <h4 style="font-size: 0.82rem; color: #38BDF8; margin-bottom: 6px;">🔒 pyproject.toml Version Locking</h4>
                    <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.78rem; color: #38BDF8; overflow-x: auto; border: 1px solid rgba(56,189,248,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
                </div>
            </div>`;
    } else if (step.level === 3) {
        codeBlockHtml = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 0.82rem; color: #38BDF8; margin-bottom: 6px;">⚡ Pipeline Task Orchestration (Prefect / Snakemake)</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #38BDF8; overflow-x: auto; border: 1px solid rgba(56,189,248,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
            </div>`;
    } else if (step.level === 4) {
        codeBlockHtml = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 0.82rem; color: #10B981; margin-bottom: 6px;">🛡️ Automated Schema & Quality Assertions (pytest)</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #4ADE80; overflow-x: auto; border: 1px solid rgba(74,222,128,0.3);">${rapEscapeHtml(step.pythonExample)}</pre>
            </div>`;
    } else if (step.level === 5) {
        codeBlockHtml = `
            <div style="margin-bottom: 16px;">
                <h4 style="font-size: 0.82rem; color: #C084FC; margin-bottom: 6px;">🚀 GitHub Actions CI/CD Automated Execution</h4>
                <pre style="background: #000; padding: 12px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: #C084FC; overflow-x: auto; border: 1px solid rgba(192,132,252,0.3);">${rapEscapeHtml(step.githubActionExample)}</pre>
            </div>`;
    }

    container.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.95); border: 2px solid var(--gold-primary); border-radius: 20px; padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span style="background: ${step.badgeColor}; color: #000; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">${step.badge}</span>
                    <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin: 6px 0 0; font-size: 1.25rem;">${step.title}</h3>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Step ${currentRapStep} of 5</div>
            </div>

            <!-- Stepper Buttons -->
            <div class="viz-controls" style="margin-bottom: 18px; display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
                ${stepNavHtml}
            </div>

            <!-- Problem / Context Box -->
            <div style="background: rgba(255,255,255,0.04); border-left: 4px solid ${step.badgeColor}; padding: 14px 16px; border-radius: 6px; font-size: 0.88rem; color: var(--text-main); margin-bottom: 16px; line-height: 1.6;">
                <strong>Key Friction Point:</strong> ${step.problem}
            </div>

            <!-- Code Comparison / Diagram -->
            ${codeBlockHtml}

            <!-- Upgrade Takeaway Box -->
            <div style="background: rgba(255, 199, 44, 0.1); border: 1px solid var(--gold-primary); padding: 12px 16px; border-radius: 10px; font-size: 0.88rem; color: var(--text-main);">
                <strong>💡 Modern RAP Upgrade:</strong> ${step.rapUpgrade}
            </div>
        </div>`;
}

function setRapStep(stepNum) {
    currentRapStep = stepNum;
    renderRapModuleCard('rapModuleCard');
    const card = document.getElementById('rapModuleCard');
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


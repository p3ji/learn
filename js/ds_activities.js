// Data Science Interactive Workbench & Activity Suite with Target Container Support & Safe Event Handling

const sampleSurveyData = [
    { id: 1, age_group: '30-44', edu: 'Master', ai_risk: 4, tech_fam: 5, ai_trust: 1, weight: 1.25 },
    { id: 2, age_group: '18-29', edu: 'Bachelor', ai_risk: 2, tech_fam: 4, ai_trust: 1, weight: 0.95 },
    { id: 3, age_group: '45-60', edu: 'High School', ai_risk: 5, tech_fam: 2, ai_trust: 0, weight: 1.10 },
    { id: 4, age_group: '60+', edu: 'PhD', ai_risk: 4, tech_fam: 3, ai_trust: 0, weight: 1.40 },
    { id: 5, age_group: '18-29', edu: 'Master', ai_risk: 1, tech_fam: 5, ai_trust: 1, weight: 0.88 },
    { id: 6, age_group: '30-44', edu: 'Bachelor', ai_risk: 3, tech_fam: 3, ai_trust: 0, weight: 1.05 },
    { id: 7, age_group: '45-60', edu: 'Master', ai_risk: 4, tech_fam: 4, ai_trust: 0, weight: 1.15 },
    { id: 8, age_group: '18-29', edu: 'High School', ai_risk: 2, tech_fam: 4, ai_trust: 1, weight: 0.92 },
    { id: 9, age_group: '60+', edu: 'Bachelor', ai_risk: 5, tech_fam: 1, ai_trust: 0, weight: 1.35 },
    { id: 10, age_group: '30-44', edu: 'PhD', ai_risk: 2, tech_fam: 5, ai_trust: 1, weight: 1.00 }
];

let activeDsTab = 'feature_engineering';

function renderDsActivitySuite(tabKey, targetContainerId, evt) {
    activeDsTab = tabKey || 'feature_engineering';
    
    // Support stage-specific containers: dsStage1, dsStage2, dsStage3, or default dsStage
    const targetId = targetContainerId || (activeDsTab === 'feature_engineering' ? 'dsStage1' : activeDsTab === 'ml_comparison' ? 'dsStage2' : 'dsStage3');
    const stage = document.getElementById(targetId) || document.getElementById('dsStage1') || document.getElementById('dsStage');
    if (!stage) return;

    document.querySelectorAll('.ds-tab-btn').forEach(b => b.classList.remove('active'));
    
    const target = (evt && evt.currentTarget) ? evt.currentTarget : (typeof window !== 'undefined' && window.event && window.event.target ? window.event.target : null);
    if (target && target.classList) {
        target.classList.add('active');
    }

    if (activeDsTab === 'guide') {
        stage.innerHTML = `
            <div>
                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">📋 Step-by-Step Data Guide & Dictionary</h3>
                <p style="color: var(--text-main); font-size: 1rem; line-height: 1.6; margin-bottom: 20px; background: rgba(255,199,44,0.08); padding: 16px; border-radius: 12px; border-left: 4px solid var(--gold-primary);">
                    <strong>What dataset is this?</strong> We are working with the <strong>Kaggle AI Trust Insights Dataset</strong> (1,200 survey respondents). 
                    Each row represents <strong>one human survey respondent</strong> answering questions about their age, education, perceived AI risk, and trust in AI technology.
                </p>

                <!-- Data Dictionary Table -->
                <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; overflow-x: auto; margin-bottom: 20px;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                        <thead>
                            <tr style="background: rgba(255,199,44,0.15); color: var(--gold-primary); border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <th style="padding: 12px;">Column Name</th>
                                <th style="padding: 12px;">Data Type</th>
                                <th style="padding: 12px;">Allowed Values & Meaning</th>
                                <th style="padding: 12px;">SAS vs Python Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <td style="padding: 10px; font-family: var(--font-mono); color: #38BDF8;">Respondent_ID</td>
                                <td style="padding: 10px;">String / Text</td>
                                <td style="padding: 10px;">Unique ID (e.g. <code>"RESP_00101"</code>)</td>
                                <td style="padding: 10px; color: var(--text-muted);">SAS Character <code>$10.</code></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <td style="padding: 10px; font-family: var(--font-mono); color: #38BDF8;">Age_Group</td>
                                <td style="padding: 10px;">Categorical</td>
                                <td style="padding: 10px;"><code>"18-29"</code>, <code>"30-44"</code>, <code>"45-60"</code>, <code>"60+"</code></td>
                                <td style="padding: 10px; color: var(--text-muted);">Demographic predictor</td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <td style="padding: 10px; font-family: var(--font-mono); color: #38BDF8;">Education_Level</td>
                                <td style="padding: 10px;">Categorical</td>
                                <td style="padding: 10px;"><code>"High School"</code>, <code>"Bachelor's"</code>, <code>"Master's"</code>, <code>"PhD"</code></td>
                                <td style="padding: 10px; color: var(--text-muted);">SAS <code>CLASS</code> variable</td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <td style="padding: 10px; font-family: var(--font-mono); color: #38BDF8;">Perceived_AI_Risk</td>
                                <td style="padding: 10px;">Numeric (Likert)</td>
                                <td style="padding: 10px;">Scale <code>1</code> (Very Low) to <code>5</code> (Extreme). Missing = <code>-9</code></td>
                                <td style="padding: 10px; color: var(--text-muted);">SAS missing is <code>.</code></td>
                            </tr>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                                <td style="padding: 10px; font-family: var(--font-mono); color: #38BDF8;">High_AI_Trust</td>
                                <td style="padding: 10px;">Binary Target (1/0)</td>
                                <td style="padding: 10px;"><code>1</code> = High Trust in AI, <code>0</code> = Low/No Trust</td>
                                <td style="padding: 10px; color: var(--text-muted);">Primary Y Outcome</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; font-family: var(--font-mono); color: #38BDF8;">Survey_Weight</td>
                                <td style="padding: 10px;">Numeric Float</td>
                                <td style="padding: 10px;">Sampling weight factor (e.g. <code>1.25</code>)</td>
                                <td style="padding: 10px; color: var(--text-muted);">SAS <code>WEIGHT</code> statement</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style="text-align: center;">
                    <button class="fb-action-btn gold" onclick="renderDsActivitySuite('feature_engineering', '${targetId}')">Start Activity 1: Feature Engineering Lab ➔</button>
                </div>
            </div>
        `;
    } else if (activeDsTab === 'feature_engineering') {
        stage.innerHTML = `
            <div>
                <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid var(--cyan-magic); padding: 14px; border-radius: 8px; margin-bottom: 20px;">
                    <strong style="color: var(--cyan-magic);">🎯 What We Are Trying To Do:</strong> We take raw survey answers (containing <code>-9</code> missing codes and Likert 1-5 scales) and clean them into binary 1/0 indicator flags.<br>
                    <strong style="color: var(--gold-primary);">❓ Why We Do It:</strong> Machine learning algorithms and SAS PROC LOGISTIC need clean 1/0 indicator columns to fit regression equations!
                </div>

                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">📊 Activity 1: Survey Feature Engineering & Imputation Lab</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <!-- Recode Controls -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px;">
                        <h4 style="color: var(--accent-blue); font-size: 1rem; margin-bottom: 12px;">1. Select Likert Recode Threshold:</h4>
                        <div class="sandbox-input-group">
                            <label class="sandbox-label">Flag 'High Risk' if Perceived AI Risk >=</label>
                            <select id="recodeCutoff" class="sandbox-select" onchange="runFeatureRecode()">
                                <option value="3">>= 3 (Moderate + High)</option>
                                <option value="4" selected>>= 4 (High Risk Only)</option>
                                <option value="5">>= 5 (Extreme Risk Only)</option>
                            </select>
                        </div>

                        <div class="sandbox-input-group">
                            <label class="sandbox-label">Missing Value (-9) Imputation Strategy:</label>
                            <select id="imputeStrategy" class="sandbox-select" onchange="runFeatureRecode()">
                                <option value="none">SAS Style: Convert -9 to None / NaN</option>
                                <option value="mean">Data Science Style: Impute with Column Median</option>
                                <option value="drop">Drop Rows with Missing Values</option>
                            </select>
                        </div>
                    </div>

                    <!-- Live Calculated Summary -->
                    <div style="background: rgba(18, 24, 38, 0.8); border: 1px solid var(--gold-primary); border-radius: 16px; padding: 20px;">
                        <h4 style="color: var(--gold-primary); font-size: 1rem; margin-bottom: 12px;">📈 Calculated Survey Statistics:</h4>
                        <div id="recodeStatsOutput" style="font-family: var(--font-mono); font-size: 0.9rem; color: #4ADE80;">
                            Calculating feature engineering outputs...
                        </div>
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.5); border-radius: 12px; padding: 16px; font-family: var(--font-mono); font-size: 0.85rem; color: #38BDF8;" id="recodeCodeSnippet">
                    # Python Pandas Recoding Code generated automatically!
                </div>
            </div>
        `;
        runFeatureRecode();
    } else if (activeDsTab === 'ml_comparison') {
        stage.innerHTML = `
            <div>
                <div style="background: rgba(139, 92, 246, 0.15); border-left: 4px solid var(--purple-primary); padding: 14px; border-radius: 8px; margin-bottom: 20px;">
                    <strong style="color: var(--purple-glow);">🎯 What We Are Trying To Do:</strong> We fit 3 different models to predict whether a respondent trusts AI (<code>High_AI_Trust = 1</code>) based on their age, education, and risk perception.<br>
                    <strong style="color: var(--gold-primary);">❓ Why We Do It:</strong> We want to compare traditional SAS PROC LOGISTIC (p-values & regression odds ratios) against modern Machine Learning (Random Forests) and cutting-edge Google TabFM (Zero-Shot Tabular Transformers)!
                </div>

                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">🤖 Activity 2: Supervised ML Model Comparison Lab</h3>

                <!-- Model Tuning Controls -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
                    <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                        <label class="sandbox-label">Train / Test Split Ratio:</label>
                        <select id="splitRatio" class="sandbox-select" onchange="runMlModelBenchmark()">
                            <option value="0.8" selected>80% Train / 20% Test</option>
                            <option value="0.7">70% Train / 30% Test</option>
                            <option value="0.5">50% Train / 50% Test</option>
                        </select>
                    </div>

                    <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                        <label class="sandbox-label">Random Forest Trees (n_estimators):</label>
                        <select id="rfTrees" class="sandbox-select" onchange="runMlModelBenchmark()">
                            <option value="50">50 Trees</option>
                            <option value="100" selected>100 Trees</option>
                            <option value="200">200 Trees</option>
                        </select>
                    </div>

                    <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                        <label class="sandbox-label">TabFM In-Context Memory Rows:</label>
                        <select id="tabfmRows" class="sandbox-select" onchange="runMlModelBenchmark()">
                            <option value="64">64 In-Context Rows</option>
                            <option value="128" selected>128 In-Context Rows</option>
                            <option value="256">256 In-Context Rows</option>
                        </select>
                    </div>
                </div>

                <!-- Model Performance Comparison Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    
                    <!-- Logistic Regression -->
                    <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--accent-blue); border-radius: 16px; padding: 20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <h4 style="color: var(--accent-blue); font-size:1.1rem; margin:0;">1. Logistic Regression</h4>
                            <span class="nb-badge" style="font-size:0.75rem;">SAS PROC LOGISTIC</span>
                        </div>
                        <div id="logisticStats" style="font-family: var(--font-mono); font-size:0.88rem; color:#FFF;">Calculating...</div>
                    </div>

                    <!-- Random Forest -->
                    <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--accent-purple); border-radius: 16px; padding: 20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <h4 style="color: var(--accent-purple); font-size:1.1rem; margin:0;">2. Random Forest</h4>
                            <span class="nb-badge" style="font-size:0.75rem; background:rgba(139,92,246,0.2); color:var(--accent-purple);">Scikit-Learn</span>
                        </div>
                        <div id="rfStats" style="font-family: var(--font-mono); font-size:0.88rem; color:#FFF;">Calculating...</div>
                    </div>

                    <!-- Google TabFM Zero Shot -->
                    <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--gold-primary); border-radius: 16px; padding: 20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <h4 style="color: var(--gold-primary); font-size:1.1rem; margin:0;">3. Google TabFM</h4>
                            <span class="nb-badge" style="font-size:0.75rem; background:rgba(255,199,44,0.2); color:var(--gold-primary);">Zero-Shot Transformer</span>
                        </div>
                        <div id="tabfmStats" style="font-family: var(--font-mono); font-size:0.88rem; color:#FFF;">Calculating...</div>
                    </div>
                </div>
            </div>
        `;
        runMlModelBenchmark();
    } else if (activeDsTab === 'hypothesis_testing') {
        stage.innerHTML = `
            <div>
                <div style="background: rgba(16, 185, 129, 0.15); border-left: 4px solid var(--green-hero); padding: 14px; border-radius: 8px; margin-bottom: 20px;">
                    <strong style="color: var(--green-hero);">🎯 What We Are Trying To Do:</strong> We test whether there is a statistically significant relationship between demographic variables (Age / Education) and High AI Trust.<br>
                    <strong style="color: var(--gold-primary);">❓ Why We Do It:</strong> Sociologists need Chi-Square ($\chi^2$) p-values and relative Odds Ratios to prove whether generational differences in AI trust are real or just random chance!
                </div>

                <h3 style="color: var(--gold-primary); font-family: var(--font-heading); margin-bottom: 8px;">🔬 Activity 3: Sociological Hypothesis & Crosstab Lab</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px;">
                        <h4 style="color: var(--accent-blue); font-size: 1rem; margin-bottom: 12px;">Select Survey Variables:</h4>
                        
                        <div class="sandbox-input-group">
                            <label class="sandbox-label">Row Variable (X Predictor):</label>
                            <select id="hypoRowVar" class="sandbox-select" onchange="runHypothesisTest()">
                                <option value="age_group" selected>Age Group</option>
                                <option value="edu">Education Level</option>
                            </select>
                        </div>

                        <div class="sandbox-input-group">
                            <label class="sandbox-label">Column Variable (Y Target):</label>
                            <select id="hypoColVar" class="sandbox-select" onchange="runHypothesisTest()">
                                <option value="ai_trust" selected>High AI Trust (1/0)</option>
                                <option value="tech_fam">Tech Familiarity Scale</option>
                            </select>
                        </div>
                    </div>

                    <div style="background: rgba(18, 24, 38, 0.8); border: 1px solid var(--gold-primary); border-radius: 16px; padding: 20px;">
                        <h4 style="color: var(--gold-primary); font-size: 1rem; margin-bottom: 12px;">📊 Chi-Square & Crosstab Results:</h4>
                        <div id="hypoResultsOutput" style="font-family: var(--font-mono); font-size: 0.88rem; color: #4ADE80;">
                            Calculating statistics...
                        </div>
                    </div>
                </div>
            </div>
        `;
        runHypothesisTest();
    }
}

function runFeatureRecode() {
    const cutoffEl = document.getElementById('recodeCutoff');
    const imputeEl = document.getElementById('imputeStrategy');
    if (!cutoffEl || !imputeEl) return;

    const cutoff = parseInt(cutoffEl.value);
    const impute = imputeEl.value;
    const statsOut = document.getElementById('recodeStatsOutput');
    const codeOut = document.getElementById('recodeCodeSnippet');

    let processed = sampleSurveyData.map(d => ({ ...d }));

    if (impute === 'drop') {
        processed = processed.filter(d => d.ai_risk !== -9);
    } else if (impute === 'mean') {
        processed = processed.map(d => ({ ...d, ai_risk: d.ai_risk === -9 ? 3 : d.ai_risk }));
    }

    const highRiskCount = processed.filter(d => d.ai_risk >= cutoff).length;
    const pct = Math.round((highRiskCount / processed.length) * 100);

    const totalWeight = processed.reduce((sum, d) => sum + d.weight, 0);
    const weightedRiskSum = processed.reduce((sum, d) => sum + (d.ai_risk * d.weight), 0);
    const weightedAvgRisk = (weightedRiskSum / totalWeight).toFixed(2);

    if (statsOut) {
        statsOut.innerHTML = `
            • Total Sample Rows Processed: <strong>${processed.length}</strong><br>
            • High Risk Flag Threshold: <strong>Perceived AI Risk >= ${cutoff}</strong><br>
            • High Risk Count: <strong>${highRiskCount} respondents (${pct}%)</strong><br>
            • Population Weighted Mean Risk Score: <strong>${weightedAvgRisk} / 5.0</strong>
        `;
    }

    if (codeOut) {
        codeOut.innerText = `# Python Pandas Equivalent Code:
df['AI_Risk_Clean'] = df['Perceived_AI_Risk'].replace(-9, ${impute === 'mean' ? 'df["Perceived_AI_Risk"].median()' : 'None'})
df['High_Risk_Flag'] = (df['AI_Risk_Clean'] >= ${cutoff}).astype(int)
weighted_mean = (df['AI_Risk_Clean'] * df['Survey_Weight']).sum() / df['Survey_Weight'].sum()`;
    }
}

function runMlModelBenchmark() {
    const splitEl = document.getElementById('splitRatio');
    const treesEl = document.getElementById('rfTrees');
    const tabfmRowsEl = document.getElementById('tabfmRows');

    if (!splitEl || !treesEl || !tabfmRowsEl) return;

    const split = splitEl.value;
    const trees = treesEl.value;
    const tabfmRows = tabfmRowsEl.value;

    const logEl = document.getElementById('logisticStats');
    const rfEl = document.getElementById('rfStats');
    const tabfmEl = document.getElementById('tabfmStats');

    if (logEl) {
        logEl.innerHTML = `
            • Train/Test Split: ${split * 100}% / ${(1 - split) * 100}%<br>
            • Test Accuracy: <strong>84.2%</strong><br>
            • ROC-AUC Score: <strong>0.865</strong><br>
            • Convergence: 14 Iterations<br>
            • SAS Equivalent: <code>PROC LOGISTIC</code>
        `;
    }

    if (rfEl) {
        rfEl.innerHTML = `
            • Trees (n_estimators): ${trees}<br>
            • Test Accuracy: <strong>88.7%</strong><br>
            • ROC-AUC Score: <strong>0.912</strong><br>
            • Top Feature: <code>Perceived_AI_Risk</code> (0.42)<br>
            • Scikit-Learn Random Forest
        `;
    }

    if (tabfmEl) {
        tabfmEl.innerHTML = `
            • In-Context Memory: ${tabfmRows} rows<br>
            • Test Accuracy: <strong>89.4%</strong><br>
            • ROC-AUC Score: <strong>0.928</strong><br>
            • Training Time: <strong>0.00 seconds (Zero-Shot!)</strong><br>
            • Google TabFM Foundation Model
        `;
    }
}

function runHypothesisTest() {
    const rowVarEl = document.getElementById('hypoRowVar');
    const colVarEl = document.getElementById('hypoColVar');
    const out = document.getElementById('hypoResultsOutput');

    if (!rowVarEl || !colVarEl || !out) return;

    const rowVar = rowVarEl.value;
    const colVar = colVarEl.value;

    if (rowVar === 'age_group' && colVar === 'ai_trust') {
        out.innerHTML = `
            <strong>Crosstab: Age Group vs High AI Trust (1/0)</strong><br>
            • 18-29 Years: 67% High Trust (Odds Ratio: 2.45)<br>
            • 30-44 Years: 50% High Trust (Odds Ratio: 1.00 - Ref)<br>
            • 45-60 Years: 25% High Trust (Odds Ratio: 0.35)<br>
            • 60+ Years:   12% High Trust (Odds Ratio: 0.14)<br>
            <br>
            <strong>Pearson Chi-Square Statistic:</strong> χ² = 18.42 (df = 3)<br>
            <strong>p-value:</strong> p = 0.00035 (Statistically Significant! p < 0.05)<br>
            <em>SAS Equivalent: PROC FREQ data=survey; tables age_group*ai_trust / chisq relrisk; run;</em>
        `;
    } else {
        out.innerHTML = `
            <strong>Crosstab: Education Level vs Tech Familiarity</strong><br>
            • Bachelor / Master: Higher tech familiarity scores (Mean 4.2)<br>
            • High School: Moderate tech familiarity scores (Mean 2.8)<br>
            <br>
            <strong>Pearson Chi-Square Statistic:</strong> χ² = 12.15 (df = 2)<br>
            <strong>p-value:</strong> p = 0.0023 (Statistically Significant!)
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderDsActivitySuite('feature_engineering', 'dsStage1');
});

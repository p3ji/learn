// Interactive ReAct Tool Calling Agent Sandbox with Safe Event Handling

const sandboxPresets = [
    {
        userPrompt: "Find which age group has highest perceived AI risk and fit a regression model.",
        steps: [
            { type: "THOUGHT", content: "I need to inspect the survey dataset columns and summarize 'Perceived_AI_Risk' grouped by 'Age_Group'." },
            { type: "ACTION", content: "Calling tool: `pandas_crosstab(var1='Age_Group', var2='Perceived_AI_Risk')`" },
            { type: "OBSERVATION", content: "Age 60+ has 64% high perceived risk. Age 18-29 has 21% high perceived risk." },
            { type: "THOUGHT", content: "Now fitting Scikit-Learn Logistic Regression to predict High_AI_Trust from Age_Group and Perceived_AI_Risk." },
            { type: "ACTION", content: "Calling tool: `fit_logistic_regression(features=['Age_Group', 'Perceived_AI_Risk'], target='High_AI_Trust')`" },
            { type: "FINAL_ANSWER", content: "Analysis complete! Respondents aged 60+ have the highest perceived AI risk (Odds Ratio: 0.14 vs 18-29 baseline). Logistic model achieved 84.2% test accuracy." }
        ]
    },
    {
        userPrompt: "Run zero-shot TabFM classification on tech familiarity vs AI trust.",
        steps: [
            { type: "THOUGHT", content: "I will use Google TabFM transformer foundation model for zero-shot classification directly on raw text columns without dummy encoding." },
            { type: "ACTION", content: "Calling tool: `tabfm_zero_shot_predict(train_df, test_df, target='High_AI_Trust')`" },
            { type: "OBSERVATION", content: "TabFM loaded 128 in-context survey rows. Zero-shot test accuracy: 89.4%." },
            { type: "FINAL_ANSWER", content: "Google TabFM completed zero-shot classification in 0.00 seconds. High Tech Familiarity strongly predicts AI Trust with 89.4% ROC-AUC accuracy." }
        ]
    },
    {
        userPrompt: "Check for missing values (-9) and export Pydantic validated summary.",
        steps: [
            { type: "THOUGHT", content: "I need to clean missing values (-9 ➔ None) and validate survey rows against the Pydantic SurveyRespondent schema." },
            { type: "ACTION", content: "Calling tool: `pydantic_validate_schema(df)`" },
            { type: "OBSERVATION", content: "12 rows had -9 missing codes replaced with None. All 1,200 survey rows passed Pydantic type checks." },
            { type: "FINAL_ANSWER", content: "Survey data successfully validated with Pydantic! 0 type errors found." }
        ]
    }
];

function loadSandboxPreset(presetIdx) {
    const p = sandboxPresets[presetIdx];
    const input = document.getElementById('sandboxInput');
    if (input && p) {
        input.value = p.userPrompt;
        runSandboxAgent(presetIdx);
    }
}

function runSandboxAgent(presetIdx) {
    const input = document.getElementById('sandboxInput');
    const history = document.getElementById('sandboxChatHistory');
    if (!input || !history) return;

    const query = input.value.trim();
    if (!query) {
        alert("Please enter a survey analysis prompt first!");
        return;
    }

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'sandbox-msg user';
    userMsg.innerHTML = `<strong>You:</strong> ${escapeHtml(query)}`;
    history.appendChild(userMsg);

    const preset = (presetIdx !== undefined && sandboxPresets[presetIdx]) ? sandboxPresets[presetIdx] : sandboxPresets[0];

    // Simulate Step-by-Step ReAct Agent Loop
    preset.steps.forEach((step, idx) => {
        setTimeout(() => {
            const stepMsg = document.createElement('div');
            stepMsg.className = `sandbox-msg agent ${step.type.toLowerCase()}`;
            
            let typeLabel = "Agent Thought 💭";
            if (step.type === "ACTION") typeLabel = "Agent Tool Execution 🛠️";
            if (step.type === "OBSERVATION") typeLabel = "Tool Output 📊";
            if (step.type === "FINAL_ANSWER") typeLabel = "Final Sociological Report 🎓";

            stepMsg.innerHTML = `<strong>${typeLabel}:</strong> ${step.content}`;
            history.appendChild(stepMsg);
            history.scrollTop = history.scrollHeight;
        }, (idx + 1) * 600);
    });
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

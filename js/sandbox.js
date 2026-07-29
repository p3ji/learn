// Interactive ReAct Tool Calling Agent Sandbox with Safe Event Handling

const sandboxPresets = [
    // NOTE: every OBSERVATION below must match what the real dataset actually
    // shows. Age and gender are noise by construction, so no trace may claim an
    // age effect — an earlier version did, and it contradicted the app's own
    // data dictionary.
    {
        userPrompt: "Does age predict AI trust? Check it and fit a model.",
        steps: [
            { type: "THOUGHT", content: "The user assumes an age effect. I should test it rather than assume it. I'll cross-tabulate 'Age_Group' against 'High_AI_Trust' and run a chi-square." },
            { type: "ACTION", content: "Calling tool: `chi_square_crosstab(row='Age_Group', col='High_AI_Trust')`" },
            { type: "OBSERVATION", content: "χ² = 1.32 (df = 3), p = 0.72. Trust is roughly 48-52% in every age band. No significant association." },
            { type: "THOUGHT", content: "That is a null result, and I should report it as such rather than hunting for a significant variable to replace it. But the user also asked for a model, so I'll fit one on the variables that do carry signal." },
            { type: "ACTION", content: "Calling tool: `fit_logistic_regression(features=['Education_Level', 'Tech_Familiarity', 'Perceived_AI_Risk'], target='High_AI_Trust')`" },
            { type: "FINAL_ANSWER", content: "Age does NOT predict AI trust in this dataset (χ² = 1.32, p = 0.72) — a genuine null finding. Education level and tech familiarity do predict it, and a model using those reaches far better than chance. Reporting the null on age is the correct call here." }
        ]
    },
    {
        userPrompt: "Run zero-shot TabFM classification on tech familiarity vs AI trust.",
        steps: [
            { type: "THOUGHT", content: "I will use the Google TabFM tabular foundation model for zero-shot classification. It handles the categorical columns itself, so no manual dummy encoding is needed." },
            { type: "ACTION", content: "Calling tool: `tabfm_zero_shot_predict(train_df, test_df, target='High_AI_Trust')`" },
            { type: "OBSERVATION", content: "TabFM loaded 100 in-context survey rows and returned predictions in a single forward pass (about 0.4s on CPU)." },
            { type: "FINAL_ANSWER", content: "TabFM classified the held-out rows without any gradient training. Tech familiarity is one of the variables that genuinely drives trust in this dataset, and the model picks it up. Note accuracy and ROC-AUC are different metrics — report whichever you actually computed." }
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

    // This is a SCRIPTED REPLAY, not a live agent. If the learner types their own
    // question there is no script for it — say so plainly rather than silently
    // replaying preset 0, which used to answer every question with the age-group trace.
    const preset = (presetIdx !== undefined && sandboxPresets[presetIdx])
        ? sandboxPresets[presetIdx]
        : null;

    if (!preset) {
        const noScript = document.createElement('div');
        noScript.className = 'sandbox-msg agent';
        noScript.innerHTML =
            '<strong>Replay:</strong> There is no recorded trace for that question. ' +
            'This sandbox <em>replays pre-recorded ReAct traces</em> — no model is called, ' +
            'so it cannot answer free-form questions. Pick one of the sample prompts on the ' +
            'left to watch a trace, or open <strong>Notebook 03 (The Agent Loop)</strong> to ' +
            'run a real agent loop yourself.';
        history.appendChild(noScript);
        history.scrollTop = history.scrollHeight;
        return;
    }

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

// escapeHtml lives in js/feedback.js (loaded first). Duplicate definitions
// here silently shadowed it depending on script order.

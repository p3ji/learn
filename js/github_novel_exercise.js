// GitHub Humanities Warm-Up: Collaborative Novel Editing Module
// Designed for learners with humanities/non-technical backgrounds.
// Translates Git & GitHub concepts into familiar editorial terms using a novel manuscript.
// Provides both CONCEPTUAL explanations and EXACT REAL-WORLD CLICK-BY-CLICK instructions.

(function() {
    'use strict';

    // State for the Novel Exercise
    const state = {
        currentStep: 1,
        activeTab: 'practical', // 'practical' or 'conceptual'
        repoName: 'the-mysterious-cipher',
        currentBranch: 'main',
        chapters: {
            'chapter_01.md': {
                title: 'Chapter 1: The Discovery in the Archives',
                lines: [
                    '# Chapter 1: The Discovery in the Archives',
                    '',
                    'Professor Evelyn Vance blew a layer of dust off the leather-bound ledger.',
                    'The room was cold, lit only by a faint lamp tucked in the corner of the library.',
                    'Inside the manuscript lay a hidden cipher that no historian had managed to crack for over three centuries.'
                ]
            }
        },
        branches: ['main'],
        commits: [
            {
                hash: '1a9e3f0',
                branch: 'main',
                author: 'Evelyn (Lead Author)',
                message: 'Initial manuscript draft for Chapter 1',
                timestamp: '2 hours ago',
                diff: 'Initial creation of chapter_01.md'
            }
        ]
    };

    // Prerequisites guide for complete beginners
    const setupGuide = `
        <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h4 style="color: var(--cyan-magic); font-size: 1.05rem; margin-top: 0; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <span>🏁</span> Prerequisites: Getting Set Up on GitHub (No Coding Required!)
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; font-size: 0.86rem; color: var(--text-main);">
                <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border-left: 3px solid #38BDF8;">
                    <strong style="color: #38BDF8; display: block; margin-bottom: 4px;">Step A: Create a Free Account</strong>
                    Go to <a href="https://github.com/signup" target="_blank" style="color: var(--gold-primary); text-decoration: underline;">github.com/signup</a>. Pick a username (e.g. <code>evelyn-vance-writer</code>), enter your email, and create a password.
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border-left: 3px solid #FBBF24;">
                    <strong style="color: #FBBF24; display: block; margin-bottom: 4px;">Step B: Choose How You'll Work</strong>
                    <strong>For Humanities Beginners:</strong> You can do 100% of your editing directly inside your web browser on GitHub.com! No terminal or command line needed.
                </div>
            </div>
        </div>
    `;

    // Step descriptions, conceptual guides & click-by-click practical instructions
    const steps = [
        {
            number: 1,
            title: "1. Create the Manuscript Repository (Your Digital Bookshelf)",
            badge: "📁 Step 1: Setup Repo",
            badgeColor: "#38BDF8",
            humanitiesConcept: "In publishing, a <strong>Repository (Repo)</strong> is your project's master folder stored on GitHub. Instead of emailing Word docs like <code>novel_v2_FINAL_edit.docx</code> back and forth, everyone works from this single, central digital bookshelf.",
            gitCommand: "Click '+' ➔ 'New repository' on GitHub.com",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>Log into your account at <a href="https://github.com" target="_blank" style="color: var(--gold-primary); font-weight: 700;">GitHub.com</a>.</li>
                    <li>In the top-right corner of the webpage, click the <strong><code>+</code> icon</strong> and select <strong>New repository</strong>.</li>
                    <li>Under <strong>Repository name</strong>, type: <code>the-mysterious-cipher</code>.</li>
                    <li>Under <strong>Description</strong>, write: <code>Collaborative novel project</code>.</li>
                    <li>Choose <strong>Public</strong> (anyone can read) or <strong>Private</strong> (only invited collaborators can view).</li>
                    <li>Check the box that says: <strong style="color: #4ADE80;">☑ Add a README file</strong> (this initializes the repository with a front page).</li>
                    <li>Click the green <strong>Create repository</strong> button at the bottom.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🎉 <strong>Result:</strong> You now have a live online repository hosted at <code>https://github.com/your-username/the-mysterious-cipher</code>!
                </div>
            `
        },
        {
            number: 2,
            title: "2. Adding Files & Committing Changes (Tracked Snapshots)",
            badge: "📝 Step 2: Commits",
            badgeColor: "#FBBF24",
            humanitiesConcept: "A <strong>Commit</strong> is like taking a permanent snapshot of your manuscript with a sticky note attached explaining what you changed. Every commit keeps a complete audit trail so you can always see who changed what and why.",
            gitCommand: "Click 'Add file' ➔ 'Create new file' ➔ 'Commit changes...'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>Inside your repository page on GitHub.com, click <strong>Add file</strong> ➔ <strong>Create new file</strong>.</li>
                    <li>In the file name box at the top, type: <code>chapter_01.md</code>.</li>
                    <li>In the main text editing area below, type or paste your chapter text (e.g. <em># Chapter 1: The Discovery in the Archives...</em>).</li>
                    <li>Click the green <strong>Commit changes...</strong> button in the top right.</li>
                    <li>In the popup modal, write a short sticky note in the <strong>Commit message</strong> box (e.g., <code>Draft Chapter 1 initial discovery scene</code>).</li>
                    <li>Leave <strong>Commit directly to the main branch</strong> selected, and click <strong>Commit changes</strong>.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    📜 <strong>Result:</strong> GitHub permanently saves this version snapshot with a unique 7-character code (e.g. <code>#1a9e3f0</code>) and timestamp!
                </div>
            `
        },
        {
            number: 3,
            title: "3. Branching for Alternate Storylines (Safe Sandboxes)",
            badge: "🌿 Step 3: Branching",
            badgeColor: "#A855F7",
            humanitiesConcept: "A <strong>Branch</strong> creates a safe parallel draft of your manuscript. If a co-author wants to test a brand new ending or rewrite a chapter, they create a branch so the primary manuscript (<code>main</code>) remains completely safe and untouched.",
            gitCommand: "Click branch dropdown ('main') ➔ Type new branch name",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>Go to the main page of your repository on GitHub.com.</li>
                    <li>Near the top left above the file list, find the button that says <strong><code>main</code></strong> with a branch icon next to it. Click it.</li>
                    <li>In the search box that pops up, type your new draft branch name: <code>alice-alternate-ending</code>.</li>
                    <li>Click on the blue text that appears below: <strong>Create branch: alice-alternate-ending from main</strong>.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(168, 85, 247, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🌱 <strong>Result:</strong> You are now safely inside the <code>alice-alternate-ending</code> branch! Any edits you make here won't touch the official <code>main</code> manuscript until you explicitly merge them.
                </div>
            `
        },
        {
            number: 4,
            title: "4. Opening a Pull Request (Editorial Review Submission)",
            badge: "🔍 Step 4: Pull Request",
            badgeColor: "#4ADE80",
            humanitiesConcept: "A <strong>Pull Request (PR)</strong> is an editorial proposal. When a co-author finishes a draft on their branch, they open a PR asking the lead author or editor: <em>'Please review my changes and merge them into the master manuscript if you approve.'</em>",
            gitCommand: "Click 'Pull requests' tab ➔ 'New pull request'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>While on your branch (<code>alice-alternate-ending</code>), edit <code>chapter_01.md</code> and commit your changes.</li>
                    <li>Click on the <strong>Pull requests</strong> tab near the top of the repository page.</li>
                    <li>Click the green <strong>New pull request</strong> button.</li>
                    <li>Ensure <code>base: main</code> is on the left and <code>compare: alice-alternate-ending</code> is on the right.</li>
                    <li>GitHub will display a line-by-line diff inspector: <span style="color: #4ADE80;">+ Green lines</span> are additions, <span style="color: #F87171;">- Red lines</span> are deletions.</li>
                    <li>Click <strong>Create pull request</strong>, write a note to your co-author/editor, and click <strong>Create pull request</strong> again.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(74, 222, 128, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    📩 <strong>Result:</strong> A formal review thread is opened where editors can leave comments on specific lines of text!
                </div>
            `
        },
        {
            number: 5,
            title: "5. Merging Approved Drafts into Main (Publication)",
            badge: "🤝 Step 5: Merging",
            badgeColor: "#22D3EE",
            humanitiesConcept: "<strong>Merging</strong> is accepting the editorial proposal. GitHub automatically weaves the approved changes from the branch back into the <code>main</code> branch, publishing the updated manuscript for the whole team.",
            gitCommand: "Click green 'Merge pull request' ➔ 'Confirm merge'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>As the lead editor, open the Pull Request from the <strong>Pull requests</strong> tab.</li>
                    <li>Review the proposed text changes and discussion comments.</li>
                    <li>If everything looks great, scroll to the bottom of the PR page and click the green <strong>Merge pull request</strong> button.</li>
                    <li>Click <strong>Confirm merge</strong>.</li>
                    <li>(Optional) Click the grey <strong>Delete branch</strong> button to keep your repository tidy now that the edits are merged into main.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(34, 211, 238, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🎉 <strong>Result:</strong> The <code>main</code> branch manuscript is now officially updated!
                </div>
            `
        },
        {
            number: 6,
            title: "6. Resolving Co-Author Merge Conflicts",
            badge: "⚡ Step 6: Conflicts",
            badgeColor: "#EF4444",
            humanitiesConcept: "A <strong>Merge Conflict</strong> happens when two co-authors edit the exact same sentence simultaneously. Git pauses and highlights both versions so the lead editor can choose the best version or blend them together.",
            gitCommand: "Click 'Resolve conflicts' button on GitHub.com",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>If two authors edit the same sentence, GitHub will show a yellow warning box on the Pull Request: <em>"This branch has conflicts that must be resolved."</em></li>
                    <li>Click the grey <strong>Resolve conflicts</strong> button right on GitHub.com.</li>
                    <li>GitHub opens an in-browser text editor showing conflict markers:
                        <div style="background: #000; border: 1px solid rgba(239,68,68,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.76rem; margin: 6px 0; color: #FFF;">
                            <<<<<<< main<br/>
                            Evelyn's version of the sentence...<br/>
                            =======<br/>
                            Bob's version of the sentence...<br/>
                            >>>>>>> bob-branch
                        </div>
                    </li>
                    <li>Delete the conflict markers (<code><<<<<<<</code>, <code>=======</code>, <code>>>>>>>></code>) and edit the text to keep the version or blend you prefer.</li>
                    <li>Click <strong>Mark as resolved</strong> in the top right, then click <strong>Commit merge</strong>.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🛡️ <strong>Result:</strong> The conflict is resolved cleanly without losing anyone's work!
                </div>
            `
        }
    ];

    function renderStepContent(container, stepNum) {
        const step = steps[stepNum - 1];
        
        let workspaceHtml = '';

        if (stepNum === 1) {
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(56,189,248,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #38BDF8; font-size: 0.95rem; margin-bottom: 8px;">📚 Interactive Repo Visualizer</h4>
                        <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-main); line-height: 1.8;">
                            <div>📁 <strong>github.com/humanities-lab/the-mysterious-cipher</strong></div>
                            <div style="padding-left: 16px; color: #4ADE80;">├── 📄 README.md <span style="color: var(--text-muted); font-size: 0.75rem;">(Book Synopsis)</span></div>
                            <div style="padding-left: 16px; color: #FBBF24;">└── 📄 chapter_01.md <span style="color: var(--text-muted); font-size: 0.75rem;">(Manuscript Text)</span></div>
                        </div>
                        <div style="margin-top: 14px; background: rgba(56,189,248,0.1); padding: 10px; border-radius: 6px; font-size: 0.8rem; color: var(--text-muted);">
                            <strong>Branch:</strong> <span style="color: #38BDF8; font-weight: 700;">main</span> (The Official Manuscript)
                        </div>
                    </div>

                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">📖 Live Manuscript Preview (chapter_01.md)</h4>
                        <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-family: var(--font-mono); font-size: 0.78rem; color: #E2E8F0; max-height: 160px; overflow-y: auto;">
                            ${state.chapters['chapter_01.md'].lines.map(line => `<div>${escapeHtml(line)}</div>`).join('')}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.GitHubNovelModule.setStep(2)" style="background: linear-gradient(135deg, #38BDF8, #0284C7); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Step 2: Adding Files & Committing ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 2) {
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <!-- Editor Box -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(251,191,36,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #FBBF24; font-size: 0.95rem; margin-bottom: 8px;">✏️ Try Making a Commit in this Simulator</h4>
                        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">
                            Add a plot twist to line 5 of Chapter 1, enter a commit sticky note message, and click save.
                        </p>
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 0.78rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">MANUSCRIPT EDIT (LINE 5):</label>
                            <input type="text" id="novelLineEdit" value="Inside the manuscript lay a hidden cipher that revealed a forgotten royal lineage." style="width: 100%; background: #000; color: #4ADE80; border: 1px solid rgba(74,222,128,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;" />
                        </div>
                        <div style="margin-bottom: 14px;">
                            <label style="font-size: 0.78rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">COMMIT STICKY NOTE MESSAGE:</label>
                            <input type="text" id="novelCommitMsg" value="Add plot twist revealing forgotten royal lineage" style="width: 100%; background: #000; color: #FBBF24; border: 1px solid rgba(251,191,36,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;" />
                        </div>
                        <button onclick="window.GitHubNovelModule.makeCommit()" style="background: linear-gradient(135deg, #FBBF24, #D97706); color: #000; font-weight: 800; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; width: 100%;">
                            💾 Save Commit Snapshot (Simulated git commit)
                        </button>
                    </div>

                    <!-- Commit History Timeline -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: var(--cyan-magic); font-size: 0.95rem; margin-bottom: 8px;">📜 Git Commit History Timeline</h4>
                        <div id="novelCommitHistory" style="display: flex; flex-direction: column; gap: 10px; max-height: 240px; overflow-y: auto;">
                            ${renderCommitList()}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.GitHubNovelModule.setStep(3)" style="background: linear-gradient(135deg, #A855F7, #7E22CE); color: #FFF; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Step 3: Branching Alternate Storylines ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 3) {
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <!-- Branch Controls -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(168,85,247,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #C084FC; font-size: 0.95rem; margin-bottom: 8px;">🌿 Create Co-Author Branch Simulator</h4>
                        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">
                            Imagine co-author <strong>Alice</strong> wants to experiment with an alternate ending without changing Evelyn's official <code>main</code> manuscript.
                        </p>
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 0.78rem; color: #C084FC; font-weight: 700; display: block; margin-bottom: 4px;">BRANCH NAME:</label>
                            <input type="text" id="novelBranchName" value="alice-alternate-ending" style="width: 100%; background: #000; color: #C084FC; border: 1px solid rgba(168,85,247,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;" />
                        </div>
                        <button onclick="window.GitHubNovelModule.createBranch()" style="background: linear-gradient(135deg, #A855F7, #7E22CE); color: #FFF; font-weight: 800; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; width: 100%;">
                            🌿 Create & Switch to Branch (Simulated)
                        </button>
                    </div>

                    <!-- Branch Visualization Graph -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">🌳 Branch Tree Diagram</h4>
                        <div id="novelBranchGraph" style="padding: 12px; background: #000; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                            ${renderBranchGraph()}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.GitHubNovelModule.setStep(4)" style="background: linear-gradient(135deg, #4ADE80, #16A34A); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Step 4: Open a Pull Request ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 4) {
            workspaceHtml = `
                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(74,222,128,0.3); padding: 20px; border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <span style="background: #4ADE80; color: #000; font-weight: 800; font-size: 0.7rem; padding: 2px 8px; border-radius: 6px;">PULL REQUEST #1</span>
                            <h4 style="color: #4ADE80; font-size: 1.1rem; margin-top: 4px;">Propose Alternate Ending for Chapter 1</h4>
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">
                            <strong>Branch:</strong> <span style="color: #C084FC;">alice-alternate-ending</span> ➔ <span style="color: #38BDF8;">main</span>
                        </div>
                    </div>

                    <!-- PR Description & Diffs -->
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 14px; border-radius: 8px; margin-bottom: 16px;">
                        <p style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                            <strong>Alice (Co-Author) wrote:</strong> <em>"Hey Evelyn! I edited the ending of Chapter 1 to introduce a mysterious encoded compass instead of a royal lineage ledger. Check out the text diff below!"</em>
                        </p>

                        <!-- Line Diff Inspector -->
                        <div style="font-family: var(--font-mono); font-size: 0.78rem; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                            <div style="background: rgba(239, 68, 68, 0.15); color: #F87171; padding: 6px 10px; border-left: 3px solid #EF4444;">
                                - Inside the manuscript lay a hidden cipher that revealed a forgotten royal lineage.
                            </div>
                            <div style="background: rgba(74, 222, 128, 0.15); color: #4ADE80; padding: 6px 10px; border-left: 3px solid #4ADE80;">
                                + Inside the manuscript lay a brass compass with coordinates leading to an underground alchemy vault.
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button onclick="window.GitHubNovelModule.setStep(5)" style="background: linear-gradient(135deg, #22D3EE, #0891B2); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                            Approve & Proceed to Step 5: Merge PR ➔
                        </button>
                    </div>
                </div>
            `;
        } else if (stepNum === 5) {
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(34,211,238,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #22D3EE; font-size: 0.95rem; margin-bottom: 8px;">🤝 Merge Pull Request Simulator</h4>
                        <p style="font-size: 0.84rem; color: var(--text-main); line-height: 1.6; margin-bottom: 14px;">
                            Evelyn reviews Alice's proposed brass compass twist, loves it, and clicks <strong>Merge Pull Request</strong>. Git automatically incorporates Alice's changes into the official <code>main</code> manuscript!
                        </p>
                        <button onclick="window.GitHubNovelModule.executeMerge()" style="background: linear-gradient(135deg, #22D3EE, #0891B2); color: #000; font-weight: 800; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; width: 100%;">
                            ⚡ Execute Git Merge into Main
                        </button>
                    </div>

                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #4ADE80; font-size: 0.95rem; margin-bottom: 8px;">📖 Updated Official Manuscript (main)</h4>
                        <div id="novelMergedText" style="background: #000; border: 1px solid rgba(74,222,128,0.3); border-radius: 8px; padding: 12px; font-family: var(--font-mono); font-size: 0.78rem; color: #4ADE80; max-height: 160px; overflow-y: auto;">
                            ${renderMergedText()}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.GitHubNovelModule.setStep(6)" style="background: linear-gradient(135deg, #EF4444, #DC2626); color: #FFF; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Final Step 6: Handle a Co-Author Conflict ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 6) {
            workspaceHtml = `
                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(239,68,68,0.3); padding: 20px; border-radius: 12px;">
                    <h4 style="color: #F87171; font-size: 1.05rem; margin-bottom: 8px;">⚡ Interactive Conflict Resolver: Overlapping Edits</h4>
                    <p style="font-size: 0.84rem; color: var(--text-main); line-height: 1.6; margin-bottom: 14px;">
                        Both <strong>Evelyn (Lead Author)</strong> and <strong>Bob (Co-Author)</strong> edited line 4 simultaneously! Git flagged a <strong>Merge Conflict</strong>:
                    </p>

                    <!-- Conflict Box -->
                    <div style="background: #000; border: 1px solid rgba(239,68,68,0.4); border-radius: 8px; padding: 14px; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 16px;">
                        <div style="color: #38BDF8; font-weight: 700; margin-bottom: 4px;"><<<<<<< main (Evelyn's Version)</div>
                        <div style="color: #FFF; background: rgba(56,189,248,0.15); padding: 6px; border-radius: 4px;">"The library room was freezing, lit only by a single flickering oil lamp."</div>
                        <div style="color: var(--text-muted); text-align: center; margin: 6px 0;">=======</div>
                        <div style="color: #FBBF24; background: rgba(251,191,36,0.15); padding: 6px; border-radius: 4px;">"Rain pelted the stained-glass windows as a candle illuminated the corner."</div>
                        <div style="color: #C084FC; font-weight: 700; margin-top: 4px;">>>>>>>> bob-atmospheric-edit</div>
                    </div>

                    <!-- Resolution Options -->
                    <div style="margin-bottom: 16px;">
                        <label style="font-size: 0.82rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 8px;">SELECT EDITORIAL RESOLUTION:</label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                            <button onclick="window.GitHubNovelModule.resolveConflict('evelyn')" style="background: rgba(56,189,248,0.15); border: 1px solid #38BDF8; color: #38BDF8; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; text-align: left;">
                                👤 Keep Evelyn's Version
                            </button>
                            <button onclick="window.GitHubNovelModule.resolveConflict('bob')" style="background: rgba(251,191,36,0.15); border: 1px solid #FBBF24; color: #FBBF24; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; text-align: left;">
                                👤 Keep Bob's Version
                            </button>
                            <button onclick="window.GitHubNovelModule.resolveConflict('blend')" style="background: rgba(74,222,128,0.15); border: 1px solid #4ADE80; color: #4ADE80; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; text-align: left;">
                                🤝 Blend Both Versions (Recommended)
                            </button>
                        </div>
                    </div>

                    <div id="conflictResultBox" style="display: none; background: rgba(16,185,129,0.1); border: 1px solid #10B981; padding: 14px; border-radius: 8px; font-size: 0.88rem; color: var(--text-main);">
                    </div>
                </div>

                <!-- Bridge to RAP Banner -->
                <div style="margin-top: 24px; background: linear-gradient(135deg, rgba(255, 199, 44, 0.15), rgba(56, 189, 248, 0.15)); border: 2px solid var(--gold-primary); padding: 20px; border-radius: 14px;">
                    <h3 style="color: var(--gold-primary); font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                        <span>🎓</span> Bridge to RAP (Reproducible Analytical Pipelines)
                    </h3>
                    <p style="color: var(--text-main); font-size: 0.9rem; line-height: 1.7; margin-bottom: 12px;">
                        Congratulations! You've mastered collaborative version control on a novel. Now apply this exact workflow to data science and analytical pipelines:
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; font-size: 0.82rem;">
                        <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                            <strong style="color: #38BDF8;">chapter_01.md</strong> ➔ <span style="color: var(--text-muted);">clean_survey_data.py</span>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                            <strong style="color: #FBBF24;">Editorial Review</strong> ➔ <span style="color: var(--text-muted);">Peer Code Review for Statistical Models</span>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                            <strong style="color: #4ADE80;">Commit History</strong> ➔ <span style="color: var(--text-muted);">100% Audit Trail for Reports</span>
                        </div>
                    </div>
                </div>
            `;
        }

        const activeTab = state.activeTab;

        container.innerHTML = `
            <div style="background: rgba(15, 23, 42, 0.95); border: 2px solid rgba(56, 189, 248, 0.4); border-radius: 20px; padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); margin-bottom: 40px;">
                
                ${setupGuide}

                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span style="background: ${step.badgeColor}; color: #000; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">${step.badge}</span>
                        <h3 style="color: var(--text-main); font-family: var(--font-heading); margin: 6px 0 0; font-size: 1.3rem;">${step.title}</h3>
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 0.78rem; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); color: var(--gold-primary);">
                        <code>${step.gitCommand}</code>
                    </div>
                </div>

                <!-- Stepper Buttons -->
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 20px;">
                    ${steps.map(s => `
                        <button onclick="window.GitHubNovelModule.setStep(${s.number})" 
                                style="padding: 8px 14px; font-size: 0.82rem; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s; white-space: nowrap; ${s.number === state.currentStep ? 'background: var(--gold-primary); color: #000; font-weight: 800;' : 'background: rgba(255,255,255,0.05); color: var(--text-muted);'}">
                            Step ${s.number}
                        </button>
                    `).join('')}
                </div>

                <!-- Dual View Toggle Tabs (Practical vs Conceptual) -->
                <div style="display: flex; gap: 10px; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
                    <button onclick="window.GitHubNovelModule.setActiveTab('practical')" 
                            style="background: ${activeTab === 'practical' ? '#38BDF8' : 'rgba(255,255,255,0.05)'}; color: ${activeTab === 'practical' ? '#000' : 'var(--text-muted)'}; font-weight: 800; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                        <span>🖱️</span> What You Actually Do on GitHub.com (Practical Guide)
                    </button>
                    <button onclick="window.GitHubNovelModule.setActiveTab('conceptual')" 
                            style="background: ${activeTab === 'conceptual' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)'}; color: ${activeTab === 'conceptual' ? '#000' : 'var(--text-muted)'}; font-weight: 800; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                        <span>💡</span> Concept Explanation
                    </button>
                </div>

                <!-- Tab Content Display -->
                ${activeTab === 'practical' ? `
                    <div style="background: rgba(56, 189, 248, 0.06); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 22px;">
                        <h4 style="color: #38BDF8; font-size: 0.98rem; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                            <span>🎯</span> Real-World Click-by-Click Instructions for GitHub.com:
                        </h4>
                        ${step.practicalSteps}
                    </div>
                ` : `
                    <div style="background: rgba(255, 199, 44, 0.06); border: 1px solid rgba(255, 199, 44, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 22px; font-size: 0.92rem; color: var(--text-main); line-height: 1.7;">
                        <h4 style="color: var(--gold-primary); font-size: 0.98rem; margin-top: 0; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <span>📖</span> Concept Mental Model:
                        </h4>
                        ${step.humanitiesConcept}
                    </div>
                `}

                <!-- Interactive Workspace Simulator -->
                <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px;">
                    <h4 style="color: var(--cyan-magic); font-size: 0.92rem; margin-top: 0; margin-bottom: 14px;">🎮 Interactive Step Simulator: Try it right here!</h4>
                    ${workspaceHtml}
                </div>
            </div>
        `;
    }

    function renderCommitList() {
        return state.commits.map(c => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 8px; font-size: 0.8rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-family: var(--font-mono); color: #38BDF8; font-weight: 700;">#${c.hash}</span>
                    <span style="color: var(--text-muted); font-size: 0.75rem;">${c.timestamp}</span>
                </div>
                <div style="color: var(--text-main); font-weight: 600; margin-bottom: 2px;">${escapeHtml(c.message)}</div>
                <div style="color: var(--text-muted); font-size: 0.75rem;">Author: ${escapeHtml(c.author)} | Branch: ${escapeHtml(c.branch)}</div>
            </div>
        `).join('');
    }

    function renderBranchGraph() {
        return `
            <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 2; color: var(--text-main);">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: #38BDF8; font-weight: 700;">● main</span>
                    <span style="color: var(--text-muted); font-size: 0.75rem;">── (Official Manuscript)</span>
                </div>
                ${state.branches.includes('alice-alternate-ending') ? `
                <div style="display: flex; align-items: center; gap: 8px; padding-left: 20px;">
                    <span style="color: #C084FC;">└── 🌿 alice-alternate-ending</span>
                    <span style="color: #4ADE80; font-size: 0.75rem;">[ACTIVE BRANCH]</span>
                </div>` : ''}
            </div>
        `;
    }

    function renderMergedText() {
        return `1: # Chapter 1: The Discovery in the Archives
2: 
3: Professor Evelyn Vance blew a layer of dust off the leather-bound ledger.
4: The room was cold, lit only by a faint lamp tucked in the corner of the library.
5: Inside the manuscript lay a brass compass with coordinates leading to an underground alchemy vault.`;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Public module object attached to window
    window.GitHubNovelModule = {
        init: function(containerId) {
            const el = document.getElementById(containerId);
            if (!el) return;
            renderStepContent(el, state.currentStep);
        },
        setStep: function(stepNum) {
            state.currentStep = stepNum;
            const el = document.getElementById('githubNovelCard');
            if (el) renderStepContent(el, stepNum);
        },
        setActiveTab: function(tabName) {
            state.activeTab = tabName;
            const el = document.getElementById('githubNovelCard');
            if (el) renderStepContent(el, state.currentStep);
        },
        makeCommit: function() {
            const editVal = document.getElementById('novelLineEdit')?.value;
            const msgVal = document.getElementById('novelCommitMsg')?.value || 'Update manuscript line';
            if (editVal) {
                state.chapters['chapter_01.md'].lines[4] = editVal;
            }
            const newHash = Math.random().toString(16).substr(2, 7);
            state.commits.unshift({
                hash: newHash,
                branch: state.currentBranch,
                author: 'Evelyn (Lead Author)',
                message: msgVal,
                timestamp: 'Just now',
                diff: editVal
            });
            const listEl = document.getElementById('novelCommitHistory');
            if (listEl) listEl.innerHTML = renderCommitList();
        },
        createBranch: function() {
            const branchName = document.getElementById('novelBranchName')?.value || 'alice-draft';
            if (!state.branches.includes(branchName)) {
                state.branches.push(branchName);
            }
            state.currentBranch = branchName;
            const graphEl = document.getElementById('novelBranchGraph');
            if (graphEl) graphEl.innerHTML = renderBranchGraph();
        },
        executeMerge: function() {
            const targetEl = document.getElementById('novelMergedText');
            if (targetEl) {
                targetEl.innerHTML = renderMergedText();
            }
        },
        resolveConflict: function(choice) {
            const box = document.getElementById('conflictResultBox');
            if (!box) return;
            box.style.display = 'block';

            if (choice === 'evelyn') {
                box.innerHTML = `<strong style="color: #38BDF8;">Resolved using Evelyn's Version:</strong><br/><em>"The library room was freezing, lit only by a single flickering oil lamp."</em><br/><br/>Commit created: <code>Resolved merge conflict in chapter_01.md</code>`;
            } else if (choice === 'bob') {
                box.innerHTML = `<strong style="color: #FBBF24;">Resolved using Bob's Version:</strong><br/><em>"Rain pelted the stained-glass windows as a candle illuminated the corner."</em><br/><br/>Commit created: <code>Resolved merge conflict in chapter_01.md</code>`;
            } else {
                box.innerHTML = `<strong style="color: #4ADE80;">Resolved using Blended Version:</strong><br/><em>"Rain pelted the stained-glass windows of the freezing library as a flickering lamp illuminated the corner."</em><br/><br/>Commit created: <code>Blended co-author edits in chapter_01.md</code>`;
            }
        }
    };

})();

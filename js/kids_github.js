// Story Forge: GitHub Quest for Young Authors & Kids
// Interactive gamified GitHub guide designed for kids and young authors!
// Features customizable stories, level badges, friendly jargon decoders, and completion certificates.

(function() {
    'use strict';

    // State for the Kids GitHub Exercise
    const state = {
        currentStep: 1,
        activeTab: 'practical', // 'practical' or 'conceptual'
        authorName: 'Maya',
        coauthorName: 'Leo',
        bookTitle: 'The Mysterious Cipher',
        currentBranch: 'main',
        chapters: {
            'chapter_01.md': {
                title: 'Chapter 1: The Discovery in the Archives',
                lines: [
                    '# Chapter 1: The Discovery in the Archives',
                    '',
                    'Professor Vance blew a layer of dust off the ancient leather ledger.',
                    'The room was cold, lit only by a single flickering candle in the corner.',
                    'Inside the manuscript lay a hidden cipher that no writer had managed to crack for over a century.'
                ]
            }
        },
        branches: ['main'],
        commits: [
            {
                hash: '1a9e3f0',
                branch: 'main',
                author: 'Maya (Lead Author)',
                message: 'Initial manuscript draft for Chapter 1',
                timestamp: 'Just now'
            }
        ],
        completedSteps: new Set([1])
    };

    const levels = [
        {
            number: 1,
            title: "Level 1: Your Digital Bookshelf (The Repository)",
            badge: "📁 LEVEL 1",
            badgeColor: "#38BDF8",
            shortName: "1. Digital Bookshelf",
            conceptTitle: "What is a Repository?",
            conceptExplanation: "Think of a <strong>Repository (or 'Repo')</strong> as your master digital bookshelf stored online on GitHub. Instead of emailing messy Word files like <code>my_book_final_v2_edit3.docx</code> back and forth, you and your co-authors work from one single, shared online folder.",
            gitCommand: "GitHub.com ➔ Click '+' ➔ 'New repository'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>Go to <a href="https://github.com" target="_blank" style="color: var(--gold-primary); font-weight: 700;">GitHub.com</a> and sign in.</li>
                    <li>In the top right corner, click the friendly <strong><code>+</code> button</strong> and select <strong>New repository</strong>.</li>
                    <li>Under <strong>Repository name</strong>, type your book's name (e.g. <code id="guideRepoName">the-mysterious-cipher</code>).</li>
                    <li>Check the box that says: <strong style="color: #4ADE80;">☑ Add a README file</strong> (this creates your book's front cover page).</li>
                    <li>Click the green <strong>Create repository</strong> button!</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(56, 189, 248, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🎉 <strong>You did it!</strong> You now have an official online bookshelf at <code>github.com/yourname/<span id="guideRepoSlug">the-mysterious-cipher</span></code>!
                </div>
            `
        },
        {
            number: 2,
            title: "Level 2: Sticky Note Snapshots (Commits)",
            badge: "🏷️ LEVEL 2",
            badgeColor: "#FBBF24",
            shortName: "2. Sticky Snapshots",
            conceptTitle: "What is a Commit?",
            conceptExplanation: "A <strong>Commit</strong> is like taking a permanent Polaroid photo of your story chapter, with a sticky note attached explaining what you changed (e.g. <em>'Added plot twist in line 5'</em>). You can time-travel back to any snapshot whenever you want!",
            gitCommand: "Click 'Add file' ➔ 'Create new file' ➔ 'Commit changes...'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>On your repository webpage, click <strong>Add file</strong> ➔ <strong>Create new file</strong>.</li>
                    <li>Type the file name: <code>chapter_01.md</code>.</li>
                    <li>Type your chapter story text in the big box.</li>
                    <li>Click the green <strong>Commit changes...</strong> button.</li>
                    <li>In the popup sticky note box, write what you changed (e.g., <code>Draft Chapter 1 opening scene</code>).</li>
                    <li>Click <strong>Commit changes</strong>!</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    📸 <strong>Snapshot Saved!</strong> GitHub gives your edit a unique 7-letter secret code (like <code>#1a9e3f0</code>) so it's saved forever.
                </div>
            `
        },
        {
            number: 3,
            title: "Level 3: Secret Sandbox Draft (Branching)",
            badge: "🌿 LEVEL 3",
            badgeColor: "#A855F7",
            shortName: "3. Secret Draft",
            conceptTitle: "What is a Branch?",
            conceptExplanation: "A <strong>Branch</strong> is a secret parallel sandbox copy of your book. If your co-author wants to test a crazy plot twist without ruining the main manuscript, they create a branch. The original story stays 100% safe!",
            gitCommand: "Click branch dropdown ('main') ➔ Type new branch name",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>On your repository page, find the button that says <strong><code>main</code></strong> (with a tiny branch icon).</li>
                    <li>Click it, and type your co-author's draft branch name: <code id="guideBranchName">leo-alternate-ending</code>.</li>
                    <li>Click <strong>Create branch: <span id="guideBranchSlug">leo-alternate-ending</span> from main</strong>.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(168, 85, 247, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🌱 <strong>Safe Sandbox Active!</strong> You are now editing inside a separate draft space. The main story won't change until you approve it!
                </div>
            `
        },
        {
            number: 4,
            title: "Level 4: Co-Author Proposal (Pull Requests)",
            badge: "📩 LEVEL 4",
            badgeColor: "#4ADE80",
            shortName: "4. Story Proposal",
            conceptTitle: "What is a Pull Request?",
            conceptExplanation: "A <strong>Pull Request (PR)</strong> is an official letter to your lead editor saying: <em>'Hey! I finished my draft branch. Please check out my text changes and merge them into the real book if you like them!'</em>",
            gitCommand: "Click 'Pull requests' tab ➔ 'New pull request'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>After editing your branch, click the <strong>Pull requests</strong> tab at the top.</li>
                    <li>Click the green <strong>New pull request</strong> button.</li>
                    <li>Look at the colorful text inspector: <span style="color: #4ADE80;">+ Green text</span> shows new additions, <span style="color: #F87171;">- Red text</span> shows deleted words.</li>
                    <li>Click <strong>Create pull request</strong>, write a short message to your lead author, and click submit!</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(74, 222, 128, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    📩 <strong>Proposal Sent!</strong> Authors can now comment on individual lines of text just like Google Docs comments!
                </div>
            `
        },
        {
            number: 5,
            title: "Level 5: Combine & Publish (Merging)",
            badge: "🤝 LEVEL 5",
            badgeColor: "#22D3EE",
            shortName: "5. Combine & Publish",
            conceptTitle: "What is Merging?",
            conceptExplanation: "<strong>Merging</strong> is accepting your co-author's proposal! GitHub automatically glues the approved sentences from the draft branch back into the main book.",
            gitCommand: "Click green 'Merge pull request' ➔ 'Confirm merge'",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>Open the Pull Request from the <strong>Pull requests</strong> tab.</li>
                    <li>Read your co-author's new sentences and diffs.</li>
                    <li>Click the big green <strong>Merge pull request</strong> button at the bottom.</li>
                    <li>Click <strong>Confirm merge</strong>!</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(34, 211, 238, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🎉 <strong>Published!</strong> Your co-author's awesome new chapter ending is now officially part of the main book!
                </div>
            `
        },
        {
            number: 6,
            title: "Level 6: Disagreement Solver (Merge Conflicts)",
            badge: "⚔️ LEVEL 6",
            badgeColor: "#EF4444",
            shortName: "6. Solve Conflicts",
            conceptTitle: "What is a Merge Conflict?",
            conceptExplanation: "A <strong>Merge Conflict</strong> happens when two co-authors edit the exact same sentence at the same time! GitHub pauses and places 'fence post' markers (<code><<<<<<<</code> and <code>>>>>>>></code>) around both versions so you can pick the winner or blend them into something epic.",
            gitCommand: "Click 'Resolve conflicts' button on GitHub.com",
            practicalSteps: `
                <ol style="margin: 0; padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.88rem;">
                    <li>If two authors change the same sentence, GitHub displays a warning: <em>"This branch has conflicts."</em></li>
                    <li>Click the grey <strong>Resolve conflicts</strong> button.</li>
                    <li>Look for Git's secret fence post markers:
                        <div style="background: #000; border: 1px solid rgba(239,68,68,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.76rem; margin: 6px 0; color: #FFF;">
                            <<<<<<< main (Maya's sentence)<br/>
                            ======= (Separator)<br/>
                            >>>>>>> draft-branch (Leo's sentence)
                        </div>
                    </li>
                    <li>Delete the weird symbol lines (<code><<<<<<<</code>, <code>=======</code>, <code>>>>>>>></code>) and keep or blend the best text!</li>
                    <li>Click <strong>Mark as resolved</strong> ➔ <strong>Commit merge</strong>.</li>
                </ol>
                <div style="margin-top: 12px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--text-muted);">
                    🏆 <strong>Conflict Solved!</strong> You just resolved a real version control conflict like a pro software engineer!
                </div>
            `
        }
    ];

    function renderSetupBar() {
        return `
            <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--gold-primary); border-radius: 16px; padding: 20px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <span style="background: var(--gold-primary); color: #000; font-weight: 900; font-size: 0.72rem; padding: 3px 8px; border-radius: 8px; text-transform: uppercase;">✨ STORY FORGE CUSTOMIZER</span>
                        <h3 style="color: #FFF; font-family: var(--font-heading); margin: 6px 0 0; font-size: 1.2rem;">Customize Your Novel & Authors</h3>
                    </div>
                    <div style="font-size: 0.82rem; color: var(--text-muted);">
                        Progress: <strong style="color: var(--cyan-magic); font-size: 1rem;">${state.completedSteps.size} / 6 Levels Completed</strong>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                    <div>
                        <label style="font-size: 0.75rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">YOUR NAME (LEAD AUTHOR):</label>
                        <input type="text" id="custAuthor" value="${escapeHtml(state.authorName)}" onchange="window.KidsGitHubModule.updateCustomizers()" style="width: 100%; background: #000; color: #38BDF8; border: 1px solid rgba(56,189,248,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.82rem;" />
                    </div>
                    <div>
                        <label style="font-size: 0.75rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">CO-AUTHOR'S NAME:</label>
                        <input type="text" id="custCoauthor" value="${escapeHtml(state.coauthorName)}" onchange="window.KidsGitHubModule.updateCustomizers()" style="width: 100%; background: #000; color: #C084FC; border: 1px solid rgba(168,85,247,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.82rem;" />
                    </div>
                    <div>
                        <label style="font-size: 0.75rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">BOOK TITLE:</label>
                        <input type="text" id="custBookTitle" value="${escapeHtml(state.bookTitle)}" onchange="window.KidsGitHubModule.updateCustomizers()" style="width: 100%; background: #000; color: #4ADE80; border: 1px solid rgba(74,222,128,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.82rem;" />
                    </div>
                </div>
            </div>
        `;
    }

    function renderStepContent(container, stepNum) {
        state.completedSteps.add(stepNum);
        const level = levels[stepNum - 1];
        const activeTab = state.activeTab;

        let workspaceHtml = '';

        if (stepNum === 1) {
            const slug = state.bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(56,189,248,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #38BDF8; font-size: 0.95rem; margin-bottom: 8px;">📚 Live Bookshelf Inspector</h4>
                        <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-main); line-height: 1.8;">
                            <div>📁 <strong>github.com/${escapeHtml(state.authorName.toLowerCase())}/${slug}</strong></div>
                            <div style="padding-left: 16px; color: #4ADE80;">├── 📄 README.md <span style="color: var(--text-muted); font-size: 0.75rem;">(${escapeHtml(state.bookTitle)} Cover & Synopsis)</span></div>
                            <div style="padding-left: 16px; color: #FBBF24;">└── 📄 chapter_01.md <span style="color: var(--text-muted); font-size: 0.75rem;">(Manuscript Text)</span></div>
                        </div>
                        <div style="margin-top: 14px; background: rgba(56,189,248,0.1); padding: 10px; border-radius: 6px; font-size: 0.8rem; color: var(--text-muted);">
                            <strong>Active Branch:</strong> <span style="color: #38BDF8; font-weight: 700;">main</span> (${escapeHtml(state.authorName)}'s Official Manuscript)
                        </div>
                    </div>

                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: var(--gold-primary); font-size: 0.95rem; margin-bottom: 8px;">📖 Live Chapter Text (chapter_01.md)</h4>
                        <div style="background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-family: var(--font-mono); font-size: 0.78rem; color: #E2E8F0; max-height: 160px; overflow-y: auto;">
                            ${state.chapters['chapter_01.md'].lines.map(line => `<div>${escapeHtml(line)}</div>`).join('')}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.KidsGitHubModule.setStep(2)" style="background: linear-gradient(135deg, #38BDF8, #0284C7); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Level 2: Sticky Snapshots ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 2) {
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <!-- Lined Notebook Editor -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(251,191,36,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #FBBF24; font-size: 0.95rem; margin-bottom: 8px;">✏️ Lined Notebook Editor Simulator</h4>
                        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">
                            Edit line 5 of your story, write a sticky note snapshot message, and click save.
                        </p>
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 0.78rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">EDIT LINE 5:</label>
                            <input type="text" id="novelLineEdit" value="Inside the manuscript lay a brass key wrapped in silk with a mysterious crest." style="width: 100%; background: #000; color: #4ADE80; border: 1px solid rgba(74,222,128,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;" />
                        </div>
                        <div style="margin-bottom: 14px;">
                            <label style="font-size: 0.78rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 4px;">STICKY NOTE MESSAGE:</label>
                            <input type="text" id="novelCommitMsg" value="Add silk-wrapped brass key twist to line 5" style="width: 100%; background: #000; color: #FBBF24; border: 1px solid rgba(251,191,36,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;" />
                        </div>
                        <button onclick="window.KidsGitHubModule.makeCommit()" style="background: linear-gradient(135deg, #FBBF24, #D97706); color: #000; font-weight: 800; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; width: 100%;">
                            🏷️ Save Sticky Note Snapshot (git commit)
                        </button>
                    </div>

                    <!-- Commit History Timeline -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: var(--cyan-magic); font-size: 0.95rem; margin-bottom: 8px;">📸 Snapshot Timeline</h4>
                        <div id="novelCommitHistory" style="display: flex; flex-direction: column; gap: 10px; max-height: 240px; overflow-y: auto;">
                            ${renderCommitList()}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.KidsGitHubModule.setStep(3)" style="background: linear-gradient(135deg, #A855F7, #7E22CE); color: #FFF; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Level 3: Secret Sandbox Draft ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 3) {
            const defaultBranch = `${state.coauthorName.toLowerCase()}-alternate-ending`;
            workspaceHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <!-- Branch Controls -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(168,85,247,0.3); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #C084FC; font-size: 0.95rem; margin-bottom: 8px;">🌿 Create ${escapeHtml(state.coauthorName)}'s Sandbox Branch</h4>
                        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">
                            ${escapeHtml(state.coauthorName)} wants to test a brand new ending without changing ${escapeHtml(state.authorName)}'s main book text.
                        </p>
                        <div style="margin-bottom: 12px;">
                            <label style="font-size: 0.78rem; color: #C084FC; font-weight: 700; display: block; margin-bottom: 4px;">NEW BRANCH NAME:</label>
                            <input type="text" id="novelBranchName" value="${escapeHtml(defaultBranch)}" style="width: 100%; background: #000; color: #C084FC; border: 1px solid rgba(168,85,247,0.4); padding: 8px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;" />
                        </div>
                        <button onclick="window.KidsGitHubModule.createBranch()" style="background: linear-gradient(135deg, #A855F7, #7E22CE); color: #FFF; font-weight: 800; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; width: 100%;">
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
                    <button onclick="window.KidsGitHubModule.setStep(4)" style="background: linear-gradient(135deg, #4ADE80, #16A34A); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Level 4: Story Proposal ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 4) {
            workspaceHtml = `
                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(74,222,128,0.3); padding: 20px; border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <span style="background: #4ADE80; color: #000; font-weight: 800; font-size: 0.7rem; padding: 2px 8px; border-radius: 6px;">PULL REQUEST #1</span>
                            <h4 style="color: #4ADE80; font-size: 1.1rem; margin-top: 4px;">Propose New Ending for Chapter 1</h4>
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">
                            <strong>Branch:</strong> <span style="color: #C084FC;">${escapeHtml(state.coauthorName.toLowerCase())}-draft</span> ➔ <span style="color: #38BDF8;">main</span>
                        </div>
                    </div>

                    <!-- PR Description & Diffs -->
                    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 14px; border-radius: 8px; margin-bottom: 16px;">
                        <p style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 12px;">
                            <strong>${escapeHtml(state.coauthorName)} wrote:</strong> <em>"Hey ${escapeHtml(state.authorName)}! Check out my proposed text change for line 5 below. Green is what I added!"</em>
                        </p>

                        <!-- Line Diff Inspector -->
                        <div style="font-family: var(--font-mono); font-size: 0.78rem; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                            <div style="background: rgba(239, 68, 68, 0.15); color: #F87171; padding: 6px 10px; border-left: 3px solid #EF4444;">
                                - Inside the manuscript lay a hidden cipher that no writer had managed to crack.
                            </div>
                            <div style="background: rgba(74, 222, 128, 0.15); color: #4ADE80; padding: 6px 10px; border-left: 3px solid #4ADE80;">
                                + Inside the manuscript lay a brass compass with coordinates leading to an underground alchemy vault.
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button onclick="window.KidsGitHubModule.setStep(5)" style="background: linear-gradient(135deg, #22D3EE, #0891B2); color: #000; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                            Approve & Proceed to Level 5: Combine & Publish ➔
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
                            ${escapeHtml(state.authorName)} loves ${escapeHtml(state.coauthorName)}'s brass compass idea and clicks <strong>Merge Pull Request</strong>!
                        </p>
                        <button onclick="window.KidsGitHubModule.executeMerge()" style="background: linear-gradient(135deg, #22D3EE, #0891B2); color: #000; font-weight: 800; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; width: 100%;">
                            ⚡ Combine Draft into Main Manuscript
                        </button>
                    </div>

                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <h4 style="color: #4ADE80; font-size: 0.95rem; margin-bottom: 8px;">📖 Official Published Manuscript (main)</h4>
                        <div id="novelMergedText" style="background: #000; border: 1px solid rgba(74,222,128,0.3); border-radius: 8px; padding: 12px; font-family: var(--font-mono); font-size: 0.78rem; color: #4ADE80; max-height: 160px; overflow-y: auto;">
                            ${renderMergedText()}
                        </div>
                    </div>
                </div>

                <div style="margin-top: 18px; text-align: right;">
                    <button onclick="window.KidsGitHubModule.setStep(6)" style="background: linear-gradient(135deg, #EF4444, #DC2626); color: #FFF; font-weight: 800; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.88rem;">
                        Proceed to Final Level 6: Disagreement Solver ➔
                    </button>
                </div>
            `;
        } else if (stepNum === 6) {
            workspaceHtml = `
                <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(239,68,68,0.3); padding: 20px; border-radius: 12px;">
                    <h4 style="color: #F87171; font-size: 1.05rem; margin-bottom: 8px;">⚔️ Interactive Disagreement Resolver</h4>
                    <p style="font-size: 0.84rem; color: var(--text-main); line-height: 1.6; margin-bottom: 14px;">
                        Both <strong>${escapeHtml(state.authorName)}</strong> and <strong>${escapeHtml(state.coauthorName)}</strong> edited line 4 simultaneously! Git flagged a <strong>Merge Conflict</strong>:
                    </p>

                    <!-- Friendly Decoder Callout -->
                    <div style="background: rgba(239,68,68,0.1); border-left: 3px solid #EF4444; padding: 10px 14px; border-radius: 6px; font-size: 0.82rem; color: var(--text-main); margin-bottom: 14px;">
                        🔍 <strong>Git Fence Post Decoder:</strong><br/>
                        • <code><<<<<<< main</code> = Start of ${escapeHtml(state.authorName)}'s text.<br/>
                        • <code>=======</code> = Divider line.<br/>
                        • <code>>>>>>>> draft</code> = End of ${escapeHtml(state.coauthorName)}'s text.
                    </div>

                    <!-- Conflict Box -->
                    <div style="background: #000; border: 1px solid rgba(239,68,68,0.4); border-radius: 8px; padding: 14px; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 16px;">
                        <div style="color: #38BDF8; font-weight: 700; margin-bottom: 4px;"><<<<<<< main (${escapeHtml(state.authorName)}'s Version)</div>
                        <div style="color: #FFF; background: rgba(56,189,248,0.15); padding: 6px; border-radius: 4px;">"The library room was freezing, lit only by a single flickering oil lamp."</div>
                        <div style="color: var(--text-muted); text-align: center; margin: 6px 0;">=======</div>
                        <div style="color: #FBBF24; background: rgba(251,191,36,0.15); padding: 6px; border-radius: 4px;">"Rain pelted the stained-glass windows as a candle illuminated the corner."</div>
                        <div style="color: #C084FC; font-weight: 700; margin-top: 4px;">>>>>>>> ${escapeHtml(state.coauthorName.toLowerCase())}-edit</div>
                    </div>

                    <!-- Resolution Options -->
                    <div style="margin-bottom: 16px;">
                        <label style="font-size: 0.82rem; color: var(--gold-primary); font-weight: 700; display: block; margin-bottom: 8px;">SELECT EDITORIAL RESOLUTION:</label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                            <button onclick="window.KidsGitHubModule.resolveConflict('author')" style="background: rgba(56,189,248,0.15); border: 1px solid #38BDF8; color: #38BDF8; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; text-align: left;">
                                👤 Keep ${escapeHtml(state.authorName)}'s Version
                            </button>
                            <button onclick="window.KidsGitHubModule.resolveConflict('coauthor')" style="background: rgba(251,191,36,0.15); border: 1px solid #FBBF24; color: #FBBF24; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; text-align: left;">
                                👤 Keep ${escapeHtml(state.coauthorName)}'s Version
                            </button>
                            <button onclick="window.KidsGitHubModule.resolveConflict('blend')" style="background: rgba(74,222,128,0.15); border: 1px solid #4ADE80; color: #4ADE80; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; text-align: left;">
                                🤝 Blend Both Versions (Recommended)
                            </button>
                        </div>
                    </div>

                    <div id="conflictResultBox" style="display: none; background: rgba(16,185,129,0.1); border: 1px solid #10B981; padding: 14px; border-radius: 8px; font-size: 0.88rem; color: var(--text-main);">
                    </div>
                </div>

                <!-- Celebration Certificate Banner -->
                <div id="celebrationBanner" style="margin-top: 24px; display: none; background: linear-gradient(135deg, rgba(255, 199, 44, 0.2), rgba(74, 222, 128, 0.2)); border: 2px solid var(--gold-primary); padding: 22px; border-radius: 16px; text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 6px;">🏆🎉</div>
                    <h3 style="color: var(--gold-primary); font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 6px;">
                        Congratulations ${escapeHtml(state.authorName)}! You're an Official Master Co-Author!
                    </h3>
                    <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 14px; max-width: 600px; margin-left: auto; margin-right: auto;">
                        You have mastered Repos, Commits, Branches, Pull Requests, and Merge Conflicts! You are now fully prepared to use GitHub for writing novels with your friends!
                    </p>
                    <a href="../../index.html" style="display: inline-block; background: linear-gradient(135deg, var(--gold-primary), var(--gold-dark)); color: #000; font-weight: 800; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 0.92rem;">
                        🚀 Return to Main Portal ➔
                    </a>
                </div>
            `;
        }

        container.innerHTML = `
            ${renderSetupBar()}

            <div style="background: rgba(15, 23, 42, 0.95); border: 2px solid rgba(56, 189, 248, 0.4); border-radius: 20px; padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); margin-bottom: 40px;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span style="background: ${level.badgeColor}; color: #000; font-weight: 900; font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">${level.badge}</span>
                        <h3 style="color: var(--text-main); font-family: var(--font-heading); margin: 6px 0 0; font-size: 1.3rem;">${level.title}</h3>
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 0.78rem; background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); color: var(--gold-primary);">
                        <code>${level.gitCommand}</code>
                    </div>
                </div>

                <!-- Level Buttons -->
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 20px;">
                    ${levels.map(l => `
                        <button onclick="window.KidsGitHubModule.setStep(${l.number})" 
                                style="padding: 8px 14px; font-size: 0.82rem; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s; white-space: nowrap; ${l.number === state.currentStep ? 'background: var(--gold-primary); color: #000; font-weight: 800;' : 'background: rgba(255,255,255,0.05); color: var(--text-muted);'}">
                            ${l.shortName}
                        </button>
                    `).join('')}
                </div>

                <!-- Dual View Toggle Tabs -->
                <div style="display: flex; gap: 10px; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
                    <button onclick="window.KidsGitHubModule.setActiveTab('practical')" 
                            style="background: ${activeTab === 'practical' ? '#38BDF8' : 'rgba(255,255,255,0.05)'}; color: ${activeTab === 'practical' ? '#000' : 'var(--text-muted)'}; font-weight: 800; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                        <span>🖱️</span> What You Click on GitHub.com (Practical Guide)
                    </button>
                    <button onclick="window.KidsGitHubModule.setActiveTab('conceptual')" 
                            style="background: ${activeTab === 'conceptual' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)'}; color: ${activeTab === 'conceptual' ? '#000' : 'var(--text-muted)'}; font-weight: 800; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                        <span>💡</span> Concept Explanation
                    </button>
                </div>

                <!-- Tab Content Display -->
                ${activeTab === 'practical' ? `
                    <div style="background: rgba(56, 189, 248, 0.06); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 22px;">
                        <h4 style="color: #38BDF8; font-size: 0.98rem; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                            <span>🎯</span> Real-World Click-by-Click Instructions:
                        </h4>
                        ${level.practicalSteps}
                    </div>
                ` : `
                    <div style="background: rgba(255, 199, 44, 0.06); border: 1px solid rgba(255, 199, 44, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 22px; font-size: 0.92rem; color: var(--text-main); line-height: 1.7;">
                        <h4 style="color: var(--gold-primary); font-size: 0.98rem; margin-top: 0; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <span>📖</span> ${level.conceptTitle}
                        </h4>
                        ${level.conceptExplanation}
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
                    <span style="color: var(--text-muted); font-size: 0.75rem;">── (${escapeHtml(state.authorName)}'s Book)</span>
                </div>
                ${state.branches.length > 1 ? `
                <div style="display: flex; align-items: center; gap: 8px; padding-left: 20px;">
                    <span style="color: #C084FC;">└── 🌿 ${escapeHtml(state.branches[1])}</span>
                    <span style="color: #4ADE80; font-size: 0.75rem;">[ACTIVE DRAFT]</span>
                </div>` : ''}
            </div>
        `;
    }

    function renderMergedText() {
        return `1: # Chapter 1: The Discovery in the Archives
2: 
3: Professor Vance blew a layer of dust off the ancient leather ledger.
4: The room was cold, lit only by a single flickering candle in the corner.
5: Inside the manuscript lay a brass compass with coordinates leading to an underground alchemy vault.`;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Public module object attached to window
    window.KidsGitHubModule = {
        init: function(containerId) {
            const el = document.getElementById(containerId);
            if (!el) return;
            renderStepContent(el, state.currentStep);
        },
        setStep: function(stepNum) {
            state.currentStep = stepNum;
            const el = document.getElementById('kidsGithubCard');
            if (el) renderStepContent(el, stepNum);
        },
        setActiveTab: function(tabName) {
            state.activeTab = tabName;
            const el = document.getElementById('kidsGithubCard');
            if (el) renderStepContent(el, state.currentStep);
        },
        updateCustomizers: function() {
            const a = document.getElementById('custAuthor')?.value;
            const c = document.getElementById('custCoauthor')?.value;
            const b = document.getElementById('custBookTitle')?.value;
            if (a) state.authorName = a.trim();
            if (c) state.coauthorName = c.trim();
            if (b) state.bookTitle = b.trim();
            const el = document.getElementById('kidsGithubCard');
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
                author: `${state.authorName} (Lead Author)`,
                message: msgVal,
                timestamp: 'Just now'
            });
            const listEl = document.getElementById('novelCommitHistory');
            if (listEl) listEl.innerHTML = renderCommitList();
        },
        createBranch: function() {
            const branchName = document.getElementById('novelBranchName')?.value || `${state.coauthorName.toLowerCase()}-draft`;
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

            if (choice === 'author') {
                box.innerHTML = `<strong style="color: #38BDF8;">Resolved using ${escapeHtml(state.authorName)}'s Version:</strong><br/><em>"The library room was freezing, lit only by a single flickering oil lamp."</em><br/><br/>Commit created: <code>Resolved merge conflict in chapter_01.md</code>`;
            } else if (choice === 'coauthor') {
                box.innerHTML = `<strong style="color: #FBBF24;">Resolved using ${escapeHtml(state.coauthorName)}'s Version:</strong><br/><em>"Rain pelted the stained-glass windows as a candle illuminated the corner."</em><br/><br/>Commit created: <code>Resolved merge conflict in chapter_01.md</code>`;
            } else {
                box.innerHTML = `<strong style="color: #4ADE80;">Resolved using Blended Version:</strong><br/><em>"Rain pelted the stained-glass windows of the freezing library as a flickering lamp illuminated the corner."</em><br/><br/>Commit created: <code>Blended co-author edits in chapter_01.md</code>`;
            }

            const cert = document.getElementById('celebrationBanner');
            if (cert) cert.style.display = 'block';
        }
    };

})();

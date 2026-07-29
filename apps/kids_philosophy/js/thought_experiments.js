// Visually Impressive Interactive Thought Experiments - Single Topic Renderer with 15-Minute Tab Depth

const experimentData = {
    platos_cave: {
        id: "platos_cave",
        name: "Plato's Cave",
        title: "🌌 Plato's Cave (Shadows vs Reality)",
        avatar: "🌌",
        intro: "Plato imagined people trapped inside a dark cave, facing a blank wall. Behind them, a fire burns and puppets cast flickering shadows on the wall. The prisoners think the shadows ARE real life, until someone escapes outside into the real sunlight!",
        storyScenes: [
            {
                title: "Scene 1: The Dark Cave",
                heading: "Facing the Stone Wall",
                imageEmoji: "🔥",
                text: "Prisoners sit inside a dark cave, chained facing a blank wall. Behind them, puppet masters hold shapes in front of a fire, casting flickering 2D shadows on the wall."
            },
            {
                title: "Scene 2: Stepping Outside",
                heading: "Entering the Sunlight",
                imageEmoji: "☀️",
                text: "One prisoner escapes outside! At first, the bright sunlight hurts his eyes. But as his eyes adjust, he discovers 3D trees, colorful flowers, birds, and the real sun!"
            },
            {
                title: "Scene 3: Returning to Share Wisdom",
                heading: "Bringing Truth Back",
                imageEmoji: "🌈",
                text: "The freed prisoner returns to tell his friends that the shadows were just 2D projections. True education is leaving the dark cave of illusions to step into the sunlight of truth!"
            }
        ],
        vocabCards: [
            { term: "Allegory", icon: "🌌", definition: "A story, poem, or picture that can be interpreted to reveal a hidden moral or philosophical meaning." },
            { term: "Illusion", icon: "👥", definition: "A false appearance or belief that misrepresents real physical reality." },
            { term: "Enlightenment", icon: "☀️", definition: "Gaining deep understanding, knowledge, and freedom from optical or mental illusions." }
        ],
        inDepth: {
            history: "Plato wrote this allegory in Book VII of 'The Republic' to explain how education frees the human mind from illusion to see true reality.",
            whyItMatters: "It reminds us not to confuse 2D screens, gossip, or simple surface appearances with full 3D reality.",
            funFact: "The movie 'The Matrix' is heavily based on Plato's Cave! Neo escaping the Matrix is like stepping outside the cave into the sun."
        },
        example: "Watching a CGI movie of a dragon on TV is like looking at cave shadows. The movie is a 2D projection, but real life has 3D physics, weather, and real animals!",
        videoId: "1RWOpQXTltA",
        videoQuiz: [
            { question: "What do the dark flickering shadows represent in Plato's Cave?", options: [{ text: "Surface illusions and 2D projections of reality", correct: true }, { text: "Things that are hard to see clearly", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "Shadows vs Real World",
                shortTitle: "Escaping the Cave",
                dilemma: "If someone has spent their whole life watching screen videos of nature, why is stepping into a real forest with fresh air and real weather different?",
                perspectives: {
                    a: { name: "Full 3D Senses", argument: "Real nature engages all 5 senses (smell, touch, weather) in ways no 2D screen can copy." },
                    b: { name: "Digital Convenience", argument: "Videos allow you to explore mountains in far-away countries safely from home." },
                    c: { name: "Both Together", argument: "Use videos to learn map facts first, then explore real nature with your own eyes." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "When has learning the truth changed how you see something?", context: "Talk about discovering how a magic trick works or how an invention is made." }
        ]
    },
    ship_theseus: {
        id: "ship_theseus",
        name: "Ship of Theseus",
        title: "⛵ Ship of Theseus (Identity & Change)",
        avatar: "⛵",
        intro: "If a wooden ship has every single wooden plank replaced one by one over 10 years, is it still the exact same original ship?",
        storyScenes: [
            {
                title: "Scene 1: Rebuilding the Ship",
                heading: "Plank by Plank",
                imageEmoji: "⛵",
                text: "Theseus sailed home on a proud wooden ship. To preserve it in the harbor, citizens replaced old rotten wooden planks one by one every year."
            },
            {
                title: "Scene 2: The 100% Replacement Paradox",
                heading: "Every Single Plank Replaced",
                imageEmoji: "🔨",
                text: "After 20 years, every single plank, sail, mast, and nail had been replaced. 100% of its physical raw materials were brand new!"
            }
        ],
        vocabCards: [
            { term: "Identity", icon: "⛵", definition: "The fact of being who or what a person or thing is over time." },
            { term: "Material Cause", icon: "🪵", definition: "The raw physical matter something is made of (e.g. wood, steel, atoms)." },
            { term: "Formal Cause", icon: "✨", definition: "The design, structure, and continuous identity form of an object." }
        ],
        inDepth: {
            history: "The Greek writer Plutarch wrote this puzzle down around 100 CE in his 'Life of Theseus', saying philosophers of his day already argued about it. About 1,500 years later Thomas Hobbes made it harder by asking what happens if someone rebuilds a second ship out of all the old planks.",
            whyItMatters: "It helps us understand how things (and people!) retain their identity even as their physical parts change over time.",
            funFact: "Some parts of you renew constantly - skin about every month, red blood cells about every 4 months. But some parts are never replaced: most of the neurons in your brain, the clear lenses in your eyes, and most of your heart muscle are the same ones you were born with. So you are partly new and partly original, which makes this puzzle even trickier! (Spalding et al., Cell, 2005)"
        },
        example: "Your skin cells really do renew about every month, so almost none of your skin is the same as when you were 5. Some people say you are still the same person because your memories and your story carry on. Others say the you of age 5 and the you of today are more like two chapters of one book than one unchanging thing. Which answer feels right to you?",
        videoId: "SGAnLY46zAk", // SRF filosofix: Thought experiment THESEUS (English)
        videoQuiz: [
            { question: "Which of these is true about the cells in your body?", options: [{ text: "Some renew often, like skin - but most brain neurons and heart cells stay with you for life", correct: true }, { text: "Every single cell in your body is replaced every 7 years", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "Two Identical Ships",
                shortTitle: "Which Is Real?",
                dilemma: "Every plank of the ship is replaced one by one. Meanwhile someone collects all the old planks and rebuilds them into a second ship. Now there are two. Which one is the real Ship of Theseus?",
                perspectives: {
                    a: { name: "The Repaired One", argument: "It never stopped being the ship. It sat in the same harbour, kept the same name, and was mended bit by bit - like your body replacing its cells." },
                    b: { name: "The Rebuilt One", argument: "It is made of the actual original wood. The other one is a copy that happens to have been made slowly." },
                    c: { name: "Neither, or Both", argument: "Maybe 'the real one' is not a fact waiting to be found - it is a decision people make about which one to care about." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "If everything about you changed slowly over ten years, would you still be you?", context: "Talk about what would have to stay the same for the answer to be yes." }
        ],
        caseStudies: [
            { title: "Grandfather's Axe", text: "You replace the wooden handle twice and the metal head once. Is it still 'Grandfather's Axe'? It carries the same family history and design form!" }
        ],
    },
    trolley_problem: {
        id: "trolley_problem",
        name: "The Trolley Problem",
        title: "🚃 The Trolley Problem (Moral Dilemma)",
        avatar: "🚃",
        intro: "A runaway train trolley is speeding down the tracks toward 5 people. You stand next to a lever. If you pull the lever, the trolley switches to a side track where 1 person is standing. Do you pull the lever?",
        storyScenes: [
            { title: "Scene 1: The Runaway Trolley", heading: "5 People on the Track", imageEmoji: "🚃", text: "A trolley has lost its brakes and is heading toward 5 workers who cannot hear it coming." },
            { title: "Scene 2: The Lever Choice", heading: "Utilitarianism vs Moral Rules", imageEmoji: "🕹️", text: "Utilitarianism (Jeremy Bentham) says: Save 5 lives by sacrificing 1 (5 > 1). Kantian Ethics says: Actively causing harm to an innocent person is morally wrong!" }
        ],
        vocabCards: [
            { term: "Utilitarianism", icon: "📊", definition: "An ethical theory stating that the best action is the one that maximizes overall happiness for the greatest number." },
            { term: "Deontology", icon: "⚖️", definition: "An ethical theory based on strict moral duties and rules, regardless of consequences." }
        ],
        inDepth: { history: "Formulated by Philippa Foot in 1967 and expanded by Judith Jarvis Thomson, it is the world's most famous ethics thought experiment.", whyItMatters: "Self-driving AI cars face this exact programming dilemma today when designing collision avoidance systems!", funFact: "Modern moral psychologists study the Trolley Problem using fMRI brain scans to see how emotions vs logic compete in decision-making!" },
        videoId: "yg16u_bzjPE", videoQuiz: [{ question: "Why do AI self-driving car engineers study the Trolley Problem?", options: [{ text: "To program emergency collision avoidance logic in impossible scenarios", correct: true }, { text: "To decide who is legally to blame after a crash", correct: false }] }],
        p4cInquiry: [
            {
                title: "Doing vs Letting Happen",
                shortTitle: "Acting or Not",
                dilemma: "Pulling the lever saves five people but causes one person's death. Not pulling it means five die and you did nothing. Is there a difference between causing harm and allowing it?",
                perspectives: {
                    a: { name: "There Is a Real Difference", argument: "If you act, you chose it and it is on you. If you stand back, it was already happening. That is why we treat pushing someone very differently from failing to catch them." },
                    b: { name: "No Difference That Matters", argument: "If you could have stopped it and you knew, then choosing not to IS a choice. 'I did nothing' is still something you did." },
                    c: { name: "Depends What It Costs You", argument: "You are more responsible when helping was easy and safe. Not diving into a river you cannot swim in is not the same as not shouting a warning." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Is it worse to break a promise, or to keep one when keeping it hurts someone?", context: "Discuss whether rules should ever bend, and who gets to decide when." },
            { prompt: "Should a self-driving car protect the person inside it, or the people outside?", context: "Talk about who should get to make that decision - the engineer, the buyer, or the government." }
        ],
        caseStudies: [{ title: "Autonomous Vehicle Design", text: "If a self-driving car faces an unavoidable obstacle, should it protect its passenger or pedestrians? Engineers use ethical models to decide!" }],
    },
    experience_machine: {
        id: "experience_machine",
        name: "The Experience Machine",
        title: "🔮 The Experience Machine (Pleasure vs Real Meaning)",
        avatar: "🔮",
        intro: "Philosopher Robert Nozick imagined a virtual reality machine that can simulate any happy experience you want (winning Oscars, flying, eating feast after feast) while floating in a tank. Would you plug in for life?",
        storyScenes: [
            { title: "Scene 1: The Perfect Virtual Reality", heading: "100% Happy Simulations", imageEmoji: "🔮", text: "The machine gives you 100% simulated pleasure and success. But you will never do anything real or connect with real people." }
        ],
        vocabCards: [
            { term: "Hedonism", icon: "🍩", definition: "The belief that pleasure is the ultimate and only goal in life." },
            { term: "Authenticity", icon: "🌟", definition: "Living a genuine, real life with real actions, real struggles, and real accomplishments." }
        ],
        inDepth: { history: "Robert Nozick proposed this thought experiment in 1974 to challenge Hedonism.", whyItMatters: "When Nozick asked people, most said they would NOT plug in - which suggests we want to really do things, not just feel like we did. But here is a twist: when researchers instead told people 'you are already in the machine, want to come out?', most chose to stay in. What we say we want may depend a lot on how the question is asked. (De Brigard, 2010)", funFact: "The Matrix asks a very similar question with its red pill and blue pill - though the film's makers pointed to a different philosopher, Jean Baudrillard, whose book appears on screen in the opening scene!" },
        videoId: "yJ1dsNauhGE", videoQuiz: [{ question: "Why do most people refuse to plug into the Experience Machine for life?", options: [{ text: "Because we value real accomplishments, real relationships, and authentic living", correct: true }, { text: "Because the machine might break down", correct: false }] }],
        p4cInquiry: [
            {
                title: "Real Happiness vs Feeling Happy",
                shortTitle: "The Machine",
                dilemma: "A machine could give you every feeling of a wonderful life - winning, friendship, adventure - but none of it would really be happening. Would you plug in?",
                perspectives: {
                    a: { name: "No, I Want It Real", argument: "I do not just want to FEEL like I have friends, I want to actually have them. A feeling with nothing behind it is missing the point." },
                    b: { name: "Feelings Are What We're After", argument: "Every good thing we chase, we chase because of how it feels. If the feeling is identical, it is genuinely hard to say what is missing." },
                    c: { name: "A Short Visit", argument: "A little while might be fine - like a holiday, or a really good book. It is a whole life in there that seems like the problem." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Would winning a game you knew was rigged in your favour still feel like winning?", context: "Talk about whether the effort is part of the reward, or just the price of it." }
        ],
        caseStudies: [{ title: "Video Games vs Real Life", text: "Winning a trophy in a video game feels fun, but scoring a goal in a real match with real teammates carries deep real-world meaning!" }],
    }
};

function renderSingleExperimentTopic(expKey) {
    const exp = experimentData[expKey] || experimentData['platos_cave'];

    return `
        <div class="spotlight-card">
            <!-- Header Banner -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;">${exp.avatar}</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">${exp.title}</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">Thought Experiment Riddle</span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="fb-action-btn outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="exportStudentWorksheet('${escapeJsString(exp.name)}')">📄 Download Study Worksheet</button>
                    <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">🌀 Thought Experiment</div>
                </div>
            </div>

            <!-- 4-Step Flow Controls -->
            <div class="viz-controls" role="tablist" aria-label="Deep-dive steps" style="margin-bottom: 24px;">
                <button role="tab" aria-selected="true" aria-controls="topicTabContent1" class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Story & Flashcards</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent2" class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. Video & Case Studies</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent3" class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Open P4C Inquiry</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent4" class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Socratic Journal & Vault</button>
            </div>

            <!-- Tab 1: Storybook & Flashcards -->
            <div id="topicTabContent1" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn1" tabindex="0">
                ${renderStorybookReader(exp.id, exp.storyScenes)}
                ${renderVocabularyFlashcards(exp.id, exp.vocabCards)}
                <div style="margin-top: 24px;">
                    <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: In-Depth Video & Case Studies ➔</button>
                </div>
            </div>

            <!-- Tab 2: Video & Case Studies -->
            <div id="topicTabContent2" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn2" tabindex="0" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 14px;">Real-World Example & Video Lesson</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                    <div style="background: rgba(6, 182, 212, 0.08); padding: 16px; border-radius: 12px; border: 1px solid var(--cyan-magic);">
                        <h4 style="color: var(--cyan-magic); margin-bottom: 6px;">📜 Historical Origins</h4>
                        <p style="font-size: 0.92rem; color: var(--text-main); margin:0;">${exp.inDepth.history}</p>
                    </div>
                    <div style="background: rgba(139, 92, 246, 0.08); padding: 16px; border-radius: 12px; border: 1px solid var(--purple-primary);">
                        <h4 style="color: var(--purple-glow); margin-bottom: 6px;">💡 Why It Matters Today</h4>
                        <p style="font-size: 0.92rem; color: var(--text-main); margin:0;">${exp.inDepth.whyItMatters}</p>
                    </div>
                </div>

                <!-- Case Studies Showcase -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--gold-star); font-size: 1.05rem; margin-bottom: 10px;">🔍 Real-World Case Scenarios:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
                        ${(exp.caseStudies || []).map(cs => `
                            <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--gold-star); padding: 14px; border-radius: 10px;">
                                <div style="font-weight: 800; color: var(--gold-star); font-size: 0.95rem; margin-bottom: 4px;">${cs.title}</div>
                                <div style="font-size: 0.88rem; color: var(--text-main);">${cs.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Responsive Embedded YouTube Player -->
                <div style="background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%; border: 2px solid var(--purple-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <iframe src="https://www.youtube-nocookie.com/embed/${exp.videoId}?rel=0" title="${exp.title}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                ${renderVideoQuizComponent(exp.id, exp.videoQuiz)}

                <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-top: 20px;">
                    <a href="https://www.youtube.com/watch?v=${exp.videoId}" target="_blank" rel="noopener noreferrer" class="fb-action-btn outline" style="text-decoration:none;">▶ Watch Full Lesson Video on YouTube (New Tab)</a>
                    <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Try Open P4C Inquiry ➔</button>
                </div>
            </div>

            <!-- Tab 3: Open P4C Dialectic Inquiry -->
            <div id="topicTabContent3" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn3" tabindex="0" style="display:none;">
                ${typeof renderP4CInquiryEngine === 'function' ? renderP4CInquiryEngine(exp.id, exp.p4cInquiry) : ''}
            </div>

            <!-- Tab 4: Socratic Discussion Journal & Upgrade Vault -->
            <div id="topicTabContent4" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn4" tabindex="0" style="display:none;">
                ${typeof renderSocraticDiscussionJournal === 'function' ? renderSocraticDiscussionJournal(exp.id, exp.name, exp.avatar, exp.discussionPrompts) : ''}

                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest an Upgrade</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about ${exp.name} or an idea to upgrade this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_${exp.id}" class="sandbox-input" aria-label="Type of message" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_${exp.id}" class="sandbox-input" aria-label="Your question or idea" placeholder="Type your question or suggestion here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('${exp.id}', '${escapeJsString(exp.name)}', '${exp.avatar}')">Submit to Upgrade Vault</button>
                    
                    <div id="feedbackResult_${exp.id}" role="status" aria-live="polite" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for ${exp.name}:</h4>
                <div id="savedFeedbackList_${exp.id}">
                    <!-- Dynamically populated by feedback_vault.js -->
                </div>
            </div>
        </div>
    `;
}

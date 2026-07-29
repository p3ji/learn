// Interactive 15-Minute Tab Engine: Storybook, Flashcards, Video Quiz, 3-Level Game & Avatar Chatbot

let activeStorySlide = {};
let activeGameLevel = {};
let gameScores = {};

// Web Audio Sound FX & Speech Synthesis Engine
function speakStoryText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

function playVictoryChime() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.error(e);
    }
}

// 1. Storybook Reader Component
function renderStorybookReader(topicId, scenes) {
    if (!scenes || scenes.length === 0) return '';
    if (activeStorySlide[topicId] === undefined) activeStorySlide[topicId] = 0;
    const currentIdx = activeStorySlide[topicId];
    const sc = scenes[currentIdx];

    // Thinkers get a drawn portrait; other topics keep the scene emoji.
    const portrait = (typeof renderThinkerPortrait === 'function' &&
                      typeof PORTRAIT_SPEC !== 'undefined' && PORTRAIT_SPEC[topicId])
        ? renderThinkerPortrait(topicId, 180)
        : '';

    return `
        <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--purple-primary); border-radius: 20px; padding: 24px; margin-bottom: 24px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <span class="nb-badge" style="background: var(--purple-primary); color: #FFF; font-size: 0.82rem;">
                    📖 Story Scene ${currentIdx + 1} of ${scenes.length}: ${sc.title}
                </span>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button class="fb-action-btn outline" style="padding: 4px 10px; font-size: 0.8rem;" onclick="speakStoryText('${escapeJsString(sc.text + (sc.factBox ? ' How we know: ' + sc.factBox : ''))}')">🔊 Read Aloud</button>
                    <span style="color: var(--gold-star); font-weight: 800; font-size: 0.9rem;">Slide ${currentIdx + 1}/${scenes.length}</span>
                </div>
            </div>

            <div class="story-scene-grid" style="display: grid; grid-template-columns: 180px 1fr; gap: 22px; align-items: start; background: rgba(0,0,0,0.4); padding: 20px; border-radius: 16px; margin-bottom: 20px;">
                <div class="story-scene-figure">
                    ${portrait || `<div style="font-size: 4rem; text-align: center;" aria-hidden="true">${sc.imageEmoji}</div>`}
                </div>
                <div>
                    <h4 style="color: var(--gold-star); font-size: 1.25rem; margin-bottom: 10px;">
                        <span aria-hidden="true">${sc.imageEmoji}</span> ${sc.heading}
                    </h4>
                    <p style="color: var(--text-main); font-size: 1.08rem; line-height: 1.65; margin: 0;">${sc.text}</p>
                    ${sc.factBox ? `
                        <div style="margin-top: 14px; background: rgba(6,182,212,0.09); border-left: 3px solid var(--cyan-magic); border-radius: 10px; padding: 11px 14px;">
                            <div style="color: var(--cyan-magic); font-weight: 800; font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 3px;">How we know</div>
                            <div style="color: var(--text-main); font-size: 0.95rem; line-height: 1.55;">${sc.factBox}</div>
                        </div>` : ''}
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
                <button class="fb-action-btn outline" ${currentIdx === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="changeStorySlide('${topicId}', -1)">◀ Previous Scene</button>
                <div style="display: flex; gap: 6px;">
                    ${scenes.map((_, i) => `
                        <span style="width: 12px; height: 12px; border-radius: 50%; background: ${i === currentIdx ? 'var(--gold-star)' : 'rgba(255,255,255,0.2)'}; display: inline-block;"></span>
                    `).join('')}
                </div>
                <button class="fb-action-btn gold" ${currentIdx === scenes.length - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} onclick="changeStorySlide('${topicId}', 1)">Next Scene ▶</button>
            </div>
        </div>
    `;
}

function changeStorySlide(topicId, delta) {
    if (activeStorySlide[topicId] === undefined) activeStorySlide[topicId] = 0;
    activeStorySlide[topicId] += delta;
    if (typeof markDailyQuest === 'function') markDailyQuest('story');
    if (typeof renderActiveTopicStage === 'function') renderActiveTopicStage();
}

// 2. Interactive Vocabulary Flashcard Component
function renderVocabularyFlashcards(topicId, vocabList) {
    if (!vocabList || vocabList.length === 0) return '';

    return `
        <div style="margin-top: 24px;">
            <h4 style="color: var(--cyan-magic); font-size: 1.15rem; margin-bottom: 14px;">🎴 Key Vocabulary Flashcards (Click Card to Flip!):</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                ${vocabList.map((v, i) => `
                    <div class="vocab-card" id="vocabCard_${topicId}_${i}" role="button" tabindex="0" aria-label="Flashcard: ${escapeHtml(v.term)}. Activate to flip." onclick="flipVocabCard('${topicId}', ${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();flipVocabCard('${topicId}', ${i});}" style="background: rgba(6, 182, 212, 0.08); border: 1.5px solid var(--cyan-magic); border-radius: 16px; padding: 20px; cursor: pointer; min-height: 140px; display: flex; flex-direction: column; justify-content: center; text-align: center; transition: all 0.3s ease;">
                        <div id="vocabFront_${topicId}_${i}">
                            <div style="font-size: 2rem; margin-bottom: 6px;">${v.icon}</div>
                            <div style="font-weight: 800; color: #FFF; font-size: 1.1rem;">${v.term}</div>
                            <div style="font-size: 0.78rem; color: var(--cyan-magic); margin-top: 6px; text-transform: uppercase;">🔄 Click to Flip</div>
                        </div>
                        <div id="vocabBack_${topicId}_${i}" style="display: none;">
                            <div style="color: var(--gold-star); font-weight: 700; font-size: 0.95rem; margin-bottom: 6px;">${v.term}</div>
                            <div style="font-size: 0.88rem; color: var(--text-main); line-height: 1.4;">${v.definition}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function flipVocabCard(topicId, idx) {
    const front = document.getElementById(`vocabFront_${topicId}_${idx}`);
    const back = document.getElementById(`vocabBack_${topicId}_${idx}`);
    const card = document.getElementById(`vocabCard_${topicId}_${idx}`);

    if (front && back && card) {
        if (front.style.display === 'none') {
            front.style.display = 'block';
            back.style.display = 'none';
            card.style.background = 'rgba(6, 182, 212, 0.08)';
        } else {
            front.style.display = 'none';
            back.style.display = 'block';
            card.style.background = 'rgba(245, 158, 11, 0.15)';
        }
    }
}

// 3. Video Quiz & Guided Note-Taking Component
function renderVideoQuizComponent(topicId, videoQuizData) {
    if (!videoQuizData || videoQuizData.length === 0) return '';

    return `
        <div style="background: rgba(0,0,0,0.5); border: 1.5px solid var(--purple-primary); border-radius: 16px; padding: 20px; margin-top: 24px;">
            <h4 style="color: var(--gold-star); font-size: 1.1rem; margin-bottom: 12px;">📝 Video Guided Quiz & Note-Pad</h4>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px;">Test what you noticed during the video lesson!</p>

            ${videoQuizData.map((q, i) => `
                <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 14px; margin-bottom: 14px;">
                    <div style="font-weight: 800; color: #FFF; font-size: 0.98rem; margin-bottom: 10px;">Q${i + 1}: ${q.question}</div>
                    <div class="fallacy-options">
                        ${q.options.map((opt, optIdx) => `
                            <button class="fallacy-opt-btn" onclick="checkVideoQuizAnswer('${topicId}', ${i}, ${optIdx}, ${opt.correct})">${opt.text}</button>
                        `).join('')}
                    </div>
                    <div id="videoQuizFeedback_${topicId}_${i}" role="status" aria-live="polite" aria-atomic="true" style="display:none; margin-top: 10px; padding: 10px; border-radius: 8px; font-weight: 700; font-size: 0.9rem;"></div>
                </div>
            `).join('')}
        </div>
    `;
}

// Questions already paid out, so re-clicking a correct answer cannot farm XP.
const awardedVideoQuiz = new Set();

function checkVideoQuizAnswer(topicId, qIdx, optIdx, isCorrect) {
    const feedback = document.getElementById(`videoQuizFeedback_${topicId}_${qIdx}`);
    if (!feedback) return;
    feedback.style.display = 'block';

    if (isCorrect) {
        const awardKey = `${topicId}_${qIdx}`;
        const isFirstCorrect = !awardedVideoQuiz.has(awardKey);
        feedback.style.background = 'rgba(16, 185, 129, 0.2)';
        feedback.style.border = '1px solid var(--green-hero)';
        feedback.style.color = 'var(--green-hero)';
        feedback.innerHTML = '🎉 CORRECT! Nice noticing.' + (isFirstCorrect ? ' (+10 XP)' : '');
        if (isFirstCorrect) {
            awardedVideoQuiz.add(awardKey);
            if (typeof addXP === 'function') addXP(10);
        }
    } else {
        feedback.style.background = 'rgba(239, 68, 68, 0.2)';
        feedback.style.border = '1px solid #EF4444';
        feedback.style.color = '#EF4444';
        feedback.innerHTML = '❌ Not quite! Re-watch the video segment and try again!';
    }
}

// P4C Reflection Journal Storage Manager
function getP4CJournal() {
    return JSON.parse(localStorage.getItem('kids_p4c_journal') || '{}');
}

function saveP4CJournalEntry(key, entryData) {
    const journal = getP4CJournal();
    journal[key] = entryData;
    localStorage.setItem('kids_p4c_journal', JSON.stringify(journal));
}

function switchGameLevel(topicId, lvlIdx) {
    activeGameLevel[topicId] = lvlIdx;
    if (typeof renderActiveTopicStage === 'function') renderActiveTopicStage();
}

// 4. Philosophy for Children (P4C) Open Dialectic Inquiry Engine
function renderP4CInquiryEngine(topicId, inquiryData) {
    if (!inquiryData || inquiryData.length === 0) return '';
    if (activeGameLevel[topicId] === undefined) activeGameLevel[topicId] = 0;
    const currentIdx = activeGameLevel[topicId];
    const item = inquiryData[currentIdx];
    const journal = getP4CJournal();
    const storageKey = `ref_${topicId}_${currentIdx}`;
    const savedEntry = journal[storageKey] || { choice: '', text: '' };

    return `
        <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--pink-energy); border-radius: 20px; padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 2rem;">⚖️</span>
                    <div>
                        <h4 style="color: var(--pink-energy); font-size: 1.2rem; margin:0;">Inquiry ${currentIdx + 1}: ${item.title}</h4>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Open Philosophical Dialectic (No Single Right Answer)</span>
                    </div>
                </div>
                ${savedEntry.text ? '<span class="nb-badge" style="background: var(--green-hero); color: #FFF; font-size: 0.8rem;">✓ Reflection Saved</span>' : ''}
            </div>

            <!-- Level Selector Pills -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                ${inquiryData.map((l, i) => `
                    <button class="viz-step-btn ${i === currentIdx ? 'active' : ''}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="switchGameLevel('${topicId}', ${i})">
                        Scenario ${i + 1}: ${l.shortTitle}
                    </button>
                `).join('')}
            </div>

            <!-- Dialectic Scenario Box -->
            <div style="background: rgba(0,0,0,0.4); border-radius: 16px; padding: 20px; margin-bottom: 18px;">
                <div style="color: var(--gold-star); font-weight: 800; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 6px;">Philosophical Dilemma:</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: #FFF; margin-bottom: 16px; line-height: 1.5;">"${item.dilemma}"</div>
                
                <!-- 3 Perspectives + Still Thinking Option -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 18px;">
                    <div style="background: rgba(6, 182, 212, 0.1); border: 1.5px solid var(--cyan-magic); padding: 14px; border-radius: 14px;">
                        <div style="font-weight: 800; color: var(--cyan-magic); font-size: 0.95rem; margin-bottom: 4px;">Perspective A: ${item.perspectives.a.name}</div>
                        <p style="font-size: 0.88rem; color: var(--text-main); margin: 0; line-height: 1.4;">${item.perspectives.a.argument}</p>
                    </div>
                    <div style="background: rgba(139, 92, 246, 0.1); border: 1.5px solid var(--purple-primary); padding: 14px; border-radius: 14px;">
                        <div style="font-weight: 800; color: var(--purple-glow); font-size: 0.95rem; margin-bottom: 4px;">Perspective B: ${item.perspectives.b.name}</div>
                        <p style="font-size: 0.88rem; color: var(--text-main); margin: 0; line-height: 1.4;">${item.perspectives.b.argument}</p>
                    </div>
                    <div style="background: rgba(245, 158, 11, 0.1); border: 1.5px solid var(--gold-star); padding: 14px; border-radius: 14px;">
                        <div style="font-weight: 800; color: var(--gold-star); font-size: 0.95rem; margin-bottom: 4px;">Perspective C: ${item.perspectives.c ? item.perspectives.c.name : "A Different Idea!"}</div>
                        <p style="font-size: 0.88rem; color: var(--text-main); margin: 0; line-height: 1.4;">${item.perspectives.c ? item.perspectives.c.argument : "I have a different angle or combination of ideas!"}</p>
                    </div>
                </div>

                <!-- Perspective Selection & Open Reflection Prompt -->
                <div style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px dashed rgba(255,255,255,0.2);">
                    <label id="lbl_p4cChoice_${topicId}_${currentIdx}" for="p4cChoice_${topicId}_${currentIdx}" style="color: var(--cyan-magic); font-weight: 800; font-size: 0.92rem; display: block; margin-bottom: 8px;">
                        1. Which perspective do you lean toward?
                    </label>
                    <select id="p4cChoice_${topicId}_${currentIdx}" class="sandbox-input" style="width: 100%; margin-bottom: 12px;">
                        <option value="Perspective A" ${savedEntry.choice === 'Perspective A' ? 'selected' : ''}>Perspective A: ${item.perspectives.a.name}</option>
                        <option value="Perspective B" ${savedEntry.choice === 'Perspective B' ? 'selected' : ''}>Perspective B: ${item.perspectives.b.name}</option>
                        <option value="Perspective C" ${savedEntry.choice === 'Perspective C' ? 'selected' : ''}>Perspective C: ${item.perspectives.c ? item.perspectives.c.name : "A Different Idea!"}</option>
                        <option value="Still Thinking" ${savedEntry.choice === 'Still Thinking' ? 'selected' : ''}>🤔 Still Thinking / It Depends!</option>
                    </select>

                    <label id="lbl_p4cReflection_${topicId}_${currentIdx}" for="p4cReflection_${topicId}_${currentIdx}" style="color: var(--gold-star); font-weight: 800; font-size: 0.92rem; display: block; margin-bottom: 8px;">
                        2. Explain your reasoning in your own words:
                    </label>
                    <textarea id="p4cReflection_${topicId}_${currentIdx}" class="sandbox-input" rows="3" placeholder="Type your reasoned perspective here..." style="width: 100%; margin-bottom: 12px;">${escapeHtml(savedEntry.text || '')}</textarea>
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="fb-action-btn gold" onclick="submitP4CReflection('${topicId}', ${currentIdx}, '${escapeJsString(item.title)}')">Save Reflection to Journal ✨</button>
                        <button class="fb-action-btn outline" onclick="exportStudentReflectionJournal()">📄 Export Journal for Parents & Teachers</button>
                    </div>
                </div>
            </div>

            <div id="p4cJournalFeedback_${topicId}" role="status" aria-live="polite" aria-atomic="true" style="${savedEntry.text ? 'display:block;' : 'display:none;'} padding: 14px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); border: 1.5px solid var(--green-hero); color: #FFF; font-weight: 700; font-size: 0.92rem; margin-top: 14px;">
                ${savedEntry.text ? `✍️ <strong>Saved in Journal:</strong> "${escapeHtml(savedEntry.text)}"` : ''}
            </div>
        </div>
    `;
}

function submitP4CReflection(topicId, idx, scenarioTitle) {
    const choiceSelect = document.getElementById(`p4cChoice_${topicId}_${idx}`);
    const input = document.getElementById(`p4cReflection_${topicId}_${idx}`);
    const feedback = document.getElementById(`p4cJournalFeedback_${topicId}`);
    if (!input || !feedback) return;

    const userText = input.value.trim();
    const userChoice = choiceSelect ? choiceSelect.value : 'Perspective A';

    // Every save needs a reason, including "Still Thinking" - saying WHY something
    // is hard to decide is philosophy, and a blank save is what used to mint the
    // certificate for nothing.
    if (!userText) {
        feedback.style.display = 'block';
        feedback.setAttribute('role', 'alert');
        feedback.style.background = 'rgba(239, 68, 68, 0.15)';
        feedback.style.border = '1.5px solid #F87171';
        feedback.style.color = '#F87171';
        feedback.textContent = userChoice === 'Still Thinking'
            ? "That's a great answer! Write one line about what makes it hard to decide."
            : 'Write one sentence about why you picked that, then save.';
        input.focus();
        return;
    }

    const storageKey = `ref_${topicId}_${idx}`;
    const journal = getP4CJournal();
    const isNewSubmission = !journal[storageKey] || !journal[storageKey].text;

    saveP4CJournalEntry(storageKey, {
        topicId: topicId,
        scenarioIdx: idx,
        scenarioTitle: scenarioTitle || `Scenario ${idx + 1}`,
        choice: userChoice,
        text: userText,
        timestamp: new Date().toLocaleDateString()
    });

    feedback.style.display = 'block';
    feedback.removeAttribute('role');
    feedback.style.background = 'rgba(16, 185, 129, 0.15)';
    feedback.style.border = '1.5px solid var(--green-hero)';
    feedback.style.color = '#FFF';
    // Writing is the most valuable thing a child does here, so it pays the most.
    feedback.innerHTML = `✍️ <strong>Reflection saved to your journal.</strong> Saved under '${escapeHtml(userChoice)}'. ${isNewSubmission ? '(+100 XP)' : '(Updated)'}`;

    if (isNewSubmission && typeof addXP === 'function') {
        addXP(100);
    }
    if (typeof markDailyQuest === 'function') markDailyQuest('reflect');
}

// 5. Honest Socratic Discussion Journal Component
function renderSocraticDiscussionJournal(topicId, thinkerName, avatarEmoji, discussionPrompts) {
    const journal = getP4CJournal();
    const savedQuestionKey = `soc_q_${topicId}`;
    const savedQ = journal[savedQuestionKey] || '';

    return `
        <div style="background: rgba(15, 23, 42, 0.9); border: 2px solid var(--cyan-magic); border-radius: 20px; padding: 24px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
                <div style="font-size: 2.8rem; background: rgba(0,0,0,0.4); padding: 8px 14px; border-radius: 16px;">${avatarEmoji}</div>
                <div>
                    <h4 style="color: var(--cyan-magic); font-size: 1.2rem; margin:0;">Socratic Inquiry Journal: ${thinkerName}</h4>
                    <span style="color: var(--text-muted); font-size: 0.85rem;">Deep questions to discuss with a parent, teacher, or friend!</span>
                </div>
            </div>

            <!-- Deep Discussion Prompts -->
            <div style="background: rgba(0,0,0,0.4); border-radius: 14px; padding: 18px; margin-bottom: 18px;">
                <h5 style="color: var(--gold-star); font-size: 0.98rem; margin-bottom: 10px;">💬 Open Discussion Questions:</h5>
                <ul style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0; padding-left: 20px;">
                    ${(discussionPrompts || []).map(dp => `<li style="margin-bottom: 8px;"><strong>"${dp.prompt}"</strong><br><span style="color: var(--text-muted); font-size: 0.88rem;">${dp.context}</span></li>`).join('')}
                </ul>
            </div>

            <!-- Question Box for Parent/Teacher Discussion -->
            <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid var(--cyan-magic); border-radius: 14px; padding: 16px;">
                <label id="lbl_socraticQuestionInput_${topicId}" for="socraticQuestionInput_${topicId}" style="color: var(--cyan-magic); font-weight: 800; font-size: 0.92rem; display: block; margin-bottom: 8px;">
                    📝 Write down a question you would like to explore with a parent or teacher:
                </label>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <input type="text" id="socraticQuestionInput_${topicId}" class="sandbox-input" value="${escapeHtml(savedQ)}" placeholder="Type your question here..." style="flex:1;">
                    <button class="fb-action-btn gold" onclick="saveSocraticQuestion('${topicId}')">Save Question</button>
                </div>
                <div id="socraticSaveFeedback_${topicId}" role="status" aria-live="polite" style="${savedQ ? 'display:block;' : 'display:none;'} margin-top: 10px; color: var(--green-hero); font-weight: 700; font-size: 0.88rem;">
                    ${savedQ ? `✓ Saved: "${escapeHtml(savedQ)}"` : ''}
                </div>
            </div>
        </div>
    `;
}

function saveSocraticQuestion(topicId) {
    const input = document.getElementById(`socraticQuestionInput_${topicId}`);
    const feedback = document.getElementById(`socraticSaveFeedback_${topicId}`);
    if (!input || !feedback) return;

    const text = input.value.trim();
    if (!text) {
        feedback.style.display = 'block';
        feedback.setAttribute('role', 'alert');
        feedback.style.color = '#F87171';
        feedback.textContent = 'Type your question first, then save it.';
        input.focus();
        return;
    }
    feedback.removeAttribute('role');
    feedback.style.color = 'var(--green-hero)';

    const savedQuestionKey = `soc_q_${topicId}`;
    const journal = getP4CJournal();
    const isNew = !journal[savedQuestionKey];

    saveP4CJournalEntry(savedQuestionKey, text);

    feedback.style.display = 'block';
    feedback.innerText = `✓ Question saved to your journal! Take this question to a parent, teacher, or friend to discuss together. ${isNew ? '(+50 XP)' : ''}`;

    if (isNew && typeof addXP === 'function') {
        addXP(50);
    }
    if (typeof markDailyQuest === 'function') markDailyQuest('question');
}

// Counts only real written reflections - not saved questions, not blank saves.
// This is what the certificate is allowed to gate on.
function countWrittenReflections() {
    const journal = getP4CJournal();
    return Object.keys(journal).filter(k => {
        const e = journal[k];
        return k.startsWith('ref_') && e && typeof e === 'object' &&
               typeof e.text === 'string' && e.text.trim().length >= 15;
    }).length;
}

// Export Full Printable Parent / Teacher Reflection Journal
function exportStudentReflectionJournal() {
    const journal = getP4CJournal();
    const keys = Object.keys(journal);
    const activeUser = (typeof currentProfile !== 'undefined' && currentProfile.username) ? currentProfile.username : 'Cadet Thinker';

    let markdown = `# Philosopher's Quest - Student Reflection & Discussion Journal\n`;
    markdown += `**Cadet Thinker**: ${activeUser}\n`;
    markdown += `**Export Date**: ${new Date().toLocaleDateString()}\n\n`;
    markdown += `---\n\n`;
    markdown += `## 📜 Saved Student Journal Reflections & Questions\n\n`;

    if (keys.length === 0) {
        markdown += `*No reflections or questions saved yet. Complete a P4C Inquiry or Socratic Prompt to build your reflection journal!*\n`;
    } else {
        keys.forEach(k => {
            const entry = journal[k];
            if (typeof entry === 'object') {
                markdown += `### Topic: ${entry.topicId.toUpperCase()} - ${entry.scenarioTitle}\n`;
                markdown += `- **Selected Stance**: ${entry.choice}\n`;
                markdown += `- **Reasoned Reflection**: "${entry.text}"\n`;
                markdown += `- **Date Saved**: ${entry.timestamp}\n\n`;
            } else {
                markdown += `### Question for Parent/Teacher (${k.replace('soc_q_', '').toUpperCase()}):\n`;
                markdown += `- **Question**: "${entry}"\n\n`;
            }
        });
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeUser.replace(/\s+/g, '_')}_Reflection_Journal.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 6. Downloadable Student Study Worksheet Generator
function exportStudentWorksheet(topicName) {
    const activeUser = (typeof currentProfile !== 'undefined' && currentProfile.username) ? currentProfile.username : 'Cadet Thinker';
    const textContent = `# Philosopher's Quest - Student Reflection Worksheet
Topic: ${topicName}
Student Cadet: ${activeUser}
Date: ${new Date().toLocaleDateString()}

---

## 1. Core Learning Reflection
- What is the main superpower or big idea of ${topicName}?
  [ Write your thoughts here ]

## 2. Real-World Application
- Describe a situation in your own life (at school, home, or with friends) where you can use this superpower:
  [ Write your response here ]

## 3. Critical Question
- What is one question you still want to explore about ${topicName}?
  [ Write your question here ]

---
Generated via Philosopher's Quest & Mental Models Suite
`;

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(textContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${topicName.toLowerCase().replace(/\s+/g, '_')}_student_worksheet.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function openGoldenCertificateModal() {
    let modal = document.getElementById('goldenCertificateModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'goldenCertificateModal';
        modal.className = 'concept-modal-overlay';
        document.body.appendChild(modal);
    }

    const journal = getP4CJournal();
    const activeUser = (typeof currentProfile !== 'undefined' && currentProfile.username) ? currentProfile.username : 'Cadet Thinker';

    // Only real written reflections count. A dropdown selection is not a reflection.
    const written = Object.keys(journal)
        .filter(k => k.startsWith('ref_'))
        .map(k => journal[k])
        .filter(e => e && typeof e === 'object' && typeof e.text === 'string' && e.text.trim().length >= 15);
    const topics = new Set(written.map(e => e.topicId));
    const questions = Object.keys(journal).filter(k => k.startsWith('soc_q_')).map(k => journal[k]);

    if (written.length === 0) {
        modal.innerHTML = `
            <div class="concept-modal-card" style="max-width: 560px; text-align: center;">
                <button class="concept-modal-close" onclick="document.getElementById('goldenCertificateModal').style.display='none'">&times;</button>
                <div style="font-size: 3.5rem; margin-bottom: 8px;" aria-hidden="true">📓</div>
                <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.6rem; font-weight: 900; margin-bottom: 8px;">Your Reflection Portfolio</h2>
                <p style="color: var(--text-main); font-size: 1rem; line-height: 1.6; margin-bottom: 20px;">
                    Nothing here yet. Open any topic, go to <strong>Open Inquiry</strong>, pick the idea you find
                    most convincing and write a line about why. Your writing gets collected here so you can
                    read it back and talk it over with someone.
                </p>
                <button class="fb-action-btn gold" onclick="document.getElementById('goldenCertificateModal').style.display='none'">Go and think about something ➔</button>
            </div>
        `;
    } else {
        modal.innerHTML = `
            <div class="concept-modal-card" style="max-width: 700px; max-height: 88vh; overflow-y: auto; background: radial-gradient(circle at center, #1E293B, #0F172A) !important; border: 3px solid var(--gold-star) !important;">
                <button class="concept-modal-close" onclick="document.getElementById('goldenCertificateModal').style.display='none'">&times;</button>

                <div style="text-align:center;">
                    <div style="font-size: 3rem; margin-bottom: 8px;" aria-hidden="true">📓</div>
                    <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.7rem; font-weight: 900; margin-bottom: 4px;">Reflection Portfolio</h2>
                    <p style="color: var(--cyan-magic); font-size: 0.9rem; font-weight: 700; margin-bottom: 20px;">A record of work — not a grade.</p>
                </div>

                <div style="background: rgba(255,255,255,0.03); border: 1.5px dashed var(--gold-star); padding: 22px; border-radius: 16px; margin-bottom: 20px;">
                    <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.6; margin: 0 0 6px;">
                        <strong style="color:#FFF;">${escapeHtml(activeUser)}</strong> has written
                        <strong style="color: var(--gold-star);">${written.length}</strong>
                        reflection${written.length === 1 ? '' : 's'} across
                        <strong style="color: var(--gold-star);">${topics.size}</strong>
                        topic${topics.size === 1 ? '' : 's'}${questions.length ? `, and saved <strong style="color: var(--gold-star);">${questions.length}</strong> question${questions.length === 1 ? '' : 's'} to discuss` : ''}.
                    </p>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">
                        Their own words are below. Reading these together is worth more than any score.
                    </p>
                </div>

                <div style="text-align:left; margin-bottom: 20px;">
                    ${written.map(e => `
                        <div style="background: rgba(0,0,0,0.35); border-left: 4px solid var(--cyan-magic); border-radius: 10px; padding: 14px 16px; margin-bottom: 12px;">
                            <div style="color: var(--cyan-magic); font-weight: 800; font-size: 0.85rem; margin-bottom: 2px;">${escapeHtml(e.scenarioTitle)}</div>
                            <div style="color: var(--text-muted); font-size: 0.78rem; margin-bottom: 8px;">Leaned towards: ${escapeHtml(e.choice)} &middot; ${escapeHtml(e.timestamp)}</div>
                            <div style="color: #FFF; font-size: 0.98rem; line-height: 1.6;">&ldquo;${escapeHtml(e.text)}&rdquo;</div>
                        </div>
                    `).join('')}
                    ${questions.length ? `
                        <h3 style="color: var(--gold-star); font-size: 1rem; margin: 18px 0 8px;">Questions they want to talk about</h3>
                        ${questions.map(q => `
                            <div style="background: rgba(6,182,212,0.08); border-left: 4px solid var(--gold-star); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; color:#FFF; font-size: 0.95rem;">
                                &ldquo;${escapeHtml(q)}&rdquo;
                            </div>
                        `).join('')}
                    ` : ''}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${new Date().toLocaleDateString()}</span>
                    <div style="display:flex; gap:10px;">
                        <button class="fb-action-btn outline" onclick="exportStudentReflectionJournal()">💾 Save for a grown-up</button>
                        <button class="fb-action-btn gold" onclick="window.print()">🖨️ Print</button>
                    </div>
                </div>
            </div>
        `;
    }

    modal.style.display = 'flex';
}


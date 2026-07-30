// Practice Range — short graded drills, one set per craft technique.
//
// Two question types:
//   choice  — pick the strongest option. Graded exactly.
//   rewrite — the child rewrites a sentence. Graded by rule, not by "correct
//             answer": we can check that the banned words are gone, that the
//             sentence actually changed, and that required elements appeared.
//             Anything a rule cannot judge is praised rather than marked wrong,
//             because discouraging a real attempt costs far more than a lenient
//             tick.

const DRILL_SETS = [
    {
        id: 'strong_verbs',
        icon: '💪',
        title: 'Strong Verbs',
        badge: 'strong_verbs',
        blurb: 'Swap tired verbs for ones that show a picture.',
        questions: [
            {
                type: 'choice',
                prompt: 'The wolf ___ across the snow towards them.',
                options: ['went quickly', 'moved fast', 'loped', 'walked in a fast way'],
                answer: 2,
                why: '"Loped" is one word that shows the exact way a wolf moves. The others need extra words and still show less.'
            },
            {
                type: 'choice',
                prompt: 'Which sentence is strongest?',
                options: [
                    'She looked at the letter very carefully.',
                    'She studied the letter.',
                    'She looked at the letter in a careful way.',
                    'She really carefully looked at the letter.'
                ],
                answer: 1,
                why: '"Studied" already contains "carefully". When the verb does the work, the adverbs can go.'
            },
            {
                type: 'rewrite',
                prompt: 'Rewrite without any "-ly" words:',
                text: 'He ran quickly down the stairs and shut the door loudly.',
                banned: ['quickly', 'loudly'],
                why: 'Something like: "He bolted down the stairs and slammed the door." Two strong verbs replaced two weak verbs plus two adverbs.'
            },
            {
                type: 'choice',
                prompt: 'Which verb shows someone is nervous WITHOUT saying so?',
                options: ['walked', 'hovered', 'was nervous', 'went nervously'],
                answer: 1,
                why: '"Hovered" shows the hesitation. The reader works it out themselves, which is what makes it satisfying.'
            },
            {
                type: 'rewrite',
                prompt: 'Replace the weak verb "got":',
                text: 'She got the key from the table and got out of the room.',
                banned: ['got'],
                why: 'Try: "She snatched the key from the table and slipped out of the room." Each "got" was hiding a different action.'
            }
        ]
    },
    {
        id: 'show_dont_tell',
        icon: '🎬',
        title: 'Show, Don\'t Tell',
        badge: 'show_dont_tell',
        blurb: 'Turn stated feelings into things a camera could film.',
        questions: [
            {
                type: 'choice',
                prompt: 'Which one SHOWS that Theo is scared?',
                options: [
                    'Theo was very scared.',
                    'Theo felt scared and afraid.',
                    'Theo counted the steps back to the door without looking away from the shape.',
                    'Theo was scared, which is a bad feeling.'
                ],
                answer: 2,
                why: 'Nothing in that sentence names fear — and that is exactly why the reader feels it.'
            },
            {
                type: 'rewrite',
                prompt: 'Rewrite so the word "sad" never appears:',
                text: 'Nina was sad when her friend moved away.',
                banned: ['sad', 'upset', 'unhappy'],
                why: 'Try: "Nina kept the goodbye card in her pocket for three weeks." Objects and habits carry feelings brilliantly.'
            },
            {
                type: 'choice',
                prompt: 'Which detail best shows a house has been empty a long time?',
                options: [
                    'The house was old and empty.',
                    'Nobody had lived there for years.',
                    'A spider had built across the whole doorway, and nothing had broken it.',
                    'It was a very abandoned house.'
                ],
                answer: 2,
                why: 'One specific detail proves the fact. Stating the fact just asks the reader to take your word for it.'
            },
            {
                type: 'rewrite',
                prompt: 'Show excitement without the word "excited":',
                text: 'Ben was excited about the trip.',
                banned: ['excited', 'exciting', 'happy'],
                why: 'Try: "Ben had packed his bag four days early, then unpacked it to check, then packed it again."'
            },
            {
                type: 'choice',
                prompt: 'Which sentence trusts the reader most?',
                options: [
                    'She smiled, because she was pleased with herself.',
                    'She smiled.',
                    'She smiled a pleased and happy smile.',
                    'She was pleased, so she smiled happily.'
                ],
                answer: 1,
                why: 'The explanation was doing nothing. Readers are clever — let them be.'
            }
        ]
    },
    {
        id: 'punctuating_dialogue',
        icon: '❝',
        title: 'Dialogue Punctuation',
        badge: 'dialogue_pro',
        blurb: 'The five small rules that make dialogue look professional.',
        questions: [
            {
                type: 'choice',
                prompt: 'Which is punctuated correctly?',
                options: [
                    '"I found it." said Leo.',
                    '"I found it", said Leo.',
                    '"I found it," said Leo.',
                    '"I found it" said Leo.'
                ],
                answer: 2,
                why: 'A comma, inside the speech marks, before the "said". That is the whole rule.'
            },
            {
                type: 'choice',
                prompt: 'Which is correct?',
                options: [
                    '"Where are you going"? asked Mia.',
                    '"Where are you going?" asked Mia.',
                    '"Where are you going?", asked Mia.',
                    '"Where are you going," asked Mia?'
                ],
                answer: 1,
                why: 'The question mark belongs to the speech, so it goes inside — and it replaces the comma.'
            },
            {
                type: 'choice',
                prompt: 'Two characters are talking. When do you start a new paragraph?',
                options: [
                    'Every five lines.',
                    'Never — keep dialogue together.',
                    'Every time the speaker changes.',
                    'Only when the topic changes.'
                ],
                answer: 2,
                why: 'New speaker, new paragraph. This single rule fixes most confusing dialogue.'
            },
            {
                type: 'choice',
                prompt: 'Which one is best?',
                options: [
                    '"Get down!" he exclaimed loudly.',
                    '"Get down!" he shouted.',
                    '"Get down!" he vociferated.',
                    '"Get down!" he said in a loud voice.'
                ],
                answer: 1,
                why: 'The exclamation mark already shouts. One clear verb, no adverb, no thesaurus showing off.'
            },
            {
                type: 'rewrite',
                prompt: 'Fix the punctuation:',
                text: '"Are you coming" asked Sam "we are late"',
                mustContain: ['?'],
                why: 'Correct: "Are you coming?" asked Sam. "We are late." Question mark inside, full stop after the tag, capital on the new sentence.'
            }
        ]
    },
    {
        id: 'specifics',
        icon: '🔬',
        title: 'Be Specific',
        blurb: 'Trade vague nouns for ones the reader can picture.',
        questions: [
            {
                type: 'choice',
                prompt: 'Which gives the clearest picture?',
                options: ['a bird', 'a large bird', 'a heron', 'quite a big sort of bird'],
                answer: 2,
                why: 'One exact word beats three vague ones — and it costs fewer letters.'
            },
            {
                type: 'rewrite',
                prompt: 'Make every vague word exact:',
                text: 'He put the thing in his bag and ate some food.',
                banned: ['thing', 'stuff', 'some food'],
                why: 'Try: "He shoved the compass into his rucksack and bit into a cold sausage roll."'
            },
            {
                type: 'choice',
                prompt: 'Which detail makes a character feel real?',
                options: [
                    'She was a nice person.',
                    'She always gave the crusts to the ducks and kept the middle.',
                    'She was kind and generous and good.',
                    'Everyone liked her a lot.'
                ],
                answer: 1,
                why: 'One odd, specific habit says more than four adjectives.'
            },
            {
                type: 'rewrite',
                prompt: 'Cut the filler words:',
                text: 'It was a very big and really quite scary sort of dog.',
                banned: ['very', 'really', 'quite'],
                why: 'Try: "It was a hulking dog with a scar across its muzzle." Delete the intensifiers, upgrade the noun.'
            }
        ]
    },
    {
        id: 'hooks',
        icon: '🪝',
        title: 'Openings & Endings',
        blurb: 'Start late, leave early.',
        questions: [
            {
                type: 'choice',
                prompt: 'Which opening line makes you want to read on?',
                options: [
                    'It was a sunny Tuesday in June.',
                    'My name is Alex and I am eleven years old.',
                    'The note on the fridge was in my handwriting, and I had not written it.',
                    'I woke up and got dressed for school.'
                ],
                answer: 2,
                why: 'It opens on a change and a question. The other three open on nothing happening.'
            },
            {
                type: 'choice',
                prompt: 'Which is the strongest chapter ending?',
                options: [
                    'Then they all went to bed.',
                    'She turned the handle. The light was already on inside.',
                    'And that was the end of the day.',
                    'It had been a very long day and she was tired.'
                ],
                answer: 1,
                why: 'It ends on a question the reader has to turn the page to answer.'
            },
            {
                type: 'rewrite',
                prompt: 'Rewrite this opening so something is already happening:',
                text: 'I woke up, got dressed, and went downstairs for breakfast.',
                banned: ['woke up'],
                why: 'Try: "The kitchen door was open, and we never left it open." Start where the normal breaks.'
            }
        ]
    },
    {
        id: 'rhythm',
        icon: '🥁',
        title: 'Sentence Rhythm',
        blurb: 'Vary the length so the important moment lands.',
        questions: [
            {
                type: 'choice',
                prompt: 'Which has the best rhythm?',
                options: [
                    'She ran fast. She opened the door. She looked inside. She saw nothing.',
                    'She tore down the corridor, hauled the door open with both hands, and stopped. Nothing.',
                    'She ran down the corridor and she opened the door and she looked inside and she saw nothing at all.',
                    'Running fast down the corridor and opening the door, she looked inside, seeing nothing.'
                ],
                answer: 1,
                why: 'A long, rolling sentence and then a one-word one. The short one is where the meaning lands.'
            },
            {
                type: 'rewrite',
                prompt: 'Join these into one flowing sentence, then add a very short one:',
                text: 'It was cold. The gate was open. Nobody was there. I went in.',
                minWords: 12,
                why: 'Try: "The gate hung open in the cold with nobody anywhere near it. I went in."'
            },
            {
                type: 'choice',
                prompt: 'Every sentence in your paragraph is 15 words long. What is the problem?',
                options: [
                    'The sentences are too long.',
                    'The sentences are too short.',
                    'The sameness makes readers glaze over, with no beat where the important moment lands.',
                    'There is no problem at all.'
                ],
                answer: 2,
                why: 'Length itself is fine. It is the sameness that flattens the writing.'
            }
        ]
    }
];

// ---------- Drill state ----------

let kwDrill = null;   // { setId, index, correct, misses }

function renderDrillsView(container) {
    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">🎯 Practice Range</h2>
            <p class="panel-sub">Short drills on one technique at a time. Get a full set right and you earn its badge.</p>
            <div class="grid-auto">
                ${DRILL_SETS.map(s => `
                    <button class="mini-card" data-drill="${escapeHtml(s.id)}">
                        <div style="font-size:1.7rem;">${s.icon}</div>
                        <div class="mini-card-title">${escapeHtml(s.title)}${s.badge && currentProfile.badges.includes(s.badge) ? ' 🏆' : ''}</div>
                        <div class="mini-card-desc">${escapeHtml(s.blurb)} · ${s.questions.length} questions</div>
                    </button>`).join('')}
            </div>
        </div>
        <div id="kwDrillStage"></div>`;

    container.querySelectorAll('[data-drill]').forEach(b =>
        b.addEventListener('click', () => startDrillSet(b.dataset.drill)));
}

function startDrillSet(setId) {
    kwDrill = { setId, index: 0, correct: 0, misses: 0 };
    renderDrillQuestion();
}

function kwCurrentSet() {
    return DRILL_SETS.find(s => s.id === kwDrill.setId);
}

function renderDrillQuestion() {
    const stage = document.getElementById('kwDrillStage');
    if (!stage) return;
    const set = kwCurrentSet();
    const q = set.questions[kwDrill.index];

    if (!q) { renderDrillComplete(); return; }

    stage.innerHTML = `
        <div class="panel">
            <div class="drill-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${set.questions.length}" aria-valuenow="${kwDrill.index}">
                ${set.questions.map((_, i) => `<span class="drill-dot ${i < kwDrill.index ? 'done' : i === kwDrill.index ? 'now' : ''}"></span>`).join('')}
            </div>
            <span class="nb-badge">${set.icon} ${escapeHtml(set.title)} — ${kwDrill.index + 1} of ${set.questions.length}</span>
            <h3 class="panel-title" style="font-size:1.15rem; margin-top:10px;">${escapeHtml(q.prompt)}</h3>
            ${q.text ? `<div class="ba-box ba-before" style="margin:10px 0;"><span class="ba-tag">Original</span>${escapeHtml(q.text)}</div>` : ''}
            <div id="kwDrillBody" style="margin-top:12px;"></div>
            <div id="kwDrillFeedback"></div>
        </div>`;

    const body = document.getElementById('kwDrillBody');

    if (q.type === 'choice') {
        body.innerHTML = q.options.map((o, i) =>
            `<button class="drill-option" data-opt="${i}">${escapeHtml(o)}</button>`).join('');
        body.querySelectorAll('[data-opt]').forEach(b =>
            b.addEventListener('click', () => gradeChoice(parseInt(b.dataset.opt, 10))));
    } else {
        body.innerHTML = `
            <label class="sandbox-label" for="kwDrillInput">Your rewrite</label>
            <textarea id="kwDrillInput" class="sandbox-input" placeholder="Type your version..."></textarea>
            <button class="fb-action-btn pink" id="kwDrillSubmit" style="margin-top:10px;">Check it</button>`;
        document.getElementById('kwDrillSubmit').addEventListener('click', gradeRewrite);
    }
}

function gradeChoice(pick) {
    const set = kwCurrentSet();
    const q = set.questions[kwDrill.index];
    const right = pick === q.answer;

    document.querySelectorAll('[data-opt]').forEach(b => {
        const i = parseInt(b.dataset.opt, 10);
        if (i === q.answer) b.classList.add('correct');
        else if (i === pick) b.classList.add('wrong');
        b.disabled = true;
    });

    finishQuestion(right, right ? 'Correct!' : 'Not quite.', q.why);
}

function gradeRewrite() {
    const set = kwCurrentSet();
    const q = set.questions[kwDrill.index];
    const value = (document.getElementById('kwDrillInput').value || '').trim();

    if (countWords(value) < 3) {
        showToast('Write a bit more first.', 'red');
        return;
    }

    const lower = value.toLowerCase();
    const problems = [];

    (q.banned || []).forEach(b => {
        if (new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(lower)) {
            problems.push(`"${b}" is still in there`);
        }
    });
    (q.mustContain || []).forEach(c => {
        if (!value.includes(c)) problems.push(`missing ${c === '?' ? 'a question mark' : `"${c}"`}`);
    });
    if (q.minWords && countWords(value) < q.minWords) {
        problems.push(`try at least ${q.minWords} words`);
    }
    if (q.text && lower === q.text.toLowerCase()) {
        problems.push('that is the original sentence');
    }

    const right = problems.length === 0;
    document.getElementById('kwDrillSubmit').disabled = true;
    finishQuestion(right,
        right ? 'Nice rewrite!' : `Almost — ${problems.join(', ')}.`,
        q.why);
}

function finishQuestion(right, headline, why) {
    if (right) { kwDrill.correct++; addXP(25); currentProfile.drillsCorrect++; saveProfileState(); }
    else kwDrill.misses++;

    const fb = document.getElementById('kwDrillFeedback');
    fb.innerHTML = `
        <div class="finding ${right ? 'good' : 'warn'}" style="margin-top:14px;">
            <div class="finding-title">${right ? '✅ ' : '🔧 '}${escapeHtml(headline)}</div>
            <div class="finding-body">${escapeHtml(why)}</div>
        </div>
        <button class="fb-action-btn ${right ? 'green' : 'gold'}" id="kwDrillNext" style="margin-top:10px;">Next →</button>
        <button class="fb-action-btn outline" style="padding:6px 12px; font-size:.8rem; margin-top:10px; margin-left:8px;" onclick="if(window.SuitePassport) window.SuitePassport.openFeedbackModal({ appId: 'kids_writing', appName: 'Story Forge', topicTitle: '${escapeHtml(kwCurrentSet() ? kwCurrentSet().title : 'Drills')}' })">🙋 Not comfortable yet?</button>
        <button class="fb-action-btn outline" style="padding:6px 12px; font-size:.8rem; margin-top:10px; margin-left:8px; ${window.SuitePassport && window.SuitePassport.isTopicMastered('kids_writing', kwCurrentSet() ? kwCurrentSet().title : 'Drills') ? 'background: rgba(245,158,11,0.25); border-color: #F59E0B; color: #F59E0B;' : ''}" onclick="if(window.SuitePassport) window.SuitePassport.toggleMasteredTopic('kids_writing', '${escapeHtml(kwCurrentSet() ? kwCurrentSet().title : 'Drills')}', this)">${window.SuitePassport && window.SuitePassport.isTopicMastered('kids_writing', kwCurrentSet() ? kwCurrentSet().title : 'Drills') ? '🌟 Mastered!' : '⭐ Mark Mastered'}</button>`;

    const next = document.getElementById('kwDrillNext');
    next.addEventListener('click', () => { kwDrill.index++; renderDrillQuestion(); });
    next.focus();
}

function renderDrillComplete() {
    const set = kwCurrentSet();
    const perfect = kwDrill.misses === 0;
    if (perfect && set.badge) unlockBadge(set.badge);

    document.getElementById('kwDrillStage').innerHTML = `
        <div class="panel" style="text-align:center;">
            <div style="font-size:3rem;">${perfect ? '🏆' : '👍'}</div>
            <h3 class="panel-title">${perfect ? 'Perfect set!' : 'Set complete'}</h3>
            <p class="panel-sub">${kwDrill.correct} of ${set.questions.length} right${perfect ? '' : ' — the misses are the useful bit. Run it again.'}</p>
            <div style="display:flex; gap:9px; justify-content:center; flex-wrap:wrap;">
                <button class="fb-action-btn gold" id="kwDrillRetry">Try again</button>
                <button class="fb-action-btn pink" id="kwDrillToDesk">Use it in my book →</button>
            </div>
        </div>`;

    document.getElementById('kwDrillRetry').addEventListener('click', () => startDrillSet(set.id));
    document.getElementById('kwDrillToDesk').addEventListener('click', () =>
        goToView(getLibrary().books.length ? 'write' : 'library'));
}

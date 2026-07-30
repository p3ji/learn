// Craft Cards — the teaching layer.
//
// One card = one technique a child can apply to their own book in the next five
// minutes. Every card carries a before/after pair, because the single most
// useful thing you can give a young writer is a worked example, not a rule.

const CRAFT_CARDS = [
    {
        id: 'strong_verbs',
        icon: '💪',
        title: 'Strong Verbs',
        hook: 'One good verb beats a verb plus two describing words.',
        why: 'Verbs are the engine of a sentence. When the verb is vague ("walked", "looked", "went"), writers patch it with adverbs — "walked slowly and quietly". A single precise verb — "crept" — does both jobs and reads faster.',
        before: 'He walked slowly and quietly into the dark room and looked around nervously.',
        after: 'He crept into the dark room and scanned it.',
        tryThis: 'Open your chapter. Find three sentences with "-ly" words in them. Delete the "-ly" word and change the verb instead.'
    },
    {
        id: 'show_dont_tell',
        icon: '🎬',
        title: 'Show, Don\'t Tell',
        hook: 'Do not name the feeling. Film it.',
        why: 'When you write "she was angry", the reader learns a fact. When you write what her hands do, the reader feels it themselves — and feeling beats knowing every time. The trick: pick one body detail and one action.',
        before: 'Maya was really angry about the broken model.',
        after: 'Maya picked up the snapped wing, turned it over once, and set it down without a word.',
        tryThis: 'Search your chapter for the words angry, sad, happy, scared, excited. Rewrite each one as something a camera could see.'
    },
    {
        id: 'sensory',
        icon: '👃',
        title: 'The Five Senses',
        hook: 'Most writers only use their eyes.',
        why: 'A scene built from sight alone feels like a drawing. Add one sound and one smell and it becomes a place the reader is standing in. You do not need all five — two non-visual details per scene is usually plenty.',
        before: 'The kitchen was messy and old.',
        after: 'The kitchen smelled of burnt toast, and the fridge hummed like it was thinking about giving up.',
        tryThis: 'Pick your favourite paragraph. Add exactly one sound and one smell. Nothing else.'
    },
    {
        id: 'story_shape',
        icon: '🗺️',
        title: 'Story Shape',
        hook: 'Somebody wants something, and something is in the way.',
        why: 'Every story that works has the same skeleton: a character with a want, an obstacle, a series of attempts that fail, a choice, and a changed character. If a chapter feels flat, it is almost always because nothing is in the way.',
        before: 'Sam went to the shop, bought bread, and came home. Then he had dinner.',
        after: 'Sam had eleven minutes to reach the shop before it shut — and his little brother would not put his shoes on.',
        tryThis: 'Write down, in one sentence: what does my main character want, and who or what is stopping them? If you cannot answer, that is your next problem to solve.'
    },
    {
        id: 'character_want',
        icon: '🎭',
        title: 'What Do They Want?',
        hook: 'Characters are not descriptions. They are wants.',
        why: 'Hair colour and age tell us nothing. What a character wants — and what they are willing to do to get it — is the whole personality. Give every character in a scene a want, even the ones passing through.',
        before: 'Rosa was twelve, with brown hair and green eyes. She was brave and kind.',
        after: 'Rosa had already decided she was going into the tunnel. The only question left was whether she told anyone first.',
        tryThis: 'For each character in your chapter, write one sentence: "In this scene, ___ wants ___." If two of them want the same thing, you have a scene.'
    },
    {
        id: 'dialogue',
        icon: '💬',
        title: 'Dialogue That Sounds Real',
        hook: 'People interrupt, dodge and answer the wrong question.',
        why: 'Real conversation is not an exchange of information. Characters avoid, joke and change the subject. Also: "said" is invisible and that is a feature — use it most of the time and save the fancy ones for when they earn it.',
        before: '"Hello Ben," said Anna. "How are you feeling today?" "I am feeling sad," said Ben.',
        after: '"You coming?" Anna asked.\nBen kept tying the same shoelace. "In a minute."',
        tryThis: 'Take one exchange from your book and delete every line where a character answers exactly what they were asked.'
    },
    {
        id: 'punctuating_dialogue',
        icon: '❝',
        title: 'Punctuating Dialogue',
        hook: 'The rules are small, and they make you look like a pro.',
        why: 'Punctuation goes INSIDE the speech marks. Use a comma — not a full stop — before "he said". Start a new paragraph every time the speaker changes. That last one alone fixes half of all confusing dialogue.',
        before: '"I found it" said Leo "look". "Where?" said Mia.',
        after: '"I found it," said Leo. "Look."\n\n"Where?" said Mia.',
        tryThis: 'Find every piece of dialogue in your chapter and check three things: punctuation inside the marks, comma before "said", new paragraph per speaker.'
    },
    {
        id: 'hooks',
        icon: '🪝',
        title: 'Opening Hooks',
        hook: 'Start late, leave early.',
        why: 'Do not begin with waking up, weather, or a character explaining who they are. Begin at the moment something changes. Everything the reader needs to know can be slipped in afterwards while they are already interested.',
        before: 'It was a normal Tuesday morning. I woke up, got dressed and went downstairs for breakfast.',
        after: 'The note on the fridge was in my own handwriting, and I had not written it.',
        tryThis: 'Read your first paragraph. Try deleting it entirely. Does the chapter start better without it? Very often it does.'
    },
    {
        id: 'rhythm',
        icon: '🥁',
        title: 'Sentence Rhythm',
        hook: 'Long, long, long, short. That is where the punch lands.',
        why: 'If every sentence is the same length the writing turns into a drumbeat and readers glaze over. Mix a long flowing sentence with a very short one. The short one is where you put the thing that matters.',
        before: 'She ran down the hall very quickly. She opened the heavy door slowly. She saw that the room was completely empty.',
        after: 'She tore down the hall, hauled the heavy door open with both hands, and stopped. The room was empty.',
        tryThis: 'Read your chapter out loud. Anywhere you run out of breath, add a full stop. Anywhere it sounds choppy, join two sentences together.'
    },
    {
        id: 'endings',
        icon: '🎯',
        title: 'Chapter Endings',
        hook: 'End on the question, not the answer.',
        why: 'A chapter should finish half a beat before the reader is ready. A decision made but not carried out, a door opening, a name nobody expected — anything that makes stopping feel worse than continuing.',
        before: 'They went to bed and slept well, and the next day everything was fine.',
        after: 'She turned the handle. The light was already on inside.',
        tryThis: 'Look at your last paragraph. Try cutting the final sentence. Nine times out of ten the chapter ends harder without it.'
    },
    {
        id: 'revision',
        icon: '🔍',
        title: 'How to Revise',
        hook: 'Drafting and fixing are two different jobs. Never do both at once.',
        why: 'The part of your brain that invents and the part that judges cannot run at the same time — that is why writers freeze. Draft messily and fast. Then, on a different day, come back as the editor: cut, sharpen, and make it clearer.',
        before: 'Writing one sentence, deleting it, writing it again, deleting it again.',
        after: 'Day 1: 400 messy words, no backspace. Day 2: cut it to 320 good ones.',
        tryThis: 'Run a 10-minute Sprint with no deleting allowed. Tomorrow, run the Revision Lab on what you wrote.'
    },
    {
        id: 'specifics',
        icon: '🔬',
        title: 'Be Specific',
        hook: '"A dog" is nothing. "A three-legged greyhound" is a character.',
        why: 'Specific details make a reader trust you. It costs the same number of words to write "a dented blue lunchbox" as "a lunchbox", and one of them the reader can actually picture.',
        before: 'He had some food and an old bag.',
        after: 'He had half a cheese sandwich and a rucksack with one strap.',
        tryThis: 'Find five vague nouns in your chapter — thing, stuff, food, place, animal — and make each one exact.'
    }
];

function renderCraftView(container) {
    const read = currentProfile.craftCardsRead || [];
    container.innerHTML = `
        <div class="panel">
            <h2 class="panel-title">📚 Craft Cards</h2>
            <p class="panel-sub">
                Twelve techniques, each one small enough to use in your book today.
                You've opened <strong>${read.length} of ${CRAFT_CARDS.length}</strong>.
            </p>
            <div class="grid-auto">
                ${CRAFT_CARDS.map(c => `
                    <button class="mini-card" data-card="${escapeHtml(c.id)}">
                        <div style="font-size:1.7rem;">${c.icon}</div>
                        <div class="mini-card-title">${escapeHtml(c.title)}${read.includes(c.id) ? ' <span style="color:var(--green-hero); font-size:.8rem;">✓</span>' : ''}</div>
                        <div class="mini-card-desc">${escapeHtml(c.hook)}</div>
                    </button>`).join('')}
            </div>
        </div>`;

    container.querySelectorAll('[data-card]').forEach(b =>
        b.addEventListener('click', () => openCraftCard(b.dataset.card)));
}

function openCraftCard(id) {
    const c = CRAFT_CARDS.find(x => x.id === id);
    if (!c) return;

    if (!currentProfile.craftCardsRead.includes(id)) {
        currentProfile.craftCardsRead.push(id);
        addXP(20);
        saveProfileState();
    }

    kwShowModal('kwCraftModal', `
        <div style="font-size:2.6rem;">${c.icon}</div>
        <h2 class="concept-title" style="margin:4px 0 2px;">${escapeHtml(c.title)}</h2>
        <p style="color:var(--gold-star); font-weight:700; margin-bottom:14px;">${escapeHtml(c.hook)}</p>

        <p style="margin-bottom:16px;">${escapeHtml(c.why)}</p>

        <div class="before-after">
            <div class="ba-box ba-before"><span class="ba-tag">Before</span>${escapeHtml(c.before)}</div>
            <div class="ba-box ba-after"><span class="ba-tag">After</span>${escapeHtml(c.after)}</div>
        </div>

        <div class="finding tip" style="margin-top:14px;">
            <div class="finding-title">✏️ Try this on your own book</div>
            <div class="finding-body">${escapeHtml(c.tryThis)}</div>
        </div>

        <div style="display:flex; gap:9px; margin-top:16px; flex-wrap:wrap;">
            <button class="fb-action-btn pink" id="kwCardToDesk">Go to my Writing Desk →</button>
            <button class="fb-action-btn outline" id="kwCardToDrills">Practise this ↗</button>
        </div>
    `);

    document.getElementById('kwCardToDesk').addEventListener('click', () => {
        closeModal('kwCraftModal');
        goToView(getLibrary().books.length ? 'write' : 'library');
    });
    document.getElementById('kwCardToDrills').addEventListener('click', () => {
        closeModal('kwCraftModal');
        goToView('drills');
        if (DRILL_SETS.some(s => s.id === id)) startDrillSet(id);
    });
}

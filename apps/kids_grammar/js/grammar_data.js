// All grammar content: parts of speech, the tagged sentence corpus, rule cards
// and the Sentence Doctor cases.
//
// Kept as data (not code) so the teaching content can be edited by someone who
// doesn't write JavaScript, and so the engines stay small and testable.

// ---------- Parts of speech ----------
// `det` is separated from `adj` deliberately: UK primary curricula introduce
// determiners as their own word class, and lumping "the" in with adjectives
// causes more confusion than it saves.

const PARTS_OF_SPEECH = {
    noun:   { label: 'Noun',         colour: '#10B981', icon: '🧱', short: 'a person, place, thing or idea', test: 'Can you put "the" in front of it? Then it is probably a noun.', examples: ['dragon', 'Cairo', 'courage', 'sandwich'] },
    verb:   { label: 'Verb',         colour: '#EC4899', icon: '⚡', short: 'an action or a state of being', test: 'Can you put "I" or "she" in front and have it make sense? "She runs." Verb.', examples: ['sprinted', 'is', 'thinks', 'exploded'] },
    adj:    { label: 'Adjective',    colour: '#F59E0B', icon: '🎨', short: 'describes a noun', test: 'Does it answer "what kind?" about a noun? Adjective.', examples: ['rusty', 'enormous', 'silent', 'purple'] },
    adv:    { label: 'Adverb',       colour: '#06B6D4', icon: '💨', short: 'describes a verb, adjective or another adverb', test: 'Does it answer how, when, where or how much? Adverb.', examples: ['loudly', 'yesterday', 'very', 'never'] },
    pron:   { label: 'Pronoun',      colour: '#A78BFA', icon: '🔄', short: 'stands in for a noun', test: 'Could you swap a name back in? Then it is a pronoun.', examples: ['she', 'them', 'it', 'ours'] },
    prep:   { label: 'Preposition',  colour: '#F87171', icon: '🧭', short: 'shows position or direction', test: 'Anywhere a mouse can go: under, over, through, behind the box.', examples: ['under', 'through', 'before', 'with'] },
    conj:   { label: 'Conjunction',  colour: '#FBBF24', icon: '🔗', short: 'joins words or clauses together', test: 'Does it glue two parts together? Conjunction.', examples: ['and', 'but', 'because', 'although'] },
    det:    { label: 'Determiner',   colour: '#94A3B8', icon: '👉', short: 'points at a noun and says which one', test: 'Sits before a noun: the, a, this, my, three.', examples: ['the', 'a', 'my', 'those'] },
    interj: { label: 'Interjection', colour: '#F472B6', icon: '❗', short: 'a sudden exclamation', test: 'Could it stand alone with an exclamation mark? Interjection.', examples: ['Ouch', 'Wow', 'Oi', 'Hooray'] }
};

// Tagged corpus for the Parts of Speech Lab. Punctuation is stripped from the
// token when tagging but kept for display, so "wind." renders with its full stop
// while being graded as the noun "wind".
const POS_SENTENCES = [
    { text: 'The rusty gate creaked loudly in the wind.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'She quickly grabbed her torch and ran outside.',
      tags: ['pron', 'adv', 'verb', 'det', 'noun', 'conj', 'verb', 'adv'] },
    { text: 'Wow, that enormous dog jumped over our fence!',
      tags: ['interj', 'det', 'adj', 'noun', 'verb', 'prep', 'det', 'noun'] },
    { text: 'Tom whispered because the library was silent.',
      tags: ['noun', 'verb', 'conj', 'det', 'noun', 'verb', 'adj'] },
    { text: 'My brother never eats cold soup.',
      tags: ['det', 'noun', 'adv', 'verb', 'adj', 'noun'] },
    { text: 'The old lighthouse stood bravely against the storm.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'They carefully carried the heavy box upstairs.',
      tags: ['pron', 'adv', 'verb', 'det', 'adj', 'noun', 'adv'] },
    { text: 'Ouch! I banged my elbow on that shelf.',
      tags: ['interj', 'pron', 'verb', 'det', 'noun', 'prep', 'det', 'noun'] },
    { text: 'The clever fox slipped silently through the hedge.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'We waited but the bus never arrived.',
      tags: ['pron', 'verb', 'conj', 'det', 'noun', 'adv', 'verb'] },
    { text: 'Sara painted a bright mural on her wall.',
      tags: ['noun', 'verb', 'det', 'adj', 'noun', 'prep', 'det', 'noun'] },
    { text: 'Hooray! Our team finally won the cup.',
      tags: ['interj', 'det', 'noun', 'adv', 'verb', 'det', 'noun'] },
    { text: 'The tiny kitten hid under a wooden chair.',
      tags: ['det', 'adj', 'noun', 'verb', 'prep', 'det', 'adj', 'noun'] },
    { text: 'He shouted loudly although nobody could hear him.',
      tags: ['pron', 'verb', 'adv', 'conj', 'pron', 'verb', 'verb', 'pron'] },
    { text: 'The brave knight rescued the frightened villagers.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'adj', 'noun'] },
    { text: 'She sings beautifully every single morning.',
      tags: ['pron', 'verb', 'adv', 'det', 'adj', 'noun'] },
    { text: 'Wow, that giant wave nearly capsized the boat!',
      tags: ['interj', 'det', 'adj', 'noun', 'adv', 'verb', 'det', 'noun'] },
    { text: 'My little sister giggled quietly during the movie.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'The ancient castle stood silently beside the river.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'They quickly built an enormous sandcastle yesterday.',
      tags: ['pron', 'adv', 'verb', 'det', 'adj', 'noun', 'adv'] },
    { text: 'Ouch! That sharp rock hurt my foot.',
      tags: ['interj', 'det', 'adj', 'noun', 'verb', 'det', 'noun'] },
    { text: 'The teacher calmly explained the tricky puzzle.',
      tags: ['det', 'noun', 'adv', 'verb', 'det', 'adj', 'noun'] },
    { text: 'We eagerly opened our shiny presents.',
      tags: ['pron', 'adv', 'verb', 'det', 'adj', 'noun'] },
    { text: 'The old bridge collapsed suddenly during the storm.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'Hooray! We finally reached the summit.',
      tags: ['interj', 'pron', 'adv', 'verb', 'det', 'noun'] },
    { text: 'The curious kitten chased a fluttering butterfly.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'adj', 'noun'] },
    { text: 'He bravely faced his greatest fear.',
      tags: ['pron', 'adv', 'verb', 'det', 'adj', 'noun'] },
    { text: 'The crowd cheered loudly for their team.',
      tags: ['det', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'Yikes! A huge spider crawled across the ceiling.',
      tags: ['interj', 'det', 'adj', 'noun', 'verb', 'prep', 'det', 'noun'] },
    { text: 'The gentle breeze rustled through the tall trees.',
      tags: ['det', 'adj', 'noun', 'verb', 'prep', 'det', 'adj', 'noun'] },
    { text: 'I quietly tiptoed past the sleeping dragon.',
      tags: ['pron', 'adv', 'verb', 'prep', 'det', 'adj', 'noun'] },
    { text: 'The exhausted hikers finally reached the summit.',
      tags: ['det', 'adj', 'noun', 'adv', 'verb', 'det', 'noun'] },
    { text: 'She bravely stood against the raging storm.',
      tags: ['pron', 'adv', 'verb', 'prep', 'det', 'adj', 'noun'] },
    { text: 'The mischievous puppy chewed my favourite shoe.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'adj', 'noun'] },
    { text: 'Alas, the ancient scroll crumbled instantly.',
      tags: ['interj', 'det', 'adj', 'noun', 'verb', 'adv'] },
    { text: 'The clumsy waiter dropped three plates.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'noun'] },
    { text: 'We anxiously awaited the final results.',
      tags: ['pron', 'adv', 'verb', 'det', 'adj', 'noun'] },
    { text: 'The elderly man walked slowly across the square.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'Suddenly, the lights flickered and died.',
      tags: ['adv', 'det', 'noun', 'verb', 'conj', 'verb'] },
    { text: 'The nervous student raised her trembling hand.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'adj', 'noun'] },
    { text: 'Wow! The fireworks exploded brilliantly above us.',
      tags: ['interj', 'det', 'noun', 'verb', 'adv', 'prep', 'pron'] },
    { text: 'The frightened rabbit darted beneath the hedge.',
      tags: ['det', 'adj', 'noun', 'verb', 'prep', 'det', 'noun'] },
    { text: 'They cautiously approached the growling wolf.',
      tags: ['pron', 'adv', 'verb', 'det', 'adj', 'noun'] },
    { text: 'The old clock ticked loudly in the hallway.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'Because it rained, we cancelled the picnic.',
      tags: ['conj', 'pron', 'verb', 'pron', 'verb', 'det', 'noun'] },
    { text: 'Although she was tired, she finished the race.',
      tags: ['conj', 'pron', 'verb', 'adj', 'pron', 'verb', 'det', 'noun'] },
    { text: 'The shy boy whispered his answer nervously.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'noun', 'adv'] },
    { text: 'Everyone clapped when the singer finished.',
      tags: ['pron', 'verb', 'conj', 'det', 'noun', 'verb'] },
    { text: 'The tiny ant carried a huge crumb.',
      tags: ['det', 'adj', 'noun', 'verb', 'det', 'adj', 'noun'] },
    { text: 'Quickly, he grabbed his umbrella and ran.',
      tags: ['adv', 'pron', 'verb', 'det', 'noun', 'conj', 'verb'] },
    { text: 'The wise owl blinked slowly in the moonlight.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] },
    { text: 'Ugh, my shoes got completely soaked.',
      tags: ['interj', 'det', 'noun', 'verb', 'adv', 'adj'] },
    { text: 'The captain steered the ship carefully through the storm.',
      tags: ['det', 'noun', 'verb', 'det', 'noun', 'adv', 'prep', 'det', 'noun'] },
    { text: 'Their tiny cottage sat peacefully beside the lake.',
      tags: ['det', 'adj', 'noun', 'verb', 'adv', 'prep', 'det', 'noun'] }
];

// ---------- Rule cards ----------
// Each card is the reference a Grammar Check finding links to, so the child
// always gets the full explanation, not just "this is wrong".

const RULE_CARDS = [
    {
        id: 'its',
        icon: '🔑',
        group: 'Confusable words',
        title: "its vs it's",
        hook: "it's = it is. Always. No exceptions.",
        why: "This one trips up adults too, because everywhere else in English an apostrophe means ownership. Not here. <strong>it's</strong> is short for <em>it is</em> or <em>it has</em>. <strong>its</strong> means belonging to it — like <em>his</em> and <em>hers</em>, which also have no apostrophe.",
        right: "It's raining. The dog wagged its tail.",
        wrong: "Its raining. The dog wagged it's tail.",
        trick: "Read it aloud as \"it is\". If the sentence still works, you need the apostrophe."
    },
    {
        id: 'there',
        icon: '📍',
        group: 'Confusable words',
        title: 'there / their / they\'re',
        hook: 'Three words, three completely different jobs.',
        why: "<strong>there</strong> = a place (it has the word <em>here</em> hiding inside it). <strong>their</strong> = belonging to them (it has <em>heir</em> in it — someone who inherits). <strong>they're</strong> = they are.",
        right: "They're putting their bags over there.",
        wrong: "Their putting there bags over they're.",
        trick: "Try saying \"they are\". If it fits, use they're. If you mean a place, there. Otherwise their."
    },
    {
        id: 'your',
        icon: '🫵',
        group: 'Confusable words',
        title: "your / you're",
        hook: "you're = you are.",
        why: "<strong>your</strong> shows ownership: <em>your coat</em>. <strong>you're</strong> is two words squashed together: <em>you are</em>. The apostrophe is standing in for the missing letter A.",
        right: "You're going to love your present.",
        wrong: "Your going to love you're present.",
        trick: "Expand it to \"you are\" in your head and see if it still makes sense."
    },
    {
        id: 'could_have',
        icon: '🚫',
        group: 'Confusable words',
        title: '"could have", never "could of"',
        hook: 'It sounds like "of". It is never "of".',
        why: "When we speak, <em>could have</em> gets squashed into <em>could've</em>, which sounds exactly like <em>could of</em>. But <em>of</em> is a preposition — it cannot be the verb in that sentence. The word you want is always <strong>have</strong>.",
        right: "I could have won. She should have known. We would have waited.",
        wrong: "I could of won. She should of known. We would of waited.",
        trick: "If you can put a different verb there — could eat, could run — you need have, not of."
    },
    {
        id: 'sv_agree',
        icon: '🤝',
        group: 'Sentence building',
        title: 'Subject–verb agreement',
        hook: 'One thing does. Two things do.',
        why: "The verb has to match the subject in number. <em>He was</em>, not <em>he were</em>. <em>They were</em>, not <em>they was</em>. It gets tricky when words come between the subject and the verb: in <em>the box of apples <strong>is</strong> heavy</em>, the subject is <em>box</em> (one), not <em>apples</em>.",
        right: "She was late. They were early. The box of apples is heavy.",
        wrong: "She were late. They was early. The box of apples are heavy.",
        trick: "Cover up everything between the subject and the verb, then read it again."
    },
    {
        id: 'fragment',
        icon: '🧩',
        group: 'Sentence building',
        title: 'Sentence fragments',
        hook: 'A sentence needs a subject and a verb, and must finish its thought.',
        why: "<em>Because it was raining.</em> is not a sentence — it leaves you waiting. Words like <strong>because, although, when, if, while, since</strong> start a dependent clause, which has to be joined to a full sentence to survive on its own.",
        right: "We stayed inside because it was raining.",
        wrong: "We stayed inside. Because it was raining.",
        trick: "Read it to someone. If they look at you expecting more, it is a fragment."
    },
    {
        id: 'run_on',
        icon: '🏃',
        group: 'Sentence building',
        title: 'Run-on sentences',
        hook: 'Two complete sentences cannot just be shoved together.',
        why: "A run-on joins full sentences with nothing, or with only <em>and</em> after <em>and</em> after <em>and</em>. Fix it with a full stop, a semicolon, or a comma plus a joining word (and, but, so, because).",
        right: "The bell rang, so we ran outside. It was cold. Nobody minded.",
        wrong: "The bell rang we ran outside and it was cold and nobody minded and we played.",
        trick: "Read it out loud in one breath. If you run out of air, it is a run-on."
    },
    {
        id: 'comma_splice',
        icon: '🪡',
        group: 'Punctuation',
        title: 'Comma splices',
        hook: 'A comma is too weak to join two sentences.',
        why: "<em>It was late, we went home.</em> Both halves could stand alone, so a comma is not strong enough. Use a full stop, a semicolon, or add a joining word after the comma.",
        right: "It was late, so we went home. / It was late. We went home.",
        wrong: "It was late, we went home.",
        trick: "Could each half be its own sentence? Then a comma alone is not allowed."
    },
    {
        id: 'apostrophe',
        icon: '❜',
        group: 'Punctuation',
        title: 'Apostrophes',
        hook: 'Apostrophes do two jobs: missing letters, and ownership.',
        why: "<strong>Missing letters:</strong> do not → don't. <strong>Ownership:</strong> the dog's bowl. For a plural that already ends in s, the apostrophe goes after: the dogs' bowls. Apostrophes are <em>never</em> used to make something plural.",
        right: "The dog's bowl. The girls' team. Three bananas. Don't stop.",
        wrong: "The dogs bowl. The girl's team (for many girls). Three banana's.",
        trick: "Never add an apostrophe just because a word ends in s."
    },
    {
        id: 'capitals',
        icon: '🔠',
        group: 'Punctuation',
        title: 'Capital letters',
        hook: 'Sentence starts, names, and the word I.',
        why: "Capitals go at the start of every sentence, on proper nouns (names of people, places, days, months, titles), and on the word <strong>I</strong>, always, even in the middle of a sentence.",
        right: "On Tuesday, Priya and I went to Bristol.",
        wrong: "on tuesday, priya and i went to bristol.",
        trick: "Days and months get capitals. Seasons — spring, summer — do not."
    },
    {
        id: 'commas_list',
        icon: '📋',
        group: 'Punctuation',
        title: 'Commas in lists and clauses',
        hook: 'Commas separate items, and fence off extra information.',
        why: "In a list: <em>apples, pears, bread and milk</em>. Around extra information you could remove: <em>My brother, who is nine, hates olives.</em> After an opening phrase: <em>After the film, we walked home.</em>",
        right: "After the film, we bought chips, drinks and ice cream.",
        wrong: "After the film we bought chips drinks and ice cream.",
        trick: "If you would pause when reading aloud, a comma probably belongs there."
    },
    {
        id: 'double_neg',
        icon: '➖',
        group: 'Sentence building',
        title: 'Double negatives',
        hook: 'Two negatives cancel out.',
        why: "<em>I didn't see nothing</em> literally means you saw something. In standard written English you use one negative: <em>I didn't see anything</em> or <em>I saw nothing</em>. (Plenty of dialects use double negatives perfectly well — this is a rule about formal writing, not about how people speak.)",
        right: "I didn't see anything. I saw nothing.",
        wrong: "I didn't see nothing.",
        trick: "Swap nothing → anything, nobody → anybody, never → ever."
    },
    {
        id: 'a_an',
        icon: '🅰️',
        group: 'Confusable words',
        title: 'a vs an',
        hook: 'It depends on the sound, not the letter.',
        why: "Use <strong>an</strong> before a vowel <em>sound</em>: an apple, an hour (the h is silent). Use <strong>a</strong> before a consonant sound: a book, a university (it starts with a \"yoo\" sound).",
        right: "An hour later, a university student ate an orange.",
        wrong: "A hour later, an university student ate a orange.",
        trick: "Say it out loud. Your ear knows this rule already."
    },
    {
        id: 'tense',
        icon: '⏳',
        group: 'Sentence building',
        title: 'Staying in one tense',
        hook: 'Pick past or present, then stay there.',
        why: "Drifting between tenses is one of the most common things to fix in a first draft: <em>She walked into the room and sees the letter.</em> Pick one — most stories are written in the past tense — and keep it consistent unless you have a reason to change.",
        right: "She walked into the room and saw the letter.",
        wrong: "She walked into the room and sees the letter.",
        trick: "Read a paragraph and underline every verb. They should all be the same tense."
    }
];

// ---------- Sentence Doctor cases ----------
// `fix` is the accepted answer; `accept` holds extra valid alternatives, because
// most of these have more than one correct repair and marking a correct answer
// wrong is the fastest way to make a child distrust the app.
//
// `distractors` are genuinely WRONG repairs — plausible mistakes, not the right
// answer reworded. Every case needs at least one; without a real distractor,
// every option on screen is technically correct and there is nothing to decide.

const DOCTOR_SETS = [
    {
        id: 'confusables',
        icon: '🔑',
        title: 'Confusable Words',
        blurb: "its/it's, there/their, your/you're",
        badge: 'confusable_champ',
        cases: [
            { broken: "The cat licked it's paw.",              fix: "The cat licked its paw.",                    rule: 'its',        why: "Belonging to it = its, no apostrophe. \"It is paw\" makes no sense.",
              distractors: ["The cat licked its' paw.", "The cat licked it is paw."] },
            { broken: "Its going to rain later.",              fix: "It's going to rain later.",                  rule: 'its',        why: "\"It is going to rain\" works, so you need the apostrophe.",
              distractors: ["Its' going to rain later.", "It's going to rain later's."] },
            { broken: "Their going to be late again.",         fix: "They're going to be late again.",            rule: 'there',      why: "\"They are going to be late\" — so they're.",
              distractors: ["There going to be late again.", "Their're going to be late again."] },
            { broken: "Put you're coat over their.",           fix: "Put your coat over there.",                  rule: 'your',       why: "The coat belongs to you (your), and \"over there\" is a place.",
              distractors: ["Put your coat over they're.", "Put you're coat over there."] },
            { broken: "I could of told you that.",             fix: "I could have told you that.",                rule: 'could_have', why: "Never \"could of\". The verb is have.", accept: ["I could've told you that."],
              distractors: ["I could off told you that.", "I could had told you that."] },
            { broken: "We saw a elephant at the zoo.",         fix: "We saw an elephant at the zoo.",             rule: 'a_an',       why: "\"Elephant\" starts with a vowel sound, so it takes an.",
              distractors: ["We saw the elephant at the zoo.", "We saw a elephants at the zoo."] },
            { broken: "I think its going to snow tonight.",    fix: "I think it's going to snow tonight.",        rule: 'its',        why: "\"It is going to snow\" makes sense, so use the apostrophe.",
              distractors: ["I think its going to snow tonight.", "I think its' going to snow tonight."] },
            { broken: "Their both coming to the party.",       fix: "They're both coming to the party.",          rule: 'there',      why: "\"They are both coming\" makes sense, so it's the contraction.",
              distractors: ["Their both coming to the party.", "There both coming to the party."] },
            { broken: "The birds built there nest in our tree.", fix: "The birds built their nest in our tree.",  rule: 'there',      why: "The nest belongs to the birds, so it's their.",
              distractors: ["The birds built there nest in our tree.", "The birds built they're nest in our tree."] },
            { broken: "Your the best friend I've ever had.",   fix: "You're the best friend I've ever had.",      rule: 'your',       why: "\"You are the best friend\" makes sense, so it needs the apostrophe.",
              distractors: ["Your the best friend I've ever had.", "Your're the best friend I've ever had."] },
            { broken: "We should of left earlier.",            fix: "We should have left earlier.",               rule: 'could_have', why: "Never \"should of\" — the word is always have.", accept: ["We should've left earlier."],
              distractors: ["We should of left earlier.", "We should off left earlier."] },
            { broken: "It took a hour to finish the test.",    fix: "It took an hour to finish the test.",        rule: 'a_an',       why: "The h in \"hour\" is silent, so it sounds like it starts with a vowel.",
              distractors: ["It took a hour to finish the test.", "It took an hours to finish the test."] }
        ]
    },
    {
        id: 'agreement',
        icon: '🤝',
        title: 'Subject & Verb',
        blurb: 'Making the verb match the subject',
        badge: 'agreement_ace',
        cases: [
            { broken: "They was waiting at the gate.",         fix: "They were waiting at the gate.",             rule: 'sv_agree', why: "\"They\" is plural, so the verb is were.",
              distractors: ["They is waiting at the gate.", "They was wait at the gate."] },
            { broken: "She were the first one there.",         fix: "She was the first one there.",               rule: 'sv_agree', why: "\"She\" is singular, so the verb is was.",
              distractors: ["She were the first one their.", "She be the first one there."] },
            { broken: "The box of apples are heavy.",          fix: "The box of apples is heavy.",                rule: 'sv_agree', why: "The subject is \"box\" (one box), not \"apples\".",
              distractors: ["The boxes of apples are heavy.", "The box of apple is heavy."] },
            { broken: "My brother don't like olives.",         fix: "My brother doesn't like olives.",            rule: 'sv_agree', why: "One brother → doesn't. Many brothers → don't.",
              distractors: ["My brother don't likes olives.", "My brothers doesn't like olives."] },
            { broken: "There is six eggs left.",               fix: "There are six eggs left.",                   rule: 'sv_agree', why: "Six eggs is plural, so it takes are.",
              distractors: ["Their are six eggs left.", "There is six egg left."] },
            { broken: "He don't know the answer.",             fix: "He doesn't know the answer.",                rule: 'sv_agree', why: "One person (he) takes doesn't.",
              distractors: ["He don't know the answer.", "He doesn't knows the answer."] },
            { broken: "The dogs barks all night.",              fix: "The dogs bark all night.",                   rule: 'sv_agree', why: "\"Dogs\" is plural, so the verb doesn't take an -s.",
              distractors: ["The dogs barks all night.", "The dogs barking all night."] },
            { broken: "You is my best friend.",                 fix: "You are my best friend.",                    rule: 'sv_agree', why: "\"You\" always takes are (or am for I), never is.",
              distractors: ["You is my best friend.", "You be my best friend."] },
            { broken: "The children plays outside every afternoon.", fix: "The children play outside every afternoon.", rule: 'sv_agree', why: "\"Children\" is already plural, so the verb doesn't take an -s.",
              distractors: ["The children plays outside every afternoon.", "The children is playing outside every afternoon."] },
            { broken: "Both of my sisters is coming to visit.", fix: "Both of my sisters are coming to visit.",    rule: 'sv_agree', why: "\"Both\" refers to more than one, so the verb is are.",
              distractors: ["Both of my sisters is coming to visit.", "Both of my sister are coming to visit."] }
        ]
    },
    {
        id: 'punctuation',
        icon: '❜',
        title: 'Punctuation Repair',
        blurb: 'Commas, apostrophes and capitals',
        badge: 'punctuation_pro',
        cases: [
            { broken: "it was tuesday and priya was late.",    fix: "It was Tuesday and Priya was late.",         rule: 'capitals',    why: "Sentence start, day of the week, and a person's name all take capitals.",
              distractors: ["It was tuesday and Priya was late.", "It Was Tuesday And Priya Was Late."] },
            { broken: "my friend and i went to spain in july.",fix: "My friend and I went to Spain in July.",      rule: 'capitals',    why: "The word I is always a capital, and Spain and July are proper nouns.",
              distractors: ["My friend and I went to spain in july.", "My Friend and I went to Spain in July."] },
            { broken: "The dogs bowl was empty.",              fix: "The dog's bowl was empty.",                  rule: 'apostrophe',  why: "The bowl belongs to the dog, so it needs an apostrophe.", accept: ["The dogs' bowl was empty."],
              distractors: ["The dog's's bowl was empty.", "The dogs' bowls was empty."] },
            { broken: "I bought three banana's.",              fix: "I bought three bananas.",                    rule: 'apostrophe',  why: "Apostrophes never make a word plural.",
              distractors: ["I bought three banana's's.", "I bought three bananas'."] },
            { broken: "After the film we bought chips drinks and ice cream.", fix: "After the film, we bought chips, drinks and ice cream.", rule: 'commas_list', why: "A comma after the opening phrase, and commas between the list items.", accept: ["After the film, we bought chips, drinks, and ice cream."],
              distractors: ["After the film we bought, chips, drinks and ice cream.", "After, the film we bought chips drinks and ice cream."] },
            { broken: "wheres my other shoe",                  fix: "Where's my other shoe?",                     rule: 'apostrophe', why: "\"Where's\" needs an apostrophe (where is), and a question needs a question mark.",
              distractors: ["wheres my other shoe", "Wheres my other shoe?"] },
            { broken: "The teachers lounge was locked.",       fix: "The teachers' lounge was locked.",           rule: 'apostrophe', why: "The lounge belongs to more than one teacher, so the apostrophe goes after the s.",
              distractors: ["The teachers lounge was locked.", "The teacher's lounge was locked."] },
            { broken: "can you pass the salt please",          fix: "Can you pass the salt, please?",             rule: 'commas_list', why: "Sentence start needs a capital, it's a question so end with a question mark, and a comma sets off \"please\".",
              distractors: ["can you pass the salt please", "Can you pass the salt please."] },
            { broken: "we visited london paris and rome last summer.", fix: "We visited London, Paris and Rome last summer.", rule: 'capitals', why: "Sentence start and place names need capitals, and commas separate the list.",
              distractors: ["we visited london paris and rome last summer.", "We visited london, Paris and Rome last summer."] },
            { broken: "The recipe needs flour sugar butter and eggs.", fix: "The recipe needs flour, sugar, butter and eggs.", rule: 'commas_list', why: "Commas separate each item in the list.",
              distractors: ["The recipe needs flour sugar butter and eggs.", "The recipe needs flour, sugar butter, and eggs."] }
        ]
    },
    {
        id: 'sentences',
        icon: '🧩',
        title: 'Whole Sentences',
        blurb: 'Fragments, run-ons and comma splices',
        badge: 'sentence_surgeon',
        cases: [
            { broken: "Because it was raining.",               fix: "We stayed inside because it was raining.",   rule: 'fragment',     why: "\"Because...\" cannot stand alone — it needs a main clause.", loose: true,
              distractors: ["Because it was very raining.", "It was raining because."] },
            { broken: "It was late, we went home.",            fix: "It was late, so we went home.",              rule: 'comma_splice', why: "A comma is too weak to join two full sentences. Add a joining word or use a full stop.", accept: ["It was late. We went home.", "It was late; we went home."],
              distractors: ["It was late we went home.", "It was late, and, we went home."] },
            { broken: "The bell rang we ran outside.",          fix: "The bell rang, so we ran outside.",          rule: 'run_on',       why: "Two complete sentences shoved together. Separate or join them properly.", accept: ["The bell rang. We ran outside.", "The bell rang and we ran outside.", "The bell rang, and we ran outside."],
              distractors: ["The bell rang, we ran outside.", "The bell rang so, we ran outside."] },
            { broken: "I didn't see nothing in the shed.",      fix: "I didn't see anything in the shed.",         rule: 'double_neg',   why: "Two negatives cancel out. Use one.", accept: ["I saw nothing in the shed."],
              distractors: ["I didn't seen nothing in the shed.", "I don't saw nothing in the shed."] },
            { broken: "She walked into the room and sees the letter.", fix: "She walked into the room and saw the letter.", rule: 'tense', why: "Stay in one tense — \"walked\" is past, so \"saw\" is too.", accept: ["She walks into the room and sees the letter."],
              distractors: ["She walks into the room and saw the letter.", "She was walking into the room and sees the letter."] },
            { broken: "Although he was tired.",                 fix: "He kept working although he was tired.",     rule: 'fragment',     why: "\"Although...\" cannot stand alone — it needs a main clause attached.", loose: true,
              distractors: ["Although he was tired.", "He was tired although."] },
            { broken: "We ran to the bus stop, it had already left.", fix: "We ran to the bus stop, but it had already left.", rule: 'comma_splice', why: "A comma alone can't join two full sentences — add a joining word or use a full stop.", accept: ["We ran to the bus stop. It had already left."],
              distractors: ["We ran to the bus stop, it had already left.", "We ran to the bus stop it had already left."] },
            { broken: "The rain poured down we stayed inside all day.", fix: "The rain poured down, so we stayed inside all day.", rule: 'run_on', why: "Two complete sentences need a joining word or proper punctuation between them.", accept: ["The rain poured down. We stayed inside all day."],
              distractors: ["The rain poured down we stayed inside all day.", "The rain poured down, we stayed inside all day."] },
            { broken: "I haven't got no homework tonight.",     fix: "I haven't got any homework tonight.",        rule: 'double_neg',   why: "\"Haven't\" and \"no\" cancel each other out — use any instead.", accept: ["I've got no homework tonight."],
              distractors: ["I haven't got no homework tonight.", "I haven't got some homework tonight."] },
            { broken: "Yesterday, she runs all the way home.",  fix: "Yesterday, she ran all the way home.",       rule: 'tense',        why: "\"Yesterday\" signals the past, so the verb should be past tense too.",
              distractors: ["Yesterday, she runs all the way home.", "Yesterday, she was run all the way home."] }
        ]
    }
];

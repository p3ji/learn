// Word lists that drive both the Revision Lab and the Word Bank tool.
//
// Deliberately curated and small rather than exhaustive: a coach that flags
// twenty things in a paragraph teaches nothing. Each list targets one habit
// that actually holds an 8-12 year old's writing back.

// Verbs that carry no picture. Each maps to livelier options the child can swap in.
const WEAK_VERBS = {
    walked:  ['stomped', 'crept', 'wandered', 'marched', 'shuffled', 'strolled'],
    ran:     ['bolted', 'sprinted', 'darted', 'raced', 'scrambled', 'tore off'],
    looked:  ['stared', 'peered', 'glanced', 'studied', 'squinted', 'gawked'],
    said:    ['whispered', 'snapped', 'muttered', 'called', 'groaned', 'admitted'],
    went:    ['slipped away', 'headed', 'travelled', 'set off', 'escaped'],
    got:     ['grabbed', 'earned', 'received', 'snatched', 'collected'],
    put:     ['placed', 'dropped', 'shoved', 'slid', 'balanced'],
    took:    ['snatched', 'grabbed', 'lifted', 'stole', 'claimed'],
    ate:     ['gobbled', 'nibbled', 'devoured', 'munched', 'wolfed down'],
    laughed: ['giggled', 'cackled', 'snorted', 'howled', 'chuckled'],
    cried:   ['sobbed', 'wailed', 'whimpered', 'sniffled'],
    made:    ['built', 'crafted', 'shaped', 'invented', 'forged'],
    moved:   ['darted', 'edged', 'slid', 'drifted', 'lurched']
};

// Vague describing words. A word that fits everything describes nothing.
const WEAK_ADJECTIVES = {
    nice:      ['kind', 'warm', 'generous', 'friendly'],
    good:      ['brilliant', 'skilful', 'honest', 'reliable'],
    bad:       ['rotten', 'cruel', 'clumsy', 'disastrous'],
    big:       ['towering', 'enormous', 'vast', 'hulking'],
    small:     ['tiny', 'cramped', 'delicate', 'pocket-sized'],
    pretty:    ['striking', 'elegant', 'glowing', 'dazzling'],
    scary:     ['eerie', 'menacing', 'chilling', 'creepy'],
    fun:       ['thrilling', 'wild', 'joyful', 'hilarious'],
    interesting: ['strange', 'surprising', 'puzzling', 'remarkable'],
    sad:       ['heartbroken', 'gloomy', 'hollow', 'miserable'],
    happy:     ['delighted', 'giddy', 'relieved', 'proud'],
    weird:     ['peculiar', 'uncanny', 'baffling', 'off']
};

// Intensifiers that steal power from the word after them.
const CRUTCH_WORDS = ['very', 'really', 'just', 'quite', 'so', 'totally', 'actually', 'literally', 'basically', 'super'];

// "Filter words" put a camera between the reader and the scene:
// "She saw the door creak open" -> "The door creaked open."
const FILTER_WORDS = ['saw', 'heard', 'felt', 'noticed', 'watched', 'realised', 'realized', 'thought', 'wondered', 'seemed', 'decided', 'knew'];

// Emotion words stated outright — the classic "telling" tell.
const TELLING_EMOTIONS = ['angry', 'sad', 'happy', 'scared', 'afraid', 'excited', 'nervous', 'bored', 'annoyed', 'furious', 'worried', 'lonely', 'embarrassed'];

// Phrases every reader has met a thousand times.
const CLICHES = [
    'as fast as lightning', 'a piece of cake', 'in the nick of time', 'once upon a time',
    'happily ever after', 'suddenly, out of nowhere', 'my heart was pounding',
    'time stood still', 'a shiver ran down', 'the calm before the storm',
    'it was a dark and stormy night', 'as white as snow', 'as quiet as a mouse',
    'blood ran cold', 'butterflies in my stomach'
];

// Positive lists — used by the Word Bank tool, not the critique engine.
const WORD_BANK = {
    'Strong verbs': ['hurtled', 'clattered', 'shattered', 'whispered', 'lunged', 'crumpled', 'blazed', 'sagged', 'snarled', 'trembled', 'vaulted', 'seeped', 'thundered', 'flickered', 'wrenched', 'drifted'],
    'Sound words': ['creak', 'thud', 'hiss', 'rustle', 'clang', 'squelch', 'whir', 'crackle', 'boom', 'patter', 'screech', 'murmur'],
    'Smell & taste': ['smoky', 'metallic', 'sour', 'sugary', 'damp', 'burnt', 'salty', 'stale', 'sharp', 'earthy'],
    'Touch words': ['gritty', 'slimy', 'prickly', 'silky', 'sticky', 'icy', 'rough', 'feathery', 'clammy'],
    'Feelings (to SHOW, not say)': ['fists clenched', 'throat tightened', 'knees wobbled', 'grin spread', 'shoulders dropped', 'breath caught', 'stomach flipped', 'eyes stung'],
    'Time & flow': ['meanwhile', 'moments later', 'by the time', 'until then', 'the next morning', 'as soon as', 'before long', 'that was when']
};

// Common overused sentence openers — flagged when a paragraph leans on one.
const WEAK_OPENERS = ['then', 'and', 'so', 'but', 'suddenly', 'i', 'he', 'she', 'it', 'they'];

// Fragments the drills and craft cards quote; kept here so lesson text and the
// coach's advice always name the same words.
const SAID_ALTERNATIVES = WEAK_VERBS.said;

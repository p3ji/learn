// Inline SVG portraits for the thinkers.
//
// Why SVG rather than photographs or paintings:
//   - no network request (the app is offline-capable and privacy-hardened)
//   - no copyright or attribution problem
//   - scales cleanly from a 64px carousel chip to a 220px story panel
//   - one visual language across all eleven, instead of a mismatched gallery
//
// Each portrait is built from shared parts (head, garment, hair, beard) driven
// by a small parameter block, so they look like a set. Historical dress is
// approximated to the person's own era and place - deliberately, because the
// clothes are part of what tells a child "this person lived a long time ago,
// somewhere else".

const PORTRAIT_PARTS = {

    hair: {
        balding: (c) => `
            <path d="M62 96 Q60 62 100 58 Q140 62 138 96 L132 92 Q130 72 100 70 Q70 72 68 92 Z" fill="${c}"/>
            <path d="M58 100 Q54 122 62 138 Q56 116 62 98 Z" fill="${c}"/>
            <path d="M142 100 Q146 122 138 138 Q144 116 138 98 Z" fill="${c}"/>`,
        curlyShort: (c) => `
            <path d="M60 100 Q56 58 100 54 Q144 58 140 100 Q136 76 100 72 Q64 76 60 100 Z" fill="${c}"/>
            ${[68, 84, 100, 116, 132].map((x, i) =>
                `<circle cx="${x}" cy="${64 + (i % 2) * 6}" r="12" fill="${c}"/>`).join('')}
            <circle cx="60" cy="86" r="10" fill="${c}"/><circle cx="140" cy="86" r="10" fill="${c}"/>`,
        longWavy: (c) => `
            <path d="M58 96 Q54 56 100 52 Q146 56 142 96 L142 150 Q136 128 132 96 Q128 74 100 72 Q72 74 68 96 Q64 128 58 150 Z" fill="${c}"/>`,
        topknot: (c) => `
            <path d="M66 92 Q64 64 100 60 Q136 64 134 92 Q128 74 100 72 Q72 74 66 92 Z" fill="${c}"/>
            <ellipse cx="100" cy="48" rx="16" ry="13" fill="${c}"/>
            <rect x="88" y="44" width="24" height="5" rx="2.5" fill="rgba(0,0,0,0.25)"/>`,
        wig: (c) => `
            <path d="M56 98 Q52 56 100 52 Q148 56 144 98 Q140 74 100 70 Q60 74 56 98 Z" fill="${c}"/>
            <ellipse cx="52" cy="108" rx="15" ry="19" fill="${c}"/>
            <ellipse cx="148" cy="108" rx="15" ry="19" fill="${c}"/>
            <ellipse cx="54" cy="130" rx="12" ry="14" fill="${c}"/>
            <ellipse cx="146" cy="130" rx="12" ry="14" fill="${c}"/>`,
        updo: (c) => `
            <path d="M60 98 Q56 58 100 54 Q144 58 140 98 Q134 76 100 72 Q66 76 60 98 Z" fill="${c}"/>
            <ellipse cx="100" cy="46" rx="22" ry="15" fill="${c}"/>
            <ellipse cx="58" cy="116" rx="11" ry="17" fill="${c}"/>
            <ellipse cx="142" cy="116" rx="11" ry="17" fill="${c}"/>`,
        boundVeil: (c, accent) => `
            <path d="M58 100 Q54 58 100 54 Q146 58 142 100 Q138 76 100 72 Q62 76 58 100 Z" fill="${c}"/>
            <path d="M54 96 Q52 66 100 60 Q148 66 146 96 L146 118 Q140 96 100 92 Q60 96 54 118 Z" fill="${accent}" opacity="0.92"/>
            <path d="M54 112 Q50 150 60 168 L140 168 Q150 150 146 112 Q140 138 100 140 Q60 138 54 112 Z" fill="${accent}" opacity="0.55"/>`,
        cap: (c, accent) => `
            <path d="M64 94 Q62 68 100 64 Q138 68 136 94 Q130 78 100 76 Q70 78 64 94 Z" fill="${c}"/>
            <path d="M66 74 Q66 52 100 50 Q134 52 134 74 Z" fill="${accent}"/>
            <rect x="62" y="70" width="76" height="9" rx="4.5" fill="${accent}"/>
            <rect x="94" y="34" width="12" height="18" rx="3" fill="${accent}"/>`
    },

    beard: {
        none: () => '',
        full: (c) => `
            <path d="M66 116 Q64 172 100 182 Q136 172 134 116 Q130 150 100 154 Q70 150 66 116 Z" fill="${c}"/>`,
        long: (c) => `
            <path d="M72 120 Q70 176 100 200 Q130 176 128 120 Q124 152 100 156 Q76 152 72 120 Z" fill="${c}"/>
            <path d="M86 150 Q100 210 114 150 Q100 168 86 150 Z" fill="${c}"/>`,
        wispy: (c) => `
            <path d="M84 132 Q82 168 100 196 Q118 168 116 132 Q108 146 100 146 Q92 146 84 132 Z" fill="${c}"/>
            <path d="M76 126 Q74 140 80 148" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M124 126 Q126 140 120 148" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
        goatee: (c) => `
            <path d="M88 138 Q88 162 100 172 Q112 162 112 138 Q100 146 88 138 Z" fill="${c}"/>`,
        sideWhiskers: (c) => `
            <path d="M64 104 Q60 142 76 152 Q72 128 72 106 Z" fill="${c}"/>
            <path d="M136 104 Q140 142 124 152 Q128 128 128 106 Z" fill="${c}"/>`
    },

    moustache: {
        none: () => '',
        thin: (c) => `<path d="M84 128 Q100 122 116 128 Q100 133 84 128 Z" fill="${c}"/>`,
        wide: (c) => `<path d="M76 126 Q100 118 124 126 Q112 136 100 132 Q88 136 76 126 Z" fill="${c}"/>`
    }
};

// era-appropriate dress, hair and one signature object per thinker
const PORTRAIT_SPEC = {
    socrates: {
        accent: '#C9A227', skin: '#D9A066', hair: '#E8E6E1', garment: '#EDE6D6', trim: '#C9A227',
        hairStyle: 'balding', beard: 'full', moustache: 'wide', snubNose: true,
        prop: 'owl', alt: 'Socrates: an older man from ancient Athens with a bald head, full white beard and a plain woollen cloak.'
    },
    hypatia: {
        accent: '#0E7490', skin: '#C68642', hair: '#2B211B', garment: '#1D6E7E', trim: '#67E8F9',
        hairStyle: 'boundVeil', beard: 'none', moustache: 'none',
        prop: 'astrolabe', alt: 'Hypatia of Alexandria: a woman in Roman Egypt wearing a teal robe and a bound headwrap.'
    },
    aristotle: {
        accent: '#15803D', skin: '#D9A066', hair: '#4A3728', garment: '#E7E0CE', trim: '#15803D',
        hairStyle: 'curlyShort', beard: 'full', moustache: 'wide',
        prop: 'scroll', alt: 'Aristotle: a man from ancient Greece with short curly hair, a full beard and a draped cloak.'
    },
    aurelius: {
        accent: '#9F1239', skin: '#D9A066', hair: '#5B4636', garment: '#F1EAE0', trim: '#9F1239',
        hairStyle: 'curlyShort', beard: 'full', moustache: 'wide',
        prop: 'column', alt: 'Marcus Aurelius: a Roman emperor with curly hair and beard, wearing a white toga with a red band.'
    },
    descartes: {
        accent: '#4338CA', skin: '#E0B48C', hair: '#231A14', garment: '#1E1B2E', trim: '#F8FAFC',
        hairStyle: 'longWavy', beard: 'goatee', moustache: 'thin', collar: 'lace',
        prop: 'geometry', alt: 'Rene Descartes: a 17th-century French man with long dark hair, a pointed beard and a wide white collar.'
    },
    popper: {
        accent: '#475569', skin: '#E8C39E', hair: '#B9C0C8', garment: '#334155', trim: '#94A3B8',
        hairStyle: 'balding', beard: 'none', moustache: 'none', glasses: true, tie: '#7F1D1D',
        prop: 'swan', alt: 'Karl Popper: a 20th-century man with glasses, thinning grey hair, a dark suit and tie.'
    },
    mill: {
        accent: '#166534', skin: '#E8C39E', hair: '#8A7B6B', garment: '#1F2937', trim: '#F8FAFC',
        hairStyle: 'balding', beard: 'sideWhiskers', moustache: 'none', collar: 'victorian',
        prop: 'quill', alt: 'John Stuart Mill: a Victorian man with side whiskers, a high white collar and a dark coat.'
    },
    confucius: {
        accent: '#B91C1C', skin: '#E0B48C', hair: '#2B211B', garment: '#7F1D1D', trim: '#FCD34D',
        hairStyle: 'cap', beard: 'long', moustache: 'thin',
        prop: 'bambooBook', alt: 'Confucius: an ancient Chinese teacher wearing a scholar cap and red robe, with a long thin beard.'
    },
    lao_tzu: {
        accent: '#0369A1', skin: '#E0B48C', hair: '#EFEFEA', garment: '#1E3A5F', trim: '#7DD3FC',
        hairStyle: 'topknot', beard: 'long', moustache: 'thin',
        prop: 'water', alt: 'Lao Tzu: an ancient Chinese sage with a topknot, very long white beard and a simple blue robe.'
    },
    kant: {
        accent: '#6D28D9', skin: '#EBC8A4', hair: '#E9E4DC', garment: '#3F3A5A', trim: '#DDD6FE',
        hairStyle: 'wig', beard: 'none', moustache: 'none', collar: 'lace',
        prop: 'clock', alt: 'Immanuel Kant: an 18th-century Prussian man in a powdered white wig and a formal coat.'
    },
    lovelace: {
        accent: '#BE185D', skin: '#EBC8A4', hair: '#3B2A1F', garment: '#7E2A54', trim: '#FBCFE8',
        hairStyle: 'updo', beard: 'none', moustache: 'none', collar: 'lace',
        prop: 'punchcard', alt: 'Ada Lovelace: a Victorian woman with dark hair in ringlets, wearing a lace collar and a rose gown.'
    },
    buddha: {
        accent: '#B45309', skin: '#D9A066', hair: '#2B211B', garment: '#C2410C', trim: '#FCD34D',
        hairStyle: 'topknot', beard: 'none', moustache: 'none',
        prop: 'lotus', alt: 'Siddhartha Gautama, the Buddha: a seated figure from ancient India with a topknot and a saffron robe, eyes lowered in calm.'
    },
    zhuangzi: {
        accent: '#0D9488', skin: '#E0B48C', hair: '#3B2A1F', garment: '#134E4A', trim: '#5EEAD4',
        hairStyle: 'topknot', beard: 'wispy', moustache: 'thin',
        prop: 'butterfly', alt: 'Zhuangzi: an ancient Chinese philosopher with a topknot and wispy beard, wearing a plain teal robe.'
    },
    ibn_sina: {
        accent: '#047857', skin: '#C68642', hair: '#241C16', garment: '#065F46', trim: '#6EE7B7',
        hairStyle: 'cap', beard: 'full', moustache: 'wide',
        prop: 'crescent', alt: 'Ibn Sina, also called Avicenna: a Persian scholar in a green robe and scholar cap, with a full dark beard.'
    },
    zera_yacob: {
        accent: '#7C2D12', skin: '#8D5524', hair: '#1C1512', garment: '#78350F', trim: '#FDBA74',
        hairStyle: 'balding', beard: 'full', moustache: 'wide',
        prop: 'scrollQuill', alt: 'Zera Yacob: a 17th-century Ethiopian philosopher with a full beard, wearing a simple earth-coloured robe.'
    },
    wollstonecraft: {
        accent: '#9D174D', skin: '#EBC8A4', hair: '#6B4423', garment: '#831843', trim: '#FBCFE8',
        hairStyle: 'updo', beard: 'none', moustache: 'none', collar: 'lace',
        prop: 'quill', alt: 'Mary Wollstonecraft: an 18th-century English writer with hair pinned up, wearing a dark red gown with a white collar.'
    },
    du_bois: {
        accent: '#1E40AF', skin: '#7A4B28', hair: '#1C1512', garment: '#1E293B', trim: '#F8FAFC',
        hairStyle: 'balding', beard: 'goatee', moustache: 'wide', collar: 'victorian',
        prop: 'book', alt: 'W. E. B. Du Bois: an American scholar in a dark suit and high collar, with a neat moustache and pointed beard.'
    }
};

const PORTRAIT_PROPS = {
    owl: `<g transform="translate(150,182) scale(0.9)"><ellipse cx="0" cy="0" rx="17" ry="20" fill="#8B6F3E"/><circle cx="-6" cy="-6" r="6" fill="#FFF"/><circle cx="6" cy="-6" r="6" fill="#FFF"/><circle cx="-6" cy="-6" r="3" fill="#111"/><circle cx="6" cy="-6" r="3" fill="#111"/><path d="M0 -2 l-4 5 h8 Z" fill="#F59E0B"/></g>`,
    astrolabe: `<g transform="translate(150,182)"><circle r="18" fill="none" stroke="#FBBF24" stroke-width="3"/><ellipse rx="18" ry="7" fill="none" stroke="#FBBF24" stroke-width="2"/><line x1="-18" y1="0" x2="18" y2="0" stroke="#FBBF24" stroke-width="2"/><line x1="0" y1="-18" x2="0" y2="18" stroke="#FBBF24" stroke-width="2"/></g>`,
    scroll: `<g transform="translate(150,182)"><rect x="-16" y="-13" width="32" height="26" rx="3" fill="#F5EEDC"/><line x1="-10" y1="-5" x2="10" y2="-5" stroke="#9CA3AF" stroke-width="2"/><line x1="-10" y1="2" x2="10" y2="2" stroke="#9CA3AF" stroke-width="2"/><rect x="-19" y="-15" width="6" height="30" rx="3" fill="#B45309"/><rect x="13" y="-15" width="6" height="30" rx="3" fill="#B45309"/></g>`,
    column: `<g transform="translate(150,182)"><rect x="-13" y="-18" width="26" height="6" rx="2" fill="#E5E7EB"/><rect x="-9" y="-12" width="18" height="24" fill="#F3F4F6"/><line x1="-3" y1="-12" x2="-3" y2="12" stroke="#CBD5E1" stroke-width="2"/><line x1="3" y1="-12" x2="3" y2="12" stroke="#CBD5E1" stroke-width="2"/><rect x="-13" y="12" width="26" height="6" rx="2" fill="#E5E7EB"/></g>`,
    geometry: `<g transform="translate(150,182)" stroke="#A5B4FC" stroke-width="2.5" fill="none"><path d="M-16 12 L0 -14 L16 12 Z"/><circle cx="0" cy="2" r="8"/></g>`,
    swan: `<g transform="translate(150,182)"><ellipse cx="2" cy="6" rx="17" ry="10" fill="#1F2937"/><path d="M-6 2 Q-14 -12 -2 -16 Q6 -18 6 -10" stroke="#1F2937" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="6" cy="-11" r="2" fill="#FBBF24"/></g>`,
    quill: `<g transform="translate(150,182)"><path d="M-12 14 Q6 -6 14 -16 Q10 4 -6 16 Z" fill="#F1F5F9"/><line x1="-12" y1="14" x2="-2" y2="4" stroke="#94A3B8" stroke-width="2"/></g>`,
    bambooBook: `<g transform="translate(150,182)">${[-12, -6, 0, 6, 12].map(x => `<rect x="${x - 2}" y="-15" width="4.5" height="30" rx="2" fill="#CA8A04"/>`).join('')}<line x1="-16" y1="-6" x2="16" y2="-6" stroke="#78350F" stroke-width="2"/><line x1="-16" y1="8" x2="16" y2="8" stroke="#78350F" stroke-width="2"/></g>`,
    water: `<g transform="translate(150,184)" stroke="#7DD3FC" stroke-width="3.5" fill="none" stroke-linecap="round"><path d="M-17 -6 q8 -7 17 0 t17 0"/><path d="M-17 3 q8 -7 17 0 t17 0"/><path d="M-17 12 q8 -7 17 0 t17 0"/></g>`,
    clock: `<g transform="translate(150,182)"><circle r="17" fill="#F8FAFC" stroke="#6D28D9" stroke-width="3"/><line x1="0" y1="0" x2="0" y2="-10" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/><line x1="0" y1="0" x2="7" y2="4" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/></g>`,
    punchcard: `<g transform="translate(150,182)"><rect x="-18" y="-13" width="36" height="26" rx="2" fill="#FDF2F8" stroke="#BE185D" stroke-width="2"/><path d="M-18 -13 l6 0 l-6 6 Z" fill="#BE185D"/>${[-10, -2, 6, 12].map((x, i) => [-5, 2].map(y => `<rect x="${x}" y="${y + (i % 2) * 3}" width="4" height="4" rx="1" fill="#BE185D"/>`).join('')).join('')}</g>`,
    lotus: `<g transform="translate(150,184)"><ellipse cx="0" cy="4" rx="18" ry="6" fill="#FBBF24" opacity="0.5"/>${[-14,-7,0,7,14].map((x,i)=>`<ellipse cx="${x}" cy="${-2-Math.abs(i-2)*2}" rx="5" ry="12" fill="#FDA4AF" transform="rotate(${(i-2)*22} ${x} ${-2})"/>`).join('')}<circle cy="-2" r="4" fill="#FBBF24"/></g>`,
    butterfly: `<g transform="translate(150,182)"><ellipse cx="-9" cy="-4" rx="9" ry="12" fill="#5EEAD4" transform="rotate(-20 -9 -4)"/><ellipse cx="9" cy="-4" rx="9" ry="12" fill="#5EEAD4" transform="rotate(20 9 -4)"/><ellipse cx="-7" cy="9" rx="7" ry="8" fill="#2DD4BF" transform="rotate(-15 -7 9)"/><ellipse cx="7" cy="9" rx="7" ry="8" fill="#2DD4BF" transform="rotate(15 7 9)"/><rect x="-1.5" y="-12" width="3" height="26" rx="1.5" fill="#134E4A"/></g>`,
    crescent: `<g transform="translate(150,182)"><path d="M6 -16 A16 16 0 1 0 6 16 A13 13 0 1 1 6 -16 Z" fill="#6EE7B7"/><path d="M13 -6 l2 5 l5 1 l-4 4 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -4 l5 -1 Z" fill="#FBBF24"/></g>`,
    scrollQuill: `<g transform="translate(150,182)"><rect x="-17" y="-12" width="30" height="24" rx="3" fill="#F5EEDC"/><line x1="-11" y1="-4" x2="7" y2="-4" stroke="#9CA3AF" stroke-width="2"/><line x1="-11" y1="3" x2="7" y2="3" stroke="#9CA3AF" stroke-width="2"/><path d="M8 12 Q18 -2 21 -14 Q17 0 11 13 Z" fill="#FDBA74"/></g>`,
    book: `<g transform="translate(150,182)"><path d="M-17 -13 h15 v27 h-15 Z" fill="#E2E8F0"/><path d="M2 -13 h15 v27 h-15 Z" fill="#F8FAFC"/><rect x="-2" y="-14" width="4" height="29" rx="1" fill="#1E40AF"/><line x1="-13" y1="-5" x2="-5" y2="-5" stroke="#94A3B8" stroke-width="2"/><line x1="5" y1="-5" x2="13" y2="-5" stroke="#94A3B8" stroke-width="2"/></g>`
};

// Real public-domain portraits, one per thinker, shown as the final story slide.
//
// Every file was checked individually against the Wikimedia Commons API before
// being vendored into img/portraits/ - each page explicitly carries a "Public
// domain" license (old work, expired copyright), not a Creative Commons or
// permission-only grant. Two deliberate exceptions:
//
//   - Karl Popper (d. 1994) has no PORTRAIT_PHOTOS entry. He lived recently
//     enough that photographs of him are still under copyright in most
//     countries - the images findable online are permission-granted or
//     CC-BY-SA, not public domain, so none is vendored. His slide explains why
//     instead of silently differing from the other ten.
//   - Hypatia's entry is a mid-19th-century engraving by an unknown artist,
//     not the famous 1885 Charles Mitchell painting. That painting is also
//     public domain, but depicts her nude, which is not appropriate here.
//
// `lifetime: true` means the image was made from or near life (a photograph,
// or a painting of a living sitter); `lifetime: false` means it was made
// substantially after the person's death and is a later artist's idea of
// their appearance. Both are worth saying out loud to a child - "how do we
// know what someone looked like" is itself part of the app's theme.
const PORTRAIT_PHOTOS = {
    socrates: {
        file: 'img/portraits/socrates.jpg',
        lifetime: false,
        caption: 'No portrait of Socrates from his own lifetime survives. This marble head, carved centuries later, is a Roman copy of an earlier Greek sculptor’s idea of what a wise old philosopher should look like - not a likeness taken from life.',
        credit: 'Roman marble copy, after a Greek original. Louvre Museum, Paris.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Socrates_Louvre.jpg'
    },
    hypatia: {
        file: 'img/portraits/hypatia.jpg',
        lifetime: false,
        caption: 'Nobody drew or painted Hypatia while she was alive. This engraving was made about 1,400 years after her death - an artist imagining her from the little that was written about her.',
        credit: 'Unknown engraver, mid-19th century.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/Category:Hypatia'
    },
    aristotle: {
        file: 'img/portraits/aristotle.jpg',
        lifetime: false,
        caption: 'Like the Socrates bust, this is a later copy - Roman stonecutters carving a Greek sculptor’s imagined portrait of Aristotle, not a likeness made while he was alive.',
        credit: 'Roman marble copy, after a Greek original attributed to Lysippos. Palazzo Altemps, Rome.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg'
    },
    aurelius: {
        file: 'img/portraits/aurelius.jpg',
        lifetime: true,
        caption: 'As emperor, Marcus Aurelius had his portrait carved often and sent across the empire, so this bust was very likely made from or close to life.',
        credit: 'Roman marble bust, 2nd century CE. Metropolitan Museum of Art, New York.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Metropolitan_Museum.png'
    },
    descartes: {
        file: 'img/portraits/descartes.jpg',
        lifetime: true,
        caption: 'This is a later copy of a portrait originally painted from life in the 1640s, while Descartes was alive.',
        credit: 'After Frans Hals. Louvre Museum, Paris.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg'
    },
    popper: {
        noPhoto: true,
        caption: 'Karl Popper died in 1994 - recently enough that photographs of him are still under copyright in most countries, so we cannot show a real one here yet. That is worth knowing: not everything true and well-documented is free to copy and share. If a museum or copyright holder ever releases a photo of him into the public domain, we will add it.'
    },
    mill: {
        file: 'img/portraits/mill.jpg',
        lifetime: true,
        caption: 'A real photograph, taken of Mill himself in 1865, eight years before he died.',
        credit: 'Photograph by John Watkins, 1865.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:John_Stuart_Mill_by_John_Watkins,_1865.jpg'
    },
    confucius: {
        file: 'img/portraits/confucius.jpg',
        lifetime: false,
        caption: 'This painting was made roughly 1,200 years after Confucius lived. No image from his own time survives - this is a later artist’s idea of him, though it became the standard way he has been pictured ever since.',
        credit: 'Traditionally attributed to Wu Daozi, Tang Dynasty (8th century CE).',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty.jpg'
    },
    lao_tzu: {
        file: 'img/portraits/lao_tzu.jpg',
        lifetime: false,
        caption: 'Remember Scene 1: historians are not even sure Lao Tzu was one real person. This traditional painting, artist unknown, is a much later imagining - not a record of an actual face.',
        credit: 'Traditional Chinese painting, artist unknown.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Laozi.jpg'
    },
    kant: {
        file: 'img/portraits/kant.jpg',
        lifetime: true,
        caption: 'Painted during Kant’s lifetime, in the circle of artists who painted the other thinkers and nobles of his city.',
        credit: 'Artist uncertain (school of Anton Graff), 18th century.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Immanuel_Kant_(painted_portrait).jpg'
    },
    lovelace: {
        file: 'img/portraits/lovelace.jpg',
        lifetime: true,
        caption: 'Painted from life in 1836, when Ada was 21 - sixteen years before she met Babbage’s Analytical Engine.',
        credit: 'Margaret Sarah Carpenter, 1836. Government Art Collection, UK.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Carpenter_portrait_of_Ada_Lovelace_-_detailFXD.jpg'
    },
    buddha: {
        file: 'img/portraits/buddha.jpg',
        lifetime: false,
        caption: 'Painted more than 2,000 years after he lived. Nobody drew the Buddha while he was alive - for centuries afterwards artists did not show him as a person at all, only as an empty seat or a pair of footprints.',
        credit: 'Shakyamuni Buddha with Avadana legend scenes, 19th century, artist unknown.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Shakyamuni_Buddha_with_Avadana_Legend_Scenes_-_Google_Art_Project.jpg'
    },
    zhuangzi: {
        file: 'img/portraits/zhuangzi.jpg',
        lifetime: false,
        caption: 'A much later Chinese painting - an artist’s idea of him, made long after his death. Fitting, for a man who wondered whether he was a butterfly dreaming it was a man.',
        credit: 'Traditional Chinese painting, artist and date unknown.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Zhuangzi.gif'
    },
    ibn_sina: {
        file: 'img/portraits/ibn_sina.jpg',
        lifetime: false,
        caption: 'An imagined portrait made centuries after his death. We have around 240 of his books but no picture drawn by anyone who met him.',
        credit: 'Later portrait of Avicenna, artist unknown.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Avicenna.jpg'
    },
    zera_yacob: {
        noPhoto: true,
        caption: 'There is no picture of Zera Yacob anywhere in the world - not a painting, not a drawing, nothing. This is a different problem from Karl Popper, whose photographs exist but are still under copyright. Here, no one ever made one. We have his book and his arguments from 1667, and no idea what his face looked like. Being remembered for your ideas and forgotten as a face is a real thing that happens to people.'
    },
    wollstonecraft: {
        file: 'img/portraits/wollstonecraft.jpg',
        lifetime: true,
        caption: 'Painted from life around 1797, the year she died. She was about 38, and had just finished the book she is best known for.',
        credit: 'John Opie, c. 1797. National Portrait Gallery, London.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:Mary_Wollstonecraft_by_John_Opie_(c._1797).jpg'
    },
    du_bois: {
        file: 'img/portraits/du_bois.jpg',
        lifetime: true,
        caption: 'A real photograph of Du Bois, taken in 1918 when he was 50. He lived another 45 years after this was taken.',
        credit: 'Photograph by Cornelius Marion Battey, 1918.',
        commonsUrl: 'https://commons.wikimedia.org/wiki/File:WEB_DuBois_1918.jpg'
    }
};

/**
 * Build one portrait as a self-contained inline SVG string.
 * @param {string} thinkerId  key in PORTRAIT_SPEC
 * @param {number} size       rendered px (viewBox is fixed at 200x240)
 */
function renderThinkerPortrait(thinkerId, size = 180) {
    const p = PORTRAIT_SPEC[thinkerId];
    if (!p) {
        return `<div style="font-size:${size * 0.5}px; text-align:center;" aria-hidden="true">🏛️</div>`;
    }

    const hairFn = PORTRAIT_PARTS.hair[p.hairStyle] || PORTRAIT_PARTS.hair.balding;
    const beardFn = PORTRAIT_PARTS.beard[p.beard] || PORTRAIT_PARTS.beard.none;
    const moFn = PORTRAIT_PARTS.moustache[p.moustache] || PORTRAIT_PARTS.moustache.none;

    // Hair styles that wrap the head (veil, cap) need the accent colour too.
    const hairSvg = (p.hairStyle === 'boundVeil' || p.hairStyle === 'cap')
        ? hairFn(p.hair, p.trim)
        : hairFn(p.hair);

    const collar = {
        lace: `<path d="M70 214 Q100 236 130 214 L130 224 Q100 246 70 224 Z" fill="${p.trim}"/>`,
        victorian: `<path d="M84 208 L100 232 L116 208 L124 214 L100 240 L76 214 Z" fill="${p.trim}"/>`
    }[p.collar] || '';

    const tie = p.tie
        ? `<path d="M100 214 l-8 8 l8 26 l8 -26 Z" fill="${p.tie}"/>`
        : '';

    const glasses = p.glasses ? `
        <g stroke="#1F2937" stroke-width="3" fill="rgba(255,255,255,0.18)">
            <rect x="68" y="104" width="26" height="20" rx="7"/>
            <rect x="106" y="104" width="26" height="20" rx="7"/>
            <line x1="94" y1="113" x2="106" y2="113"/>
        </g>` : '';

    const nose = p.snubNose
        ? `<path d="M100 118 q-9 8 -2 14 q4 3 9 0" fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="3" stroke-linecap="round"/>`
        : `<path d="M100 116 q-4 12 -1 17 q3 2 6 0" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="3" stroke-linecap="round"/>`;

    return `
<svg viewBox="0 0 200 240" width="${size}" height="${size * 1.2}" role="img"
     aria-label="${p.alt}" style="display:block; max-width:100%; height:auto;">
    <defs>
        <clipPath id="clip_${thinkerId}"><rect x="0" y="0" width="200" height="240" rx="18"/></clipPath>
        <linearGradient id="bg_${thinkerId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.42"/>
            <stop offset="100%" stop-color="${p.accent}" stop-opacity="0.10"/>
        </linearGradient>
    </defs>

    <g clip-path="url(#clip_${thinkerId})">
        <rect width="200" height="240" fill="url(#bg_${thinkerId})"/>
        <circle cx="100" cy="120" r="74" fill="${p.accent}" opacity="0.16"/>

        <!-- shoulders / garment -->
        <path d="M28 240 Q34 190 74 176 L126 176 Q166 190 172 240 Z" fill="${p.garment}"/>
        <path d="M74 176 L100 208 L126 176 L120 174 L100 198 L80 174 Z" fill="rgba(0,0,0,0.18)"/>
        ${collar}
        ${tie}

        <!-- neck + head -->
        <path d="M86 158 h28 v26 q-14 8 -28 0 Z" fill="${p.skin}"/>
        <path d="M86 158 h28 v10 q-14 6 -28 0 Z" fill="rgba(0,0,0,0.14)"/>
        <ellipse cx="100" cy="118" rx="42" ry="50" fill="${p.skin}"/>
        <ellipse cx="58" cy="122" rx="7" ry="11" fill="${p.skin}"/>
        <ellipse cx="142" cy="122" rx="7" ry="11" fill="${p.skin}"/>

        <!-- features -->
        <ellipse cx="84" cy="112" rx="4.5" ry="5" fill="#2B211B"/>
        <ellipse cx="116" cy="112" rx="4.5" ry="5" fill="#2B211B"/>
        <path d="M75 101 q9 -6 18 -1" stroke="rgba(0,0,0,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M107 100 q9 -5 18 1" stroke="rgba(0,0,0,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
        ${nose}
        <path d="M88 142 q12 7 24 0" stroke="rgba(0,0,0,0.35)" stroke-width="3" fill="none" stroke-linecap="round"/>

        ${beardFn(p.hair)}
        ${moFn(p.hair)}
        ${hairSvg}
        ${glasses}

        ${PORTRAIT_PROPS[p.prop] || ''}
    </g>
    <rect x="1.5" y="1.5" width="197" height="237" rx="17" fill="none"
          stroke="${p.accent}" stroke-width="3" opacity="0.75"/>
</svg>`.trim();
}

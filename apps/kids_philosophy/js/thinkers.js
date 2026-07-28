// Philosopher Trading Cards & Unified Single-Topic Stage Renderer with 15-Minute Tab Depth
const thinkersData = [
    {
        id: "socrates",
        name: "Socrates",
        era: "Ancient Greece (469 - 399 BCE)",
        avatar: "🦉",
        quote: "The unexamined life is not worth living.",
        superpower: "The Socratic Questioning Method",
        conceptIntro: "Socrates believed that true wisdom begins when we admit we don't know everything. Instead of giving boring lectures, he asked deep 'Why?' questions to help people discover truth themselves!",
        storyScenes: [
            {
                title: "Scene 1: The Marketplace Inquiry",
                heading: "Walking Through Ancient Athens",
                imageEmoji: "🏛️",
                text: "Socrates didn't sit in a fancy palace. He walked around the busy Athenian marketplace asking soldiers, politicians, and craftsmen simple questions like: 'What is courage?' and 'What makes a law fair?'"
            },
            {
                title: "Scene 2: Uncovering Assumptions",
                heading: "The Power of Asking 'Why?'",
                imageEmoji: "❓",
                text: "When people gave quick answers, Socrates asked follow-up questions until they realized their first answer was incomplete! He called himself a 'gadfly' stinging people into thinking deeply."
            },
            {
                title: "Scene 3: The Gift of Inquiry",
                heading: "Admitting What We Don't Know",
                imageEmoji: "🦉",
                text: "Socrates famously said: 'All I know is that I know nothing.' By questioning assumptions, you break free from rumors and find true understanding for yourself!"
            }
        ],
        vocabCards: [
            { term: "Dialectic", icon: "💬", definition: "A conversation between two people with different ideas who use logical questions to find truth together." },
            { term: "Axiom", icon: "🔑", definition: "A basic statement or truth that is accepted without proof as a foundation for reasoning." },
            { term: "Skepticism", icon: "🧐", definition: "Questioning whether statements or rumors are true instead of accepting them blindly." }
        ],
        inDepth: {
            history: "Socrates walked through the market square of Athens in ancient Greece asking people simple questions that made them think carefully about their beliefs.",
            whyItMatters: "Instead of accepting what people tell you, asking 'Why?' helps you break down big claims and discover first principles for yourself.",
            funFact: "Socrates never wrote down a single book! All of his ideas were written down by his famous student, Plato."
        },
        caseStudies: [
            { title: "School Dilemma", text: "A friend says: 'Rules at school are unnecessary!' Socratic Question: 'If there were no rules, how would students cross the busy street safely?'" },
            { title: "Gaming Dilemma", text: "Someone claims: 'Cheating in games is smart!' Socratic Question: 'If everyone cheated, would winning have any meaning anymore?'" },
            { title: "Science Inquiry", text: "Someone says: 'The sun moves because the sky wants to.' Socratic Question: 'How can we measure planetary orbits to test if that is true?'" }
        ],
        videoId: "yW6hL9dD7Vw", // TED-Ed Socratic Method
        videoQuiz: [
            { question: "What was Socrates' main goal when asking questions?", options: [{ text: "To help people examine their beliefs and discover truth", correct: true }, { text: "To win prize money", correct: false }] },
            { question: "How did Socrates feel about claiming to know everything?", options: [{ text: "True wisdom begins by admitting you don't know everything", correct: true }, { text: "He claimed to be the smartest human alive", correct: false }] }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Apprentice Questioner",
                scenario: "A friend says: 'We don't need garbage bins in the park!' What is the best Socratic question?",
                options: [
                    { text: "❓ 'What happens to the park animals if trash is left everywhere on the grass?'", correct: true, feedback: "Great question! That helps your friend see the consequences." },
                    { text: "❌ 'You are completely wrong and funny looking!'", correct: false, feedback: "That's an insult, not a Socratic question." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Socratic Method Scholar",
                scenario: "Someone claims: 'Winning is the ONLY thing that matters in sports!' How do you challenge this?",
                options: [
                    { text: "❓ 'If a team cheats to win, do they still feel proud of their victory?'", correct: true, feedback: "Spot on! That uncovers the core value of honor and fair play." },
                    { text: "❌ 'I guess you are right, let's just win!'", correct: false, feedback: "That accepts the claim without questioning it." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Socratic Dilemma",
                scenario: "A ruler says: 'I make the laws, so whatever I decide is automatically fair!' What is the deepest question to ask?",
                options: [
                    { text: "❓ 'Is an action fair because a ruler decides it, or does a ruler decide it because it is inherently fair?'", correct: true, feedback: "LEGENDARY SOCRATIC QUESTION! This is the Euthyphro Dilemma!" },
                    { text: "❌ 'Can I have a cookie?'", correct: false, feedback: "Off topic!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "Why do you ask so many questions?", answer: "Because asking 'Why?' is the golden key that unlocks your own mind's wisdom!" },
            { prompt: "How do I become wiser?", answer: "Begin by admitting that you do not know everything. Curiosities and questions lead to truth!" },
            { prompt: "What is your famous quote?", answer: "The unexamined life is not worth living!" }
        ]
    },
    {
        id: "hypatia",
        name: "Hypatia of Alexandria",
        era: "Ancient Egypt/Greece (360 - 415 CE)",
        avatar: "📐",
        quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
        superpower: "Mathematical Truth & Clear Evidence",
        conceptIntro: "Hypatia taught that we must test ideas with real measurements and geometry, rather than accepting rumors or superstitions.",
        storyScenes: [
            {
                title: "Scene 1: The Library of Alexandria",
                heading: "Center of Ancient World Knowledge",
                imageEmoji: "📚",
                text: "Hypatia studied at the Great Library of Alexandria. She became head of the Neoplatonic school, teaching geometry, astronomy, and mathematics to eager students."
            },
            {
                title: "Scene 2: Testing Rumors with Data",
                heading: "Astrolabes and Astronomical Maps",
                imageEmoji: "🔭",
                text: "While others believed rumors about stars being magical creatures, Hypatia constructed astrolabes—devices used to measure the exact positions of stars and planets in the sky!"
            },
            {
                title: "Scene 3: Standing Up for Truth",
                heading: "The Right to Think for Yourself",
                imageEmoji: "📐",
                text: "Hypatia urged everyone to double-check claims with physical proof. She proved that critical thinking and geometry belong to every curious person!"
            }
        ],
        vocabCards: [
            { term: "Empiricism", icon: "🔬", definition: "The scientific principle that knowledge comes from sensory evidence and real-world testing." },
            { term: "Astrolabe", icon: "🧭", definition: "An ancient mathematical instrument used by astronomers to calculate planet and star positions." },
            { term: "Hypothesis", icon: "💡", definition: "A testable prediction or explanation for how something works in nature." }
        ],
        inDepth: {
            history: "Hypatia was the world's leading mathematician and astronomer in the ancient city of Alexandria, teaching students from around the world.",
            whyItMatters: "Testing hypotheses with hard evidence prevents us from being fooled by bad assumptions.",
            funFact: "She edited and preserved Ptolemy's astronomical maps and built astrolabes used for navigating by the stars!"
        },
        caseStudies: [
            { title: "Weather Inquiry", text: "Someone says: 'It only rains when the sky is sad.' Hypatia's Method: Measure cloud humidity, temperature, and evaporation!" },
            { title: "Plant Growth", text: "Someone says: 'Plants grow because of magic spells.' Hypatia's Method: Run an experiment measuring sunlight, soil, and water!" }
        ],
        videoId: "n1mwZrVJ-TI", // TED-Ed Hypatia
        videoQuiz: [
            { question: "What instruments did Hypatia build?", options: [{ text: "Astrolabes and astronomical charts", correct: true }, { text: "Steam engines", correct: false }] }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Evidence Detective",
                scenario: "A friend says: 'This magnet can pull plastic toys!' How do you test this?",
                options: [
                    { text: "🔬 Test the magnet on plastic and measure if there is any attraction", correct: true, feedback: "Correct! Real experiments prove truth." },
                    { text: "📢 Believe them without testing", correct: false, feedback: "That's not Hypatia's scientific approach." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Astrolabe Navigator",
                scenario: "You want to prove the Earth is round using shadow lengths in two different cities.",
                options: [
                    { text: "📐 Measure shadow angles at noon in both cities at the exact same time", correct: true, feedback: "Brilliant! Eratosthenes and Hypatia used this exact geometry!" },
                    { text: "❌ Guess the shape by looking at a cartoon", correct: false, feedback: "Use real geometrical data!" }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Evidence Lab",
                scenario: "Two competing theories explain why a shadow changes length during the day. How do you decide?",
                options: [
                    { text: "🔬 Record precise shadow length data every hour and compare with solar math models", correct: true, feedback: "PERFECT! Mathematical data crowns the true theory!" },
                    { text: "❌ Vote based on which speaker has a louder voice", correct: false, feedback: "Volume is not proof!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "How do we find scientific truth?", answer: "By measuring real evidence, testing hypotheses, and using geometry!" },
            { prompt: "What is an astrolabe?", answer: "It is an ancient handheld computer made of metal disks used to calculate the positions of stars!" }
        ]
    },
    {
        id: "aristotle",
        name: "Aristotle",
        era: "Ancient Greece (384 - 322 BCE)",
        avatar: "📜",
        quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        superpower: "Categorization & Habit Formation",
        conceptIntro: "Aristotle organized all human knowledge into logical categories (animals, plants, ethics) and showed that great character is built by practicing good habits every day.",
        storyScenes: [
            {
                title: "Scene 1: The Great Categorizer",
                heading: "Organizing the Natural World",
                imageEmoji: "🌿",
                text: "Aristotle loved examining plants, animals, and weather. He was the first scientist to group animals into categories based on their features!"
            },
            {
                title: "Scene 2: Building Character Habits",
                heading: "The Golden Mean & Virtues",
                imageEmoji: "🦁",
                text: "Aristotle believed that virtues like courage and honesty aren't magic spells. You become brave by practicing small acts of bravery every day!"
            },
            {
                title: "Scene 3: The Power of Repetition",
                heading: "Excellence is a Habit",
                imageEmoji: "📜",
                text: "Playing 10 minutes of music every day builds true mastery. Small daily habits shape your brain and future character!"
            }
        ],
        vocabCards: [
            { term: "Golden Mean", icon: "⚖️", definition: "The desirable middle point between two extremes (e.g., courage is between cowardice and recklessness)." },
            { term: "Taxonomy", icon: "📂", definition: "The branch of science concerned with classification of organisms and concepts into organized categories." },
            { term: "Habit", icon: "🔁", definition: "A settled practice or routine done regularly until it becomes second nature." }
        ],
        inDepth: {
            history: "Aristotle was a student of Plato and the personal tutor to Alexander the Great. He wrote books on biology, poetry, ethics, and physics.",
            whyItMatters: "Success doesn't happen overnight; it is the result of small, consistent daily habits.",
            funFact: "Aristotle created the very first system for classifying animals based on whether they had red blood or lived on land vs sea!"
        },
        caseStudies: [
            { title: "Music Mastery", text: "You don't become a master pianist in 1 day. Practicing 15 minutes a day for 100 days creates piano excellence!" }
        ],
        videoId: "csIW4W_DYX4", // School of Life Aristotle
        videoQuiz: [
            { question: "According to Aristotle, how do we build good character?", options: [{ text: "By practicing small daily habits of virtue", correct: true }, { text: "By wishing on a falling star", correct: false }] }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Habit Builder",
                scenario: "How do you become a fast runner?",
                options: [
                    { text: "🏃 Run 15 minutes every afternoon until it becomes a habit", correct: true, feedback: "Correct! Practice builds habit." },
                    { text: "👟 Buy expensive shoes and never practice", correct: false, feedback: "Shoes don't build habit." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Golden Mean Finder",
                scenario: "Where is true Courage on Aristotle's Golden Mean scale?",
                options: [
                    { text: "⚖️ Balanced in the middle between Cowardice (too scared) and Recklessness (foolhardy)", correct: true, feedback: "Spot on! The Golden Mean balance!" },
                    { text: "❌ Running away from every small bug", correct: false, feedback: "That is cowardice." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Categorizer",
                scenario: "Organize 3 animals (Dolphin, Eagle, Bear) into Aristotle's classification system.",
                options: [
                    { text: "📂 Group by habitat & breathing method (Bear = land mammal, Eagle = winged bird, Dolphin = sea mammal)", correct: true, feedback: "EXCELLENT TAXONOMY!" },
                    { text: "❌ Group by their favorite color", correct: false, feedback: "Color is not a biological category." }
                ]
            }
        ],
        chatResponses: [
            { prompt: "How do I become excellent at something?", answer: "Excellence is not a single act, but a daily habit! Practice small steps consistently every day." },
            { prompt: "What is the Golden Mean?", answer: "It is finding the perfect balance between doing too much and doing too little!" }
        ]
    },
    {
        id: "aurelius",
        name: "Marcus Aurelius",
        era: "Roman Empire (121 - 180 CE)",
        avatar: "🏛️",
        quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        superpower: "Stoic Mindset & Emotional Resilience",
        conceptIntro: "Marcus Aurelius was a Roman Emperor who wrote a personal diary reminding himself that we cannot control bad weather or mean people, but we CAN control our own reaction!",
        storyScenes: [
            {
                title: "Scene 1: The Philosopher Emperor",
                heading: "Leading Under Pressure",
                imageEmoji: "🏛️",
                text: "Marcus Aurelius ruled the vast Roman Empire. Surrounded by wars, plagues, and stress, he wrote personal notes in his tent at night to keep his mind calm."
            },
            {
                title: "Scene 2: The Dichotomy of Control",
                heading: "Inside vs Outside Control",
                imageEmoji: "🧠",
                text: "He realized: weather, traffic, and other people's moods are OUTSIDE your control. But your thoughts, choices, and kindness are 100% INSIDE your control!"
            },
            {
                title: "Scene 3: Finding Inner Strength",
                heading: "Turning Obstacles into Power",
                imageEmoji: "🛡️",
                text: "When a storm canceled his plans, he didn't throw a tantrum. He treated every setback as a secret opportunity to practice patience!"
            }
        ],
        vocabCards: [
            { term: "Stoicism", icon: "🛡️", definition: "A philosophy that teaches emotional resilience, self-control, and focusing only on what you can control." },
            { term: "Dichotomy of Control", icon: "⚖️", definition: "Dividing life into things you can control (your mind) vs things you cannot (outside world)." }
        ],
        inDepth: {
            history: "As Emperor of Rome, Marcus faced wars, plagues, and betrayals, yet he wrote the book 'Meditations' to keep his mind calm.",
            whyItMatters: "When bad things happen outside your control, focusing on your own reaction keeps you calm and powerful.",
            funFact: "He never intended his journal 'Meditations' to be published—it was just his personal bedtime journal!"
        },
        caseStudies: [
            { title: "Rainy Picnic", text: "It rains on your birthday outdoor party! Stoic choice: Can't stop the rain, but CAN switch to an epic indoor board game marathon!" }
        ],
        videoId: "R9OCA6UFE-0", // TED-Ed Stoicism
        videoQuiz: [
            { question: "What is inside your total control according to Stoicism?", options: [{ text: "Your thoughts, choices, and reactions", correct: true }, { text: "The weather and traffic jams", correct: false }] }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Control Test",
                scenario: "A sudden thunderstorm cancels your trip to the amusement park. What is the Stoic response?",
                options: [
                    { text: "🌧️ 'I can't control the storm, so I will build a mega Lego castle inside instead!'", correct: true, feedback: "Stoic Master choice! Focus on your reaction." },
                    { text: "😭 Scream at the clouds for 3 hours", correct: false, feedback: "You can't control the weather by screaming!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Emotional Shield",
                scenario: "Someone makes a rude face at you on the bus. What do you control?",
                options: [
                    { text: "🛡️ You control your choice to ignore it and stay calm", correct: true, feedback: "Power over your own mind!" },
                    { text: "❌ Control their face", correct: false, feedback: "You cannot control other people's expressions." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Stoic",
                scenario: "Your computer crashes and loses 10 minutes of homework. How do you respond?",
                options: [
                    { text: "🧠 Take a deep breath, accept what happened, and quickly re-type it better using what you learned!", correct: true, feedback: "ULTIMATE STOIC RESILIENCE!" },
                    { text: "❌ Throw the keyboard out the window", correct: false, feedback: "That causes more damage!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "How do I handle bad news or rain?", answer: "Remember: you cannot control outside events, but you CAN control your own response. Find strength within!" },
            { prompt: "What did you write in Meditations?", answer: "I wrote bedtime notes reminding myself to be patient, kind, and focused on what matters!" }
        ]
    },
    {
        id: "descartes",
        name: "René Descartes",
        era: "France (1596 - 1650)",
        avatar: "💭",
        quote: "I think, therefore I am.",
        superpower: "Radical Doubt & First Principles",
        conceptIntro: "Descartes doubted everything he saw to find what was 100% true. He realized: even if a trickster dragon was tricking his senses, he WAS thinking, which proved he existed!",
        storyScenes: [
            {
                title: "Scene 1: The Trickster Senses",
                heading: "Can Our Eyes Be Tricked?",
                imageEmoji: "👀",
                text: "Descartes noticed that a stick looks bent in water, and optical illusions trick our eyes. He asked: 'What if everything we see is a trick?'"
            },
            {
                title: "Scene 2: Doubting Everything",
                heading: "Searching for Unshakable Truth",
                imageEmoji: "🐲",
                text: "He imagined an evil trickster trying to fool him about math and reality. He stripped away all assumptions to find something 100% solid."
            },
            {
                title: "Scene 3: Cogito Ergo Sum",
                heading: "I Think, Therefore I Am!",
                imageEmoji: "💭",
                text: "He realized: even to doubt, he MUST be thinking! And if he is thinking, he MUST exist! That core truth became his unbreakable foundation."
            }
        ],
        vocabCards: [
            { term: "Cogito Ergo Sum", icon: "💭", definition: "Latin phrase meaning 'I think, therefore I am'—Descartes' foundational truth." },
            { term: "Radical Doubt", icon: "❓", definition: "Refusing to accept anything as true until it is proven beyond all doubt." }
        ],
        inDepth: {
            history: "Descartes was a mathematician who invented the (x, y) coordinate plane you use in math class, connecting geometry to algebra.",
            whyItMatters: "Checking your assumptions to find unbreakable core truths keeps you from building on false foundations.",
            funFact: "Legend says he came up with the (x, y) grid system while lying in bed watching a fly crawl across his ceiling!"
        },
        caseStudies: [
            { title: "Magic Show", text: "At a magic show, a coin appears to vanish into thin air. Radical Doubt reminds you: your eyes are being tricked—matter cannot disappear!" }
        ],
        videoId: "p4vW7B715vQ", // Wireless Philosophy Descartes
        videoQuiz: [
            { question: "What is the one thing Descartes realized was 100% impossible to doubt?", options: [{ text: "The fact that he was currently thinking", correct: true }, { text: "Everything his eyes saw at a magic show", correct: false }] }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Illusion Detector",
                scenario: "A straw in a glass of water looks broken in half. What is Descartes' advice?",
                options: [
                    { text: "👀 Senses can be tricked by refraction—use math to check reality!", correct: true, feedback: "Correct! Senses can be deceived." },
                    { text: "🪄 The straw is magically broken", correct: false, feedback: "Don't fall for optical tricks." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Certainty Puzzle",
                scenario: "What statement is 100% true beyond all possible doubt?",
                options: [
                    { text: "💭 'I am currently thinking right now!'", correct: true, feedback: "Cogito Ergo Sum!" },
                    { text: "👀 'The weather will be sunny tomorrow'", correct: false, feedback: "That can be doubtful." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Doubt",
                scenario: "You are building a computer code model. Should you start with assumptions or proven foundation facts?",
                options: [
                    { text: "🔑 Test every foundational logic line first so the system cannot crash!", correct: true, feedback: "DESCARTES FOUNDATIONAL LOGIC MASTER!" },
                    { text: "❌ Copy code without reading it", correct: false, feedback: "Unchecked assumptions cause bugs!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "What does 'I think, therefore I am' mean?", answer: "Even if your eyes trick you, the very act of thinking proves beyond all doubt that YOU exist!" },
            { prompt: "Did you invent the (x,y) grid?", answer: "Yes! Cartesian coordinates connect geometry with algebra." }
        ]
    },
    {
        id: "popper",
        name: "Karl Popper",
        era: "Austria/UK (1902 - 1994)",
        avatar: "🦢",
        quote: "A theory that explains everything explains nothing.",
        superpower: "Falsification (Finding Black Swans)",
        conceptIntro: "Karl Popper proved that real scientists don't just look for clues that agree with them. They actively hunt for counter-examples ('black swans') to test their theories!",
        storyScenes: [
            {
                title: "Scene 1: The White Swan Assumption",
                heading: "Seeing 1,000 White Swans",
                imageEmoji: "🦢",
                text: "For centuries, people saw thousands of white swans in Europe and declared: 'ALL swans are white!' They thought seeing more white swans proved their rule."
            },
            {
                title: "Scene 2: The Black Swan Discovery",
                heading: "One Counter-Example Changes Everything",
                imageEmoji: "🖤",
                text: "In 1697, explorers found black swans in Australia! Seeing just ONE black swan instantly disproved the old rule."
            },
            {
                title: "Scene 3: Real Falsification",
                heading: "Testing Theories to Prove Them Solid",
                imageEmoji: "🔬",
                text: "Popper showed that true scientists design experiments specifically to try to PROVE their theory WRONG. If it survives, it is truly solid!"
            }
        ],
        vocabCards: [
            { term: "Falsification", icon: "🔍", definition: "The ability for a scientific theory to be proven wrong by a potential counter-example test." },
            { term: "Black Swan", icon: "🖤", definition: "A rare, unexpected counter-example that completely overturns an old belief." }
        ],
        inDepth: {
            history: "Popper was a 20th-century philosopher of science who helped define the modern scientific method.",
            whyItMatters: "Looking for ways to test if your theory could be WRONG is how real science makes breakthroughs.",
            funFact: "Before Popper, people thought seeing 1,000 white swans proved all swans were white. Searching for black swans proved one counter-example changes everything!"
        },
        caseStudies: [
            { title: "Scientific Testing", text: "A scientist claims: 'All rocks float!' Popper's test: Drop 100 rocks in water. Dropping 1 heavy granite rock and watching it sink falsifies the claim!" }
        ],
        videoId: "fM2J525Vn-U", // BBC Radio 4 Popper
        videoQuiz: [
            { question: "How do true scientists test a new theory according to Karl Popper?", options: [{ text: "By actively hunting for counter-examples that could prove it wrong", correct: true }, { text: "By ignoring evidence that disagrees", correct: false }] }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Swan Hunter",
                scenario: "A friend says: 'No dog ever likes water!' How do you test this theory?",
                options: [
                    { text: "🐕 Find just 1 retriever dog that loves swimming (a Black Swan counter-example)!", correct: true, feedback: "Falsified! One counter-example disproves the rule." },
                    { text: "🙈 Ignore dogs that swim", correct: false, feedback: "Ignoring evidence is not science." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Falsification Tester",
                scenario: "Which statement is a valid scientific hypothesis?",
                options: [
                    { text: "🔬 'Water freezes at 0°C at sea level' (Can be measured & tested)", correct: true, feedback: "Falsifiable & testable science!" },
                    { text: "❌ 'Invisible magic goblins make my shoelaces untie but leave zero proof'", correct: false, feedback: "Untestable statements are pseudo-science." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Falsification Lab",
                scenario: "You have a theory that your robot code works 100% of the time. What test do you run?",
                options: [
                    { text: "🤖 Run the robot in the toughest edge-case scenarios (mud, low battery, darkness) to find bugs!", correct: true, feedback: "FALSIFICATION CHAMPION! You found the bugs before launch!" },
                    { text: "❌ Only run it on a flat clean table once", correct: false, feedback: "Easy tests don't truly challenge the code." }
                ]
            }
        ],
        chatResponses: [
            { prompt: "What is Falsification?", answer: "It means a real scientific theory MUST be testable by experiments that could prove it wrong!" },
            { prompt: "Why are Black Swans important?", answer: "Because 1 single black swan counter-example teaches us more than 1,000 white swans!" }
        ]
    },
    {
        id: "mill",
        name: "John Stuart Mill",
        era: "England (1806 - 1873 CE)",
        avatar: "🌿",
        quote: "Human nature is not a machine... but a tree, which requires to grow and develop itself on all sides, according to the tendency of the inward forces which make it a living thing.",
        superpower: "Character Building Through Choice & Individuality",
        conceptIntro: "John Stuart Mill taught that your character is not a pre-built machine. Your mind is like a growing tree! Every decision you make and every action you choose works like sunlight and water, shaping the unique person you become!",
        storyScenes: [
            {
                title: "Scene 1: The Growing Tree Metaphor",
                heading: "Your Mind is Not a Machine",
                imageEmoji: "🌳",
                text: "Mill believed human nature isn't a factory machine built to copy everyone else. It is like a living tree that needs room to branch out and grow in its own unique direction!"
            },
            {
                title: "Scene 2: Exercising Moral Muscles",
                heading: "Building Strength Through Choice",
                imageEmoji: "🏋️",
                text: "Just as lifting heavy weights builds your physical muscles, making thoughtful personal choices exercises your mental and moral faculties. Choosing for yourself makes you stronger!"
            },
            {
                title: "Scene 3: Shaping Your Destiny",
                heading: "Who Do You Want to Become?",
                imageEmoji: "✨",
                text: "Every single daily choice—what hobbies you practice, how you treat others, how you react to challenges—carves out your identity. You are the author of your own character!"
            }
        ],
        vocabCards: [
            { term: "Individuality", icon: "🌿", definition: "The unique combination of qualities, choices, and thoughts that distinguish one person from everyone else." },
            { term: "Autonomy", icon: "👑", definition: "The freedom to make your own reasoned decisions and guide your own life path." },
            { term: "Character", icon: "🛡️", definition: "The mental and moral qualities built up over time through your actions and choices." }
        ],
        inDepth: {
            history: "Mill was a famous 19th-century English philosopher and economist who championed individual freedom, free expression, and human development in his book 'On Liberty'.",
            whyItMatters: "You aren't trapped by who you were yesterday. By making deliberate, positive choices today, you actively reshape who you become tomorrow!",
            funFact: "Mill started learning Ancient Greek at age 3 and Latin at age 8, but realized true wisdom comes from independent thinking, not just memorizing books!"
        },
        caseStudies: [
            { title: "Choosing Your Passions", text: "Instead of following whatever video game or sport everyone else plays, Mill urges you to explore unique hobbies like painting, astronomy, or coding to cultivate your own individuality!" },
            { title: "Personal Integrity", text: "When facing peer pressure to make a bad choice, exercising your autonomy to say 'No' strengthens your inner character muscle!" }
        ],
        videoId: "R9OCA6UFE-0", // TED-Ed Liberty & Choice
        videoQuiz: [
            { question: "How did John Stuart Mill describe human nature?", options: [{ text: "Like a living tree that grows by making its own choices", correct: true }, { text: "Like a factory machine", correct: false }] },
            { question: "What happens when you make your own thoughtful choices?", options: [{ text: "It exercises and strengthens your mental & moral muscles", correct: true }, { text: "It makes you copy everyone else", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "Expressing Uniqueness",
                shortTitle: "Individuality vs Conformity",
                dilemma: "Should everyone at school wear identical clothes and pursue the same hobbies, or be encouraged to explore unique interests?",
                perspectives: {
                    a: { name: "Unique Exploration", argument: "Children flourish when allowed to try different arts, sports, and sciences." },
                    b: { name: "Shared Unity", argument: "Common routines help students feel united and equal." },
                    c: { name: "Core & Choice", argument: "Have shared core basics, but plenty of free choice electives." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What makes your way of thinking unique?", context: "Talk about a hobby or interest that makes you who you are." }
        ]
    },
    {
        id: "confucius",
        name: "Confucius",
        era: "Ancient China (551 - 479 BCE)",
        avatar: "☯️",
        quote: "Do not impose on others what you yourself do not desire.",
        superpower: "The Silver Rule & Ritual Respect",
        conceptIntro: "Confucius taught that harmony in a family or society begins with empathy and respect. By practicing the Silver Rule, we build a peaceful world!",
        storyScenes: [
            { title: "Scene 1: Empathy First", heading: "The Silver Rule", imageEmoji: "☯️", text: "Before taking an action, ask: 'Would I like it if someone did this to me?'" }
        ],
        vocabCards: [
            { term: "Ren (Empathy)", icon: "❤️", definition: "Humaneness, benevolence, and loving kindness toward all people." }
        ],
        inDepth: { history: "Confucius was an ancient Chinese teacher whose ethical teachings shaped Asian civilization.", whyItMatters: "Empathy is the foundation of true friendship and strong communities.", funFact: "His ideas were recorded by his students in a famous book called the Analects." },
        videoId: "tUhGRh4vhi8",
        videoQuiz: [{ question: "What is Confucius' Silver Rule?", options: [{ text: "Do not impose on others what you yourself do not desire", correct: true }, { text: "Always win arguments", correct: false }] }],
        p4cInquiry: [
            {
                title: "Practicing Empathy",
                shortTitle: "The Silver Rule",
                dilemma: "Someone drops their lunch tray in the cafeteria. What is the empathetic response?",
                perspectives: {
                    a: { name: "Help Immediately", argument: "Step in to help pick up the tray right away because you'd want help if it happened to you." },
                    b: { name: "Get Cleaning Supplies", argument: "Grab napkins and notify cafeteria staff to keep the floor safe." },
                    c: { name: "Encourage Others", argument: "Ask classmates around the table to lend a hand together." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "How does putting yourself in someone else's shoes change your reaction?", context: "Discuss a time when empathy turned a mistake into a moment of kindness." }
        ]
    },
    {
        id: "lao_tzu",
        name: "Lao Tzu",
        era: "Ancient China (6th Century BCE)",
        avatar: "🌊",
        quote: "Water is fluid, soft, and yielding. But water will wear away rock... What is soft is strong.",
        superpower: "Wu Wei & Flowing Harmony",
        conceptIntro: "Lao Tzu wrote the 'Tao Te Ching', teaching the principle of Wu Wei ('effortless action')—working with nature like water flowing around rocks!",
        storyScenes: [
            { title: "Scene 1: Water's Strength", heading: "Flowing Around Obstacles", imageEmoji: "🌊", text: "Water doesn't smash head-on into a giant boulder; it calmly flows around it, eventually wearing the stone smooth." }
        ],
        vocabCards: [
            { term: "Wu Wei", icon: "🌊", definition: "Effortless action; acting in natural alignment without forcing or pushing." }
        ],
        inDepth: { history: "Lao Tzu was the legendary founder of Taoism in ancient China.", whyItMatters: "Patience and gentle persistence often solve problems better than anger or brute force.", funFact: "Taoist philosophy influenced Asian martial arts like Tai Chi!" },
        videoId: "dFb7Hxva5rg",
        videoQuiz: [{ question: "What metaphor did Lao Tzu use for gentle strength?", options: [{ text: "Water flowing around rocks", correct: true }, { text: "An iron hammer", correct: false }] }],
        p4cInquiry: [
            {
                title: "Gentle Persistence vs Force",
                shortTitle: "Water & Flow",
                dilemma: "You are trying to solve a tough puzzle and getting frustrated. What approach works best?",
                perspectives: {
                    a: { name: "Take a Short Break", argument: "Step back, take a breath, and let your subconscious mind relax before trying again." },
                    b: { name: "Try a Different Angle", argument: "Look at the puzzle from a new direction without forcing pieces together." },
                    c: { name: "Ask for a Clue", argument: "Collaborate with a friend to see what they notice." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "When has patience worked better for you than rushing?", context: "Discuss how staying calm helps you solve tricky problems." }
        ]
    },
    {
        id: "kant",
        name: "Immanuel Kant",
        era: "Germany (1724 - 1804)",
        avatar: "⚖️",
        quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
        superpower: "The Categorical Imperative & Universal Duty",
        conceptIntro: "Kant taught that before doing an action, ask: 'What if EVERYONE in the world did this all the time?' If the world breaks, don't do it!",
        storyScenes: [
            { title: "Scene 1: The Universal Rule Test", heading: "What If Everyone Did It?", imageEmoji: "🌐", text: "Littering seems small, but if all 8 billion people littered, Earth would be covered in trash. Kant called this testing for universal duty." }
        ],
        vocabCards: [
            { term: "Deontology", icon: "📜", definition: "An ethical theory that uses rules to distinguish right from wrong, focusing on moral duty." }
        ],
        inDepth: { history: "Kant lived in Königsberg, Prussia, and wrote major works on ethics and human reason.", whyItMatters: "Universal thinking reminds us that we shouldn't make selfish exceptions for ourselves.", funFact: "Kant was so punctual that neighbors set their pocket watches by his daily afternoon walks!" },
        videoId: "nsgA4hzo06U",
        videoQuiz: [{ question: "What is Kant's Categorical Imperative test?", options: [{ text: "Ask what would happen if everyone in the world did the action", correct: true }, { text: "Do whatever is easiest", correct: false }] }],
        p4cInquiry: [
            {
                title: "Rules vs Outcomes",
                shortTitle: "Universal Duty",
                dilemma: "Is it ever okay to break a small promise if you think it will make a friend happy?",
                perspectives: {
                    a: { name: "Keep Promises Always", argument: "If everyone broke promises when convenient, trust in friendship would collapse." },
                    b: { name: "Focus on Kindness", argument: "Making a friend feel supported in a hard moment is what matters most." },
                    c: { name: "Honest Explanation", argument: "Be honest about why you need to adjust a promise together." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is a rule that makes the world better if everyone follows it?", context: "Discuss universal rules like taking turns and being honest." }
        ]
    },
    {
        id: "lovelace",
        name: "Ada Lovelace",
        era: "UK (1815 - 1852)",
        avatar: "💻",
        quote: "The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers.",
        superpower: "Poetic Science & First Algorithms",
        conceptIntro: "Ada Lovelace saw that computing machines could go beyond numbers to process music, art, and symbols—writing the world's very first computer algorithm!",
        storyScenes: [
            { title: "Scene 1: Poetic Science", heading: "Combining Art & Math", imageEmoji: "💻", text: "Ada combined mathematical precision with imagination, predicting that computers would create music and graphics 100 years before it happened!" }
        ],
        vocabCards: [
            { term: "Algorithm", icon: "⚙️", definition: "A step-by-step set of rules or instructions to solve a problem or perform a task." }
        ],
        inDepth: { history: "Daughter of poet Lord Byron, Ada worked with Charles Babbage on the Analytical Engine.", whyItMatters: "Imagination and logic together unlock revolutionary inventions.", funFact: "The programming language 'Ada', created by the US Department of Defense, was named in her honor!" },
        videoId: "J34k52xP4D4",
        videoQuiz: [{ question: "What did Ada Lovelace create?", options: [{ text: "The world's first computer algorithm", correct: true }, { text: "The steam engine", correct: false }] }],
        p4cInquiry: [
            {
                title: "Can Machines Be Creative?",
                shortTitle: "Machines & Thought",
                dilemma: "When a computer program generates a song or drawing, is the computer being creative, or the humans who wrote the code?",
                perspectives: {
                    a: { name: "Human Authorship", argument: "Computers only execute human instructions; real creativity comes from human minds." },
                    b: { name: "New Collaboration", argument: "AI and algorithms create brand new unexpected combinations, acting as a new artistic tool." },
                    c: { name: "Shared Credit", argument: "Credit belongs to both the human programmer and the unique algorithmic output." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "How do art and math connect in your favorite video game?", context: "Talk about how code, music, and graphics come together in computer games." }
        ]
    }
];

function renderSingleThinkerTopic(thinkerId) {
    const t = thinkersData.find(x => x.id === thinkerId) || thinkersData[0];

    return `
        <div class="spotlight-card">
            <!-- Header Banner -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;">${t.avatar}</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">${t.name}'s Deep-Dive Stage</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">${t.era}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="fb-action-btn outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="exportStudentWorksheet('${escapeJsString(t.name)}')">📄 Download Study Worksheet</button>
                    <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">⚡ ${t.superpower}</div>
                </div>
            </div>

            <!-- Quote Box -->
            <div style="background: rgba(255, 215, 0, 0.08); border-left: 4px solid var(--gold-star); padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-style: italic; color: #FFF; font-size: 1.05rem;">
                "${t.quote}"
            </div>

            <!-- 4-Step Flow Tabs -->
            <div class="viz-controls" style="margin-bottom: 24px;">
                <button class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Story & Flashcards</button>
                <button class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. Video & Case Studies</button>
                <button class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Open P4C Inquiry</button>
                <button class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Socratic Journal & Vault</button>
            </div>

            <!-- Tab 1: Storybook & Flashcards -->
            <div id="topicTabContent1" class="flow-content-block">
                ${renderStorybookReader(t.id, t.storyScenes)}
                ${renderVocabularyFlashcards(t.id, t.vocabCards)}
                <div style="margin-top: 24px;">
                    <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: In-Depth Video & Case Studies ➔</button>
                </div>
            </div>

            <!-- Tab 2: Video & Case Studies -->
            <div id="topicTabContent2" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 14px;">Historical Background & Real Case Studies</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                    <div style="background: rgba(6, 182, 212, 0.08); padding: 16px; border-radius: 12px; border: 1px solid var(--cyan-magic);">
                        <h4 style="color: var(--cyan-magic); margin-bottom: 6px;">📜 Historical Context</h4>
                        <p style="font-size: 0.92rem; color: var(--text-main); margin:0;">${t.inDepth.history}</p>
                    </div>
                    <div style="background: rgba(139, 92, 246, 0.08); padding: 16px; border-radius: 12px; border: 1px solid var(--purple-primary);">
                        <h4 style="color: var(--purple-glow); margin-bottom: 6px;">💡 Why It Matters Today</h4>
                        <p style="font-size: 0.92rem; color: var(--text-main); margin:0;">${t.inDepth.whyItMatters}</p>
                    </div>
                </div>

                <!-- Case Studies Showcase -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--gold-star); font-size: 1.05rem; margin-bottom: 10px;">🔍 Real-World Case Scenarios:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
                        ${(t.caseStudies || []).map(cs => `
                            <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--gold-star); padding: 14px; border-radius: 10px;">
                                <div style="font-weight: 800; color: var(--gold-star); font-size: 0.95rem; margin-bottom: 4px;">${cs.title}</div>
                                <div style="font-size: 0.88rem; color: var(--text-main);">${cs.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Responsive Embedded YouTube Player -->
                <div style="background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%; border: 2px solid var(--purple-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <iframe src="https://www.youtube.com/embed/${t.videoId}?rel=0" title="${t.name} Educational Lesson" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                ${renderVideoQuizComponent(t.id, t.videoQuiz)}

                <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-top: 20px;">
                    <a href="https://www.youtube.com/watch?v=${t.videoId}" target="_blank" class="fb-action-btn outline" style="text-decoration:none;">▶ Watch Full Lesson on YouTube (New Tab)</a>
                    <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Try Open P4C Inquiry ➔</button>
                </div>
            </div>

            <!-- Tab 3: Open P4C Dialectic Inquiry -->
            <div id="topicTabContent3" class="flow-content-block" style="display:none;">
                ${typeof renderP4CInquiryEngine === 'function' ? renderP4CInquiryEngine(t.id, t.p4cInquiry || [
                    {
                        title: "Open Socratic Dialectic",
                        shortTitle: "P4C Inquiry",
                        dilemma: "Is an action good because an authority commands it, or does an authority command it because it is inherently good?",
                        perspectives: {
                            a: { name: "Divine Command / Authority Rule", argument: "Rules gain moral force because an authoritative lawgiver declares them obligatory for society." },
                            b: { name: "Intrinsic Rational Ethics", argument: "Ethical actions are inherently good based on reason and empathy, independent of authority commands." }
                        }
                    }
                ]) : ''}
            </div>

            <!-- Tab 4: Socratic Discussion Journal & Upgrade Vault -->
            <div id="topicTabContent4" class="flow-content-block" style="display:none;">
                ${typeof renderSocraticDiscussionJournal === 'function' ? renderSocraticDiscussionJournal(t.id, t.name, t.avatar, t.discussionPrompts || [
                    { prompt: "What makes a decision truly fair?", context: "Discuss with a parent or friend whether fairness means treating everyone identically or giving people what they need." },
                    { prompt: "How do we know when we are wrong about something?", context: "Explore how admitting what we do not know is the first step toward true wisdom." }
                ]) : ''}

                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest an Upgrade</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about ${t.name} or an idea to upgrade this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_${t.id}" class="sandbox-input" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_${t.id}" class="sandbox-input" placeholder="Type your question or suggestion here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('${t.id}', '${t.name}', '${t.avatar}')">Submit to Upgrade Vault</button>
                    
                    <div id="feedbackResult_${t.id}" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for ${t.name}:</h4>
                <div id="savedFeedbackList_${t.id}">
                    <!-- Dynamically populated by feedback_vault.js -->
                </div>
            </div>
        </div>
    `;
}

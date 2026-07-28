// Expanded Interactive Mental Models Arcade with 15-Minute Tab Depth

const mentalModelsData = {
    first_principles: {
        id: "first_principles",
        name: "First Principles Thinking",
        title: "⚡ First Principles Thinking (Chef vs. Recipe Builder)",
        avatar: "⚡",
        intro: "First Principles Thinking means breaking a problem down to its most basic, unbreakable truths (raw ingredients/atoms), and then building a creative new solution from scratch instead of just copying what others do!",
        storyScenes: [
            {
                title: "Scene 1: The Recipe Follower Trap",
                heading: "Copying vs Understanding",
                imageEmoji: "📖",
                text: "A recipe follower only knows how to bake a cake if they have the exact pre-made box mix. If the store runs out, they feel stuck and give up."
            },
            {
                title: "Scene 2: The Master Chef Approach",
                heading: "Understanding Fundamental Building Blocks",
                imageEmoji: "🥐",
                text: "A First Principles Chef breaks baking down to core truths: flour (structure), yeast (rise), fat (texture), and heat (baking). They can bake a thousand delicious pastries without any recipe mix!"
            },
            {
                title: "Scene 3: Inventing the Snowmobile",
                heading: "Redesigning Transportation",
                imageEmoji: "🛷",
                text: "Instead of putting giant wheels on a bicycle for deep snow, inventors broke snow travel down to 3 needs: propulsion, snow treads, and steering—inventing the snowmobile from scratch!"
            }
        ],
        vocabCards: [
            { term: "First Principles", icon: "⚡", definition: "Foundational truths or core elements that cannot be deduced any further." },
            { term: "Reasoning by Analogy", icon: "🐑", definition: "Copying what others are doing with minor tweaks, rather than building from scratch." },
            { term: "Deconstruction", icon: "🧱", definition: "Breaking a complex system down into its basic individual parts." }
        ],
        inDepth: {
            history: "Philosophers like Aristotle and inventors like Thomas Edison and Elon Musk used First Principles thinking to create inventions people thought were impossible.",
            whyItMatters: "Instead of following a rigid recipe or copying others, understanding fundamental building blocks gives you the freedom to invent completely new things.",
            funFact: "The snowmobile was invented using First Principles! Instead of adding bigger tires to a bicycle for snow, the inventor broke travel down to 3 basic needs: propulsion, snow treads, and steering!"
        },
        example: "A recipe follower can only bake a cake if they have a pre-made boxed mix. But a First Principles Chef understands raw flour, sugar, eggs, and heat. If they run out of cake mix, they build a brand new delicious pastry from scratch using fundamental ingredients!",
        videoId: "g918y-DkW9M",
        videoQuiz: [
            { question: "What is the key difference between a recipe follower and a first principles chef?", options: [{ text: "A chef understands raw ingredients and can create new recipes from scratch", correct: true }, { text: "A chef only buys store mixes", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "Building from Scratch",
                shortTitle: "Chef vs Recipe",
                dilemma: "You want to design a new playground game. Should you tweak rules of a game everyone already plays, or break games down to basic fun elements (running, tagging, hiding) and invent a new game from scratch?",
                perspectives: {
                    a: { name: "Invent from Scratch", argument: "Deconstructing basic fun elements allows you to create a completely original game." },
                    b: { name: "Tweak Existing Games", argument: "Modifying familiar games (like Tag) is easier for friends to learn quickly." },
                    c: { name: "Hybrid Design", argument: "Combine a familiar basic rule with one brand new surprise mechanic!" }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something you can break down into its basic parts?", context: "Talk about a bicycle, a recipe, or a computer game and its core building blocks." }
        ],
        caseStudies: [
            { title: "Electric Bikes", text: "Instead of buying a $2,000 electric bicycle, an engineer breaks it down into lithium cells ($80), metal tube frame ($30), and copper motor ($50)." }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Raw Ingredient Builder",
                scenario: "You want to create a new dessert, but the store is out of cake mix. What is the First Principles choice?",
                options: [
                    { text: "🥐 Combine raw flour, eggs, sugar, and cocoa to bake fresh brownies!", correct: true, feedback: "Chef Master choice! Built from first principles." },
                    { text: "😭 Give up and go home", correct: false, feedback: "That's being trapped by analogy." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Snowmobile Inventor",
                scenario: "How do you solve deep snow travel using First Principles?",
                options: [
                    { text: "🛷 Combine gasoline engine + snow treads + steering skis to invent a snowmobile!", correct: true, feedback: "Invention unlocked! Snowmobile created!" },
                    { text: "🚲 Put slightly bigger tires on a 2-wheel bicycle", correct: false, feedback: "That still gets stuck in deep snow." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Space Architect",
                scenario: "Building a space habitat costs $100M in pre-built parts. How do you reduce the cost by 90%?",
                options: [
                    { text: "🚀 Buy raw aluminum-lithium alloy & solar panels directly and manufacture in-house!", correct: true, feedback: "FIRST PRINCIPLES SPACE ARCHITECT!" },
                    { text: "❌ Pay $100M retail price", correct: false, feedback: "That accepts the high retail markup." }
                ]
            }
        ],
        chatResponses: [
            { prompt: "How do I use First Principles in homework?", answer: "Don't just memorize answers! Break the math or science problem down to its basic core rules." },
            { prompt: "What is reasoning by analogy?", answer: "Reasoning by analogy is just copying what everyone else does instead of thinking for yourself!" }
        ]
    },
    occams_razor: {
        id: "occams_razor",
        name: "Occam's Razor",
        title: "✂️ Occam's Razor (Simplest Explanation Wins)",
        avatar: "✂️",
        intro: "Occam's Razor advises: When faced with competing explanations for an event, the simplest explanation requiring the fewest assumptions is usually the correct one!",
        storyScenes: [
            {
                title: "Scene 1: The Missing Cookie",
                heading: "Footprints vs Dragons",
                imageEmoji: "🍪",
                text: "You find crumbs on the kitchen floor and your dog licking his nose. Explanation A: The dog ate the cookie. Explanation B: Invisible dragons flew through the window! Occam's Razor shaves away the dragon story!"
            },
            {
                title: "Scene 2: Competing Hypotheses",
                heading: "Aliens vs Hungry Raccoons",
                imageEmoji: "🦝",
                text: "Option A: A hungry raccoon searched for food. Option B: Aliens landed, searched for trash batteries, and flew to Mars!"
            }
        ],
        vocabCards: [
            { term: "Parsimony", icon: "🗡️", definition: "The principle of choosing the explanation that requires the fewest unproven assumptions." },
            { term: "Entity", icon: "🧩", definition: "An assumed object, event, or cause in a theory." }
        ],
        inDepth: {
            history: "Formulated by 14th-century thinker William of Ockham, this principle ('law of parsimony') is a foundation of modern science and detective work.",
            whyItMatters: "It stops us from creating wild conspiracy theories when a straightforward, logical explanation makes total sense.",
            funFact: "In medicine, doctors say: 'When you hear hooves behind you, think horses, not zebras!' (unless you're on a safari in Africa!)."
        },
        example: "If you find your trash can knocked over, option A is 'A raccoon knocked it over', option B is 'Aliens landed, searched for batteries, and flew to Mars'. Occam's Razor trims away the alien theory!",
        videoId: "S-tS45R13oQ", // Explified: Occam's Razor
        videoQuiz: [
            { question: "What does Occam's Razor tell us to trim away?", options: [{ text: "Wild explanations requiring unproven assumptions", correct: true }, { text: "The correct answer", correct: false }] }
        ],
        caseStudies: [
            { title: "Lost Keys", text: "You can't find your keys. Option A: You left them on the kitchen counter. Option B: A wizard teleported them to Jupiter!" }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Trash Can Mystery",
                scenario: "Trash is spilled in the yard. Which explanation uses Occam's Razor?",
                options: [
                    { text: "🦝 A hungry raccoon knocked it over", correct: true, feedback: "Correct! Fewest assumptions." },
                    { text: "🛸 Flying aliens landed and searched for batteries", correct: false, feedback: "Too many crazy assumptions!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Strange Noise Detective",
                scenario: "You hear a squeak in the attic at night.",
                options: [
                    { text: "🐭 A tiny house mouse is scurrying across the floorboard", correct: true, feedback: "Simplest logical answer!" },
                    { text: "👻 A ghost wearing tap shoes is dancing", correct: false, feedback: "Trimming away the ghost theory!" }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Science Inspector",
                scenario: "A computer program produces an error code. Option A: A missing semicolon on line 12. Option B: Cosmic rays mutated the microchip.",
                options: [
                    { text: "💻 Missing semicolon on line 12", correct: true, feedback: "OCCAM'S RAZOR CODE MASTER!" },
                    { text: "🌌 Cosmic ray mutation", correct: false, feedback: "Check the simple code error first!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "Does Occam's Razor mean the simplest answer is ALWAYS right?", answer: "Not always 100%, but it means we should start with the simplest explanation with the fewest assumptions before making up crazy theories!" }
        ]
    },
    black_swan: {
        id: "black_swan",
        name: "Black Swan Hunter",
        title: "🦢 Karl Popper's Black Swan Hunter (Falsification)",
        avatar: "🦢",
        intro: "Scientist Karl Popper showed that true science doesn't just look for clues that agree with us. To test a theory, we must hunt for counter-examples ('black swans') that could prove it wrong!",
        storyScenes: [
            {
                title: "Scene 1: The 1,000 White Swans",
                heading: "The Assumption",
                imageEmoji: "🦢",
                text: "For centuries, Europeans only saw white swans. They assumed: 'All swans in the universe are white!'"
            },
            {
                title: "Scene 2: Australian Discovery",
                heading: "The Black Swan Arrives",
                imageEmoji: "🖤",
                text: "In 1697, explorers found black swans in Australia! Seeing just ONE black swan instantly disproved the old rule."
            },
            {
                title: "Scene 3: Hunting Counter-Examples",
                heading: "Falsification Power",
                imageEmoji: "🔍",
                text: "Popper showed that scientific theories become strong when they survive tough counter-example testing!"
            }
        ],
        vocabCards: [
            { term: "Falsification", icon: "🔍", definition: "Testing a hypothesis by actively trying to find a counter-example that could prove it wrong." },
            { term: "Black Swan", icon: "🖤", definition: "A rare, unexpected counter-example that changes our understanding of the world." }
        ],
        inDepth: {
            history: "For centuries, Europeans thought 100% of swans were white. In 1697, Dutch explorers discovered black swans in Australia, revolutionizing logic forever!",
            whyItMatters: "Finding just ONE counter-example is more powerful for scientific truth than seeing 1,000 confirming examples.",
            funFact: "Nassim Nicholas Taleb popularized 'Black Swan Events' to describe unexpected global events (like the invention of the Internet) that change everything!"
        },
        example: "Seeing 1,000 white swans doesn't prove all swans are white. Discovering just ONE black swan instantly proves the old rule wrong!",
        videoId: "fM2J525Vn-U", // BBC Radio 4 Popper
        videoQuiz: [
            { question: "What does 1 single Black Swan prove?", options: [{ text: "That the old rule 'all swans are white' is false", correct: true }, { text: "That all swans are white", correct: false }] }
        ],
        caseStudies: [
            { title: "Floating Rocks", text: "Theory: 'All rocks sink in water!' Black Swan: Pumice stone (volcanic rock full of air pockets) floats!" }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Swan Hunter",
                scenario: "Theory: 'No dog ever likes water!' How do you test this?",
                options: [
                    { text: "🐕 Find 1 water-loving retriever (Black Swan)", correct: true, feedback: "Falsified!" },
                    { text: "🙈 Ignore swimming dogs", correct: false, feedback: "Ignoring data is wrong!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Floating Rock Mystery",
                scenario: "Theory: 'All rocks sink in water.' What is the Black Swan?",
                options: [
                    { text: "🌋 Pumice volcanic rock that floats on water!", correct: true, feedback: "Black Swan found!" },
                    { text: "🪨 Heavy granite rock that sinks", correct: false, feedback: "That agrees with the theory." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Bug Hunter",
                scenario: "Your code runs fine on 10 simple inputs. How do you find Black Swan bugs?",
                options: [
                    { text: "🤖 Test extreme edge-cases (negative numbers, empty strings, offline mode)", correct: true, feedback: "BLACK SWAN BUG HUNTER!" },
                    { text: "❌ Re-run the easy test 100 times", correct: false, feedback: "Easy tests miss black swan bugs!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "Why do we hunt for Black Swans?", answer: "Because 1 counter-example teaches us more about truth than 1,000 confirming examples!" }
        ]
    },
    map_territory: {
        id: "map_territory",
        name: "Map vs. Territory",
        title: "🗺️ Map vs. Territory (The Reality Check)",
        avatar: "🗺️",
        intro: "Mental models and drawings are like maps: they simplify reality so we can understand it. But remember: THE MAP IS NOT THE TERRITORY! The real world is always richer and more complex than our model.",
        storyScenes: [
            {
                title: "Scene 1: The Simplified Map",
                heading: "Why We Use Maps",
                imageEmoji: "🗺️",
                text: "Maps simplify complex cities so we don't get lost. A map shows 3 green tree icons for a park."
            },
            {
                title: "Scene 2: Stepping into the Territory",
                heading: "The Real World Complexity",
                imageEmoji: "🏞️",
                text: "When you walk into the real park (the territory), you find 1,420 real trees, muddy grass, wind, birds, and insects!"
            },
            {
                title: "Scene 3: The Golden Rule",
                heading: "The Model is Not Reality",
                imageEmoji: "⚖️",
                text: "Never confuse a weather forecast app (map) with the actual rain outside (territory)! Always double-check real-world data."
            }
        ],
        vocabCards: [
            { term: "Map", icon: "🗺️", definition: "A simplified model, drawing, or mental description used to represent reality." },
            { term: "Territory", icon: "🏞️", definition: "The actual, full, complex real-world reality." }
        ],
        inDepth: {
            history: "Coined by mathematician Alfred Korzybski, this mental model reminds us that words, diagrams, and financial models are reductions of reality.",
            whyItMatters: "Never confuse a weather forecast app (map) with the actual rain outside (territory)! Always double-check real-world data.",
            funFact: "If a map were 100% detailed down to every blade of grass, it would have to be the exact same size as the real world, making it useless as a map!"
        },
        example: "A simplified map of a zoo shows 3 animal icons, but the real zoo has 400 animals, sounds, smells, and zookeepers!",
        videoId: "kS2LQSpZTDE", // Mental Models Map vs Territory
        videoQuiz: [
            { question: "Why can't a map be 100% identical to the real territory?", options: [{ text: "Because a map must simplify reality to be useful", correct: true }, { text: "Because maps are printed on paper", correct: false }] }
        ],
        caseStudies: [
            { title: "Weather Forecast", text: "Your weather app says '0% chance of rain', but dark storm clouds gather outside. Trust the territory (look outside)!" }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Zoo Map Inspector",
                scenario: "The zoo map shows 1 lion icon. Does the real zoo territory have only 1 lion?",
                options: [
                    { text: "🏞️ The real territory might have 5 lions, zookeepers, trees, and sounds!", correct: true, feedback: "Map is not territory!" },
                    { text: "🗺️ The map shows everything in 100% detail", correct: false, feedback: "Maps are simplified models!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Weather Reality Check",
                scenario: "Your phone app says 'Sunny 25°C', but you step outside and it's pouring rain. What do you wear?",
                options: [
                    { text: "☔ Put on a raincoat (Trust the real territory!)", correct: true, feedback: "Correct! Reality beats the map model!" },
                    { text: "🕶️ Wear sunglasses and pretend it isn't raining", correct: false, feedback: "Don't trust an outdated map over reality!" }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Reality Checker",
                scenario: "A business spreadsheet (map) predicts $1,000 profit, but customer demand (territory) drops. What do you do?",
                options: [
                    { text: "📊 Adjust the business strategy to fit real customer feedback!", correct: true, feedback: "MAP VS TERRITORY MASTER!" },
                    { text: "❌ Ignore customers and stare at the spreadsheet", correct: false, feedback: "The spreadsheet is just a map!" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "What is the Map and what is the Territory?", answer: "The Map is a simplified drawing or idea. The Territory is the rich, complex real world!" }
        ]
    },
    inversion: {
        id: "inversion",
        name: "Inversion Thinking",
        title: "🔄 Inversion Thinking (The Flip-the-Switch Solver)",
        avatar: "🔄",
        intro: "Inversion means thinking backwards! Instead of asking 'How do I succeed?', flip the question and ask: 'What would guarantee I fail?' Then simply avoid all those failure traps!",
        storyScenes: [
            {
                title: "Scene 1: Thinking Forwards",
                heading: "How Do I Become Great?",
                imageEmoji: "🚀",
                text: "When people try to achieve a goal, they ask 'How do I succeed?' That can be overwhelming with 1,000 choices."
            },
            {
                title: "Scene 2: Flipping the Question",
                heading: "How Would I Guarantee Failure?",
                imageEmoji: "🔄",
                text: "Inversion flips the question: 'What 3 things would GUARANTEE I fail?' (e.g. quitting early, staying up until 3 AM, ignoring advice)."
            },
            {
                title: "Scene 3: Avoiding the Traps",
                heading: "Success by Avoiding Stupidity",
                imageEmoji: "🛡️",
                text: "Now, just cross off those 3 failure choices! Avoiding bad mistakes is often easier than trying to be brilliant every second."
            }
        ],
        vocabCards: [
            { term: "Inversion", icon: "🔄", definition: "The practice of looking at problems backwards to identify and avoid causes of failure." },
            { term: "Pre-Mortem", icon: "🩺", definition: "Imagining a project has failed BEFORE starting it, so you can fix weaknesses in advance." }
        ],
        inDepth: {
            history: "German mathematician Carl Jacobi famously advised: 'Invert, always invert!' Billionaire Charlie Munger used this model to avoid business mistakes.",
            whyItMatters: "It is often much easier to avoid making silly mistakes than it is to try to be brilliant all the time.",
            funFact: "Aerospace engineers use Inversion in 'pre-mortems'—they imagine a rocket launch has ALREADY failed, so they can fix flaws before launching!"
        },
        example: "Want to be a great soccer teammate? Ask 'What makes someone a terrible teammate?' (screaming, refusing to pass, quitting early). Now just avoid those 3 things!",
        videoId: "yW6hL9dD7Vw", // Critical Thinking Inversion
        videoQuiz: [
            { question: "What question does Inversion ask us to consider?", options: [{ text: "What would guarantee failure so we can avoid those traps?", correct: true }, { text: "How to copy others", correct: false }] }
        ],
        caseStudies: [
            { title: "Team Project", text: "Want a team project to go great? Inversion asks: What would ruin it? (Not communicating, missing deadlines). Avoid those!" }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Failure Trap Spotter",
                scenario: "Goal: Have a fun birthday party. What would GUARANTEE it gets ruined?",
                options: [
                    { text: "❌ Hiding all the games and yelling at guests", correct: true, feedback: "Inversion trap identified! Avoid this!" },
                    { text: "🎂 Serving cake and playing music", correct: false, feedback: "That makes a party fun!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Pre-Mortem Engineer",
                scenario: "Before launching a new class website, you run an Inversion Pre-Mortem. What do you check?",
                options: [
                    { text: "💻 Check if the server crashes when 30 students log in at once!", correct: true, feedback: "Pre-Mortem success! Found the bug early!" },
                    { text: "❌ Assume nothing can ever go wrong", correct: false, feedback: "Inversion requires checking failure modes." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Inversion Solver",
                scenario: "Goal: Maintain strong health. How do you apply Charlie Munger's Inversion Rule?",
                options: [
                    { text: "🛡️ Avoid junk food binges, lack of sleep, and zero exercise!", correct: true, feedback: "INVERSION MASTER!" },
                    { text: "❌ Wait until getting sick to think about health", correct: false, feedback: "That's reactive, not inverted planning." }
                ]
            }
        ],
        chatResponses: [
            { prompt: "What does 'Invert, always invert' mean?", answer: "It means whenever you want to solve a problem, flip it around and figure out how to avoid failure first!" }
        ]
    },
    pareto: {
        id: "pareto",
        name: "Pareto Principle (80/20 Rule)",
        title: "🎯 Pareto Principle (The 80/20 Power Focus Rule)",
        avatar: "🎯",
        intro: "The Pareto Principle observes that in almost every area of life, roughly 20% of your key efforts produce 80% of your best results!",
        storyScenes: [
            {
                title: "Scene 1: The Garden Discovery",
                heading: "Pea Pods and Land",
                imageEmoji: "🌱",
                text: "In 1896, Italian economist Vilfredo Pareto noticed that 20% of the pea pods in his garden produced 80% of the healthy peas."
            },
            {
                title: "Scene 2: Unequal Distributions",
                heading: "The 80/20 Pattern Everywhere",
                imageEmoji: "🎯",
                text: "He looked further and found that 20% of the population owned 80% of land. Later, scientists found 20% of code features get 80% of user clicks!"
            },
            {
                title: "Scene 3: Focusing on the Vital 20%",
                heading: "Work Smarter, Not Harder",
                imageEmoji: "⚡",
                text: "Instead of stressing over 100 minor tasks, identify the top 20% vital tasks that bring 80% of your success!"
            }
        ],
        vocabCards: [
            { term: "Pareto Principle", icon: "🎯", definition: "The rule of thumb that 80% of outcomes stem from 20% of core causes." },
            { term: "Vital Few", icon: "🌟", definition: "The small 20% subset of inputs that drive the majority of value." }
        ],
        inDepth: {
            history: "Italian economist Vilfredo Pareto noticed in 1896 that 20% of pea pods in his garden produced 80% of the peas, and 20% of people owned 80% of land.",
            whyItMatters: "It teaches you to focus your energy on the most important 20% of activities that bring the biggest success.",
            funFact: "Language scientists found that learning just 20% of a foreign language's core vocabulary lets you understand 80% of daily conversations!"
        },
        example: "Out of 50 toys in your room, you likely play with your top 10 favorite toys (20%) about 80% of the time!",
        videoId: "f2nB8Y47hX8", // Sprouts Pareto
        videoQuiz: [
            { question: "What does the 80/20 rule suggest?", options: [{ text: "20% of core efforts often generate 80% of results", correct: true }, { text: "Everything is equal", correct: false }] }
        ],
        caseStudies: [
            { title: "Studying for Tests", text: "Focusing on the 20% core formulas and concepts gives you 80% of test points!" }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "80/20 Toy Box",
                scenario: "You have 50 toys, but 30 minutes to play. What is the Pareto choice?",
                options: [
                    { text: "🎯 Play with your top 10 favorite toys (the 20% that give 80% of fun!)", correct: true, feedback: "Pareto Focus!" },
                    { text: "📦 Spend 30 minutes unpacking all 50 toys without playing", correct: false, feedback: "Wastes time on minor items." }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Language Learner",
                scenario: "You have 1 week to learn basic Spanish phrases before a trip.",
                options: [
                    { text: "🗣️ Learn the top 100 most common words (the 20% used in 80% of conversations)", correct: true, feedback: "Smart Pareto Language Focus!" },
                    { text: "📖 Memorize the entire dictionary from Z to A", correct: false, feedback: "Impractical!" }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master App Creator",
                scenario: "An app developer has 10 feature requests. 2 features are requested by 80% of users.",
                options: [
                    { text: "🚀 Build the top 2 requested features first (the vital 20%)!", correct: true, feedback: "PARETO PRODUCTIVITY MASTER!" },
                    { text: "❌ Build the least requested feature first", correct: false, feedback: "Ignore high-impact features?" }
                ]
            }
        ],
        chatResponses: [
            { prompt: "How can 20% cause 80% of results?", answer: "Because in nature and human life, inputs are rarely equal! A few vital factors carry huge impact." }
        ]
    },
    second_order: {
        id: "second_order",
        name: "Second-Order Thinking",
        title: "⏳ Second-Order Thinking (The Domino Effect)",
        avatar: "⏳",
        intro: "First-order thinking considers immediate consequences ('I want this now!'). Second-order thinking asks: 'And then what happens next 2 hours or 2 days later?'",
        storyScenes: [
            {
                title: "Scene 1: The Instant Gratification Trap",
                heading: "First-Order Thinking",
                imageEmoji: "🍦",
                text: "First-order thinking only sees the immediate present: 'Eating 5 ice cream cones right now feels delicious!'"
            },
            {
                title: "Scene 2: Asking 'And Then What?'",
                heading: "Second-Order Thinking",
                imageEmoji: "⏳",
                text: "Second-order thinking looks ahead to domino effects: '2 hours later, my stomach will hurt and I'll miss my friends' match!'"
            },
            {
                title: "Scene 3: Long-Term Victory",
                heading: "Mastering the Future",
                imageEmoji: "🏆",
                text: "By considering second and third-order consequences, you make choices that lead to long-term health and success!"
            }
        ],
        vocabCards: [
            { term: "First-Order Effect", icon: "⚡", definition: "The immediate, short-term result of an action." },
            { term: "Second-Order Effect", icon: "⏳", definition: "The downstream, long-term consequence that follows the first result." }
        ],
        inDepth: {
            history: "Howard Marks and Ray Dalio emphasize second-order thinking to predict long-term impacts that ordinary thinkers miss.",
            whyItMatters: "Short-term pleasures can cause long-term pain, while short-term practice leads to long-term mastery.",
            funFact: "Chess grandmasters think 5 to 10 moves ahead (second, third, and fourth-order thinking) before moving a single piece!"
        },
        example: "Eating 5 ice cream cones right now feels delicious (1st order). But 2 hours later, you get a bad stomach ache and miss your friends' party (2nd order)!",
        videoId: "R9OCA6UFE-0", // TED-Ed Decision Thinking
        videoQuiz: [
            { question: "What question does a Second-Order Thinker ask?", options: [{ text: "'And then what happens next in 2 hours or 2 days?'", correct: true }, { text: "'What gives me pleasure right now?'", correct: false }] }
        ],
        caseStudies: [
            { title: "Late Night Gaming", text: "1st Order: Fun video game right now! 2nd Order: Exhausted during math test tomorrow morning." }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Domino Predictor",
                scenario: "You want to eat 6 chocolate donuts right before soccer practice.",
                options: [
                    { text: "⏳ 2nd Order Effect: Stomach ache & sluggish running 30 mins later!", correct: true, feedback: "Second-Order Master!" },
                    { text: "🍦 1st Order Effect: Yummy taste for 10 seconds", correct: false, feedback: "That's only first-order thinking!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Chess Grandmaster Move",
                scenario: "You practice piano for 20 minutes instead of scrolling on a phone.",
                options: [
                    { text: "🎹 2nd Order Effect: In 3 months, you can play your favorite songs effortlessly!", correct: true, feedback: "Long-term mastery unlocked!" },
                    { text: "📱 1st Order Effect: Phone scrolling gives instant cheap dopamine", correct: false, feedback: "First order trap." }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Policy Thinker",
                scenario: "A city wants to build a giant parking lot over a park to solve parking.",
                options: [
                    { text: "🌳 2nd Order Effect: Loss of trees ➔ hotter city temperature & no playground for kids 1 year later!", correct: true, feedback: "DOMINO EFFECT MASTER!" },
                    { text: "🚗 1st Order Effect: 5 more cars can park today", correct: false, feedback: "Fails to see long term effects." }
                ]
            }
        ],
        chatResponses: [
            { prompt: "Why is second-order thinking hard?", answer: "Because our brains prefer instant short-term rewards! Asking 'And then what?' takes extra reflection." }
        ]
    },
    sunk_cost: {
        id: "sunk_cost",
        name: "Sunk Cost Fallacy",
        title: "🛑 Sunk Cost Fallacy (The Past Mistake Trap)",
        avatar: "🛑",
        intro: "The Sunk Cost Fallacy is continuing to waste time or money on something bad just because you ALREADY spent time or money on it in the past!",
        storyScenes: [
            {
                title: "Scene 1: The $10 Ticket",
                heading: "The Terrible Movie",
                imageEmoji: "🎟️",
                text: "You buy a $10 movie ticket. 15 minutes into the movie, you realize it is terribly boring and silly."
            },
            {
                title: "Scene 2: The Sunk Cost Trap",
                heading: "I Already Paid $10!",
                imageEmoji: "😫",
                text: "The Sunk Cost Trap whispers: 'You spent $10! You MUST suffer through 2 hours of boredom so the $10 isn't wasted!'"
            },
            {
                title: "Scene 3: Future Happiness Choice",
                heading: "Escaping the Trap",
                imageEmoji: "🏃",
                text: "The $10 is gone forever whether you stay or leave. Leaving saves 2 hours of your life to do something fun!"
            }
        ],
        vocabCards: [
            { term: "Sunk Cost", icon: "💸", definition: "Money, time, or effort already spent that cannot be recovered." },
            { term: "Loss Aversion", icon: "🛑", definition: "The psychological tendency to strongly prefer avoiding losses over acquiring gains." }
        ],
        inDepth: {
            history: "Psychologists Kahneman and Tversky proved that humans hate losing things so much that we irrationally double-down on bad decisions.",
            whyItMatters: "Past time or money spent is gone forever (sunk). Always make decisions based on your FUTURE happiness!",
            funFact: "The Concorde supersonic jet lost millions of dollars, but governments kept funding it for years just because they felt bad stopping!"
        },
        example: "You buy a $10 movie ticket, but 15 minutes in you realize the movie is terrible. Staying for 2 hours wastes your time AND your money. Leaving frees up your afternoon!",
        videoId: "f2nB8Y47hX8", // Sprouts Sunk Cost
        videoQuiz: [
            { question: "What should guide your decisions according to Sunk Cost theory?", options: [{ text: "Your FUTURE happiness and value", correct: true }, { text: "Past money that is gone forever", correct: false }] }
        ],
        caseStudies: [
            { title: "Moldy Food", text: "You bought an expensive $8 sandwich, but it tastes spoiled. Eating it makes you sick—throw it away! The $8 is already gone." }
        ],
        multiLevelGame: [
            {
                shortName: "Level 1: Novice",
                levelTitle: "Movie Escape",
                scenario: "You paid $10 for a boring movie ticket. 15 minutes in, it's terrible. What do you do?",
                options: [
                    { text: "🏃 Leave and play in the sun! The $10 is gone either way, save your afternoon!", correct: true, feedback: "Trap Escaped! Future value saved!" },
                    { text: "😫 Suffer for 2 hours to get your money's worth", correct: false, feedback: "Sunk cost trap!" }
                ]
            },
            {
                shortName: "Level 2: Scholar",
                levelTitle: "Video Game Trap",
                scenario: "You bought a $30 video game, but after 1 hour you hate it. Should you force yourself to play 40 hours?",
                options: [
                    { text: "🎮 Switch to a fun game! 40 hours of suffering won't bring back $30.", correct: true, feedback: "Smart choice! Don't waste future time." },
                    { text: "❌ Suffer for 40 hours", correct: false, feedback: "Double loss of money AND time!" }
                ]
            },
            {
                shortName: "Level 3: Master",
                levelTitle: "Grand Master Concorde Project",
                scenario: "A project has lost $5M and will lose another $10M if continued. The team says 'We already spent $5M, we can't stop!'",
                options: [
                    { text: "🛑 Cancel the project now! Cut losses and protect future funds!", correct: true, feedback: "SUNK COST MASTER!" },
                    { text: "❌ Waste another $10M", correct: false, feedback: "Classic Concorde fallacy." }
                ]
            }
        ],
        chatResponses: [
            { prompt: "Why do people fall for Sunk Cost?", answer: "Because humans hate admitting a past mistake! But wise thinkers focus on future happiness." }
        ]
    },
    hanlons_razor: {
        id: "hanlons_razor",
        name: "Hanlon's Razor",
        title: "🤝 Hanlon's Razor (Empathy Before Anger)",
        avatar: "🤝",
        intro: "Hanlon's Razor advises: Never attribute to evil intent ('malice') what is easily explained by an innocent mistake, distraction, or misunderstanding!",
        storyScenes: [
            { title: "Scene 1: The Dropped Pencil", heading: "Accident vs Attack", imageEmoji: "✏️", text: "Someone bumps your desk and drops your pencil. Before getting angry, remember: 99% of the time, it was an accidental bump, not a secret master plan to ruin your day!" }
        ],
        vocabCards: [
            { term: "Malice", icon: "👿", definition: "Intention or desire to cause harm or bad feelings to someone." },
            { term: "Misunderstanding", icon: "🤷", definition: "A failure to understand something correctly or an unintentional mistake." }
        ],
        inDepth: { history: "Formulated by Robert J. Hanlon in 1980, this mental model promotes empathy and prevents unnecessary social drama.", whyItMatters: "Assuming good intentions keeps your mind calm and preserves great friendships.", funFact: "Similar to Occam's Razor, Hanlon's Razor 'trims' away paranoid assumptions!" },
        example: "A friend doesn't reply to your text for 2 hours. Paranoid assumption: 'They hate me!' Hanlon's Razor: 'Their phone battery died or they are eating dinner!'",
        videoId: "f2nB8Y47hX8", videoQuiz: [{ question: "What does Hanlon's Razor suggest when someone makes a mistake?", options: [{ text: "Assume it was an innocent accident or phone distraction first", correct: true }, { text: "Assume they are an evil villain", correct: false }] }],
        caseStudies: [{ title: "Unanswered Text", text: "Phone battery died vs secret villain plan!" }],
        multiLevelGame: [{ shortName: "Level 1: Novice", levelTitle: "Empathy Test", scenario: "Someone steps on your shoe in a crowded hallway.", options: [{ text: "🤝 Assume it was an accidental stumble in a crowd and say 'No worries!'", correct: true, feedback: "Hanlon's Razor Master!" }, { text: "👿 Yell 'You did that on purpose to ruin my shoes!'", correct: false, feedback: "That assumes malice without evidence." }] }],
        chatResponses: [{ prompt: "Why is Hanlon's Razor useful?", answer: "It stops unnecessary drama! Most mistakes come from accidents or distraction, not bad intentions." }]
    },
    confirmation_bias: {
        id: "confirmation_bias",
        name: "Confirmation Bias",
        title: "🔍 Confirmation Bias (The Blindspot Trap)",
        avatar: "🔍",
        intro: "Confirmation Bias is the tendency to search for clues that agree with what we ALREADY believe, while ignoring facts that prove us wrong!",
        storyScenes: [
            { title: "Scene 1: The Selective Magnifying Glass", heading: "Only Seeing What We Like", imageEmoji: "🔍", text: "If someone believes 'It always rains on Mondays', they remember 2 rainy Mondays and forget 48 sunny Mondays!" }
        ],
        vocabCards: [
            { term: "Confirmation Bias", icon: "🔍", definition: "Noticing and remembering facts that confirm your belief, while ignoring disconfirming facts." }
        ],
        inDepth: { history: "Studied extensively by psychologist Peter Wason in 1960, confirmation bias is one of the most common cognitive traps.", whyItMatters: "Actively seeking facts that challenge your view helps you discover real truth.", funFact: "Warren Buffett deliberately listens to people who DISAGREE with his stock ideas to defeat confirmation bias!" },
        example: "If you think your cat is lazy, you notice her sleeping 4 hours and ignore her catching a mouse outside!",
        videoId: "yW6hL9dD7Vw", videoQuiz: [{ question: "What is Confirmation Bias?", options: [{ text: "Only noticing clues that agree with your existing belief", correct: true }, { text: "Testing all facts equally", correct: false }] }],
        caseStudies: [{ title: "Sports Predictions", text: "Only remembering the games your favorite team won while forgetting their losses!" }],
        multiLevelGame: [{ shortName: "Level 1: Novice", levelTitle: "Bias Detective", scenario: "You believe 'All video games are bad for sleep.' How do you test this without bias?", options: [{ text: "🔬 Read studies showing both sleep impacts AND cognitive spatial benefits!", correct: true, feedback: "Bias Defeated!" }, { text: "🙈 Only read articles that agree with you", correct: false, feedback: "That's Confirmation Bias!" }] }],
        chatResponses: [{ prompt: "How do I beat Confirmation Bias?", answer: "Deliberately search for evidence that could prove your theory wrong! (Karl Popper style!)" }]
    }
};

function renderSingleMentalModelTopic(modelKey) {
    const mm = mentalModelsData[modelKey] || mentalModelsData['first_principles'];

    return `
        <div class="spotlight-card">
            <!-- Header Banner -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div class="thinker-avatar" style="width:70px; height:70px; font-size:2.2rem; margin:0;">${mm.avatar}</div>
                    <div>
                        <h2 style="font-family: var(--font-heading); color: var(--gold-star); font-size: 1.8rem; font-weight: 900; margin:0;">${mm.title}</h2>
                        <span style="color: var(--cyan-magic); font-weight:700; font-size:0.9rem;">Mental Model Superpower</span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="fb-action-btn outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="exportStudentWorksheet('${escapeJsString(mm.name)}')">📄 Download Study Worksheet</button>
                    <div class="nb-badge" style="font-size:0.85rem; padding: 6px 14px;">🔮 Mental Model</div>
                </div>
            </div>

            <!-- 4-Step Flow Controls -->
            <div class="viz-controls" style="margin-bottom: 24px;">
                <button class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Story & Flashcards</button>
                <button class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. Video & Case Studies</button>
                <button class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Open P4C Inquiry</button>
                <button class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Socratic Journal & Vault</button>
            </div>

            <!-- Tab 1: Storybook & Flashcards -->
            <div id="topicTabContent1" class="flow-content-block">
                ${renderStorybookReader(mm.id, mm.storyScenes)}
                ${renderVocabularyFlashcards(mm.id, mm.vocabCards)}
                <div style="margin-top: 24px;">
                    <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: In-Depth Video & Context ➔</button>
                </div>
            </div>

            <!-- Tab 2: Video & Case Studies -->
            <div id="topicTabContent2" class="flow-content-block" style="display:none;">
                <h3 style="color: var(--cyan-magic); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 14px;">Real-World Example & In-Depth Insight</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                    <div style="background: rgba(6, 182, 212, 0.08); padding: 16px; border-radius: 12px; border: 1px solid var(--cyan-magic);">
                        <h4 style="color: var(--cyan-magic); margin-bottom: 6px;">📜 Historical Background</h4>
                        <p style="font-size: 0.92rem; color: var(--text-main); margin:0;">${mm.inDepth.history}</p>
                    </div>
                    <div style="background: rgba(139, 92, 246, 0.08); padding: 16px; border-radius: 12px; border: 1px solid var(--purple-primary);">
                        <h4 style="color: var(--purple-glow); margin-bottom: 6px;">💡 Why It Matters Today</h4>
                        <p style="font-size: 0.92rem; color: var(--text-main); margin:0;">${mm.inDepth.whyItMatters}</p>
                    </div>
                </div>

                <!-- Case Studies Showcase -->
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--gold-star); font-size: 1.05rem; margin-bottom: 10px;">🔍 Real-World Case Scenarios:</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
                        ${(mm.caseStudies || []).map(cs => `
                            <div style="background: rgba(255,255,255,0.04); border-left: 3px solid var(--gold-star); padding: 14px; border-radius: 10px;">
                                <div style="font-weight: 800; color: var(--gold-star); font-size: 0.95rem; margin-bottom: 4px;">${cs.title}</div>
                                <div style="font-size: 0.88rem; color: var(--text-main);">${cs.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Responsive Embedded YouTube Player -->
                <div style="background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%; border: 2px solid var(--purple-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <iframe src="https://www.youtube.com/embed/${mm.videoId}?rel=0" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                ${renderVideoQuizComponent(mm.id, mm.videoQuiz)}

                <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-top: 20px;">
                    <a href="https://www.youtube.com/watch?v=${mm.videoId}" target="_blank" class="fb-action-btn outline" style="text-decoration:none;">▶ Watch Full Lesson Video on YouTube (New Tab)</a>
                    <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Try Open P4C Inquiry ➔</button>
                </div>
            </div>

            <!-- Tab 3: Open P4C Dialectic Inquiry -->
            <div id="topicTabContent3" class="flow-content-block" style="display:none;">
                ${typeof renderP4CInquiryEngine === 'function' ? renderP4CInquiryEngine(mm.id, mm.p4cInquiry || [
                    {
                        title: "Open Mental Model Dialectic",
                        shortTitle: "P4C Inquiry",
                        dilemma: "Should we always simplify models (Occam's / Map vs Territory), or do complex systems require complex, multi-layered models?",
                        perspectives: {
                            a: { name: "Model Parsimony & Simplification", argument: "Simplified models filter out noise, making decision-making fast and actionable." },
                            b: { name: "Complex System Realism", argument: "Over-simplifying complex systems can hide critical edge-case risks and blind spots." }
                        }
                    }
                ]) : ''}
            </div>

            <!-- Tab 4: Socratic Discussion Journal & Upgrade Vault -->
            <div id="topicTabContent4" class="flow-content-block" style="display:none;">
                ${typeof renderSocraticDiscussionJournal === 'function' ? renderSocraticDiscussionJournal(mm.id, mm.name, mm.avatar, mm.discussionPrompts || [
                    { prompt: "When does a mental model fail?", context: "Discuss a scenario where relying too strictly on a single mental model caused a blindspot." }
                ]) : ''}

                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest an Upgrade</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about ${mm.name} or an idea to upgrade this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_${mm.id}" class="sandbox-input" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_${mm.id}" class="sandbox-input" placeholder="Type your question or suggestion here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('${mm.id}', '${mm.name}', '${mm.avatar}')">Submit to Upgrade Vault</button>
                    
                    <div id="feedbackResult_${mm.id}" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for ${mm.name}:</h4>
                <div id="savedFeedbackList_${mm.id}">
                    <!-- Dynamically populated by feedback_vault.js -->
                </div>
            </div>
        </div>
    `;
}

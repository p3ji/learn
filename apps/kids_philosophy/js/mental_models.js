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
                text: "Instead of putting giant wheels on a bicycle for deep snow, break snow travel down to 3 needs - propulsion, snow treads and steering - and you end up designing something very like a snowmobile."
            }
        ],
        vocabCards: [
            { term: "First Principles", icon: "⚡", definition: "Foundational truths or core elements that cannot be deduced any further." },
            { term: "Reasoning by Analogy", icon: "🐑", definition: "Copying what others are doing with minor tweaks, rather than building from scratch." },
            { term: "Deconstruction", icon: "🧱", definition: "Breaking a complex system down into its basic individual parts." }
        ],
        inDepth: {
            history: "Aristotle called the most basic truths - the ones you cannot break down any further - 'first principles' (archai), and said real understanding starts there. Scientists still work this way: instead of asking 'what does everyone else do?', they ask 'what do we actually know for certain, and what can we build from that?'",
            whyItMatters: "Instead of following a rigid recipe or copying others, understanding fundamental building blocks gives you the freedom to invent completely new things.",
            funFact: "Try it yourself: how would you cross deep snow? A bike's wheels sink. Break the problem into what you actually need - a way to push forward, something wide so you do not sink, and a way to steer - and you have designed something very like a snowmobile from scratch."
        },
        example: "A recipe follower can only bake a cake if they have a pre-made boxed mix. But a First Principles Chef understands raw flour, sugar, eggs, and heat. If they run out of cake mix, they build a brand new delicious pastry from scratch using fundamental ingredients!",
        videoId: "ZqhN2YWTw0M",
        videoQuiz: [
            { question: "What is the key difference between a recipe follower and a first principles chef?", options: [{ text: "A chef understands raw ingredients and can create new recipes from scratch", correct: true }, { text: "A chef follows the recipe more carefully", correct: false }] }
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
        videoId: "B94BmViQEwo", // Explified: Occam's Razor
        videoQuiz: [
            { question: "What does Occam's Razor tell us to trim away?", options: [{ text: "Wild explanations requiring unproven assumptions", correct: true }, { text: "The explanation that sounds most impressive", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "When Simple Is Wrong",
                shortTitle: "Simplest Answer",
                dilemma: "Your friend did not sit with you at lunch. The simplest explanation is 'they were busy'. Is the simplest explanation always the one to go with?",
                perspectives: {
                    a: { name: "Start Simple", argument: "Most of the time the boring explanation is the true one. Jumping to the dramatic version costs you a friendship over nothing." },
                    b: { name: "Simple Can Hide Things", argument: "Sometimes the complicated explanation is the true one - someone really is being left out. 'Keep it simple' can become an excuse not to notice." },
                    c: { name: "Simple First, Then Ask", argument: "Assume the simple thing, but actually go and ask them. That beats guessing either way." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "When has the simplest explanation turned out to be wrong?", context: "Talk about a time the obvious answer was not the real one, and what the clue was." }
        ],
        caseStudies: [
            { title: "Lost Keys", text: "You can't find your keys. Option A: You left them on the kitchen counter. Option B: A wizard teleported them to Jupiter!" }
        ],
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
        videoId: "wf-sGqBsWv4", // BBC Radio 4 Popper
        videoQuiz: [
            { question: "What does 1 single Black Swan prove?", options: [{ text: "That the old rule 'all swans are white' is false", correct: true }, { text: "That most swans are white, so the rule was close enough", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "One Bird Changes Everything",
                shortTitle: "The Surprise Bird",
                dilemma: "For hundreds of years Europeans said 'all swans are white', because every swan they had ever seen was white. Then explorers found black swans in Australia. How much should one surprise change what you believe?",
                perspectives: {
                    a: { name: "One Is Enough", argument: "A single black swan proves 'all swans are white' false, forever. No number of white swans could ever prove it true. Surprises count more than confirmations." },
                    b: { name: "Rules Still Work", argument: "Nearly all swans really are white, so the rule was useful even though it was not perfect. A rare exception does not make a good rule worthless." },
                    c: { name: "Change the Wording", argument: "Maybe the fix is to say 'most swans are white, so far as we have seen'. Then the rule is honest about what we do not know." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something everyone around you assumes is always true?", context: "Try to imagine what the black swan would look like - what single thing would prove it wrong?" }
        ],
        caseStudies: [
            { title: "Floating Rocks", text: "Theory: 'All rocks sink in water!' Black Swan: Pumice stone (volcanic rock full of air pockets) floats!" }
        ],
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
            history: "Coined in 1931 by Alfred Korzybski, a thinker who studied how language shapes thought. It reminds us that words, diagrams and models are simplified pictures of reality, never the thing itself.",
            whyItMatters: "Never confuse a weather forecast app (map) with the actual rain outside (territory)! Always double-check real-world data.",
            funFact: "If a map were 100% detailed down to every blade of grass, it would have to be the exact same size as the real world, making it useless as a map!"
        },
        example: "A simplified map of a zoo shows 3 animal icons, but the real zoo has 400 animals, sounds, smells, and zookeepers!",
        videoId: "BCqX1zPLRXE", // Mental Models Map vs Territory
        videoQuiz: [
            { question: "Why can't a map be 100% identical to the real territory?", options: [{ text: "Because a map must simplify reality to be useful", correct: true }, { text: "Because maps are sometimes out of date", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "The Map Is Not the Place",
                shortTitle: "Map vs Real Place",
                dilemma: "A map of your town leaves almost everything out - the smells, the noise, which street feels scary at night. Does that make the map bad?",
                perspectives: {
                    a: { name: "Leaving Things Out Is the Point", argument: "A map that showed everything would be the size of the town and useless. Simplifying is exactly what makes it work." },
                    b: { name: "What Gets Left Out Matters", argument: "The map cannot tell you the shortcut is flooded or the shop has closed. If you only trust the map you will get things wrong." },
                    c: { name: "Know Which One You Are Holding", argument: "Use the map to plan, then keep your eyes open when you get there. The mistake is forgetting which one is which." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is a 'map' you use that leaves important things out?", context: "Think about school reports, game stats, or a photo - what do they miss about the real thing?" }
        ],
        caseStudies: [
            { title: "Weather Forecast", text: "Your weather app says '0% chance of rain', but dark storm clouds gather outside. Trust the territory (look outside)!" }
        ],
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
        videoId: "dItUGF8GdTw", // TED-Ed: 5 tips to improve your critical thinking
        videoQuiz: [
            { question: "What question does Inversion ask us to consider?", options: [{ text: "What would guarantee failure so we can avoid those traps?", correct: true }, { text: "How to argue the opposite of what you believe", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "Working Backwards",
                shortTitle: "Turning It Around",
                dilemma: "You want your birthday party to go brilliantly. Is it more useful to plan how to make it great, or to list everything that could ruin it and stop those?",
                perspectives: {
                    a: { name: "Plan the Good", argument: "If you only think about disasters you end up anxious and cautious, and you never come up with the fun ideas that make it special." },
                    b: { name: "Prevent the Bad", argument: "Most parties are not ruined by a lack of brilliance - they are ruined by one thing going wrong. Remove those and it is hard for it NOT to go well." },
                    c: { name: "Do Both, Separately", argument: "Spend ten minutes dreaming, then ten minutes being gloomy on purpose. Mixing them means neither gets done properly." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Think of something you want to go well. What would guarantee it goes badly?", context: "Then talk about whether avoiding those things is easier than chasing the perfect version." }
        ],
        caseStudies: [
            { title: "Team Project", text: "Want a team project to go great? Inversion asks: What would ruin it? (Not communicating, missing deadlines). Avoid those!" }
        ],
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
                text: "In 1896, Italian economist Vilfredo Pareto studied who owned the land in Italy and found something lopsided: a small group of people owned most of it. Things were nowhere near evenly shared."
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
            history: "Vilfredo Pareto found in 1896 that about 20% of Italians owned about 80% of the land. Much later a quality engineer named Joseph Juran noticed the same lopsided pattern turning up everywhere else and nicknamed it the 'Pareto Principle'. (The story about Pareto's pea pods is a fun legend, but nobody has found it in his writings!)",
            whyItMatters: "It teaches you to focus your energy on the most important 20% of activities that bring the biggest success.",
            funFact: "Language scientists found that learning just 20% of a foreign language's core vocabulary lets you understand 80% of daily conversations!"
        },
        example: "Out of 50 toys in your room, you likely play with your top 10 favorite toys (20%) about 80% of the time!",
        videoId: "lsGwqk_agcQ", // Sprouts: Pareto Principle Explained
        videoQuiz: [
            { question: "What does the 80/20 rule suggest?", options: [{ text: "20% of core efforts often generate 80% of results", correct: true }, { text: "Effort always matches results exactly", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "A Few Things Matter Most",
                shortTitle: "The 80/20 Idea",
                dilemma: "In lots of situations a small number of things cause most of the result - a few players score most goals, a few pages hold most of the homework marks. If that is true, should you just ignore the rest?",
                perspectives: {
                    a: { name: "Focus on the Vital Few", argument: "Your time is limited. Putting it where it makes the biggest difference is simply sensible - doing everything equally means doing everything badly." },
                    b: { name: "The Small Stuff Adds Up", argument: "The 'unimportant' 80% includes being kind, tidying up, and helping people. Ignore it and you get good marks and no friends." },
                    c: { name: "It Depends What You Are Measuring", argument: "The pattern shows up in scores and results, but not in everything. Some things - like being trustworthy - do not work at 20%." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is the one thing that, if you did it well, would make the biggest difference this week?", context: "Then ask: what would you have to give up to make room for it?" }
        ],
        caseStudies: [
            { title: "Studying for Tests", text: "Focusing on the 20% core formulas and concepts gives you 80% of test points!" }
        ],
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
        videoId: "qp0ybabZMD4", // Productivity Guy: What is Second Order Thinking
        videoQuiz: [
            { question: "What question does a Second-Order Thinker ask?", options: [{ text: "'And then what happens next in 2 hours or 2 days?'", correct: true }, { text: "'What worked last time?'", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "And Then What Happens?",
                shortTitle: "What Happens Next",
                dilemma: "Your school is thinking of banning phones completely. The first effect is obvious - less distraction in lessons. But what happens after that?",
                perspectives: {
                    a: { name: "Think It Through", argument: "Every rule has knock-on effects. How do people contact home? What do children do instead at break? Good decisions look past the first result." },
                    b: { name: "You Cannot Predict Everything", argument: "If you try to imagine every consequence you never decide anything. Sometimes you have to try it and see, then fix what breaks." },
                    c: { name: "Try It Small First", argument: "Test it with one year group for a term. That way you find the second effects for real, without betting the whole school on a guess." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Think of a rule at home or school. What happened AFTER it was introduced that nobody expected?", context: "Talk about whether it could have been predicted, or only discovered." }
        ],
        caseStudies: [
            { title: "Late Night Gaming", text: "1st Order: Fun video game right now! 2nd Order: Exhausted during math test tomorrow morning." }
        ],
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
            history: "Psychologists Daniel Kahneman and Amos Tversky showed in 1979 that people hate losing things far more than they enjoy gaining them. In 1985 Hal Arkes and Catherine Blumer ran experiments showing this makes us stick with bad choices just because we already paid for them - they called it the sunk cost effect.",
            whyItMatters: "Past time or money spent is gone forever (sunk). Always make decisions based on your FUTURE happiness!",
            funFact: "The Concorde supersonic jet lost millions of dollars, but governments kept funding it for years just because they felt bad stopping!"
        },
        example: "You buy a $10 movie ticket, but 15 minutes in you realize the movie is terrible. Staying for 2 hours wastes your time AND your money. Leaving frees up your afternoon!",
        videoId: "jJajz9n9Oi4", // Sprouts: Sunk Cost Fallacy
        videoQuiz: [
            { question: "What should guide your decisions according to Sunk Cost theory?", options: [{ text: "Your FUTURE happiness and value", correct: true }, { text: "Money you still have left to spend", correct: false }] }
        ],
        p4cInquiry: [
            {
                title: "When To Quit",
                shortTitle: "Quitting vs Sticking",
                dilemma: "You have been learning an instrument for two years and you do not enjoy it any more. Do you stop, or does stopping waste the two years?",
                perspectives: {
                    a: { name: "Stop Now", argument: "The two years are gone whatever you do. The only real question is whether the NEXT year is worth it - and if it is not, staying wastes that too." },
                    b: { name: "Keep Going", argument: "Lots of worthwhile things feel rubbish in the middle. If you quit every time it got boring you would never get good at anything." },
                    c: { name: "Change How, Not Whether", argument: "Maybe it is the lessons or the pieces, not the instrument. Try changing something before deciding it is over." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Is quitting always a bad thing?", context: "Talk about a time quitting was the right call, and a time sticking with it was." }
        ],
        caseStudies: [
            { title: "Moldy Food", text: "You bought an expensive $8 sandwich, but it tastes spoiled. Eating it makes you sick—throw it away! The $8 is already gone." }
        ],
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
        videoId: "IBYH2zwO0zM", videoQuiz: [{ question: "What does Hanlon's Razor suggest when someone makes a mistake?", options: [{ text: "Assume it was an innocent accident or phone distraction first", correct: true }, { text: "Assume they will do it again on purpose", correct: false }] }],
        p4cInquiry: [
            {
                title: "Mean, or Just Careless?",
                shortTitle: "Why People Slip Up",
                dilemma: "Someone bumps into you in the corridor and your books go everywhere. Should you assume they did it on purpose, or that they just were not looking?",
                perspectives: {
                    a: { name: "Assume Carelessness", argument: "Most bumps really are accidents. Assuming the worst means you get angry all day over something nobody meant, and you may hurt an innocent person's feelings." },
                    b: { name: "Sometimes It Is Deliberate", argument: "If it keeps happening to the same person, 'they weren't looking' stops being believable. Always assuming innocence can leave someone being bullied with no one noticing." },
                    c: { name: "Start Kind, Keep Track", argument: "Give the benefit of the doubt the first time. If there is a pattern, that pattern is itself evidence - and worth telling an adult about." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "When has someone assumed the worst about something you did by accident?", context: "Talk about how it felt, and what you wish they had done instead." }
        ],
        caseStudies: [{ title: "Unanswered Text", text: "Phone battery died vs secret villain plan!" }],
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
        videoId: "Kho5KvPBDSw", videoQuiz: [{ question: "What is Confirmation Bias?", options: [{ text: "Only noticing clues that agree with your existing belief", correct: true }, { text: "Believing whatever you were told first", correct: false }] }],
        p4cInquiry: [
            {
                title: "Noticing What Fits",
                shortTitle: "Seeing What You Expect",
                dilemma: "You have decided someone in your class is annoying. After that, do you notice them fairly - or only notice the annoying bits?",
                perspectives: {
                    a: { name: "You Stop Seeing Straight", argument: "Once you have decided, your brain collects proof. You will remember every annoying thing and not even register the kind ones." },
                    b: { name: "You Noticed For a Reason", argument: "You did not invent the opinion out of nowhere - something happened. Ignoring your own experience is not fair to you either." },
                    c: { name: "Run a Test", argument: "Spend one day deliberately looking for the opposite. If you find nothing, fine. If you find things, that tells you something." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something you believe that you have only ever looked for evidence FOR?", context: "Pick one and go looking for the other side together - then talk about how it felt." }
        ],
        caseStudies: [{ title: "Sports Predictions", text: "Only remembering the games your favorite team won while forgetting their losses!" }],
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
            <div class="viz-controls" role="tablist" aria-label="Deep-dive steps" style="margin-bottom: 24px;">
                <button role="tab" aria-selected="true" aria-controls="topicTabContent1" class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Story & Flashcards</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent2" class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. Video & Case Studies</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent3" class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Open P4C Inquiry</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent4" class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Questions &amp; Discussion</button>
            </div>

            <!-- Tab 1: Storybook & Flashcards -->
            <div id="topicTabContent1" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn1" tabindex="0">
                ${renderStorybookReader(mm.id, mm.storyScenes)}
                ${renderVocabularyFlashcards(mm.id, mm.vocabCards)}
                <div style="margin-top: 24px;">
                    <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: In-Depth Video & Context ➔</button>
                </div>
            </div>

            <!-- Tab 2: Video & Case Studies -->
            <div id="topicTabContent2" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn2" tabindex="0" style="display:none;">
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
                    <iframe src="https://www.youtube-nocookie.com/embed/${mm.videoId}?rel=0" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                ${renderVideoQuizComponent(mm.id, mm.videoQuiz)}

                <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-top: 20px;">
                    <a href="https://www.youtube.com/watch?v=${mm.videoId}" target="_blank" rel="noopener noreferrer" class="fb-action-btn outline" style="text-decoration:none;">▶ Watch Full Lesson Video on YouTube (New Tab)</a>
                    <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Try Open P4C Inquiry ➔</button>
                </div>
            </div>

            <!-- Tab 3: Open P4C Dialectic Inquiry -->
            <div id="topicTabContent3" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn3" tabindex="0" style="display:none;">
                ${typeof renderP4CInquiryEngine === 'function' ? renderP4CInquiryEngine(mm.id, mm.p4cInquiry) : ''}
            </div>

            <!-- Tab 4: Socratic Discussion Journal & Questions -->
            <div id="topicTabContent4" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn4" tabindex="0" style="display:none;">
                ${typeof renderSocraticDiscussionJournal === 'function' ? renderSocraticDiscussionJournal(mm.id, mm.name, mm.avatar, mm.discussionPrompts) : ''}

                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest an Upgrade</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about ${mm.name} or an idea to upgrade this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_${mm.id}" class="sandbox-input" aria-label="Type of message" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_${mm.id}" class="sandbox-input" aria-label="Your question or idea" placeholder="Type your question or suggestion here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('${mm.id}', '${escapeJsString(mm.name)}', '${mm.avatar}')">Save to My Questions</button>
                    
                    <div id="feedbackResult_${mm.id}" role="status" aria-live="polite" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for ${mm.name}:</h4>
                <div id="savedFeedbackList_${mm.id}">
                    <!-- Dynamically populated by feedback_vault.js -->
                </div>
            </div>
        </div>
    `;
}

// Philosopher Trading Cards & Unified Single-Topic Stage Renderer with 15-Minute Tab Depth
const thinkersData = [
    {
        id: "socrates",
        name: "Socrates",
        era: "Ancient Greece (469 - 399 BCE)",
        avatar: "🦉",
        quote: "The unexamined life is not worth living. (Plato, Apology 38a)",
        superpower: "The Socratic Questioning Method",
        conceptIntro: "Socrates believed that true wisdom begins when we admit we don't know everything. Instead of giving boring lectures, he asked deep 'Why?' questions to help people discover truth themselves!",
        storyScenes: [
            {
                title: "Scene 1: A Stonemason's Son",
                heading: "Athens, around 450 BCE",
                imageEmoji: "🏛️",
                text: "Socrates was not rich or well-born. His father cut stone and his mother helped babies be born. He fought as a foot soldier in three battles, then spent the rest of his life walking barefoot around the Athens marketplace in the same old cloak, talking to anyone who would stop.",
                factBox: "He wrote nothing down. Everything we know comes from people who listened to him - mainly Plato and Xenophon."
            },
            {
                title: "Scene 2: The Oracle's Puzzle",
                heading: "Nobody is wiser than Socrates",
                imageEmoji: "🔮",
                text: "A friend asked the oracle at Delphi whether anyone was wiser than Socrates. The answer came back: no one. Socrates was baffled. He felt he knew nothing important. So he set out to prove the oracle wrong by finding somebody wiser.",
                factBox: "Plato tells this story in the Apology, the speech Socrates gave at his own trial."
            },
            {
                title: "Scene 3: Asking Until It Cracks",
                heading: "Generals, poets and shoemakers",
                imageEmoji: "❓",
                text: "He questioned a general about courage, a priest about holiness, poets about their own poems. Every time, the confident answer fell apart after four or five questions. He concluded the oracle meant something small but real: other people thought they knew things they didn't. He at least knew when he didn't know.",
                factBox: "His method has a name - the elenchus - and it usually ends in aporia: honest, useful confusion."
            },
            {
                title: "Scene 4: The Trial",
                heading: "He could have walked away",
                imageEmoji: "⚖️",
                text: "Athens put him on trial for questioning the gods and 'corrupting the young'. A jury of hundreds of citizens found him guilty. He was offered exile instead of death and refused, because leaving would mean admitting the questioning had been wrong. He drank the poison at about seventy.",
                factBox: "The jury numbered 501. The vote to convict was close - roughly 280 to 221."
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
        p4cInquiry: [
            {
                title: "Knowing You Don't Know",
                shortTitle: "Saying I Don't Know",
                dilemma: "In class the teacher asks a question and you are not sure. Is it better to say 'I don't know', or to have a go with your best guess?",
                perspectives: {
                    a: { name: "Say You Don't Know", argument: "Being honest about not knowing is where real learning starts. If you pretend, nobody can help you - and you might teach someone else something wrong." },
                    b: { name: "Have a Go Anyway", argument: "A guess gives everyone something to think about. Even a wrong idea helps the class find the right one, and you find out faster than staying silent." },
                    c: { name: "Say Both", argument: "Say 'I'm not sure, but I think maybe...' - then people know how much to trust it, and you have still shared your thinking." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something you used to be certain about, and later found out you were wrong about?", context: "Talk about how it felt to change your mind, and whether anything good came out of it." },
            { prompt: "Is there a difference between a question that helps and a question that annoys?", context: "Try to work out together what makes the difference - the words, the tone, or the reason behind it." }
        ],
        caseStudies: [
            { title: "School Dilemma", text: "A friend says: 'Rules at school are unnecessary!' Socratic Question: 'If there were no rules, how would students cross the busy street safely?'" },
            { title: "Gaming Dilemma", text: "Someone claims: 'Cheating in games is smart!' Socratic Question: 'If everyone cheated, would winning have any meaning anymore?'" },
            { title: "Science Inquiry", text: "Someone says: 'The sun moves because the sky wants to.' Socratic Question: 'How can we measure planetary orbits to test if that is true?'" }
        ],
        videoId: "vNDYUlxNIAA", // TED-Ed Socratic Method
        videoQuiz: [
            { question: "What was Socrates' main goal when asking questions?", options: [{ text: "To help people examine their beliefs and discover truth", correct: true }, { text: "To show people how much he knew", correct: false }] },
            { question: "How did Socrates feel about claiming to know everything?", options: [{ text: "True wisdom begins by admitting you don't know everything", correct: true }, { text: "He thought knowing lots of facts was the same as being wise", correct: false }] }
        ],
    },
    {
        id: "hypatia",
        name: "Hypatia of Alexandria",
        era: "Roman Egypt (born c. 355 CE - died 415 CE)",
        avatar: "📐",
        quote: "No writing by Hypatia has survived. Her student Synesius wrote to her for help with astronomy and called her 'my mother, sister, teacher'. (Synesius, Letter 16)",
        superpower: "Mathematical Truth & Clear Evidence",
        conceptIntro: "Hypatia taught that we must test ideas with real measurements and geometry, rather than accepting rumors or superstitions.",
        storyScenes: [
            {
                title: "Scene 1: Alexandria",
                heading: "Roman Egypt, around 400 CE",
                imageEmoji: "🏙️",
                text: "Hypatia grew up in Alexandria, a busy port city where Greek, Egyptian, Jewish and Roman ideas all met. Her father Theon was a mathematician, and he taught her. She grew up to lead her own school of philosophy there, which almost no woman was able to do.",
                factBox: "The famous Great Library was already gone by her lifetime - that is a common mix-up."
            },
            {
                title: "Scene 2: What She Actually Taught",
                heading: "Geometry, astronomy, and how to check",
                imageEmoji: "📐",
                text: "Her students learned mathematics and how the sky moves - not by being told, but by working it out. She helped prepare the version of Ptolemy's great astronomy book that scholars still read. She taught that a claim you have not tested is only a rumour wearing smart clothes.",
                factBox: "A surviving manuscript credits 'the edition of Theon, with Hypatia the philosopher'."
            },
            {
                title: "Scene 3: Letters From a Student",
                heading: "How we know anything at all",
                imageEmoji: "✉️",
                text: "Most of what we know comes from letters written by one student, Synesius. He asks her advice about astronomy, describes having a star-measuring instrument made using what she taught him, and calls her 'my mother, sister, teacher'. Those letters are our best evidence.",
                factBox: "Not one word Hypatia wrote herself has survived. Quotes you see online attributed to her are invented."
            },
            {
                title: "Scene 4: Why We Know So Little",
                heading: "A dangerous time to ask questions",
                imageEmoji: "🕯️",
                text: "Alexandria in 415 CE was tense and violent, and powerful people resented a woman who taught science and questioned old beliefs. A mob killed her. Her school scattered and her writing was lost. It is a hard part of the story, and it is real history - telling the truth has not always been safe.",
                factBox: "Her death was recorded by the historian Socrates Scholasticus, writing a few decades later."
            }
        ],
        vocabCards: [
            { term: "Empiricism", icon: "🔬", definition: "The scientific principle that knowledge comes from sensory evidence and real-world testing." },
            { term: "Astrolabe", icon: "🧭", definition: "An ancient mathematical instrument used by astronomers to calculate planet and star positions." },
            { term: "Hypothesis", icon: "💡", definition: "A testable prediction or explanation for how something works in nature." }
        ],
        inDepth: {
            history: "Hypatia taught mathematics, astronomy and philosophy in Alexandria around 400 CE. She is the first woman mathematician whose life and work we have solid historical records for.",
            whyItMatters: "Testing hypotheses with hard evidence prevents us from being fooled by bad assumptions.",
            funFact: "Scholars think Hypatia helped prepare the version of Book III of Ptolemy's great astronomy book, the Almagest, that we still read today - the surviving manuscript credits 'the edition of Theon, with Hypatia the philosopher'."
        },
        p4cInquiry: [
            {
                title: "Testing vs Trusting",
                shortTitle: "Check It Yourself",
                dilemma: "A friend tells you something surprising they read online. Should you test it yourself, or is it fine to just believe them?",
                perspectives: {
                    a: { name: "Test It Yourself", argument: "Hypatia measured things instead of taking anyone's word for it. If you can check something in five minutes, checking beats trusting." },
                    b: { name: "Some Trust Is Necessary", argument: "You cannot personally test everything - you would never get anywhere. Trusting careful people who already did the work is how knowledge builds up." },
                    c: { name: "Depends What's At Stake", argument: "Test it if it matters, or if it sounds too good to be true. Otherwise file it as 'probably' and move on." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "How do you decide who to believe when two sources disagree?", context: "Think about what makes a source worth trusting - is it being popular, being confident, or showing its working?" }
        ],
        caseStudies: [
            { title: "Weather Inquiry", text: "Someone says: 'It only rains when the sky is sad.' Hypatia's Method: Measure cloud humidity, temperature, and evaporation!" },
            { title: "Plant Growth", text: "Someone says: 'Plants grow because of magic spells.' Hypatia's Method: Run an experiment measuring sunlight, soil, and water!" }
        ],
        videoId: "n1mwZrVJ-TI", // TED-Ed Hypatia
        contentNote: "Before you watch: Hypatia lived in dangerous times. Some powerful people in Alexandria were angry that a woman taught science and questioned old beliefs, and in 415 CE a mob killed her. The video tells that part of her story. It is sad, and it is real history - people have not always been safe when they told the truth. You might like to watch it with a grown-up you can talk to afterwards.",
        videoQuiz: [
            { question: "What is Hypatia best known for teaching?", options: [{ text: "Geometry and astronomy - including how to work out star positions with maths", correct: true }, { text: "Ships and bridges", correct: false }] }
        ],
    },
    {
        id: "aristotle",
        name: "Aristotle",
        era: "Ancient Greece (384 - 322 BCE)",
        avatar: "📜",
        quote: "We become builders by building, and musicians by playing music. In the same way we become fair by doing fair things, and brave by doing brave things. (Nicomachean Ethics, Book II)",
        superpower: "Categorization & Habit Formation",
        conceptIntro: "Aristotle organized all human knowledge into logical categories (animals, plants, ethics) and showed that great character is built by practicing good habits every day.",
        storyScenes: [
            {
                title: "Scene 1: The Doctor's Son",
                heading: "Northern Greece, 384 BCE",
                imageEmoji: "🩺",
                text: "Aristotle's father was doctor to the king of Macedon, so he grew up around people who examined bodies carefully and wrote down what they saw. At seventeen he travelled to Athens to join Plato's Academy - and stayed for twenty years.",
                factBox: "He disagreed with Plato about a great deal, and stayed anyway. That is worth noticing."
            },
            {
                title: "Scene 2: Tutor to a Future Conqueror",
                heading: "Teaching a thirteen-year-old prince",
                imageEmoji: "👑",
                text: "King Philip hired him to teach his son. That boy became Alexander the Great. Aristotle taught him poetry, science and ethics. Later, Alexander is said to have sent specimens back from his campaigns for his old teacher to study.",
                factBox: "The specimen story may be embroidery - ancient biographers enjoyed a good detail."
            },
            {
                title: "Scene 3: Counting Everything",
                heading: "The school with the walking paths",
                imageEmoji: "🐙",
                text: "Back in Athens he founded the Lyceum and set about examining the world piece by piece: hundreds of animal species, the parts of a plant, the kinds of government, the shapes of an argument. He dissected creatures and described what he found rather than what he expected.",
                factBox: "He described roughly 500 species, and got the octopus's mating arm right - checked and confirmed in the 1800s."
            },
            {
                title: "Scene 4: You Are Your Habits",
                heading: "Character is built, not given",
                imageEmoji: "🔁",
                text: "His answer to 'how do I become good?' was not a feeling. It was practice. We become builders by building and musicians by playing music - so we become brave by doing brave things, over and over, until it is simply who we are.",
                factBox: "Nicomachean Ethics, Book II. Named after his son, Nicomachus."
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
        p4cInquiry: [
            {
                title: "Are You What You Do?",
                shortTitle: "Habits and Character",
                dilemma: "Someone is usually kind but was mean today. Are they a kind person who had a bad day, or are they only as kind as their meanest moment?",
                perspectives: {
                    a: { name: "You Are Your Pattern", argument: "Aristotle said character is built from repeated actions. One bad day does not cancel a hundred good ones - the pattern is the person." },
                    b: { name: "The Moment Counts", argument: "If you were the person they were mean to, 'usually kind' is not much comfort. Character has to show up when it is hard, or it is not character." },
                    c: { name: "Watch What Happens Next", argument: "What tells you most is whether they notice, say sorry, and change. That is the habit that actually matters." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is one small thing you do every day that is quietly shaping who you become?", context: "Talk about a habit - good or bad - and what it might add up to in a year." },
            { prompt: "Can someone be a good person if they never actually do anything good?", context: "Discuss whether intentions on their own count, or whether it has to show up in what you do." }
        ],
        caseStudies: [
            { title: "Music Mastery", text: "You don't become a master pianist in 1 day. Practicing 15 minutes a day for 100 days creates piano excellence!" }
        ],
        videoId: "csIW4W_DYX4", // School of Life Aristotle
        videoQuiz: [
            { question: "According to Aristotle, how do we build good character?", options: [{ text: "By practicing small daily habits of virtue", correct: true }, { text: "By being born with a naturally good character", correct: false }] }
        ],
    },
    {
        id: "aurelius",
        name: "Marcus Aurelius",
        era: "Roman Empire (121 - 180 CE)",
        avatar: "🏛️",
        quote: "If you are distressed by something outside yourself, the pain is not from the thing itself but from your own judgement about it - and that you have the power to change right now. (Meditations 8.47)",
        superpower: "Stoic Mindset & Emotional Resilience",
        conceptIntro: "Marcus Aurelius was a Roman Emperor who wrote a personal diary reminding himself that we cannot control bad weather or mean people, but we CAN control our own reaction!",
        storyScenes: [
            {
                title: "Scene 1: The Most Powerful Man Alive",
                heading: "Rome, 161 CE",
                imageEmoji: "🏛️",
                text: "Marcus Aurelius ruled an empire stretching from Britain to Egypt. He could have anything he wanted and order almost anything he liked. He spent his private time writing notes reminding himself to be patient, humble, and not to waste the day.",
                factBox: "He ruled for 19 years, most of them at war on the empire's frontiers."
            },
            {
                title: "Scene 2: A Notebook, Not a Book",
                heading: "Written for an audience of one",
                imageEmoji: "📓",
                text: "The book we call Meditations was never meant for us. Its Greek title means 'To Himself'. He wrote it in army camps on the Danube frontier, at night, in a language that was not his first - reminders scribbled by a tired man trying to stay decent.",
                factBox: "It was not published in his lifetime. We are, strictly speaking, reading his diary."
            },
            {
                title: "Scene 3: Everything Went Wrong",
                heading: "Plague, war, and grief",
                imageEmoji: "🌊",
                text: "A plague swept the empire and killed millions. Wars dragged on for years. Of his fourteen children, most died before he did. He kept writing the same idea in different words: you do not control what happens, only what you do next.",
                factBox: "The Antonine Plague, from 165 CE, may have killed 10 percent of the Roman empire."
            },
            {
                title: "Scene 4: The Part That Is Yours",
                heading: "Judgement, not events",
                imageEmoji: "🧭",
                text: "His clearest thought: when something outside you upsets you, the pain is not really coming from the thing. It is coming from your judgement about the thing - and that you can change, right now. Not easy. But yours.",
                factBox: "Meditations 8.47. He was writing it to convince himself, which is why it does not sound smug."
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
        p4cInquiry: [
            {
                title: "What You Can and Cannot Control",
                shortTitle: "Staying Calm",
                dilemma: "You practised hard but lost the match because of a bad referee decision. Is it right to just accept it calmly?",
                perspectives: {
                    a: { name: "Let It Go", argument: "You cannot change the decision, and being furious for a week only wrecks your week. Control your reaction, because that is the only bit that is yours." },
                    b: { name: "Being Upset Is Fair", argument: "Something unfair happened, and pretending it is fine is not strength, it is hiding. Feeling angry about unfairness is part of caring." },
                    c: { name: "Feel It, Then Act", argument: "Be properly annoyed for a bit - then use it. Speak up about the decision, or train harder. Calm is not the same as doing nothing." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something that upsets you that you genuinely cannot change?", context: "Talk about what actually helps when nothing can be done about the thing itself." },
            { prompt: "Is staying calm always the brave choice?", context: "Discuss times when getting upset was the right response." }
        ],
        caseStudies: [
            { title: "Rainy Picnic", text: "It rains on your birthday outdoor party! Stoic choice: Can't stop the rain, but CAN switch to an epic indoor board game marathon!" }
        ],
        videoId: "R9OCA6UFE-0", // TED-Ed Stoicism
        videoQuiz: [
            { question: "What is inside your total control according to Stoicism?", options: [{ text: "Your thoughts, choices, and reactions", correct: true }, { text: "Other people's opinions of you", correct: false }] }
        ],
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
                title: "Scene 1: The Boy Who Stayed in Bed",
                heading: "France, 1596",
                imageEmoji: "🛏️",
                text: "Descartes was a sickly child, so his school let him stay in bed each morning instead of going to lessons at dawn. He kept the habit for life - lying still and thinking before the day started. He said it was when he did his best work.",
                factBox: "He later took a job in Sweden where the queen wanted lessons at 5am. He died within months."
            },
            {
                title: "Scene 2: Three Dreams in a Stove-Heated Room",
                heading: "November 1619",
                imageEmoji: "🔥",
                text: "As a young soldier, snowed in near the Danube, he spent a day alone in a warm room and had three vivid dreams. He came out convinced that all real knowledge could be connected together like geometry, if you built it from things you could not possibly doubt.",
                factBox: "He recorded the date: the night of 10 November 1619."
            },
            {
                title: "Scene 3: Doubting On Purpose",
                heading: "What if everything is a trick?",
                imageEmoji: "🌀",
                text: "So he tried to doubt everything. His eyes could be fooled - sticks look bent in water. Dreams feel completely real while you are in them. Perhaps some powerful trickster was feeding him a fake world. Almost nothing survived the test.",
                factBox: "This is called the method of doubt. He was not being gloomy; he was clearing the ground."
            },
            {
                title: "Scene 4: One Thing Left Standing",
                heading: "I am thinking, therefore I am",
                imageEmoji: "💭",
                text: "One thing could not be doubted. Something had to be doing the doubting. If he was being tricked, there still had to be a him to trick. That was his foundation stone. He also invented the grid of x and y that you use in maths - the same idea, made visible.",
                factBox: "Coordinates are still called Cartesian, after him."
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
        p4cInquiry: [
            {
                title: "Can You Trust Your Own Eyes?",
                shortTitle: "Doubting Things",
                dilemma: "Descartes decided to doubt everything he could not be totally certain about. Is doubting everything clever, or an exhausting way to live?",
                perspectives: {
                    a: { name: "Doubt Is a Tool", argument: "Magic tricks, optical illusions and bad adverts all work because we trust our senses too easily. Doubting first is how you avoid being fooled." },
                    b: { name: "You Have to Trust Something", argument: "If you doubt the floor you never get out of bed. Being sensible means trusting things that have never let you down, and saving your doubt for odd claims." },
                    c: { name: "Doubt in the Right Places", argument: "Trust ordinary things. Get suspicious when someone wants something from you, or when it sounds too neat." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is one thing you are completely certain of, and how do you know?", context: "Push gently on each other's answers - can you get to something that cannot be doubted?" }
        ],
        caseStudies: [
            { title: "Magic Show", text: "At a magic show, a coin appears to vanish into thin air. Radical Doubt reminds you: your eyes are being tricked—matter cannot disappear!" }
        ],
        videoId: "7iGjiSbEp9c", // Wireless Philosophy Descartes
        videoQuiz: [
            { question: "What is the one thing Descartes realized was 100% impossible to doubt?", options: [{ text: "The fact that he was currently thinking", correct: true }, { text: "Anything he had been taught at school", correct: false }] }
        ],
    },
    {
        id: "popper",
        name: "Karl Popper",
        era: "Austria/UK (1902 - 1994)",
        avatar: "🦢",
        quote: "A theory which is not refutable by any conceivable event is non-scientific. Irrefutability is not a virtue of a theory but a vice. (Conjectures and Refutations, 1963)",
        superpower: "Falsification (Finding Black Swans)",
        conceptIntro: "Karl Popper proved that real scientists don't just look for clues that agree with them. They actively hunt for counter-examples ('black swans') to test their theories!",
        storyScenes: [
            {
                title: "Scene 1: Vienna, Full of Big Ideas",
                heading: "Austria, around 1919",
                imageEmoji: "🏙️",
                text: "Popper was a teenager in a city buzzing with theories that claimed to explain everything - about history, about the mind, about society. Their supporters could take any event at all and show how it fitted. That was exactly what started to bother him.",
                factBox: "He trained as a cabinetmaker and a schoolteacher before becoming a philosopher."
            },
            {
                title: "Scene 2: The Test Einstein Was Willing To Fail",
                heading: "An eclipse, 1919",
                imageEmoji: "🌒",
                text: "Einstein said starlight passing the sun would bend by a precise amount. If the eclipse photographs showed anything else, his theory was finished. He said so out loud, in advance. Popper never forgot the difference: Einstein had put his theory at risk.",
                factBox: "The measurements matched. But Popper's point was that they might not have."
            },
            {
                title: "Scene 3: Fits Everything, Says Nothing",
                heading: "The strength of being breakable",
                imageEmoji: "🧪",
                text: "Popper's rule: a theory is scientific if you can say what would prove it wrong. 'This charm brings luck, and when it seems not to, you did not believe hard enough' can never fail - so it never tells you anything about the world.",
                factBox: "Conjectures and Refutations, 1963: 'Irrefutability is not a virtue of a theory but a vice.'"
            },
            {
                title: "Scene 4: The Bird That Changes Everything",
                heading: "One is enough",
                imageEmoji: "🦢",
                text: "For centuries Europeans said all swans were white, because every swan they had seen was white. Then Europeans reached Australia and found black ones. No number of white swans could ever prove the rule; a single black one broke it. That, said Popper, is how knowledge actually moves.",
                factBox: "Which is why scientists try to break their own ideas before someone else does."
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
        p4cInquiry: [
            {
                title: "Hunting For Your Own Mistakes",
                shortTitle: "Proving Yourself Wrong",
                dilemma: "You have a theory about why your bike keeps making a clicking noise. Should you look for evidence that you are right, or evidence that you are wrong?",
                perspectives: {
                    a: { name: "Hunt For Wrong", argument: "You can always find something that fits your theory - that proves nothing. The only real test is looking hard for the thing that would kill it." },
                    b: { name: "Build the Case First", argument: "If you attack every idea the moment you have it, you will never develop any of them. Give a theory a fair chance to show what it explains." },
                    c: { name: "Both, In Order", argument: "Build it up until it is clear enough to test - then genuinely try to break it. An idea that survives a real attempt is worth keeping." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What would have to happen for you to change your mind about something you believe?", context: "If the honest answer is 'nothing could', talk about what that tells you." }
        ],
        caseStudies: [
            { title: "Scientific Testing", text: "A scientist claims: 'All rocks float!' Popper's test: Drop 100 rocks in water. Dropping 1 heavy granite rock and watching it sink falsifies the claim!" }
        ],
        videoId: "wf-sGqBsWv4", // BBC Radio 4 Popper
        videoQuiz: [
            { question: "How do true scientists test a new theory according to Karl Popper?", options: [{ text: "By actively hunting for counter-examples that could prove it wrong", correct: true }, { text: "By collecting as many examples that agree as possible", correct: false }] }
        ],
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
                title: "Scene 1: An Experiment on a Child",
                heading: "London, 1806",
                imageEmoji: "📚",
                text: "Mill's father decided to raise a genius. Ancient Greek at three. Latin at eight. Logic, history and economics as a small boy, with no holidays, no school and almost no other children. By his teens he knew more than most university graduates.",
                factBox: "He learned Greek from flashcards before he could have read an English storybook."
            },
            {
                title: "Scene 2: Everything Went Grey",
                heading: "The crisis at twenty",
                imageEmoji: "🌫️",
                text: "At twenty he asked himself a question: if everything you are working for came true tomorrow, would you be happy? The honest answer was no. All the argument and analysis had left him with nothing he actually cared about. He could not shake it for months.",
                factBox: "He wrote about it plainly in his Autobiography, which was unusual and brave for the time."
            },
            {
                title: "Scene 3: Rescued by a Poem",
                heading: "Wordsworth, and feeling things",
                imageEmoji: "🌿",
                text: "What pulled him out was poetry - Wordsworth writing about mountains and memory. He realised a person is not only a thinking machine. Feelings are not a distraction from good judgement; they are part of what makes a life worth judging.",
                factBox: "He never abandoned logic. He added something to it."
            },
            {
                title: "Scene 4: Your Life Is Yours",
                heading: "The harm principle",
                imageEmoji: "🗽",
                text: "His grown-up idea: you may live as you like, as long as you are not harming other people - and that goes for opinions too. Even a view everyone hates should be argued with, not silenced, because the majority has been wrong before.",
                factBox: "In 1866 he presented Parliament with a petition for women's suffrage - over 60 years before it passed."
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
        videoId: "dItUGF8GdTw", // TED-Ed: 5 tips to improve your critical thinking (Mill: judging ideas for yourself)
        videoQuiz: [
            { question: "How did John Stuart Mill describe human nature?", options: [{ text: "Like a living tree that grows by making its own choices", correct: true }, { text: "Like a rule everyone must follow the same way", correct: false }] },
            { question: "What happens when you make your own thoughtful choices?", options: [{ text: "It exercises and strengthens your mental & moral muscles", correct: true }, { text: "It means never changing your mind", correct: false }] }
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
        quote: "Do not impose on others what you yourself do not desire. (Analects 15.24)",
        superpower: "The Silver Rule & Ritual Respect",
        conceptIntro: "Confucius taught that harmony in a family or society begins with empathy and respect. By practicing the Silver Rule, we build a peaceful world!",
        storyScenes: [
            {
                title: "Scene 1: A Poor Boy in a Broken Time",
                heading: "China, 551 BCE",
                imageEmoji: "🌾",
                text: "His father died when he was three and the family had very little. He worked as a bookkeeper and looked after animals, teaching himself in whatever time was left. China was splitting into rival states that were constantly at war.",
                factBox: "His name in Chinese is Kongzi - Master Kong. 'Confucius' is a Latin version from the 1600s."
            },
            {
                title: "Scene 2: Thirteen Years on the Road",
                heading: "Looking for one ruler who would listen",
                imageEmoji: "🐎",
                text: "Convinced that rulers could govern by good example rather than fear, he travelled from state to state offering advice. Almost nobody wanted it. He was ignored, turned away, once nearly starved. He kept going and kept teaching whoever came.",
                factBox: "He is said to have had 3,000 students. He took poor ones as well as rich ones - unusual then."
            },
            {
                title: "Scene 3: Two Words Worth Knowing",
                heading: "Ren and li",
                imageEmoji: "🤝",
                text: "Ren means caring about other people as though they mattered as much as you. Li means the everyday ways we show it - greeting someone properly, waiting your turn, treating an elder with respect. He thought big goodness is built out of small courtesies.",
                factBox: "'Do not impose on others what you yourself do not desire.' Analects 15.24."
            },
            {
                title: "Scene 4: Written Down by His Students",
                heading: "A conversation, not a sermon",
                imageEmoji: "📜",
                text: "He never wrote a book of teachings. After his death his students collected things he had said into the Analects - short exchanges, questions, sometimes him admitting he was stuck. Those fragments went on to shape schools and governments for 2,500 years.",
                factBox: "The Analects is mostly dialogue, which makes it feel oddly modern to read."
            }
        ],
        vocabCards: [
            { term: "Ren (Empathy)", icon: "❤️", definition: "Humaneness, benevolence, and loving kindness toward all people." }
        ],
        inDepth: { history: "Confucius was an ancient Chinese teacher whose ethical teachings shaped Asian civilization.", whyItMatters: "Empathy is the foundation of true friendship and strong communities.", funFact: "His ideas were recorded by his students in a famous book called the Analects." },
        videoId: "tUhGRh4vdb8",
        videoQuiz: [{ question: "What is Confucius' Silver Rule?", options: [{ text: "Do not impose on others what you yourself do not desire", correct: true }, { text: "Always put your own family first", correct: false }] }],
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
        quote: "Nothing in the world is softer or weaker than water. Yet nothing is better at wearing down what is hard and strong. (Tao Te Ching, ch. 78)",
        superpower: "Wu Wei & Flowing Harmony",
        conceptIntro: "Lao Tzu wrote the 'Tao Te Ching', teaching the principle of Wu Wei ('effortless action')—working with nature like water flowing around rocks!",
        storyScenes: [
            {
                title: "Scene 1: A Man We Are Not Sure Existed",
                heading: "China, perhaps the 6th century BCE",
                imageEmoji: "❓",
                text: "'Lao Tzu' means something like 'Old Master'. Tradition says he was a records keeper in the royal archives. Historians genuinely do not know whether he was one person, several, or a name attached to a collection of older sayings.",
                factBox: "The oldest surviving copies of his book were found in a tomb sealed around 300 BCE."
            },
            {
                title: "Scene 2: Stopped at the Mountain Pass",
                heading: "The story of how the book exists",
                imageEmoji: "🐃",
                text: "The legend says he grew tired of the world's cleverness and rode west on a water buffalo to leave China for good. A guard at the mountain pass recognised him and refused to let him through until he wrote his ideas down. He produced about 5,000 characters, handed them over, and was never seen again.",
                factBox: "A story, almost certainly. But it is how the Tao Te Ching is said to have reached us."
            },
            {
                title: "Scene 3: The Strength of Water",
                heading: "Wu wei",
                imageEmoji: "🌊",
                text: "Water is the softest thing there is. It yields to everything, takes the shape of whatever holds it, never argues - and it carves canyons out of rock. Wu wei means acting like that: with the situation instead of against it, using force last rather than first.",
                factBox: "'Nothing in the world is softer than water. Yet nothing is better at wearing down the hard.' Ch. 78."
            },
            {
                title: "Scene 4: Try Explaining It",
                heading: "The first line is a warning",
                imageEmoji: "☯️",
                text: "The book opens by saying that the Tao you can put into words is not the real Tao. It is a strange way to begin 81 chapters. The point is that some things are learned by doing and noticing, not by being handed a definition - like balancing on a bike.",
                factBox: "It is among the most translated books ever written, after the Bible."
            }
        ],
        vocabCards: [
            { term: "Wu Wei", icon: "🌊", definition: "Effortless action; acting in natural alignment without forcing or pushing." }
        ],
        inDepth: { history: "Lao Tzu was the legendary founder of Taoism in ancient China.", whyItMatters: "Patience and gentle persistence often solve problems better than anger or brute force.", funFact: "Taoist philosophy influenced Asian martial arts like Tai Chi!" },
        videoId: "dFb7Hxva5rg",
        videoQuiz: [{ question: "What metaphor did Lao Tzu use for gentle strength?", options: [{ text: "Water flowing around rocks", correct: true }, { text: "A tall mountain", correct: false }] }],
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
        quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law. (Groundwork of the Metaphysics of Morals, 1785)",
        superpower: "The Categorical Imperative & Universal Duty",
        conceptIntro: "Kant taught that before doing an action, ask: 'What if EVERYONE in the world did this all the time?' If the world breaks, don't do it!",
        storyScenes: [
            {
                title: "Scene 1: The Man Who Never Left Town",
                heading: "Konigsberg, Prussia, 1724",
                imageEmoji: "🏘️",
                text: "Kant was born in a Baltic port city, went to university there, taught there, and died there at seventy-nine. He is thought never to have travelled more than about a hundred miles from home - and produced some of the most far-reaching philosophy ever written.",
                factBox: "The city is now Kaliningrad. His tomb is still there."
            },
            {
                title: "Scene 2: A Very Regular Life",
                heading: "The famous walk",
                imageEmoji: "🕰️",
                text: "He lectured in the morning, wrote, ate one large meal with guests, and walked the same route every afternoon. People joked you could set your watch by him. He was also popular company - funny at dinner, and interested in almost everything.",
                factBox: "The set-your-watch story comes from the poet Heine, decades later. Treat it as a good legend."
            },
            {
                title: "Scene 3: Woken Up",
                heading: "Hume's awkward question",
                imageEmoji: "⚡",
                text: "Reading the Scottish philosopher David Hume shook him badly - Hume argued we never actually observe one thing causing another, only one thing following another. Kant said it woke him from his 'dogmatic slumber' and sent him back to the start.",
                factBox: "His answer took twelve years to write and is famously difficult: the Critique of Pure Reason, 1781."
            },
            {
                title: "Scene 4: What If Everyone Did That?",
                heading: "The categorical imperative",
                imageEmoji: "⚖️",
                text: "His test for whether an action is right: could you want it to become a rule everyone follows, always? Lying fails immediately - if everyone lied whenever convenient, promises would stop meaning anything, and your lie would not even work.",
                factBox: "Groundwork of the Metaphysics of Morals, 1785."
            }
        ],
        vocabCards: [
            { term: "Deontology", icon: "📜", definition: "An ethical theory that uses rules to distinguish right from wrong, focusing on moral duty." }
        ],
        inDepth: { history: "Kant lived in Königsberg, Prussia, and wrote major works on ethics and human reason.", whyItMatters: "Universal thinking reminds us that we shouldn't make selfish exceptions for ourselves.", funFact: "Kant was so punctual that neighbors set their pocket watches by his daily afternoon walks!" },
        videoId: "nsgAsw4XGvU",
        videoQuiz: [{ question: "What is Kant's Categorical Imperative test?", options: [{ text: "Ask what would happen if everyone in the world did the action", correct: true }, { text: "Do whatever makes you happiest", correct: false }] }],
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
        quote: "The Analytical Engine weaves algebraic patterns, just as the Jacquard-loom weaves flowers and leaves. (Note A, 1843)",
        superpower: "Poetic Science & First Algorithms",
        conceptIntro: "Ada Lovelace saw that computing machines could go beyond numbers to process music, art, and symbols—writing the world's very first computer algorithm!",
        storyScenes: [
            {
                title: "Scene 1: Kept Away From Poetry",
                heading: "London, 1815",
                imageEmoji: "🌹",
                text: "Ada was the daughter of Lord Byron, the most scandalous poet in England. Her parents separated weeks after she was born and she never met him. Her mother had her taught mathematics intensively, hoping it would keep her from turning out like her father.",
                factBox: "She was often ill as a child, and taught herself geometry while recovering."
            },
            {
                title: "Scene 2: The Machine on the Table",
                heading: "Meeting Charles Babbage, age 17",
                imageEmoji: "⚙️",
                text: "At a party she saw part of Babbage's Difference Engine - a calculating machine of brass gears. Most guests thought it a curiosity. Ada asked how it worked, then kept asking. They became friends and correspondents for the rest of her life.",
                factBox: "Babbage called her 'the Enchantress of Number'."
            },
            {
                title: "Scene 3: The Translation That Grew",
                heading: "Notes A to G",
                imageEmoji: "📝",
                text: "Asked to translate an Italian article about Babbage's newer Analytical Engine, she added notes of her own. The notes ended up about three times longer than the article. In them she worked out, step by step, how you would actually instruct the machine.",
                factBox: "Published 1843. She signed it only 'A.A.L.' - initials, because she was a woman."
            },
            {
                title: "Scene 4: The Leap Nobody Else Made",
                heading: "Numbers are not the point",
                imageEmoji: "🎼",
                text: "Babbage saw a calculator. Ada saw something else: if the machine could handle numbers standing for quantities, it could handle numbers standing for anything - letters, or notes of music. She imagined a machine composing songs, a century before computers existed.",
                factBox: "She also warned it could only do what it was told - no more, no less."
            }
        ],
        vocabCards: [
            { term: "Algorithm", icon: "⚙️", definition: "A step-by-step set of rules or instructions to solve a problem or perform a task." }
        ],
        inDepth: { history: "Daughter of poet Lord Byron, Ada worked with Charles Babbage on the Analytical Engine.", whyItMatters: "Imagination and logic together unlock revolutionary inventions.", funFact: "The programming language 'Ada', created by the US Department of Defense, was named in her honor!" },
        videoId: "uOkmyICUW_c",
        videoQuiz: [{ question: "What did Ada Lovelace create?", options: [{ text: "The world's first computer algorithm", correct: true }, { text: "The first mechanical calculator", correct: false }] }],
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
    },
    {
        id: "buddha",
        name: "Siddhartha Gautama (the Buddha)",
        era: "Ancient India / Nepal (c. 480 - c. 400 BCE)",
        avatar: "🪷",
        quote: "All that we are is the result of what we have thought. (Dhammapada, verse 1)",
        superpower: "Looking Suffering Straight In The Face",
        conceptIntro: "Siddhartha grew up with everything anyone could want, and it did not make him happy. He spent the rest of his life working out where unhappiness actually comes from - and concluded it comes from wanting things to be different than they are.",
        storyScenes: [
            {
                title: "Scene 1: The Sheltered Prince",
                heading: "A palace with the gates shut",
                imageEmoji: "🏯",
                text: "Siddhartha was born a prince in the foothills of the Himalayas. The story goes that his father, warned his son might leave home to become a wandering teacher, tried to prevent it by giving him everything: gardens, music, comfort, and walls high enough that he never saw anything sad.",
                factBox: "The oldest written accounts of his life come from centuries after his death, so historians treat the palace details as legend built around a real person."
            },
            {
                title: "Scene 2: Four Things He Was Not Meant To See",
                heading: "Old age, sickness, death, and a calm face",
                imageEmoji: "🚶",
                text: "In his twenties he went outside. He saw an old person, a sick person, and a dead body - and understood for the first time that this happens to everyone, including him. Then he saw a wandering holy man who looked completely at peace. He left the palace that night.",
                factBox: "This is called the Four Sights. Whether or not it happened in one day, it frames the question his whole philosophy answers."
            },
            {
                title: "Scene 3: Nearly Starving To Death",
                heading: "Trying the opposite extreme",
                imageEmoji: "🌿",
                text: "He tried the hardest version of giving things up - eating almost nothing, for years, until he could feel his spine through his stomach. It did not work either. He accepted a bowl of rice from a village girl and decided that punishing yourself is just as much a trap as spoiling yourself.",
                factBox: "He called what he found instead the Middle Way: not indulgence, not self-torture."
            },
            {
                title: "Scene 4: Wanting Things To Be Different",
                heading: "Sitting under the tree",
                imageEmoji: "🌸",
                text: "His answer was uncomfortable and simple. Life contains suffering. Much of that suffering comes not from what happens, but from craving that things be otherwise. Loosen the craving and the suffering loosens too - and that can be practised, like any skill.",
                factBox: "Those are the first two of the Four Noble Truths, the core of what he taught for about 45 years."
            }
        ],
        vocabCards: [
            { term: "Dukkha", icon: "😔", definition: "Often translated 'suffering', but closer to 'unsatisfactoriness' - the feeling that things are not quite right." },
            { term: "The Middle Way", icon: "⚖️", definition: "Avoiding both extremes: neither spoiling yourself nor punishing yourself." },
            { term: "Craving", icon: "🧲", definition: "Wanting things to be different from how they are, so strongly that it hurts." }
        ],
        inDepth: {
            history: "Siddhartha Gautama taught in northern India around 2,500 years ago. 'Buddha' is not a name but a title meaning 'the awakened one'.",
            whyItMatters: "A lot of unhappiness comes from wishing a situation were different rather than from the situation itself. Noticing which is which is a genuinely useful skill.",
            funFact: "He asked his followers not to take his word for anything, but to test his ideas the way you would test gold: by working on them yourself."
        },
        p4cInquiry: [
            {
                title: "Is Wanting Things Bad?",
                shortTitle: "Wanting Things",
                dilemma: "You really want a new bike. Is wanting it a problem, or is wanting things just part of being alive?",
                perspectives: {
                    a: { name: "Wanting Causes The Ache", argument: "The wanting is what makes you restless now. You were fine before you knew the bike existed - and you will want something else the week after you get it." },
                    b: { name: "Wanting Is What Moves You", argument: "Nobody ever learned an instrument or saved up for anything without wanting it first. Take away wanting and you take away trying." },
                    c: { name: "It Is How Tightly You Hold It", argument: "Wanting the bike is fine. Being miserable every day until you get it is the part that costs you something." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something you wanted badly and then got? How long did it feel special for?", context: "Talk about whether the wanting or the having was the bigger part of it." },
            { prompt: "Is it possible to want something and still be happy while you wait?", context: "Try to work out together what would have to be true for that to work." }
        ],
        caseStudies: [
            { title: "The Ruined Afternoon", text: "It rains on the day of your trip. The rain lasts an hour; being furious about the rain can last all day. Which one actually spoiled the afternoon?" },
            { title: "The Thing You Wanted", text: "Think of something you really wanted and finally got. How long did the happy feeling last before you started wanting the next thing?" }
        ],
        videoId: "tilBs32zN7I",
        videoQuiz: [
            { question: "What did Siddhartha conclude after trying both a life of luxury and a life of extreme hardship?", options: [{ text: "Neither extreme worked - he chose a middle path between them", correct: true }, { text: "Luxury was the answer after all", correct: false }] }
        ]
    },
    {
        id: "zhuangzi",
        name: "Zhuangzi",
        era: "Ancient China (c. 369 - c. 286 BCE)",
        avatar: "🦋",
        quote: "Once I dreamt I was a butterfly... Suddenly I woke, and there I was, myself again. Now I do not know whether I was a man dreaming I was a butterfly, or whether I am now a butterfly dreaming I am a man. (Zhuangzi, ch. 2)",
        superpower: "Turning Certainty Upside Down With A Joke",
        conceptIntro: "Zhuangzi wrote the funniest philosophy in the ancient world. He used silly stories - talking trees, useless carpenters, a butterfly - to knock the confidence out of people who were very sure they knew how things are.",
        storyScenes: [
            {
                title: "Scene 1: The Man Who Turned Down The Job",
                heading: "Offered the top position, said no",
                imageEmoji: "🎣",
                text: "The story goes that the King of Chu sent officials to offer Zhuangzi the job of prime minister. He was fishing at the time. He asked whether they knew about the sacred tortoise the king kept, dead, wrapped in silk in a box of honour - and asked whether the tortoise would rather be honoured and dead, or alive and dragging its tail in the mud. Then he told them to go away.",
                factBox: "The Zhuangzi is a collection; scholars think only the first seven chapters are likely by him."
            },
            {
                title: "Scene 2: The Butterfly",
                heading: "Which one is the dream?",
                imageEmoji: "🦋",
                text: "He dreamt he was a butterfly - not a man dreaming, but simply a butterfly, going wherever it liked. Then he woke up, and was unmistakably himself. And he could not work out which way round it was: a man who had dreamt of being a butterfly, or a butterfly now dreaming it was a man.",
                factBox: "Descartes used almost the same argument 2,000 years later. Zhuangzi got there first, and was less worried about it."
            },
            {
                title: "Scene 3: The Useless Tree",
                heading: "Too crooked to cut down",
                imageEmoji: "🌳",
                text: "A carpenter passes an enormous old tree and does not even glance at it - the wood is knotted and useless for building. Zhuangzi points out that this is exactly why the tree got to be enormous and old. Every straight, useful tree in the forest was cut down young.",
                factBox: "He is asking a real question: useful to whom, and at what price?"
            },
            {
                title: "Scene 4: The Fish Argument",
                heading: "How do you know what a fish enjoys?",
                imageEmoji: "🐟",
                text: "Walking over a river, Zhuangzi says the fish are enjoying themselves. His friend Huizi says: you are not a fish, how would you know? Zhuangzi replies: you are not me, so how do you know that I do not know? It is a joke and an argument at the same time - about the limits of being certain what is going on inside anyone else.",
                factBox: "Huizi was a real logician and Zhuangzi's actual friend. Their arguments run right through the book."
            }
        ],
        vocabCards: [
            { term: "Relativism", icon: "🔄", definition: "The idea that what looks 'big', 'useful' or 'normal' depends on where you are standing." },
            { term: "Wu Wei", icon: "🌊", definition: "Acting with the grain of a situation instead of forcing it - a term he shares with Lao Tzu." },
            { term: "Paradox", icon: "🌀", definition: "A statement that seems to contradict itself but makes you think, like the butterfly dream." }
        ],
        inDepth: {
            history: "Zhuangzi lived during China's Warring States period, when philosophers competed for the ear of rulers. He is one of the few who consistently refused the job.",
            whyItMatters: "Being very certain feels good and is often where mistakes come from. Zhuangzi is a professional at loosening certainty without making you cynical.",
            funFact: "He is one of the very few ancient philosophers who is genuinely funny on purpose. The jokes are the argument, not decoration."
        },
        p4cInquiry: [
            {
                title: "How Do You Know You Are Awake?",
                shortTitle: "The Butterfly",
                dilemma: "Right now, how do you know you are awake and not dreaming? What would you check?",
                perspectives: {
                    a: { name: "Waking Life Hangs Together", argument: "Dreams jump about and forget their own rules. Real life keeps going in order - and everyone else confirms it. That difference is your evidence." },
                    b: { name: "You Cannot Check From Inside", argument: "Everything you would use to check is also part of the experience. In the dream you were completely convinced too. There is no test that works from in here." },
                    c: { name: "It May Not Matter", argument: "If you can never tell, perhaps the question to ask is not 'is this real?' but 'what should I do next?' - which has the same answer either way." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Have you ever had a dream so convincing that you were surprised to wake up?", context: "Talk about what finally told you it had been a dream - and whether that test would always work." },
            { prompt: "Can you ever really know what someone else is feeling?", context: "This is Zhuangzi's fish argument. Try it on each other." }
        ],
        caseStudies: [
            { title: "The 'Useless' Subject", text: "Someone says a school subject is useless. Useless for what, and according to whom? The crooked tree survived precisely by being useless to a carpenter." },
            { title: "Arguing About Someone Else's Feelings", text: "'You're not even upset.' 'How would you know?' That is the fish argument, happening at lunchtime." }
        ]
    },
    {
        id: "ibn_sina",
        name: "Ibn Sina (Avicenna)",
        era: "Persia / Central Asia (980 - 1037 CE)",
        avatar: "🪄",
        quote: "The knowledge of anything, since all things have causes, is not acquired unless it is known by its causes. (The Book of Healing)",
        superpower: "Proving You Exist While Floating In The Dark",
        conceptIntro: "Ibn Sina was a doctor, an astronomer and a philosopher who wrote a medical textbook used across Europe and Asia for six hundred years. He also invented a thought experiment that Descartes would arrive at, independently, six centuries later.",
        storyScenes: [
            {
                title: "Scene 1: The Boy Who Read Everything",
                heading: "Bukhara, in what is now Uzbekistan",
                imageEmoji: "📚",
                text: "Ibn Sina was a spectacular child scholar. By his teens he was reading medicine, and by about eighteen he was treating patients - including, the story goes, the local ruler, which got him access to one of the finest libraries in the world.",
                factBox: "He wrote a short autobiography, which is unusual for the period and is where most of these details come from."
            },
            {
                title: "Scene 2: The Book That Taught Europe Medicine",
                heading: "The Canon of Medicine, 1025",
                imageEmoji: "⚕️",
                text: "He gathered Greek, Persian, Indian and Arabic medical knowledge into one enormous organised book. Translated into Latin, it was still a standard university text in Europe five hundred years later - a Persian Muslim scholar teaching Christian Europe how to practise medicine.",
                factBox: "Roughly 240 of his works survive. He wrote much of it while working full time as a court physician and administrator."
            },
            {
                title: "Scene 3: The Floating Man",
                heading: "Imagine you cannot feel anything at all",
                imageEmoji: "🌬️",
                text: "Imagine you were created this instant, fully grown, floating in warm still air. Blindfolded. Limbs apart, touching nothing - not even yourself. No sight, no sound, no smell, no pressure anywhere. Ibn Sina asks: would you still know that you exist?",
                factBox: "He says yes - and concludes that your awareness of yourself does not depend on your body reporting in."
            },
            {
                title: "Scene 4: Six Hundred Years Before Descartes",
                heading: "The same move, a different road",
                imageEmoji: "💭",
                text: "Look at the Descartes card in this app. He doubted everything and found one thing left standing: something had to be doing the doubting. Ibn Sina had reached a very similar place in about 1020, from a different direction and a different tradition - and Latin translations of his work were circulating in Europe long before Descartes was born.",
                factBox: "Historians still debate whether Descartes read him. What is certain is that Ibn Sina was there first."
            }
        ],
        vocabCards: [
            { term: "Thought Experiment", icon: "🧪", definition: "A test you run in your imagination when you cannot run it for real." },
            { term: "Self-awareness", icon: "🪞", definition: "Knowing that you exist and that you are the one thinking these thoughts." },
            { term: "The Canon", icon: "📖", definition: "His medical encyclopaedia - 'canon' here means the standard, authoritative book on a subject." }
        ],
        inDepth: {
            history: "Ibn Sina worked during the Islamic Golden Age, when scholars in Baghdad, Bukhara and Cordoba preserved, translated and pushed forward Greek learning that had been lost in western Europe.",
            whyItMatters: "Ideas do not belong to one place. The chain runs Greek to Arabic to Latin and back again - and this app's own thinkers are links in it.",
            funFact: "He is said to have written parts of his great works from memory while travelling, or in hiding, without access to his library."
        },
        p4cInquiry: [
            {
                title: "Are You Just Your Body?",
                shortTitle: "The Floating Man",
                dilemma: "In the floating man experiment you feel nothing at all - no body, no senses. Ibn Sina thinks you would still know you exist. Would you?",
                perspectives: {
                    a: { name: "Yes - Thinking Is Enough", argument: "Something is doing the wondering. Even with nothing to see or touch, that wondering is still happening, and it is happening to you." },
                    b: { name: "No - You Need A Body", argument: "You have never once existed without a body. Imagining it does not prove it is possible, any more than imagining a dragon proves dragons." },
                    c: { name: "The Experiment Is Rigged", argument: "He asks you to imagine yourself with no senses - but you can only imagine it using a brain built by having senses. The test may not be a fair one." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "If you could not see, hear or feel anything, what would be left of you?", context: "Try it for thirty seconds with eyes closed and ears covered, then talk about what remained." },
            { prompt: "Why do you think the same idea can occur to people in different centuries and different countries?", context: "Discuss whether ideas are invented or discovered." }
        ],
        caseStudies: [
            { title: "Float Test", text: "Lie still with your eyes shut and try to notice as little as possible. Are you still sure you exist? That is the experiment." },
            { title: "Who Taught Whom", text: "Europe learned medicine from a Persian textbook. Trace one thing you use daily back through the places it came from." }
        ]
    },
    {
        id: "zera_yacob",
        name: "Zera Yacob",
        era: "Ethiopia (1599 - 1692)",
        avatar: "🗻",
        quote: "He who investigates with the pure intelligence set in the heart of each of us... will discover the truth. (Hatata, 1667)",
        superpower: "Reasoning From Scratch, Alone, In A Cave",
        conceptIntro: "Zera Yacob had to flee for his life because of what he believed. He spent two years hiding in a cave, and used the time to think his way from first principles to conclusions about tolerance and equality that were centuries ahead of nearly everyone.",
        storyScenes: [
            {
                title: "Scene 1: The Wrong Answer To A Dangerous Question",
                heading: "Ethiopia, 1630",
                imageEmoji: "🔥",
                text: "Zera Yacob was a teacher during a period when the Ethiopian king had converted to Catholicism and was forcing others to follow. Zera Yacob would not say that any one religion was obviously the correct one. He was accused to the king and had to run.",
                factBox: "He tells this himself in the Hatata, the book he wrote in 1667."
            },
            {
                title: "Scene 2: Two Years In A Cave",
                heading: "Nothing to read, and time to think",
                imageEmoji: "🪏",
                text: "He hid in a cave by a river at the foot of a cliff, and stayed for about two years. With no library and no teacher, he did the only thing available: he reasoned, from the beginning, about what he could actually justify believing.",
                factBox: "Descartes shut himself in a warm room for a day and started from doubt. Zera Yacob had two years and no choice."
            },
            {
                title: "Scene 3: The Test He Invented",
                heading: "Ask whether every group can be right",
                imageEmoji: "⚖️",
                text: "He noticed that every religion he knew of taught that it alone was true, and that people mostly believed whichever one they had been born into. Since they contradicted each other, they could not all be right - so being told something by your own community is no proof at all. What was left, he argued, was the reasoning ability every person has.",
                factBox: "He applies the same test to himself, not only to others - which is the part most people skip."
            },
            {
                title: "Scene 4: The Conclusions Nobody Was Ready For",
                heading: "1667, well ahead of schedule",
                imageEmoji: "🕊️",
                text: "Using that method he argued that all human beings are equal, that men and women are equal, that slavery is wrong, and that no one should be forced into a belief. He was writing this in 1667, while the transatlantic slave trade was expanding and most European philosophers had not got there.",
                factBox: "Some scholars have questioned the Hatata's authorship; most Ethiopian and a growing number of international scholars accept it as genuine."
            }
        ],
        vocabCards: [
            { term: "Hatata", icon: "📜", definition: "His book. The word means 'inquiry' or 'investigation' in Ge'ez, the classical Ethiopian language." },
            { term: "Reason", icon: "🧠", definition: "Working something out by thinking carefully, rather than accepting it because you were told." },
            { term: "Tolerance", icon: "🤝", definition: "Letting other people hold beliefs you disagree with, without forcing them to change." }
        ],
        inDepth: {
            history: "Zera Yacob wrote the Hatata in Ge'ez in 1667, at the request of a student. It was largely unknown outside Ethiopia until the 20th century.",
            whyItMatters: "It is often said that certain ideas 'came from Europe at a certain date'. Zera Yacob is a direct counter-example, and worth knowing for exactly that reason.",
            funFact: "He and Descartes were almost exact contemporaries, using strikingly similar methods, and neither ever knew the other existed."
        },
        p4cInquiry: [
            {
                title: "Can You Work It Out By Yourself?",
                shortTitle: "Thinking Alone",
                dilemma: "Zera Yacob decided that being told something by your own community is not proof it is true. Is he right?",
                perspectives: {
                    a: { name: "Work It Out Yourself", argument: "Everyone thinks their own group is the right one, and they cannot all be. The only thing left that is really yours is your own reasoning." },
                    b: { name: "You Cannot Start From Nothing", argument: "He used a language, ideas and arguments he learned from other people. Nobody reasons from scratch - even alone in a cave, you bring your teachers with you." },
                    c: { name: "Trust, But Check", argument: "Start with what you were taught, because you have to start somewhere - then test the parts that matter instead of accepting all of it." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "What is something you believe mainly because the people around you believe it?", context: "Pick one and talk about how you would test it, without deciding in advance what the answer is." },
            { prompt: "Is it braver to say 'I am not sure' or to pick a side?", context: "Zera Yacob's refusal to pick a side is what got him exiled." }
        ],
        caseStudies: [
            { title: "Where Did Your Beliefs Come From?", text: "Most people share the beliefs of the place they grew up. Zera Yacob asks: is that a reason to think they are true?" },
            { title: "Two Cave Thinkers", text: "Compare with Plato's Cave in this app. Plato's prisoner has to leave the cave to find truth. Zera Yacob finds it inside one." }
        ]
    },
    {
        id: "wollstonecraft",
        name: "Mary Wollstonecraft",
        era: "England (1759 - 1797)",
        avatar: "🪶",
        quote: "I do not wish them to have power over men; but over themselves. (A Vindication of the Rights of Woman, 1792)",
        superpower: "Spotting A Bad Argument Dressed As Common Sense",
        conceptIntro: "Everyone in her time agreed that women were sillier than men. Wollstonecraft agreed that many women behaved that way - and then pointed out that this is exactly what you would expect if you gave someone no education and no responsibility.",
        storyScenes: [
            {
                title: "Scene 1: Guarding The Bedroom Door",
                heading: "London, a difficult house",
                imageEmoji: "🚪",
                text: "Her father drank and was violent towards her mother. As a girl, Mary sometimes slept on the landing outside her mother's bedroom to get in the way if he came up. She had almost no formal schooling; her brother was sent to be educated.",
                factBox: "That gap - a brother taught, a sister not - is the exact thing her most famous book is about."
            },
            {
                title: "Scene 2: Earning Her Own Living",
                heading: "One of the very few options",
                imageEmoji: "✍️",
                text: "She worked as a lady's companion, ran a school, and was a governess - and then did something almost unheard of for a woman without money: she became a full-time professional writer, reviewing books and learning French and German to translate them.",
                factBox: "She told her sister she intended to be 'the first of a new genus' - a new kind of person."
            },
            {
                title: "Scene 3: The Argument Nobody Had Made",
                heading: "1792",
                imageEmoji: "📕",
                text: "Her opponents said women were naturally frivolous. She turned it round: teach someone nothing but how to be charming, give them no serious work, reward them only for looking nice - and frivolous is precisely what you have trained them to be. The behaviour is evidence about the education, not about the nature.",
                factBox: "A Vindication of the Rights of Woman was written in about six weeks."
            },
            {
                title: "Scene 4: What She Actually Asked For",
                heading: "Not power over anyone",
                imageEmoji: "⚖️",
                text: "She did not ask for women to rule men. She asked for education, so a woman could think for herself, earn her own living, and be a real friend to her husband instead of a decoration. She died at 38, days after giving birth to her daughter Mary - who grew up to write Frankenstein.",
                factBox: "Her husband published her private letters after her death, which damaged her reputation for a century."
            }
        ],
        vocabCards: [
            { term: "Reason", icon: "🧠", definition: "The ability to work things out for yourself - which she argued women have exactly as much of as men." },
            { term: "Vindication", icon: "📢", definition: "Defending something against an accusation, by showing the accusation is wrong." },
            { term: "Prejudice", icon: "👁️", definition: "Judging someone before you have any evidence, usually because of the group they belong to." }
        ],
        inDepth: {
            history: "She wrote during the French Revolution, when Europe was arguing about the rights of man. She asked the obvious follow-up question that almost nobody else was asking.",
            whyItMatters: "Her move - 'you caused the thing you are complaining about' - is one of the most useful arguments there is, and it works far beyond her subject.",
            funFact: "Her daughter, Mary Shelley, wrote Frankenstein at 18. Mary Wollstonecraft never met her; she died eleven days after the birth."
        },
        p4cInquiry: [
            {
                title: "Nature Or Treatment?",
                shortTitle: "Why People Turn Out",
                dilemma: "If a group of people is treated as though they cannot do something, and then they do not do it - what has that actually proved?",
                perspectives: {
                    a: { name: "It Proves Nothing", argument: "You never ran the real test. Until they get the same teaching and the same chances, the result tells you about the treatment, not the people." },
                    b: { name: "People Do Differ", argument: "People genuinely are different from one another. Insisting every difference must come from unfairness can be its own way of not looking properly." },
                    c: { name: "Change It And See", argument: "Stop arguing and run the experiment: give the same chances, wait, and look at what happens. That is the only thing that would settle it." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Has anyone ever assumed you would be bad at something before you tried?", context: "Talk about what that did to how hard you tried." },
            { prompt: "Is it fair to judge how good someone is at something if they were never taught it?", context: "Discuss what a fair test would actually need." }
        ],
        caseStudies: [
            { title: "The Self-Fulfilling Rule", text: "Tell someone they are bad at maths, give them less help, then point at their marks as proof. Where did the evidence really come from?" },
            { title: "Kant, Next Door", text: "Kant said every rational being deserves respect. Wollstonecraft, writing eight years later, asked him a hard question: so who exactly counts as rational, and who decides?" }
        ],
        videoId: "6bNUmd-I680",
        videoQuiz: [
            { question: "What did Wollstonecraft argue was the real cause of women appearing less capable in her time?", options: [{ text: "They were denied education and serious responsibility", correct: true }, { text: "They were naturally less able", correct: false }] }
        ]
    },
    {
        id: "du_bois",
        name: "W. E. B. Du Bois",
        era: "United States (1868 - 1963)",
        avatar: "📐",
        quote: "It is a peculiar sensation, this double-consciousness, this sense of always looking at one's self through the eyes of others. (The Souls of Black Folk, 1903)",
        superpower: "Describing Something Everyone Felt And Nobody Had Named",
        conceptIntro: "Du Bois gave a name to an experience millions of people were having and had no word for: the feeling of seeing yourself through the eyes of people who look down on you, and never being able to fully switch it off.",
        storyScenes: [
            {
                title: "Scene 1: The Visiting Card",
                heading: "A schoolroom in Massachusetts",
                imageEmoji: "📇",
                text: "As a boy, his class swapped visiting cards. One girl refused his, with a glance, because he was Black. He wrote later that in that moment he realised he was shut out of their world by a vast veil - and that he was about ten years old.",
                factBox: "He tells this story at the opening of The Souls of Black Folk, published in 1903."
            },
            {
                title: "Scene 2: Counting Instead Of Arguing",
                heading: "Philadelphia, 1896",
                imageEmoji: "📊",
                text: "People made confident claims about Black city life. Du Bois went and knocked on around 5,000 households, asking about work, rent, health and schooling, and published the numbers. It is one of the first pieces of proper empirical sociology done anywhere.",
                factBox: "He was the first African American to earn a doctorate from Harvard, in 1895."
            },
            {
                title: "Scene 3: Two Sets Of Eyes",
                heading: "The idea he is best known for",
                imageEmoji: "🪞",
                text: "He called it double consciousness: always seeing yourself twice over - once as you are, and once through the eyes of a society that has already decided what you are. He described it as two thoughts, two warring ideals in one body.",
                factBox: "The Souls of Black Folk, chapter 1. The phrase entered ordinary language and is still used."
            },
            {
                title: "Scene 4: A Very Long Argument",
                heading: "Ninety-five years of it",
                imageEmoji: "✊",
                text: "He helped found the NAACP, edited its magazine for 24 years, and kept publishing into his nineties. He died in Ghana on 27 August 1963 - the day before the March on Washington, where the crowd was told of his death.",
                factBox: "He was 95. His work spans from just after slavery ended to the modern civil rights movement."
            }
        ],
        vocabCards: [
            { term: "Double Consciousness", icon: "🪞", definition: "Seeing yourself both as you are and as a prejudiced society sees you, at the same time." },
            { term: "Sociology", icon: "📊", definition: "Studying how societies actually work by gathering evidence, rather than guessing." },
            { term: "The Veil", icon: "🎭", definition: "His image for the barrier that separates people by race - you can see through it, but not step past it." }
        ],
        inDepth: {
            history: "Du Bois was born three years after slavery was abolished in the United States and died the day before the March on Washington.",
            whyItMatters: "Naming an experience precisely is a real philosophical achievement. Before 1903 people lived this; afterwards they could point at it and discuss it.",
            funFact: "For the 1900 Paris Exposition he designed striking hand-drawn data charts about Black American life - work that looks strikingly modern today."
        },
        p4cInquiry: [
            {
                title: "Whose Eyes Do You See Yourself Through?",
                shortTitle: "Two Sets Of Eyes",
                dilemma: "How much should it matter what other people think of you?",
                perspectives: {
                    a: { name: "It Should Not Matter", argument: "You know yourself better than anyone watching does. Living by other people's opinions means never being anyone in particular." },
                    b: { name: "You Cannot Switch It Off", argument: "Du Bois' point is that this is not a choice you get to make. If a whole society treats you a certain way, you see it whether you want to or not." },
                    c: { name: "Some Eyes, Not All", argument: "Caring what a good friend thinks helps you. Caring what a stranger who has already judged you thinks only costs you. The skill is telling them apart." }
                }
            }
        ],
        discussionPrompts: [
            { prompt: "Do you behave differently depending on who is watching? Is that dishonest, or just normal?", context: "Talk about the difference between adapting and pretending." },
            { prompt: "Is it possible to stop caring what people think? Should you want to?", context: "Discuss whether some caring is actually necessary for living with others." }
        ],
        caseStudies: [
            { title: "Two Audiences At Once", text: "Ever been aware of how you sound to one group while talking to another? That doubling is what he is describing, in a much sharper form." },
            { title: "Socrates, Applied Outward", text: "Socrates examined himself. Du Bois used the same examining attention on a whole society - and on what that society was doing to how people saw themselves." }
        ],
        videoId: "BNoRIvJJKBY",
        videoQuiz: [
            { question: "What did Du Bois mean by 'double consciousness'?", options: [{ text: "Always seeing yourself partly through the eyes of a society that judges you", correct: true }, { text: "Being able to concentrate on two things at once", correct: false }] }
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
            <div class="viz-controls" role="tablist" aria-label="Deep-dive steps" style="margin-bottom: 24px;">
                <button role="tab" aria-selected="true" aria-controls="topicTabContent1" class="viz-step-btn active" id="topicTabBtn1" onclick="switchTopicTab(1)">1. Story & Flashcards</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent2" class="viz-step-btn" id="topicTabBtn2" onclick="switchTopicTab(2)">2. Video & Case Studies</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent3" class="viz-step-btn" id="topicTabBtn3" onclick="switchTopicTab(3)">3. Open P4C Inquiry</button>
                <button role="tab" aria-selected="false" aria-controls="topicTabContent4" class="viz-step-btn" id="topicTabBtn4" onclick="switchTopicTab(4)">4. Questions &amp; Discussion</button>
            </div>

            <!-- Tab 1: Storybook & Flashcards -->
            <div id="topicTabContent1" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn1" tabindex="0">
                ${renderStorybookReader(t.id, t.storyScenes)}
                ${renderVocabularyFlashcards(t.id, t.vocabCards)}
                <div style="margin-top: 24px;">
                    <button class="fb-action-btn gold" onclick="switchTopicTab(2)">Continue to Step 2: In-Depth Video & Case Studies ➔</button>
                </div>
            </div>

            <!-- Tab 2: Video & Case Studies -->
            <div id="topicTabContent2" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn2" tabindex="0" style="display:none;">
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

                ${t.contentNote ? `
                <div role="note" style="background: rgba(245,158,11,0.12); border: 1.5px solid var(--gold-star); border-radius: 14px; padding: 16px; margin-bottom: 16px;">
                    <div style="color: var(--gold-star); font-weight: 800; font-size: 0.95rem; margin-bottom: 6px;">⚠️ A heads-up about this video</div>
                    <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">${t.contentNote}</p>
                </div>` : ''}

                ${t.videoId ? `
                <!-- Responsive Embedded YouTube Player -->
                <div style="background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 16px; position: relative; padding-top: 56.25%; border: 2px solid var(--purple-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <iframe src="https://www.youtube-nocookie.com/embed/${t.videoId}?rel=0" title="${t.name} Educational Lesson" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" allowfullscreen></iframe>
                </div>

                ${renderVideoQuizComponent(t.id, t.videoQuiz)}
                ` : `
                <!-- No video: better an honest gap than an unvetted one. -->
                <div role="note" style="background: rgba(6,182,212,0.08); border: 1.5px solid var(--cyan-magic); border-radius: 14px; padding: 18px; margin-bottom: 16px;">
                    <div style="color: var(--cyan-magic); font-weight: 800; font-size: 0.95rem; margin-bottom: 6px;">📹 No video for this thinker yet</div>
                    <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6; margin: 0;">
                        We could not find a video about ${escapeHtml(t.name)} made for your age group by a source we trust.
                        Rather than show you one we have not checked properly, we have left this empty.
                        The story, the ideas and the big question are all still here.
                    </p>
                </div>
                `}

                <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-top: 20px;">
                    ${t.videoId ? `<a href="https://www.youtube.com/watch?v=${t.videoId}" target="_blank" rel="noopener noreferrer" class="fb-action-btn outline" style="text-decoration:none;">▶ Watch Full Lesson on YouTube (New Tab)</a>` : '<span></span>'}
                    <button class="fb-action-btn gold" onclick="switchTopicTab(3)">Continue to Step 3: Try Open P4C Inquiry ➔</button>
                </div>
            </div>

            <!-- Tab 3: Open P4C Dialectic Inquiry -->
            <div id="topicTabContent3" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn3" tabindex="0" style="display:none;">
                ${typeof renderP4CInquiryEngine === 'function' ? renderP4CInquiryEngine(t.id, t.p4cInquiry) : ''}
            </div>

            <!-- Tab 4: Socratic Discussion Journal & Questions -->
            <div id="topicTabContent4" class="flow-content-block" role="tabpanel" aria-labelledby="topicTabBtn4" tabindex="0" style="display:none;">
                ${typeof renderSocraticDiscussionJournal === 'function' ? renderSocraticDiscussionJournal(t.id, t.name, t.avatar, t.discussionPrompts) : ''}

                <h3 style="color: var(--pink-energy); font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">Ask a Question or Suggest an Upgrade</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Have a question about ${t.name} or an idea to upgrade this app? Submit it below!</p>

                <div style="background: rgba(0,0,0,0.4); border: 1.5px solid var(--pink-energy); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                        <select id="feedbackType_${t.id}" class="sandbox-input" aria-label="Type of message" style="max-width: 180px;">
                            <option value="question">❓ Ask a Question</option>
                            <option value="suggestion">💡 Upgrade Idea</option>
                        </select>
                        <input type="text" id="feedbackInput_${t.id}" class="sandbox-input" aria-label="Your question or idea" placeholder="Type your question or suggestion here..." style="flex:1;">
                    </div>
                    <button class="fb-action-btn gold" style="width: 100%;" onclick="submitTopicFeedback('${t.id}', '${escapeJsString(t.name)}', '${t.avatar}')">Save to My Questions</button>
                    
                    <div id="feedbackResult_${t.id}" role="status" aria-live="polite" style="display:none; margin-top: 14px; padding: 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--green-hero); color: #FFF;"></div>
                </div>

                <h4 style="color: var(--gold-star); font-size: 1rem; margin-bottom: 10px;">Saved Entries for ${t.name}:</h4>
                <div id="savedFeedbackList_${t.id}">
                    <!-- Dynamically populated by feedback_vault.js -->
                </div>
            </div>
        </div>
    `;
}

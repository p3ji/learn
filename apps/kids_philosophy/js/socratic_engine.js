/**
 * Socratic Dialogue & Branching Philosophy Engine
 * Interactive conversations with historical thinkers & AI Ethics
 */

(function(exports) {

  const SOCRATIC_DIALOGUES = [
    {
      id: "socrates_knowledge",
      thinker: "Socrates",
      avatar: "🦉",
      title: "What is True Knowledge?",
      intro: "Greetings, young thinker. People say they 'know' many things. But do they truly know, or merely hold opinions? Let us examine your mind together.",
      startNode: "q1",
      nodes: {
        "q1": {
          speaker: "Socrates",
          text: "Suppose someone claims: 'I know it will rain tomorrow because the sky looks grey.' Is this true knowledge, or an educated guess?",
          options: [
            { text: "It's an educated guess based on past patterns.", next: "q2_guess" },
            { text: "It's 100% true knowledge because grey clouds mean rain.", next: "q2_certain" },
            { text: "We cannot know anything about the future with absolute certainty.", next: "q2_skeptic" }
          ]
        },
        "q2_guess": {
          speaker: "Socrates",
          text: "A wise observation! Past patterns give us high probability, but not certainty. If a belief turns out to be right by luck, does that count as wisdom?",
          options: [
            { text: "No, true wisdom requires understanding the underlying reasons and proof.", next: "ending_wise" },
            { text: "Yes, as long as the result is correct, the method doesn't matter.", next: "ending_pragmatic" }
          ]
        },
        "q2_certain": {
          speaker: "Socrates",
          text: "Ah! But what if a strong wind blows the grey clouds away and the sun shines tomorrow? Were you mistaken when you claimed to 'know'?",
          options: [
            { text: "Yes, I confused a high likelihood with absolute certainty.", next: "ending_wise" },
            { text: "No, I was right at the moment I said it.", next: "ending_pragmatic" }
          ]
        },
        "q2_skeptic": {
          speaker: "Socrates",
          text: "You sound like my friend Pyrrho! If we can know nothing for certain, how can we make wise decisions in our daily lives?",
          options: [
            { text: "By using reason, evidence, and remaining open to changing our minds.", next: "ending_wise" },
            { text: "By following our feelings and instincts.", next: "ending_pragmatic" }
          ]
        },
        "ending_wise": {
          speaker: "Socrates",
          text: "Ah! 'I know that I know nothing.' Realizing the limits of our knowledge is the true beginning of wisdom! You have reasoned like a true philosopher today.",
          isEnding: true,
          reflectionPrompt: "What is one thing you thought you knew for sure, but realized might be more complicated?"
        },
        "ending_pragmatic": {
          speaker: "Socrates",
          text: "Practical outcomes matter, but a philosopher always seeks the deeper truth beneath the surface. Never stop questioning why things happen!",
          isEnding: true,
          reflectionPrompt: "Why is it important to ask 'Why?' even when something already seems to work?"
        }
      }
    },
    {
      id: "turing_ai",
      thinker: "Alan Turing",
      avatar: "🤖",
      title: "Can Machines Think & AI Ethics",
      intro: "Welcome to my laboratory! In 1950, I proposed the 'Imitation Game' to test if a computer could talk so naturally that you couldn't tell if it was human or machine.",
      startNode: "q1",
      nodes: {
        "q1": {
          speaker: "Alan Turing",
          text: "If an AI computer answers every math problem, writes poetry, and converses just like a person, is the AI truly 'thinking', or just following code instructions?",
          options: [
            { text: "It's just following clever instructions and pattern matching data.", next: "q2_code" },
            { text: "If its output is indistinguishable from human thought, it IS thinking.", next: "q2_behavior" },
            { text: "Thinking requires feelings and self-awareness, which AI lacks.", next: "q2_consciousness" }
          ]
        },
        "q2_code": {
          speaker: "Alan Turing",
          text: "Fascinating! But consider this: don't human brains also follow biological patterns and neural signals based on past memory data?",
          options: [
            { text: "Humans have consciousness and moral choices that code cannot replicate.", next: "ending_human" },
            { text: "Maybe human minds and complex AI brains are more similar than we think!", next: "ending_future" }
          ]
        },
        "q2_behavior": {
          speaker: "Alan Turing",
          text: "That is the core of the Turing Test! If we judge intelligence by observable behavior, then convincing conversation demonstrates intelligence.",
          options: [
            { text: "We must ensure intelligent machines are programmed with ethics and safety.", next: "ending_future" },
            { text: "Behavior is a trick; real intelligence needs an inner emotional mind.", next: "ending_human" }
          ]
        },
        "q2_consciousness": {
          speaker: "Alan Turing",
          text: "Ah, the 'Argument from Consciousness'! How can we ever prove that another person (or machine) has inner feelings rather than just expressing them?",
          options: [
            { text: "Through empathy and shared human experience.", next: "ending_human" },
            { text: "We can't prove it 100%, which is why AI ethics is so critical today.", next: "ending_future" }
          ]
        },
        "ending_human": {
          speaker: "Alan Turing",
          text: "Splendid reasoning! You emphasize the unique emotional and moral spark of human consciousness. As AI advances, preserving human empathy is vital.",
          isEnding: true,
          reflectionPrompt: "What is one human capability that you think an AI computer can never replace?"
        },
        "ending_future": {
          speaker: "Alan Turing",
          text: "You are thinking like a 21st-century computer scientist! As AI grows more powerful, shaping technology to help humanity wisely is our greatest quest.",
          isEnding: true,
          reflectionPrompt: "How can kids and scientists make sure AI is used fairly and safely for everyone?"
        }
      }
    }
  ];

  class SocraticEngine {
    constructor() {
      this.currentDialogue = null;
      this.currentNodeId = null;
      this.history = [];
    }

    startDialogue(dialogueId) {
      const d = SOCRATIC_DIALOGUES.find(item => item.id === dialogueId);
      if (!d) return null;

      this.currentDialogue = d;
      this.currentNodeId = d.startNode;
      this.history = [];
      return this.getCurrentNode();
    }

    getCurrentNode() {
      if (!this.currentDialogue || !this.currentNodeId) return null;
      return {
        dialogue: this.currentDialogue,
        node: this.currentDialogue.nodes[this.currentNodeId]
      };
    }

    selectOption(optionIndex) {
      const curr = this.getCurrentNode();
      if (!curr || !curr.node.options || !curr.node.options[optionIndex]) return null;

      const selected = curr.node.options[optionIndex];
      this.history.push({
        speaker: curr.node.speaker,
        question: curr.node.text,
        userAnswer: selected.text
      });

      this.currentNodeId = selected.next;
      return this.getCurrentNode();
    }

    saveReflection(reflectionText) {
      if (!this.currentDialogue) return;

      if (exports.SuitePassport) {
        exports.SuitePassport.saveJournalEntry({
          appId: "kids_philosophy",
          appName: "Philosopher's Quest",
          title: `Socratic Dialogue with ${this.currentDialogue.thinker}: ${this.currentDialogue.title}`,
          category: "Philosophy Reflection",
          content: `Dialogue with ${this.currentDialogue.thinker}:\n\nReflection:\n${reflectionText}`,
          tags: ["socrates", "philosophy", "dialogue"]
        });
        exports.SuitePassport.addXP(25, "kids_philosophy");
      }
    }
  }

  exports.SOCRATIC_DIALOGUES = SOCRATIC_DIALOGUES;
  exports.SocraticEngine = new SocraticEngine();

})(typeof window !== 'undefined' ? window : global);

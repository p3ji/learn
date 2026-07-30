/**
 * Sentence Diagramming & Advanced Punctuation Parser for Grammar Gym
 */

(function(exports) {

  const DIAGRAM_EXERCISES = [
    {
      id: "ex1",
      sentence: "The courageous explorer discovered an ancient map in the secret cave.",
      components: {
        subject: "The courageous explorer",
        verb: "discovered",
        directObject: "an ancient map",
        prepositionalPhrase: "in the secret cave"
      },
      punctuationRule: "Use adjectives like 'courageous' and 'ancient' directly before the nouns they modify."
    },
    {
      id: "ex2",
      sentence: "Maya loves reading sci-fi stories; her brother prefers mystery novels.",
      components: {
        subject: "Maya / her brother",
        verb: "loves / prefers",
        directObject: "sci-fi stories / mystery novels",
        clauseType: "Compound sentence connected by a Semicolon (;)"
      },
      punctuationRule: "A Semicolon (;) connects two closely related independent clauses without needing a conjunction like 'and' or 'but'."
    },
    {
      id: "ex3",
      sentence: "\"We must decode this secret cipher immediately!\" whispered Professor Aris.",
      components: {
        subject: "Professor Aris",
        verb: "whispered",
        directObject: "\"We must decode this secret cipher immediately!\"",
        clauseType: "Dialogue with quotation marks and speaker tag"
      },
      punctuationRule: "Place punctuation (exclamation mark, comma, question mark) INSIDE quotation marks before the closing quote."
    }
  ];

  class SentenceDiagrammerEngine {
    constructor() {
      this.exercises = DIAGRAM_EXERCISES;
    }

    getExercise(id) {
      return this.exercises.find(e => e.id === id) || this.exercises[0];
    }

    verifyDiagram(exerciseId, userSub, userVerb, userObj) {
      const ex = this.getExercise(exerciseId);
      const clean = (s) => (s || '').toLowerCase().trim();

      const subOk = clean(ex.components.subject).includes(clean(userSub));
      const verbOk = clean(ex.components.verb).includes(clean(userVerb));
      const objOk = clean(ex.components.directObject).includes(clean(userObj));

      const isCorrect = subOk && verbOk && objOk;

      if (isCorrect && exports.SuitePassport) {
        exports.SuitePassport.addXP(15, 'kids_grammar');
        exports.SuitePassport.saveJournalEntry({
          appId: "kids_grammar",
          appName: "Grammar Gym",
          title: `Sentence Diagrammed: ${ex.sentence.substring(0, 30)}...`,
          category: "Sentence Diagramming",
          content: `Sentence: ${ex.sentence}\nSubject: ${userSub}\nVerb: ${userVerb}\nObject: ${userObj}\n\nRule: ${ex.punctuationRule}`,
          tags: ["grammar", "diagram", "punctuation"]
        });
      }

      return {
        isCorrect: isCorrect,
        correctComponents: ex.components,
        rule: ex.punctuationRule
      };
    }
  }

  exports.SentenceDiagrammerEngine = SentenceDiagrammerEngine;

})(typeof window !== 'undefined' ? window : global);

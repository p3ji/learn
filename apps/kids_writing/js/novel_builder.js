/**
 * Multi-Chapter Novel Builder & Sensory Detail Pacing Analyzer for Story Forge
 */

(function(exports) {

  const SENSORY_DICTIONARY = {
    sight: ["glowing", "sparkling", "shadowy", "crimson", "bright", "dim", "glimmering", "dark", "golden", "vivid", "saw"],
    sound: ["whispered", "echoed", "roared", "clattered", "buzzing", "silent", "hissed", "rumbled", "shrieked", "cried"],
    touch: ["rough", "freezing", "cold", "smooth", "silky", "warm", "sharp", "slimy", "burning", "heavy", "soft"],
    emotion: ["courageous", "courageously", "terrified", "joyful", "anxious", "furious", "determined", "lonely", "hopeful"]
  };

  class NovelBuilderEngine {
    constructor() {
      this.chapters = [];
    }

    createChapter(chapterNumber, title, text) {
      const sensoryScores = this.analyzeSensoryDetails(text);
      const dialogueRatio = this.analyzeDialogueRatio(text);

      const chapter = {
        id: 'chap_' + Date.now(),
        number: chapterNumber,
        title: title || `Chapter ${chapterNumber}`,
        text: text || '',
        wordCount: (text || '').trim().split(/\s+/).filter(Boolean).length,
        sensoryScores: sensoryScores,
        dialogueRatio: dialogueRatio
      };

      this.chapters.push(chapter);

      if (exports.SuitePassport) {
        exports.SuitePassport.addXP(25, 'kids_writing');
        exports.SuitePassport.saveJournalEntry({
          appId: "kids_writing",
          appName: "Story Forge",
          title: `Novel Draft: ${chapter.title}`,
          category: "Story Chapter",
          content: `Chapter ${chapterNumber}: ${chapter.title}\nWord Count: ${chapter.wordCount}\n\n${text}`,
          tags: ["story", "novel", "chapter"]
        });
      }

      return chapter;
    }

    analyzeSensoryDetails(text) {
      if (!text) return { sight: 0, sound: 0, touch: 0, emotion: 0, totalSensoryWords: 0 };

      const words = text.toLowerCase().split(/\W+/);
      const scores = { sight: 0, sound: 0, touch: 0, emotion: 0, totalSensoryWords: 0 };

      words.forEach(w => {
        Object.keys(SENSORY_DICTIONARY).forEach(sense => {
          if (SENSORY_DICTIONARY[sense].includes(w)) {
            scores[sense]++;
            scores.totalSensoryWords++;
          }
        });
      });

      return scores;
    }

    analyzeDialogueRatio(text) {
      if (!text) return { dialoguePct: 0, narrativePct: 100 };

      const quotes = text.match(/"([^"]*)"/g) || [];
      const dialogueCharCount = quotes.reduce((acc, q) => acc + q.length, 0);
      const totalCharCount = text.length || 1;

      const dPct = Math.round((dialogueCharCount / totalCharCount) * 100);
      return {
        dialoguePct: dPct,
        narrativePct: 100 - dPct
      };
    }
  }

  exports.NovelBuilderEngine = NovelBuilderEngine;

})(typeof window !== 'undefined' ? window : global);

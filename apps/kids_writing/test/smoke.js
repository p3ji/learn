/**
 * Smoke Test Harness for Story Forge Novel Builder & Pacing Analyzer
 * Run with: node apps/kids_writing/test/smoke.js
 */

const path = require('path');

console.log('🧪 Starting Story Forge Novel Builder Smoke Tests...');

global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {} };

require(path.join(__dirname, '../../../js/suite_passport.js'));
require(path.join(__dirname, '../js/novel_builder.js'));

const { NovelBuilderEngine } = global;
const builder = new NovelBuilderEngine();

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Test Sensory Analysis
console.log('\n--- 1. Testing Sensory Detail Analyzer ---');
const sampleText = 'Maya saw a glowing crimson crystal while the cold wind whispered in the shadowy forest. "We found it!" she cried courageously.';
const sensory = builder.analyzeSensoryDetails(sampleText);
assert(sensory.sight >= 2, 'Detects sight sensory words (glowing, crimson, shadowy)');
assert(sensory.sound >= 1, 'Detects sound sensory words (whispered)');
assert(sensory.touch >= 1, 'Detects touch sensory words (cold)');
assert(sensory.emotion >= 1, 'Detects emotional words (courageously)');

// 2. Test Dialogue Ratio Analyzer
console.log('\n--- 2. Testing Dialogue Ratio Analyzer ---');
const ratio = builder.analyzeDialogueRatio(sampleText);
assert(ratio.dialoguePct > 0 && ratio.narrativePct > 0, 'Calculates dialogue vs narrative ratio percentages');

// 3. Test Chapter Creation
console.log('\n--- 3. Testing Chapter Creation & Journal Sync ---');
const chap = builder.createChapter(1, 'The Forest of Whispers', sampleText);
assert(chap && chap.number === 1 && chap.wordCount > 10, 'Creates chapter object');

const journalEntries = global.SuitePassport.getJournalEntries('kids_writing');
assert(journalEntries.length === 1 && journalEntries[0].title.includes('Forest of Whispers'), 'Saved chapter draft to SuitePassport journal');

console.log(`\n========================================`);
console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);

/**
 * Smoke Test Harness for Grammar Gym Sentence Diagrammer
 * Run with: node apps/kids_grammar/test/smoke.js
 */

const path = require('path');

console.log('🧪 Starting Grammar Gym Sentence Diagrammer Smoke Tests...');

global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {} };

require(path.join(__dirname, '../../../js/suite_passport.js'));
require(path.join(__dirname, '../js/sentence_diagrammer.js'));

const { SentenceDiagrammerEngine } = global;
const diag = new SentenceDiagrammerEngine();

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

// 1. Test Exercise Retrieval
console.log('\n--- 1. Testing Diagram Exercises ---');
const ex = diag.getExercise('ex1');
assert(ex && ex.sentence.includes('courageous explorer'), 'Exercise ex1 retrieved');

// 2. Test Diagram Verification
console.log('\n--- 2. Testing Diagram Verification ---');
const res = diag.verifyDiagram('ex1', 'explorer', 'discovered', 'map');
assert(res.isCorrect === true, 'Diagram parsing verifies correct subject/verb/object');

console.log(`\n========================================`);
console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);

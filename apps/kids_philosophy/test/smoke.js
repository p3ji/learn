/**
 * Smoke Test Harness for Philosopher's Quest Socratic Dialogue Engine
 * Run with: node apps/kids_philosophy/test/smoke.js
 */

const path = require('path');

console.log('🧪 Starting Philosopher\'s Quest Socratic Dialogue Smoke Tests...');

global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {} };

require(path.join(__dirname, '../../../js/suite_passport.js'));
require(path.join(__dirname, '../js/socratic_engine.js'));

const { SOCRATIC_DIALOGUES, SocraticEngine } = global;

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

// 1. Test Dialogues Schema
console.log('\n--- 1. Testing Socratic Dialogues Schema ---');
assert(SOCRATIC_DIALOGUES && SOCRATIC_DIALOGUES.length >= 2, 'Socratic dialogues exist (Socrates & Turing)');
SOCRATIC_DIALOGUES.forEach(d => {
  assert(d.id && d.thinker && d.title && d.nodes, `Dialogue ${d.id} has thinker & nodes`);
});

// 2. Test Socratic Engine Branching Execution
console.log('\n--- 2. Testing Branching Dialogue Navigation ---');
const node1 = SocraticEngine.startDialogue('socrates_knowledge');
assert(node1 && node1.node.speaker === 'Socrates', 'Socrates dialogue starts cleanly');
assert(node1.node.options.length === 3, 'First question has 3 options');

const nextNode = SocraticEngine.selectOption(0);
assert(nextNode && nextNode.node.speaker === 'Socrates', 'Navigates to second dialogue node');

// 3. Test Journal Reflection Saving
console.log('\n--- 3. Testing Journal Reflection Saving ---');
SocraticEngine.saveReflection('I realized that even simple weather predictions depend on complex systems!');
const entries = global.SuitePassport.getJournalEntries('kids_philosophy');
assert(entries.length === 1 && entries[0].title.includes('Socrates'), 'Reflection saved to SuitePassport journal');

console.log(`\n========================================`);
console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);

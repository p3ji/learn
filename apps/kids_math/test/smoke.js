/**
 * Smoke & Integrity Test Harness for OCDSB Kids Math App
 * Run with: node apps/kids_math/test/smoke.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Kids Math App Smoke Tests...');

// Load curriculum data and math engine
const curriculumPath = path.join(__dirname, '../js/curriculum_data.js');
const enginePath = path.join(__dirname, '../js/math_engine.js');

// Mock window context for node execution
global.window = global;

require(curriculumPath);
require(enginePath);

const { KIDS_MATH_CURRICULUM, MathEngine } = global;

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

// 1. Test Curriculum Schema
console.log('\n--- 1. Testing Curriculum Data Schema ---');
assert(KIDS_MATH_CURRICULUM !== undefined, 'KIDS_MATH_CURRICULUM object exists');
assert(KIDS_MATH_CURRICULUM.grade3 !== undefined, 'Grade 3 curriculum exists');
assert(KIDS_MATH_CURRICULUM.grade8 !== undefined, 'Grade 8 curriculum exists');

['grade3', 'grade8'].forEach(gKey => {
  const grade = KIDS_MATH_CURRICULUM[gKey];
  assert(grade.strands.length === 5, `${gKey} has 5 strands (Strands B through F)`);

  grade.strands.forEach(strand => {
    assert(strand.topics.length > 0, `Strand ${strand.code} in ${gKey} has topics`);
    strand.topics.forEach(topic => {
      assert(topic.id, `Topic has ID: ${topic.id}`);
      assert(topic.code, `Topic ${topic.id} has OCDSB Expectation code`);
      assert(topic.title, `Topic ${topic.id} has title`);
      assert(topic.khanUrl && topic.khanUrl.startsWith('https://'), `Topic ${topic.id} has valid Khan Academy URL`);
      assert(topic.cheatSheet && topic.cheatSheet.rule, `Topic ${topic.id} has cheatSheet rule`);
    });
  });
});

// 2. Test Math Generator Stability Across 100 Runs per Topic
console.log('\n--- 2. Testing Math Generator Procedural Stability ---');
const allTopicIds = [];
['grade3', 'grade8'].forEach(gKey => {
  KIDS_MATH_CURRICULUM[gKey].strands.forEach(strand => {
    strand.topics.forEach(topic => allTopicIds.push(topic.id));
  });
});

allTopicIds.forEach(topicId => {
  let topicSuccess = true;
  for (let i = 0; i < 100; i++) {
    const q = MathEngine.generateQuestion(topicId, 'builder');
    if (!q || !q.question || q.answer === undefined || !q.hints || q.hints.length < 2 || !q.solution) {
      topicSuccess = false;
      console.error(`Generator issue for ${topicId} on run ${i}:`, q);
      break;
    }
    // Verify answer is not NaN
    if (typeof q.answer === 'number' && isNaN(q.answer)) {
      topicSuccess = false;
      console.error(`NaN answer for ${topicId} on run ${i}`);
      break;
    }
  }
  assert(topicSuccess, `Topic ${topicId} generator passed 100 random runs`);
});

// 3. Test Answer Evaluator Precision
console.log('\n--- 3. Testing Answer Evaluator ---');
assert(MathEngine.verifyAnswer('45', 45) === true, 'Numeric exact match');
assert(MathEngine.verifyAnswer(' $12.50 ', 12.5) === true, 'Currency formatting');
assert(MathEngine.verifyAnswer('3/4', '3/4') === true, 'Fraction match');
assert(MathEngine.verifyAnswer('0.75', '3/4') === true, 'Decimal to fraction match');
assert(MathEngine.verifyAnswer('20 cm', 20) === true, 'Units stripping');
assert(MathEngine.verifyAnswer('Brand B', 'brand b') === true, 'Case insensitive string match');
assert(MathEngine.verifyAnswer('impossible', 'Impossible') === true, 'Probability term match');
assert(MathEngine.verifyAnswer('-15', -15) === true, 'Negative integer match');
assert(MathEngine.verifyAnswer('99', 100) === false, 'Rejects incorrect numbers');

// 4. Test Quiz Generator
console.log('\n--- 4. Testing Quiz Generator ---');
const g3Quiz = MathEngine.generateQuiz('grade3', 10);
const g8Quiz = MathEngine.generateQuiz('grade8', 10);
assert(g3Quiz.length === 10, 'Grade 3 quiz generates 10 questions');
assert(g8Quiz.length === 10, 'Grade 8 quiz generates 10 questions');

// 5. Test Number Munchers Arcade Engine
console.log('\n--- 5. Testing Number Munchers Engine ---');
require(path.join(__dirname, '../js/munchers_engine.js'));
const { MunchersEngine } = global;

assert(MunchersEngine !== undefined, 'MunchersEngine exists');
assert(MunchersEngine.isPrime(97) && !MunchersEngine.isPrime(1) && !MunchersEngine.isPrime(91), 'Prime predicate is correct');
assert(MunchersEngine.isSquare(144) && !MunchersEngine.isSquare(145), 'Square predicate is correct');

['grade3', 'grade8'].forEach(gKey => {
  let packsOk = true;
  let boardsOk = true;
  let purityOk = true;
  let uniqueOk = true;

  for (let run = 0; run < 60; run++) {
    const packs = MunchersEngine.buildRulePacks(gKey);
    if (!packs.length) { packsOk = false; break; }

    packs.forEach(rule => {
      if (!rule.id || !rule.title || !rule.prompt || !rule.strandCode) packsOk = false;

      // Correct generators must actually satisfy the rule predicate.
      for (let i = 0; i < 40; i++) {
        const c = rule.correct();
        if (!c || typeof c.text !== 'string' || typeof c.val !== 'number' || isNaN(c.val)) purityOk = false;
        if (!rule.test(c.val)) purityOk = false;
        const w = rule.wrong();
        if (!w || typeof w.text !== 'string' || typeof w.val !== 'number' || isNaN(w.val)) purityOk = false;
      }

      const grid = MunchersEngine.buildBoard(rule, 5, 6, 8);
      if (grid.length !== 5 || grid.some(r => r.length !== 6)) boardsOk = false;

      const texts = new Set();
      let correctCount = 0;
      grid.forEach(row => row.forEach(cell => {
        texts.add(cell.text);
        // The cell's stored flag must match the rule predicate exactly.
        if (cell.correct !== !!rule.test(cell.val)) purityOk = false;
        if (cell.correct) correctCount++;
      }));
      if (texts.size !== 30) uniqueOk = false;
      if (correctCount < 1) boardsOk = false;
      if (MunchersEngine.countRemainingCorrect(grid) !== correctCount) boardsOk = false;
    });
  }

  assert(packsOk, `${gKey} rule packs have complete metadata`);
  assert(boardsOk, `${gKey} boards are 5x6 with at least one correct cell`);
  assert(purityOk, `${gKey} cell correctness always matches the rule predicate`);
  assert(uniqueOk, `${gKey} boards contain 30 unique cell labels`);
});

let levelsOk = true;
for (let lvl = 1; lvl <= 8; lvl++) {
  const r3 = MunchersEngine.ruleForLevel('grade3', lvl);
  const r8 = MunchersEngine.ruleForLevel('grade8', lvl);
  if (!r3 || !r8 || typeof r3.test !== 'function' || typeof r8.test !== 'function') levelsOk = false;
}
assert(levelsOk, 'ruleForLevel returns a playable rule for levels 1-8');

console.log(`\n========================================`);
console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL SMOKE TESTS PASSED CLEANLY!');
}

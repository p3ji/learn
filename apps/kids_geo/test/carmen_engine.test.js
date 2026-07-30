/**
 * Comprehensive Unit Test Suite for Carmen Engine Upgrades
 * Run via: node apps/kids_geo/test/carmen_engine.test.js
 */

const assert = require('assert');

global.window = {};

require('../js/geo_data.js');
require('../js/carmen_engine.js');

const GeoData = global.window.GeoData;
const CarmenEngine = global.window.CarmenEngine;

console.log('🕵️ Running Carmen Engine Upgraded Test Suite...\n');

const engine = new CarmenEngine(GeoData);

// 1. Difficulty Levels Test
console.log('1️⃣ Testing Difficulty Levels (Easy, Medium, Hard)...');
const easyCase = engine.startNewCase('Easy');
assert.strictEqual(easyCase.difficulty, 'Easy');
assert.strictEqual(easyCase.path.length, 3);
assert.strictEqual(easyCase.hoursLeft, 120);

const mediumCase = engine.startNewCase('medium');
assert.strictEqual(mediumCase.difficulty, 'Medium');
assert.strictEqual(mediumCase.path.length, 4);
assert.strictEqual(mediumCase.hoursLeft, 96);

const hardCase = engine.startNewCase('HARD');
assert.strictEqual(hardCase.difficulty, 'Hard');
assert.strictEqual(hardCase.path.length, 5);
assert.strictEqual(hardCase.hoursLeft, 72);

console.log('   ✅ Difficulty Levels test passed!');

// 2. Detective Rank Progression Test
console.log('\n2️⃣ Testing 5 Detective Ranks & Progression...');
const rankInfo = engine.getRankInfo();
assert.strictEqual(rankInfo.title, 'Gumshoe');
assert.strictEqual(rankInfo.rankIndex, 0);
assert.strictEqual(rankInfo.casesNeededForNextRank, 2);

// Simulate case victories
engine.casesSolved = 2;
engine.playerRankIndex = 0;
// Test attemptArrest promotion
const testCase = engine.startNewCase('Easy');
testCase.warrantIssuedFor = testCase.suspect;
testCase.currentIndex = testCase.path.length - 1; // At end
const arrestRes = engine.attemptArrest();

assert.strictEqual(arrestRes.success, true);
assert.strictEqual(arrestRes.promoted, true);
assert.strictEqual(arrestRes.rank, 'Junior Sleuth');
assert.strictEqual(engine.getRankInfo().title, 'Junior Sleuth');

console.log('   ✅ Detective Rank Progression test passed!');

// 3. Procedural Storyline Generator Test
console.log('\n3️⃣ Testing Procedural Storyline Generator...');
const caseWithStory = engine.startNewCase('Medium');
assert.ok(caseWithStory.storyline, 'Storyline must exist on currentCase');
assert.ok(caseWithStory.storyline.title.includes('Missing'), 'Title should describe missing artifact');
assert.ok(caseWithStory.storyline.headline.includes('CRIME ALERT'), 'Headline should start with CRIME ALERT');
assert.ok(caseWithStory.storyline.briefing.includes('HQ DIRECTIVE'), 'Briefing should contain HQ DIRECTIVE');
assert.ok(caseWithStory.storyline.motive, 'Motive must be present');
assert.ok(caseWithStory.storyline.heistMethod, 'Heist method must be present');
assert.ok(caseWithStory.storyline.escapeRoute, 'Escape route must be present');

console.log('   ✅ Procedural Storyline Generator test passed!');

// 4. Advanced Warrant Computer Matching (6 Traits) Test
console.log('\n4️⃣ Testing 6-Trait Warrant Computer Matching...');
const targetSuspect = caseWithStory.suspect;
const criteriaOptions = engine.getAvailableCriteriaOptions();

assert.ok(criteriaOptions.eyewears.length > 0, 'Eyewears options must be populated');

const exactCriteria = {
    gender: targetSuspect.gender,
    hair: targetSuspect.hair,
    vehicle: targetSuspect.vehicle,
    food: targetSuspect.food,
    hobby: targetSuspect.hobby,
    eyewear: targetSuspect.eyewear || engine.getSuspectEyewear(targetSuspect)
};

const warrantRes = engine.issueWarrant(exactCriteria);
assert.strictEqual(warrantRes.success, true, 'Exact criteria should issue warrant');
assert.strictEqual(warrantRes.suspect.id, targetSuspect.id);

// Partial search matching test
const partialRes = engine.filterSuspects({ gender: targetSuspect.gender });
assert.ok(partialRes.length >= 1, 'Filtering by gender should return matches');

console.log('   ✅ 6-Trait Warrant Computer Matching test passed!');

// 5. Timer Deduction Math Test
console.log('\n5️⃣ Testing Timer Deduction Math & Formatting...');
const cCase = engine.startNewCase('Easy');
const startHrs = cCase.hoursLeft; // 120

// Interrogation time deduction (2 hrs for Easy)
const invRes = engine.investigate('bank');
assert.strictEqual(invRes.hoursSpent, 2);
assert.strictEqual(invRes.hoursLeft, startHrs - 2);
assert.strictEqual(invRes.timeRemaining.formatted, '4d 22h remaining');

// Wrong flight penalty deduction
const distractors = engine.getDestinationCities().filter(c => c.id !== cCase.path[1].id);
if (distractors.length > 0) {
    const hoursBeforeFly = cCase.hoursLeft;
    const flyRes = engine.flyTo(distractors[0].id);
    assert.strictEqual(flyRes.isCorrectPath, false);
    assert.ok(flyRes.hoursSpent > 4, 'Wrong flight should include penalty hours');
    assert.strictEqual(cCase.hoursLeft, hoursBeforeFly - flyRes.hoursSpent);
}

// Format time remaining helper test
const timeFmt = engine.formatTimeRemaining(49);
assert.strictEqual(timeFmt.days, 2);
assert.strictEqual(timeFmt.hours, 1);
assert.strictEqual(timeFmt.formatted, '2d 1h remaining');

console.log('   ✅ Timer Deduction Math test passed!');

console.log('\n🎉 ALL CARMEN ENGINE UPGRADED TESTS PASSED CLEANLY!\n');

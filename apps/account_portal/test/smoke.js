/**
 * Smoke Test Harness for Learner Passport & Account Portal
 * Run with: node apps/account_portal/test/smoke.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Learner Passport & Account Portal Smoke Tests...');

// Mock window & localStorage for Node.js environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) { return this.store[key] || null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
  clear() { this.store = {}; }
}

global.window = global;
global.localStorage = new LocalStorageMock();

const passportSdkPath = path.join(__dirname, '../../../js/suite_passport.js');
require(passportSdkPath);

const { SuitePassport } = global;

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

// 1. Test Passport Initial State & Profile Update
console.log('\n--- 1. Testing Profile Initialization & Updates ---');
assert(SuitePassport !== undefined, 'SuitePassport object exists');
const initialProfile = SuitePassport.getProfile();
assert(initialProfile.name === 'Learner', 'Default profile name is Learner');
assert(initialProfile.level === 1, 'Default level is 1');

SuitePassport.updateProfile({ name: 'Alex', avatar: '🦊', grade: 'grade8' });
const updatedProfile = SuitePassport.getProfile();
assert(updatedProfile.name === 'Alex', 'Profile name updated to Alex');
assert(updatedProfile.avatar === '🦊', 'Profile avatar updated to 🦊');
assert(updatedProfile.grade === 'grade8', 'Grade updated to grade8');

// 2. Test XP & Level Calculation
console.log('\n--- 2. Testing XP & Level Engine ---');
SuitePassport.addXP(45, 'kids_math');
assert(SuitePassport.getProfile().xp === 45, 'XP added correctly (45 XP)');
assert(SuitePassport.getProfile().level === 1, 'Level remains 1 for 45 XP');

SuitePassport.addXP(65, 'kids_math'); // Total 110 XP
assert(SuitePassport.getProfile().xp === 110, 'XP totals 110 XP');
assert(SuitePassport.getProfile().level === 2, 'Level promoted to Level 2 at 110 XP');

// 3. Test Journal & Saved Inputs Engine
console.log('\n--- 3. Testing Journal & Saved Inputs Engine ---');
const entry1 = SuitePassport.saveJournalEntry({
  appId: 'kids_writing',
  appName: 'Story Forge',
  title: 'Chapter 1: The Crystal Key',
  category: 'Story Draft',
  content: 'Deep inside the ancient forest, Maya found a glowing crystal key...',
  tags: ['chapter1', 'fantasy']
});

assert(entry1 && entry1.id, 'Journal entry created with unique ID');
assert(SuitePassport.getJournalEntries('all').length === 1, 'Journal entry saved to list');

const entry2 = SuitePassport.saveJournalEntry({
  appId: 'kids_math',
  appName: 'MathForge Ottawa',
  title: 'Grade 8 Diagnostic Report',
  category: 'Diagnostic Quiz',
  content: 'Scored 100% on Pythagorean Theorem and Integers.',
  tags: ['quiz', 'math']
});

assert(SuitePassport.getJournalEntries('all').length === 2, 'Second journal entry saved');

// Test App Filter
const writingEntries = SuitePassport.getJournalEntries('kids_writing');
assert(writingEntries.length === 1 && writingEntries[0].title.includes('Crystal Key'), 'App filter correctly returns writing entry');

// Test Search Query Filter
const searchResult = SuitePassport.getJournalEntries('all', 'Pythagorean');
assert(searchResult.length === 1 && searchResult[0].title.includes('Diagnostic'), 'Search query correctly filters by content keyword');

// Test Deletion
SuitePassport.deleteJournalEntry(entry1.id);
assert(SuitePassport.getJournalEntries('all').length === 1, 'Journal entry deleted successfully');

// 4. Test Achievements
console.log('\n--- 4. Testing Achievements ---');
const achievements = SuitePassport.getAchievements();
assert(achievements.length >= 8, 'At least 8 achievements exist');
const mathWhiz = achievements.find(a => a.id === 'math_whiz');
assert(mathWhiz && mathWhiz.unlocked === true, 'Math Whiz achievement unlocked after 100+ XP in math');

// 5. Test Export & Import JSON Backup
console.log('\n--- 5. Testing Export & Import JSON Backup ---');
const exportJson = SuitePassport.exportDataJSON();
assert(exportJson.includes('"name": "Alex"'), 'Exported JSON contains profile name');

// Reset local storage and re-import
global.localStorage.clear();
const importSuccess = SuitePassport.importDataJSON(exportJson);
assert(importSuccess === true, 'Import returned success true');
assert(SuitePassport.getProfile().name === 'Alex', 'Restored profile name is Alex');

console.log(`\n========================================`);
console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL PASSPORT SMOKE TESTS PASSED CLEANLY!');
}

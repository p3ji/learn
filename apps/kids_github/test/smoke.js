/**
 * Smoke Test Harness for GitHub Quest Interactive Git Terminal Simulator
 * Run with: node apps/kids_github/test/smoke.js
 */

const path = require('path');

console.log('🧪 Starting GitHub Quest Git Terminal Simulator Smoke Tests...');

global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {} };

require(path.join(__dirname, '../../../js/suite_passport.js'));
require(path.join(__dirname, '../js/git_terminal.js'));

const { GitTerminalEngine } = global;
const term = new GitTerminalEngine();

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

// 1. Test Status
console.log('\n--- 1. Testing Git Status ---');
const status1 = term.executeCommand('git status');
assert(status1.includes('On branch main'), 'git status reports branch main');

// 2. Test Git Add & Commit
console.log('\n--- 2. Testing Git Add & Commit ---');
const addRes = term.executeCommand('git add .');
assert(addRes.includes('Staged all'), 'git add . stages all working files');

const commitRes = term.executeCommand('git commit -m "My first story commit"');
assert(commitRes.includes('My first story commit'), 'git commit creates commit snapshot');

// 3. Test Git Branching & Log
console.log('\n--- 3. Testing Git Branch & Log ---');
const branchRes = term.executeCommand('git checkout -b feature/magic-spell');
assert(branchRes.includes('Switched to a new branch'), 'git checkout -b creates and switches branch');

const logRes = term.executeCommand('git log --graph');
assert(logRes.includes('commit') && logRes.includes('My first story commit'), 'git log --graph displays commit timeline');

console.log(`\n========================================`);
console.log(`RESULTS: Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);

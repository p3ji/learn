/**
 * Kids Geo Arcade - Smoke & Schema Verification Test Suite
 * Run via: node apps/kids_geo/test/smoke.js
 */

const assert = require('assert');

global.window = {};

require('../js/geo_data.js');
require('../js/carmen_engine.js');

console.log('Testing Real Globe & 30 Suspect Overlap Smoke Tests...\n');

const GeoData = global.window.GeoData;
const CarmenEngine = global.window.CarmenEngine;

// 1. Data Schema Tests
console.log('1 Checking GeoData schemas...');
assert.ok(Array.isArray(GeoData.cities), 'GeoData.cities must be an array');
assert.ok(GeoData.cities.length >= 10, 'GeoData.cities must contain cities');

GeoData.cities.forEach(city => {
    assert.ok(city.id && city.name && city.country && city.continent, `City missing basic fields: ${city.id}`);
    assert.ok(city.clues && city.clues.bank && city.clues.library && city.clues.airport && city.clues.chef, `City ${city.id} missing witness clues`);
});

assert.ok(Array.isArray(GeoData.suspects), 'GeoData.suspects must be an array');
assert.strictEqual(GeoData.suspects.length, 30, 'GeoData.suspects must contain exactly 30 suspects');

GeoData.suspects.forEach(s => {
    assert.ok(s.gender, `Suspect ${s.id} missing gender`);
    assert.ok(s.hair, `Suspect ${s.id} missing hair`);
    assert.ok(s.vehicle, `Suspect ${s.id} missing vehicle`);
    assert.ok(s.food, `Suspect ${s.id} missing food`);
    assert.ok(s.hobby, `Suspect ${s.id} missing hobby`);
});

const nonBinary = GeoData.suspects.filter(s => s.gender === 'Non-binary');
assert.ok(nonBinary.length >= 2, `Should have at least 2 Non-binary suspects (found ${nonBinary.length})`);

console.log('   GeoData schema validation passed!');

// 2. Warrant Matching Tests
console.log('\n2 Testing Trait Overlap & Warrant Matching...');
const carmen = new CarmenEngine(GeoData);

const singleTraitMatches = carmen.filterSuspects({ hair: 'Red' });
assert.ok(singleTraitMatches.length >= 3, `Single trait should match multiple suspects`);

const targetSuspect = GeoData.suspects.find(s => s.id === 'carmen_shadow');
const fullCriteria = { gender: targetSuspect.gender, hair: targetSuspect.hair, vehicle: targetSuspect.vehicle, food: targetSuspect.food };
const fullTraitMatches = carmen.filterSuspects(fullCriteria);
assert.strictEqual(fullTraitMatches.length, 1, '4 traits should narrow to 1 suspect');
assert.strictEqual(fullTraitMatches[0].id, targetSuspect.id, 'Matched suspect ID correct');

const nbMatches = carmen.filterSuspects({ gender: 'Non-binary' });
assert.ok(nbMatches.length >= 2, `Non-binary filter should return >= 2 suspects`);
nbMatches.forEach(s => assert.strictEqual(s.gender, 'Non-binary', 'Filtered suspects should be Non-binary'));

console.log('   Trait Overlap & Warrant Matching test passed!');
console.log('\nALL 30 SUSPECT SMOKE TESTS PASSED CLEANLY!\n');

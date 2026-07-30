/**
 * Kids Geo Arcade - Smoke & Schema Verification Test Suite
 * Run via: node apps/kids_geo/test/smoke.js
 */

const assert = require('assert');

global.window = {};

require('../js/geo_data.js');
require('../js/carmen_engine.js');

console.log('🧪 Running Real Globe & 24 Suspect Overlap Smoke Tests...\n');

const GeoData = global.window.GeoData;
const CarmenEngine = global.window.CarmenEngine;

// 1. Data Schema Tests
console.log('1️⃣ Checking GeoData schemas (33 Cities & 24 Overlapping Suspects)...');
assert.ok(Array.isArray(GeoData.cities), 'GeoData.cities must be an array');
assert.ok(GeoData.cities.length >= 10, 'GeoData.cities must contain cities');

GeoData.cities.forEach(city => {
    assert.ok(city.id && city.name && city.country && city.continent, `City missing basic fields: ${city.id}`);
    assert.ok(city.clues && city.clues.bank && city.clues.library && city.clues.airport && city.clues.chef, `City ${city.id} missing witness clues`);
});

assert.ok(Array.isArray(GeoData.suspects), 'GeoData.suspects must be an array');
assert.strictEqual(GeoData.suspects.length, 24, 'GeoData.suspects must contain exactly 24 suspects');

console.log('   ✅ GeoData schema validation passed!');

// 2. Overlapping Traits Warrant Requirement Test
console.log('\n2️⃣ Testing Trait Overlap & Warrant Matching...');
const carmen = new CarmenEngine(GeoData);

// Single trait (e.g. hair: 'Red') should return > 1 matches
const singleTraitMatches = carmen.filterSuspects({ hair: 'Red' });
assert.ok(singleTraitMatches.length >= 3, `Single trait 'Red' should match multiple suspects (found ${singleTraitMatches.length})`);

// 4 traits (Gender, Hair, Vehicle, Food) should narrow down to 1 match
const targetSuspect = GeoData.suspects.find(s => s.id === 'carmen_shadow');
const fullCriteria = {
    gender: targetSuspect.gender,
    hair: targetSuspect.hair,
    vehicle: targetSuspect.vehicle,
    food: targetSuspect.food
};
const fullTraitMatches = carmen.filterSuspects(fullCriteria);
assert.strictEqual(fullTraitMatches.length, 1, `4 traits should narrow down to 1 suspect`);
assert.strictEqual(fullTraitMatches[0].id, targetSuspect.id, `Matched suspect should be ${targetSuspect.id}`);

console.log('   ✅ Trait Overlap & Warrant Matching test passed!');

console.log('\n🎉 ALL REAL GLOBE & 24 SUSPECT SMOKE TESTS PASSED CLEANLY!\n');

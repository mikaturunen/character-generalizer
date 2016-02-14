"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = random;
// No type definitions in place, we cannot import it, we have to const it in as any type. This is piss,
// and that's the reason we made a random.ts module to hold this crap inside it so the 'any' type does not
// spread outside of this context. Yarr! One could write the d.ts (types) for random-js but I'm not feeling it :)
var randomJs = require("random-js");
// Use random-js, wrap non sync behavior into a async promise wrapper
// Create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
var engine = randomJs.engines.mt19937().autoSeed();
// Create a distribution that will consistently produce integers within inclusive range [min, max].
/**
 * Generates a single random number.
 * @param {number} min Minimum number
 * @param {number} max Maximum number
 * @returns {number} Number between the given values.
 */
function random(min, max) {
  var distribution = randomJs.integer(min, max);
  return distribution(engine);
}
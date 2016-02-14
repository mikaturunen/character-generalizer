"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = random;

var randomJs = require("random-js");

var engine = randomJs.engines.mt19937().autoSeed();
function random(min, max) {
  return randomJs.integer(min, max);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.roll = roll;

var _random = require("./random");

function roll(dice) {
    var throws = [];
    // NOTE if we want to throw 1d40, our random starts from 0 and yet we want to use the dice thrower as 1d40
    //      so { dice: 1, number: 40 } -> this will result into a single dice throw in th range of [0, 39], we
    //      add one to it to make it between 1-40. This works for us a bit better. We'll look into producing
    //      zeroes if we have the need for that type if dice in the future.
    for (var i = 0; i < dice.count; i++) {
        throws.push((0, _random.random)(1, dice.max));
    }
    return throws.reduce(function (n, p) {
        return n + p;
    }) + dice.add;
}
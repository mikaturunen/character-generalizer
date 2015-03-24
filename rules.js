
var _ = require("lodash");

var dice = {
    // 1d40
    ageModifier: { dice: 1, max: 40 },
    strength: { dice: 3, max: 6 },
    dexterity: { dice: 3, max: 6 },
    intelligence: { dice: 2, max: 6, add: 6 },
    constitution: { dice: 3, max: 6 },
    appearance: { dice: 3, max: 6 },
    power: { dice: 3, max: 6 },
    size: { dice: 2, max: 6, add: 6 },
    education: { dice: 3, max: 6, add: 3 },
};

var calculations = {
    sanity: 0,
    idea: 0,
    luck: 0,
    knowledge: 0
};

/**
 * The following has to be true Str+Dex+Int+Con+App+Pow+Siz+Edu >= statLimit so that the character
 * is in between the acceptable parameters.
 * @type {Number}
 */
var statLimit = 90;

/**
 * Checks that the given stats are withing "good enough" based on the following equation: 
 * Str+Dex+Int+Con+App+Pow+Siz+Edu >= statLimit.
 * 
 * @param {{
        ageModifier: number;
        strength: number;
        dexterity: number;
        intelligence: number;
        constitution: number;
        appearance: number;
        power: number;
        size: number;
        education: number;
        sanity: number;
        idea: number;
        luck: number;
        knowledge: number;
    }} stats Stats object containing the characters stats so far.
 * @returns {boolean} True when the stats object withing the given parameters and the charcter is valid. Otherwise false.
 */
var checkStats = (stats) => {
    return stats.strength + stats.dexterity + stats.intelligence + stast.constitution + stats.appearance + 
        stats.power + stats.size + stats.education >= statLimit;
};

/**
 * Calculates the characters age and modifies other stats depending on how old the character is.
 * @param {{
        ageModifier: number;
        strength: number;
        dexterity: number;
        intelligence: number;
        constitution: number;
        appearance: number;
        power: number;
        size: number;
        education: number;
        sanity: number;
        idea: number;
        luck: number;
        knowledge: number;
    }} stats Stats object containing the characters stats so far.
 */
var calculateAge = (stats) => {
    // Age = 6+Edu+AgeMod
    stats.age = 6 + stats.education + stats.ageModifier

    // Age has negative effects on differet stats depending on how old the character is
    if (stats.age > 40) {
        stats.dexterity -= 1;
    } 
    if (stats.age > 50) {
        stats.constitution -= 1;
    }
    if (stats.age > 60) {
        stats.appearance -= 1;
    } 
    if (stats.age > 70) {
        stats.strength -= 1;
    }
};

/*
AgeMod 1d40
Str 3d6
Dex 3d6
Int 2d6+6
Con 3d6
App 3d6
Pow 3d6
Siz 2d6+6
Edu 3d6+3+AgeMod%10
San = Pow*5
Idea = Int*5
Luck = Pow*5
Know = Edu*5
*/

/**
 * Repeats 'count' amount of the same value into an array and returns it
 * @param  {T} value What value to repeat
 * @param  {number} count How many repeats for array
 * @return {Array<T>} Returns an array of objects repeated for count times.  
 */
function repeatValues(value, count) {
    var array = [ ];

    for(var i=0; i<count; i++) {
        array.push(value);
    }

    return array;
}

/**
 * Set of rules (we consider the dice set to be part of the rules) we are publishing from the module
 * @module Rules
 */
var rules = {
    /**
     * List of Dice and how they should be rolled for different stats
     */
    dice: dice,

    /**
     * Specific calculations we are after.
     * @type {any}
     */
    calculations: calculations,

    /**
     * Number for male.
     * @type {number}
     */
    male: 0,

    /**
     * Number for female.
     * @type {number}
     */
    female: 1,

    /**
     * List of sexual orientations: 3% bisexual, 2% homosexual, 95% heterosexual - gets shuffled plus index is randomized
     * @type {string[]}
     */
    sexualOrientations: _.shuffle([ ]
        .concat(repeatValues("homosexual", 2))
        .concat(repeatValues("bisexual", 3))
        .concat(repeatValues("heterosexual", 95))),

    checkStats: checkStats,

    calculateAge: calculateAge
};

module.exports = rules;
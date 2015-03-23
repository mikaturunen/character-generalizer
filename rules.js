
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
 * Set of rules (we consider the dice set to be part of the rules) we are publishing from the module
 * @module Rules
 */
var rules = {
    dice: dice,
    calculations: calculations
};

module.exports = dice;
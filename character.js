
var Q = require("q");
var rules = require("./rules");
var die = require("./die");
var random = require("./random");

var occupation = require("./assets/occupation.json");
var education = require("./assets/education.json");
var firstNames = require("./assets/first-names.json");
var lastNames = require("./assets/last-names.json");

/** 
 * Creates a simple Character stub for us to modify and handle.
 * @return {Q.Promise<Character>}
 */
function createStub() {
    // NOTE not async function, just easier to handle the promise chain this way
    var deferred = Q.defer();

    deferred.resolve({ 
        age: 0, 
        gender: "", 
        sexualOrientation: "",
        firstName: "", 
        lastName: "", 
        occupation: "",
        education: "",
        stats: {
            ageModifier: 1,
            strength: 1,
            dexterity: 1,
            intelligence: 1,
            constitution: 1,
            appearance: 1,
            power: 1,
            size: 1,
            education: 1,
            sanity: 0,
            idea: 0,
            luck: 0,
            knowledge: 0
        }
    });

    return deferred.promise;
}

/**
 * Randomizes character gender.
 * @param  {Character} character Character to set gender for.
 * @return {Q.Promise<Character>}
 */
function randomizeGender(character) {
    var deferred = Q.defer();

    random(0, 1)
        .done(result => {
            character.gender = result === rules.male ? "male" : "female";
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeSexualOrientation(character) {
    var deferred = Q.defer();

    // Random number between 0 - 100, shuffle the sexual orientations array (shuffling sexual orientation.. wtf? :D) 
    // and then single orientation with randomized index :)
    random(0, 100)
        .done(result => {
            character.sexualOrientation = rules.sexualOrientations[result];
            deferred.resolve(character);
        },
        deferred.reject);

    return deferred.promise;
}

function randomizeStats(character) {
    var deferred = Q.defer();

    Q.all([
            die.roll(rules.dice.ageModifier),
            die.roll(rules.dice.strength),
            die.roll(rules.dice.dexterity),
            die.roll(rules.dice.intelligence),
            die.roll(rules.dice.constitution),
            die.roll(rules.dice.appearance),
            die.roll(rules.dice.power),
            die.roll(rules.dice.size),
            die.roll(rules.dice.education)
        ])
        .then(dieResults => {
            var ageMod = dieResults.shift();

            if (dieResults.reduce((previousDie, nextDie) => previousDie + nextDie) < rules.statLimit) {
                console.log("Total was under 90. Rerolling stats dies..");
                randomizeStats(character).done(deferred.resolve, deferred.reject);
            } else {
                dieResults.unshift(ageMod);
                character.stats.ageModifier = dieResults[0];
                character.stats.strength = dieResults[1];
                character.stats.dexterity = dieResults[2];
                character.stats.intelligence = dieResults[3];
                character.stats.constitution = dieResults[4];
                character.stats.appearance = dieResults[5];
                character.stats.power = dieResults[6];
                character.stats.size = dieResults[7];
                character.stats.education = dieResults[8];
                rules.calculateMissingStats(character);
                deferred.resolve(character);
            }
        })
        .catch(deferred.reject)
        .done();

    return deferred.promise;
}

function randomizeName(character) {
    var deferred = Q.defer();

    var listOfFirstNames = character.gender === "male" ? firstNames.male : firstNames.female;
    Q.all([
            random(0, listOfFirstNames.length - 1),
            random(0, lastNames.length - 1)
        ])
        .done(results => {
            character.firstName = listOfFirstNames[results[0]];
            character.lastName = lastNames[results[1]];
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeEducation(character, depth) {
    var deferred = Q.defer();

    if (!depth)
    {
        depth = 0;
        character.education = "None";
    }

    if (depth >= 1000)
    {
        deferred.resolve(character);
    }
    else {
        random(0, education.length - 1)
            .done(result => {
                education[result].levels
                    .sort((a, b) => { return b.value - a.value; })
                    .some((level) => {
                        if (level.value <= character.stats.education) {
                            character.education = education[result].name + ", " + education[result].levels[0].level;
                            deferred.resolve(character);
                            return true;
                        }
                        else {
                            return false;
                        }
                    });

                    if (character.education === "None") {
                        randomizeEducation(character, depth + 1);
                    }

            }, deferred.reject);
    }

    return deferred.promise;
}

function randomizeOccupation(character) {
    var deferred = Q.defer();

    random(0, occupation.length - 1)
        .done(result => {
            character.occupation = occupation[result];
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

var character = {
    create: () => {
        var deferred = Q.defer();

        // Wait for all the async queries to complete and then show the results. We do
        // a trick of calling all the async functions instantly and then reading the
        // results with indices from the final result, not the most clean solution
        // but works for now :)
        createStub()
            .then(randomizeStats)
            .then(randomizeGender)
            .then(randomizeSexualOrientation)
            .then(randomizeName)
            .then(randomizeEducation)
            .then(randomizeOccupation)
            .done(deferred.resolve, deferred.reject);
        
        return deferred.promise;
    }
};

module.exports = character;

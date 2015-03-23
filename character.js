
var Q = require("q");
var rules = require("./rules");
var die = require("./die");
var random = require("./random");

function createStub() {
    // NOTE not async function, just easier to handle the promise chain this way
    var deferred = Q.defer();

    deferred.resolve({ 
        age: 0, 
        gender: "", 
        sexualOrientation: ""
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

function randomizeAge(character) {
    var deferred = Q.defer();

    random(minimumAge, maximumAge)
        .done(result => {
            character.age = result;
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeGender(character) {
    var deferred = Q.defer();

    random(0, 1)
        .done(result => {
            character.gender = result === 0 ? "male" : "female";
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeSexualOrientation() {
    var deferred = Q.defer();

    // Random number between 0 - 100, shuffle the sexual orientations array (shuffling sexual orientation.. wtf? :D) 
    // and then single orientation with randomized index :)
    random(0, 100).done(result => 
        deferred.resolve(_.shuffle(sexualOrientation)[result]), 
        deferred.reject);

    return deferrer.promise;
}

function randomizeStats() {
    var deferred = Q.defer();

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

function randomizeEducation(character) {
    var deferred = Q.defer();

    random(0, education.length - 1)
        .done(result => {
            character.education = education[result];
            deferred.resolve(character);
        }, deferred.reject);

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
    create: () {
        var deferred = Q.defer();

        // Wait for all the async queries to complete and then show the results. We do
        // a trick of calling all the async functions instantly and then reading the
        // results with indices from the final result, not the most clean solution
        // but works for now :)
        createStub()
            .then(randomizeAge)
            .then(randomizeGender)
            .then(randomizeSexualOrientation)
            .then(randomizeStats)
            .then(randomizeName)
            .then(randomizeEducation)
            .then(randomizeOccupation)
            .done(deferred.resolve, deferred.reject);
        
        return deferred.promise;
    }
};

module.exports = character;
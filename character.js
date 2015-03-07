"use strict";

var random = require("node-random");
var Q = require("q");
var occupation = require("./assets/occupation.json");
var education = require("./assets/education.json");
var firstNames = require("./assets/first-names.json");
var lastNames = require("./assets/last-names.json");

var minimumAge = 16;
var maximumAge = 60;
var male = 0;
var female = 1;

console.log("Querying random.org for randomized information.. ");
console.log("Stay a while and listen~");

// Wait for all the async queries to complete and then show the results. We do
// a trick of calling all the async functions instantly and then reading the
// results with indices from the final result, not the most clean solution
// but works for now :)
createCharacterStub()
    .then(randomizeAge)
    .then(randomizeGender)
    .then(randomizeName)
    .then(randomizeEducation)
    .then(randomizeOccupation)
    .then(character => console.log("Done:", character))
    .catch(error => console.log("ERROR:", error))
    .done();

function createCharacterStub() {
    // NOTE: not async function but we use it like it was one to make the promise chain a lot more readable :)
    var deferred = Q.defer();
    deferred.resolve({ 
        age: 0, 
        gender: "", 
        firstName: "", 
        lastName: "", 
        occupation: "" 
    });
    return deferred.promise;
}

function randomizeAge(character) {
    var deferred = Q.defer();

    Q.ninvoke(random, "integers", { number: 1, minimum: minimumAge, maximum: maximumAge })
        .done(result => {
            character.age = result;
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeGender(character) {
    var deferred = Q.defer();

    Q.ninvoke(random, "integers", { number: 1, minimum: minimumAge, maximum: maximumAge })
        .done(result => {
            character.gender = result === 0 ? "male" : "female";
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeName(character) {
    var deferred = Q.defer();

    var listOfFirstNames = character.gender === "male" ? firstNames.male : firstNames.female;
    Q.all([
            Q.ninvoke(random, "integers", { number: 1, minimum: 0, maximum: listOfFirstNames.length - 1 }),
            Q.ninvoke(random, "integers", { number: 1, minimum: 0, maximum: lastNames.length - 1 })
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

    Q.ninvoke(random, "integers", { number: 1, minimum: 0, maximum: education.length - 1 })
        .done(result => {
            character.education = education[result];
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

function randomizeOccupation(character) {
    var deferred = Q.defer();

    Q.ninvoke(random, "integers", { number: 1, minimum: 0, maximum: occupation.length - 1 })
        .done(result => {
            character.occupation = occupation[result];
            deferred.resolve(character);
        }, deferred.reject);

    return deferred.promise;
}

/**
 * Used to transform the given amount of data into specific set of results.
 * @param {Object[]} results List of results from all the async queries into
 * random.org. Accessed with documented indices.
 * @returns {Object}
 */
function transformResults(results) {

};

/**
 * Used to display the results.
 * @param {Object[]} results List of results.
 */
function displayResults(results) {
    var transformedResults = transformResults(results);

    console.log(results);
};

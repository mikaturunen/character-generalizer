"use strict";

var _ = require("lodash");

// Requiring set of json files
var occupation = require("./assets/occupation.json");
var education = require("./assets/education.json");
var firstNames = require("./assets/first-names.json");
var lastNames = require("./assets/last-names.json");
var packageInformation = require("./package.json");

// Requiring separate JS modules
var randomOrg = require("node-random");
var randomJs = require("random-js");
var Q = require("q");
var argumentsParser = require("arg-parser");

// Setting up some silly default values
var minimumAge = 16;
var maximumAge = 60;
var male = 0;
var female = 1;
var isOffline = true;
var sexualOrientation = [ ]
    .concat(repeatValue("homosexual", 2))
    .concat(repeatValues("bisexual", 3))
    .concat(repeatValues("heterosexual", 95));

// Creating script specific parser
var args = new argumentsParser(
        packageInformation.name, 
        packageInformation.version, 
        packageInformation.description,
        "Currently loosely creates million alternatives for your Cthulhu specific character - silly little thing :)"
    );
 
args.add({ name: "online", desc: "uses random.org for random generation.", switches: [ "-o", "--online"] });

if (!args.parse()) {
    // User ran the script with -h
    return;
    
} else {
   isOffline = args.params.online === true ? false : true;
}

// Wait for all the async queries to complete and then show the results. We do
// a trick of calling all the async functions instantly and then reading the
// results with indices from the final result, not the most clean solution
// but works for now :)
createCharacterStub()
    .then(randomizeAge)
    .then(randomizeGender)
    .then(randomizeSexualOrientation)
    .then(randomizeName)
    .then(randomizeEducation)
    .then(randomizeOccupation)
    .then(character => console.log(character))
    .catch(error => console.log("ERROR:", error))
    .done();

function createCharacterStub() {
    // NOTE: not async function but we use it like it was one to make the promise chain a lot more readable :)
    var deferred = Q.defer();
    deferred.resolve({ 
        age: 0, 
        gender: "", 
        sexualOrientation: ""
        firstName: "", 
        lastName: "", 
        occupation: "" 
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

function repeatValue(value, count) {
    var array = [ ];

    for(var i=0; i<count; i++) {
        array.push(value);
    }

    return array;
}

/** 
 * Generates a single random number. Based on provided arguments, either uses offline or online randomization.
 * @param {number} min Minimum number
 * @param {number} max Maximum number 
 * @returns {Q.Promise<number>} On success resolves to a single number
 */
function random(min, max) {
    var deferred = Q.defer();

    if (isOffline) {
        // Use random-js, wrap non sync behavior into a async promise wrapper
        // Create a Mersenne Twister-19937 that is auto-seeded based on time and other random values
        var engine = randomJs.engines.mt19937().autoSeed();
        // Create a distribution that will consistently produce integers within inclusive range [min, max].
        var distribution = randomJs.integer(min, max);
        deferred.resolve(distribution(engine));
    } else {
        console.log("Querying random.org..");
        // Online, use random.org :) -- async
        Q.ninvoke(randomOrg, "integers", { number: 1, minimum: min, maximum: max })
            .done(deferred.resolve, deferred.reject)
    }

    return deferred.promise;
}
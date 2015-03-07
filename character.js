"use strict";

var random = require("node-random");
var Q = require("q");
var jobs = require("./assets/jobs.json");
var education = require("./assets/education.json");

var minimumAge = 16;
var maximumAge = 75;
var ageOptions = ;
var male = 0;
var female = 1;

/**
 * Used to transform the given amount of data into specific set of results.
 * @param {Object[]} results List of results from all the async queries into
 * random.org. Accessed with documented indices.
 * @returns {Object}
 */
var transformResults = results => {

};

/**
 * Used to display the results.
 * @param {Object[]} results List of results.
 */
var displayResults = results => {
    var transformedResults = transformResults(results);

    console.log(results);
};

console.log("Querying random.org for randomized information.. ");
console.log("Stay a while and listen~");

// Wait for all the async queries to complete and then show the results. We do
// a trick of calling all the async functions instantly and then reading the
// results with indices from the final result, not the most clean solution
// but works for now :)
Q.all([
        // Male or Female [0]
        Q.ninvoke(random, "integers", { number: 1, minimum: male, maximum: female }),
        // Age [1]
        Q.ninvoke(random, "integers", { number: 1, minimum: minimumAge, maximum: maximumAge }),
        // Occupation [2]
        Q.ninvoke(random, "integers", { number: 1, minimum: 0, maximum: jobs.availableJobs.length - 1 }),
        // Education [3]
        Q.ninvoke(random, "integers", { number: 1, minimum: 0, maximum: education.availableEducations.length - 1 })
    ])
    .done(results => console.log(results), error => console.error(error));

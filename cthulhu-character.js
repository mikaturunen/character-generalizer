"use strict";


// Requiring set of json files
var packageInformation = require("./package.json");

var rules = require("./rules");
var die = require("./die");
var random = require("./random");
var character = require("./character");

var Q = require("q");
var argumentsParser = require("arg-parser");

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
   random.isOffline = args.params.online === true ? false : true;
}

character
    .create()
    .done(displayResults, error => console.log("ERROR: ", error));

/**
 * Used to transform the given amount of data into specific set of results.
 * @param {Object[]} results List of results from all the async queries into
 * random.org. Accessed with documented indices.
 * @returns {Object}
 */
function transformResults(results) {
    return results;
};

/**
 * Used to display the results.
 * @param {Object[]} results List of results.
 */
function displayResults(results) {
    var transformedResults = transformResults(results);

    console.log(results);
};


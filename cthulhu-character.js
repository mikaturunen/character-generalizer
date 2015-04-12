"use strict";

var packageInformation = require("./package.json");
var character = require("./cthulhu/character");
var random = require("./cthulhu/random");

var Q = require("q");
var argumentsParser = require("arg-parser");

// Creating script specific parser
var args = new argumentsParser(
        packageInformation.name, 
        packageInformation.version, 
        packageInformation.description,
        "Currently loosely creates million alternatives for your Cthulhu specific character - silly little thing :)"
    );
 
args.add({ 
    name: "online", desc: "uses random.org for random generation.", switches: [ "-o", "--online" ] 
});

if (!args.parse()) {
    // User ran the script with -h
    return;
    
} else {
   random.isOffline = args.params.online === true ? false : true;
}

character
    .create()
    .done(results => console.log(results), error => console.log("ERROR: ", error));
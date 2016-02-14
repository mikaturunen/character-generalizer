"use strict";

var packageInformation = require("./package.json");
var character = require("./release/character");
var random = require("./release/random");

var Q = require("q");
var argumentsParser = require("arg-parser");

// Creating script specific parser
var args = new argumentsParser(
        packageInformation.name,
        packageInformation.version,
        packageInformation.description,
        "Currently loosely creates million alternatives for your Cthulhu specific character - silly little thing :)"
    );

console.log(
    character.createCharacter()
);

"use strict";

var fs = require("fs");
var path = require("path");
var stream = require("stream");
var readline = require("readline");

var rawFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../assets/raw/first-names-raw")),
    output: fs.createWriteStream(path.join(__dirname, "../assets/first-names.json")),
    terminal: false
});

var maleNames = [];
var femaleNames = [];
rawFile.on("line", line => {
    line = line.split(" ").filter(word => word !== "").splice(1, 2);
    maleNames.push(line[0]);
    femaleNames.push(line[1]);
});

rawFile.on("close", error => {
    var firstNames = {
        males: maleNames,
        females: femaleNames
    };

    rawFile.output.write(JSON.stringify(firstNames, null, 4));
    rawFile.output.end();
});

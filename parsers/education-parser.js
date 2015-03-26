"use strict";

var fs = require("fs");
var path = require("path");
var stream = require("stream");
var readline = require("readline");

var rawFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../assets/raw/education-raw")),
    output: fs.createWriteStream(path.join(__dirname, "../assets/education.json")),
    terminal: false
});

var educations = [];
var allowSkip = true;
var counter = 0;

rawFile.on("line", line => {
    line = line.trim();
    if (allowSkip) {
        if (line === "" || line.length <= 2 || line.trim() === "Minor") {
            return;
        }
    }

    if (!allowSkip) {
        // Last loop we read the education name, now we need to read the 'levels'
        allowSkip = true;
        educations[educations.length - 1].levels = line.split(",").map(l => l.trim());
    } else {
        allowSkip = false;
        educations.push({ name: line });
    }
});

rawFile.on("close", error => {
    rawFile.output.write(JSON.stringify(educations, null, 4));
    rawFile.output.end();
});

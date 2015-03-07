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
var counter = 0;
rawFile.on("line", line => {
    line = line.trim();
    if (line === "" || line.length <= 1) {
        return;
    }

    counter++;
    if(counter % 2 === 0) {
        var index = educations.length - 1;
        // grab name of education
        var education = educations[index];
        educations.splice(educations.length - 2, 1);
        Array.prototype.push.apply(educations, line.split(",").map(l => education + ", " + l.trim()));
    } else {
        educations.push(line);
    }
});

rawFile.on("close", error => {
    rawFile.output.write(JSON.stringify(educations, null, 4));
    rawFile.output.end();
});

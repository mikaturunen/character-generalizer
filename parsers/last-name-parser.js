"use strict";

var fs = require("fs");
var path = require("path");
var stream = require("stream");
var readline = require("readline");

var rawFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../assets/raw/lastname-raw")),
    output: fs.createWriteStream(path.join(__dirname, "../assets/last-names.json")),
    terminal: false
});

var lastNames = [];
rawFile.on("line", line => {
    line = line.trim();
    if (line === "") {
        return;
    }

    lastNames.push(line);
});

rawFile.on("close", error => {
    rawFile.output.write(JSON.stringify(lastNames, null, 4));
    rawFile.output.end();
});

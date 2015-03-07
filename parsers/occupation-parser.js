"use strict";

var fs = require("fs");
var path = require("path");
var stream = require("stream");
var readline = require("readline");

var rawFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../assets/raw/occupation-raw")),
    output: fs.createWriteStream(path.join(__dirname, "../assets/occupation.json")),
    terminal: false
});

var occupations = [];
rawFile.on("line", line => {
    line = line.trim();
    if (line === "" || !isNaN(parseInt(line)) || line.indexOf(":") !== -1)  {
        return;
    }

    occupations.push(line);
});

rawFile.on("close", error => {
    rawFile.output.write(JSON.stringify(occupations, null, 4));
    rawFile.output.end();
});

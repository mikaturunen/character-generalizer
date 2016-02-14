"use strict";

/**
 * Gulp usage file for the whole project.
 */

var gulp = require("gulp");
var ts = require("gulp-typescript");
var eventStream = require("event-stream");
var tslint = require("gulp-tslint");
var sequence = require("run-sequence").use(gulp);
var babel = require("gulp-babel");
var path = require("path");
var merge = require("merge2");

var typeScriptSource = [
    "./typedefinitions/backend.d.ts",
    "./lib/**/*.ts"
];

// TYPESCRIPT COMPILATION
gulp.task("typescript", function() {
    var tsResult = gulp
        .src( typeScriptSource )
        // Pipe source to lint
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        // Push through to compiler
        .pipe(ts({
            typescript: require("typescript"),
            target: "es6",
            sourceMap: false,
            removeComments: false,
            declaration: true,
            noImplicitAny: true,
            failOnTypeErrors: false,
            suppressImplicitAnyIndexErrors: true
        }));

	return merge([
		tsResult.dts.pipe(gulp.dest("./lib")),
		tsResult.js.pipe(babel({
            comments: true,
            presets: [ "es2015" ]
        }))
        .pipe(gulp.dest("./lib"))
	]);
});

/**
 * Run with: 'gulp w'
 */
gulp.task("w", function() {
    gulp.watch(typeScriptSource, [ "typescript" ]);
});

/**
 * Run with: 'gulp' or 'gulp default'
 */
gulp.task("default", function() {
    return sequence([ "typescript" ]);
});

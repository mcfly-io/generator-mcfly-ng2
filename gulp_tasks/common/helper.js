/*eslint new-cap:0*/
'use strict';

global.Promise = require('bluebird');

var fs = require('fs');
var gutil = require('gulp-util');
var chalk = require('chalk');
var stripJsonComments = require('strip-json-comments');
var _ = require('lodash');
var path = require('path');
var es = require('event-stream');
var gulp = require('gulp');

/**
 * A generic handler for require('child_process').exec
 * @param  {Object} err - The error object
 * @param  {String} stdout - The stdout string
 * @param  {String} stderr - The stderr string
 * @param  {Object} [opts] - The optional options object
 * @param  {Boolean} [opts.throwOnError=false] - Ask execHandler to throw
 * @param  {Boolean} [opts.stderrIsNotError=false] - Don't treat stderr as error info.
 */
var execHandler = function(err, stdout, stderr, opts) {
    opts = opts || {};
    if (stdout) {
        gutil.log(stdout);
    }
    if (stderr) {
        if (opts.stderrIsNotError) {
            gutil.log(stderr);
        } else {
            gutil.log(chalk.red('Error: ') + stderr);
        }
    }
    if (err) {
        gutil.log(chalk.red('An error occured executing a command line action'));
        gutil.log(chalk.red(err));
        if (opts.throwOnErr) {
            throw err;
        }
    }
};

var readTextFile = function(filename) {
    var body = fs.readFileSync(filename, 'utf8');
    return body;
};

var readJsonFile = function(filename) {
    var body = readTextFile(filename);
    return JSON.parse(stripJsonComments(body));
};

var writeTextFile = function(filename, body) {
    fs.writeFileSync(filename, body);
};

var writeJsonFile = function(filename, json) {
    var body = JSON.stringify(json);
    writeTextFile(filename, body);
};

var filterFiles = function(files, extension) {
    return _.filter(files, function(file) {
        return path.extname(file) === extension;
    });
};

/**
 * Add new sources in a gulp pipeline
 * @returns {Stream} A gulp stream
 * @example
 * gulp.src('')
 * .pipe(addSrc('CHANGELOG.md'))
 * .gulp.dest();
 */
var addSrc = function() {
    var pass = es.through();
    return es.duplex(pass, es.merge(gulp.src.apply(gulp.src, arguments), pass));
};

module.exports = {

    execHandler: execHandler,
    readTextFile: readTextFile,
    readJsonFile: readJsonFile,
    writeTextFile: writeTextFile,
    writeJsonFile: writeJsonFile,
    filterFiles: filterFiles,
    addSrc: addSrc

};

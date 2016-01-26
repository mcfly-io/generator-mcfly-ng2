'use strict';
global.Promise = require('bluebird');
var gulp = require('gulp');
var argv = require('yargs').argv;
var exec = require('gulp-exec');
var concat = require('gulp-concat');
var order = require('gulp-order');
var helper = require('../common/helper');

var constants = require('../common/constants')();

gulp.task('changelog:script', false, function(done) {
    var pkg = helper.readJsonFile('./package.json');
    var options = argv;
    var version = options.version || pkg.version;
    var from = options.from || '';

    gulp.src('')
        .pipe(exec('node ./gulp_tasks/common/changelog-script.js ' + version + ' ' + from, {
            pipeStdout: true,
            maxBuffer: constants.maxBuffer
        }))
        .pipe(concat('updates.md'))
        .pipe(helper.addSrc('CHANGELOG.md'))
        .pipe(order(['updates.md', 'CHANGELOG.md']))
        .pipe(concat('CHANGELOG.md'))
        .pipe(gulp.dest('./'))
        .on('end', done);
});

gulp.task('changelog', 'Generates a CHANGELOG.md file.', ['changelog:script']);

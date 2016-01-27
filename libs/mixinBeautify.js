'use strict';

var filter = require('gulp-filter');
var tap = require('gulp-tap');
var beautify_js = require('js-beautify').js;
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;
var utils = {};
require('./mixinFile').extend(utils);
var beautifyConfig = utils.mixins.readJsonFile('../.jsbeautifyrc', __dirname);

/**
 * Beautify a json stream
 * @param {Array} globs An optional array of globs
 */
var beautifyJson = function(globs) {
    globs = [].concat(globs || ['**/*.json']);
    var extensionFilter = filter(globs, {
        restore: true
    });
    var config = beautifyConfig.js;
    config.indent_size = 2;
    config.max_preserve_newlines = 1;
    this.registerTransformStream([
        extensionFilter,
        tap(function(file, t) {
            var contents = file.contents.toString();
            contents = beautify_js(contents, config);
            file.contents = new Buffer(contents);
        }),
        //prettifyJs(config),
        extensionFilter.restore
    ]);
};

/**
 * Beautify a javascript stream
 * @param {Array} globs An optional array of globs
 */
var beautifyJs = function(globs) {
    globs = [].concat(globs || ['**/*.js']);
    var extensionFilter = filter(globs, {
        restore: true
    });
    var config = beautifyConfig.js;
    config.indent_size = 4;
    config.max_preserve_newlines = 2;
    this.registerTransformStream([
        extensionFilter,
        //prettifyJs(config),
        tap(function(file, t) {
            var contents = file.contents.toString();
            contents = beautify_js(contents, config);
            file.contents = new Buffer(contents);
        }),
        extensionFilter.restore
    ]);
};

/**
 * Beautify a typescript stream
 * @param {Array} globs An optional array of globs
 */
var beautifyTs = function(globs) {
    globs = [].concat(globs || ['**/*.ts']);
    var extensionFilter = filter(globs, {
        restore: true
    });
    var config = beautifyConfig.js;
    config.indent_size = 4;
    config.max_preserve_newlines = 2;
    this.registerTransformStream([
        extensionFilter,
        tap(function(file, t) {
            var contents = file.contents.toString();
            contents = beautify_js(contents, config);
            file.contents = new Buffer(contents);
        }),
        extensionFilter.restore
    ]);
};

/**
 * Beautify an html stream
 * @param {Array} globs An optional array of globs
 */
var beautifyHtml = function(globs) {
    globs = [].concat(globs || ['**/*.html']);
    var extensionFilter = filter(globs, {
        restore: true
    });
    var config = beautifyConfig.html;
    config.max_preserve_newlines = 1;
    this.registerTransformStream([
        extensionFilter,
        tap(function(file, t) {
            var contents = file.contents.toString();
            contents = beautify_html(contents, config);
            file.contents = new Buffer(contents);
        }),
        extensionFilter.restore
    ]);
};

/**
 * Beautify an css stream
 * @param {Array} globs An optional array of globs
 */
var beautifyCss = function(globs) {
    globs = [].concat(globs || ['**/*.css', '**/*.scss', '**/*.sass']);
    var extensionFilter = filter(globs, {
        restore: true
    });
    var config = beautifyConfig.css;
    config.max_preserve_newlines = 1;
    this.registerTransformStream([
        extensionFilter,
        tap(function(file, t) {
            var contents = file.contents.toString();
            contents = beautify_css(contents, config);
            file.contents = new Buffer(contents);
        }),
        extensionFilter.restore
    ]);
};

/**
 * The exported object
 * To apply the mixin execute: this.mixins.extend(generator);
 * @type {Object}
 */
module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.beautifyJson = beautifyJson.bind(generator);
        mixins.beautifyJs = beautifyJs.bind(generator);
        mixins.beautifyTs = beautifyTs.bind(generator);
        mixins.beautifyHtml = beautifyHtml.bind(generator);
        mixins.beautifyCss = beautifyCss.bind(generator);
    }
};

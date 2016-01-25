'use strict';

var filter = require('gulp-filter');
var prettifyJs = require('gulp-js-prettify');
var utils = {};
require('./mixinReadFile').extend(utils);
var beautifConfig = utils.mixins.readJsonFile('../.jsbeautifyrc', __dirname);

/**
 * Beautify a json stream
 * @param {Array} globs An optional array of globs
 */
var beautifyJson = function(globs) {
    globs = [].concat(globs || ['**/*.json']);
    var extensionFilter = filter(globs, {
        restore: true
    });
    var config = beautifConfig.js;
    config.indent_size = 2;
    config.max_preserve_newlines = 1;
    this.registerTransformStream([
        extensionFilter,
        prettifyJs(config),
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
    var config = beautifConfig.js;
    config.indent_size = 4;

    this.registerTransformStream([
        extensionFilter,
        prettifyJs(config),
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
    var config = beautifConfig.js;
    config.indent_size = 4;

    this.registerTransformStream([
        extensionFilter,
        prettifyJs(config),
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
    var config = beautifConfig.html;

    this.registerTransformStream([
        extensionFilter,
        prettifyJs(config),
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
    var config = beautifConfig.css;

    this.registerTransformStream([
        extensionFilter,
        prettifyJs(config),
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

'use strict';
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var stripJsonComments = require('strip-json-comments');

/**
 * Read a text file and return its content as a string
 * @param {String} filename The filename
 * @param {String} dirname The directory name (optional)
 * @returns {String} The file content as a string
 */
var readTextFile = function(filename, dirname) {
    // when dirname is null or undefined we read from local path, otherwise we read from absolute path
    if (dirname && !path.isAbsolute(filename)) {
        filename = path.resolve(path.join(dirname, filename));
    }
    var body = fs.readFileSync(filename, 'utf-8');
    return body;
};

/**
 * Read a json file and return its content as an object
 * @param {String} filename The filename
 * @param {String} dirname The directory name (optional)
 * @returns {Object} The file content as an object
 */
var readJsonFile = function(filename, dirname) {
    var body = readTextFile(filename, dirname);
    return JSON.parse(stripJsonComments(body));
};

/**
 * Create a folder synchronously
 * @param  {String} path The path
 */
var createDirSync = function(path) {
    mkdirp.sync(path);
};

/**
 * Check if a file or path exists
 * @param  {String} file - The file path
 * @returns {Boolean}     - true if exists, false otherwise
 */
var fileExistsSync = function(file) {
    try {
        fs.accessSync(file);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.readTextFile = readTextFile.bind(generator);
        mixins.readJsonFile = readJsonFile.bind(generator);
        mixins.createDirSync = createDirSync;
        mixins.fileExistsSync = fileExistsSync;
    }
};

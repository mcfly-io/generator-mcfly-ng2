'use strict';
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
/**
 * Returns this generator full name so we can change it in package.json without altering the code
 * @returns {String} The generator full name
 */
var getGeneratorFullname = function() {
    var pkg = require('../package.json');
    return pkg.name;
};

/**
 * Returns this generator short name (without generator) so we can change it in package.json without altering the code
 * @returns {String} The generator short name
 */
var getGeneratorShortname = function() {
    var pkg = require('../package.json');
    return pkg.name.replace('generator-', '');
};

/**
 * Return the list of client targets
 * @param {String} clientFolder The client folder
 * @returns {String[]} - An array of client targets
 */
var getClientTargets = function(clientFolder) {
    var re = /^(index-.*\.html|index\.html)$/;
    var files = fs.readdirSync(this.destinationPath(clientFolder));
    var result = _(files)
        .filter(function(name) {
            return re.test(name);
        })
        .map(function(name) {
            var appname = path.basename(name, '.html');
            appname = appname === 'index' ? 'app' : _(appname.split('-')).last();
            return appname;
        })
        .value();
    return result;
};

/**
 * Converts the target name application to suffix
 * @param {String} targetname - The name of the target application
 *
 * @returns {String} - The suffix name of the target application
 */
var targetnameToSuffix = function(targetname) {
    return targetname === 'app' ? '' : '-' + targetname;
};

/**
 * The exported object
 * To apply the mixin execute: this.mixins.extend(generator);
 * @type {Object}
 */
module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.getGeneratorFullname = getGeneratorFullname.bind(generator);
        mixins.getGeneratorShortname = getGeneratorShortname.bind(generator);
        mixins.getClientTargets = getClientTargets.bind(generator);
        mixins.targetnameToSuffix = targetnameToSuffix.bind(generator);
    }
};

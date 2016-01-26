'use strict';

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
 * The exported object
 * To apply the mixin execute: this.mixins.extend(generator);
 * @type {Object}
 */
module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.getGeneratorFullname = getGeneratorFullname.bind(generator);
        mixins.getGeneratorShortname = getGeneratorShortname.bind(generator);
    }
};

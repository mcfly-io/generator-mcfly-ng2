'use strict';
var _ = require('lodash');
/**
 * Clean & camelize a string
 * @param {String} str - The original string
 * @returns {String} - The camelized string
 */
var camelize = function(str) {
    return _.camelCase(_.snakeCase(str));
};

/**
 * Clean & dasherize a string
 * @param {String} str - The original string
 * @returns {String} - The dasherized string
 */
var dasherize = function(str) {
    return _.snakeCase(camelize(str));
};

/**
 * Get the string back with the correct file casing as defined by filenameCase
 * @param {String} str - The original string
 * @returns {String} - A string with the correct casing (i.e. camelCase, snake-case)
 */
var casify = function(str) {
    var filenameCase = this.config.get('filenameCase') || 'camel';
    str = camelize(str);
    if (filenameCase === 'snake') {
        return this.dasherize(str);
    }
    return str;
};

/**
 * Append the component type suffix if filenameSuffix is set to true in the .yo-rc.json
 * @param {String} str - The original string
 * @param {String} suffix - The name of the component's type to append
 * @returns {String} - Either str or str with the suffix appended. (i.e. 'homeCtrl' vs 'homeCtrl.controller')
 */
var suffixify = function(str, suffix) {
    var filenameSuffix = this.config.get('filenameSuffix');
    if (filenameSuffix === true || filenameSuffix === 'true') {
        return str + '.' + suffix;
    }
    return str;
};

/**
 * The exported object
 * To apply the mixin execute: this.mixins.extend(generator);
 * @type {Object}
 */
module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.camelize = camelize.bind(generator);
        mixins.dasherize = dasherize.bind(generator);
        mixins.casify = casify.bind(generator);
        mixins.suffixify = suffixify.bind(generator);
    }
};

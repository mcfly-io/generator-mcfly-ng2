'use strict';
var chalk = require('chalk');
var _ = require('lodash');
var mixinLodash = require('../libs/mixinLodash');
var utils = {};
mixinLodash.extend(utils);

var validateTarget = function(clientTargets) {

    return function(value) {

        if (_.isEmpty(value) || value[0] === '/' || value[0] === '\\') {
            return chalk.red('Please enter a non empty name');
        }
        value = utils.mixins.dasherize(value);
        if (_.includes(clientTargets, value)) {
            return chalk.red('The target name ') + chalk.yellow(value) + chalk.red(' already exists');
        }
        return true;
    };
};

module.exports = {
    validateTarget: validateTarget
};

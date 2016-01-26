'use strict';
var helpers = require('yeoman-test');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var mixinFile = require('../../libs/mixinFile');
var mixinInspector = require('../../libs/mixinInspector');
var utils = {};
mixinFile.extend(utils);
mixinInspector.extend(utils);

/**
 * Get a .yo-rc.json content
 * @param {object} config - A config object to apply
 * @returns {Object} The json configuration object
 */
var getYoRc = function(config) {
    config = config || {};
    var result = {};
    _.defaultsDeep(config, {
        appname: 'dummyappname',
        clientFolder: 'client'
    });
    result[this.mixins.getGeneratorFullname()] = config;
    return result;
};

/**
 * Run a generator
 * @param {String} name - The name of the generator
 * @param {Object} config - The config yo-rc object
 * @param  {String[]} subs - An optional array of sub generators names
 * @returns {RunContext} - runContext
 */
var runGenerator = function(name, config, subs) {
    var deps = _.map(subs, function(sub) {
        return [helpers.createDummyGenerator(), sub];
    });
    var runGen = helpers
        .run(path.join(__dirname, '../../generators/' + name))
        .inTmpDir(function(dir) {
            fs.writeFileSync('.yo-rc.json', config ? JSON.stringify(config) : '{}');
        })
        .withGenerators(deps);
    return runGen;
};

module.exports = {
    mixins: utils.mixins,
    runGenerator: runGenerator,
    getYoRc: getYoRc
};

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

/**
 * Create a proper folder structure for testing the generator on a pre existing project
 * @param {Object} config - The config yo rc object
 * @param {String} dir - The directory of the scaffolded project
 * @param {String} clientFolder - The client folder
 * @param {Strijng} targetname - The name of the target
 */
var createFolderStructure = function(config, dir, clientFolder, targetname) {
    fs.writeFileSync('.yo-rc.json', JSON.stringify(config));
    utils.mixins.createDirSync(path.join(dir, clientFolder));
    utils.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'app'));
    utils.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', targetname));
    utils.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'common'));
    utils.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'dummy'));
    utils.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'toto'));
    utils.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'tata'));
    fs.writeFileSync(path.join(clientFolder, 'scripts', 'app', 'index.html'), '');
    fs.writeFileSync(path.join(clientFolder, 'scripts', 'toto', 'index.html'), '');
    fs.writeFileSync(path.join(clientFolder, 'scripts', 'tata', 'index.html'), '');
};

module.exports = {
    mixins: utils.mixins,
    runGenerator: runGenerator,
    getYoRc: getYoRc,
    createFolderStructure: createFolderStructure
};

'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
var path = require('path');
var fs = require('fs');
//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':interface', function() {
    var targetname = 'dashboard';
    var clientFolder = 'client';
    var componentname = 'my dummy';

    var config = testHelper.getYoRc({
        clientFolder: clientFolder
    });

    before(function(done) {
        var self = this;
        testHelper.runGenerator('interface')
            .withArguments([targetname, componentname])
            .inTmpDir(function(dir) {
                // setting up expected files
                fs.writeFileSync('.yo-rc.json', JSON.stringify(config));
                testHelper.mixins.createDirSync(path.join(dir, clientFolder));
                testHelper.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', targetname));
                testHelper.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'common'));
                testHelper.mixins.createDirSync(path.join(dir, clientFolder, 'scripts', 'dummy'));
                fs.writeFileSync(path.join(clientFolder, 'index.html'), '');
                fs.writeFileSync(path.join(clientFolder, 'index-toto.html'), '');
                fs.writeFileSync(path.join(clientFolder, 'index-tata.html'), '');
            })
            .on('ready', function(generator) {
                self.generator = generator;
            })
            .on('end', done);
    });

    it('creates expected files', function() {
        var pathdir = clientFolder + '/scripts/dashboard/interfaces/';

        var expectedFiles = [
            pathdir + 'my-dummy.interface.ts'
        ];

        assert.file(expectedFiles);

        var expectedContents = [
            [pathdir + 'my-dummy.interface.ts', /export interface MyDummy {/]
        ];
        assert.fileContent(expectedContents);

    });

    it('exposes valid client targets and client modules', function() {
        var configOptions = this.generator.configOptions;
        var clientModules = configOptions.clientModules;
        var clientTargets = configOptions.clientTargets;
        assert.objectContent(clientModules, ['common', 'dashboard', 'dummy']);
        assert.objectContent(clientTargets, ['tata', 'toto', 'app']);
    });
});

'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':pipe', function() {
    var targetname = 'dashboard';
    var clientFolder = 'client';
    var componentname = 'my dummy';

    var config = testHelper.getYoRc({
        clientFolder: clientFolder
    });

    before(function(done) {
        var self = this;
        testHelper.runGenerator('pipe')
            .withArguments([targetname, componentname])
            .inTmpDir(function(dir) {
                // setting up expected files
                testHelper.createFolderStructure(config, dir, clientFolder, targetname);
            })
            .on('ready', function(generator) {
                self.generator = generator;
            })
            .on('end', done);
    });

    it('creates expected files', function() {
        var pathdir = clientFolder + '/scripts/dashboard/pipes/my-dummy/';

        var expectedFiles = [
            pathdir + 'my-dummy.pipe.ts',
            pathdir + 'my-dummy.pipe.spec.ts'
        ];

        assert.file(expectedFiles);

        var expectedContents = [
            [pathdir + 'my-dummy.pipe.ts', /export class MyDummyPipe/],
            [pathdir + 'my-dummy.pipe.ts', /name: 'myDummy'/],
            [pathdir + 'my-dummy.pipe.ts', /transform\(value\: string\, \.\.\.args\: string\[\]\)/],
            [pathdir + 'my-dummy.pipe.spec.ts', /import { MyDummyPipe } from '\.\/my-dummy.pipe';/]
        ];

        assert.fileContent(expectedContents);

    });

    it('exposes valid client targets and client modules', function() {
        var configOptions = this.generator.configOptions;
        var clientModules = configOptions.clientModules;
        var clientTargets = configOptions.clientTargets;
        assert.objectContent(clientModules, ['app', 'common', 'dashboard', 'dummy', 'tata', 'toto']);
        assert.objectContent(clientTargets, ['app', 'tata', 'toto']);
    });
});

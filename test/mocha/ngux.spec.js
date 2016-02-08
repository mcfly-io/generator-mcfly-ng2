'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':ngux', function() {
    var targetname = 'dashboard';
    var clientFolder = 'client';
    var componentname = 'my dummy';

    var config = testHelper.getYoRc({
        clientFolder: clientFolder
    });

    before(function(done) {
        var self = this;
        testHelper.runGenerator('ngux')
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
        var pathdir = clientFolder + '/scripts/dashboard/components/my-dummy/';

        var expectedFiles = [
            pathdir + 'MyDummy.component.ts',
            pathdir + 'MyDummy.component.ngux',
            pathdir + 'MyDummy.component.spec.ts'
        ];

        assert.file(expectedFiles);

        var expectedContents = [
            [pathdir + 'MyDummy.component.ts', /export class MyDummyComponent/],
            [pathdir + 'MyDummy.component.ts', /selector: 'MyDummy'/],
            [pathdir + 'MyDummy.component.ts', /require\('\.\/ngux\/MyDummy\.component\.js'\);/],
            [pathdir + 'MyDummy.component.spec.ts', /import {MyDummyComponent} from '\.\/MyDummy.component.ts';/],
            [pathdir + 'MyDummy.component.spec.ts', /return tcb.createAsync\(MyDummyComponent\)/],
            [pathdir + 'MyDummy.component.ngux', /ng:Selector="MyDummy"/]

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

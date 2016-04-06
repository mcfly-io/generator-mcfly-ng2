'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':component', function() {
    var targetname = 'dashboard';
    var clientFolder = 'client';
    var componentname = 'my dummy';

    var config = testHelper.getYoRc({
        clientFolder: clientFolder
    });

    describe('with target type web', function() {
        before(function(done) {
            var self = this;
            testHelper.runGenerator('component')
                .withArguments([targetname, componentname])
                .withOptions({
                    targettype: 'web'
                })
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
                pathdir + 'my-dummy.component.ts',
                pathdir + 'my-dummy.component.html',
                pathdir + 'my-dummy.component.scss',
                pathdir + 'my-dummy.component.spec.ts'
            ];

            assert.file(expectedFiles);

            var expectedContents = [
                [pathdir + 'my-dummy.component.ts', /export class MyDummyComponent/],
                [pathdir + 'my-dummy.component.ts', /selector: 'my-dummy'/],
                [pathdir + 'my-dummy.component.spec.ts', /import { MyDummyComponent } from '\.\/my-dummy.component';/],
                [pathdir + 'my-dummy.component.spec.ts', /createAsync\(MyDummyComponent\)/],
                [pathdir + 'my-dummy.component.html', /<div>myDummy<\/div>/]

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

    describe('with target type fuse', function() {
        before(function(done) {
            var self = this;
            testHelper.runGenerator('component')
                .withArguments([targetname, componentname])
                .withOptions({
                    targettype: 'fuse'
                })
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
                pathdir + 'myDummy.ts',
                pathdir + 'myDummy.ngux',
                pathdir + 'myDummy.spec.ts',
                pathdir + 'ngux/myDummy.js'
            ];

            assert.file(expectedFiles);

            var expectedContents = [
                [pathdir + 'myDummy.ts', /export class MyDummy/],
                [pathdir + 'myDummy.ts', /selector: 'MyDummy'/],
                [pathdir + 'myDummy.spec.ts', /import { MyDummy } from '\.\/myDummy.ts';/],
                [pathdir + 'myDummy.spec.ts', /createAsync\(MyDummy\)/],
                [pathdir + 'myDummy.ngux', /ng:Selector=\"MyDummy\"/]

            ];
            assert.fileContent(expectedContents);

        });
    });

});
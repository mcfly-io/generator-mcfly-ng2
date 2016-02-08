'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
var path = require('path');
var fs = require('fs');
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
                [pathdir + 'my-dummy.component.spec.ts', /import {MyDummyComponent} from '\.\/my-dummy.component.ts';/],
                [pathdir + 'my-dummy.component.spec.ts', /createAsync\(MyDummyComponent\)/],
                [pathdir + 'my-dummy.component.html', /<div>myDummy<\/div>/]

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
            var pathdir = clientFolder + '/scripts/dashboard/components/my-dummy/';

            var expectedFiles = [
                pathdir + 'myDummy.ts',
                pathdir + 'myDummy.ngux',
                pathdir + 'myDummy.spec.ts'
            ];

            assert.file(expectedFiles);

            var expectedContents = [
                [pathdir + 'myDummy.ts', /export class MyDummy/],
                [pathdir + 'myDummy.ts', /selector: 'MyDummy'/],
                [pathdir + 'myDummy.spec.ts', /import {MyDummy} from '\.\/myDummy.ts';/],
                [pathdir + 'myDummy.spec.ts', /createAsync\(MyDummy\)/],
                [pathdir + 'myDummy.ngux', /ng:Selector=\"MyDummy\"/]

            ];
            assert.fileContent(expectedContents);

        });
    });

});

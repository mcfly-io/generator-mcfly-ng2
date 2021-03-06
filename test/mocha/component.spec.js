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
                [pathdir + 'my-dummy.component.spec.ts', /TestBed\.createComponent\(MyDummyComponent\)/],
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

    describe('with target type ionic2', function() {
        before(function(done) {
            var self = this;
            testHelper.runGenerator('component')
                .withArguments([targetname, componentname])
                .withOptions({
                    targettype: 'ionic2'
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
                [pathdir + 'my-dummy.component.spec.ts', /import { MyDummyComponent } from '\.\/my-dummy.component';/],
                [pathdir + 'my-dummy.component.spec.ts', /createAsync\(MyDummyComponent\)/],
                [pathdir + 'my-dummy.component.html', /<ion-content>myDummy<\/ion-content>/]
            ];

            assert.fileContent(expectedContents);
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
                pathdir + 'my-dummy.component.ts',
                pathdir + 'my-dummy.component.ngux',
                pathdir + 'my-dummy.component.spec.ts'
            ];

            assert.file(expectedFiles);

            var expectedContents = [
                [pathdir + 'my-dummy.component.ts', /export class MyDummyComponent/],
                [pathdir + 'my-dummy.component.ts', /selector: 'my-dummy'/],
                [pathdir + 'my-dummy.component.ts', /template: require\(\'\.\/my-dummy.component.ngux\'\)/],
                [pathdir + 'my-dummy.component.spec.ts', /import { MyDummyComponent } from '\.\/my-dummy\.component';/],
                [pathdir + 'my-dummy.component.spec.ts', /TestBed\.createComponent\(MyDummyComponent\)/],
                [pathdir + 'my-dummy.component.ngux', /ng:Selector=\"my-dummy\"/]

            ];
            assert.fileContent(expectedContents);

        });
    });

    describe('with target type multi', function() {
        before(function(done) {
            var self = this;
            testHelper.runGenerator('component')
                .withArguments([targetname, componentname])
                .withOptions({
                    targettype: 'multi'
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
                pathdir + 'my-dummy.component.ionic.html',
                pathdir + 'my-dummy.component.scss',
                pathdir + 'my-dummy.component.ngux',
                pathdir + 'my-dummy.component.spec.ts'
            ];

            assert.file(expectedFiles);

            var expectedContents = [
                [pathdir + 'my-dummy.component.ts', /export class MyDummyComponent/],
                [pathdir + 'my-dummy.component.ts', /selector: 'my-dummy'/],
                [pathdir + 'my-dummy.component.ts', /CONFIG_TEMPLATE_SUFFIX/],
                [pathdir + 'my-dummy.component.spec.ts', /import { MyDummyComponent } from '\.\/my-dummy\.component';/],
                [pathdir + 'my-dummy.component.spec.ts', /TestBed\.createComponent\(MyDummyComponent\)/],
                [pathdir + 'my-dummy.component.ngux', /ng:Selector=\"my-dummy\"/],
                [pathdir + 'my-dummy.component.ionic.html', /<ion-content>myDummy<\/ion-content>/],
                [pathdir + 'my-dummy.component.html', /<div>myDummy<\/div>/]

            ];
            assert.fileContent(expectedContents);

        });
    });

});

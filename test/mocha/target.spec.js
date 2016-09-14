'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var expect = require('chai').expect;
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');

//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':target', function() {

    describe('with valid web target', function() {

        var targetname = 'dashboardWeb';
        var clientFolder = 'client';
        before(function(done) {
            var config = testHelper.getYoRc({
                clientFolder: clientFolder
            });
            testHelper.runGenerator('target', config, [generatorShortname + ':component'])
                .inTmpDir(function(dir) {
                    // setting up expected files
                    testHelper.createFolderStructure(config, dir, clientFolder, targetname);
                })
                .withArguments([targetname])
                .on('end', done);
        });

        it('creates expected files', function() {

            var expectedFiles = [
                path.join(clientFolder, 'scripts'),
                path.join(clientFolder, 'scripts', 'dashboard-web'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'index.html'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'vendor.ts'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'bootstrap.ts'),
                path.join('test', 'e2e', 'dashboard-web', 'dashboard-web.e2e.ts'),
                path.join('test', 'e2e', 'dashboard-web', 'index.e2e.ts')
            ];
            assert.file(expectedFiles);

            var expectedContents = [
                ['test/e2e/dashboard-web/index.e2e.ts', /dashboard-web\.e2e/]
            ];
            assert.fileContent(expectedContents);

        });

    });

    describe('with valid fuse target', function() {

        var targetname = 'dashboardWeb';
        var clientFolder = 'client';
        before(function(done) {
            var config = testHelper.getYoRc({
                clientFolder: clientFolder
            });
            testHelper.runGenerator('target', config, [generatorShortname + ':component'])
                .inTmpDir(function(dir) {
                    // setting up expected files
                    testHelper.createFolderStructure(config, dir, clientFolder, targetname);
                })
                .withArguments([targetname])
                .withPrompts({
                    targettype: 'fuse'
                })
                .on('end', done);
        });

        it('creates expected files', function() {

            var expectedFiles = [
                path.join(clientFolder, 'scripts'),
                path.join(clientFolder, 'scripts', 'dashboard-web'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'index.html'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'index.ux'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'index.unoproj'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'index.uxl'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'vendor.ts'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'bootstrap.ts'),
                path.join('test', 'e2e', 'dashboard-web', 'dashboard-web.e2e.ts'),
                path.join('test', 'e2e', 'dashboard-web', 'index.e2e.ts')
            ];
            assert.file(expectedFiles);

            var expectedContents = [
                ['test/e2e/dashboard-web/index.e2e.ts', /dashboard-web\.e2e/],
                [path.join(clientFolder, 'scripts', 'dashboard-web', 'vendor.ts'), /fuse_polyfills/],
                //[path.join(clientFolder, 'scripts', 'dashboard-web', 'bootstrap.ts'), /fuse\/bootstrap/],
                [path.join(clientFolder, 'scripts', 'dashboard-web', 'index.unoproj'), /"ApplicationLabel": "dummyappname"/]
            ];

            assert.JSONFileContent(path.join(clientFolder, 'scripts', 'dashboard-web', 'index.unoproj'), {
                Android: { ApplicationLabel: 'dummyappname' }
            });
            assert.fileContent(expectedContents);

        });

    });

    describe('with valid ionic2 target', function() {

        var targetname = 'mobileIonic';
        var clientFolder = 'client';
        before(function(done) {
            var config = testHelper.getYoRc({
                clientFolder: clientFolder
            });
            testHelper.runGenerator('target', config, [generatorShortname + ':component'])
                .inTmpDir(function(dir) {
                    // setting up expected files
                    testHelper.createFolderStructure(config, dir, clientFolder, targetname);
                })
                .withArguments([targetname])
                .withPrompts({
                    targettype: 'ionic2'
                })
                .on('end', done);
        });

        it('creates expected files', function() {

            var expectedFiles = [
                path.join(clientFolder, 'scripts'),
                path.join(clientFolder, 'scripts', 'mobile-ionic'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'index.html'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'main.scss'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'config.xml'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'ionic.config.json'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'package.json'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'vendor.ts'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'bootstrap.ts'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'after_platform_add', '010_install_plugins.js'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'after_plugin_add', '010_register_plugin.js'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'after_plugin_rm', '010_deregister_plugin.js'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'after_prepare', '010_add_platform_class.js'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'after_prepare', '020_remove_sass_from_platforms.js'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'before_platform_add', 'init_directories.js'),
                path.join(clientFolder, 'scripts', 'mobile-ionic', 'hooks', 'after_prepare', '010_add_platform_class.js'),
                path.join('test', 'e2e', 'mobile-ionic', 'mobile-ionic.e2e.ts'),
                path.join('test', 'e2e', 'mobile-ionic', 'index.e2e.ts')
            ];
            assert.file(expectedFiles);

            var expectedContents = [
                ['test/e2e/mobile-ionic/index.e2e.ts', /mobile-ionic\.e2e/],
                [path.join(clientFolder, 'scripts', 'mobile-ionic', 'config.xml'), /email="hi@dummyappname"/],
                [path.join(clientFolder, 'scripts', 'mobile-ionic', 'config.xml'), /href="http:\/\/dummyappname\.com"/],
                [path.join(clientFolder, 'scripts', 'mobile-ionic', 'config.xml'), /dummyappname Team/],
                [path.join(clientFolder, 'scripts', 'mobile-ionic', 'ionic.config.json'), /"name": "dummyappname"/]
            ];

            assert.fileContent(expectedContents);

        });

    });

    describe('with invalid target', function() {
        var targetname = 'toto';
        var clientFolder = 'client';
        before(function(done) {
            var config = testHelper.getYoRc({
                clientFolder: clientFolder
            });
            this.runGenerator = testHelper.runGenerator('target', config, [generatorShortname + ':component'])
                .inTmpDir(function(dir) {
                    // setting up expected files
                    testHelper.createFolderStructure(config, dir, clientFolder, targetname);
                })
                .withArguments([targetname])
                .on('ready', function() {
                    done();
                });
        });

        it('should throw an error', function(done) {
            this.runGenerator.on('error', function(err) {
                expect(err).to.not.be.undefined;
                done();
            });

        });

    });

});

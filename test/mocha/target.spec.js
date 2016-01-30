'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var expect = require('chai').expect;
var fs = require('fs');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');

//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':target', function() {

    describe('with valid target', function() {

        var targetname = 'dashboardWeb';
        var clientFolder = 'client';
        before(function(done) {
            var config = testHelper.getYoRc({
                clientFolder: clientFolder
            });
            testHelper.runGenerator('target', config, [generatorShortname + ':component'])
                .inTmpDir(function(dir) {
                    // setting up expected files
                    fs.writeFileSync('.yo-rc.json', JSON.stringify(config));
                    testHelper.mixins.createDirSync(path.join(dir, clientFolder));
                    fs.writeFileSync(path.join(clientFolder, 'index.html'), '');
                    fs.writeFileSync(path.join(clientFolder, 'index-toto.html'), '');
                    fs.writeFileSync(path.join(clientFolder, 'index-tata.html'), '');
                })
                .withArguments([targetname])
                .on('end', done);
        });

        it('creates expected files', function() {

            var expectedFiles = [
                path.join(clientFolder, 'index-dashboard-web.html'),
                path.join(clientFolder, 'scripts'),
                path.join(clientFolder, 'scripts', 'dashboard-web'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'vendor.ts'),
                path.join(clientFolder, 'scripts', 'dashboard-web', 'bootstrap.ts')
            ];
            assert.file(expectedFiles);

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
                    fs.writeFileSync('.yo-rc.json', JSON.stringify(config));
                    testHelper.mixins.createDirSync(path.join(dir, clientFolder));
                    fs.writeFileSync(path.join(clientFolder, 'index.html'), '');
                    fs.writeFileSync(path.join(clientFolder, 'index-toto.html'), '');
                    fs.writeFileSync(path.join(clientFolder, 'index-tata.html'), '');
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

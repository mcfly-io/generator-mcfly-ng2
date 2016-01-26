'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var fs = require('fs');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');

//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':target', function() {
    var targetname = 'dashboard';
    var clientFolder = 'client';
    before(function(done) {
        var config = testHelper.getYoRc({
            clientFolder: clientFolder
        });
        testHelper.runGenerator('target', config)
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
            path.join(clientFolder, 'index-dashboard.html'),
            path.join(clientFolder, 'scripts'),
            path.join(clientFolder, 'scripts', 'dashboard'),
            path.join(clientFolder, 'scripts', 'dashboard', 'vendor.ts')
        ];
        assert.file(expectedFiles);

    });

});

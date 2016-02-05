'use strict';
var assert = require('yeoman-assert');
var testHelper = require('./testHelper');

var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-mcfly-ng2
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // mcfly-ng2

describe(generatorShortname + ':app', function() {

    var appname = 'Name x';
    var clientFolder = 'myclientfolder';

    describe('with option mobile false', function() {
        before(function(done) {
            testHelper.runGenerator('app', null, [generatorShortname + ':target'])
                .withArguments([appname])
                .withPrompts({
                    clientFolder: clientFolder
                })
                .on('end', done);
        });

        it('creates expected files', function() {
            var expectedFiles = [
                '.eslintignore',
                '.eslintrc.json',
                '.gitignore',
                '.jsbeautifyrc',
                '.npmrc',
                '.yo-rc.json',
                'karma.conf.js',
                'package.json',
                'README.md',
                'spec-bundle.js',
                'tsconfig.json',
                'tslint.json',
                'webpack.config.js',
                'test/sanity.spec.ts',
                'tsd.json',
                'protractor.conf.js',
                'protractor/browserExtension.js',
                clientFolder
            ];
            assert.file(expectedFiles);
            assert.JSONFileContent('package.json', {
                name: 'name-x'
            });
            assert.JSONFileContent('tsconfig.json', {
                filesGlob: [
                    clientFolder + '/**/*.ts',
                    'test/**/*.ts',
                    'typings/tsd.d.ts',
                    '!./node_modules/**/*.ts'
                ]
            });

            var expectedContents = [
                ['README.md', /# name-x/],
                ['spec-bundle.js', new RegExp('context\\(\'./myclientfolder\',')]
            ];
            assert.fileContent(expectedContents);

        });

        it('creates a .yo-rc.json file', function() {
            var content = {};
            content[generatorFullname] = {
                appname: 'name-x',
                clientFolder: clientFolder
            };
            assert.JSONFileContent('.yo-rc.json', content);

        });
    });

    describe('with option mobile true', function() {

    });

    describe('clientFolder', function() {
        before(function(done) {
            testHelper.runGenerator('app', null, [generatorShortname + ':target'])
                .withArguments([appname])
                .withPrompts({
                    clientFolder: 'Dummy Folder'
                })
                .on('end', done);
        });

        it('should be transformed to snake case', function() {
            var content = {};
            content[generatorFullname] = {
                appname: 'name-x',
                clientFolder: 'dummy-folder'
            };
            assert.JSONFileContent('.yo-rc.json', content);
        });
    });

});

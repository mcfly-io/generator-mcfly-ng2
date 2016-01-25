'use strict';
var path = require('path');
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');

describe('generator:target', function() {
    var targetname = 'dashboard';

    before(function(done) {

        testHelper.runGenerator('target')
            .withArguments([targetname])
            .on('end', done);
    });

    it('creates expected files', function() {
        var expectedContents = [
            [path.join(targetname, 'dummyfile.txt'), /this is a file from target/]
        ];
        var expectedFiles = [
            path.join(targetname, 'dummyfile.txt')
        ];
        assert.file(expectedFiles);
        assert.fileContent(expectedContents);

    });

});

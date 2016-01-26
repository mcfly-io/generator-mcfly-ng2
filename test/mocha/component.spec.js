'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
describe('generator:component', function() {
    before(function(done) {
        testHelper.runGenerator('component')
            .on('end', done);
    });

    it('creates expected files', function() {
        var expectedFiles = [
            'dummyfile.txt'
        ];
        assert.file(expectedFiles);

    });
});

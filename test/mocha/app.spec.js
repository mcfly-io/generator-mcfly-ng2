'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-mcfly-ng2:app', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../../generators/app'))
            .withOptions({
                someOption: true
            })
            .withArguments(['name-x'])
            .withPrompts({
                someAnswer: true
            })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'package.json'
        ]);

    });

});
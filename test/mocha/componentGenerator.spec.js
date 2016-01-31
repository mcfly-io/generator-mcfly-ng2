'use strict';
var path = require('path');
var os = require('os');
var expect = require('chai').expect;
var generators = require('yeoman-generator');
var helpers = require('yeoman-test');
var ComponentGenerator = require('../../generators/componentGenerator');

/**
 * Instantiate a simple, dummy generator
 * @private
 * @param {Class} [baseClass] - The base class of the generator, defaults to require('yeoman-generator').base
 * @param {Object} [methods] - An object haskey of methods that should exist on the returned generator, default to a single 'test' method
 * @returns {Generator} - An instance of the generator
 */
var createGenerator = function(baseClass, methods) {
    baseClass = baseClass || generators.base;
    methods = methods || {
        test: function() {
            this.shouldRun = true;
        }
    };
    helpers.setUpTestDirectory(path.join(os.tmpdir(), './temp-test'));
    var env = generators();
    env.registerStub(baseClass.extend(methods), 'dummy');
    return env.create('dummy');
};

describe('validator', function() {

    describe('validateTarget', function() {

        it('with empty basetype should throw an error', function() {
            //var generator = createGenerator(ComponentGenerator);
            var error;
            try {
                createGenerator(ComponentGenerator);
            } catch (e) {
                error = e;
            }
            expect(error).to.be.defined;
        });
    });

});

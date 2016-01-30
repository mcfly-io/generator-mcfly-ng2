'use strict';
var expect = require('chai').expect;

var validators = require('../../generators/validators');

describe('validator', function() {

    describe('validateTarget', function() {

        it('with empty target should not be valid', function() {
            var validator = validators.validateTarget();
            var res = validator('');
            expect(res).to.not.be.true;
        });

        it('with null target should not be valid', function() {
            var validator = validators.validateTarget();
            var res = validator(null);
            expect(res).to.not.be.true;
        });

        it('with undefined target should not be valid', function() {
            var validator = validators.validateTarget();
            var res = validator(undefined);
            expect(res).to.not.be.true;
        });

        it('with exisiting target should not be valid', function() {
            var validator = validators.validateTarget(['target-a', 'target-b', 'target-c']);
            var res = validator('target-a');
            expect(res).to.not.be.true;
        });

        it('should dasherize', function() {
            var validator = validators.validateTarget(['target-a', 'target-b', 'target-c']);
            var res = validator('targetA');
            expect(res).to.not.be.true;
        });

        it('with new target should be valid', function() {
            var validator = validators.validateTarget(['target1', 'target2', 'target3']);
            var res = validator('newtarget', ['target-a', 'target-b', 'target-c']);
            expect(res).to.be.true;
        });

    });

});

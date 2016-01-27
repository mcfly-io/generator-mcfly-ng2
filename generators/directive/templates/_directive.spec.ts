/* beautify ignore:start */
import {
	it,
	//inject,
	//injectAsync,
	beforeEachProviders
	//TestComponentBuilder
} from 'angular2/testing';
import {<%=directivenameClass %>} from './<%=directivename%>.directive.ts';
/* beautify ignore:end */

describe('Directive: <%=directivename%>', () => {

    beforeEachProviders(() => []);

    it('should have a url', () => {
        expect(true).toEqual(true);
    });

});
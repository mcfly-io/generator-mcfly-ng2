/* beautify ignore:start */
import {
	it,
	//inject,
	//injectAsync,
	beforeEachProviders
	//TestComponentBuilder
} from 'angular2/testing';
import {<%=directivenameClass %>} from './<%=directivenameFile%>.directive.ts';
/* beautify ignore:end */

describe('Directive: <%=directivenameClass%>', () => {

    beforeEachProviders(() => []);

    it('should have a url', () => {
        expect(true).toEqual(true);
    });

});
/* beautify ignore:start */
import {it, beforeEachProviders} from 'angular2/testing';
import {<%=directivenameClass %>} from './<%=directivenameFile%>.directive';
/* beautify ignore:end */

describe('Directive: <%=directivenameClass%>', () => {

    beforeEachProviders(() => []);

    it('should have a url', () => {
        expect(true).toEqual(true);
    });

});
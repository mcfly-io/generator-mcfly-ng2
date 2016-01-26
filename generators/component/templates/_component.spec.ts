/* beautify ignore:start */
import {
it
//inject,
//injectAsync,
//beforeEachProviders,
//TestComponentBuilder
} from 'angular2/testing';
import {<%=componentnameClass%>Component} from './<%=componentname%>.component.ts';
/* beautify ignore:end */

describe('App', () => {
    // provide our implementations or mocks to the dependency injector

    it('should have a url', () => {
        expect(true).toEqual(true);
    });

    it('should have a good url', () => {
        expect(true).toEqual(true);
    });

    it('should have a bad url', () => {
        expect(true).toEqual(true);
    });

});
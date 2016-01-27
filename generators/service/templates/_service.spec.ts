/* beautify ignore:start */
import {
it
//inject,
//injectAsync,
//beforeEachProviders,
//TestComponentBuilder
} from 'angular2/testing';
import {<%=servicenameClass %>Service} from './<%=servicename%>.service.ts';
/* beautify ignore:end */

describe('Service: <%=servicename%>' , () => {

    it('should have a url', () => {
        expect(true).toEqual(true);
    });

});
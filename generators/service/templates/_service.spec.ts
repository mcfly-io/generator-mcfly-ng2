/* beautify ignore:start */
import {
    it,
    inject,
    //injectAsync,
    beforeEachProviders
    //TestComponentBuilder
} from 'angular2/testing';
import {<%=servicenameClass%>Service} from './<%=servicenameFile%>.service.ts';
/* beautify ignore:end */

describe('Service: <%=servicenameClass%>Service' , () => {

    beforeEachProviders(() => [<%=servicenameClass %>Service]);

    it('should be defined', inject([<%=servicenameClass %>Service], (service: <%=servicenameClass %>Service) => {
        expect(service).toBeDefined();
    }));

});
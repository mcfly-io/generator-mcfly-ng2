/* beautify ignore:start */
import {it, inject, beforeEachProviders} from 'angular2/testing';
import {<%=servicenameClass%>} from './<%=servicenameFile%>.service.ts';
/* beautify ignore:end */

describe('Service: <%=servicenameClass%>' , () => {

    beforeEachProviders(() => [<%=servicenameClass%>]);

    it('should be defined', inject([<%=servicenameClass%>], (service: <%=servicenameClass%>) => {
        expect(service).toBeDefined();
    }));

});
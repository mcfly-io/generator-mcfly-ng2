import { inject, TestBed } from '@angular/core/testing';
import { <%=servicenameClass%> } from './<%=servicenameFile%>.service';

describe('Module: <%=modulename%>', () => {
    describe('Service: <%=servicenameClass%>' , () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [<%=servicenameClass%>]
            });
        });

        it('should be defined', inject([<%=servicenameClass%>], (service: <%=servicenameClass%>) => {
            expect(service).toBeDefined();
        }));

    });
});
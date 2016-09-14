import { TestBed } from '@angular/core/testing';
import { <%=componentnameClass%>Component } from './<%=componentnameFile%>.component';

describe('Module: <%=modulename%>', () => {
    describe('Component: <%=componentnameClass%>Component', () => {

        beforeEach(() => {  
            TestBed.configureTestingModule({
                declarations: [<%=componentnameClass%>Component],
                providers: [],
                imports: []
            });
        });

        it('should be defined', () => {
            const fixture = TestBed.createComponent(<%=componentnameClass%>Component);
            fixture.detectChanges();
            let element = fixture.debugElement.nativeElement;
            let cmpInstance = fixture.debugElement.componentInstance;
            expect(cmpInstance).toBeDefined();
            expect(element).toBeDefined();
        });

    });
});
/* beautify ignore:start */
import {
	it,
	inject,
	injectAsync,
	beforeEachProviders,
	TestComponentBuilder
} from 'angular2/testing';
import {<%=componentnameClass%>Component} from './<%=componentnameFile%>.component.ts';
/* beautify ignore:end */

describe('Component: <%=componentnameClass%>Component', () => {
    let builder;
    beforeEachProviders(() => []);

    beforeEach(inject([TestComponentBuilder], (tcb) => {
        builder = tcb;
    }));

    it('should be defined', (done) => {
        return builder
            .createAsync(<%=componentnameClass%>Component)
            .then((fixture) => {
                fixture.detectChanges();
                let cmpInstance = fixture.debugElement.componentInstance;
                let element = fixture.debugElement.nativeElement;
                expect(cmpInstance).toBeDefined();
                expect(element).toBeDefined();
                done();
            });
    });

});
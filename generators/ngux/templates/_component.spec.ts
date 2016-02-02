/* beautify ignore:start */
import {
	it,
	//inject,
	injectAsync,
	beforeEachProviders,
	TestComponentBuilder
} from 'angular2/testing';
import {<%=componentnameClass%>Component} from './<%=componentnameClass%>.component.ts';
/* beautify ignore:end */

describe('Component: <%=componentnameClass%>Component', () => {

    beforeEachProviders(() => []);

    it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(<%=componentnameClass%>Component)
            .then((fixture) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
            });
    }));

});
/* beautify ignore:start */
import {it, injectAsync, beforeEachProviders, TestComponentBuilder} from 'angular2/testing';
import {<%=componentnameClass%>Component} from './<%=componentnameFile%>.component';
/* beautify ignore:end */

describe('Component: <%=componentnameClass%>Component', () => {

    beforeEachProviders(() => []);

    it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(<%=componentnameClass%>Component)
            .then((fixture) => {            
                let element = fixture.debugElement.nativeElement;
                let cmpInstance = <<%=componentnameClass%>Component>fixture.debugElement.componentInstance;
                fixture.detectChanges();

                expect(cmpInstance).toBeDefined();
                expect(element).toBeDefined();
            });
    }));

});
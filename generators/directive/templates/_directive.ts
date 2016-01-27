/* beautify ignore:start */
import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
/* beautify ignore:end */

@Directive({
    selector: '[<%=directivename%>]'
})
export class <%=directivenameClass%> {

    constructor(private el: ElementRef, private renderer: Renderer) {
        
    }

}
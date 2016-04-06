import { Directive, ElementRef, Renderer, Input } from 'angular2/core';

@Directive({
    selector: '[<%=directivenameFile%>]'
})
export class <%=directivenameClass%> {

    constructor(private el: ElementRef, private renderer: Renderer) {
        
    }

}
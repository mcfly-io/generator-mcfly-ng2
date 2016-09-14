import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[<%=directivenameFile%>]'
})
export class <%=directivenameClass%> {

    constructor(private el: ElementRef, private renderer: Renderer) {
        
    }

}
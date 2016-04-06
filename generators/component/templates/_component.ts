import { Component } from 'angular2/core';

@Component({
    selector: '<%=componentnameFile%>',
    styles: [require('./<%=componentnameFile%>.component.scss').toString()],
    template: require('./<%=componentnameFile%>.component.html')
})
export class <%=componentnameClass%>Component {

}
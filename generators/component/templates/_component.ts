/* beautify ignore:start */
import {Component} from 'angular2/core';
/* beautify ignore:end */

@Component({
    selector: '<%=componentnameFile%>',
    styles: [require('./<%=componentnameFile%>.component.scss').toString()],
    template: require('./<%=componentnameFile%>.component.html')
})
export class <%=componentnameClass%>Component {

}
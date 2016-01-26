/* beautify ignore:start */
import {Component} from 'angular2/core';
/* beautify ignore:end */

@Component({
    selector: '<%=componentname%>',
    styles: [require('./<%=componentname%>.component.scss').toString()],
    template: require('./<%=componentname%>.component.html')
})
export class <%=componentnameClass%>Component {

}
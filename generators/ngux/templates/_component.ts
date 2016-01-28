/* beautify ignore:start */
import {Component} from 'angular2/core';
require('./ngux/<%=componentnameClass%>.component.js');
/* beautify ignore:end */

@Component({
    selector: '<%=componentnameClass%>',
    template: require('./<%=componentnameClass%>.component.ngux')
})
export class <%=componentnameClass%>Component {

}
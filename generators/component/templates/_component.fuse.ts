import { Component } from 'angular2/core';
require('./ngux/<%=componentname%>.js');

@Component({
    selector: '<%=componentnameClass%>',
    template: require('./<%=componentname%>.ngux')
})
export class <%=componentnameClass%> {

}
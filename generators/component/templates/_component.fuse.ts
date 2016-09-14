import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '<%=componentnameFile%>',
    template: require('./<%=componentnameFile%>.component.ngux'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=componentnameClass%>Component {

}
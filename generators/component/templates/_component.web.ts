import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '<%=componentnameFile%>',
    styles: [require('./<%=componentnameFile%>.component.scss').toString()],
    template: require('./<%=componentnameFile%>.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=componentnameClass%>Component {

}
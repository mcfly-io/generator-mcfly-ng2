import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '<%=componentnameFile%>',
    styles: CONFIG_IS_FUSE ? null : [require('./<%=componentnameFile%>.component.scss').toString()],
    template: require('./<%=componentnameFile%>.component' + CONFIG_TEMPLATE_SUFFIX),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%=componentnameClass%>Component {

}
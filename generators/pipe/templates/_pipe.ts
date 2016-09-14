import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: '<%=pipename%>' })
export class <%=pipenameClass%>Pipe implements PipeTransform {
	transform(value: string, ...args: string[]): any {
		return value;
	}
}

/* beautify ignore:start */
import {
	it
	//inject,
	//injectAsync,
	//beforeEachProviders,
	//TestComponentBuilder
} from 'angular2/testing';
import {<%=pipenameClass %>Pipe} from './<%=pipenameFile%>.pipe.ts';
/* beautify ignore:end */

describe('Pipe: <%=pipenameClass%>Pipe', () => {
	let pipe: <%=pipenameClass %>Pipe;

	beforeEach(() => {
		pipe = new <%=pipenameClass %>Pipe();
	});

	it('should be defined', () => {
		expect(pipe).toBeDefined();
	});

    it('transforms abc to abc', () => {
        expect(pipe.transform('abc')).toEqual('abc');
    });

});
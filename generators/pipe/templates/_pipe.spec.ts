/* beautify ignore:start */
import {
	it
	//inject,
	//injectAsync,
	//beforeEachProviders,
	//TestComponentBuilder
} from 'angular2/testing';
import {<%=pipenameClass %>Pipe} from './<%=pipename%>.pipe.ts';
/* beautify ignore:end */

describe('Pipe: <%=pipename%>', () => {
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
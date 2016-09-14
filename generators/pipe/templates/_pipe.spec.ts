import { <%=pipenameClass %>Pipe } from './<%=pipenameFile%>.pipe';

describe('Module: <%=modulename%>', () => {
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
});
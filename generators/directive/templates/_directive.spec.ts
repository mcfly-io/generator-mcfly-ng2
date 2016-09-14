import {
    fakeAsync,
    tick,
    TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { <%=directivenameClass%> } from './<%=directivenameFile%>.directive';

describe('Module: <%=modulename%>', () => {
    describe('Directive: <%=directivenameClass%>', () => {
        // Create a test component to test directives
        @Component({
            template: '<div <%=directivename%> >Content</div>'
        })
        class TestComponent { }

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    <%=directivenameClass%>,
                    TestComponent
                ]
            });
        });

        it('should be defined', fakeAsync(() => {
            TestBed.compileComponents().then(() => {

                const fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                tick();
                const element = fixture.debugElement.query(By.css('div'));
                expect(element.nativeElement).toBeDefined();

            });
        }));

    });
});

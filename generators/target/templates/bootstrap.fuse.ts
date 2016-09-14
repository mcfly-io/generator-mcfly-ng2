import { FuseModule, platformFuseDynamic } from '../../../fuse/platform.ts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';

@NgModule({
    imports: [
        FuseModule, CommonModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [MainComponent],
    bootstrap: [MainComponent]
})
class MainModule { }

if (!window.fusejs) {
    document.addEventListener('DOMContentLoaded', () => {
        if (!(<any>window).bootstraped) {
            (<any>window).bootstraped = true;
            platformFuseDynamic().bootstrapModule(MainModule);
        }
    }, false);
} else {
    window.fusejs.bootstraper = () => platformFuseDynamic().bootstrapModule(MainModule);
}

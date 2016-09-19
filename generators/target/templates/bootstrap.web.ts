/// <reference path="../../../node_modules/zone.js/dist/zone.js.d.ts" />
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';

if (CONFIG_MODE === 'prod') {
    enableProdMode();
}

import { MainComponent } from './components/main/main.component';
@NgModule({
    imports: [
        BrowserModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [MainComponent],
    providers: [],
    bootstrap: [MainComponent]
})
class MainModule { }

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(MainModule);
});

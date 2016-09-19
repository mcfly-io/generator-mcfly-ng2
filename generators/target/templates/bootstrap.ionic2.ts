import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MainComponent } from './components/main/main.component';

if (CONFIG_MODE === 'prod') {
    enableProdMode();
}

@NgModule({
    declarations: [MainComponent],
    imports: [
        IonicModule.forRoot(MainComponent)
    ],
    providers: [],
    bootstrap: [IonicApp],
    entryComponents: [MainComponent]
})
class MainModule { }

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(MainModule);
});
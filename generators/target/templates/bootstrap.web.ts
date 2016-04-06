import { provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { MainComponent } from './components/main/main.component';

//import {enableProdMode} from 'angular2/core';
//enableProdMode();

bootstrap(MainComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {
    useClass: HashLocationStrategy
})]);
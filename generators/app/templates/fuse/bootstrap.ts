/* beautify ignore:start */
import {isPresent, Type} from 'angular2/src/facade/lang';
//import {Promise} from 'angular2/src/facade/async';
//import {Promise, PromiseWrapper} from 'angular2/src/facade/async';
import {platform, PLATFORM_DIRECTIVES, PLATFORM_PIPES, ApplicationRef} from 'angular2/core'; //ComponentRef
import {provide, Provider} from 'angular2/src/core/di';
//import {bind, provide, Provider} from 'angular2/src/core/di';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {Renderer, RootRenderer} from 'angular2/src/core/render/api';
import {FuseRenderer, FuseRootRenderer} from './renderer';
import {FuseDomAdapter} from './dom_adapter';
import {XHR} from 'angular2/src/compiler/xhr';
import {FileSystemXHR} from './xhr';
//import {Parse5DomAdapter} from 'angular2/src/platform/server/parse5_adapter';
import {ExceptionHandler} from 'angular2/src/facade/exception_handler';
import {APPLICATION_COMMON_PROVIDERS} from 'angular2/src/core/application_common_providers';
import {COMPILER_PROVIDERS} from 'angular2/src/compiler/compiler';
import {PLATFORM_COMMON_PROVIDERS} from 'angular2/src/core/platform_common_providers';
import {COMMON_DIRECTIVES, COMMON_PIPES, FORM_PROVIDERS} from 'angular2/common';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy} from 'angular2/router';
import {FuseLocationStrategy} from './fuse_location_strategy';
/* beautify ignore:end */

export type ProviderArray = Array<Type | Provider | any[]>;

export function fuseBootstraper(customProviders: ProviderArray = null): ApplicationRef { //Promise<ComponentRef> {//appComponentType: any,
    FuseDomAdapter.makeCurrent();

    let fuseProviders: ProviderArray = [
        FuseRenderer,
        provide(Renderer, {
            useClass: FuseRenderer
        }),
        FuseRootRenderer,
        provide(RootRenderer, {
            useClass: FuseRootRenderer
        }),
        provide(XHR, {
            useClass: FileSystemXHR
        }),
        provide(ExceptionHandler, {
            useFactory: () => new ExceptionHandler(DOM, true),
            deps: []
        }),

        provide(PLATFORM_PIPES, {
            useValue: COMMON_PIPES,
            multi: true
        }),
        provide(PLATFORM_DIRECTIVES, {
            useValue: COMMON_DIRECTIVES,
            multi: true
        }),

        APPLICATION_COMMON_PROVIDERS,
        COMPILER_PROVIDERS,
        PLATFORM_COMMON_PROVIDERS,
        FORM_PROVIDERS,
        HTTP_PROVIDERS,
        JSONP_PROVIDERS
    ];

    let appProviders = [
        ROUTER_PROVIDERS,

        provide(LocationStrategy, {
            useClass: FuseLocationStrategy
        })
    ];
    if (isPresent(customProviders)) {
        appProviders.push(customProviders);
    }

    let app = platform(fuseProviders).application(appProviders);
    return app; //.bootstrap(appComponentType);
}

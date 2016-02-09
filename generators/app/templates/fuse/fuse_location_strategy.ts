/* beautify ignore:start */
import {Injectable} from 'angular2/core';
import {EventListener} from 'angular2/src/facade/browser';
//import {isBlank} from 'angular2/src/facade/lang';
//import {BaseException} from 'angular2/src/facade/exceptions';
import {LocationStrategy} from 'angular2/router';
//import {PlatformLocation} from './platform_location';
/* beautify ignore:end */

/**
 * `PathLocationStrategy` is a {@link LocationStrategy} used to configure the
 * {@link Location} service to represent its state in the
 * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
 * browser's URL.
 *
 * `PathLocationStrategy` is the default binding for {@link LocationStrategy}
 * provided in {@link ROUTER_PROVIDERS}.
 *
 * If you're using `PathLocationStrategy`, you must provide a provider for
 * {@link APP_BASE_HREF} to a string representing the URL prefix that should
 * be preserved when generating and recognizing URLs.
 *
 * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * ### Example
 *
 * ```
 * import {Component, provide} from 'angular2/core';
 * import {
 *   APP_BASE_HREF
 *   ROUTER_DIRECTIVES,
 *   ROUTER_PROVIDERS,
 *   RouteConfig,
 *   Location
 * } from 'angular2/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *   constructor(location: Location) {
 *     location.go('/foo');
 *   }
 * }
 *
 * bootstrap(AppCmp, [
 *   ROUTER_PROVIDERS, // includes binding to PathLocationStrategy
 *   provide(APP_BASE_HREF, {useValue: '/my/app'})
 * ]);
 * ```
 */
@Injectable()
export class FuseLocationStrategy extends LocationStrategy {
    private baseHref: string;

    // constructor(private _platformLocation: any,
    //     @Optional() @Inject(APP_BASE_HREF) href ? : string) {
    //     super();

    //     this.baseHref = '/';
    // }

    constructor() {
        console.log('FuseLocationStrategy');
        super();
        this.baseHref = '/';
    }

    onPopState(fn: EventListener): void {
        //
    }

    getBaseHref(): string {
        return this.baseHref;
    }

    prepareExternalUrl(internal: string): string {
        //return joinWithSlash(this.baseHref, internal);
        return this.baseHref + '/' + internal;
    }

    path(): string {
        return this.baseHref;
        //return this._platformLocation.pathname + normalizeQueryParams(this._platformLocation.search);
    }

    pushState(state: any, title: string, url: string, queryParams: string) {
        //var externalUrl = this.prepareExternalUrl(url + normalizeQueryParams(queryParams));
        //this._platformLocation.pushState(state, title, externalUrl);
    }

    replaceState(state: any, title: string, url: string, queryParams: string) {
        //var externalUrl = this.prepareExternalUrl(url + normalizeQueryParams(queryParams));
        //this._platformLocation.replaceState(state, title, externalUrl);
    }

    forward(): void {
        //this._platformLocation.forward();
    }

    back(): void {
        //this._platformLocation.back();
    }
}

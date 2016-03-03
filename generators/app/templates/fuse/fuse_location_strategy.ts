import { Injectable } from 'angular2/core';
import { EventListener } from 'angular2/src/facade/browser';
import { LocationStrategy } from 'angular2/router';

@Injectable()
export class FuseLocationStrategy extends LocationStrategy {
    private baseHref: string;

    constructor() {
        //console.log('FuseLocationStrategy');
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

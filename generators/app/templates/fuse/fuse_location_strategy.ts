import { Injectable } from '@angular/core';
import { LocationStrategy, PlatformLocation } from '@angular/common';

interface LocationState {
    state: any;
    title: string;
    url: string;
    queryParams: string;
}

@Injectable()
export class FuseLocationStrategy extends LocationStrategy {
    private states = new Array<LocationState>();
    private popStateCallbacks = new Array<(_: any) => any>();

    path(): string {
        let state = this.peekState();
        return state ? state.url : '/';
    }

    prepareExternalUrl(internal: string): string {
        return internal;
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        this.pushStateInternal(state, title, url, queryParams);
    }

    pushStateInternal(state: any, title: string, url: string, queryParams: string): void {
        this.states.push({ state: state, title: title, url: url, queryParams: queryParams });
    }

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        if (this.states.length > 0) {
            let oldState = this.states.pop();
            this.callPopState(oldState, true);
        }
        this.pushStateInternal(state, title, url, queryParams);
    }

    forward(): void {
        //log('NSLocationStrategy.forward');
        throw new Error('Not implemented');
    }

    back(): void {
        let state = this.states.pop();
        this.callPopState(state, true);
    }

    onPopState(fn: (_: any) => any): void {
        //log('NSLocationStrategy.onPopState');
        this.popStateCallbacks.push(fn);
    }

    getBaseHref(): string {
        //log('NSLocationStrategy.getBaseHref()');
        return '';
    }

    private callPopState(state: LocationState, pop = true) {
        let change = { url: state.url, pop: pop };
        for (let fn of this.popStateCallbacks) {
            fn(change);
        }
    }

    private peekState(): LocationState {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1];
        }
        return null;
    }
}

@Injectable()
export class FusePlatformLocation extends PlatformLocation {

    constructor(private locationStrategy: FuseLocationStrategy) {
        super();
    }

    getBaseHrefFromDOM(): string {
        return '/';
    }

    onPopState(fn: any): void {
        this.locationStrategy.onPopState(fn);
    }

    onHashChange(fn: any): void { }

    get search(): string {
        return '';
    }

    get hash(): string {
        return '';
    }

    get pathname(): string {
        return this.locationStrategy.path();
    }
    set pathname(newPath: string) { }

    pushState(state: any, title: string, url: string): void {
        this.locationStrategy.pushState(state, title, url, null);
    }

    replaceState(state: any, title: string, url: string): void {
        this.locationStrategy.replaceState(state, title, url, null);
    }

    forward(): void {
        throw new Error('FusePlatformLocation.forward() not implemend');
    }

    back(): void {
        this.locationStrategy.back();
    }
}

export const FUSE_ROUTER_PROVIDERS: any[] = [
    FuseLocationStrategy,
    { provide: LocationStrategy, useExisting: FuseLocationStrategy },

    FusePlatformLocation,
    { provide: PlatformLocation, useExisting: FusePlatformLocation }
];

export function fuseProvideRouter(APP_ROUTER_PROVIDERS: Array<any>) {
    return [
        ...(APP_ROUTER_PROVIDERS || []),
        ...FUSE_ROUTER_PROVIDERS
    ];
}

import { ElementSchemaRegistry } from '@angular/compiler';
import { Sanitizer } from '@angular/core';
import { Parse5DomAdapter } from './parse5_adapter';
import { setRootDomAdapter } from './private_import_platform-browser';

//import { Parse5DomAdapter ,  } from '@angular/platform-server';
//import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
//import { Type } from '@angular/core';

export enum SecurityContext { NONE, HTML, STYLE, SCRIPT, URL, RESOURCE_URL }

export class FuseElementSchemaRegistry extends ElementSchemaRegistry {
    hasProperty(tagName: string, propName: string): boolean {
        return true;
    }

    getMappedPropName(propName: string): string {
        return propName;
    }

    getDefaultComponentElementName(): string {
        return 'ng-component';
    }

    securityContext(tagName: string, propName: string): any {
        return SecurityContext.NONE;
    }

    hasElement(tagName: string, schemas: any) {
        return true;
    }
}

export class FuseSanitizationService extends Sanitizer {
    sanitize(context: SecurityContext, value: string): string {
        return value;
    }
}

export class FuseDomAdapter extends Parse5DomAdapter {
    static makeCurrent() {
        setRootDomAdapter(new FuseDomAdapter());
    }

    hasProperty(element: any, name: string) {
        return true;
    }

    supportsCookies() {
        return false;
    }

    getCookie(name: any): any {
        //throw 'not implemented';
        return null;
    }

    setCookie(name: any, value: any) {
        throw 'not implemented';
    }
}

// import { XHR } from '@angular/compiler';

// export class FileSystemXHR extends XHR {
//     get(url: string): Promise<string> {
//         return super.get.call(arguments);
//     }
// }

import { Injectable } from '@angular/core';
import { Http, XHRBackend, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, XSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export class FuseXSRFStrategy {
    public configureRequest(req: any) {
        // noop
    }
}

@Injectable()
export class FuseHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response | any> {
        return super.get(url, options);
    }
};

export const FUSE_HTTP_PROVIDERS: any[] = [
    { provide: XSRFStrategy, useValue: new FuseXSRFStrategy() }, {
        provide: Http,
        useFactory: (backend: any, options: any, nsFileSystem: any) => {
            return new FuseHttp(backend, options);
        },
        deps: [XHRBackend, RequestOptions]
    }
];

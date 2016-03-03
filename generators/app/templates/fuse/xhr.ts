import { XHR } from 'angular2/src/compiler/xhr';

export class FileSystemXHR extends XHR {
    get(url: string): Promise<string> {
        return super.get.call(arguments);
    }
}

/* beautify ignore:start */
//import {path, knownFolders, File} from "file-system";
import {XHR} from 'angular2/src/compiler/xhr';
/* beautify ignore:end */

export class FileSystemXHR extends XHR {
    get(url: string): Promise < string > {
        // let appDir = knownFolders.currentApp().path;
        // let templatePath = path.join(appDir, url);

        // if (!File.exists(templatePath)) {
        // 	throw new Error(`File ${url} does not exist.`);
        // }
        // let templateFile = File.fromPath(templatePath);
        // return templateFile.readText();
        console.log('XHR.get', arguments);
        return super.get.call(arguments);
    }
}

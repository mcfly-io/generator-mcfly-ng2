/* beautify ignore:start */
import {Parse5DomAdapter} from 'angular2/src/platform/server/parse5_adapter';
import {setRootDomAdapter} from 'angular2/src/platform/dom/dom_adapter';
import {Type} from 'angular2/src/facade/lang';
/* beautify ignore:end */

export class FuseDomAdapter extends Parse5DomAdapter {
    static makeCurrent() {
        setRootDomAdapter(new FuseDomAdapter());
    }

    getXHR(): Type {
        //console.log('getXHR!', arguments);
        return null;
    }

    hasProperty(element, name: string) {
        return true;
    }
}
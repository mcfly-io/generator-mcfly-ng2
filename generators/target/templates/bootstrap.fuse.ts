/* beautify ignore:start */
import {fuseBootstraper} from '../../../fuse/bootstrap';
import {Main} from './components/main/main';
/* beautify ignore:end */

let providers = [];
if (!window.fusejs) {
    fuseBootstraper(providers).bootstrap(Main);
} else {
    window.fusejs.rootComponent = Main;
    if (!window.fusejs.bootstraper) {
        window.fusejs.bootstraper = fuseBootstraper(providers);
    }
}

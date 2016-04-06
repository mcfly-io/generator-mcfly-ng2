import { fuseBootstraper } from '../../../fuse/bootstrap';
import { Main } from './components/main/main';

let providers = [];
let bootstraper = fuseBootstraper(providers);
if (!window.fusejs) {
    bootstraper.bootstrap(Main);
} else {
    window.fusejs.rootComponent = Main;
    if (!window.fusejs.bootstraper) {
        window.fusejs.bootstraper = bootstraper;
    }
}
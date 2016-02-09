let utils = require('zone.js/lib/utils.ts');

//import {patchEventTargetMethods} from 'zone.js/lib/utils';
window.Zone = global['Zone'];
window.zone = global['zone'];
if (window.fusejs) {
    utils.patchEventTargetMethods(global['XMLHttpRequest'] && global['XMLHttpRequest'].prototype);
}

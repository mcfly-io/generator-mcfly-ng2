let zoneUtils = require('zone.js/lib/common/utils.ts');
// window.Zone = global['Zone'];
// window.zone = global['zone'];
if (window.fusejs) {
    zoneUtils.patchEventTargetMethods(global['XMLHttpRequest'] && global['XMLHttpRequest'].prototype);
}

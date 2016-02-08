let patchSetClearFunction = require('zone.js/lib/patch/functions').patchSetClearFunction;
let patchSetFunction = require('zone.js/lib/patch/functions').patchSetFunction;
let promisePatch = require('zone.js/lib/patch/promise');

function apply() {
    patchSetClearFunction(global, ['timeout', 'interval', 'immediate']);
    patchSetFunction(global, ['requestAnimationFrame']);

    promisePatch.apply();
}

export default {
    apply: apply
}

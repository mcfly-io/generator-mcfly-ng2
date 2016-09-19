/* eslint-disable */
if (!window.isFuse) {
    //window = this;
    window.addEventListener = window.EventTarget.prototype.addEventListener;
    window.removeEventListener = window.EventTarget.prototype.removeEventListener;
    require('fuse/localStorage.js');
}
/* eslint-enable */

'use strict';
var Observable = require('FuseJS/Observable');
window.isFuse = true;
window.fusejs = window.fusejs || {
    isFuse: true,
    renderer: null,
    requireCacheAfterVendor: {},
    timers: [],
    geoLocation: require('FuseJS/GeoLocation'),
    camera: require('FuseJS/Camera'),
    context: Observable()
};

function loadRenderer() {
    if (!window.fusejs.angularRenderer) {

        var AngularRendererClass = require('fuse/fuseRenderer.js');
        window.fusejs.angularRenderer = new AngularRendererClass(window.fusejs.context);
        require('polyfills');
        require('vendor');
        window.fusejs.requireCacheAfterVendor = {};

        for (var moduleId in window.requireCache) {
            if (window.requireCache[moduleId]) {
                window.fusejs.requireCacheAfterVendor[moduleId] = true;
            }
        }
    }
}

function reloadBundle() {
    /// BUNDLE: REFRESH ON EVERY CHANGE
    if (window.clearWebpackCache) {
        window.clearWebpackCache(window.fusejs.requireCacheAfterVendor);
    }
    require('bundle');
}

function bootstrapAngular() {
    /// DISPOSE PREVIOUS APPLICATION : ON EVERY CHANGE
    //if (window.fusejs.angularRenderer) {
    //window.fusejs.angularRenderer.reset();
    // window.fusejs.context.clear();
    // if (window.fusejs.applicationRef) {
    //     try {
    //         window.fusejs.applicationRef.dispose();
    //     } catch (err) {}
    // }
    //}
    /// BOOTSTRAP APPLICATION : ON EVERY CHANGE
    return window.fusejs.bootstraper();
}

function reloadAngular() {
    //console.log('reloadAngular');
    //console.log(window.isLoading);
    window.isLoading = true;
    loadRenderer();
    reloadBundle();
    bootstrapAngular().then(function(applicationRef) {
        window.fusejs.applicationRef = applicationRef;
        setTimeout(function() {
            //console.log('resetting is loading');
            window.isLoading = false;
        }, 20000);
        //window.fusejs.angularRenderer.print();
    });
}
try {
    if (!window.isLoading) {
        reloadAngular();
    }
} catch (err) {
    /* eslint-disable */
    console.log(err);
    /* eslint-enable */
}
module.exports = window.fusejs.context;

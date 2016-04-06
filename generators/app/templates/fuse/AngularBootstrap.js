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

function debounce(fn, delay) {
    return function() {
        var self = this;
        var args = arguments;
        if (window.fusejs.timers.length > 0) {
            for (var i = 0; i < window.fusejs.timers.length; i++) {
                clearTimeout(window.fusejs.timers[i]);
            }
            window.fusejs.timers = [];
        }
        var timer = setTimeout(function() {
            fn.apply(self, args);
        }, delay);
        window.fusejs.timers.push(timer);
    };
}

function loadRenderer() {
    if (!window.fusejs.angularRenderer) {
        // window.context = {
        //     id: 'root',
        //     depth: 0,
        //     children: Observable()
        // };
        var AngularRendererClass = require('AngularRenderer');
        window.fusejs.angularRenderer = new AngularRendererClass(window.fusejs.context);
        require('common');
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
    if (window.fusejs.angularRenderer) {
        window.fusejs.angularRenderer.reset();
        //window.fusejs.context.children.clear();
        window.fusejs.context.clear();
        if (window.fusejs.applicationRef) {
            try {
                window.fusejs.applicationRef.dispose();
            } catch (err) {}
        }
    }
    /// BOOTSTRAP APPLICATION : ON EVERY CHANGE
    return window.fusejs.bootstraper.bootstrap(window.fusejs.rootComponent);
}

function reloadAngular() {
    window.isLoading = true;
    loadRenderer();
    reloadBundle();
    bootstrapAngular().then(function(applicationRef) {
        window.fusejs.applicationRef = applicationRef;
        window.fusejs.angularRenderer.print();
    });
}
try {
    debounce(reloadAngular, 5000)();
} catch (err) {

}
module.exports = window.fusejs.context;

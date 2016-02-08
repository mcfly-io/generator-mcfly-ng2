import './renderer';
import './dom_adapter';
import './zone';
import './xhr';

window.requireCache = require.cache;

window.clearWebpackCache = function(originalCache) {
    let cache = require.cache;
    //     delete require.cache[require.resolve('bundle')];
    delete cache[0];
    for (let moduleId in cache) {
        if (!originalCache[moduleId]) {
            delete cache[moduleId];
        }
    }
    require.cache = cache;
};

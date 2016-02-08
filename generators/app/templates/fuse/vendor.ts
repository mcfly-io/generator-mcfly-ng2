import './renderer';
import './dom_adapter';
import './zone';
import './xhr';

window.requireCache = require.cache;

window.clearWebpackCache = function(originalCache) {
    let cache = require.cache;
    //     delete require.cache[require.resolve('bundle')];
    console.log('deleting cache for module ' + 0);
    delete cache[0];
    for (let moduleId in cache) {
        if (!originalCache[moduleId]) {
            console.log('deleting cache for module ' + moduleId);
            delete cache[moduleId];
        }
    }
    console.log('clearWebpackCache');
    require.cache = cache;
};

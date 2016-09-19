// assert = function() {
//     return true;
// };
// console.log('window');
// console.dir(window);
// 
// console.log('global');
// console.dir(global);
//window['console'] = console;
window.JSON = JSON;
window.RegExp = RegExp;
window.Map = Map;
window.Set = Set;
window.Reflect = Reflect;
window.Promise = Promise;
window.Math = Math;
console.warn = console.log;
console.error = console.log;

window.requireCache = require.cache;
window.clearWebpackCache = function(originalCache: any) {

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

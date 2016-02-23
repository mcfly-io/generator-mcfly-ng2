///<reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts"/>
import 'es6-shim';
// assert = function() {
//     return true;
// };
// console.log('window');
// console.dir(window);
// 
// console.log('global');
// console.dir(global);

window.JSON = JSON;
window.RegExp = RegExp;
window.Map = Map;
window.Set = Set;
window.Reflect = Reflect;
window.Promise = Promise;
window.Math = Math;
console.warn = console.log;
console.error = console.log;


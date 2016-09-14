'use strict';
var Observable = require('FuseJS/Observable');
window.ngux_types = window.ngux_types || {};

function EventFactory() {
    this.callbacks = [];
    var cl = this.callbacks;
    this.raise = function(args) {
        //console.log('raise');
        // if (args && args.value) {
        //     console.log('Value From outside: ' + args.value);
        // }
        cl.forEach(function(callback) {
            callback(args);
        });
    };
}

module.exports = function(context) {

    var tree = {};
    var toBeAttached = {};
    var counter = 1;
    var rootId;

    var consoleLog = function(text) {
        //console.log(text);
    };

    this.isScope = function(type) {
        return type && window.ngux_types[type];
    };

    this.createElement = function(type, isRoot) {
        var id = type + '_' + counter++;

        if (isRoot) {
            consoleLog('root');
            rootId = id;
            tree[id] = context;
        } else {
            if (this.isScope(type)) {
                var elm;
                consoleLog('createElement type: ' + type);
                elm = new window.ngux_types[type](id, null, Observable, EventFactory);
                elm.type = type;
                // temporary fix
                // if (!elm.children) {
                //     elm.children = new Observable();
                // }
                //debug only
                elm.id = id;
                tree[id] = elm;
            }
            //consoleLog('parent found parentElement Depth ' + parentElement.depth + ',  child Depth' + (parentElement.depth + 1));

        }
        //consoleLog(type + ' has been added to tree with id: ' + id);
        return id;
    };

    this.setAttribute = function(id, attribute, value) {
        //consoleLog('setting node  ' + id + '  in tree for ' + attribute + ' : ' + value);
        //console.log('setting node  ' + id + '  in tree for ' + attribute + ' : ' + value);
        if (!tree[id] || !tree[id][attribute]) {
            //consoleLog('couldnt find attribute ' + attribute + ' on object ' + id);
            return;
        }
        tree[id][attribute].value = value;
        //consoleLog(JSON.stringify(tree[rootId], null, 4));
    };

    var addToCollection = function(parentElement, collectionName, element) {
        if (parentElement === context) {
            parentElement.value = element;
        } else if (parentElement[collectionName || 'children']) {
            parentElement[collectionName || 'children'].add(element);
        } else if (parentElement.router_outlet) {
            parentElement.router_outlet.add(element);
        } else {
            consoleLog(collectionName + ' not found for object');
        }
    };

    var removeFromCollection = function(parentElement, collectionName, element) {
        if (parentElement === context) {
            parentElement.clear();
        } else if (parentElement[collectionName || 'children']) {
            parentElement[collectionName || 'children'].tryRemove(element);
        } else if (parentElement.router_outlet) {
            parentElement.router_outlet.tryRemove(element);
        } else {
            consoleLog(collectionName + ' not found for object');
        }
    };

    this.renderElement = function(id, type, parentId, collectionName, scope) {
        consoleLog('renderElement ' + id + ' parentId ' + parentId);
        if (!this.isScope(type)) {
            consoleLog(type + 'is not a scope');
            if (toBeAttached[id] && toBeAttached[id].length > 0 && tree[parentId]) {
                consoleLog('found to be attached childs for  ' + id + ' in  parentId ' + parentId);
                var parentEl = tree[parentId];
                toBeAttached[id].forEach(function(el) {
                    addToCollection(parentEl, collectionName, el);
                });
                //delete toBeAttached[id];
            } else if (!tree[id] && tree[parentId]) {
                consoleLog('go up');
                tree[id] = tree[parentId];
            } else {
                consoleLog('do nothing no scope');
            }
        } else if (parentId) {
            var element = tree[id];
            if (scope) {
                element.type = scope;
            }
            if (tree[parentId]) {
                var parentElement = tree[parentId];
                consoleLog('renderElement ' + id + ' parentId ' + parentId + ' in ' + 'children: ' + (collectionName || 'children'));
                addToCollection(parentElement, collectionName, element);
            } else {
                consoleLog('renderElement ' + id + ' waiting to be attached to ' + parentId);
                toBeAttached[parentId] = toBeAttached[parentId] || [];
                toBeAttached[parentId].push(element);
            }
        } else {
            consoleLog('do nothing no parent');
        }
        //consoleLog(JSON.stringify(tree[rootId], null, 4));
    };

    this.removeElement = function(id, type, parentId, collectionName) {
        consoleLog('removeElement ' + id + ' parentId ' + parentId);
        if (!this.isScope(type)) {
            if (toBeAttached[id] && toBeAttached[id].length > 0 && tree[parentId]) {
                consoleLog('found to be removed childs for  ' + id + ' in  parentId ' + parentId);
                var parentEl = tree[parentId];
                toBeAttached[id].forEach(function(el) {
                    removeFromCollection(parentEl, collectionName, el);
                });
                delete toBeAttached[id];
            }
        } else if (parentId && tree[parentId]) {
            var parentElement = tree[parentId];
            var element = tree[id];
            consoleLog('removeElement ' + id + ' parentId ' + parentId + ' in ' + 'children' + (collectionName || 'children'));
            // setTimeout(function() {
            removeFromCollection(parentElement, collectionName, element);
            //}, parentElement.type === 'ScopeRouter' ? 500 : 0);
        } else {
            consoleLog('do nothing no parent');
        }
    };

    this.setEventListener = function(id, type, eventName, callback) {
        consoleLog('setEventListener ' + id + eventName);
        // if (callback) {
        //     consoleLog('callback is defined' + callback.toString());
        // }
        //if (this.isScope(type)) {
        var element = tree[id];
        if (element) {
            if (element[eventName + '_event']) {
                element[eventName + '_event'].callbacks.push(callback);
            } else {
                consoleLog('event not defined ' + eventName + '_event' + ' for id: ' + id);
            }
        }
        //}
    };

    this.removeAllListeners = function(id, type) {
        // consoleLog('setEventListener'); // + id + eventName);
        // if (callback) {
        //     consoleLog('callback is defined' + callback.toString());
        // }
        //if (this.isScope(type)) {
        var element = tree[id];
        if (element) {
            for (var a in element) {
                if (element[a] instanceof EventFactory) {
                    element[a].callbacks = [];
                }
            }
        }
        //}
        // element[eventName + '_event'].callbacks.splice(element[eventName + '_event'].callbacks.indexOf(callback), 1);
    };

    // function findParentRouter(id) {
    //     var element = tree[id];
    //     consoleLog('findParentRouter' + element.id + ' ' + element.parentId + ' ' + tree[element.parentId].type);
    //     while (element.parentId && tree[element.parentId].type !== 'router-outlet') {
    //         consoleLog('findParentRouter' + element.id + ' ' + element.parentId + ' ' + tree[element.parentId].type);
    //         element = tree[element.parentId];
    //     }
    //     return element;
    // };

    this.navigateTo = function(page, id) {
        consoleLog('navigateTo ' + page);
        //findParentRouter(id);
        if (tree[id]) {
            tree[id].var1.value = page;
        }
    };

    this.reset = function() {
        consoleLog('angularRenderer reset');
        tree = {};
        toBeAttached = {};
        counter = 1;
    };

    this.print = function() {
        consoleLog(JSON.stringify(tree[rootId], null, 4));
    };

};

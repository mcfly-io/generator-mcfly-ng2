// Polyfills
import '../../../fuse/fuse_polyfills';
(<any>global).process = {};
const oldToString = Object.prototype.toString;
Object.prototype.toString = function() {
    return '[object process]';
};
import 'zone.js/dist/zone.js';
Object.prototype.toString = oldToString;
delete global.process;

// External
import 'rxjs';
import 'reflect-metadata';

import 'angular2/core';
import 'angular2/http';
import 'angular2/src/facade/lang';
import 'angular2/src/facade/async';
import 'angular2/src/core/di';
import 'angular2/src/platform/dom/dom_adapter';
import 'angular2/src/compiler/xhr';
import 'angular2/src/core/render/api';
import 'angular2/src/facade/exception_handler';
import 'angular2/src/core/application_common_providers';
import 'angular2/src/compiler/compiler';
import 'angular2/src/core/platform_common_providers';
import 'angular2/common';
import 'angular2/router';
import '../../../fuse/zone';

// Other vendors for example jQuery or Lodash

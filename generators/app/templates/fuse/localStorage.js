  'use strict';
  (function(window, fuseStorage) {
      var sessionData = '';
      var Storage = function(type) {

          function setData(data) {
              data = JSON.stringify(data);
              if (type === 'session') {
                  sessionData = data;
              } else {
                  fuseStorage.writeSync('FuseLocalStorage', data);
              }
          }

          function clearData() {
              if (type === 'session') {
                  sessionData = '';
              } else {
                  fuseStorage.deleteSync('FuseLocalStorage');
              }
          }

          function getData() {
              if (type === 'session') {
                  try {
                      return JSON.parse(sessionData);
                  } catch (e) {
                      return {};
                  }
              } else {
                  try {
                      return JSON.parse(fuseStorage.readSync('FuseLocalStorage'));
                  } catch (e) {
                      return {};
                  }
              }
          }

          var data = getData();
          var length = 0;

          function numKeys() {
              var n = 0;
              for (var k in data) {
                  if (data.hasOwnProperty(k)) {
                      n += 1;
                  }
              }
              return n;
          }

          var retVal = {};
          Object.defineProperty(retVal, 'clear', {
              value: function() {
                  data = {};
                  clearData();
                  length = numKeys();
              },
              enumerable: false
          });

          Object.defineProperty(retVal, 'getItem', {
              value: function(key) {
                  key = encodeURIComponent(key);
                  return data[key] === undefined ? null : data[key];
              },
              enumerable: false
          });

          Object.defineProperty(retVal, 'key', {
              value: function(index) {
                  // not perfect, but works
                  var ctr = 0;
                  for (var k in data) {
                      if (ctr === index) {
                          return decodeURIComponent(k);
                      } else { ctr++; }
                  }
                  return null;
              },
              enumerable: false
          });

          Object.defineProperty(retVal, 'removeItem', {
              value: function(key) {
                  key = encodeURIComponent(key);
                  delete data[key];
                  setData(data);
                  length = numKeys();
              },
              enumerable: false
          });

          Object.defineProperty(retVal, 'setItem', {
              value: function(key, value) {
                  key = encodeURIComponent(key);
                  data[key] = String(value);
                  setData(data);
                  length = numKeys();
              },
              enumerable: false
          });

          Object.defineProperty(retVal, 'length', {
              get: function() {
                  return length;
              },
              enumerable: false
          });

          return retVal;
      };

      Storage.prototype.constructor = Storage;
      window.Storage = Storage;
      window.localStorage = new Storage('local');
      window.sessionStorage = new Storage('session');
  })(window, require('FuseJS/Storage'));

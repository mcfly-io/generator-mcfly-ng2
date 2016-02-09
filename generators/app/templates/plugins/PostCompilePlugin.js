'use strict';
var fs = require('fs');

function PostCompilePlugin(options) {
    this.options = options || {};
}

PostCompilePlugin.prototype.apply = function(compiler) {
    var self = this;
    compiler.plugin('done', function() {

        if (!self.options.filename) {
            return;
        }
        setTimeout(function() {
            fs.appendFile(self.options.filename, '\n/***/', function() {});
        }, 500);

    });
};

module.exports = PostCompilePlugin;
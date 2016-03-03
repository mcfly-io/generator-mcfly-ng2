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
        if (!self.options.isFuse) {
            return;
        }
        setTimeout(function() {
            fs.appendFile(self.options.filename, '\n/***/', function() {});
        }, 2000);

    });
};

module.exports = PostCompilePlugin;
'use strict';
global.Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var dir = Promise.promisifyAll(require('node-dir'));
var path = require('path');

// taken from copy-webpack-plugin:
var getOutputDir = function getOutputDir(compiler) {
    if (compiler.options.output.path && compiler.options.output.path !== '/') {
        return compiler.options.output.path;
    }

    var outputPath = compiler.options.devServer.outputPath;

    if (!outputPath || outputPath === '/') {
        throw new Error('ChangeModePlugin: to use webpack-dev-server, devServer.outputPath must be defined in the webpack config');
    }

    return outputPath;
};

function ChangeModePlugin(options) {
    this.options = options || {};
}

ChangeModePlugin.prototype.apply = function(compiler) {
    var self = this;
    compiler.plugin('done', function() {
        if (!self.options.folder) {
            return;
        }
        var mode = self.options.mode || 33261;
        var targetDir = path.resolve(getOutputDir(compiler), self.options.folder);
        dir.filesAsync(targetDir)
            .map(function(file) {
                return fs.chmodAsync(file, mode);
            });
    });
};

module.exports = ChangeModePlugin;

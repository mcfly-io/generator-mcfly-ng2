'use strict';

var getRepository = function() {
    var repository = 'https://github.com/mcfly-io/generator-mcfly-ng2';
    try {
        var helper = require('./helper');
        var packageJson = helper.readJsonFile('./package.json');
        var _ = require('lodash');
        if (_.isString(packageJson.repository)) {
            repository = packageJson.repository.replace('.git', '');
        } else {
            repository = packageJson.repository.url.replace('.git', '');
        }
    } catch (err) {}
    return repository;
};

var getAppname = function() {
    var appname;
    try {
        var helper = require('./helper');
        var packageJson = helper.readJsonFile('./package.json');
        appname = packageJson.name;
    } catch (err) {}
    return appname;
};

module.exports = function() {
    var cwd = process.env.INIT_CWD || '';
    var clientFolder = 'client'; // the source file folder
    var constants = {
        cwd: cwd,
        maxBuffer: 1024 * 500,
        appname: getAppname(),
        clientFolder: clientFolder,
        repository: getRepository(),
        versionFiles: ['./package.json', './bower.json', './' + clientFolder + '/config*.xml']
    };

    return constants;
};

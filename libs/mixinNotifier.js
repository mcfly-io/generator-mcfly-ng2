'use strict';
var updateNotifier = require('update-notifier');

/**
 * Notify if the generator should be updated
 * @param  {Object} pkg The package.json for the generator
 */
var notifyUpdate = function(pkg) {
    var notifier = updateNotifier({
        packageName: pkg.name,
        packageVersion: pkg.version,
        updateCheckInterval: 1
    });

    if (notifier.update) {
        if (notifier.update.latest !== pkg.version) {
            notifier.notify();
            //this.utils.shell.exit(1);
        }
    }
};

module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.notifyUpdate = notifyUpdate.bind(generator);

    }
};
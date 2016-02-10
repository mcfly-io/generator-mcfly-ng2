'use strict';
var updateNotifier = require('update-notifier');
var chalk = require('chalk');
var stringLength = require('string-length');
var repeating = require('repeating');

/**
 * Generates the message to display when a new update is available
 * @param  {Object} update - The update object coming from update-notifier
 * @returns {String}        - The message to display
 */
var makeMessage = function(update) {
    var line1 = ' Update available: ' + chalk.green.bold(update.latest) +
        chalk.dim(' (current: ' + update.current + ')') + ' ';
    var line2 = ' Run ' + chalk.blue('npm install -g ' + update.name) +
        ' to update. ';
    var contentWidth = Math.max(stringLength(line1), stringLength(line2));
    var line1rest = contentWidth - stringLength(line1);
    var line2rest = contentWidth - stringLength(line2);
    var top = chalk.yellow('┌' + repeating('─', contentWidth) + '┐');
    var bottom = chalk.yellow('└' + repeating('─', contentWidth) + '┘');
    var side = chalk.yellow('│');

    var message =
        '\n\n' +
        top + '\n' +
        side + line1 + repeating(' ', line1rest) + side + '\n' +
        side + line2 + repeating(' ', line2rest) + side + '\n' +
        bottom + '\n';
    return message;
};

/**
 * Notify if the generator should be updated
 * @param  {Object} pkg - The package.json for the generator
 * @param {Function} cb - The callback function
 */
var notifyUpdate = function(pkg, cb) {
    updateNotifier({
        pkg: pkg,
        callback: function(error, update) {
            if (error) {
                cb();
                return;
            }
            if (update.latest !== update.current) {
                var message = makeMessage(update);
                cb(message);
            } else {
                cb();
            }
        }
    });
};

module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.notifyUpdate = notifyUpdate.bind(generator);
    }
};

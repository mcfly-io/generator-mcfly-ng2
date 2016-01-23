'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.log('constructor', this.appname);

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('appname', {
            type: String,
            required: true
        });
        this.appname = _.camelCase(this.appname);
        // ***** arguments ********

        // ****** options *********
        // To access options later use this.options.optionName
        this.option('coffee');
        // ****** options *********
    },

    initializing: function() {
        this.log('initializing');
    },

    configuring: function() {
        this.log('configuring');
    },

    prompting: function() {
        this.log('prompting');
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the awesome ' + chalk.red('generator-mcfly-ng2') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        }];

        this.prompt(prompts, function(answers) {
            this.answers = answers;
            // To access answers later use this.answers.someOption;
            done();
        }.bind(this));
    },

    writing: function() {
        this.log('writing', this.answers.name);
        this.fs.copy(
            this.templatePath('dummyfile.txt'),
            this.destinationPath('dummyfile.txt')
        );
    },

    conflicts: function() {
        this.log('conflicts');
    },

    install: function() {
        this.log('install');
        this.installDependencies();
    },

    end: function() {
        this.log('end');
    }
});

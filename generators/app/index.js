'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mixinLodash = require('../../libs/mixinLodash');
var mixinBeautify = require('../../libs/mixinBeautify');
var mixinReadFile = require('../../libs/mixinReadFile');
var mixinNotifier = require('../../libs/mixinNotifier');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        // applying mixins
        mixinLodash.extend(this);
        mixinBeautify.extend(this);
        mixinReadFile.extend(this);
        mixinNotifier.extend(this);

        // Registering file transforms
        this.mixins.beautifyJson();

        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this.mixins.camelize(this.appname);

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('appname', {
            desc: 'The application name',
            type: String,
            optional: true,
            required: false,
            defaults: this.appname
        });

        this.argument('mobile', {
            desc: 'Indicates that the app is a mobile app',
            type: Boolean,
            optional: true,
            required: false,
            defaults: false
        });

        this.appname = this.mixins.camelize(this.appname);
        // ***** arguments ********

        // ****** options *********
        // To access options later use this.options.optionName
        this.option('skip-install', {
            desc: 'Skip the bower and node installations',
            type: Boolean,
            defaults: false
        });
        // ****** options *********

    },

    initializing: function() {
        this.pkg = this.mixins.readJsonFile('../../package.json', __dirname);
        this.mixins.notifyUpdate(this.pkg);
    },

    configuring: function() {

    },

    prompting: function() {
        this.log('prompting');
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the awesome ' + chalk.yellow('generator-mcfly-ng2') + ' generator!'));

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

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                appname: this.appname
            }
        );

    },

    conflicts: function() {
        this.log('conflicts');
    },

    install: function() {
        this.log('install');
        this.npmInstall(null, {
            skipInstall: this.options['skip-install']
        });
    },

    end: function() {
        this.log('end');
    }
});
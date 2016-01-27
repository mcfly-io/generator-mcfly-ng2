'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');
var mixinInspector = require('../../libs/mixinInspector');
var mixinFile = require('../../libs/mixinFile');
var mixinBeautify = require('../../libs/mixinBeautify');
var mixinLodash = require('../../libs/mixinLodash');

module.exports = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);

        // applying mixins
        mixinInspector.extend(this);
        mixinFile.extend(this);
        mixinBeautify.extend(this);
        mixinLodash.extend(this);

        // Registering file transforms
        this.mixins.beautifyJson();
        this.mixins.beautifyHtml();
        this.mixins.beautifyTs();

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('targetname', {
            desc: 'The target name',
            type: String,
            optional: true,
            required: false
        });
        // ***** arguments ********

        // // ****** options *********
        // To access options later use this.options.optionName
        this.option('clientFolder', {
            desc: 'The client folder',
            type: String,
            hide: true
        });
        // ****** options *********
    },

    initializing: function() {
        this.configOptions = this.config.getAll();
        this.configOptions.clientFolder = this.configOptions.clientFolder || this.options.clientFolder;
        this.configOptions.clientTargets = this.mixins.getClientTargets(this.configOptions.clientFolder);

    },

    prompting: function() {
        var self = this;
        var done = this.async();
        var prompts = [{
            type: 'input',
            name: 'targetname',
            default: self.targetname,
            when: function() {
                return !self.targetname || self.targetname.length <= 0;
            },
            validate: function(value) {
                if (_.isEmpty(value) || value[0] === '/' || value[0] === '\\') {
                    return chalk.red('Please enter a non empty name');
                }
                if (_.contains(self.configOptions.clientTargets, value)) {
                    return chalk.red('The target name ') + chalk.yellow(value) + chalk.red(' already exists');
                }
                return true;
            },
            message: 'What is the name of your target application?'
        }];
        this.prompt(prompts, function(answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },

    configuring: function() {

        this.targetname = this.mixins.camelize(this.targetname || this.answers.targetname);
        this.suffix = this.mixins.targetnameToSuffix(this.targetname);

        if (_.contains(this.configOptions.clientTargets, this.targetname)) {
            this.log.error(chalk.red('The target name ') + chalk.yellow(this.targetname) + chalk.red(' already exists'));
            this.env.error();
        }

        this.composeWith(this.mixins.getGeneratorShortname() + ':component', {
            args: [this.targetname, 'main']
        });
    },

    writing: function() {

        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts')));
        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname)));

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(path.join(this.configOptions.clientFolder, 'index' + this.suffix + '.html'))
        );

        this.fs.copyTpl(
            this.templatePath('vendor.ts'),
            this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'vendor.ts'))
        );
        this.fs.copyTpl(
            this.templatePath('bootstrap.ts'),
            this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'bootstrap.ts'))
        );
    }
});

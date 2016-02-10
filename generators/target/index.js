'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var mixinInspector = require('../../libs/mixinInspector');
var mixinFile = require('../../libs/mixinFile');
var mixinBeautify = require('../../libs/mixinBeautify');
var mixinLodash = require('../../libs/mixinLodash');
var validators = require('../validators');

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
            default: 'app',
            when: function() {
                return !self.targetname || self.targetname.length <= 0;
            },
            validate: validators.validateTarget(self.configOptions.clientTargets),
            message: 'How would you like to name your target application?'
        }, {
            type: 'list',
            name: 'targettype',
            default: 'web',
            message: 'What type of target application do you want to create?',
            choices: ['web', 'fuse']
        }];
        this.prompt(prompts, function(answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },

    configuring: function() {

        this.targetname = this.mixins.dasherize(this.targetname || this.answers.targetname);
        this.targettype = this.answers.targettype;
        this.suffix = this.mixins.targetnameToSuffix(this.targetname);

        var validator = validators.validateTarget(this.configOptions.clientTargets);
        var validateResult = validator(this.targetname);
        if (validateResult !== true) {
            this.log.error(validateResult);
            this.env.error();
        }

        this.composeWith(this.mixins.getGeneratorShortname() + ':component', {
            args: [this.targetname, 'main'],
            options: {
                targettype: this.targettype // passing the targettype to component
            }
        });
    },

    writing: function() {

        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts')));
        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname)));

        switch (this.targettype) {
            case 'web':
                this.fs.copyTpl(
                    this.templatePath('vendor.ts'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'vendor.ts'))
                );
                this.fs.copyTpl(
                    this.templatePath('bootstrap.ts'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'bootstrap.ts'))
                );

                this.fs.copy(
                    this.templatePath('index.template.html'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'index.html'))
                );
                break;

            case 'fuse':
                this.fs.copyTpl(
                    this.templatePath('vendor.fuse.ts'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'vendor.ts'))
                );
                this.fs.copyTpl(
                    this.templatePath('bootstrap.fuse.ts'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'bootstrap.ts'))
                );
                this.fs.copy(
                    this.templatePath('index.html'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'index.html'))
                );

                this.fs.copy(
                    this.templatePath('index.fuse.ux'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'index.ux')), {
                        targetname: this.targetname
                    }
                );

                this.fs.copy(
                    this.templatePath('index.fuse.unoproj'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'index.unoproj'))
                );
                this.fs.copy(
                    this.templatePath('index.fuse.uxl'),
                    this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'index.uxl'))
                );
                break;
        }

        this.fs.copyTpl(
            this.templatePath('app.e2e.ts'),
            this.destinationPath(path.join('test', 'e2e', this.targetname, this.targetname + '.e2e.ts')), {
                targetname: this.targetname
            }
        );

        this.fs.copyTpl(
            this.templatePath('index.e2e.ts'),
            this.destinationPath(path.join('test', 'e2e', this.targetname, 'index.e2e.ts')), {
                targetname: this.targetname
            }
        );
    }
});

'use strict';
var generators = require('yeoman-generator');
var path = require('path');
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
        //this.mixins.beautifyTs();

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('modulename', {
            desc: 'The module name',
            type: String,
            optional: true,
            required: false
        });
        this.modulename = this.mixins.camelize(this.modulename);

        this.argument('componentname', {
            desc: 'The component name',
            type: String,
            optional: true,
            required: false
        });
        this.componentname = this.mixins.camelize(this.componentname);
        // ***** arguments ********
    },

    initializing: function() {
        this.configOptions = this.config.getAll();
        this.configOptions.clientTargets = this.mixins.getClientTargets(this.configOptions.clientFolder);
        this.configOptions.clientModules = this.mixins.getClientModules(this.configOptions.clientFolder);
    },

    prompting: function() {
        var self = this;
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'modulename',
            choices: this.configOptions.clientModules,
            message: 'What is the name of the module?',
            when: function() {
                return !self.modulename || self.modulename.length <= 0;
            }
        }, {
            type: 'input',
            name: 'componentname',
            message: 'What is your component name?',
            when: function() {
                return !self.componentname || self.componentname.length <= 0;
            }
        }];

        this.prompt(prompts, function(answers) {
            this.answers = answers;
            // To access props later use this.answers.someOption;
            done();
        }.bind(this));
    },

    configuring: function() {
        this.modulename = this.mixins.camelize(this.modulename || this.answers.modulename);
        this.componentname = this.mixins.camelize(this.componentname || this.answers.componentname);
    },

    writing: function() {

        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.modulename)));

        var destinationPath = path.join(this.configOptions.clientFolder, 'scripts', this.modulename, 'components', this.componentname);
        this.mixins.createDirSync(destinationPath);

        this.fs.copyTpl(
            this.templatePath('_component.ts'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.component.ts')), {
                componentname: this.componentname,
                componentnameClass: this.mixins.classify(this.componentname)
            }
        );
        this.fs.copyTpl(
            this.templatePath('_component.html'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.component.html')), {
                componentname: this.componentname
            }
        );
        this.fs.copyTpl(
            this.templatePath('_component.scss'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.component.scss'))
        );
        this.fs.copyTpl(
            this.templatePath('_component.spec.ts'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.component.spec.ts')), {
                componentname: this.componentname,
                componentnameClass: this.mixins.classify(this.componentname)
            }
        );
    }
});

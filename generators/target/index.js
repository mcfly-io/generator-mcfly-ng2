'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var mixinInspector = require('../../libs/mixinInspector');
var mixinFile = require('../../libs/mixinFile');
var mixinBeautify = require('../../libs/mixinBeautify');

module.exports = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);

        // applying mixins
        mixinInspector.extend(this);
        mixinFile.extend(this);
        mixinBeautify.extend(this);

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
    },

    initializing: function() {
        this.configOptions = this.config.getAll();
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
                    return 'Please enter a non empty name';
                }
                if (_.contains(self.configOptions.clientTargets, value)) {
                    return 'The target name ' + value + ' already exists';
                }
                return true;
            },
            message: 'What is the name of your target application?'
        }];
        this.prompt(prompts, function(answers) {

            this.answers = answers;
            this.targetname = this.targetname || answers.targetname;
            this.suffix = this.mixins.targetnameToSuffix(this.targetname);
            done();
        }.bind(this));
    },

    writing: function() {

        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts')));
        this.mixins.createDirSync(this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname)));

        this.fs.copy(
            this.templatePath('index.html'),
            this.destinationPath(path.join(this.configOptions.clientFolder, 'index' + this.suffix + '.html'))
        );

        this.fs.copy(
            this.templatePath('vendor.ts'),
            this.destinationPath(path.join(this.configOptions.clientFolder, 'scripts', this.targetname, 'vendor.ts'))
        );
    }
});

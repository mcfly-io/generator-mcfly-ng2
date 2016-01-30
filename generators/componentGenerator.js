'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var mixinInspector = require('../libs/mixinInspector');
var mixinFile = require('../libs/mixinFile');
var mixinBeautify = require('../libs/mixinBeautify');
var mixinLodash = require('../libs/mixinLodash');
module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        if (!this.basetype) {
            throw 'basetype is undefined';
        }
        if (!this.basefolder) {
            throw 'basetype is undefined';
        }

        // applying mixins
        mixinInspector.extend(this);
        mixinFile.extend(this);
        mixinBeautify.extend(this);
        mixinLodash.extend(this);

        // Registering file transforms
        this.mixins.beautifyJson();
        this.mixins.beautifyHtml();
        this.mixins.beautifyTs();
        this.mixins.beautifyCss();

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('modulename', {
            desc: 'The module name',
            type: String,
            optional: true,
            required: false
        });
        this.modulename = this.mixins.camelize(this.modulename);

        this.argument(this.basetype + 'name', {
            desc: 'The ' + this.basetype + ' name',
            type: String,
            optional: true,
            required: false
        });
        this[this.basetype + 'name'] = this.mixins.camelize(this[this.basetype + 'name']);
        // ***** arguments ********

    },

    initializing: function() {
        this.configOptions = this.config.getAll();
        this.configOptions.clientTargets = this.mixins.getClientTargets(this.configOptions.clientFolder);
        this.configOptions.clientModules = this.mixins.getClientModules(this.configOptions.clientFolder);
    },

    prompting: function(done) {
        done = done || this.async();
        var self = this;

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
            name: self.basetype + 'name',
            message: 'What is your ' + self.basetype + ' name?',
            when: function() {
                return !self[self.basetype + 'name'] || self[self.basetype + 'name'].length <= 0;
            }
        }];

        this.prompt(prompts, function(answers) {
            this.answers = answers;
            // To access props later use this.answers.someOption;
            done();
        }.bind(this));

    },

    configuring: function() {
        this.modulename = this.mixins.dasherize(this.modulename || this.answers.modulename);
        this[this.basetype + 'name'] = this.mixins.camelize(this[this.basetype + 'name'] || this.answers[this.basetype + 'name']);
        this[this.basetype + 'nameFile'] = this.isDasherize ? this.mixins.dasherize(this[this.basetype + 'name']) : this[this.basetype + 'name'];
        this[this.basetype + 'nameClass'] = this.mixins.classify(this[this.basetype + 'name']);
    },

    writing: function() {
        var destinationPath = path.join(this.configOptions.clientFolder, 'scripts', this.modulename, this.basefolder);
        if (this.hasOwnFolder) {
            destinationPath = path.join(destinationPath, this[this.basetype + 'nameFile']);
        }
        this.mixins.createDirSync(destinationPath);
        return destinationPath;
    }

});

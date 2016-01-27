'use strict';
var path = require('path');
var ComponentGenerator = require('../componentGenerator');
var Generator = module.exports = ComponentGenerator.extend({

    constructor: function() {
        this.basetype = 'directive'; // this will create a property this.directivename
        this.basefolder = 'directives'; // this is the folder for the components
        this.hasOwnFolder = false; // to specify if the component files should be in a subfolder
        ComponentGenerator.apply(this, arguments);
    },

    initializing: function() {
        Generator.__super__.initializing.apply(this, arguments);
    },

    prompting: function() {
        var done = this.async();
        Generator.__super__.prompting.call(this, done);

    },

    configuring: function() {
        Generator.__super__.configuring.apply(this, arguments);
    },

    writing: function() {
        var destinationPath = Generator.__super__.writing.apply(this, arguments);

        this.fs.copyTpl(
            this.templatePath('_directive.ts'),
            this.destinationPath(path.join(destinationPath, this.directivename + '.directive.ts')), {
                directivename: this.directivename,
                directivenameClass: this.mixins.classify(this.directivename)
            }
        );

        this.fs.copyTpl(
            this.templatePath('_directive.spec.ts'),
            this.destinationPath(path.join(destinationPath, this.directivename + '.directive.spec.ts')), {
                directivename: this.directivename,
                directivenameClass: this.mixins.classify(this.directivename)
            }
        );

    }

});

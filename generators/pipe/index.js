'use strict';
var path = require('path');
var ComponentGenerator = require('../componentGenerator');
var Generator = module.exports = ComponentGenerator.extend({

    constructor: function() {
        this.basetype = 'pipe'; // this will create a property this.pipename
        this.basefolder = 'pipes'; // this is the folder for the components
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
            this.templatePath('_pipe.ts'),
            this.destinationPath(path.join(destinationPath, this.pipename + '.pipe.ts')), {
                pipename: this.pipename,
                pipenameClass: this.mixins.classify(this.pipename)
            }
        );

        this.fs.copyTpl(
            this.templatePath('_pipe.spec.ts'),
            this.destinationPath(path.join(destinationPath, this.pipename + '.pipe.spec.ts')), {
                pipename: this.pipename,
                pipenameClass: this.mixins.classify(this.pipename)
            }
        );

    }

});

'use strict';
var path = require('path');
var ComponentGenerator = require('../componentGenerator');
var Generator = module.exports = ComponentGenerator.extend({

    constructor: function() {
        this.basetype = 'interface'; // this will create a property this.interfacename
        this.basefolder = 'interfaces'; // this is the folder for the components
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
            this.templatePath('_interface.ts'),
            this.destinationPath(path.join(destinationPath, this.interfacename + '.interface.ts')), {
                interfacename: this.interfacename,
                interfacenameClass: this.mixins.classify(this.interfacename)
            }
        );
    }

});

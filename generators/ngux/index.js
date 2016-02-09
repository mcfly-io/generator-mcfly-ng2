'use strict';
var path = require('path');
var ComponentGenerator = require('../componentGenerator');
var Generator = module.exports = ComponentGenerator.extend({

    constructor: function() {
        this.basetype = 'component'; // this will create a property this.componentname
        this.basefolder = 'components'; // this is the folder for the components
        this.hasOwnFolder = true; // to specify if the component files should be in a subfolder
        this.isDasherize = true; // to specify that the file name should be dasherized
        ComponentGenerator.apply(this, arguments);
    },

    initializing: function() {
        Generator.__super__.initializing.apply(this, arguments);
        this.mixins.beautifyTs();
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
        //var componentnameFile = this.componentname; //this.mixins.dasherize(this.componentname); // could be componentname
        this.fs.copyTpl(
            this.templatePath('_component.ts'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.ts')), {
                componentnameFile: this.componentnameFile,
                componentname: this.componentname,
                componentnameClass: this.componentnameClass
            }
        );

        this.fs.copyTpl(
            this.templatePath('_component.spec.ts'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.spec.ts')), {
                componentnameFile: this.componentnameFile,
                componentname: this.componentname,
                componentnameClass: this.componentnameClass
            }
        );

        this.fs.copyTpl(
            this.templatePath('_component.ngux'),
            this.destinationPath(path.join(destinationPath, this.componentname + '.ngux')), {
                componentnameFile: this.componentnameFile,
                componentname: this.componentname,
                componentnameClass: this.componentnameClass
            }
        );

    }

});

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

        this.option('targettype', {
            desc: 'The type of target',
            type: String,
            hide: false
        });
    },

    initializing: function() {
        Generator.__super__.initializing.apply(this, arguments);
        this.mixins.beautifyTs();
    },

    prompting: function() {
        var done = this.async();
        var self = this;
        var extraPrompts = [{
            type: 'list',
            name: 'targettype',
            default: 'web',
            when: function() {
                return !self.options.targettype || self.options.targettype.length <= 0;
            },
            message: 'What type of component do you want to create?',
            choices: ['web', 'fuse', 'ionic2', 'multi']
        }];
        Generator.__super__.prompting.call(this, done, extraPrompts);

    },

    configuring: function() {
        Generator.__super__.configuring.apply(this, arguments);
        this.targettype = this.answers.targettype || this.options.targettype;
    },

    writing: function() {
        var destinationPath = Generator.__super__.writing.apply(this, arguments);
        //var componentnameFile = this.componentname; //this.mixins.dasherize(this.componentname); // could be componentname

        switch (this.targettype) {
            case 'web':
                this.fs.copyTpl(
                    this.templatePath('_component.web.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.web.spec.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.spec.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass,
                        modulename: this.modulename
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.web.html'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.html')), {
                        componentname: this.componentname
                    }
                );
                this.fs.copyTpl(
                    this.templatePath('_component.web.scss'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.scss'))
                );
                break;

            case 'ionic2':

                this.fs.copyTpl(
                    this.templatePath('_component.ionic2.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.ionic2.spec.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.spec.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass,
                        modulename: this.modulename
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.ionic2.html'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.html')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.ionic2.scss'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.scss'))
                );

                break;

            case 'fuse':
                this.fs.copyTpl(
                    this.templatePath('_component.fuse.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.fuse.spec.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.spec.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass,
                        modulename: this.modulename
                    }
                );
                this.fs.copyTpl(
                    this.templatePath('_component.ngux'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ngux')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );
                break;

            case 'multi':
                this.fs.copyTpl(
                    this.templatePath('_component.multi.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.web.spec.ts'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.spec.ts')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass,
                        modulename: this.modulename
                    }
                );
                this.fs.copyTpl(
                    this.templatePath('_component.web.html'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.html')), {
                        componentname: this.componentname
                    }
                );
                this.fs.copyTpl(
                    this.templatePath('_component.web.scss'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.scss'))
                );

                this.fs.copyTpl(
                    this.templatePath('_component.ionic2.html'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ionic.html')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('_component.ngux'),
                    this.destinationPath(path.join(destinationPath, this.componentnameFile + '.component.ngux')), {
                        componentnameFile: this.componentnameFile,
                        componentname: this.componentname,
                        componentnameClass: this.componentnameClass
                    }
                );
                break;
        }

    }

});

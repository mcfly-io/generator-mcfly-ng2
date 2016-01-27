'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mixinLodash = require('../../libs/mixinLodash');
var mixinBeautify = require('../../libs/mixinBeautify');
var mixinFile = require('../../libs/mixinFile');
var mixinNotifier = require('../../libs/mixinNotifier');
var mixinInspector = require('../../libs/mixinInspector');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);

        // applying mixins
        mixinLodash.extend(this);
        mixinBeautify.extend(this);
        mixinFile.extend(this);
        mixinNotifier.extend(this);
        mixinInspector.extend(this);

        // Registering file transforms
        this.mixins.beautifyJson();

        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this.mixins.camelize(this.appname);

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('appname', {
            desc: 'The application name',
            type: String,
            optional: true,
            required: false,
            defaults: this.appname
        });

        this.appname = this.mixins.camelize(this.appname);
        // ***** arguments ********

        // ****** options *********
        // To access options later use this.options.optionName
        this.option('skip-install', {
            desc: 'Skip the bower and node installations',
            type: Boolean,
            defaults: false
        });
        this.option('mobile', {
            desc: 'Indicates that the app is a mobile app',
            type: Boolean,
            defaults: false
        });

        this.option('target', {
            desc: 'The name of the default target',
            type: String,
            defaults: 'app'
        });
        // ****** options *********

    },

    initializing: function() {
        this.pkg = this.mixins.readJsonFile('../../package.json', __dirname);
        this.mixins.notifyUpdate(this.pkg);

    },

    prompting: function() {

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the awesome ' + chalk.yellow(this.mixins.getGeneratorShortname()) + ' generator!'));

        var done = this.async();
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What is your project name?',
            default: this.appname
        }, {
            type: 'input',
            name: 'clientFolder',
            message: 'What is your client folder?',
            default: 'client'
        }];
        this.prompt(prompts, function(answers) {
            this.answers = answers;
            // To access answers later use this.answers.someAnswer;
            this.answers.clientFolder = this.mixins.dasherize(this.answers.clientFolder);
            done();
        }.bind(this));
    },

    configuring: function() {
        this.config.set('filenameCase', this.filenameCase);
        this.config.set('filenameSuffix', this.filenameSuffix);
        this.config.set('appname', this.appname);
        this.config.set('clientFolder', this.answers.clientFolder);

        this.composeWith(this.mixins.getGeneratorShortname() + ':target', {
            args: [this.options.target],
            options: {
                clientFolder: this.config.get('clientFolder') // passing the client folder for first run
            }
        });
    },

    writing: function() {

        this.mixins.createDirSync(this.destinationPath(this.answers.clientFolder));
        //this.mixins.createDirSync('test');
        //this.fs.write(this.destinationPath('test/.gitignore'), '');

        this.fs.copyTpl(
            this.templatePath('.eslintignore'),
            this.destinationPath('.eslintignore')
        );
        this.fs.copyTpl(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json')
        );
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copyTpl(
            this.templatePath('.jsbeautifyrc'),
            this.destinationPath('.jsbeautifyrc')
        );
        this.fs.copyTpl(
            this.templatePath('.npmrc'),
            this.destinationPath('.npmrc')
        );
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                appname: this.mixins.dasherize(this.appname),
                clientFolder: this.answers.clientFolder
            }
        );
        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'), {
                appname: this.mixins.dasherize(this.appname)
            }
        );
        this.fs.copyTpl(
            this.templatePath('_spec-bundle.js'),
            this.destinationPath('spec-bundle.js'), {
                clientFolder: this.answers.clientFolder
            }
        );
        this.fs.copyTpl(
            this.templatePath('_tsconfig.json'),
            this.destinationPath('tsconfig.json'), {
                clientFolder: this.answers.clientFolder
            }
        );
        this.fs.copyTpl(
            this.templatePath('karma.conf.js'),
            this.destinationPath('karma.conf.js')
        );
        this.fs.copyTpl(
            this.templatePath('tslint.json'),
            this.destinationPath('tslint.json')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );

        this.fs.copyTpl(
            this.templatePath('sanity.spec.ts'),
            this.destinationPath('test/sanity.spec.ts')
        );

    },

    conflicts: function() {

    },

    install: function() {
        this.npmInstall(null, {
            skipInstall: this.options['skip-install']
        });
    },

    end: function() {
        this.log(chalk.green('Woot!!! It appears that everything installed correctly.'));
    }
});

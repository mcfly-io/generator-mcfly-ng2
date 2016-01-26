'use strict';
var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('targetname', {
            desc: 'The target name',
            type: String,
            optional: false,
            required: true
        });
        // ***** arguments ********
    },

    writing: function() {
        this.fs.copy(
            this.templatePath('dummyfile.txt'),
            this.destinationPath(path.join(this.targetname, 'dummyfile.txt'))
        );
    }
});

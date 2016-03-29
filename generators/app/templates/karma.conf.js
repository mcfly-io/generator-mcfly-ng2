'use strict';
var path = require('path');
var webpackConfig = require('./webpack.config');
var clientFolder = require('./.yo-rc.json')['generator-mcfly-ng2'].clientFolder;
module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // http://stackoverflow.com/questions/29391111/karma-phantomjs-and-es6-promises
            'node_modules/babel-polyfill/dist/polyfill.js',
            // we are building the test environment in ./spec-bundle.js
            {
                pattern: 'spec-bundle.js',
                watched: false
            }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec-bundle.js': ['webpack', 'sourcemap']
        },

        webpack: {
            debug: false,
            resolve: {
                cache: false,
                root: __dirname,
                extensions: ['', '.ts', '.js', '.json', '.css', '.html', '.scss', '.sass']
            },
            devtool: 'inline-source-map',
            module: {
                loaders: webpackConfig.module.loaders,
                postLoaders: [
                    // instrument only testing sources with Istanbul
                    {
                        test: /\.(js|ts)$/,
                        include: path.resolve(clientFolder),
                        loader: 'istanbul-instrumenter-loader',
                        exclude: [/\.e2e\.ts$/, /node_modules/, /\.spec\.ts$/]
                    }
                ],
                noParse: webpackConfig.module.noParse
            },
            stats: {
                colors: true,
                reasons: true
            },
            noParse: webpackConfig.noParse
        },
        coverageReporter: {
            dir: 'coverage/unit/',
            reporters: [{
                type: 'json',
                subdir: '.'
            }, {
                type: 'text',
                subdir: '.'
            }, {
                type: 'text-summary',
                subdir: '.'
            }, {
                type: 'cobertura',
                file: 'coverage.xml',
                subdir: '.'
            }, {
                type: 'lcov',
                subdir: '.'
            }]
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: process.env.WATCH === 'true' ? ['nyan'] : ['mocha', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
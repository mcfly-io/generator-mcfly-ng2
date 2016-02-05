'use strict';
var browserExtension = require('./protractor/browserExtension');
//var argv = require('yargs').argv;
var target = process.env.TARGET || 'app';
var isMobile = false;
var timeout = 400000;

var config = {
    baseUrl: 'http://localhost:5000/',

    // use `npm run e2e`
    specs: [
        'test/e2e/' + target + '/index.e2e.ts'
    ],
    exclude: [],

    framework: 'jasmine2',

    allScriptsTimeout: 110000,

    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        print: function() {}, // hack to remove dot reporter
        defaultTimeoutInterval: 400000
    },
    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': [
                '--disable - extensions'
                //'show-fps-counter=false'
            ]
        }
    },

    onPrepare: function() {
        browser.ignoreSynchronization = true;

        browserExtension.extendsBrowser(browser, {
            // destScreenShots: destScreenShots
        });

        browser.manage().timeouts().setScriptTimeout(timeout);
        if (isMobile) {
            browser.driver.manage().window().setSize(550, 900);
        } else {
            browser.maximizeWindow();
        }

        var SpecReporter = require('jasmine-spec-reporter');
        var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displaySpecDuration: true,
            displayStacktrace: true
        }));
        jasmine.getEnv().addReporter(new HtmlReporter({
            dest: './reports/' + target,
            filename: 'index.html'
        }));
    },

    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
};

exports.config = config;
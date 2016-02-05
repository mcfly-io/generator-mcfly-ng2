'use strict';
var browserObj;

var maximizeWindow = function() {
    setTimeout(function() {
        browserObj.driver.executeScript(function() {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight
            };
        }).then(function(result) {
            browserObj.driver.manage().window().setSize(result.width, result.height);
        });
    });
};

var extendsBrowser = function(browser, config) {
    browserObj = browser;
    browserObj.maximizeWindow = maximizeWindow;
};

module.exports = {
    extendsBrowser: extendsBrowser
};

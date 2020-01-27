const {By, Builder} = require("selenium-webdriver");
const chrome = require("chromedriver");
//const firefox = require('selenium-webdriver/firefox');

module.exports = {
    chrome: new Builder()
        .forBrowser("chrome")
        .build()
};

'use strict'

var helper = require('../helpers/e2e-helper.js');

var myAccountBtnXpath = element(by.xpath("//a[contains(text(),'My Account')]"));
var nameFieldXpath = element(by.xpath("//input[@id='firstName']"));
var AboutMeFieldXpath = element(by.xpath("//textarea[@id='about']"));
var alertMessageXpath = element(by.xpath("//div[@class='alert alert-success']"));
var updateProfileBtnXpath = element(by.xpath("//button[@class='btn btn-primary']"));



var MyAccountPage = function(){
    
    this.update_profile_info = function(){
        helper.waitAndClick(myAccountBtnXpath);
        browser.sleep(1500);
        helper.clearAndEnterValue(nameFieldXpath, 'DzAutomation');
        helper.clearAndEnterValue(AboutMeFieldXpath, 'This is automated test');
        helper.waitAndClick(updateProfileBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(alertMessageXpath);
        return this;
    };

};  

module.exports = new MyAccountPage()
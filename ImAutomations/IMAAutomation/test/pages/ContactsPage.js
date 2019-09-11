'use strict'

var helper = require('../helpers/e2e-helper.js');

var contactsBtnXpath = element(by.xpath("//a[contains(text(),'Contacts')]"));
var phoneNumFieldXpath = element(by.xpath("//input[@id='phoneNumber']"));
var skypeFieldXpath = element(by.xpath("//input[@id='skype']"));
var twitterFieldXpath = element(by.xpath("//input[@id='twitter']"));
var linkedInFieldXpath = element(by.xpath("//input[@id='linkedin']"));
var webPageFieldXpath = element(by.xpath("//input[@id='linkedin']"));
var updateInfoBtnXpath = element(by.xpath("//button[@class='btn btn-primary']"));
var successAlertMessageXpath = element(by.xpath("//div[@class='alert alert-success']"));


var ContactsPage = function(){

    this.update_contacts_info = function(){
        helper.waitAndClick(contactsBtnXpath);
        helper.waitVisibility(phoneNumFieldXpath);
        helper.clearAndEnterValue(phoneNumFieldXpath, '000988389839');
        helper.clearAndEnterValue(skypeFieldXpath, 'dzananskype');
        helper.clearAndEnterValue(twitterFieldXpath, 'dzanantwitter');
        helper.clearAndEnterValue(linkedInFieldXpath, 'dzananlinkedInURL');
        helper.clearAndEnterValue(webPageFieldXpath, 'testURL');
        helper.waitAndClick(updateInfoBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(successAlertMessageXpath);
        return this;
    };
};

module.exports = new ContactsPage();

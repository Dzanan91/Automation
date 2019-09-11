'use strict'

var helper = require('../helpers/e2e-helper.js');

var alertMessageXpath = element(by.xpath("//span[@class='ant-alert-message']"));
var messagesBtnXpath = element(by.xpath("//span[@class='icmn icmn-envelop icon___g2evp']"));
var messagesVerificationXpath = element(by.xpath("//h4[@class='mt-1 mb-1 text-black d-inline-block']//strong[contains(text(),'Chris Obama')]"));
var profileDropdownMenuXpath = element(by.xpath("//div[@class='dropdown___1Vv9C ant-dropdown-trigger']"));
var logoutBtnXpath = element(by.xpath("//a[contains(text(),'Logout')]"));
var emailFieldXpath = element(by.xpath("//input[@id='email']"));
var pwFieldXpath = element(by.xpath("//input[@id='password']"));
var loginBtnXpath = element(by.xpath("//button[@class='ant-btn width-150 mr-4 ant-btn-primary']"));
var facilityXpath = element(by.xpath("//div[@class='switchContainer___3K4-f']//tr[1]//td[1]"));
var cardViewBtnXpath = element(by.xpath("//button[@class='switch___oOnTS ant-switch ant-switch-checked']"));
var cardViewVerificationXpath = element(by.xpath("//div[@class='ant-row-flex']//div[1]//div[1]//div[1]//div[1]//div[1]//div[2]"));


var HomePage = function () {

    this.login_as_surveyor = function () {
        helper.clearAndEnterValue(emailFieldXpath, 'surveyor@edgehill.co.uk');
        helper.clearAndEnterValue(pwFieldXpath, 'Realm34$');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(3000);
    };

    this.verify_facility_exists = function(){
        browser.sleep(1500);    
        helper.waitVisibility(facilityXpath);
    };

    this.switch_to_card_view = function(){
        helper.waitVisibility(cardViewBtnXpath);
        helper.waitAndClick(cardViewBtnXpath);
        helper.waitVisibility(cardViewVerificationXpath);
    };

    this.card_view_is_displayed = function(){
        browser.sleep(1500);
        helper.waitVisibility(cardViewVerificationXpath);
    };
    
    this.homepage_landing = function () {
        helper.waitVisibility(alertMessageXpath);
        return this;
    };

    this.messages_navigation = function () {
        helper.waitAndClick(messagesBtnXpath);
        helper.waitVisibility(messagesVerificationXpath);
        return this;
    };

    this.logout_from_page = function () {
        helper.waitAndClick(profileDropdownMenuXpath);
        helper.waitVisibility(logoutBtnXpath);
        browser.sleep(3000);
        helper.waitAndClick(logoutBtnXpath);
        return this;
    };
};

module.exports = new HomePage();



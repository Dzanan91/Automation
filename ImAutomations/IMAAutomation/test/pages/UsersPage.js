'use strict'

var helper = require('../helpers/e2e-helper.js');

var usersbtnXpath = element(by.xpath("//a[contains(text(),'Users')]"));
var searchbarXpath = element(by.xpath("//input[@id='__BVID__344_']"));
var searchResultsVerificationXpath = element(by.xpath("//a[contains(text(),'Gmail Tester')]"));
var userSearchVerificationXpath = element(by.xpath("//a[@class='m-t-sm text-lg text-primary']"));
var activeUsersBtnXpath = element(by.xpath("//a[@class='m-t-sm text-lg text-primary']"));
var slippingAwayBtnXpath = element(by.xpath("//a[@id='__BVID__49____BV_tab_button__']"));
var returningUsersBtnXpath = element(by.xpath("//a[@id='__BVID__51____BV_tab_button__']"));
var proBtnXpath = element(by.xpath("//a[@id='__BVID__51____BV_tab_button__']"));
var proVerificationXpath = element(by.xpath("//a[contains(text(),'Godzella 5')]"))
var invitesBtnXpath = element(by.xpath("//a[@id='__BVID__55____BV_tab_button__']"));
var invitesVerificationXpath = element(by.xpath("//td[contains(text(),'bropiobroquinto@gmail.com')]"));

var UsersPage = function(){
    
    this.verify_search_functionality = function(){
        helper.waitAndClick(usersbtnXpath);
        helper.clearAndEnterValue(searchbarXpath, 'Gmail Tester');
        helper.verifyPresenceOfElement(searchResultsVerificationXpath);
        return this;
    };

};

module.exports = new UsersPage();


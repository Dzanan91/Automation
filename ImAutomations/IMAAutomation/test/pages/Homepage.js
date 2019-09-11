 'use strict'

var helper = require('../helpers/e2e-helper.js');

var mainHeaderXpath = element(by.xpath("//h4[@class='dashboard-widget__title text-primary']"));
var myAccountBtnXpath = element(by.xpath("//a[contains(text(),'My Account')]"));
var myAccountVerifierXpath = element(by.xpath("//span[contains(text(),'First name *')]"));
var helpDeskbtnXpath = element(by.xpath("//nav[@class='main-navbar pb-0 pt-0 navbar navbar-dark navbar-expand-md']//li[2]//a[1]"));
var helpdeskHeaderXpath = element(by.xpath("//div[@class='hide-overflow']"));
var logoutHover = element(by.id('id="__BVID__58_"'));
var logoutBtnXpath = element(by.xpath("//a[@class='dropdown-item']"));
var logoutVerificationXpath = element(by.xpath("//nav[@class='quest-navbar-header navbar navbar-default navbar-static-top']//strong[@class='text-lg'][contains(text(),'Login')]"));
var contactsButtonXpath = element(by.xpath("//a[contains(text(),'Contacts')]"));
var contacsVerificationXpath = element(by.xpath("//h5[@class='text-primary p-b-md']"));
var deactivateAccBtnXpath = element(by.xpath("//a[contains(text(),'Deactivate Account')]"));
var deactivateAccVerificationXpath = element(by.xpath("//h5[@class='text-primary p-b-sm']"));
var workBtnXpath = element(by.xpath("//a[contains(text(),'Work')]"));
var workVerificationXpath = element(by.xpath("//h5[@class='text-primary p-b-md']"));
var notificationsBtnXpath = element(by.xpath("//a[contains(text(),'Notifications')]"));
var notificationVerificationXpath = element(by.xpath("//a[contains(text(),'Notifications')]"));
var changePwbtnXpath = element(by.xpath("//a[contains(text(),'Change password')]"));
var changePwVerificationXpath = element(by.xpath("//h5[@class='text-primary p-b-md']"));
var usersbtnXpath = element(by.xpath("//a[contains(text(),'Users')]"));
var usersVerificationXpath = element(by.xpath("//div[@class='dark-shade p-4 text-white col-sm-12']"));
var rolesBtnXpath = element(by.xpath("//a[contains(text(),'Roles')]"));
var rolesVerificationXpath = element(by.xpath("//body//th[1]"));
var companiesBtnXpath = element(by.xpath("//a[contains(text(),'Companies')]"));
var companiesVerificationXpath = element(by.xpath("//h3[contains(text(),'Companies')]"));
var segmentsBtnXpath = element(by.xpath("//a[contains(text(),'Segments')]"));
var segmentsVerificationXpath = element(by.xpath("//div[contains(text(),'ID')]"));
var agreementsBtnXpath = element(by.xpath("//a[contains(text(),'Agreements')]"));
var agreementsVerificationXpath = element(by.xpath("//div[contains(text(),'ID')]"));
var specialistsBtnXpath = element(by.xpath("//a[contains(text(),'Specialists')]"));
var specialistsVerificationXpath = element(by.xpath("//div[contains(text(),'Agreement')]"))


var HomePage = function(){

    this.landing_page = function(){
        helper.waitVisibility(mainHeaderXpath);
        helper.verifyPresenceOfElement(mainHeaderXpath);
        return this;
    };

    this.open_my_account_page = function (){
        helper.waitAndClick(myAccountBtnXpath);
        helper.waitVisibility(myAccountVerifierXpath);
        return this;
    };

    this.open_helpdesk_page = function(){
        helper.waitAndClick(helpDeskbtnXpath);
        helper.verifyPresenceOfElement(helpdeskHeaderXpath);
        return this;
    };

    this.open_contacts_page = function(){
        helper.waitAndClick(contactsButtonXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(contacsVerificationXpath);
        return this;
    };

    this.open_deactivate_account_page = function(){
        helper.waitAndClick(deactivateAccBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(deactivateAccVerificationXpath);
        return this;
    };

    this.open_work_page = function(){
        helper.waitAndClick(workBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(workVerificationXpath);
        return this;
    };  

    this.open_notifications_page = function(){
        helper.waitAndClick(notificationsBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(notificationVerificationXpath);
        return this;
    };

    this.open_change_password_page = function(){
        helper.waitAndClick(changePwbtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(changePwVerificationXpath);
        browser.sleep(1000);
        return this;
    };

    this.open_users_page = function(){
        helper.waitAndClick(usersbtnXpath);
        browser.sleep(2000);
        helper.verifyPresenceOfElement(usersVerificationXpath);
        browser.sleep(2000);
        return this;
    };

    this.open_roles_page = function(){
        helper.waitAndClick(rolesBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(rolesVerificationXpath);
        return this;
    };

    this.open_companies_page = function(){
        helper.waitAndClick(companiesBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(companiesVerificationXpath);
        return this;
    };

    this.open_segments_page = function(){
        helper.waitAndClick(segmentsBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(segmentsVerificationXpath);
        return this;
    };

    this.open_agreements_page = function(){
        helper.waitAndClick(agreementsBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(agreementsVerificationXpath);
        return this;
    };

    this.open_specialists_page = function(){
        helper.waitAndClick(specialistsBtnXpath);
        browser.sleep(1500);
        helper.verifyPresenceOfElement(specialistsVerificationXpath);
        return this;
    };
    
    this.logout = function(){
        helper.hover(logoutHover);
        browser.sleep(3000)
        helper.waitAndClick(logoutBtnXpath);
        helper.waitVisibility(logoutVerificationXpath);
        return this;
    };
};

module.exports = new HomePage()
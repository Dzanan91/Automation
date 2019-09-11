'use strict'

var helper = require('../helpers/e2e-helper.js');

var loginBtnXpath = element(by.xpath("//a[contains(text(),'Login')]"));
var emailFieldXpath = element(by.xpath("//input[@id='email']"));
var passFieldXpath = element(by.xpath("//input[@id='password']"));
var loginPg_loginBtnXpath = element(by.xpath("//button[@class='btn btn-primary btn-block']"));
var validationMessageXpath = element(by.xpath("//body//div[4]"));
var signUpForFreeBtnXpath = element(by.xpath("//a[contains(text(),'Sign up for free.')]"));
var createFreeAccPageXpath = element(by.xpath("//h2[@class='text-center m-t-md']"));
var signUpBtnXpath = element(by.xpath("//a[@class='btn btn-warning navbar-btn']"));
var firstNameXpath = element(by.xpath("//input[@id='firstName']"));
var lastNameXpath = element(by.xpath("//input[@id='lastName']"));
var registerBtnXpath = element(by.xpath("//button[@class='btn btn-primary btn-block']"));
var privacyPolicyBtnXpath = element(by.xpath("//a[contains(text(),'Privacy Policy')]"));
var cookiePolicyBtnXpath = element(by.xpath("//a[contains(text(),'Cookie Policy')]"));
var userAgreementBtnXpath = element(by.xpath("//a[contains(text(),'User Agreement')]"));
var profileIconDropdownXpath = element(by.xpath("//li[@class='dropdown hover-dropdown user-menu']//a[@class='dropdown-toggle text-center dropdown-icon']"));
var signUpPg_loginBtn = element(by.xpath("//a[contains(text(),'Log in.')]"));
var pricingBtnXpath = element(by.xpath("//a[contains(text(),'Pricing')]"));
var signOutBtnXpath = element(by.xpath("//li[@class='dropdown hover-dropdown user-menu']//ul[@class='dropdown-menu dropdown-inverse']//li//a[@class='btn btn-default pull-right'][contains(text(),'Sign out')]"));
var productsDropdownXpath = element(by.xpath("//a[@class='dropdown-toggle']"));
var islamicmarketsPRObtnXpath = element(by.xpath("//a[contains(text(),'IslamicMarkets PRO')]"));
var learningBtnXpath = element(by.xpath("//ul[@class='dropdown-menu']//a[contains(text(),'Learning')]"));
var IMPg_profileIconDropdownXpath = element(by.xpath("//li[@class='user user-menu ng-scope dropdown']//a[@class='dropdown-toggle']"));
var IMPg_signOutBtnXpath = element(by.xpath("//a[contains(text(),'Sign out')]"));
var advisoryBtnXpath = element(by.xpath("//a[contains(text(),'Advisory')]"));
var contactUsBtnXpath = element(by.xpath("//a[@class='text-warning underline']"));
var createYourFreeAccountBtnXpath = element(by.xpath("//a[@class='btn btn-warning btn-lg']"));
var aboutUsBtnXpath = element(by.xpath("//div[@class='footer']//li[1]")); 
var islamicMarketsPROpageXpath = element(by.xpath("//h1[contains(text(),'IslamicMarkets PRO')]"));
var advisoryPageSubmitForProposalBtnXpath = element(by.xpath("//a[@class='btn btn-warning btn-block btn-lg semi-bold no-border margin-t-20']"));
var policyPageIntroductionBtnXpath = element(by.xpath("//a[contains(text(),'Introduction')]"));

var LoginPage = function(){

    this.verify_user_is_unable_to_login_with_invalid_data = function(){
        helper.waitAndClick(loginBtnXpath);
        helper.clearAndEnterValue(emailFieldXpath, 'paulchatto10@gmail.com');
        helper.clearAndEnterValue(passFieldXpath, 'pass1234567');
        helper.waitAndClick(loginPg_loginBtnXpath);
        helper.verifyPresenceOfElement(validationMessageXpath);
        return this;
    };

    this.verify_user_is_able_to_login_with_valid_data = function(){
        helper.waitAndClick(loginBtnXpath);
        helper.clearAndEnterValue(emailFieldXpath, 'paulchatto10@gmail.com');
        helper.clearAndEnterValue(passFieldXpath, 'pass1234');
        helper.waitAndClick(loginPg_loginBtnXpath);
        helper.hoverAndClick(profileIconDropdownXpath, signOutBtnXpath);
        return this;
    };

    this.verify_user_is_able_to_open_sign_up_page_from_login_page = function(){
        helper.waitAndClick(loginBtnXpath);
        helper.waitAndClick(signUpForFreeBtnXpath);
        helper.verifyPresenceOfElement(createFreeAccPageXpath); 
        return this;
    };

    this.verify_user_is_unable_to_sign_up_with_invalid_data = function(){
        helper.waitAndClick(signUpBtnXpath);
        helper.clearAndEnterValue(emailFieldXpath, 'TestMail12345678');
        helper.clearAndEnterValue(firstNameXpath, 'TestName123');
        helper.clearAndEnterValue(lastNameXpath, 'TestSurname123');
        helper.clearAndEnterValue(passFieldXpath, 'password12345');
        helper.waitAndClick(registerBtnXpath);
        //helper.verifyPresenceOfElement(createFreeAccPageXpath);
        return this;
    };

    this.verify_privacy_policy_page_loaded_properly = function() {
        helper.waitAndClick(signUpBtnXpath);
        helper.waitAndClick(privacyPolicyBtnXpath);
        browser.sleep(2000);
        helper.switchToWindow(0, 'https://account.islamicmarkets.com/register?clientId=149a2f9ae29622519fe026475cc214769670c36879c97ebd&clientName=learning');
        helper.waitVisibility(registerBtnXpath);
    };

    this.verify_cookie_policy_page_loaded_properly = function() {
        helper.waitAndClick(signUpBtnXpath);
        helper.waitAndClick(cookiePolicyBtnXpath);
        browser.sleep(2000);
        helper.switchToWindow(0, 'https://account.islamicmarkets.com/register?clientId=149a2f9ae29622519fe026475cc214769670c36879c97ebd&clientName=learning');

    };

    this.verify_user_agreement_page_is_loaded_properly = function() {
        helper.waitAndClick(signUpBtnXpath);
        helper.waitAndClick(userAgreementBtnXpath);
        browser.sleep(2000);
        helper.switchToWindow(0, 'https://account.islamicmarkets.com/register?clientId=149a2f9ae29622519fe026475cc214769670c36879c97ebd&clientName=learning');

    };

    this.verify_user_is_able_to_open_login_page_from_sign_up_page = function() {
        helper.waitAndClick(signUpBtnXpath);
        helper.waitAndClick(signUpPg_loginBtn);
        helper.verifyPresenceOfElement(loginPg_loginBtnXpath);
        return this;
    };

    this.verify_pricing_page_loaded_properly = function() {
        helper.waitAndClick(pricingBtnXpath);
        helper.clearAndEnterValue(emailFieldXpath, 'paulchatto10@gmail.com');
        helper.clearAndEnterValue(passFieldXpath, 'pass1234');
        helper.waitAndClick(loginPg_loginBtnXpath);
        helper.hoverAndClick(IMPg_profileIconDropdownXpath, IMPg_signOutBtnXpath);
        return this;
    };

    this.verify_islamicmarkets_pro_page_loaded_properly = function() {
        helper.hoverAndClick(productsDropdownXpath, islamicmarketsPRObtnXpath);
        helper.verifyPresenceOfElement(islamicMarketsPROpageXpath);
        return this;
    };

    this.verify_islamicmarkets_learning_page_loaded_properly = function() {
        helper.hoverAndClick(productsDropdownXpath, learningBtnXpath);
        helper.switchToWindow(1, 'https://sso.aveknew.com/login?clientId=4a2f6c46e47e6d64a6837107ab731d0ef0c43809f5c5f910d4fd6913360bf3ba7a952dfd&clientName=learning&scope=openid&responseType=code&redirectUri=https%3A%2F%2Flearning.aveknew.com%2Flogin%2Fcallback&state=IKw5UkZqVvpm61267fulunKcykLZQmMpPtx65Yjh&nonce=5646bc4a69b9424ae92856377d2b422894f843e3963d0bb54645b02bff798e04');
        helper.waitVisibility(emailFieldXpath);
        helper.clearAndEnterValue(emailFieldXpath, '3001super@islamicbanker.com');
        helper.clearAndEnterValue(passFieldXpath, 'pass1234');
        helper.waitAndClick(loginPg_loginBtnXpath);
        helper.hoverAndClick(profileIconDropdownXpath, signOutBtnXpath); 
    };

    this.verify_advisory_page_loaded_properly = function() {
        helper.hoverAndClick(productsDropdownXpath, advisoryBtnXpath);
        helper.waitVisibility(advisoryPageSubmitForProposalBtnXpath);  
        return this;
    };

    this.verify_helpdesk_page_loaded_properly = function() {
        helper.scrollAndClick(contactUsBtnXpath);
        helper.waitVisibility(emailFieldXpath);
        helper.clearAndEnterValue(emailFieldXpath, 'paulchatto10@gmail.com');
        helper.clearAndEnterValue(passFieldXpath, 'pass1234');
        helper.waitAndClick(loginPg_loginBtnXpath);
        helper.waitVisibility(IMPg_profileIconDropdownXpath);
        helper.hoverAndClick(IMPg_profileIconDropdownXpath, IMPg_signOutBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_sign_up_page_with_createYourFreeAccount_button = function() {
        helper.scrollAndClick(createYourFreeAccountBtnXpath);
        helper.waitVisibility(loginPg_loginBtnXpath);
        return this;
    };

    this.verify_user_is_able_to_open_islamicmarkets_pro_page_with_about_us_button = function() {
        helper.scrollAndClick(aboutUsBtnXpath);
        helper.verifyPresenceOfElement(islamicMarketsPROpageXpath);
        return this;
    };

};

module.exports = new LoginPage
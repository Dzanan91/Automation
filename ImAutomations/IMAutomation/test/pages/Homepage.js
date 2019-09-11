'use strict'

var helper = require('../helpers/e2e-helper.js');

var helpIconBtn = element(by.xpath("//i[@class='fas fa-headset']"));
var helpdeskPageSendMsgBtn = element(by.xpath("//button[@class='btn btn-warning']"));
var inboxBtnXpath = element(by.xpath("//span[contains(text(),'Inbox')]"));
var inboxPageComposeBtnXpath = element(by.xpath("//a[@class='btn btn-primary margin-b-10 full-width']"));
var inviteBtnXpath = element(by.xpath("//span[contains(text(),'Invite')]"));
var invitePeoplePageContactsManagerBtnXpath = element(by.xpath("//input[@class='btn btn-warning']"));
var userProfileBtnXpath = element(by.xpath("//li[@class='user user-menu ng-scope dropdown']//a[@class='dropdown-toggle']"));
var viewProfileBtnXpath = element(by.xpath("//a[contains(text(),'View Profile')]"));
var userProfilePageBioBtnXpath = element(by.xpath("//strong[contains(text(),'Bio')]"));
var editAccountBtnXpath = element(by.xpath("//i[@class='fas fa-cog']"));
var accountsPageWorkBtnXpath = element(by.xpath("//a[contains(text(),'Work')]"));
var signOutBtnXpath = element(by.xpath("//a[contains(text(),'Sign out')]"));
var loginBtnXpath = element(by.xpath("//nav[@class='quest-navbar-header navbar navbar-default navbar-static-top']//strong[@class='text-lg'][contains(text(),'Login')]"));
var loginPageEmailFieldXpath = element(by.xpath("//input[@id='email']"));
var loginPagePasswordFieldXpath = element(by.xpath("//input[@id='password']"));
var loginPageLoginBtnXpath = element(by.xpath("//button[@class='btn btn-primary btn-block']"));
var articleTitleFieldXpath = element(by.xpath("//input[@placeholder='Article Title']"));
var arrowDropdownBtnXpath = element(by.xpath("//i[@class='fa fa-caret-down']"));
var uploadPublicationBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[1]//a[1]"));
var selectFileToUploadBtnXpath = element(by.xpath("//button[@class='btn btn-primary']"));
var writeAnArticleBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[2]//a[1]"));
var addAnEventBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[3]//a[1]"));
var createYourEventBtnXpath = element(by.xpath("//a[@class='btn btn-warning margin-b-10 full-width']"));
var addSukukBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[4]//a[1]"));
var sukukNameFieldXpath = element(by.xpath("//input[@placeholder='Sukuk Name (required)']"));
var addCompanyBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[5]//a[1]"));
var createBtnXpath = element(by.xpath("//input[@class='btn btn-info']"));
var addIslamicFundBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[6]//a[1]"));
var manageContentBtnXpath = element(by.xpath("//li[@id='add-content-dropdown-menu']//li[8]//a[1]"));
var editBtnXpath = element(by.xpath("//tr[1]//td[6]//a[1]"));
var moreBtnXpath = element(by.xpath("//a[@class='text-gray text-sm']"));
var programmesLinkIconXpath = element(by.xpath("//div[@class='content-block content-block-highlight no-padding']//i[@class='fa fa-window-maximize']"));
var myProgrammesXpath = element(by.xpath("//b[contains(text(),'My Programmes')]"));
var scholarsLinkIconXpath = element(by.xpath("//div[@class='content-block no-padding']//i[@class='fa fa-window-maximize']"));
var scholarsMonitorLinkBtnXpath = element(by.xpath("//*[@class='mx-2 svg-inline--fa fa-external-link-alt fa-w-18']"));
var scholarsNetworkAnalysisWindowXpath = element(by.xpath("//strong[contains(text(),'Scholars Network Analysis')]"));
var articleXpath = element(by.xpath("//a[@class='link-overlay'][contains(text(),'Super Admin Insights Article 30 June 2019')]"));
var postYourCommentBtnXpath = element(by.xpath("//div[@id='add-comment-1108']//input[@class='btn btn-warning btn-sm']"));
var suggestedFollowerXpath = element(by.xpath("//a[contains(text(),'View profile')]"));
var bioBtnXpath = element(by.xpath("//strong[contains(text(),'Bio')]"));


var Homepage = function(){

    this.verify_user_able_to_open_homepage = function(){
        helper.waitVisibility(helpIconBtn);
        return this;
    };

    this.verify_user_able_to_open_helpdesk_page = function(){
        helper.waitAndClick(helpIconBtn);
        helper.waitVisibility(helpdeskPageSendMsgBtn);
        return this;
    };

    this.verify_user_able_to_open_my_inbox_page = function(){
        helper.waitAndClick(inboxBtnXpath);
        helper.waitVisibility(inboxPageComposeBtnXpath);
        return this;
    };

    // this.verify_user_able_to_open_notifications_page = function(){
    //     helper.waitAndClick(notificationsBtnXpath);
    //     helper.waitVisibility()
    //     return this;
    // };

    this.verify_user_able_to_open_invite_people_page = function(){
        helper.waitAndClick(inviteBtnXpath);
        helper.waitVisibility(invitePeoplePageContactsManagerBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_his_profile_page = function(){
        helper.hoverAndClick(userProfileBtnXpath, viewProfileBtnXpath);
        helper.waitVisibility(userProfilePageBioBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_edit_account_page = function(){
        helper.hoverAndClick(userProfileBtnXpath, editAccountBtnXpath);
        helper.waitVisibility(accountsPageWorkBtnXpath);
        return this;
    };

    this.verify_user_able_to_sign_out = function(){
        helper.hoverAndClick(userProfileBtnXpath, signOutBtnXpath);
        helper.waitVisibility(loginBtnXpath);
        helper.waitAndClick(loginBtnXpath);
        helper.clearAndEnterValue(loginPageEmailFieldXpath, '3001super@islamicbanker.com');
        helper.clearAndEnterValue(loginPagePasswordFieldXpath, 'pass1234');
        helper.waitAndClick(loginPageLoginBtnXpath);
        browser.sleep(2000);
        return this;
    };

    this.verify_user_able_to_open_upload_publication_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, uploadPublicationBtnXpath);
        helper.waitVisibility(selectFileToUploadBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_write_an_article_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, writeAnArticleBtnXpath);
        helper.waitVisibility(articleTitleFieldXpath);
        return this;
    };

    this.verify_user_able_to_open_create_new_event_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, addAnEventBtnXpath);
        helper.waitVisibility(createYourEventBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_add_sukuk_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, addSukukBtnXpath);
        helper.waitVisibility(sukukNameFieldXpath);
        return this;
    };

    this.verify_user_able_to_open_add_new_company_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, addCompanyBtnXpath);
        helper.waitVisibility(createBtnXpath);
        return this;
    };

    this.verify_user_able_open_add_islamic_fund_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, addIslamicFundBtnXpath);
        helper.waitVisibility(createBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_content_manager_page = function(){
        helper.hoverAndClick(arrowDropdownBtnXpath, manageContentBtnXpath);
        helper.waitVisibility(editBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_activity_feed_page = function() {
        helper.waitAndClick(moreBtnXpath);
        // waitVisibility??
        return this;
    };

    this.verify_user_able_to_open_IML_programmes_page = function() {
        helper.waitAndClick(programmesLinkIconXpath);
        helper.selectWindow(1);
        helper.waitVisibility(myProgrammesXpath);
        helper.switchToFirstTab('https://aveknew.com/hub');
        return this;
    };

    this.verify_user_able_to_open_IQ_scholars_page = function(){
        helper.hover(scholarsNetworkAnalysisWindowXpath);
        helper.waitAndClick(scholarsLinkIconXpath);
        helper.selectWindow(2);
        helper.scrollTo(scholarsMonitorLinkBtnXpath);
        helper.waitVisibility(scholarsMonitorLinkBtnXpath);
        helper.switchToFirstTab('https://aveknew.com/hub');
        return this;
    };

    this.verify_user_able_to_open_article = function(){
        helper.waitAndClick(articleXpath);
        helper.waitVisibility(postYourCommentBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_suggested_followers_profile = function(){
        helper.scrollAndClick(suggestedFollowerXpath);
        helper.waitVisibility(bioBtnXpath);
        return this;
    };
};

module.exports = new Homepage
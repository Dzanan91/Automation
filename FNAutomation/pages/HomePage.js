'use strict'

var helper = require('../helpers/e2e-helper.js');

var createPostBtn = element(by.xpath("//div[@id='compose_button']"));
var topicField = element(by.xpath("//textarea[@id='id_topic']"));
var submitBtn = element(by.xpath("//button[@id='submit_post']"));
var iFrame = element(by.xpath("//iframe[@id='id_body_ifr']"));
var iFrameBody = element(by.xpath("//body[@id='tinymce']"));
var startDiscussionbtn = element(by.xpath("//input[@placeholder='Start a discussion or share something']"));
var searchBtn = element(by.xpath("//div[@class='btn-search']//*[@class='icon']"));
var replyFieldXpath = element(by.xpath("//body/div[@id='main_content']/div[@id='home']/div[@id='feed_items']/div[7]/div[2]/div[1]/div[2]"));
var replyBtnXpath = element(by.xpath("//div[7]//div[2]//div[1]//div[3]//button[1]"));
var searchResults = element(by.xpath("//a[contains(text(),'trellotestonboarding')]"));
var searchFieldXpath = element(by.xpath("//input[@id='search-input']"))
var seeAllbtnXpath = element(by.xpath("//div[@class='see_all']"));
var notificationsBtnXpath = element(by.xpath("//div[@id='notifier']"));
var newNotificationXpath = element(by.xpath("//div[@class='conta']//div[1]//div[1]"));
var userXpath = element(by.xpath("//div[@id='home']//div[7]//div[1]//div[1]//div[2]//div[1]//a[1]"));
var userProfileVerificationXpath = element(by.xpath("//a[@id='btnMessage-2912']"));
var forumBtnXpath = element(by.xpath("//a[@id='btn_forum']"));
var forumVerificationXpath = element(by.xpath("//div[@class='compose']"));
var functionsBtnXpath = element(by.xpath("//div[@id='menu']//a[contains(text(),'Functions')]"));
var functionVerificationXpath = element(by.xpath("//a[@class='add_function']"));
var membersBtnXpath = element(by.xpath("//div[@id='menu']//a[contains(text(),'Members')]"));
var membersVerificationXpath = element(by.xpath("//div[@class='actions_line']"));
var dealsBtnXpath = element(by.xpath("//div[@id='menu']//a[contains(text(),'Deals')]"));
var dealsVerificationXpath = element(by.xpath("//div[@id='menu']//a[contains(text(),'Deals')]"));
var nominateBtnXpath = element(by.xpath("//div[@id='menu']//a[contains(text(),'Nominate')]"));
var nominateVerificationXpath = element(by.xpath("//h1[contains(text(),'Grow your network by growing Founders Network')]"));


 
var HomePage = function(){
    this.homepage_verification = function(){
        helper.waitPresenceAndClick(createPostBtn);
        return this;
    };
    this.create_new_post_via_Create_New_Post_btn = function(){
        helper.waitAndClick(createPostBtn);
        helper.clearAndEnterValue(topicField, 'QA Test: Forum Post');
        browser.switchTo().frame(0);
        helper.clearAndEnterValue(iFrameBody, 'Automated Test');
        browser.switchTo().defaultContent();
        helper.waitAndClick(submitBtn);
        return this;
    };
    this.create_new_post_via_Start_Discussion_option = function(){
        helper.waitAndClick(startDiscussionbtn);
        helper.clearAllInputFields(topicField, 'Automation');
        browser.switchTo().frame(0);
        helper.clearAndEnterValue(iFrameBody, 'Automated test v2');
        browser.switchTo().defaultContent();
        helper.waitAndClick(submitBtn);
        return this;
    };
    this.verify_post_reply_feature = function(){
        helper.verifyPresenceOfElement(createPostBtn);
        helper.clearAndEnterValue(replyFieldXpath, 'Automated reply');
        helper.waitVisibility(replyBtnXpath);
        helper.waitAndClick(replyBtnXpath);
        return this;
    };  
    this.verify_search_functionality = function(){
        helper.verifyPresenceOfElement(createPostBtn);
        helper.waitAndClick(searchBtn);
        browser.sleep(1500);
        helper.waitVisibility(searchFieldXpath);
        helper.clearAndEnterValue(searchFieldXpath, 'Dzanan');
        browser.sleep(1500);
        helper.waitAndClick(seeAllbtnXpath);
        helper.waitVisibility(searchResults);
        helper.verifyPresenceOfElement(searchResults);
        return this;
    };

    this.verify_navigating_to_user_profile = function(){
        helper.waitAndClick(userXpath);
        helper.waitVisibility(userProfileVerificationXpath);
        helper.verifyPresenceOfElement(userProfileVerificationXpath);
        return this;
    };

    this.verify_notifications_pop_up = function(){
        helper.waitAndClick(notificationsBtnXpath);
        helper.verifyPresenceOfElement(newNotificationXpath);
    };

    this.navigate_to_forum_page = function(){
        helper.waitAndClick(forumBtnXpath);
        helper.waitVisibility(forumVerificationXpath);
        helper.verifyPresenceOfElement(forumVerificationXpath);
        return this;
    };

    this.navigate_to_functions_page = function(){
        helper.waitAndClick(functionsBtnXpath);
        helper.waitVisibility(functionVerificationXpath);
        helper.verifyPresenceOfElement(functionVerificationXpath);
        return this;
    };

    this.navigation_to_members_page = function(){
        helper.waitAndClick(membersBtnXpath);
        helper.waitVisibility(membersVerificationXpath);
        helper.verifyPresenceOfElement(membersVerificationXpath);
        return this;
    };

    this.navigate_to_deals_page = function(){
        helper.waitAndClick(dealsBtnXpath);
        helper.waitVisibility(dealsVerificationXpath);
        helper.verifyPresenceOfElement(dealsVerificationXpath);
        return this;
    };

    this.navigate_to_nominate_page = function(){
        helper.waitAndClick(nominateBtnXpath);
        helper.waitVisibility(nominateVerificationXpath);
        helper.verifyPresenceOfElement(nominateVerificationXpath);
        return this;
    };

};
module.exports = new HomePage();
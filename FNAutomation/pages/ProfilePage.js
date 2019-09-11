'use strict'

var helper = require('../helpers/e2e-helper.js');

var dropdownMenuProfileBtnXpath = element(by.xpath("//div[@id='avatar']//a[@class='seriesa_badge']"));
var profilePageBtnXpath = element(by.xpath("//a[contains(text(),'Profile')]"));
var profilePageverification = element(by.xpath("//h4[contains(text(),'INFORMATION')]"));
var editBtnXpath = element(by.xpath("//div[@class='card section']//i"));
var searchExpertiseXpath = element(by.xpath("//li[@class='search-field']//input"));
var expertiseStrategyXpath = element(by.xpath("//div[@class='chosen-drop']//li[1]"));
var expertiseFieldXpath = element(by.xpath("//input[@class='default']"));
var saveBtnXpath = element(by.xpath("//div[@class='controls expertise']//div[@class='save'][contains(text(),'SAVE')]"));
var dropdownOption = element(by.xpath("//div[@class='chosen-drop']//li[1]"));
var saveExpertiseXpath = element(by.xpath("//div[@class='controls expertise']//div[@class='save'][contains(text(),'SAVE')]"));


var ProfilePage = function(){

    this.navigate_to_profile_page = function(){
        browser.sleep(1500);
        helper.waitAndClick(dropdownMenuProfileBtnXpath);
        helper.waitAndClick(profilePageBtnXpath);
        helper.waitVisibility(profilePageverification);
        helper.verifyPresenceOfElement(profilePageverification);
        return this;
    };

    this.select_expertise = function(){
        helper.waitAndClick(editBtnXpath);
        helper.waitAndClick(expertiseStrategyXpath);
        helper.waitAndClick(saveExpertiseXpath);
        return this;
    };

    
    

};

module.exports = new ProfilePage()
'use strict'

var helper = require('../helpers/e2e-helper.js');

var workBtnXpath = element(by.xpath("//a[contains(text(),'Work')]"));
var companyFieldXpath = element(by.xpath("//input[@id='company']"));
var jobFieldXpath = element(by.xpath("//input[@id='jobTitle']"));
var updateProfileBtnXpath = element(by.xpath("//button[@class='btn btn-primary']"));

var WorkPage = function(){
    
    this.update_work_info = function(){
        helper.waitAndClick(workBtnXpath);
        browser.sleep(1500);
        helper.clearAndEnterValue(companyFieldXpath, 'IslamicMarkets Testing Crew - Automation');
        helper.clearAndEnterValue(jobFieldXpath, 'Super Admin');
        helper.waitAndClick(updateProfileBtnXpath);
        return this;
    };
    
};

module.exports = new WorkPage()
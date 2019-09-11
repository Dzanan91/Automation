'use strict'

var helper = require('../helpers/e2e-helper.js');

var dashboardXpath = element(by.xpath("//div[@class='auth-wrapper']//h3[1]"));
var searchFieldXpath = element(by.xpath("//span[@class='twitter-typeahead']//input[@id='search-input']"));
var searchBtnXpath = element(by.xpath("//form[@id='navbar-search']//i[@class='fa fa-search']"));
var onlyProgrammesXpath = element(by.xpath("//div[@class='auth-wrapper']//a[2]"));
var onlyModulesXpath = element(by.xpath("//div[@class='auth-wrapper']//a[3]"));
var onlyTopicsXpath = element(by.xpath("//a[4]"));
var onlyPublicationsXpath = element(by.xpath("//a[5]"));
var onlyTagsXpath = element(by.xpath("//i[@class='fa fa-users fa-lg fa-fw']"));
var addAssessmentBtnXpath = element(by.xpath("//button[@class='btn btn-link']"));
var searchAssessmentFieldXpath = element(by.xpath("//input[@id='search-assessments']"));
var assessmentXpath = element(by.xpath("//div[@id='add-assessment-modal']//a[1]//h5[1]"));
var addYourNoteForAssessmentFieldXpath = element(by.xpath("//div[@class='modal-body note-form']//div[@id='add-file-note']"));
var sendBtnXpath = element(by.xpath("//div[@class='text-right']//button[@class='btn btn-warning sendNotesBtn assign-team-btn'][contains(text(),'Send')]"));
var latestNotesFeedXpath = element(by.xpath("//div[@id='latest-notes']//div[@class='f18']"));
var reportsBtnXpath = element(by.xpath("//i[@class='far fa-chart-bar']"));
var programmesBtnXpath = element(by.xpath("//i[@class='fas fa-th-list']"));
var searchModulesFieldXpath = element(by.xpath("//input[@id='filterModules_tag']"));
var overviewBtnXpath = element(by.xpath("//a[contains(text(),'Overview')]"));
var islamicSearchProgrammesOnlyURL = 'https://learning.aveknew.com/search?query=islamic&type=programmes';
var islamicSearchModulesOnlyURL = 'https://learning.aveknew.com/search?query=islamic&type=modules';
var islamicSearchTopicsOnlyURL = 'https://learning.aveknew.com/search?query=islamic&type=topics';
var islamicSearchPublicationsOnlyURL = 'https://learning.aveknew.com/search?query=islamic&type=publications';
var islamicSearchTagsOnlyURL = 'https://learning.aveknew.com/search?query=islamic&type=tags';
var adminBtnXpath = element(by.xpath("//li[@class='admin-button']//a[@class='text-center'][contains(text(),'Admin')]"));
var createNewProgrammeBtn = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var classesBtnXpath = element(by.xpath("//i[@class='far fa-calendar']"));
var previousClassesBtnXPath = element(by.xpath("//a[contains(text(),'Previous Classes')]"));
var progressBtnXpath = element(by.xpath("//i[@class='fas fa-progress']"));
var learningHistoryBtnXpath = element(by.xpath("//a[contains(text(),'Learning History')]"));


var HomePage = function() {


    this.verify_user_able_to_land_on_homepage = function(){
        helper.verifyPresenceOfElement(dashboardXpath);
        return this;
    };

    this.verify_user_able_to_open_programmes_results_only = function(){
        helper.clearAndEnterValue(searchFieldXpath, 'islamic');
        helper.waitAndClick(searchBtnXpath);
        helper.waitAndClick(onlyProgrammesXpath);
        helper.verifyCurrentUrl(islamicSearchProgrammesOnlyURL);
        return this;
    };

    this.verify_user_able_to_open_modules_results_only = function(){
        helper.clearAndEnterValue(searchFieldXpath, 'islamic');
        helper.waitAndClick(searchBtnXpath);
        helper.waitAndClick(onlyModulesXpath);
        helper.verifyCurrentUrl(islamicSearchModulesOnlyURL);
        return this;
    };

    this.verify_user_able_to_open_topics_results_only = function(){
        helper.clearAndEnterValue(searchFieldXpath, 'islamic');
        helper.waitAndClick(searchBtnXpath);
        helper.waitAndClick(onlyTopicsXpath);
        helper.verifyCurrentUrl(islamicSearchTopicsOnlyURL);
        return this;
    };

    this.verify_user_able_to_open_publications_results_only = function(){
        helper.clearAndEnterValue(searchFieldXpath, 'islamic');
        helper.waitAndClick(searchBtnXpath);
        helper.waitAndClick(onlyPublicationsXpath);
        helper.verifyCurrentUrl(islamicSearchPublicationsOnlyURL);
        return this;
    };

    this.verify_user_able_to_open_tags_results_only = function(){
        helper.clearAndEnterValue(searchFieldXpath, 'islamic');
        helper.waitAndClick(searchBtnXpath);
        helper.waitAndClick(onlyTagsXpath);
        helper.verifyCurrentUrl(islamicSearchTagsOnlyURL);
        return this;
    };

    this.verify_user_able_to_open_programmes_page = function(){
        helper.waitAndClick(programmesBtnXpath);
        helper.waitVisibility(searchModulesFieldXpath);
        return this;
    };

    this.verify_user_able_to_open_reports_page = function(){
        helper.waitAndClick(reportsBtnXpath);
        helper.waitVisibility(overviewBtnXpath);
        return this;
    };

    this.verify_that_user_able_to_open_admin_page = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitVisibility(createNewProgrammeBtn);
        return this;
    };

    this.verify_that_user_able_to_open_classes_page = function(){
        helper.waitAndClick(classesBtnXpath);
        helper.waitVisibility(previousClassesBtnXPath);
        return this;
    };

    this.verify_that_user_able_to_open_progress_page = function(){
        helper.waitAndClick(progressBtnXpath);
        helper.waitVisibility(learningHistoryBtnXpath);
        return this;
    };


};

module.exports = new HomePage
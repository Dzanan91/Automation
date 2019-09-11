'use strict'

var helper = require('../helpers/e2e-helper.js');


var adminBtnXpath = element(by.xpath("//li[@class='admin-button']//a[@class='text-center'][contains(text(),'Admin')]"));
var videosBtnXpath = element(by.xpath("//a[contains(text(),'Videos')]"));
var addNewVideoBtnXpath = element(by.xpath("//i[@class='fa fa-upload']"));
var publicationsBtnXpath = element(by.xpath("//a[contains(text(),'Publications')]"));
var uploadPublicationBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var classesBtnXpath = element(by.xpath("//a[contains(text(),'Classes')]"));
var createNewClassBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var assessmentsAndSurveysBtnXpath = element(by.xpath("//a[contains(text(),'Assessments & Surveys')]"));
var createNewAssessmentBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var createNewProgrammeBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var titleFieldXpath = element(by.xpath("//input[@id='title']"));
var descriptionFieldXpath = element(by.xpath("//textarea[@id='description']"));
var selectLevelXpath = element(by.xpath("//select[@name='level']"));
var publishedCheckboxXpath = element(by.xpath("//div[6]//label[1]//input[2]"));
var featuredCheckboxXpath = element(by.xpath("//div[7]//label[1]//input[2]"));
var nextBtnXpath = element(by.xpath("//input[@class='btn btn-warning write-access']"));
var addVideoBtnXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[2]/div[1]/button[1]"));
var selectVideoBtnXpath = element(by.xpath("//tr[2]//td[6]//button[1]"));
var videoLectureTitleFieldXpath = element(by.xpath("//div[@id='select-video-container']//input[@id='title']"));
var saveVideoBtnXpath = element(by.xpath("//div[@id='select-video-container']//button[@class='btn btn-warning'][contains(text(),'Save')]"));
var addAssessmentBtnXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[@class='row']/div[2]/button[1]"));
var searchAssessmentFieldXpath = element(by.xpath("//input[@id='search-assessments']"));
var testAssessmentXpath = element(by.xpath("//h5[contains(text(),'Assesment test dzanan')]"));
var addBtnXpath = element(by.xpath("//input[@class='btn btn-warning']"));
var addPublicationBtnXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[@class='row']/div[3]/button[1]"));
var publicationTitleFieldXpath = element(by.xpath("//input[@id='publicationSearch']"));
var selectPublicationBtnXpath = element(by.xpath("//tr[4]//td[4]//button[1]"));
var savePublicationBtnXpath = element(by.xpath("//div[@id='select-publication-container']//button[@class='btn btn-warning'][contains(text(),'Save')]"));
var addSectionBtnXpath = element(by.xpath("//button[@id='add-section-btn']"));
var enterSectionTitleFieldXpath = element(by.xpath("//div[@id='add-section-form-container']//input[@placeholder='Enter a Title']"));
var enterSectionDescriptionFieldXpath = element(by.xpath("//div[@id='add-section-form-container']//input[@placeholder='Enter a Description']"));
var addNewSectionBtnXpath = element(by.xpath("//button[@class='btn btn-warning write-access']")); 
var addClassBtnXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[3]/div[1]/button[1]"));
var selectClassBtnXpath = element(by.xpath("//tr[1]//td[3]//button[1]"));
var finalNextBtnXpath = element(by.xpath("//a[@class='btn btn-warning btn-lg write-access']"));
var createNewAssessmentBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var assessmentTitleFieldXpath = element(by.xpath("//input[@id='quizTitle']"));
var plusBtnXpath = element(by.xpath("//i[@class='fa fa-plus']"));
var questionFieldXpath = element(by.xpath("//textarea[@name='questions[1]'"));
var addDescriptionBtnXpath = element(by.xpath("//a[contains(text(),'+ Add Description')]"));
var descriptionFieldXpath = element(by.xpath("//textarea[@name='description']"));
var randomiseQuestionCheckboxXpath = element(by.xpath("//div[@class='checkbox']//input[2]"));
var limitQuestionFieldXpath = element(by.xpath("//input[@name='limit']"));
var allowMultiAnswersCheckboxXpath = element(by.xpath("//div[@class='checkbox quiz-actions']//input[2]"));
var maxAttempsFieldXpath = element(by.xpath("//input[@name='max_attempts']"));
var saveBtnXpath = element(by.xpath("//button[@class='btn btn-warning btn-lg write-access']"));
var classTitleFieldXpath = element(by.xpath("//input[@name='title']"));
var classDescriptionFieldXpath = element(by.xpath("//body[@id='tinymce']//p"));
var locationFieldXpath = element(by.xpath("//input[@name='location']"));
var dateFieldXpath = element(by.xpath("//div[@id='start-date-time']//input[@placeholder='yyyy-mm-dd']"));
var timeFieldXpath = element(by.xpath("//div[@id='start-date-time']//input[@placeholder='hh:mm']"));
var publishedClassCheckboxXpath = element(by.xpath("//div[@class='checkbox']//label[1]"));
var createBtnXpath = element(by.xpath("//button[@class='btn btn-warning write-access']"));



var AdminPage = function() {


    this.verify_user_able_to_open_manage_videos_page = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(videosBtnXpath);
        helper.waitVisibility(addNewVideoBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_manage_publications_page = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(publicationsBtnXpath);
        helper.waitVisibility(uploadPublicationBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_manage_classes_page = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(classesBtnXpath);
        helper.waitVisibility(createNewClassBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_assessments_and_surveys_page = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(assessmentsAndSurveysBtnXpath);
        helper.waitVisibility(createNewAssessmentBtnXpath);
        return this;
    };

    this.verify_user_able_to_create_new_programme = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(createNewProgrammeBtnXpath);
        helper.waitVisibility(titleFieldXpath);
        helper.clearAndEnterValue(titleFieldXpath, 'ProgrammeTest8327857612387');
        helper.clearAndEnterValue(descriptionFieldXpath, 'this is a new programme');
        //upload image
        helper.waitAndClick(selectLevelXpath);
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        helper.waitAndClick(publishedCheckboxXpath);
        helper.waitAndClick(featuredCheckboxXpath);
        helper.waitAndClick(nextBtnXpath);
        helper.waitVisibility(addVideoBtnXpath);
        helper.waitAndClick(addVideoBtnXpath); 
        helper.waitAndClick(selectVideoBtnXpath);       
        helper.clearAndEnterValue(videoLectureTitleFieldXpath, 'LectureTest3876287432739821');
        helper.waitAndClick(saveVideoBtnXpath);
        helper.waitAndClick(addAssessmentBtnXpath);
        helper.waitVisibility(searchAssessmentFieldXpath);
        helper.clearAndEnterValue(searchAssessmentFieldXpath, 'test');
        helper.waitAndClick(testAssessmentXpath);
        helper.waitAndClick(addBtnXpath);
        helper.waitVisibility(addPublicationBtnXpath);
        helper.waitAndClick(addPublicationBtnXpath);
        helper.waitVisibility(publicationTitleFieldXpath);
        helper.clearAndEnterValue(publicationTitleFieldXpath, 'test');
        helper.waitAndClick(selectPublicationBtnXpath);
        helper.waitAndClick(savePublicationBtnXpath);
        helper.waitAndClick(addSectionBtnXpath);
        helper.clearAndEnterValue(enterSectionTitleFieldXpath, 'dzananAutomation');
        helper.clearAndEnterValue(enterSectionDescriptionFieldXpath, 'newAutomationTest');
        helper.waitAndClick(addNewSectionBtnXpath);
        helper.waitAndClick(addClassBtnXpath);
        helper.waitAndClick(selectClassBtnXpath);
        helper.waitAndClick(finalNextBtnXpath);
        return this;
    };

    this.verify_user_able_to_create_new_assessment = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(assessmentsAndSurveysBtnXpath);
        helper.waitAndClick(createNewAssessmentBtnXpath);
        helper.clearAndEnterValue(assessmentTitleFieldXpath, 'Assessment Test 12345');
        
        // helper.waitAndClick(plusBtnXpath);
        // helper.waitVisibility(questionFieldXpath);
        // helper.clearAndEnterValue(questionFieldXpath, 'What is the biggest land mammal?');
        
        
        helper.scrollAndClick(addDescriptionBtnXpath);
        helper.clearAndEnterValue(descriptionFieldXpath, 'this is short description');
        helper.waitAndClick(randomiseQuestionCheckboxXpath);
        helper.clearAndEnterValue(limitQuestionFieldXpath, '3');
        helper.waitAndClick(allowMultiAnswersCheckboxXpath);
        helper.clearAndEnterValue(maxAttempsFieldXpath, '3');
        helper.waitAndClick(saveBtnXpath);
        browser.sleep(8000);
        return this;
    };

    this.verify_user_able_create_new_class = function(){
        helper.waitAndClick(adminBtnXpath);
        helper.waitAndClick(classesBtnXpath);
        helper.waitAndClick(createNewClassBtnXpath);
        helper.clearAndEnterValue(classTitleFieldXpath, 'Class Test 07222019');
        //helper.waitAndClick(classDescriptionFieldXpath, 'this is a short class description');
        helper.clearAndEnterValue(locationFieldXpath, 'Paris');
        helper.clearAndEnterValue(dateFieldXpath, '2019-07-11');
        helper.clearAndEnterValue(timeFieldXpath, '18:20');
        //helper.waitAndClick(publishedClassCheckboxXpath);
        helper.waitAndClick(createBtnXpath);
        return this;
    };
};


module.exports = new AdminPage
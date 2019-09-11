'use strict'

var helper = require('../helpers/e2e-helper.js');

var programmesBtnXpath = element(by.xpath("//i[@class='fas fa-th-list']"));
var testingProgrammeXpath = element(by.xpath("//b[contains(text(),'Tourism Standards')]"));
var resumeTheProgrammeBtnXpath = element(by.xpath("//a[@class='btn btn-warning btn-orange']"));
var bookAsClassroomTrainingBtnXpath = element(by.xpath("//a[contains(text(),'Book as Classroom Training')]"));
var authorsNameBtnXpath = element(by.xpath("//a[contains(text(),'Wish Bone')]"));
var overviewBtnXpath = element(by.xpath("//a[contains(text(),'Overview')]"));
var videoSegmentBtnXpath = element(by.xpath("//a[@id='video-part-631']//span[contains(text(),'Mid')]"));
var notesBtnXpath = element(by.xpath("//div[@id='content-list-wrapper']//li[2]//a[1]"));
var notesXpath = element(by.xpath("//div[@class='notes-list']"));
var transcriptBtnXpath = element(by.xpath("//a[contains(text(),'Transcript')]"));
var transcriptXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[@class='container-wrapper']/div[@id='module-content-wrapper']/div[@class='col-md-9 module-content-left']/div[@class='col-xs-12 infoblock-container']/div[@id='module-info']/div[1]"));
var sectionBtnXpath = element(by.xpath("//a[contains(text(),'Roald Velden - People Come People Go')]"));
var secondSectionXpath = element(by.xpath("//p[@id='publication-94']//a[1]"));
var quizSectionXpath = element(by.xpath("//p[@id='quiz-410']//a[1]"));
var startQuizBtnXpath = element(by.xpath("//button[@id='start-quiz-btn']"));
var searchModulesByKeywordsFieldXpath = element(by.xpath("//input[@id='filterModules_tag']"));
var popUpOKbtnXpath = element(by.xpath("//i[@class='fa fa-close']"));
var dropdownBtnXpath = element(by.xpath("//a[@class='fa fa-angle-up angle-down collapsed']"));
var programmesHeaderXpath = element(by.xpath("//h3[@class='programmes-heading']"));
var adminBtnXpath = element(by.xpath("//li[@class='admin-button']//a[@class='text-center'][contains(text(),'Admin')]"));
var createNewProgramBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var newProgramTitleXpath = element(by.xpath("//input[@id='title']"));
var descriptionFieldXpath = element(by.xpath("//textarea[@id='description']"));
var selectLvlIntermXpath = element(by.xpath("//option[contains(text(),'Intermediate')]"));
var yesNoSLiderXpath = element(By.xpath("//div[@class='button-switch']"));
var publishedCheckboxXpath = element(by.xpath("//div[@class='auth-wrapper']//div[6]"));
var featuredCheckboxXpath = element(by.xpath("//div[@class='auth-wrapper']//div[7]"));
var nextBtnXpath = element(by.xpath("//input[@class='btn btn-warning write-access']"));
var moduleInfoStatXpath = element(by.xpath("//span[@class='module-info-stat']"));
var addVideobtnXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[2]/div[1]/button[1]"));
var firstVideoxpath = element(by.xpath("//tr[1]//td[6]//button[1]"));
var videoTitleXpath = element(by.xpath("//div[@id='select-video-container']//input[@id='title']"));
var saveVideobtnXpath = element(by.xpath("//div[@id='select-video-container']//button[@class='btn btn-warning'][contains(text(),'Save')]"));
var addAssesmentXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[@class='row']/div[2]/button[1]"));
var searchAssessFieldXpath = element(by.xpath("//input[@id='search-assessments']"));
var dzananAssessment = element(by.xpath("//h5[contains(text(),'Assesment test dzanan')]"));
var addAssessmentBtnXpath = element(by.xpath("//input[@class='btn btn-warning']"))
var addPublicationXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[@class='row']/div[3]/button[1]"));
var publicationSearchFieldXpath = element(by.xpath("//input[@id='publicationSearch']"));
var selectPublicationBtnXpath = element(by.xpath("//button[@class='btn btn-warning btn-sm select-publication-button']"));
var savePublicationBtnXpath = element(by.xpath("//div[@id='select-publication-container']//button[@class='btn btn-warning'][contains(text(),'Save')]"));
var addSectionXpath = element(by.xpath("//button[@id='add-section-btn']"));
var enterTitleFieldXpath = element(by.xpath("//div[@id='add-section-form-container']//input[@placeholder='Enter a Title']"));
var enterDescriptionFieldXpath = element(by.xpath("//div[@id='add-section-form-container']//input[@placeholder='Enter a Description']"));
var addSectionBtnXpath = element(by.xpath("//button[@class='btn btn-warning write-access']"));
var addClassXpath = element(by.xpath("//body[@class='logged-in']/div[@class='auth-wrapper']/div[@class='auth-content-wrapper']/div[contains(@class,'container-wrapper padding-t-20')]/div[@class='row']/div[@class='col-sm-9']/div[@class='panel box-shadow']/div[@class='panel-body padding-30']/div[3]/div[1]/button[1]"));
var classTitleFieldXpath = element(by.xpath("//input[@id='classSearch']"));
var selectClassBtnXpath= element(by.xpath("//button[@name='classId']"));
var contentNextBtnXpath = element(by.xpath("//a[@class='btn btn-warning btn-lg write-access']"));
var searchAuthorsBtnXpath = element(by.xpath("//span[@class='select2-selection select2-selection--single']"));
var searchAuthorsFieldXpath = element(by.xpath("//input[@class='select2-search__field']"));
var saveAuthorsBtnXpath = element(by.xpath("//button[@class='btn btn-warning btn-lg write-access']"));
var helpdeskPageMessageFieldXpath = element(by.xpath("//textarea[@placeholder='Your message (required):']"));
var assessmentTabXpath = element (by.xpath("//a[contains(text(),'Assessments & Surveys')]"));
var createNewAssessmentBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));
var newAssessmentTitleFieldXpath = element(by.xpath("//input[@id='quizTitle']"));
var addQuestionBtnXpath = element(by.xpath("//i[@class='fa fa-plus']"));
var questionFieldXpath = element(by.xpath("//div[@id='question-box-1']//div[@class='col-sm-12']//div[@class='form-group']")); 
var profilePageBioBtnXpath = element(by.xpath("//div[@class='profile-menu']//li[2]//a[1]"));
var ugandaProgrammeXpath = element(by.xpath("//b[contains(text(),'Uganda Islamic Banking Programme')]"));


var ProgrammesPage = function(){

    this.verify_user_able_to_open_programme_page = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitVisibility(resumeTheProgrammeBtnXpath);
        return this;
    };
    
    this.verify_user_able_to_open_overview_tab = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(overviewBtnXpath);
        helper.waitVisibility(moduleInfoStatXpath);
        return this;
    };

    this.verify_user_able_to_open_helpdesk_page = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(bookAsClassroomTrainingBtnXpath);
        helper.waitVisibility(helpdeskPageMessageFieldXpath);
        return this;
    };

    this.verify_user_able_to_open_programme_authors_profile = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(authorsNameBtnXpath)
        helper.waitVisibility(profilePageBioBtnXpath);
        return this;
    };
    
    this.verify_user_able_to_open_programme_section = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(sectionBtnXpath);
        helper.waitVisibility(notesBtnXpath);
        return this;
    };

    this.verify_user_able_to_skip_video_segments = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(videoSegmentBtnXpath);
        return this;
    };

    this.verify_user_able_to_continue_watching_programmes_video = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(resumeTheProgrammeBtnXpath);
        helper.waitVisibility(notesBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_notes = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(resumeTheProgrammeBtnXpath);
        helper.waitAndClick(notesBtnXpath);
        helper.waitVisibility(notesXpath);
        return this;
    };

    this.verify_user_able_to_open_transcript = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.waitAndClick(testingProgrammeXpath);
        helper.waitAndClick(sectionBtnXpath);
        helper.scrollAndClick(transcriptBtnXpath);
        helper.waitVisibility(transcriptXpath);
        return this;
    };

    this.verify_user_able_to_search_for_programmes_with_keywords = function() {
        helper.waitAndClick(programmesBtnXpath);
        helper.clearAndEnterValue(searchModulesByKeywordsFieldXpath, 'uganda');
        helper.waitVisibility(ugandaProgrammeXpath);
        return this;
    };

    
};

module.exports = new ProgrammesPage
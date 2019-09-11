'use script'

var helper = require('../helpers/e2e-helper.js');


var reportsBtnXpath = element(by.xpath("//i[@class='far fa-chart-bar']"));
var modulesReportsBtnXpath = element(by.xpath("//a[contains(text(),'Modules')]"));
var moduleExampleXpath = element(by.xpath("//a[contains(text(),'IB Pro Programme 1')]"));
var programmesReportsBtnXpath = element(by.xpath("//li[contains(@class,'margin-b-5')]//a[contains(text(),'Programmes')]"));
var programmeExampleXpath = element(by.xpath("//a[contains(text(),'Our Call')]")); 
var assessmentsReportsBtnXpath = element(by.xpath("//a[contains(text(),'Assessments')]"));
var assessmentExampleXpath = element(by.xpath("//a[contains(text(),'Diet History Survey')]"));
var specialistsReportsBtnXpath = element(by.xpath("//li[contains(@class,'margin-b-5')]//a[contains(text(),'Specialist Report')]"));
var specialistsReportURL = 'https://learning.aveknew.com/reports/specialists';
var mySpecialistReportBtnXpath = element(by.xpath("//a[contains(text(),'My Specialist Report')]"));
var mySpecialistReportURL = 'https://learning.aveknew.com/reports/specialist/383';


var ReportsPage = function(){

    this.verify_user_able_to_open_modules_reports_page = function(){
        helper.waitAndClick(reportsBtnXpath);
        helper.waitAndClick(modulesReportsBtnXpath);
        helper.waitVisibility(moduleExampleXpath);
        return this;
    };

    this.verify_user_able_to_open_programmes_reports_page = function(){
        helper.waitAndClick(reportsBtnXpath);
        helper.waitAndClick(programmesReportsBtnXpath);
        helper.waitVisibility(programmeExampleXpath);
        return this;
    };

    this.verify_user_able_to_open_assessments_reports_page = function(){
        helper.waitAndClick(reportsBtnXpath);
        helper.waitAndClick(assessmentsReportsBtnXpath);
        helper.waitVisibility(assessmentExampleXpath);
        return this;
    };

    this.verify_user_able_to_open_specialists_reports_page = function(){
        helper.waitAndClick(reportsBtnXpath);
        helper.waitAndClick(specialistsReportsBtnXpath);
        helper.verifyCurrentUrl(specialistsReportURL);
        return this;
    };

    this.verify_user_able_to_open_my_specialist_report_page = function(){
        helper.waitAndClick(reportsBtnXpath);
        helper.waitAndClick(mySpecialistReportBtnXpath);
        helper.verifyCurrentUrl(mySpecialistReportURL);
        return this;
    };

};

module.exports = new ReportsPage
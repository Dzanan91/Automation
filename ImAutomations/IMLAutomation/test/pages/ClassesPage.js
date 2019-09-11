'use strict'

var helper = require('../helpers/e2e-helper.js');

var classesBtnXpath = element(by.xpath("//i[@class='far fa-calendar']"));
var previousClassesbtnXpath = element(by.xpath("//a[contains(text(),'Previous Classes')]"));
var classShowXpath = element(by.xpath("//strong[contains(text(),'Golem Class Show')]"));
var classExampleXpath = element(by.xpath("//strong[contains(text(),'Super Admin Paul Class 20 August')]"));
var editBtnXpath = element(by.xpath("//i[@class='fa fa-pencil']"));
var titleFieldXpath = element(by.xpath("//input[@name='title']"));
var manageClassesBtnXpath = element(by.xpath("//a[@class='btn btn-warning btn-block btn-square']"));
var createNewClassBtnXpath = element(by.xpath("//a[@class='btn btn-warning pull-right']"));

var ClassesPage = function() {

    this.verify_navigation_to_the_previous_classes_page = function(){
        helper.waitAndClick(classesBtnXpath);
        helper.waitAndClick(previousClassesbtnXpath);
        helper.verifyPresenceOfElement(classShowXpath);
        return this;
    };

    this.verify_user_able_to_open_class = function(){
        helper.waitAndClick(classesBtnXpath);
        helper.waitAndClick(previousClassesbtnXpath);
        helper.waitAndClick(classExampleXpath);
        helper.waitVisibility(editBtnXpath);
        return this;
    };

    this.verify_user_able_to_open_edit_class_page = function(){
        helper.waitAndClick(classesBtnXpath);
        helper.waitAndClick(previousClassesbtnXpath);
        helper.waitAndClick(classExampleXpath);
        helper.waitAndClick(editBtnXpath);
        helper.waitVisibility(titleFieldXpath);
        return this;
    };

    this.verify_user_able_to_open_manage_classes_page = function(){
        helper.waitAndClick(classesBtnXpath);
        helper.waitAndClick(manageClassesBtnXpath);
        helper.waitVisibility(createNewClassBtnXpath);
        return this;
    };
};

module.exports = new ClassesPage

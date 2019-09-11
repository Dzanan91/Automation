var helper = require('../helpers/e2e-helper.js')

var emailFieldXpath = element(by.xpath("//input[@id='textinput']"));
var passFieldXpath = element(by.xpath("//input[@id='passwordinput']"));
var loginBtnXpath = element(by.xpath("//input[@id='submitbutton']"));
var dropdownMenuBtn = element(by.xpath("//img[@id='avatarBtn']"));
var investorMenuBtn = element(by.xpath("//div[@id='avatar']"));
var commandControlBtn = element(by.xpath("//a[@class='staff_menu border']"));
var opportunitiesBtn = element(by.xpath("//a[contains(text(),'Opportunities')]"));
var logoutBtn = element(by.xpath("//a[contains(text(),'Logout')]"));
var membersBtn = element(by.xpath("//div[@id='menu']//a[contains(text(),'Members')]"));
var summaryBtn = element(by.xpath("//span[contains(text(),'Summary')]"));

var UserLoginVariations = function(){

    this.verify_admin_user_is_able_to_login_and_has_correct_permissions = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'dzannan@foundersnetwork.com');
        helper.clearAndEnterValue(passFieldXpath, 'inter1908');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(5000);
        helper.waitAndClick(dropdownMenuBtn);
        browser.sleep(5000);
        helper.verifyPresenceOfElement(commandControlBtn);
        helper.waitAndClick(logoutBtn);
        return this;
    };

    this.verify_investor_user_is_able_to_login_and_has_correct_permissions = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'test@investor.com');
        helper.clearAndEnterValue(passFieldXpath, 'p@ssw0rd');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(2000);
        helper.waitVisibility(opportunitiesBtn);
        return this;
    };

    this.verify_angel_user_is_able_to_login_and_has_correct_permissions = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'test@angel.com');
        helper.clearAndEnterValue(passFieldXpath, 'p@ssw0rd');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(3000);
        helper.waitAndClick(dropdownMenuBtn);
        browser.sleep(2500);
        helper.verifyAbsenceOfElement(commandControlBtn);
        helper.waitAndClick(logoutBtn);
        return this;
    };

    this.verify_usual_member_is_able_to_login_and_has_correct_permissions = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'test@user.com');
        helper.clearAndEnterValue(passFieldXpath, 'p@ssw0rd');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(2500);
        helper.waitAndClick(dropdownMenuBtn);
        browser.sleep(2500);
        helper.verifyAbsenceOfElement(commandControlBtn);
        helper.waitAndClick(logoutBtn);
        return this;
    };

    this.verify_partner_member_is_able_to_login_and_has_correct_permissions = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'test@partner.com');
        helper.clearAndEnterValue(passFieldXpath, 'p@ssw0rd');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(2500);
        helper.waitAndClick(dropdownMenuBtn);
        browser.sleep(2500);
        helper.verifyAbsenceOfElement(commandControlBtn);
        helper.waitAndClick(logoutBtn);
        return this;
    };

    this.verify_guest_member_is_able_to_login_and_has_correct_permissions = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'guest@guest.com');
        helper.clearAndEnterValue(passFieldXpath, 'p@ssw0rd');
        helper.waitAndClick(loginBtnXpath);
        browser.sleep(2500);
        helper.waitAndClick(membersBtn);
        browser.sleep(2500);
        helper.verifyPresenceOfElement(summaryBtn);
        browser.sleep(2000);
        helper.waitAndClick(dropdownMenuBtn);
        browser.sleep(2500);
        helper.verifyAbsenceOfElement(commandControlBtn);
        helper.waitAndClick(logoutBtn);
        return this;
    };
};

module.exports = new UserLoginVariations();
'use strict'

var helper = require('../helpers/e2e-helper.js');

var emailFieldXpath = element(by.xpath("//input[@id='textinput']"));
var passFieldXpath = element(by.xpath("//input[@id='passwordinput']"));
var loginBtnXpath = element(by.xpath("//input[@id='submitbutton']"));

var Login = function(){
    this.perform_admin_login = function(){
        helper.clearAndEnterValue(emailFieldXpath, 'dzannan@foundersnetwork.com');
        helper.clearAndEnterValue(passFieldXpath, 'inter1908');
        helper.waitAndClick(loginBtnXpath);
        return this;
    }
};

module.exports = new Login()
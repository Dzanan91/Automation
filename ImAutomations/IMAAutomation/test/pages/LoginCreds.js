'use strict'

var helper = require('../helpers/e2e-helper.js');


var emailFieldXpath = element(by.xpath("//input[@id='email']"));
var passFieldXpath = element(by.xpath("//input[@id='password']"));
var loginPg_loginBtnXpath = element(by.xpath("//button[@class='btn btn-primary btn-block']"));

var Login = function(){
    this.log_in = function(){
        
        helper.clearAndEnterValue(emailFieldXpath, '3001super@islamicbanker.com');
        helper.clearAndEnterValue(passFieldXpath, 'pass1234');
        helper.waitAndClick(loginPg_loginBtnXpath);
        return this;
    };
    
};

module.exports = new Login

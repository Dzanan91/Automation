'use strict'

var helper = require('../helpers/e2e-helper.js');

var loginBtnXpath = element(by.xpath("//div[contains(text(),'Login')]"));
var emailFieldXpath = element(by.xpath("//input[@id='email']"));
var passFieldXpath = element(by.xpath("//input[@id='password']"));
var loginPg_loginBtnXpath = element(by.xpath("//button[@class='btn btn-primary btn-block']"));

var Login = function(){

            
        this.log_in = function(){
            helper.waitAndClick(loginBtnXpath);
            helper.clearAndEnterValue(emailFieldXpath, '3001super@islamicbanker.com');
            helper.clearAndEnterValue(passFieldXpath, 'pass1234');
            helper.waitAndClick(loginPg_loginBtnXpath);
            browser.sleep(3000);
        };
}; 



module.exports = new Login
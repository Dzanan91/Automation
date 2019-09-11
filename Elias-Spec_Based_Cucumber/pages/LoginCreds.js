'use strict'

var helper = require('../helpers/e2e-helper.js');

var emailFieldXpath = element(by.xpath("//input[@id='email']"));
var pwFieldXpath = element(by.xpath("//input[@id='password']"));
var loginBtnXpath = element(by.xpath("//button[@class='ant-btn width-150 mr-4 ant-btn-primary']"));

var Login = function(){

            
        this.log_in = function(){
            helper.clearAndEnterValue(emailFieldXpath, 'surveyor@edgehill.co.uk');
            helper.clearAndEnterValue(pwFieldXpath, 'Realm34$');
            helper.waitAndClick(loginBtnXpath);
            browser.sleep(3000);
        };
}; 



module.exports = new Login();
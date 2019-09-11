var loginTest = function() {

    this.selectors = {
        "LOGIN_BUTTON_XPATH": "//*[@id='header']/div/div/div[2]/ul[2]/li[5]/a",
        "EMAIL_FIELD_XPATH" : "//*[@id='email']",
        "PASS_FIELD_XPATH": "//*[@id='password']",
        "SUBMIT_BTN_XPATH": "//*[@id='main']/section/div[1]/div/form/div[4]/button",
      };

    this.clickLoginBtn = function(){
        element(by.xpath(this.selectors.LOGIN_BUTTON_XPATH)).click();
    };
    this.emailValid = function(){
        element(by.xpath(this.selectors.EMAIL_FIELD_XPATH)).sendKeys('dzanantest1337+25@gmail.com');
    };
    this.passwordValid = function(){
        element(by.xpath(this.selectors.PASS_FIELD_XPATH)).sendKeys('Inter1908');
    };
    this.clickSubmitBtn = function(){
        element(by.xpath(this.selectors.SUBMIT_BTN_XPATH)).click();

    };
};

module.exports = new loginTest();
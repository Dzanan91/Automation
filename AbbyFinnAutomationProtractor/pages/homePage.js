var homepage = function(){

    this.selectors = {
        "SUB_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[1]/li[2]/a",
        "SHOP_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[1]/li[3]/a",
        "GIFT_CARD_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[1]/li[4]/a",
        "MISSION_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[2]/li[1]/a",
        "FREETRIAL_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[1]/li[1]/a",
        "COMMUNITY_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[2]/li[3]/a",
        "MY_ACCOUNT_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[2]/li[4]/a",
        "LOGOUT_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[2]/li[4]/ul/li[2]/a",
        "SETTINGS_BTN_XPATH":"//*[@id='header']/div/div/div[2]/ul[2]/li[4]/ul/li[1]/a",
        
    };

    this.clickSubscribeBtn = function(){
        element(by.xpath(this.selectors.SUB_BTN_XPATH)).click();
    };
    this.clickShopBtn = function(){
        element(by.xpath(this.selectors.SHOP_BTN_XPATH)).click();
    };
    this.clickGiftCardBtn = function(){
        element(by.xpath(this.selectors.GIFT_CARD_BTN_XPATH)).click();
    };
    this.clickMissionBtn = function(){
        element(by.xpath(this.selectors.MISSION_BTN_XPATH)).click();
    };
    this.clickLearnBtn = function(){
        browser.actions().mouseMove(element(by.xpath("//*[@id='header']/div/div/div[2]/ul[2]/li[2]/a"))).perform();
        element(by.xpath("//*[@id='header']/div/div/div[2]/ul[2]/li[2]/ul/li[1]/a")).click();
    };
    this.clickFreeTrialBtn = function(){
        element(by.xpath(this.selectors.FREETRIAL_BTN_XPATH)).click();
    };
    this.clickCommunityBtn = function(){
        element(by.xpath(this.selectors.COMMUNITY_BTN_XPATH)).click();
    };
    this.clickAccountSettBtn = function(){
        browser.actions().mouseMove(element(by.xpath(this.selectors.MY_ACCOUNT_BTN_XPATH))).perform();
        element(by.xpath(this.selectors.SETTINGS_BTN_XPATH)).click();
    };
    this.clickLogoutBtn = function(){
        browser.actions().mouseMove(element(by.xpath(this.selectors.MY_ACCOUNT_BTN_XPATH))).perform();
        element(by.xpath(this.selectors.LOGOUT_BTN_XPATH)).click();
    };

};

module.exports = new homepage();
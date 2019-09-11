var subpage = function(){

    this.selectors = {
        "DIAPERS_ONLY_BTN_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/div[1]/div[1]/label/span/span[1]",
        "NEXT_BTN_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/div[2]/a",
        "ALL_ONE_SIZE_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/div[1]/div[1]/label/span",
        "SIZE4_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/div[1]/div[1]/ul/li[4]/label/span[2]",
        "BLOOM_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div[1]/ul[2]/li[1]/a",
        "ADD_ONE_TIME_PURCHASE15$_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/ul/li[1]/form/ul/li[1]/a/div",
        "ADD_ONE_TIME_PURCHASE10$_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/ul/li[2]/form/ul/li[1]/a/div",
        "ADD_RECURRING_WITH_SUB15$":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/ul/li[1]/form/ul/li[2]/a/div",
        "ADD_RECURRING_WITH_SUB10$":"//*[@id='subscriptionWizardWrapper']/div/div/div[3]/div/ul/li[2]/form/ul/li[2]/a/div",
        "CHILD_NAME_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[2]/input",
        "FIRST_NAME_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[1]/input",
        "LAST_NAME_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[2]/input",
        "ADDRESS1_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[3]/input",
        "ADDRESS2_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[4]/input",
        "CITY_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[5]/input",
        "STATES_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[6]/div/div[2]/span",
        "ZIP_CODE_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[7]/input",
        "CONTACT_NUMBER_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[1]/form/ul/li[9]/input",
        "CONTINUE_BTN_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div/div[3]/div[2]/button",
        "COMPLETE_SUB_BTN":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div[6]/button",
        "CARDHOLDER_NAME_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div[2]/form/div/div[1]/input",
        "CARD_NUMBER_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div[2]/form/div/div[2]/input",
        "MONTH_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div[2]/form/div/ul/li[1]/div/div[2]/span",
        "YEAR_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div[2]/form/div/ul/li[2]/div/div[2]/span",
        "CCV_XPATH":"//*[@id='subscriptionWizardWrapper']/div/div/div/div[1]/div[2]/form/div/ul/li[3]/input",

    };
    
    this.clickDiapersOnly = function(){
        element(by.xpath(this.selectors.DIAPERS_ONLY_BTN_XPATH)).click();
    };

    this.clickNextBtn = function(){
        element(by.xpath(this.selectors.NEXT_BTN_XPATH)).click();
    };

    this.clickAllOneSize = function(){
        element(by.xpath(this.selectors.ALL_ONE_SIZE_XPATH)).click();
    };

    


}
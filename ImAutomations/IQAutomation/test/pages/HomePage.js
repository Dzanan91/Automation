'user script'

var helper = require('../helpers/e2e-helper.js');

var IQhomeLogoXpath = element(by.xpath("//a[@class='text-white app-logo mr-1 router-link-exact-active router-link-active']//img"));
var searchIslamicMarketsIQFieldXpath = element(by.xpath("//div[@class='v-select__selections']//input"));
var searchedResultXpath = element(by.xpath("//div[contains(text(),'Turkey')]"));
var snapshotWindowXpath = element(by.xpath("//h5[contains(text(),'Snapshot')]"));
var noResultsMessageXpath = element(by.xpath("//div[@class='text-center pa-2 w-full']"));
var helpDeskBtnXpath = element(by.xpath("//*[@class='svg-inline--fa fa-headset fa-w-16']"));
var helpDeskPageXpath = element(by.xpath("//h1[contains(text(),'HelpDesk')]"));
var inboxBtnXpath = element(by.xpath("//span[contains(text(),'Inbox')]"));
var myInboxPageXpath = element(by.xpath("//div[@class='hide-overflow']"));
var notificationsBtnXpath = element(by.xpath("//*[@class='svg-inline--fa fa-bell fa-w-14']"));
var notificationsPageXpath = element(by.xpath("//div[@class='hide-overflow']"));
var inviteBtnXpath = element(by.xpath("//span[contains(text(),'Invite')]"));
var invitePageSendInvitationBtnXpath = element(by.xpath("//input[@class='btn btn-warning']"));
var profileBtnXpath = element(by.xpath("//div[@class='v-menu__activator']//button[@class='v-btn v-btn--flat theme--dark']//div[@class='v-btn__content']"));
var settingsBtnXpath = element(by.xpath("//*[@class='svg-inline--fa fa-cog fa-w-16']"));
var accountPageAccSettingsBtnXpath = element(by.xpath("//a[contains(text(),'Account Settings')]"));
var viewProfileBtnXpath = element(by.xpath("//div[contains(text(),'View Profile')]"));
var userProfilePageActivityBtnXpath = element(by.xpath("//strong[contains(text(),'Activity')]"));
var signOutBtnXpath = element(by.xpath("//div[contains(text(),'Sign out')]"));
var loginPageLoginBtnXpath = element(by.xpath("//button[@class='btn btn-primary btn-block']"));
var ADDbtnXpath = element(by.xpath("//b[@class='text-lg']"));
var addNameFieldXpath = element(by.xpath("//a[@class='nav-action text-lg text-uppercase px-3 text-decoration-none v-btn v-btn--router theme--dark warning']//div[@class='v-btn__content']"));
var loginEmailFieldXpath = element(by.xpath("//input[@id='email']"));
var loginPasswordFieldXpath = element(by.xpath("//input[@id='password']"));
var dropdownArrowBtnXpath = element(by.xpath("//div[@class='v-btn__content']//i[@class='v-icon material-icons theme--dark'][contains(text(),'arrow_drop_down')]"));
var manageMonitorsBtnXpath = element(by.xpath("//div[contains(text(),'Manage Monitors')]"));
var addNewMonitorBtnXpath = element(by.xpath("//div[contains(text(),'Add New Monitor')]"));
var loginBtnXpath = element(by.xpath("/html[1]/body[1]/div[1]/div[2]/nav[1]/div[1]/div[2]/a[3]/div[1]"));
var uploadPublicationBtnXpath = element(by.xpath("//div[contains(text(),'Upload Publication')]")); 
var publicationPageSelectFileToUploadBtnXpath = element(by.xpath("//button[@class='btn btn-primary']"));
var writeAnArticleBtnXpath = element(by.xpath("//div[contains(text(),'Write an Article')]"));
var articlePagePublishArticleBtnXpath = element(by.xpath("//button[contains(text(),'Publish')]"));
var addAnEventBtnXpath = element(by.xpath("//div[contains(text(),'Add an Event')]"));
var createEventPageCreateYourEventBtnXpath = element(by.xpath("//a[@class='btn btn-warning margin-b-10 full-width']"));
var addSukukBtnXpath = element(by.xpath("//div[contains(text(),'Add Sukuk')]"));
var addSukukPageSukukMonitorXpath = element(by.xpath("//span[contains(text(),'Sukuk Monitor')]"));
var addCompanyBtnXpath = element(by.xpath("//div[contains(text(),'Add Company')]"));
var addCompanyPageCreateBtnXpath = element(by.xpath("//input[@class='btn btn-info']"));
var addIslamicFundBtnXpath = element(by.xpath("//div[contains(text(),'Add Islamic Fund')]"));
var addIslamicFundPageCreateBtnXpath = element(by.xpath("//input[@class='btn btn-info']"));
var economyBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Economy')]"));
var countryBtnXpath = element(by.xpath("//table[@class='v-datatable v-table theme--dark']//a[@class='text-decoration-none'][contains(text(),'Turkey')]"));
var companiesBtnXpath = element(by.xpath("//div[@class='flex py-1 z-1'][contains(text(),'Companies')]"));
var insightsBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Insights')]"));
var insightsPageXpath = element(by.xpath("//h1[contains(text(),'Insights')]"));
var publicationsBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Publications')]"));
var publicationsPageFilterBtnXpath = element(by.xpath("//button[@class='btn pull-right btn-default']"));
var sukukBtnXpath = element(by.xpath("//div[@class='v-list__tile__content']//div[@class='v-list__tile__title'][contains(text(),'Sukuk')]"));
var sukukMonitorXpath = element(by.xpath("//div[@class='v-card__title mt-0 mb-1']//h5[contains(text(),'Sukuk Monitor')]"));
var banksBtnXpath = element(by.xpath("//div[@class='no-wrap overflow-hidden text-ellipsis text-light pointer'][contains(text(),'Banks')]"));
var searchIconXpath = element(by.xpath("//i[contains(text(),'search')]"));
var searchFieldXpath = element(by.xpath("/html[1]/body[1]/div[1]/div[60]/main[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/input[1]"));
var sukukExampleXpath = element(by.xpath("//a[contains(text(),'Bakery Sukuk Complete')]"));
var sukukInformationXpath = element(by.xpath("//h5[contains(text(),'Sukuk Information')]"));
var sukukMonitorExternalLinkBtnXpath = element(by.xpath("//*[@class='mx-2 svg-inline--fa fa-external-link-alt fa-w-18']"));
var structureTabBtnXpath = element(by.xpath("//a[contains(text(),'Structure')]"));
var documentsTabBtnXpath = element(by.xpath("//a[contains(text(),'Documents')]"));
var caseStudyTabBtnXpath = element(by.xpath("//a[contains(text(),'Case Study')]"));
var ratingsTabBtnXpath = element(by.xpath("//a[contains(text(),'Ratings')]"));
var islamicBanksBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Islamic Banks')]"));
var takafulBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Takaful')]"));
var takafulMonitorXpath = element(by.xpath("//div[@class='v-card__title mt-0 mb-1']//h5[contains(text(),'Takaful Monitor')]"));
var companiesPageBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Companies')]"));
var companiesPageMonitorXpath = element(by.xpath("//div[@class='v-card__title mt-0 mb-1']//h5[contains(text(),'Companies Monitor')]"));
var tendersBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Tenders')]"));
var tendersMonitorXpath = element(by.xpath("//div[@class='v-card__title mt-0 mb-1']//h5[contains(text(),'Tenders Monitor')]"));
var scholarsBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Scholars')]"));
var scholarsMonitorXpath = element(by.xpath("//h5[contains(text(),'Scholars Monitor')]"));
var showMoreBtnXpath = element(by.xpath("//div[contains(text(),'Show more…')]"));
var standardsBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Standards')]"));
var standardsPageSearchStandardFieldXpath = element(by.xpath("//input[@placeholder='Search Standards...']"));
var eventsBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Events')]"));
var eventsPageIslamicFinanceEventsXpath = element(by.xpath("//h1[@class='heading-title no-margin']"));
var knowledgeCenterBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Knowledge Centre')]"));
var knowledgeCenterPageXpath = element(by.xpath("//h1[@class='pull-left']"));
var currenciesBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Currencies')]"));
var globalBtnXpath = element(by.xpath("//div[@class='v-list__tile__title'][contains(text(),'Global')]"));
var currenciesPageURL = 'https://iq.aveknew.com/currencies';
var globalPageURL = 'https://iq.aveknew.com/page/global';
var relatedTabBtnXpath = element(by.xpath("//a[contains(text(),'Related')]"));
var structureURL = 'https://iq.aveknew.com/sukuk/bakery-sukuk-complete/structure';
var documentsURL = 'https://iq.aveknew.com/sukuk/bakery-sukuk-complete/documents';
var caseStudyURL = 'https://iq.aveknew.com/sukuk/bakery-sukuk-complete/case-study';
var ratingsURL = 'https://iq.aveknew.com/sukuk/bakery-sukuk-complete/ratings';
var relatedURL = 'https://iq.aveknew.com/sukuk/bakery-sukuk-complete/related';


var HomePage = function() {

    this.verify_user_able_to_open_homepage = function(){
        helper.waitVisibility(IQhomeLogoXpath);
        helper.verifyPresenceOfElement(IQhomeLogoXpath);
        return this;
    };

    this.verify_user_able_to_search_with_valid_data = function(){
        helper.waitPresence(searchIslamicMarketsIQFieldXpath);
        helper.clearAndEnterValue(searchIslamicMarketsIQFieldXpath, 'turkey');
        helper.waitAndClick(searchedResultXpath);
        helper.waitVisibility(snapshotWindowXpath);
        return this;
    };

    this.verify_user_is_able_to_search_with_invalid_data = function(){
        helper.waitPresence(searchIslamicMarketsIQFieldXpath);
        helper.clearAndEnterValue(searchIslamicMarketsIQFieldXpath, 'invalidInputData');
        helper.waitVisibility(noResultsMessageXpath);
        return this; 
    };

    this.verify_user_able_to_open_helpdesk_page = function(){
        helper.waitAndClick(helpDeskBtnXpath);
        helper.verifyPresenceOfElement(helpDeskPageXpath);
        return this;
    };

    this.verify_user_able_to_open_my_inbox_page = function(){
        helper.waitAndClick(inboxBtnXpath);
        helper.verifyPresenceOfElement(myInboxPageXpath);
        return this;
    };

    this.verify_user_able_to_open_notifications_page = function(){
        helper.waitAndClick(notificationsBtnXpath);
        helper.verifyPresenceOfElement(notificationsPageXpath);
        return this;
    };

    this.verify_user_able_open_invite_page = function(){
        helper.waitAndClick(inviteBtnXpath);
        helper.verifyPresenceOfElement(invitePageSendInvitationBtnXpath);
        return this;
    };

    this.verify_user_able_open_profile = function(){
        helper.hoverAndClick(profileBtnXpath, viewProfileBtnXpath);
        helper.verifyPresenceOfElement(userProfilePageActivityBtnXpath);
        return this;
    };

    this.verify_user_able_open_settings_page = function(){
        helper.hoverAndClick(profileBtnXpath, settingsBtnXpath);
        helper.verifyPresenceOfElement(accountPageAccSettingsBtnXpath);
        return this;
    };

    this.verify_user_able_sign_out = function(){
        helper.hoverAndClick(profileBtnXpath, signOutBtnXpath);
        helper.waitAndClick(loginBtnXpath);
        helper.waitVisibility(loginEmailFieldXpath);
        helper.clearAndEnterValue(loginEmailFieldXpath, '3001super@islamicbanker.com');
        helper.clearAndEnterValue(loginPasswordFieldXpath, 'pass1234');
        helper.waitAndClick(loginPageLoginBtnXpath);
        helper.waitVisibility(profileBtnXpath);
        return this;
    };

    this.verify_user_able_open_add_monitor_page = function(){
        helper.waitAndClick(ADDbtnXpath);
        helper.verifyPresenceOfElement(addNameFieldXpath);
        return this;
    };

    this.verify_user_able_open_monitors_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, manageMonitorsBtnXpath);
        helper.waitVisibility(addNewMonitorBtnXpath);
        return this;
    };

    this.verify_user_able_open_upload_publications_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, uploadPublicationBtnXpath);
        helper.waitVisibility(publicationPageSelectFileToUploadBtnXpath);
        return this;
    };

    this.verify_user_able_open_write_an_article_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, writeAnArticleBtnXpath);
        helper.waitVisibility(articlePagePublishArticleBtnXpath);
        return this;
    };

    this.verify_user_able_open_add_an_event_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, addAnEventBtnXpath);
        helper.waitVisibility(createEventPageCreateYourEventBtnXpath);
        return this;
    };

    this.verify_user_able_open_add_sukuk_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, addSukukBtnXpath);
        helper.waitVisibility(addSukukPageSukukMonitorXpath);
        return this;
    };

    this.verify_user_able_open_add_company_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, addCompanyBtnXpath);
        helper.waitVisibility(addCompanyPageCreateBtnXpath);
        return this;
    };

    this.verify_user_able_open_add_islamic_fund_page = function(){
        helper.hoverAndClick(dropdownArrowBtnXpath, addIslamicFundBtnXpath);
        helper.waitAndClick(addIslamicFundPageCreateBtnXpath);
        return this;
    };

    this.verify_user_able_open_economy_page = function(){
        helper.waitAndClick(economyBtnXpath);
        helper.waitVisibility(snapshotWindowXpath);
        return this;
    };

    this.verify_user_able_open_country_page = function(){
        helper.waitAndClick(economyBtnXpath);
        helper.waitAndClick(countryBtnXpath);
        helper.waitVisibility(companiesBtnXpath);
        return this;
    };

    this.verify_user_able_open_insights_page = function(){
        helper.waitAndClick(insightsBtnXpath);
        helper.waitVisibility(insightsPageXpath);
        return this;
    };

    this.verify_user_able_open_publications_page = function(){
        helper.waitAndClick(publicationsBtnXpath);
        helper.waitVisibility(publicationsPageFilterBtnXpath);
        return this;
    };

    this.verify_user_able_open_sukuk_page = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitVisibility(sukukMonitorXpath);
        return this;
    }

    this.verify_user_able_open_sukuk_list_with_specific_industry_type = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(banksBtnXpath);
        return this;
    };

    this.verify_user_able_search_sukuk_data = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(searchIconXpath);
        helper.waitVisibility(searchFieldXpath);
        helper.clearAndEnterValue(searchFieldXpath, 'bakery');
        return this;
    };

    this.verify_user_able_open_sukuk = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(sukukMonitorExternalLinkBtnXpath);
        browser.sleep(2000);
        helper.waitAndClick(sukukExampleXpath);
        helper.waitVisibility(sukukInformationXpath);
        return this;
    };

    this.verify_user_able_open_sukuk_structure_tab = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(sukukMonitorExternalLinkBtnXpath);
        browser.sleep(1000);
        helper.waitAndClick(sukukExampleXpath);
        browser.sleep(1000);
        helper.waitAndClick(structureTabBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(structureURL);
        return this;
    };

    this.verify_user_able_open_sukuk_documents_tab = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(sukukMonitorExternalLinkBtnXpath);
        browser.sleep(1000);
        helper.waitAndClick(sukukExampleXpath);
        browser.sleep(1000);
        helper.waitAndClick(documentsTabBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(documentsURL);
        return this;
    };

    this.verify_user_able_open_sukuk_case_study_tab = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(sukukMonitorExternalLinkBtnXpath);
        browser.sleep(1000);
        helper.waitAndClick(sukukExampleXpath);
        browser.sleep(1000);
        helper.waitAndClick(caseStudyTabBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(caseStudyURL);
        return this;
    };

    this.verify_user_able_open_sukuk_ratings_tab = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(sukukMonitorExternalLinkBtnXpath);
        browser.sleep(1000);
        helper.waitAndClick(sukukExampleXpath);
        browser.sleep(1000);
        helper.waitAndClick(ratingsTabBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(ratingsURL);
        return this;
    };

    this.verify_user_able_open_related_tab = function(){
        helper.waitAndClick(sukukBtnXpath);
        helper.waitAndClick(sukukMonitorExternalLinkBtnXpath);
        browser.sleep(1000);
        helper.waitAndClick(sukukExampleXpath);
        browser.sleep(1000);
        helper.waitAndClick(relatedTabBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(relatedURL);
        return this;
    };

    this.verify_user_able_open_islamic_banks_page = function(){
        helper.waitAndClick(islamicBanksBtnXpath);
        return this;
    };

    this.verify_user_able_open_takaful_page = function(){
        helper.waitAndClick(takafulBtnXpath);
        helper.waitVisibility(takafulMonitorXpath);
        return this;
    };

    this.verify_user_able_open_companies_page = function(){
        helper.waitAndClick(companiesPageBtnXpath);
        helper.waitVisibility(companiesPageMonitorXpath);
        return this;
    };

    this.verify_user_able_open_tenders_page = function(){
        helper.waitAndClick(tendersBtnXpath);
        helper.waitVisibility(tendersMonitorXpath);
        return this;
    };

    this.verify_user_able_open_scholars_page = function(){
        helper.waitAndClick(scholarsBtnXpath);
        helper.waitVisibility(scholarsMonitorXpath);
        return this;
    };

    this.verify_user_able_open_show_more_dropdown = function(){
        helper.waitAndClick(showMoreBtnXpath);
        helper.waitVisibility(standardsBtnXpath);
        return this;
    };

    this.verify_user_able_open_standards_page = function(){
        helper.waitAndClick(showMoreBtnXpath);
        helper.waitAndClick(standardsBtnXpath);
        helper.waitVisibility(standardsPageSearchStandardFieldXpath);
        return this;
    };

    this.verify_user_able_open_events_page = function(){
        helper.waitAndClick(showMoreBtnXpath);
        helper.waitAndClick(eventsBtnXpath);
        helper.waitVisibility(eventsPageIslamicFinanceEventsXpath);
        return this;
    };

    this.verify_user_able_open_knowledge_center_page = function(){
        helper.waitAndClick(showMoreBtnXpath);
        helper.waitAndClick(knowledgeCenterBtnXpath);
        helper.waitVisibility(knowledgeCenterPageXpath);
        return this;
    };

    this.verify_user_able_open_currencies_page = function(){
        helper.waitAndClick(showMoreBtnXpath);
        helper.waitAndClick(currenciesBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(currenciesPageURL);
        return this;
    };

    this.verify_user_able_open_global_page = function(){
        helper.waitAndClick(showMoreBtnXpath);
        helper.waitAndClick(globalBtnXpath);
        browser.sleep(1000);
        helper.verifyCurrentUrl(globalPageURL);
        return this;
    };
    
};

module.exports = new HomePage
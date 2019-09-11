'use strict'

var page = require('../pages/HomePage');

describe('Home page tests', function(){
    beforeEach(function(){
        browser.get('https://stagehost.foundersnetwork.com/');
    });
    it('1. Should verify Homepage is loaded properly', function(){
        page.homepage_verification();
    });
    it('2. Should verify user can create new post', function(){
        page.create_new_post_via_Create_New_Post_btn();
    });
    it('3. Should create new post via Start discussion feature', function(){
        page.create_new_post_via_Start_Discussion_option();
    });
    it('4. Should verify user is able to reply to an existing post', function(){
        page.verify_post_reply_feature();
    });
    xit('5. Should verify user is able to access notifications', function(){
        page.verify_notifications_pop_up();
    });
    it('6. Should verify user can use search functionality', function(){
        page.verify_search_functionality();
    });
    it('7. Should verify navigating to User profile from Home feed', function(){
        page.verify_navigating_to_user_profile()
    });
    it('8. Should verify user is able to access all pages in nav bar from homepage', function(){
        page.navigate_to_forum_page()
        page.navigate_to_functions_page()
        page.navigation_to_members_page()
        page.navigate_to_deals_page()
        page.navigate_to_nominate_page()
    });
    
});



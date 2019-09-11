'use script'

var page = require('../pages/Homepage.js');

describe('homepage', function(){

    beforeEach(function() {
        browser.get('https://aveknew.com/hub');
    });

    it('1. Verify that user is able to open homepage', function(){
        page.verify_user_able_to_open_homepage()
    });

    it('2. Verify that user is able to open Helpdesk page', function(){
        page.verify_user_able_to_open_helpdesk_page()
    });

    it('3. Verify that user is able to open My Inbox page', function(){
        page.verify_user_able_to_open_my_inbox_page()
    });

    // it('4. Verify that user is able to open Notifications page', function(){
    
    // });

    it('5. Verify that user is able to open Invite People page', function(){
        page.verify_user_able_to_open_invite_people_page()
    });

    it('6. Verify that user is able to open his profile page', function(){
        page.verify_user_able_to_open_his_profile_page()
    });

    it('7. Verify that user is able to open Edit Account page', function(){
        page.verify_user_able_to_open_edit_account_page()
    });

    it('8. Verify that user is able to sign out', function(){
        page.verify_user_able_to_sign_out()
    });

    it('9. Verify that user is able to open Upload Publication page', function(){
        page.verify_user_able_to_open_upload_publication_page()
    });

    it('10. Verify that user is able to open Write an Article page', function(){
        page.verify_user_able_to_open_write_an_article_page()
    });

    it('11. Verify that user is able to open Create New Event page', function(){
        page.verify_user_able_to_open_create_new_event_page()
    });

    it('12. Verify that user is able to open Add Sukuk page', function(){
        page.verify_user_able_to_open_add_sukuk_page()
    });

    it('13. Verify that user is able to open Add new company page', function(){
        page.verify_user_able_to_open_add_new_company_page()
    });

    it('14. Verify that user is able to open Add Islamic Fund page', function(){
        page.verify_user_able_open_add_islamic_fund_page()
    });

    it('15. Verify that user is able to open Content Manager page', function(){
        page.verify_user_able_to_open_content_manager_page()
    });

    it('16. Verify that user is able to open Activity Feed page', function(){
        page.verify_user_able_to_open_activity_feed_page()
    });

    it('17. Verify that user is able to open IML Programmes page', function(){
        page.verify_user_able_to_open_IML_programmes_page()
    });

    it('18. Verify that user is able to open IQ Scholars page', function(){
        page.verify_user_able_to_open_IQ_scholars_page()
    });
    
    it('19. Verify that user is able to open article', function(){
        page.verify_user_able_to_open_article()
    });
    
    it('20. Verify that user is able to open suggested followers profile page', function(){
        page.verify_user_able_to_open_suggested_followers_profile()
    });


});
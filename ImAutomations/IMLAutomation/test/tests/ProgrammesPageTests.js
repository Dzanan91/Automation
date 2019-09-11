'use strict'

var page = require('../pages/ProgrammesPage.js');


describe('Programmes Page', function(){
    
    beforeEach(function() {
        browser.get('https://learning.aveknew.com/dashboard');
    });

    it('1. Verify that user is able to open programme page', function(){
        page.verify_user_able_to_open_programme_page()
    }); 

    it('2. Verify that user is able to open overview tab', function() {
        page.verify_user_able_to_open_overview_tab()
    });

    it('3. Verify that user is able to open HelpDesk page', function() {
        page.verify_user_able_to_open_helpdesk_page()
    });

    it('4. Verify that user is able to open programme authors profile', function() {
        page.verify_user_able_to_open_programme_authors_profile()
    });

    it('5. Verify that user is able to open programme section', function() {
        page.verify_user_able_to_open_programme_section()
    }); 

    it('6. Verify that user is able to continue watching programmes video', function(){
        page.verify_user_able_to_continue_watching_programmes_video()
    });

    it('7. Verify that user is able to skip video segments', function(){
        page.verify_user_able_to_skip_video_segments()
    });

    it('8. Verify that user is able to open notes', function(){
        page.verify_user_able_to_open_notes()
    });

    it('9. Verify that user is able to open transcript', function(){
        page.verify_user_able_to_open_transcript()
    });

    it('10. Verify that user is able to search for programmes with keywords', function(){
        page.verify_user_able_to_search_for_programmes_with_keywords()
    });
    
}); 
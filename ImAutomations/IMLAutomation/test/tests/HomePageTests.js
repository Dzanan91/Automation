'use strict'

var page = require('../pages/HomePage.js');


describe('Home Page', function() {

    beforeEach(function() {
        browser.get('https://learning.aveknew.com/dashboard')
    });

    it('1. Verify that user is able to land on homepage', function(){
        page.verify_user_able_to_land_on_homepage()
    }); 

    it('2. Verify that user is able to open Programmes type results only', function(){
        page.verify_user_able_to_open_programmes_results_only()
    });

    it('3. Verify that user is able to open Modules type results only', function(){
        page.verify_user_able_to_open_modules_results_only()
    });

    it('4. Verify that user is able to open Topics type results only', function(){
        page.verify_user_able_to_open_topics_results_only()
    });

    it('5. Verify that user is able to open Publications type results only', function(){
        page.verify_user_able_to_open_publications_results_only()
    });

    it('6. Verify that user is able to open Tags type results only', function(){
        page.verify_user_able_to_open_tags_results_only()
    });

    it('7. Verify that user is able to open Programmes page', function(){
        page.verify_user_able_to_open_programmes_page()
    });

    it('8. Verify that user is able to open Reports page', function(){
        page.verify_user_able_to_open_reports_page()
    });

    it('9. Verify that user is able to open Admin page', function(){
        page.verify_that_user_able_to_open_admin_page()
    });

    it('10. Verify that user is able to open Classes page', function(){
        page.verify_that_user_able_to_open_classes_page()
    });

    it('11. Verify that user is able to open Progress page', function(){
        page.verify_that_user_able_to_open_progress_page()
    });

});
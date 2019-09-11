'use script'

var page = require('../pages/ReportsPage.js');


describe('Reports Page', function(){

    beforeEach(function() {
        browser.get('https://learning.aveknew.com/dashboard');
    });

    it('1. Verify that user is able to open modules reports page', function(){
        page.verify_user_able_to_open_modules_reports_page()
    });
    
    it('2. Verify that user is able to open programmes reports page', function(){
        page.verify_user_able_to_open_programmes_reports_page()
    });

    it('3. Verify that user is able to open assessments reports page', function(){
        page.verify_user_able_to_open_assessments_reports_page()
    });

    it('4. Verify that user is able to open specialists reports page', function(){
        page.verify_user_able_to_open_specialists_reports_page()
    });

    it('5. Verify that user is able to open My Specialist Report page', function(){
        page.verify_user_able_to_open_my_specialist_report_page();
    });

});
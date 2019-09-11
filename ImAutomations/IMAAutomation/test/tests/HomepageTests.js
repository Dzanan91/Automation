'use strict'

var page = require('../pages/Homepage.js')

describe('Homepage', function(){
    beforeEach(function() {
        browser.get('https://sso.aveknew.com/');
    });
    it('1. Verify user is able to land on Homepage', function(){
        page.landing_page()
    });
    it('2. Verify user is able to land on My Account Page', function(){
        page.open_my_account_page()
    });
    it('3. Verify user is able to open Helpdesk page', function(){
        page.open_helpdesk_page()
    }); 
    it('4. Verify user is able to open Contacts page', function(){
        page.open_contacts_page()
    });
    it('5. Verify user is able to open Deactivate Account page', function(){
        page.open_deactivate_account_page()
    });
    it('6. Verify user is able to open Work page', function(){
        page.open_work_page()
    });
    it('7. Verify user is able to open Notifications page', function(){
        page.open_notifications_page()
    });
    it('8. Verify user is able to open Change Password page', function(){
        page.open_change_password_page()
    });
    it('9. Verify user is able to open Users page', function(){
        page.open_users_page()
    });
    it('10. Verify user is able to open Roles page', function(){
        page.open_roles_page()
    });
    it('11. Verify user is able to open Companies page', function(){
        page.open_companies_page()
    });
    it('12. Verify user is able to open Segments page', function(){
        page.open_segments_page()
    });
    it('13. Verify user is able to open Agreements page', function(){
        page.open_agreements_page()
    });
    it('14. Verify user is able to open Specialists page', function(){
        page.open_specialists_page()
    });
    xit('15. Verify user is able to logout', function(){
        page.logout()
    });
});
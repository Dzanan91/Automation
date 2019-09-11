'use strict'

var page = require('../pages/UserLogins.js')

describe('Login tests with all user variations', function(){
    beforeEach(function(){
        browser.get('https://stagehost.foundersnetwork.com/accounts/login/?next=/')
    });
    it('1. Admin user login verification', function(){
        page.verify_admin_user_is_able_to_login_and_has_correct_permissions()
    });

    it('2. Angel user login verification', function(){
        page.verify_angel_user_is_able_to_login_and_has_correct_permissions();
    });

    it('3. Usual user login verification', function(){
        page.verify_usual_member_is_able_to_login_and_has_correct_permissions();
    });

    it('4. Partner user login verification', function(){
        page.verify_partner_member_is_able_to_login_and_has_correct_permissions();
    });

    it('5. Guest user Login verification', function(){
        page.verify_guest_member_is_able_to_login_and_has_correct_permissions();
    });

    it('6. Investor user login verification',function(){
        page.verify_investor_user_is_able_to_login_and_has_correct_permissions();
    });
});
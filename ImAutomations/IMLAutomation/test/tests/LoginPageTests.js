'use strict'

var page = require('../pages/LoginPage.js');


describe('Login Page', function(){

    beforeEach(function() {
        browser.get('https://learning.islamicmarkets.com');
    });

    it('1. Verify that user is unable to login with invalid data', function(){
        page.verify_user_is_unable_to_login_with_invalid_data()
    });
    
    it('2. Verify that user is able login with valid data', function(){
        page.verify_user_is_able_to_login_with_valid_data()
    });

    it('3. Verify that user is able to open sign up page from login page', function(){
        page.verify_user_is_able_to_open_sign_up_page_from_login_page()
    });

    it('4. Verify that user is unable to sign up with invalid data', function(){
       page.verify_user_is_unable_to_sign_up_with_invalid_data()
    });  
    
    it('5. Verify that Privacy Policy page is loaded properly', function(){
       page.verify_privacy_policy_page_loaded_properly()
    }); 

    it('6. Verify that Cookie Policy page is loaded properly', function(){
       page.verify_cookie_policy_page_loaded_properly()
    });  

    it('7. Verify that User Agreement page is loaded properly', function(){
       page.verify_user_agreement_page_is_loaded_properly()
    });  

    it('8. Verify that user is able to open login page from sign up page', function(){
       page.verify_user_is_able_to_open_login_page_from_sign_up_page()
    }); 
           
    it('9. Verify that Pricing page is loaded properly', function(){
       page.verify_pricing_page_loaded_properly()
    });

    it('10. Verify that IslamicMarkets PRO page is loaded properly', function(){
       page.verify_islamicmarkets_pro_page_loaded_properly()
    }); 

    // xit('11. Verify that IslamicMarkets Learning page is loaded properly', function(){
    //    page.verify_islamicmarkets_learning_page_loaded_properly()
    // });

    it('12. Verify that Advisory page is loaded properly', function(){
        page.verify_advisory_page_loaded_properly()
    });  
    
    it('13. Verify that HelpDesk page is loaded properly', function(){
        page.verify_helpdesk_page_loaded_properly()
    });  

    it('14. Verify that user is able to open sign up page by clicking on CreateYourFreeAccount button', function(){
        page.verify_user_able_to_open_sign_up_page_with_createYourFreeAccount_button()
    }); 
        
    it('15. Verify that user is able to open IslamicMarkets PRO page by clicking on About Us button', function(){
        page.verify_user_is_able_to_open_islamicmarkets_pro_page_with_about_us_button()
    }); 
});

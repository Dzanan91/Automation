'use script'

var page = require('../pages/HomePage.js');

describe('home page', function(){

    beforeEach(function(){
        browser.get('https://uat.test-aws.reams-elias.co.uk/data-collection/home');
    });

    it('1. Verify that user is able to open homepage', function(){
        page.homepage_landing()
    });

    it('2. Messages navigation', function(){
        page.messages_navigation()
    });

    it('3. Verify that user is able to log out from page', function(){
        page.logout_from_page()
    });
}); 
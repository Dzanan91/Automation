'use strict'

var page = require('../pages/ProfilePage.js');

describe(' Profile page ', function(){
    beforeEach(function(){
        browser.get('https://stagehost.foundersnetwork.com/');
    });
    it('1. Verify user is able to land on Profile page', function(){
        page.navigate_to_profile_page()
    });
    fit('2. Verify user is able to add Expertise', function(){
        page.navigate_to_profile_page()
        page.select_expertise()
    });
});
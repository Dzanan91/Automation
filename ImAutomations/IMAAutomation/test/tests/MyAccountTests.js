'use strict'

var page = require('../pages/MyAccountPage.js');

describe('My Account Page', function(){
    beforeEach(function() {
        browser.get('https://sso.aveknew.com');
    });
    it('1. Verify user is able to change general information', function(){
        page.update_profile_info()
    })
});
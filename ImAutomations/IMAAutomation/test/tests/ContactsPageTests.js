'use strict'

var page = require('../pages/ContactsPage.js');

describe('Contacts page', function(){
    beforeEach(function(){
        browser.get('https://sso.aveknew.com/');
    });
    it('1. Verify user is able to update Contact info', function(){
        page.update_contacts_info()
    });
});
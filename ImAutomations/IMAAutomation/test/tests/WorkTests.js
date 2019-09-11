'use strict'

var page = require('../pages/WorkPage.js');

describe('Work Page', function(){
    beforeEach(function() {
        browser.get('https://sso.aveknew.com/');
    });
    it('1. Verify user is able to update Work info ', function(){
        page.update_work_info()
    });
});
'use strict'

var page = require('../pages/ClassesPage.js');  


describe('Classes Page', function() {

    beforeEach(function() {
        browser.get('https://learning.aveknew.com/dashboard');
    });

    it('1. Verify user is able to navigate to previous classes', function(){
        page.verify_navigation_to_the_previous_classes_page();
    });

    it('2. Verify that user is able to open class', function(){
        page.verify_user_able_to_open_class()
    });

    it('3. Verify that user is able to open edit class page', function(){
        page.verify_user_able_to_open_edit_class_page()
    });

    it('4. Verify that user is able to open manage classes page', function(){
        page.verify_user_able_to_open_manage_classes_page()
    });
});
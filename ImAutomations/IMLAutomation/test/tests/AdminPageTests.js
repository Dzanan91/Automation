'use strict'

var page = require('../pages/AdminPage.js');

describe('Admin Page', function(){

    beforeEach(function() {
        browser.get('https://learning.aveknew.com/dashboard');
    });

    it('1. Verify that user is able to open manage videos page', function(){
        page.verify_user_able_to_open_manage_videos_page()
    });

    it('2. Verify that user is able to open manage publications page', function(){
        page.verify_user_able_to_open_manage_publications_page()
    });

    it('3. Verify that user is able to open manage classes page', function(){
        page.verify_user_able_to_open_manage_classes_page()
    });

    it('4. Verify that user is able to open manage assessments and surveys page', function(){
        page.verify_user_able_to_open_assessments_and_surveys_page()
    });

    it('5. Verify that user is able to create new programme', function(){
        page.verify_user_able_to_create_new_programme()
    });

    xit('6. Verify that user is able to create new assessment', function(){
        page.verify_user_able_to_create_new_assessment()
    });

    it('7. Verify that user is able to create new class', function(){
        page.verify_user_able_create_new_class()
    });
});
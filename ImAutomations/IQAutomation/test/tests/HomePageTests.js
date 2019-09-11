'use script'

var page = require('../pages/HomePage.js');

describe('home page', function(){

    beforeEach(function(){
        browser.get('https://iq.aveknew.com/');
    });

    it('1. Verify that user is able to open homepage', function(){
        page.verify_user_able_to_open_homepage();
    });

    it('2. Verify that user is able to search with valid input data', function(){
        page.verify_user_able_to_search_with_valid_data()
    });

    it('3. Verify that user is able to search with invalid input data', function(){
        page.verify_user_is_able_to_search_with_invalid_data()
    });

    it('4. Verify that user is able to open helpdesk page', function(){
        page.verify_user_able_to_open_helpdesk_page()
    });

    it('5. Verify that user is able to open my inbox page', function(){
        page.verify_user_able_to_open_my_inbox_page()
    });

    it('6. Verify that user is able to open notifications page', function(){
        page.verify_user_able_to_open_notifications_page()
    });
    
    it('7. Verify that user is able to open invite page', function(){
        page.verify_user_able_open_invite_page()
    });

    it('8. Verify that user is able to open user profile page', function(){
        page.verify_user_able_open_profile()
    });

    it('9. Verify that user is able to open settings page', function(){
        page.verify_user_able_open_settings_page()
    });

    it('10. Verify that user is able to signout', function(){
        page.verify_user_able_sign_out()
    });

    it('11.Verify that user is able to open add monitor page', function(){
        page.verify_user_able_open_add_monitor_page()
    });

    it('12.Verify that user is able to open monitors page', function(){
        page.verify_user_able_open_monitors_page()
    });

    it('13. Verify that user is able to open upload publication page', function(){
        page.verify_user_able_open_upload_publications_page()
    });

    it('14. Verify that user is able to open write an article page', function(){
        page.verify_user_able_open_write_an_article_page()
    });

    it('15. Verify that user is able to open add an event page', function(){
        page.verify_user_able_open_add_an_event_page()
    });

    it('16. Verify that user is able to open add sukuk page', function(){
        page.verify_user_able_open_add_sukuk_page()
    });

    it('17. Verify that user is able to open add company page', function(){
        page.verify_user_able_open_add_company_page()
    });

    it('18. Verify that user is able to open add islamic fund page', function(){
        page.verify_user_able_open_add_islamic_fund_page()
    });

    it('19. Verify that user is able to open economy page', function(){
        page.verify_user_able_open_economy_page()
    });

    it('20. Verify that user is able to open country page', function(){
        page.verify_user_able_open_country_page()
    });

    it('21. Verify that user is able to open insights page', function(){
        page.verify_user_able_open_insights_page()
    });

    it('22. Verify that user is able to open publications page', function(){
        page.verify_user_able_open_publications_page()
    });

    it('23. Verify that user is able to open sukuk page', function(){
        page.verify_user_able_open_sukuk_page()
    });

    it('24. Verify that user is able to open Sukuk list with specific industry type', function(){
        page.verify_user_able_open_sukuk_list_with_specific_industry_type()
    });

    it('28. Verify that user is able to search sukuk data', function(){
        page.verify_user_able_search_sukuk_data()
    });

    it('29.Verify that user is able to open sukuk', function(){
        page.verify_user_able_open_sukuk()
    });

    it('30.Verify that user is able to open sukuk structure tab', function(){
        page.verify_user_able_open_sukuk_structure_tab()
    });

    it('31. Verify that user is able to open sukuk documents tab', function(){
        page.verify_user_able_open_sukuk_documents_tab()
    });

    it('32. Verify that user is able to open sukuk case study tab', function(){
        page.verify_user_able_open_sukuk_case_study_tab()
    });

    it('33. Verify that user is able to open sukuk ratings tab', function(){
        page.verify_user_able_open_sukuk_ratings_tab()
    });

    it('34. Verify that user is able to open sukuk related tab', function(){
        page.verify_user_able_open_related_tab()
    });

    it('34. Verify that user is able to open islamic banks page', function(){
        page.verify_user_able_open_islamic_banks_page()
    });

    it('35. Verify that user is able to open takaful page', function(){
        page.verify_user_able_open_takaful_page() 
    });

    it('36. Verify that user is able to open tenders page', function(){
        page.verify_user_able_open_tenders_page()
    });

    it('37. Verify that user is able to open show more dropdown', function(){
        page.verify_user_able_open_show_more_dropdown()
    });

    it('38. Verify that user is able to open standards page', function(){
        page.verify_user_able_open_standards_page()
    });

    it('39. Verify that user is able to open events page', function(){
        page.verify_user_able_open_events_page()
    });

    it('40. Verify that user is able to open knowledge center page', function(){
        page.verify_user_able_open_knowledge_center_page()
    });

    it('41. Verify that user is able to open currencies page', function(){
        page.verify_user_able_open_currencies_page()
    });

    it('42. Verify that user is able to open global page', function(){
        page.verify_user_able_open_global_page()
    });
}); 
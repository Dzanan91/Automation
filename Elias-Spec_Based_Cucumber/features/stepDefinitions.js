var { Given, When, Then } = require('cucumber');
var page = require('../pages/HomePage.js');


Given('I’m logged in as a surveyor', function () {
    page.login_as_surveyor()
    return console.log('@Given -- User is logged in as surveyor');
});

Given('a facility exists', function () {
    page.verify_facility_exists()
    return console.log('@Given -- Facility exists');
});

When('I switch to card view', function () {
    page.switch_to_card_view()
    return console.log('@When -- I switch to card view');
});

Then('the facility cardview should be displayed', function () {
    page.card_view_is_displayed()
    return console.log('@Then -- Card view is displayed');
});
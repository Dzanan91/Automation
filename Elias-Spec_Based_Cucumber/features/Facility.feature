Feature: Facility CardView Style Check
  
  Background:
    Given I’m logged in as a surveyor
    Given a facility exists

  Scenario: Checking CardView
    When I switch to card view
    Then the facility cardview should be displayed
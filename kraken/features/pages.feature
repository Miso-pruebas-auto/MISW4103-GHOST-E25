Feature: Pages

  @web @user1
  Scenario: Create a new Page
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to pages list page
    And I wait for 2 seconds
    And I click New Page Button
    And I wait for 2 seconds
    When I input Random Title Name
    And I wait for 2 seconds
    And I input Random Content text 
    And I wait for 5 seconds
    And I click Pages Button
    And I wait for 2 seconds
    Then I should have see new Page draft was created
    And I wait for 2 seconds

  @web @user2
  Scenario: Create a new Page and Publish
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to pages list page
    And I wait for 2 seconds
    And I click New Page Button
    And I wait for 2 seconds
    When I input Random Title Name
    And I wait for 2 seconds
    And I input Random Content text 
    And I wait for 5 seconds
    And I click Open Publish Button
    And I wait for 2 seconds
    And I click Publish Page
    And I wait for 2 seconds
    Then I should have see new page Published notification
    And I wait for 2 seconds

  @web @user3
  Scenario: Delete a new Page
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to pages list page
    And I wait for 2 seconds
    And I click New Page Button
    And I wait for 2 seconds
    When I input Random Title Name
    And I wait for 2 seconds
    And I input Random Content text 
    And I wait for 5 seconds
    And I click Open Publish Button
    And I wait for 2 seconds
    And I click Publish Page
    And I wait for 2 seconds
    And I should have see new page Published notification
    And I wait for 2 seconds
    And I open sidebar options
    And I wait for 2 seconds
    And I select delete page
    And I wait for 2 seconds
    Then I should have see a modal with confirmation
    And I wait for 1 seconds
    And I should have select delete button
    And I wait for 2 seconds
    And I should have see a redirect to Pages site
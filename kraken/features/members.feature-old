Feature: Members

  @web @user1
  Scenario: Create a new Member with name and valid mail
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to members list page
    And I wait for 2 seconds
    And I click New Member Button
    And I wait for 2 seconds
    When I enter Random Member Name
    And I wait for 2 seconds
    And I enter Random Member Email 
    And I wait for 2 seconds
    And I click Save Button
    And I wait for 1 seconds
    Then I should have see new member being saved
    And I wait for 1 seconds
    And I should have see a created date label

  @web @user2
  Scenario: Create a new Member without mail
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to members list page
    And I wait for 2 seconds
    And I click New Member Button
    And I wait for 2 seconds
    When I enter Random Member Name
    And I wait for 2 seconds
    And I click Save Button
    And I wait for 1 seconds
    Then I should see a email validation error when is empty
    And I should see a Retry title button

  @web @user3
  Scenario: Create a new Member with name and Invalid mail
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to members list page
    And I wait for 2 seconds
    And I click New Member Button
    And I wait for 2 seconds
    When I enter Random Member Name
    And I wait for 2 seconds
    And I enter Invalid Member Email
    And I wait for 2 seconds
    And I click Save Button
    And I wait for 1 seconds
    Then I should see a email validation error when is not valid
    And I should see a Retry title button

  @web @user4
  Scenario: Create a new Member with name and mail and cancel operation
    Given I navigate to page "<GHOST_URL>"
    And I wait for 3 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 3 seconds
    And I navigate to members list page
    And I wait for 2 seconds
    And I click New Member Button
    And I wait for 2 seconds
    When I enter Random Member Name
    And I wait for 2 seconds
    And I enter Random Member Email 
    And I wait for 2 seconds
    And I navigate to members list page
    And I wait for 1 seconds
    Then I should have see a modal confirmation operation
    And I wait for 1 seconds
    And I should have see in a modal a button with leave operation
    And I wait for 1 seconds
    And I click Leave Modal Button
    And I wait for 2 seconds
    And I verificate Stay in Members List page

Feature: Tags

  @web @user2 @step1
  Scenario: Create a new valid tag
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to tags list page
    And I wait for 2 seconds
    And I should see the title "Tags"
    And I should see a create new tag button
    And I click on create new tag
    And I wait for 2 seconds
    And I should see the title containing "New tag"
    And I should see input with name "name"
    And I should see input with name "accent-color"
    And I enter random tag name
    And I enter random tag accent color
    And I click on save new tag
    And I wait for 1 seconds
    Then I should have see new tag being saved

  @web @user3
  Scenario: Create a new tag without accent color
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to tags list page
    And I wait for 2 seconds
    And I should see the title "Tags"
    And I should see a create new tag button
    And I click on create new tag
    And I wait for 2 seconds
    And I should see the title containing "New tag"
    And I should see input with name "name"
    And I enter random tag name
    And I click on save new tag
    And I wait for 1 seconds
    Then I should have see new tag being saved

  @web @user4
  Scenario: Cannot create a new tag without title
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to tags list page
    And I wait for 2 seconds
    And I should see the title "Tags"
    And I should see a create new tag button
    And I click on create new tag
    And I wait for 2 seconds
    And I should see the title containing "New tag"
    And I click on save new tag
    And I wait for 1 seconds
    Then I should see a validation error when no title specified

  @web @user5
  Scenario: Force create a new tag
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to tags list page
    And I wait for 2 seconds
    And I should see the title "Tags"
    And I should see a create new tag button
    And I click on create new tag
    And I wait for 2 seconds
    And I should see the title containing "New tag"
    And I should see input with name "name"
    And I should see input with name "accent-color"
    And I enter random tag name
    And I enter random tag accent color
    And I click on save new tag
    And I click on save new tag
    And I wait for 1 seconds
    Then I should have see new tag being saved




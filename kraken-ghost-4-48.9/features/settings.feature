Feature: General settings

  @web @user1
  Scenario: Change site name
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to general settings page
    And I wait for 5 seconds
    And I should see the title containing "General"
    And I should see "Title & description" settings
    And I expand Title & description settings
    And I wait for 2 seconds
    And I should see site name field
    And I change site name into a random value
    And I click on save settings changes
    And I wait for 1 seconds
    Then I should see "Title" settings being saved

  @web @user2
  Scenario: Change empty site name
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to general settings page
    And I wait for 5 seconds
    And I should see the title containing "General"
    And I should see "Title & description" settings
    And I expand Title & description settings
    And I wait for 2 seconds
    And I should see site name field
    And I change site name into with empty value
    And I click on save settings changes
    And I wait for 1 seconds
    Then I should see "" settings being saved

  @web @user3
  Scenario: Change site description
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to general settings page
    And I wait for 5 seconds
    And I should see the title containing "General"
    And I should see "Title & description" settings
    And I expand Title & description settings
    And I wait for 2 seconds
    And I should see site description field
    And I change site description into a random value
    And I click on save settings changes
    And I wait for 1 seconds
    Then I should see "Description" settings being saved

  @web @user4
  Scenario: Change empty site description
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    When I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to general settings page
    And I wait for 5 seconds
    And I should see the title containing "General"
    And I should see "Title & description" settings
    And I expand Title & description settings
    And I wait for 2 seconds
    And I should see site description field
    And I change description name into with empty value
    And I click on save settings changes
    And I wait for 1 seconds
    Then I should see "" settings being saved




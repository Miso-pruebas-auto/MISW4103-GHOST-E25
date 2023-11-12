Feature: Posts

  @web @user
  Scenario: Create a new valid post
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to posts list page
    And I wait for 2 seconds
    Then I should see the title "Posts"
    Then I should see a create new post button
    And I click on create new post
    And I wait for 2 seconds
    Then I should see the editor post status "New"
    Then I should see post title input
    Then I should see post content editor
    And I enter random post name
    And I enter random post content
    And I wait for 2 seconds
    Then I should see publish post button
    And I click on publish post
    Then I wait for 2 seconds
    Then I should see publish post confirmation
    And I click on confirm publish post
    Then I wait for 5 seconds
    Then I should see the editor post status "Published"

  @web @user2
  Scenario: Create a new post when only title
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to posts list page
    And I wait for 2 seconds
    Then I should see the title "Posts"
    Then I should see a create new post button
    And I click on create new post
    And I wait for 2 seconds
    Then I should see the editor post status "New"
    Then I should see post title input
    And I enter random post name
    And I click on post content
    Then I wait for 2 seconds
    Then I should see publish post button
    And I click on publish post
    Then I wait for 2 seconds
    Then I should see publish post confirmation
    And I click on confirm publish post
    Then I wait for 5 seconds
    Then I should see the editor post status "Published"

  @web @user3
  Scenario: Create a new valid post with an existing tag
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to posts list page
    And I wait for 2 seconds
    Then I should see the title "Posts"
    Then I should see a create new post button
    And I click on create new post
    And I wait for 2 seconds
    Then I should see the editor post status "New"
    Then I should see post title input
    Then I should see post content editor
    And I enter random post name
    And I enter random post content
    And I wait for 2 seconds
    Then I should see open post setting button
    And I click on open post settings button
    And I wait for 2 seconds
    And I assign an existing tag to new post
    Then I wait for 2 seconds
    Then I should see publish post button
    And I click on publish post
    Then I wait for 2 seconds
    Then I should see publish post confirmation
    And I click on confirm publish post
    Then I wait for 5 seconds
    Then I should see the editor post status "Published"

  @web @user4
  Scenario: Create a new valid post with an existing tag
    Given I navigate to page "<GHOST_URL>"
    And I wait for 2 seconds
    And I authenticate using the credentials "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
    And I wait for 2 seconds
    And I navigate to posts list page
    And I wait for 2 seconds
    Then I should see the title "Posts"
    Then I should see a create new post button
    And I click on create new post
    And I wait for 2 seconds
    Then I should see the editor post status "New"
    Then I should see post title input
    Then I should see post content editor
    And I enter random post name
    And I enter random post content
    And I wait for 2 seconds
    Then I should see open post setting button
    And I click on open post settings button
    And I wait for 2 seconds
    And I remove the post author
    And I wait for 2 seconds
    Then I should see a validation error when no author specified
    And I wait for 5 seconds
    Then I should see the editor post status "Draft - Saved"

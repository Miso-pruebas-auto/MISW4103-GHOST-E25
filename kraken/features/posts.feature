Feature: Posts

@web @user1
Scenario: Authenticate in ghost admin dashboard
  Given I navigate to page "<GHOST_URL>"
  And I wait for 2 seconds
  And I setup credentials with "<USERNAME>" and "<PASSWORD>" and go to "<GHOST_URL>"
  And I wait for 2 seconds
  Then I should see the title "Dashboard"


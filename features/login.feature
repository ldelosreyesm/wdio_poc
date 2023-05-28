
Feature: The Internet Guinea Pig Website

  #Scenario Outline: As a user, I can log into the secure area
    # Given I am on the "login" page
    # When I login with "<username>" and "<password>"
    # Then I should see a flash message saying "<message>"

    # Examples:
    #   | username | password             | message                        |
    #   | tomsmith | SuperSecretPassword! | You logged into a secure area! |
    #   | foobar   | barfoo               | Your username is invalid!      |
  @test1
  Scenario: As a user, I can log into the secure area
      Given user open index page
      When user waits 2 senconds
      Then take a screenshot

  @test2
  Scenario: As a user, I can log into the secure area
      Given user open index page
      When user waits 2 senconds
      Then compare image diff

  @test3
  Scenario: As a user, I can log into the secure area
      Given user open index page
      When user waits 2 senconds
      Then compare image equal
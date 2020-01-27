Feature: Create Account

Scenario: Validate that a user can complete the registration of a new account
Given The user open "https://www.cookunity.com/"
When Enter the 10001 and press on button GET 50 OFF
Then The user must be taken to select the plan
When When the user selected the plan 4 meals and press choose this plan
Then The user must be taken to select the options the preferences of delivery
When the user selected the Wednesday
Then The day Wednesday must be selected
When The user selected the range from hours 2:00 PM - 5:00 PM
Then The range from hours 2:00 PM - 5:00 PM must be selected
When The user indicates that "Yes", it can be left with the doorman
Then The option "Yes" must be selected
When The user press on continue
Then The user must be taken to the selection of the meals of his preference
When The user must select the first meal of their choice
Then The first meal must be selected
When The user must select the second meal of their choice
Then The second meal must be selected
When The user must select the third meal of their choice
Then The third meal must be selected
When The user must select the fourth meal of their choice
Then The fourth meal must be selected and press on continue
When The user must be enter the first name
When The user must be enter the last name
When The user must be enter the email
When The user must be enter the password and press on sign up with your email

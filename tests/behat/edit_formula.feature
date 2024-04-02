@editor @editor_tiny @tiny_wiris @wiris_mathtype
Feature: MathType for TinyMCE 6
  In order to check if formula can be created correctly in tiny
  I need to create a formula in the user profile

  Background:
    Given the following config values are set as admin:
      | config | value | plugin |
      | customtoolbar | tiny_mce_wiris_formulaEditor | editor_tiny |
    And the "wiris" filter is "on"
    And the "mathjaxloader" filter is "off"
    And the "urltolink" filter is "off"
    And I log in as "admin"
    And the MathType buttons visibility is set to "1"

  @javascript
  Scenario: Create a formulas
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the following fields to these values:
      | Text editor | TinyMCE editor |
    And I press "Save changes"
    And I open my profile in edit mode
    And I press "Toggle" in "General description" field in TinyMCE 6 editor
    And I press "MathType"
    And I wait "1" seconds
    And I set mathtype formula to "1+2"
    And I wait "1" seconds
    And I press accept button in MathType Editor
    And I press "Update profile"
    And I follow "Profile" in the user menu
    # Checking formula image outside edit element.
    Then a Wirisformula containing '1 plus 2' should exist

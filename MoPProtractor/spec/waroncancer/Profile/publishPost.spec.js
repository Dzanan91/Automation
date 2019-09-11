import { waitForElementToAppear } from "../../utils/helpers";

describe("user publishes new post", function() {
  it("publishes new post", function() {
    browser.get("https://stg.waroncancer.com/");

    var authButton = element(by.css(".auth0-lock-input")),
      passwordInput = element(by.name("password")),
      acceptButton = element(by.css(".cl-accept")),
      loginButton = element(by.css(".auth0-label-submit")),
      dropdownTrigger = element(by.id("navbarDropdownProfile")),
      settingsButton = element(
        by.cssContainingText('[href*="/settings"]', "Settings")
      ),
      firstnameInput = element(by.css('[ng-model="vm.model.firstName"]')),
      lastnameInput = element(by.css('[ng-model="vm.model.lastName"]')),
      aboutInput = element(by.css('[ng-model="vm.model.about"]')),
      birthdateInput = element(by.css('[ng-model="vm.model.birthDate"]')),
      cityInput = element(by.css('[ng-model="vm.model.city"]')),
      saveButton = element(by.buttonText("Save changes")),
      homeButton = element(by.cssContainingText('[href*="/feed"]', "Home"));

    //Entering username and password
    waitForElementToAppear(authButton, null);
    authButton.sendKeys("hidromehanika6@gmail.com");
    passwordInput.sendKeys("inter1908");

    //Clicking on popup accept button

    waitForElementToAppear(acceptButton, 5000);
    acceptButton.click();
    browser.sleep(3000);

    //Clicking on login button
    waitForElementToAppear(loginButton, 5000);
    loginButton.click();
    browser.sleep(3000);

    //Choosing settings menu
    dropdownTrigger.click();
    browser.sleep(2000);

    settingsButton.click();
    browser.sleep(2000);

    //Editing first/last name/Description text/date of birth/City
    firstnameInput.sendKeys("steven");
    browser.sleep(2000);

    lastnameInput.sendKeys("gerrard");
    browser.sleep(2000);

    aboutInput.sendKeys("lalalalajajaja");
    browser.sleep(2000);

    birthdateInput.sendKeys("22-02-2001");
    browser.sleep(2000);

    cityInput.sendKeys("Sarajev");
    browser.sleep(2000);

    //Savign changes and navigating to home page
    saveButton.click();
    browser.sleep(2000);

    homeButton.click();
    browser.sleep(2000);
  });
});

import { waitForElementToAppear } from "../../utils/helpers";

describe("login with email", function() {
  it("to test loging with email", function() {
    browser.get("https://stg.waroncancer.com/");

    var showSignup = element(by.css('[ng-click="vm.showSignUp()"]')),
      authInput = element(by.css(".auth0-lock-input")),
      passwordInput = element(by.name("password")),
      firstnameInput = element(by.name("first_name")),
      lastnameInput = element(by.name("last_name")),
      acceptButton = element(by.css(".cl-accept"));

    waitForElementToAppear(showSignup, null);
    showSignup.click();
    browser.sleep(3000);

    authInput.sendKeys("hidromehanika6@gmail.com");
    passwordInput.sendKeys("inter1908");

    firstnameInput.sendKeys("Dzanan");
    lastnameInput.sendKeys("redzepagic");

    acceptButton.click();
    browser.sleep(3000);

    browser
      .actions()
      .sendKeys(protractor.Key.ENTER)
      .perform();
    browser.sleep(4000);
  });
});

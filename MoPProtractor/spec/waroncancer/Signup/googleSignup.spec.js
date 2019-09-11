import { waitForElementToAppear, angularWait } from "../../utils/helpers";

describe("login with google account", function() {
  it("logs in user with google account", function() {
    browser.get("https://stg.waroncancer.com/");

    var showSignup = element(by.css('[ng-click="vm.showSignUp()"]')),
      signupButton = element(by.buttonText("Sign up with Google")),
      usernameInput = element(by.name("identifier")),
      cButton = element(by.css(".CwaK9")),
      passwordInput = element(by.name("password"));

    waitForElementToAppear(showSignup, null);
    showSignup.click();
    browser.sleep(3000);

    waitForElementToAppear(signupButton, 5000);
    signupButton.click();
    browser.sleep(3000);

    //Bypassing non-angular login form
    angularWait();

    //Logging with false credentials
    usernameInput.sendKeys("mop123@gmail.com");

    waitForElementToAppear(cButton, 5000);
    cButton.click();
    browser.sleep(4000);

    passwordInput.sendKeys("1234hdje");

    cButton.click();
    browser.sleep(3000);
  });
});

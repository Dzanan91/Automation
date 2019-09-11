import { waitForElementToAppear, angularWait } from "../../utils/helpers";

describe("login with google account", () => {
  it("logs in user with google account", () => {
    browser.get("https://stg.waroncancer.com/");

    var loginButton = element(by.buttonText("Log in with Google")),
      emailInput = element(by.name("identifier")),
      fButton = element(by.css(".CwaK9")),
      passwordInput = element(by.name("password"));

    waitForElementToAppear(loginButton, null);
    loginButton.click();
    browser.sleep(3000);

    // Bypassing non-angular login form
    angularWait();

    // Logging with false credentials
    emailInput.sendKeys("mop123@gmail.com");

    waitForElementToAppear(fButton, 5000);
    fButton.click();
    browser.sleep(4000);

    waitForElementToAppear(passwordInput, null);
    passwordInput.sendKeys("1234hdje");

    waitForElementToAppear(fButton, 5000);
    fButton.click();

    browser.sleep(3000);
  });
});

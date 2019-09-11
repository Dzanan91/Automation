import { waitForElementToAppear } from "../../utils/helpers";

describe("login with google account", () => {
  it("logs in user with google account", () => {
    browser.get("https://stg.waroncancer.com/");
    browser.driver
      .manage()
      .window()
      .maximize();

    var loginButton = element(by.buttonText("Log in with Google")),
      emailInput = element(by.name("identifier")),
      fButton = element(by.css(".CwaK9")),
      passwordInput = element(by.name("password"));

    waitForElementToAppear(loginButton, 5000);

    loginButton.click();

    browser.sleep(3000);

    // Bypassing non-angular login form
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500);

    // Logging with false credentials
    emailInput.sendKeys("mop123@gmail.com");
    fButton.click();

    browser.sleep(4000);
    waitForElementToAppear(passwordInput, null);
    passwordInput.sendKeys("1234hdje");
    fButton.click();

    browser.sleep(3000);
  });
});

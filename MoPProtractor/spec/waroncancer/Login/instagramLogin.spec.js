import { waitForElementToAppear, angularWait } from "../../utils/helpers";

describe("logging in with instagram account", function() {
  it("user logs in with instagram account", function() {
    browser.get("https://stg.waroncancer.com/");

    var loginButton = element(by.buttonText("Log in with Instagram")),
      usernameInput = element(by.name("username")),
      gButton = element(by.css(".button-green")),
      passwordInput = element(by.name("password"));

    waitForElementToAppear(loginButton, null);
    loginButton.click();

    angularWait();

    usernameInput.sendKeys("test1¸23");
    browser.sleep(2000);

    passwordInput.sendKeys("trrwztet1");
    browser.sleep(2000);
    gButton.click();
  });
});

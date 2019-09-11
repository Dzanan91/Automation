import { waitForElementToAppear, angularWait } from "../../utils/helpers";

describe("logging in with instagram account", () => {
  it("user logs in with instagram account", () => {
    browser.get("https://stg.waroncancer.com/");

    var loginButton = element(by.buttonText("Log in with Instagram")),
      usernameInput = element(by.name("username")),
      passwordInput = element(by.name("password")),
      gButton = element(by.css(".button-green"));

    //try to wait for dom element to appear
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

import { waitForElementToAppear } from "../../utils/helpers";

describe("login with email", function() {
  it("to test loging with email", function() {
    browser.get("https://stg.waroncancer.com/");

    var authInput = element(by.css(".auth0-lock-input")),
      submitButton = element(by.css(".auth0-label-submit")),
      acceptButton = element(by.css(".cl-accept")),
      passwordInput = element(by.name("password"));

    waitForElementToAppear(authInput, 5000);
    authInput.sendKeys("hidromehanika6@gmail.com");
    passwordInput.sendKeys("inter1908");

    acceptButton.click();
    browser.sleep(3000);

    submitButton.click();
    browser.sleep(5000);
  });
});

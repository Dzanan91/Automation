import { waitForElementToAppear, angularWait } from "../../utils/helpers";

describe("login with facebook", function() {
  it("logs in user with facebook account", function() {
    browser.get("https://stg.waroncancer.com/");

    var socialButton = element(by.css(".auth0-lock-social-button-text")),
      emailInput = element(by.name("email")),
      loginButton = element(by.name("login")),
      passwordInput = element(by.name("pass"));

    //Choosing facebook log in option
    waitForElementToAppear(loginButton, null);
    socialButton.click();

    //Da bi se protractor synchao sa non-angular siteom( facebook login) moramo upotrijebiti sljedeci "hack":
    angularWait();

    //Logging on facebook acccount(used false credentials),in case of need this can be done just by changing credentials

    emailInput.sendKeys("dzano_sa@hotmail.com");
    passwordInput.sendKeys("hehahhh12134s");

    waitForElementToAppear(loginButton, null);
    loginButton.click();
    browser.sleep(3000);
  });
});

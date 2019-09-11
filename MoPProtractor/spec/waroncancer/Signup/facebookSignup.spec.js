import { waitForElementToAppear, angularWait } from "../../utils/helpers";

describe("login with facebook", function() {
  it("logs in user with facebook account", function() {
    browser.get("https://stg.waroncancer.com/");

    var showSignupButton = element(by.css('[ng-click="vm.showSignUp()"]')),
      socialButton = element(by.css(".auth0-lock-social-button-text")),
      emailInput = element(by.name("email")),
      passwordInput = element(by.name("pass")),
      loginButton = element(by.name("login"));

    waitForElementToAppear(showSignupButton, null);
    showSignupButton.click();
    browser.sleep(3000);

    waitForElementToAppear(socialButton, 5000);
    socialButton.click();

    //Da bi se protractor synchao sa non-angular siteom( facebook login) moramo upotrijebiti sljedeci "hack":
    angularWait();

    //Logging on facebook acccount(used false credentials),in case of need this can be done just by changing credentials
    emailInput.sendKeys("dzano_sa@hotmail.com");
    passwordInput.sendKeys("hehahhh12134s");

    loginButton.click();
    browser.sleep(3000);
  });
});

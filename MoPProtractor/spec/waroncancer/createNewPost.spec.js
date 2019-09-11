import { waitForElementToAppear } from "../utils/helpers";

describe("user publishes new post", function() {
  it("publishes new post", function() {
    browser.get("https://stg.waroncancer.com/");
    browser.driver
      .manage()
      .window()
      .maximize();

    //vars
    var lockInput = element(by.css(".auth0-lock-input")),
      passwordInput = element(by.name("password")),
      acceptButton = element(by.css(".cl-accept")),
      loginButton = element(by.css(".auth0-label-submit")),
      modalButton = element(by.css('[ng-click="vm.openPostModal()"]')),
      contentInput = element(by.css('[ng-model="vm.post.content"]')),
      shareButton = element(by.css('[ng-click="vm.share()"]'));

    //Entering username and password
    waitForElementToAppear(lockInput, 5000);
    lockInput.sendKeys("hidromehanika6@gmail.com");
    passwordInput.sendKeys("inter1908");

    //Clicking on popup accept button
    acceptButton.click();
    browser.sleep(3000);

    //Clicking on login button
    loginButton.click();
    browser.sleep(3000);

    //Clicking on new post button
    modalButton.click();
    browser.sleep(2000);

    //Filling content
    contentInput.sendKeys("Autotest4");
    browser.sleep(2000);

    //Sharing content
    waitForElementToAppear(shareButton, null);
    shareButton.click();
    browser.sleep(2000);
  });
});

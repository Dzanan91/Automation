import { waitForElementToAppear } from "../../utils/helpers";

describe("user publishes new story", function() {
  it("publishes new story", function() {
    browser.get("https://stg.waroncancer.com/");

    var authInput = element(by.css(".auth0-lock-input")),
      passwordInput = element(by.name("password")),
      acceptButton = element(by.css(".cl-accept")),
      loginButton = element(by.css(".auth0-label-submit")),
      createButton = element(
        by.cssContainingText('[href*="/story"]', "Create new Story")
      ),
      titleInput = element(by.css('[ng-model="vm.story.title"]')),
      contentInput = element(by.css('[ng-model="vm.story.content"]')),
      storyActionButton = element(by.id("storyActionMenu")),
      storyPublishButton = element(by.css('[ng-click="vm.publishStory()"]'));

    //Entering username and password
    waitForElementToAppear(authInput, null);
    authInput.sendKeys("hidromehanika6@gmail.com");

    passwordInput.sendKeys("inter1908");

    //Clicking on popup accept button
    waitForElementToAppear(acceptButton, 5000);
    acceptButton.click();
    browser.sleep(3000);

    //Clicking on login button
    loginButton.click();
    browser.sleep(3000);

    createButton.click();
    browser.sleep(2000);

    //User sets content of new story
    titleInput.sendKeys("AutoTest1");
    browser.sleep(2000);
    contentInput.sendKeys("trezfdhue");
    browser.sleep(2000);

    //User published new story

    storyActionButton.click();
    browser.sleep(2000);
    storyPublishButton.click();
    browser.sleep(4000);
  });
});

import Common from "./Common";
import Page from "../../utils/Page";

describe("login with google account", () => {
  it("logs in user with google account", () => {
    browser.get("https://stg.waroncancer.com/");

    waitUntilDisplayedTimeout = 5000;

    browser.driver
      .manage()
      .window()
      .maximize();

    element(by.buttonText("Log in with Google")).click();
    browser.sleep(3000);

    // Bypassing non-angular login form

    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500);

    // Logging with false credentials

    element(by.name("identifier")).sendKeys("mop123@gmail.com");
    element(by.css(".CwaK9")).click();

    browser.sleep(4000);

    element(by.name("password")).sendKeys("1234hdje");
    element(by.css(".CwaK9")).click();

    browser.sleep(3000);
  });
});

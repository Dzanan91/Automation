// noinspection JSUnusedGlobalSymbols
var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
import { SpecReporter } from "jasmine-spec-reporter";

var reporter = new HtmlScreenshotReporter({
  dest: "target/screenshots",
  filename: "my-report.html",
  userCss: "reporter.css",
  showQuickLinks: true
});

export const config = {
  framework: "jasmine2",
  specs: ["spec/waroncancer/**/*.spec.js"],
  directConnect: true,
  restartBrowserBetweenTests: true,
  chromeDriver: "node_modules/.bin/chromedriver",
  jasmineNodeOpts: {
    // remove ugly protractor dot reporter
    print: () => {},
    isVerbose: true
  },
  onPrepare: () => {
    //always run in full screen mode
    browser.driver
      .manage()
      .window()
      .maximize();

    browser.ignoreSynchronization = true;

    jasmine.getEnv().addReporter(
      new SpecReporter({
        // Defaults: https://github.com/bcaudan/jasmine-spec-reporter#default-options
        // Configuration: https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
        suite: {
          displayNumber: true // display each suite number (hierarchical)
        },
        spec: {
          displaySuccessful: true,
          displayPending: true, // display each pending spec
          displayDuration: true // display each spec duration
        },
        summary: {
          displaySuccessful: false, // display summary of all successes after execution
          displayFailed: true, // display summary of all failures after execution
          displayPending: false, // display summary of all pending specs after execution
          displayDuration: true
        }
      })
    );
    jasmine.getEnv().addReporter(reporter);
  },
  beforeLaunch: () => {
    return new Promise(resolve => {
      reporter.beforeLaunch(resolve);
    });
  },
  afterLaunch: () => {
    return new Promise(resolve => {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    login: "spec/waroncancer/Login/*.spec.js",
    signup: "spec/waroncancer/Signup/*.spec.js",
    story: "spec/waroncancer/Story/*.spec.js",
    profile: "spec/waroncancer/Profile/*.spec.js"
  },
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      // http://peter.sh/experiments/chromium-command-line-switches/#test-type
      args: ["--test-type", "disable-infobars"]
      // https://github.com/angular/protractor/blob/master/docs/browser-setup.md#using-headless-chrome
      // args: ["--headless", "--disable-gpu", "--window-size=800x600"],
    }
  }
};

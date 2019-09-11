var loginTest = require(protractor.basePath+'/pages/tuki.js');

describe("running couple of tests", function() {
    beforeEach(function(){
      browser.waitForAngularEnabled(false);
      browser.get("http://preview:myproject@abby-finn-website-build.approvemyviews.com/");
      browser.manage().window().maximize();
    });
    
    it("should login with valid credentials ", function() {
      loginTest.clickLoginBtn();
      loginTest.emailValid();
      loginTest.passwordValid();
      loginTest.clickSubmitBtn();
        });
  });
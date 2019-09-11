var HtmlReporter = require('protractor-beautiful-reporter')

exports.config = {
	framework: 'jasmine2',

	directConnect: true,

	localSeleniumStandaloneOpts:
		{
			jvmArgs: [
				'-Dwebdriver.edge.driver=../../../node_modules/protractor/node_modules/webdriver-manager/selenium/MicrosoftWebDriver.exe',
				'-Dwebdriver.gecko.driver=../../../node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.20.0.exe',
				'-Dwebdriver.chrome.driver=../../../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.36.exe',
				'-Dwebdriver.ie.driver=../../../node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer.exe'
			]
		},

	multiCapabilities: [
		{
			browserName: 'chrome',
			sharedTestFiles: true,
			maxInstances: 10,
			unexpectedAlertBehaviour: 'accept',
			'chromeOptions': {
				'args': ['start-maximized', '--no-sandbox']
			}
		}
	],

	specs: [

		 //'./tests/UserLogintests.js',
		 //'./tests/HomePagetests.js',
		 './tests/ProfilePageTests.js'

	],

	onPrepare: function () {
		browser.ignoreSynchronization = true;

		var loginPage = require('./pages/LoginPage.js');

		var url = 'https://stagehost.foundersnetwork.com/accounts/login/?next=/';  
		browser.get(url);
		browser.sleep(3000);
		loginPage.perform_admin_login();



		//browser.manage().window().maximize();

		jasmine.getEnv().addReporter(new HtmlReporter({
			baseDirectory: 'tmp/screenshots'
		}).getJasmine2Reporter());

		var reporter = new HtmlReporter({
			baseDirectory: 'tmp/screenshots'
		});

	},

	// Options to be passed to Jasmine.
	jasmineNodeOpts: {
		defaultTimeoutInterval: 1000000,
		showColors: true,
		isVerbose: true,
		includeStackTrace: true,
		showTiming: true,
		realtimeFailure: true
	},

	// framework: 'jasmine2',
	// plugins: [{
	// 	package: 'protractor-screenshoter-plugin',
	// 	screenshotPath: './reports/e2e',
	// 	screenshotOnExpect: 'failure+success',
	// 	screenshotOnSpec: 'none',
	// 	withLogs: 'true',
	// 	writeReportFreq: 'asap',
	// 	imageToAscii: 'none',
	// 	clearFoldersBeforeTest: true
	// }]

	// plugins: [{
	//    package: 'protractor-screenshoter-plugin',
	//    screenshotPath: './reports/e2e',
	//    screenshotOnExpect: 'failure+success',
	//    screenshotOnSpec: 'none',
	//    withLogs: 'true',
	//    writeReportFreq: 'asap',
	//    imageToAscii: 'none',
	//    clearFoldersBeforeTest: true
	// }]

};
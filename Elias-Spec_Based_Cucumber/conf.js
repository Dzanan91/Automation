
exports.config = {
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),

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
			'chromeOptions': {
				'args': ['start-maximized', '--no-sandbox']
			}
		}
	],

	specs: [

		 'features/*.feature',

	],

	cucumberOpts: {
		// require step definitions
		require: [
		  'features/stepDefinitions.js' // accepts a glob
		]
	  },

	onPrepare: function () {
		browser.ignoreSynchronization = true;

		var loginPage = require('./pages/LoginCreds.js');

		var url = 'https://uat.test-aws.reams-elias.co.uk/user/login';
		browser.get(url);
		browser.sleep(3000);
		loginPage.log_in();
		  	
		//browser.manage().window().maximize();

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
var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    this.warningTime = 1400;
    this.dangerTime = 1900;

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
        if (initialColumnSettings.warningTime) {
            this.warningTime = initialColumnSettings.warningTime;
        }
        if (initialColumnSettings.dangerTime){
            this.dangerTime = initialColumnSettings.dangerTime;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "1. Verify that user is able to land on homepage|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191671409,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191671411,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191673584,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191673585,
                "type": ""
            }
        ],
        "screenShotFile": "00c10052-004d-0043-001c-00ae004c0045.png",
        "timestamp": 1562191648621,
        "duration": 26087
    },
    {
        "description": "2. Verify that user is able to open Programmes type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191676894,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191676896,
                "type": ""
            }
        ],
        "screenShotFile": "006700fb-00a5-00e9-0034-00520046001c.png",
        "timestamp": 1562191675367,
        "duration": 8352
    },
    {
        "description": "3. Verify that user is able to open Modules type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191685693,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191685696,
                "type": ""
            }
        ],
        "screenShotFile": "0033002c-008d-0007-0014-0041004e004b.png",
        "timestamp": 1562191684325,
        "duration": 8785
    },
    {
        "description": "4. Verify that user is able to open Topics type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191695003,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191695007,
                "type": ""
            }
        ],
        "screenShotFile": "00a5003c-00aa-0011-0063-009c00e40078.png",
        "timestamp": 1562191693661,
        "duration": 8136
    },
    {
        "description": "5. Verify that user is able to open Publications type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191703740,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191703743,
                "type": ""
            }
        ],
        "screenShotFile": "001e00a7-000f-008f-0096-002300480061.png",
        "timestamp": 1562191702412,
        "duration": 8243
    },
    {
        "description": "6. Verify that user is able to open Tags type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191712555,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191712556,
                "type": ""
            }
        ],
        "screenShotFile": "003b0080-0007-002c-005b-009000d30017.png",
        "timestamp": 1562191711266,
        "duration": 10593
    },
    {
        "description": "1. Verify that user is able to open classes page|classes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191723773,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191723777,
                "type": ""
            }
        ],
        "screenShotFile": "00b20032-0079-0096-00fb-00c300b70053.png",
        "timestamp": 1562191722412,
        "duration": 6240
    },
    {
        "description": "2. Verify user is able to navigate to previous classes|classes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191730536,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191730538,
                "type": ""
            }
        ],
        "screenShotFile": "0042007d-00b2-0072-00c5-00b7000200bf.png",
        "timestamp": 1562191729224,
        "duration": 7525
    },
    {
        "description": "1. Verify that user is unable to login with invalid data|login page",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@id='email'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@id='email'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as clear] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as clear] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.exports.clearAndEnterValue (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\helpers\\e2e-helper.js:84:10)\n    at LoginPage.verify_user_is_unable_to_login_with_invalid_data (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\pages\\LoginPage.js:40:16)\n    at UserContext.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:13:14)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.exports.clearAndEnterValue (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\helpers\\e2e-helper.js:84:18)\n    at LoginPage.verify_user_is_unable_to_login_with_invalid_data (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\pages\\LoginPage.js:40:16)\n    at UserContext.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:13:14)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"1. Verify that user is unable to login with invalid data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:12:5)\n    at addSpecsToSuite (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00490065-00f3-000c-003d-004d00970014.png",
        "timestamp": 1562191737414,
        "duration": 6875
    },
    {
        "description": "2. Verify that user is able login with valid data|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.islamicmarkets.com/js/vendor.js 0:817862 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191750952,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.islamicmarkets.com/js/vendor.js 0:817862 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191750953,
                "type": ""
            }
        ],
        "screenShotFile": "00f300f6-00d4-00ff-00a5-000c00f400aa.png",
        "timestamp": 1562191745037,
        "duration": 8579
    },
    {
        "description": "3. Verify that user is able to open sign up page from login page|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191756877,
                "type": ""
            }
        ],
        "screenShotFile": "004b0060-003d-009f-00ea-004c0014002b.png",
        "timestamp": 1562191754266,
        "duration": 2697
    },
    {
        "description": "4. Verify that user is unable to sign up with invalid data|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191759320,
                "type": ""
            }
        ],
        "screenShotFile": "0086001f-0095-0085-00ee-009400010046.png",
        "timestamp": 1562191757493,
        "duration": 3455
    },
    {
        "description": "5. Verify that Privacy Policy page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191763433,
                "type": ""
            }
        ],
        "screenShotFile": "00a600bf-00f9-0050-0077-00be002400a3.png",
        "timestamp": 1562191761596,
        "duration": 4481
    },
    {
        "description": "6. Verify that Cookie Policy page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191768691,
                "type": ""
            }
        ],
        "screenShotFile": "00a40061-00ff-0043-008d-00f000e700f0.png",
        "timestamp": 1562191766609,
        "duration": 4580
    },
    {
        "description": "7. Verify that User Agreement page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191773544,
                "type": ""
            }
        ],
        "screenShotFile": "006c00d3-002c-007d-0018-002e003100de.png",
        "timestamp": 1562191771677,
        "duration": 4348
    },
    {
        "description": "8. Verify that user is able to open login page from sign up page|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191778367,
                "type": ""
            }
        ],
        "screenShotFile": "00a0009a-007f-0067-0086-00c3006e0022.png",
        "timestamp": 1562191776524,
        "duration": 3737
    },
    {
        "description": "9. Verify that Pricing page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.islamicmarkets.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.isla…markets.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191789852,
                "type": ""
            }
        ],
        "screenShotFile": "003d00f4-0087-0011-0030-00af00f30088.png",
        "timestamp": 1562191780796,
        "duration": 12270
    },
    {
        "description": "10. Verify that IslamicMarkets PRO page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000d002a-00a5-001e-00e8-0023007b0044.png",
        "timestamp": 1562191793959,
        "duration": 3045
    },
    {
        "description": "11. Verify that IslamicMarkets Learning page is loaded properly|login page",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://api-iam.intercom.io/messenger/web/events - Failed to load resource: the server responded with a status of 422 ()",
                "timestamp": 1562191797594,
                "type": ""
            }
        ],
        "screenShotFile": "00a20088-0059-00a6-00a6-008e001a00dd.png",
        "timestamp": 1562191797592,
        "duration": 0
    },
    {
        "description": "12. Verify that Advisory page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d 102:51 \"Error: [ng:areq] http://errors.angularjs.org/1.3.8/ng/areq?p0=DemoPageController&p1=not%20a%20function%2C%20got%20undefined\\n    at https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:6:416\\n    at Qb (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:19:417)\\n    at sb (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:20:1)\\n    at https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:76:95\\n    at https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:57:257\\n    at s (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:7:408)\\n    at v (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:57:124)\\n    at g (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:52:9)\\n    at g (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:52:26)\\n    at g (https://islamicmarkets.com/vendor/angularjs/angular.min.js?v=26c531bb-622b-41bc-bc89-021f8461ed4d:52:26)\"",
                "timestamp": 1562191800374,
                "type": ""
            }
        ],
        "screenShotFile": "00660014-0015-00b1-0043-003400640052.png",
        "timestamp": 1562191797604,
        "duration": 3028
    },
    {
        "description": "13. Verify that HelpDesk page is loaded properly|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://api-iam.intercom.io/messenger/web/events - Failed to load resource: the server responded with a status of 422 ()",
                "timestamp": 1562191801311,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.islamicmarkets.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.isla…markets.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191809420,
                "type": ""
            }
        ],
        "screenShotFile": "007600b0-001d-0048-0091-00f000a000db.png",
        "timestamp": 1562191801347,
        "duration": 10349
    },
    {
        "description": "14. Verify that user is able to open sign up page by clicking on CreateYourFreeAccount button|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js 0:91851 TypeError: Cannot read property 'length' of null\n    at o.formattedString (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:51951)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at za.evaluate (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:148199)\n    at o.formattedString (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:102817)\n    at o.a (https://account.islamicmarkets.com/dist/app.ce416ba2c4b76aed6f5d.js:1:52296)\n    at o.t._render (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:152064)\n    at o.r (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99352)\n    at za.get (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147209)\n    at new za (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:147132)\n    at wt (https://account.islamicmarkets.com/dist/app-vendor.ce416ba2c4b76aed6f5d.js:1:99377)",
                "timestamp": 1562191815871,
                "type": ""
            }
        ],
        "screenShotFile": "003200e7-00d7-0026-007e-00a30042007b.png",
        "timestamp": 1562191812711,
        "duration": 3444
    },
    {
        "description": "15. Verify that user is able to open IslamicMarkets PRO page by clicking on About Us button|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000300d4-00fb-00d5-0086-0087001600d8.png",
        "timestamp": 1562191816686,
        "duration": 3315
    },
    {
        "description": "1. Verify that user is able to open Programmes page|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://api-iam.intercom.io/messenger/web/events - Failed to load resource: the server responded with a status of 422 ()",
                "timestamp": 1562191820495,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191823159,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191823160,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191827155,
                "type": ""
            }
        ],
        "screenShotFile": "006e0040-00e8-0012-00af-001800c900cb.png",
        "timestamp": 1562191820519,
        "duration": 11766
    },
    {
        "description": "2. Verify that user is able to open programme page|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191834429,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191834431,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191837888,
                "type": ""
            }
        ],
        "screenShotFile": "001b00ac-0011-00d1-002b-0086004900c7.png",
        "timestamp": 1562191832927,
        "duration": 9838
    },
    {
        "description": "3. Verify that user is able to open overview tab|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191845030,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191845049,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191848177,
                "type": ""
            }
        ],
        "screenShotFile": "00a0002f-007f-00e1-00d5-00cc005e003f.png",
        "timestamp": 1562191843466,
        "duration": 9059
    },
    {
        "description": "4. Verify that user is able to open HelpDesk page|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191854589,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191854591,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191858156,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191868972,
                "type": ""
            }
        ],
        "screenShotFile": "005c00e7-00fc-001b-005d-00b7005100ad.png",
        "timestamp": 1562191853243,
        "duration": 17438
    },
    {
        "description": "9. Verify that user is able to open programmes authors profile|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191872508,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191872510,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191876113,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191885048,
                "type": ""
            }
        ],
        "screenShotFile": "00760037-009e-0032-00d9-009200f00014.png",
        "timestamp": 1562191871103,
        "duration": 16594
    },
    {
        "description": "5. Verify that user is able to open programme section|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191889697,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191889699,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191893236,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191906808,
                "type": ""
            }
        ],
        "screenShotFile": "006c0003-0086-00fb-00c5-007600f000bd.png",
        "timestamp": 1562191888305,
        "duration": 20379
    },
    {
        "description": "6. Verify that user is able to skip video segments|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191911120,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191911123,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191914734,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191921838,
                "type": ""
            }
        ],
        "screenShotFile": "00400005-0058-0088-00c5-00f700b0001b.png",
        "timestamp": 1562191909704,
        "duration": 13712
    },
    {
        "description": "7. Verify that user is able to open notes|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191925935,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191925938,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191930062,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191935445,
                "type": ""
            }
        ],
        "screenShotFile": "00f40005-0065-0076-00c6-000600c30037.png",
        "timestamp": 1562191924518,
        "duration": 12978
    },
    {
        "description": "8. Verify that user is able to open transcript|programmes page",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a href=\"#transcript\" aria-controls=\"transcript\" role=\"tab\" data-toggle=\"tab\">...</a> is not clickable at point (227, 61). Other element would receive the click: <div class=\"navbar-header no-r-margin no-l-margin\">...</div>\n  (Session info: chrome=75.0.3770.100)\n  (Driver info: chromedriver=75.0.3770.8 (681f24ea911fe754973dda2fdc6d2a2e159dd300-refs/branch-heads/3770@{#40}),platform=Windows NT 10.0.17763 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a href=\"#transcript\" aria-controls=\"transcript\" role=\"tab\" data-toggle=\"tab\">...</a> is not clickable at point (227, 61). Other element would receive the click: <div class=\"navbar-header no-r-margin no-l-margin\">...</div>\n  (Session info: chrome=75.0.3770.100)\n  (Driver info: chromedriver=75.0.3770.8 (681f24ea911fe754973dda2fdc6d2a2e159dd300-refs/branch-heads/3770@{#40}),platform=Windows NT 10.0.17763 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\helpers\\e2e-helper.js:476:7\n    at ManagedPromise.invokeCallback_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"8. Verify that user is able to open transcript\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\ProgrammesPageTests.js:44:5)\n    at addSpecsToSuite (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\ProgrammesPageTests.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191939508,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191939512,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191946135,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191953406,
                "type": ""
            }
        ],
        "screenShotFile": "00c60034-0012-003e-00dc-005200f200c8.png",
        "timestamp": 1562191938134,
        "duration": 26068
    },
    {
        "description": "9. Verify that user is able to search for programmes with keywords|programmes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191966129,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191966132,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/js/programmes.js 0:101171 Uncaught TypeError: Cannot read property 'top' of undefined",
                "timestamp": 1562191970234,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1526044632902_38_2017-Nissan-GTR.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221257Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=ced5b52081507ae040fab61aee27051d3226d38d28f0faeb944695ddacfff19f - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191979866,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1524795738520_367_LEAVES_BACKPACK.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221257Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=ce4e20e008be10d086bbfc76d3f45028fe30afacbeeb1714e6829c82d92ac9c9 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191979869,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1534405522941_38_Rustic_Raccoon_Hooded_Cowl_Crochet_Pattern.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221258Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=e73e7f316b86633a89f95f137de73e4847039468568aae96eaaf7c3f2ab5856b - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191980928,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1524795738520_367_LEAVES_BACKPACK.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221300Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=16ed71267228a937605b525d3be68026b431361cdc8375166d5ee34337db38a5 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191982957,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1534405522941_38_Rustic_Raccoon_Hooded_Cowl_Crochet_Pattern.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221303Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=a65f2302f912fcfb747700fe2fa535cd550b54ada3ef99e37c9c63b9b432668c - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191985586,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1532499723249_38_fireworks_e.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221302Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=ce2291bd9a6c4090bc265b9e9cedb00bc572e53b0ffb1e4fc7d36a02b1de2db2 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191985592,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1534405522941_38_Rustic_Raccoon_Hooded_Cowl_Crochet_Pattern.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221304Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=fb6db900ea9c50393fcae1b4c736e4a16f4f46a63c26429e514eac5d3140af93 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191986543,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1529350486955_382_Financial%20Indicator-18%20June%202018.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221304Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=3432fe7c16183bdcc4b1cf920c77b1f05bedb267e18d0921cf1ac2f965d784c1 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191986545,
                "type": ""
            }
        ],
        "screenShotFile": "00ea003e-008c-00e6-00a7-006c00f50071.png",
        "timestamp": 1562191964717,
        "duration": 21946
    },
    {
        "description": "1. Verify that user is able to open Reports page|reports page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5756,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1524795738520_367_LEAVES_BACKPACK.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221305Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=ad2e67e2719aed18fb38950879b1bfa8f02fdf9bd70ba4ede1561aff336d6744 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191987517,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1527244996447_382_CBDaily.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221306Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=576e1bd0eca2f964242e93b608f6810e7ce4045c00023a7d89be1bddd5764782 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191988742,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1534415024265_7_report-138.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221306Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=f26fbaed0bd0502e4e50e8406fe783250306871cb47df4fa86c33ab2315a3dae - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191988742,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s3.eu-central-1.amazonaws.com/files.aveknew.com/files.im-test.tk/publications/1529716990580_428_PR1-22-Jun-18.pdf.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIRSVPJ7X2YMDGK7A%2F20190703%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190703T221306Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=e6a4273eaf7734ab71055e48437911df7e32864fe8551ee7ea8eaf9c8f536496 - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1562191988746,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191989557,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562191989559,
                "type": ""
            }
        ],
        "screenShotFile": "00000063-0068-004e-007d-00d9009c00cf.png",
        "timestamp": 1562191987342,
        "duration": 23799
    },
    {
        "description": "1. Verify that user is able to land on homepage|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11668,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562872638256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562872638259,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562872640744,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562872640747,
                "type": ""
            }
        ],
        "screenShotFile": "00c50036-00f7-0059-004a-0093006e008e.png",
        "timestamp": 1562872623875,
        "duration": 18581
    },
    {
        "description": "2. Verify that user is able to open Programmes type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11668,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562872644677,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1562872644678,
                "type": ""
            }
        ],
        "screenShotFile": "005100dc-0090-0041-0040-002700c2003b.png",
        "timestamp": 1562872643267,
        "duration": 8187
    },
    {
        "description": "1. Verify that user is able to land on homepage|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546474507,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546474510,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546477269,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546477271,
                "type": ""
            }
        ],
        "screenShotFile": "00f40036-002d-0004-00cb-0096006b00d8.png",
        "timestamp": 1565546459174,
        "duration": 19490
    },
    {
        "description": "2. Verify that user is able to open Programmes type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546480778,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546480780,
                "type": ""
            }
        ],
        "screenShotFile": "008c009f-001e-006c-000b-003d00a0007b.png",
        "timestamp": 1565546479337,
        "duration": 10445
    },
    {
        "description": "3. Verify that user is able to open Modules type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546491613,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546491616,
                "type": ""
            }
        ],
        "screenShotFile": "00260089-00cc-0020-00e6-00e70033006a.png",
        "timestamp": 1565546490230,
        "duration": 9505
    },
    {
        "description": "4. Verify that user is able to open Topics type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546501639,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546501642,
                "type": ""
            }
        ],
        "screenShotFile": "008a00bd-001f-00c1-00cf-006300f20096.png",
        "timestamp": 1565546500282,
        "duration": 9907
    },
    {
        "description": "5. Verify that user is able to open Publications type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546512256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546512257,
                "type": ""
            }
        ],
        "screenShotFile": "00f800b1-000d-00bb-0006-00e6003e0012.png",
        "timestamp": 1565546510909,
        "duration": 10377
    },
    {
        "description": "6. Verify that user is able to open Tags type results only|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546523120,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546523123,
                "type": ""
            }
        ],
        "screenShotFile": "00b7003e-00ec-00af-0075-008900f50023.png",
        "timestamp": 1565546521876,
        "duration": 10577
    },
    {
        "description": "1. Verify that user is able to open classes page|classes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546534297,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546534299,
                "type": ""
            }
        ],
        "screenShotFile": "004f00db-0085-0023-0044-0090005b00f9.png",
        "timestamp": 1565546533025,
        "duration": 5543
    },
    {
        "description": "2. Verify user is able to navigate to previous classes|classes page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546540397,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.aveknew.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546540401,
                "type": ""
            }
        ],
        "screenShotFile": "00870016-0058-00b5-003b-008c0049004d.png",
        "timestamp": 1565546539100,
        "duration": 8059
    },
    {
        "description": "1. Verify that user is unable to login with invalid data|login page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008600da-0076-0028-00e4-00f600070044.png",
        "timestamp": 1565546547765,
        "duration": 8192
    },
    {
        "description": "2. Verify that user is able login with valid data|login page",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8024,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: Wait timed out after 60011ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 60011ms\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Object.exports.waitVisibility (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\helpers\\e2e-helper.js:39:10)\n    at Object.exports.hoverAndClick (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\helpers\\e2e-helper.js:257:10)\n    at LoginPage.verify_user_is_able_to_login_with_valid_data (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\pages\\LoginPage.js:52:16)\n    at UserContext.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:17:14)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"2. Verify that user is able login with valid data\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:16:5)\n    at addSpecsToSuite (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMLAutomation\\test\\tests\\LoginpageTests.js:6:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://learning.islamicmarkets.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546562976,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://learning.islamicmarkets.com/js/vendor.js 0:817863 \"Tribute was already bound to DIV\"",
                "timestamp": 1565546562977,
                "type": ""
            }
        ],
        "screenShotFile": "00f40012-00dd-00f5-00f5-004700600016.png",
        "timestamp": 1565546556440,
        "duration": 63115
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});


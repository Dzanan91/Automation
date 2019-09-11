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
        "description": "1. Verify that user is able to open homepage|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00cb0055-00ef-004e-0076-00f600bf00e5.png",
        "timestamp": 1562192780749,
        "duration": 25324
    },
    {
        "description": "2. Verify that user is able to search with valid input data|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00250003-000d-0055-0055-000200b000ae.png",
        "timestamp": 1562192806649,
        "duration": 7748
    },
    {
        "description": "3. Verify that user is able to search with invalid input data|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a20025-0019-00ad-00ec-00c1005a00c9.png",
        "timestamp": 1562192814917,
        "duration": 3805
    },
    {
        "description": "4. Verify that user is able to open helpdesk page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192830923,
                "type": ""
            }
        ],
        "screenShotFile": "006c00a0-0045-0078-003d-00e300a3009c.png",
        "timestamp": 1562192819261,
        "duration": 13468
    },
    {
        "description": "5. Verify that user is able to open my inbox page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192838242,
                "type": ""
            }
        ],
        "screenShotFile": "00d900f9-0021-00a4-007d-005f009500e4.png",
        "timestamp": 1562192833222,
        "duration": 9338
    },
    {
        "description": "6. Verify that user is able to open notifications page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192850808,
                "type": ""
            }
        ],
        "screenShotFile": "003c006e-0002-000d-0000-00fb0094003c.png",
        "timestamp": 1562192843161,
        "duration": 11114
    },
    {
        "description": "7. Verify that user is able to open invite page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192862868,
                "type": ""
            }
        ],
        "screenShotFile": "0047008a-0056-009d-00bd-00ca005e0049.png",
        "timestamp": 1562192854795,
        "duration": 12016
    },
    {
        "description": "8. Verify that user is able to open user profile page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"Error: [$parse:syntax] http://errors.angularjs.org/1.3.8/$parse/syntax?p0=undefined&p1=not%20a%20primary%20expression&p2=null&p3=collapsed%3D&p4=collapsed%3D\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:6:416\\n    at hb.throwError (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:190:254)\\n    at hb.primary (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:189:477)\\n    at hb.unary (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:197:82)\\n    at hb.multiplicative (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:196:324)\\n    at hb.additive (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:196:182)\\n    at hb.relational (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:196:48)\\n    at hb.equality (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:195:418)\\n    at hb.logicalAND (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:195:294)\\n    at hb.logicalOR (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:195:164)\" \"\\u003Cdiv class=\\\"text-gray margin-b-10\\\" ng-init=\\\"collapsed=\\\" ng-show=\\\"1\\\" ng-class=\\\"{'ellipsis': collapsed}\\\">\"",
                "timestamp": 1562192875404,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192875977,
                "type": ""
            }
        ],
        "screenShotFile": "00aa002a-00b2-00ad-001b-005e00b60062.png",
        "timestamp": 1562192867352,
        "duration": 12082
    },
    {
        "description": "9. Verify that user is able to open settings page|home page",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": [
            "Expected false to be true."
        ],
        "trace": [
            "Error: Failed expectation\n    at Object.exports.verifyPresenceOfElement (C:\\Users\\T440s\\Desktop\\ImAutomations\\IQAutomation\\test\\helpers\\e2e-helper.js:382:30)\n    at HomePage.verify_user_able_open_settings_page (C:\\Users\\T440s\\Desktop\\ImAutomations\\IQAutomation\\test\\pages\\HomePage.js:144:16)\n    at UserContext.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IQAutomation\\test\\tests\\HomePageTests.js:44:14)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)"
        ],
        "browserLogs": [],
        "screenShotFile": "003a00b6-0096-0034-0047-008e0069006c.png",
        "timestamp": 1562192879975,
        "duration": 4313
    },
    {
        "description": "10. Verify that user is able to signout|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a100aa-0070-0025-0025-00f100510042.png",
        "timestamp": 1562192884844,
        "duration": 12581
    },
    {
        "description": "11.Verify that user is able to open add monitor page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008b0022-00b1-003a-0021-000000200008.png",
        "timestamp": 1562192898907,
        "duration": 2839
    },
    {
        "description": "12.Verify that user is able to open monitors page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0025003b-0074-0048-0017-00b5005a0076.png",
        "timestamp": 1562192902363,
        "duration": 3620
    },
    {
        "description": "13. Verify that user is able to open upload publication page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562192915095,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192917326,
                "type": ""
            }
        ],
        "screenShotFile": "007100ea-005e-009f-00b0-00f4002d0014.png",
        "timestamp": 1562192906554,
        "duration": 12640
    },
    {
        "description": "14. Verify that user is able to open write an article page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562192928789,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192929560,
                "type": ""
            }
        ],
        "screenShotFile": "001100bc-004c-004a-002f-00e30032009d.png",
        "timestamp": 1562192919630,
        "duration": 12719
    },
    {
        "description": "15. Verify that user is able to open add an event page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562192939322,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192939959,
                "type": ""
            }
        ],
        "screenShotFile": "000000df-00a2-0074-0060-004f00850044.png",
        "timestamp": 1562192932851,
        "duration": 7237
    },
    {
        "description": "16. Verify that user is able to open add Sukuk page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562192946673,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192947449,
                "type": ""
            }
        ],
        "screenShotFile": "0063006c-008e-00e1-00eb-002f004f002b.png",
        "timestamp": 1562192940668,
        "duration": 10670
    },
    {
        "description": "17. Verify that user is able to open add company page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192960028,
                "type": ""
            }
        ],
        "screenShotFile": "00f2003e-00ba-001e-00e8-002a001b004f.png",
        "timestamp": 1562192951865,
        "duration": 10277
    },
    {
        "description": "18. Verify that user is able to open add islamic fund page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562192968848,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192969526,
                "type": ""
            }
        ],
        "screenShotFile": "00ee00c8-0015-007c-009f-0045009300f3.png",
        "timestamp": 1562192962624,
        "duration": 8683
    },
    {
        "description": "19. Verify that user is able to open economy page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001200df-00db-002a-0031-00eb00dd007e.png",
        "timestamp": 1562192971892,
        "duration": 4968
    },
    {
        "description": "20. Verify that user is able to open country page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a800c3-00eb-0048-0088-008d003400d5.png",
        "timestamp": 1562192977511,
        "duration": 5804
    },
    {
        "description": "24. Verify that user is able to open insights page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003e00a1-0075-00bf-0064-007d00c400cb.png",
        "timestamp": 1562192983879,
        "duration": 6771
    },
    {
        "description": "25. Verify that user is able to open publications page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192991247,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562192998647,
                "type": ""
            }
        ],
        "screenShotFile": "00e0000b-001e-0075-0003-00ae00210097.png",
        "timestamp": 1562192992019,
        "duration": 6695
    },
    {
        "description": "26. Verify that user is able to open sukuk page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00010084-007a-00c6-00a1-0052002d00ce.png",
        "timestamp": 1562192999373,
        "duration": 4053
    },
    {
        "description": "27. Verify that user is able to open Sukuk list with specific industry type|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008200ef-0065-00c1-00f9-001f0012002f.png",
        "timestamp": 1562193004115,
        "duration": 4292
    },
    {
        "description": "29.Verify that user is able to open sukuk|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://iq.aveknew.com/dist/app.4afa42963495c1722d6e.js 0:89426 Uncaught TypeError: Cannot read property 'concat' of null",
                "timestamp": 1562193009291,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://iq.aveknew.com/dist/app.4afa42963495c1722d6e.js 0:89426 Uncaught TypeError: Cannot read property 'concat' of null",
                "timestamp": 1562193015880,
                "type": ""
            }
        ],
        "screenShotFile": "006c009d-0028-00cb-007d-00b9001500ec.png",
        "timestamp": 1562193009626,
        "duration": 8794
    },
    {
        "description": "30.Verify that user is able to open sukuk structure tab|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://iq.aveknew.com/dist/app.4afa42963495c1722d6e.js 0:89426 Uncaught TypeError: Cannot read property 'concat' of null",
                "timestamp": 1562193026006,
                "type": ""
            }
        ],
        "screenShotFile": "003b00cd-0071-0089-008b-004b00500070.png",
        "timestamp": 1562193018880,
        "duration": 10618
    },
    {
        "description": "31. Verify that user is able to open sukuk documents tab|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://iq.aveknew.com/dist/app.4afa42963495c1722d6e.js 0:89426 Uncaught TypeError: Cannot read property 'concat' of null",
                "timestamp": 1562193035366,
                "type": ""
            }
        ],
        "screenShotFile": "00a60030-0027-008d-0053-00b8007a0070.png",
        "timestamp": 1562193030042,
        "duration": 9413
    },
    {
        "description": "32. Verify that user is able to open sukuk case study tab|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e0078-0060-00b3-005d-008e0081007a.png",
        "timestamp": 1562193040022,
        "duration": 10169
    },
    {
        "description": "33. Verify that user is able to open sukuk ratings tab|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://i.vimeocdn.com/video/707981805_640x360.jpg?r=pad - Failed to load resource: net::ERR_CONNECTION_TIMED_OUT",
                "timestamp": 1562193072219,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://i.vimeocdn.com/video/632494692_640x360.jpg?r=pad - Failed to load resource: net::ERR_CONNECTION_TIMED_OUT",
                "timestamp": 1562193072230,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://i.vimeocdn.com/video/658154783_640x360.jpg?r=pad - Failed to load resource: net::ERR_CONNECTION_TIMED_OUT",
                "timestamp": 1562193072231,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://i.vimeocdn.com/video/629194130_640x360.jpg?r=pad - Failed to load resource: net::ERR_CONNECTION_TIMED_OUT",
                "timestamp": 1562193072232,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://i.vimeocdn.com/video/670027125_640x360.jpg?r=pad - Failed to load resource: net::ERR_CONNECTION_TIMED_OUT",
                "timestamp": 1562193072233,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://i.vimeocdn.com/video/637555799_640x360.jpg?r=pad - Failed to load resource: net::ERR_CONNECTION_TIMED_OUT",
                "timestamp": 1562193072235,
                "type": ""
            }
        ],
        "screenShotFile": "00930025-00a2-007b-0042-0065003e0050.png",
        "timestamp": 1562193072373,
        "duration": 10650
    },
    {
        "description": "34. Verify that user is able to open islamic banks page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00670066-00a1-0049-0013-00ee00f2001d.png",
        "timestamp": 1562193083578,
        "duration": 2810
    },
    {
        "description": "35. Verify that user is able to open takaful page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d00bc-0067-0060-0020-00dc00030055.png",
        "timestamp": 1562193087457,
        "duration": 5951
    },
    {
        "description": "36. Verify that user is able to open tenders page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000100f4-0029-001e-0044-007200e40007.png",
        "timestamp": 1562193093964,
        "duration": 4013
    },
    {
        "description": "37. Verify that user is able to open show more dropdown|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0049007c-00d3-0026-0038-00bf00ee001b.png",
        "timestamp": 1562193098750,
        "duration": 3093
    },
    {
        "description": "38. Verify that user is able to open standards page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562193110418,
                "type": ""
            }
        ],
        "screenShotFile": "000b004f-00f6-00f2-00a3-00d0006c0087.png",
        "timestamp": 1562193102491,
        "duration": 8195
    },
    {
        "description": "39. Verify that user is able to open events page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://api-iam.intercom.io/messenger/web/events - Failed to load resource: the server responded with a status of 422 ()",
                "timestamp": 1562193110853,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562193117658,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562193118277,
                "type": ""
            }
        ],
        "screenShotFile": "00e700f7-003b-0043-002b-001d00ab0099.png",
        "timestamp": 1562193111489,
        "duration": 8525
    },
    {
        "description": "40. Verify that user is able to open knowledge center page|home page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b8001b-001b-0047-00cd-004b004700d7.png",
        "timestamp": 1562193120590,
        "duration": 9696
    },
    {
        "description": "41. Verify that user is able to open exchange rates page|home page",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "00e8009b-00e2-003d-007d-00d0006d000e.png",
        "timestamp": 1562193130851,
        "duration": 0
    },
    {
        "description": "42. Verify that user is able to open exchange rates graph page|home page",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "instanceId": 13960,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Temporarily disabled with xit",
        "browserLogs": [],
        "screenShotFile": "000200c3-0012-003b-00a9-00a000f0000b.png",
        "timestamp": 1562193130867,
        "duration": 0
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


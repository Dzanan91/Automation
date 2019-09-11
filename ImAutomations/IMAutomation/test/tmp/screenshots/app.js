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
        "description": "1. Verify that user is able to open homepage|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190883404,
                "type": ""
            }
        ],
        "screenShotFile": "00ed004c-003f-00bf-0036-00e000120041.png",
        "timestamp": 1562190856201,
        "duration": 28236
    },
    {
        "description": "2. Verify that user is able to open Helpdesk page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190892183,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190900256,
                "type": ""
            }
        ],
        "screenShotFile": "00ec00a9-00f5-00c9-00da-00f700a50046.png",
        "timestamp": 1562190885191,
        "duration": 16995
    },
    {
        "description": "3. Verify that user is able to open My Inbox page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190906820,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190911054,
                "type": ""
            }
        ],
        "screenShotFile": "004c00f8-00be-001b-0041-004400a500f3.png",
        "timestamp": 1562190902676,
        "duration": 10134
    },
    {
        "description": "5. Verify that user is able to open Invite People page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190917418,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190925729,
                "type": ""
            }
        ],
        "screenShotFile": "00c400fa-00ff-0075-00a7-00b200bd0011.png",
        "timestamp": 1562190913343,
        "duration": 14284
    },
    {
        "description": "6. Verify that user is able to open his profile page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/js/vendor/ammap/maps/js/worldLow.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 2:0 Uncaught ReferenceError: AmCharts is not defined",
                "timestamp": 1562190931106,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/js/vendor/ammap/maps/js/worldLow.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 2:0 Uncaught ReferenceError: AmCharts is not defined",
                "timestamp": 1562190931107,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190932127,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"Error: [$parse:syntax] http://errors.angularjs.org/1.3.8/$parse/syntax?p0=undefined&p1=not%20a%20primary%20expression&p2=null&p3=collapsed%3D&p4=collapsed%3D\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:6:416\\n    at hb.throwError (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:190:254)\\n    at hb.primary (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:189:477)\\n    at hb.unary (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:197:82)\\n    at hb.multiplicative (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:196:324)\\n    at hb.additive (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:196:182)\\n    at hb.relational (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:196:48)\\n    at hb.equality (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:195:418)\\n    at hb.logicalAND (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:195:294)\\n    at hb.logicalOR (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:195:164)\" \"\\u003Cdiv class=\\\"text-gray margin-b-10\\\" ng-init=\\\"collapsed=\\\" ng-show=\\\"1\\\" ng-class=\\\"{'ellipsis': collapsed}\\\">\"",
                "timestamp": 1562190938219,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190938862,
                "type": ""
            }
        ],
        "screenShotFile": "00e400c4-00d5-00a8-0075-0053008600d0.png",
        "timestamp": 1562190928162,
        "duration": 12200
    },
    {
        "description": "7. Verify that user is able to open Edit Account page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190945002,
                "type": ""
            }
        ],
        "screenShotFile": "00ec00ae-00ec-0063-0064-002e00c10095.png",
        "timestamp": 1562190940935,
        "duration": 10226
    },
    {
        "description": "8. Verify that user is able to sign out|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190955804,
                "type": ""
            }
        ],
        "screenShotFile": "005e008d-00cc-00dc-00af-007b00a1007f.png",
        "timestamp": 1562190951655,
        "duration": 14837
    },
    {
        "description": "9. Verify that user is able to open Upload Publication page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190971809,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190976419,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562190982849,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190983319,
                "type": ""
            }
        ],
        "screenShotFile": "001500e9-00ee-00c4-0012-003d00b00024.png",
        "timestamp": 1562190972574,
        "duration": 11033
    },
    {
        "description": "10. Verify that user is able to open Write an Article page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/js/vendor/ammap/maps/js/worldLow.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 2:0 Uncaught ReferenceError: AmCharts is not defined",
                "timestamp": 1562190986877,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/js/vendor/ammap/maps/js/worldLow.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 2:0 Uncaught ReferenceError: AmCharts is not defined",
                "timestamp": 1562190986878,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190987888,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562190993014,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190993468,
                "type": ""
            }
        ],
        "screenShotFile": "00d700dc-003c-006f-0019-003500b70062.png",
        "timestamp": 1562190984054,
        "duration": 11052
    },
    {
        "description": "11. Verify that user is able to open Create New Event page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/js/vendor/ammap/maps/js/worldLow.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 2:0 Uncaught ReferenceError: AmCharts is not defined",
                "timestamp": 1562190998460,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/js/vendor/ammap/maps/js/worldLow.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 2:0 Uncaught ReferenceError: AmCharts is not defined",
                "timestamp": 1562190998461,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562190999484,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562191005245,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191006080,
                "type": ""
            }
        ],
        "screenShotFile": "0061008c-007c-00df-0045-000700e700b4.png",
        "timestamp": 1562190995597,
        "duration": 10706
    },
    {
        "description": "12. Verify that user is able to open Add Sukuk page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191011091,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562191016153,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191017008,
                "type": ""
            }
        ],
        "screenShotFile": "00f90010-00ae-009b-0041-00d6008c00b3.png",
        "timestamp": 1562191006892,
        "duration": 11752
    },
    {
        "description": "13. Verify that user is able to open Add new company page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191023478,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191030596,
                "type": ""
            }
        ],
        "screenShotFile": "00d1007a-0060-004e-00bb-0026006700ee.png",
        "timestamp": 1562191019252,
        "duration": 11511
    },
    {
        "description": "14. Verify that user is able to open Add Islamic Fund page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191035343,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562191039689,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191040356,
                "type": ""
            }
        ],
        "screenShotFile": "0098003b-00fa-0057-0046-008400d300ab.png",
        "timestamp": 1562191031312,
        "duration": 10675
    },
    {
        "description": "15. Verify that user is able to open Content Manager page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191046277,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca 102:51 \"TypeError: Cannot read property 'toLowerCase' of undefined\\n    at p (https://aveknew.com/js/vendor/angular-strap/modules/tooltip.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:8:2718)\\n    at https://aveknew.com/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:9:15508\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:164\\n    at s (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:7:302)\\n    at Object.\\u003Canonymous> (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:48:131)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at Object.$get (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:35:71)\\n    at Object.e [as invoke] (https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:37:96)\\n    at https://aveknew.com/vendor/angularjs/angular.min.js?v=c9244ba5-673f-462f-ac4a-7ac0c46e4bca:38:410\"",
                "timestamp": 1562191050723,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191051181,
                "type": ""
            }
        ],
        "screenShotFile": "002e005a-00cf-003b-00f6-00e5007800be.png",
        "timestamp": 1562191042524,
        "duration": 10239
    },
    {
        "description": "16. Verify that user is able to open Activity Feed page|homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191057281,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191062426,
                "type": ""
            }
        ],
        "screenShotFile": "00bd00ad-00c3-0089-001c-00bd007a002f.png",
        "timestamp": 1562191053214,
        "duration": 10635
    },
    {
        "description": "17. Verify that user is able to open IML Programmes page|homepage",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.100"
        },
        "message": [
            "Failed: Wait timed out after 60049ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 60049ms\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Object.exports.waitElementToBeClickable (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMAutomation\\test\\helpers\\e2e-helper.js:29:10)\n    at Object.exports.waitAndClick (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMAutomation\\test\\helpers\\e2e-helper.js:48:10)\n    at Homepage.verify_user_able_to_open_IML_programmes_page (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMAutomation\\test\\pages\\Homepage.js:150:16)\n    at UserContext.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMAutomation\\test\\tests\\HomePageTests.js:76:14)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"17. Verify that user is able to open IML Programmes page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMAutomation\\test\\tests\\HomePageTests.js:75:5)\n    at addSpecsToSuite (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\T440s\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\T440s\\Desktop\\ImAutomations\\IMAutomation\\test\\tests\\HomePageTests.js:5:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://learning.aveknew.com/track 4:25 Uncaught DOMException: Blocked a frame with origin \"https://learning.aveknew.com\" from accessing a cross-origin frame.",
                "timestamp": 1562191068127,
                "type": ""
            }
        ],
        "screenShotFile": "002100a3-00dd-009b-00cf-006d00e000d5.png",
        "timestamp": 1562191064288,
        "duration": 65446
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


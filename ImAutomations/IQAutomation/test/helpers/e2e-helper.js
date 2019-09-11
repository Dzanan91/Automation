'use strict';

var EC = protractor.ExpectedConditions;
// var D = require('../data-provider/conf-data.js');
var path = require('path');

//________________________________________________________________________________________________________________________________________________________
//login functions


exports.waitPresence = function (element) {

	browser.wait(EC.presenceOf(element), 35000);

};


exports.getRandomString = function(length) {
	var string = '';
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' //Include numbers if you want
	for (var i = 0; i < length; i++) {
		string += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	return string;
};

exports.waitElementToBeClickable = function (element) {

	browser.wait(EC.elementToBeClickable(element), 60000);
};

exports.clickByBrowserActions = function (targetElement) {
	browser.actions().mouseDown(targetElement).mouseUp().perform();
};


exports.waitVisibility = function (element) {

	browser.wait(EC.visibilityOf(element), 60000);
};

exports.waitInvisibility = function (element) {

	browser.wait(EC.invisibilityOf(element), 60000);
};

exports.waitAndClick = function (element) {
	exports.waitElementToBeClickable(element);
	element.click();
};

exports.clickButtonUntilElementBecomesVisible = function (elementToBeClicked, elementToBecomeVisible_multipleElementsLocator) {
	exports.scrollTo(elementToBeClicked).then(function () {
		exports.clickByJavaScriptExecutor(elementToBeClicked);
		//exports.waitAndClick(elementToBeClicked);
		browser.sleep(1000);
		elementToBecomeVisible_multipleElementsLocator.then(function (elems) {
			if (elems.length < 1) {
				return exports.clickButtonUntilElementBecomesVisible(elementToBeClicked, elementToBecomeVisible_multipleElementsLocator);
			} else {
				return null;
			}
		});
	});
};

exports.waitAndEnterValue = function (element, value) {

	browser.wait(EC.visibilityOf(element), 15000);
	element.sendKeys(value);
};

exports.clearValue = function (element) {
	element.clear();
};

//exports.clearAndEnterValue = function (element, value) {

//  browser.wait(EC.visibilityOf(element), 15000);
//  element.clear().sendKeys(value);
//};

exports.clearAndEnterValue = function (element, value) {
	element.clear().sendKeys(value);

	return element.getAttribute('value');
	//   .then(insertedValue => {
//	if (insertedValue !== value) {
//		return this.clearAndEnterValue(element, value);
// 	}
//
// 	else {
// 		return null;
// 	}
};

exports.enterValue = function (element, value) {
	exports.waitVisibility(element);
	element.sendKeys(value);
};

exports.findElementByText = function (text) {
	exports.elementByText = element(by.xpath("//span[contains(text(), '" + text + "')]"));

};

// exports.findElementByValueAndClick = function (tagName, value) {
//
// 	exports.waitAndClick(element(by.xpath("//" + tagName + "[contains(text(), '" + value + "')]")));
// };

exports.findElementByValueAndClick = function (tagName, value, elementIndex = 0) {

	exports.waitAndClick(element.all(by.xpath("//" + tagName + "[contains(text(), '" + value + "')]")).get(elementIndex));
};

exports.findElementByTextAndClick = function (text) {
	exports.elementByText = element(by.xpath("//span[contains(text(), '" + text + "')]")).click();
};

exports.checkToasterMessage = function (title, message) {

// browser.wait(EC.presenceOf(sharedElements.toast), 15000);
	expect($(title).getText()).toBe(message);
};

exports.checkToasterMessage1 = function (title, message) {

// browser.wait(EC.presenceOf(sharedElements.toast), 15000);
	expect($(title).getText()).toContain(message);
};


/*DATE FORMAT functions */

var dateFormat = function () {
	var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date))
			throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) === "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d: d,
				dd: pad(d),
				ddd: dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m: m + 1,
				mm: pad(m + 1),
				mmm: dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy: String(y).slice(2),
				yyyy: y,
				h: H % 12 || 12,
				hh: pad(H % 12 || 12),
				H: H,
				HH: pad(H),
				M: M,
				MM: pad(M),
				s: s,
				ss: pad(s),
				l: pad(L, 3),
				L: pad(L > 99 ? Math.round(L / 10) : L),
				t: H < 12 ? "a" : "p",
				tt: H < 12 ? "am" : "pm",
				T: H < 12 ? "A" : "P",
				TT: H < 12 ? "AM" : "PM",
				Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default": "ddd mmm dd yyyy HH:MM:ss",
	shortDate: "m/d/yy",
	mediumDate: "mmm d, yyyy",
	longDate: "mmmm d, yyyy",
	fullDate: "dddd, mmmm d, yyyy",
	shortTime: "h:MM TT",
	mediumTime: "h:MM:ss TT",
	longTime: "h:MM:ss TT Z",
	isoDate: "yyyy-mm-dd",
	isoTime: "HH:MM:ss",
	isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


//hovering over element
exports.hover = function (element) {
	browser.actions().mouseMove(element).perform();
};


exports.hoverAndClick = function (elementToHover, elementToClick) {
	exports.waitVisibility(elementToHover);
	browser.actions().mouseMove(elementToHover).perform();
	exports.waitAndClick(elementToClick);
};


//verify CSS value
exports.verifyCssValue = function (element, cssProperty, cssValue) {
	exports.waitVisibility(element);
	browser.actions().mouseMove(element).perform().then(function () {
		expect(element.getCssValue(cssProperty)).toBe(cssValue);
	});

};

//verify CSS value
exports.verifyCssValuesOnMultipleElements = function (fieldsArray, cssProperty, cssValue) {
	for (var i = 0; i < fieldsArray.length; i++) {
		exports.waitVisibility(fieldsArray[i]);
		expect(fieldsArray[i].getCssValue(cssProperty)).toBe(cssValue);
	}
};

//verify CSS value of pseudo element ::before or ::after
exports.verifyCssValueOfPseudoElement = function (elementLocator, cssProperty, cssValue) {
	//exports.waitVisibility(element(by.css(elementLocator)));
	var actualCssValue = browser.executeScript("return window.getComputedStyle(document.querySelector('" + elementLocator + "'),':before').getPropertyValue('" + cssProperty + "')");
	expect(actualCssValue).toBe(cssValue)
};

exports.verifyCurrentUrl = function (url) {
	expect(browser.getCurrentUrl()).toContain(url);
};

exports.verifyInputFieldIsBlank = function (field) {
	exports.verifyValue(field, '');
};

exports.verifySelectedOptionOnDropdown = function (dropdownElement, selectedOption) {
	expect(dropdownElement.$('option:checked').getText()).toEqual(selectedOption)
};

exports.verifyElementsAreUnselected = function (fieldsArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		expect(fieldsArray[i].isSelected()).toBe(false);
	}
};

exports.verifyElementIsSelected = function (element) {
	expect(element.isSelected()).toBe(true);
};

exports.verifyElementIsNotSelected = function (element) {
	expect(element.isSelected()).toBe(false);
};

exports.verifyAllInputFieldsAreBlank = function (fieldsArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		exports.waitVisibility(fieldsArray[i]);
		expect(fieldsArray[i].getText()).toBe('');
	}
};

// check value of one specific INPUT field
exports.verifyValue = function (field, string) {
	exports.waitVisibility(field);
	field.getAttribute('value').then(function (value) {
		expect(value).toEqual(string);
	});
};

// check text on multiple div fields
exports.verifyTextFields = function (fieldsArray, valuesArray) {
	for (var i = 0; i < valuesArray.length; i++) {
		expect(fieldsArray[i].getText()).toContain(valuesArray[i]);
	}
};

exports.verifyFieldIsDisabled = function (field) {
	expect(field.isEnabled()).toBe('false');
};

// check value of one specific  field
exports.verifyText = function (field, string) {
	exports.waitVisibility(field);
	expect(field.getText()).toContain(string)
};

//exports.verifyText = function (field, string) {
//  browser.sleep(3000)
//   browser.wait(EC.presenceOf(field), 15000).then(function () {
//     field.getText().then(function (text) {
//       expect(text).toContain(string);
//     });
//   });
// };

exports.verifyElementContainsText = function (field, string) {
	exports.waitVisibility(field);
	exports.verifyTextAfterTrimming(field, string)
};

exports.verifyTextIsNotDisplayed = function (field, string) {
	browser.sleep(3000)
	browser.wait(EC.presenceOf(field), 17000).then(function () {
		expect(field.getText()).not.toContain(string)
	});
};

// check values on multiple Input fields
exports.verifyInputValues = function (fieldsArray, valuesArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		exports.verifyValue(fieldsArray[i], valuesArray[i]);
	}
};

// verify presence of multiple elements at once
exports.verifyPresenceOfAllElements = function (fieldsArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		expect(fieldsArray[i].isPresent()).toBe(true);
	}
};

// verify presence of one element
exports.verifyPresenceOfElement = function (element) {
	expect(element.isPresent()).toBe(true);
};

// verify presence of one element
exports.verifyAbsenceOfElement = function (element) {
	expect(element.isPresent()).toBe(false);
};

// clears multiple input fields
exports.clearAllInputFields = function (fieldsArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		fieldsArray[i].clear();
	}
};

// enter values in mutiple input fields
exports.enterValuesToAllInputFields = function (fieldsArray, valuesArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		exports.waitAndEnterValue(fieldsArray[i], (valuesArray[i]))
	}
};
// enter values in mutiple input fields
exports.clearAndEnterValuesToAllInputFields = function (fieldsArray, valuesArray) {
	for (var i = 0; i < fieldsArray.length; i++) {
		exports.clearAndEnterValue(fieldsArray[i], (valuesArray[i]))
	}
};

// enter values in mutiple sequential input fields
exports.populateSequentialInputFields = function (fields, valuesArray) {

	exports.waitVisibility(fields.get(0));
	for (var i = 0; i < valuesArray.length; i++) {
		fields.get(i).sendKeys(valuesArray[i]);
	}
};

//tests an element for a css class
exports.hasClass = function (element, cls) {
	return element.getAttribute('class').then(function (classes) {
		return classes.split(' ').indexOf(cls) !== -1;
	});
};

// check value of one specific DIV field
exports.verifyTextAfterTrimming = function (field, string) {
	field.getText().then(function (text) {
		expect(text.trim()).toContain(string);
	});
};

/*// use this method is some of those sequential fields are hidden
 exports.verifyTextOnSequentialFields = function (fields, valuesArray) {

 fields.then(function (elems){
 var j = 0;
 for (var i = 0; i < elems.length; i++) {
 (function (g) {
 exports.hasClass(fields.get(g), 'ng-hide').then(function (isHidden) {
 if (isHidden === false) {
 exports.verifyText(fields.get(g), valuesArray[j]);
 j ++
 }
 });
 })(i, j);
 }
 });
 };*/

// check values on multiple sequential Div fields
exports.verifyTextOnSequentialFields = function (fields, valuesArray) {
	exports.scrollTo(fields.get(0));
	for (var i = 0; i < valuesArray.length; i++) {
		expect(fields.get(i).getText()).toContain(valuesArray[i]);
	}
};
// check values on multiple sequential Div fields
exports.verifyValuesOnSequentialFields = function (fields, valuesArray) {
	for (var i = 0; i < valuesArray.length; i++) {
		expect(fields.get(i).getAttribute('value')).toContain(valuesArray[i]);
	}
};

// count number of elements
exports.countAllElements = function (fields, numberOfFields) {
	expect(fields.count()).toBe(numberOfFields);
};

exports.scrollAndClick = function (elm) {

	exports.waitPresence(elm);
	browser.executeScript('arguments[0].scrollIntoView()', elm);
	exports.waitVisibility(elm);
	browser.sleep(1000).then(function () {
		elm.click();
		return true;
	});
};

exports.clickByJavaScriptExecutor = function (element) {
	exports.waitVisibility(element);
	browser.executeScript("arguments[0].click();", element);
};

exports.scrollTo = function (element) {
	exports.waitVisibility(element);
	return browser.executeScript('arguments[0].scrollIntoView()', element);
};

//wait elements to be visible, clickable

exports.waitPresenceAndClick = function (field) {
	browser.wait(EC.presenceOf(field), 50000);
	field.click();
};

//REPEATER functions, filtering elements by value

exports.clickElementByValue = function (fields, value) {

	fields.filter(function (elem) {
		return elem.getText().then(function (text) {
			return text === value;
		});
	}).then(function (filteredElements) {
		exports.waitPresenceAndClick(filteredElements[0]);
	});
};

exports.verifyInvisibility = function (element) {
	expect(element.isDisplayed()).toBe(false);
};

exports.verifyTextOfFirstNotHiddenElement = function (elements, string) {

	elements.then(function (elems) {
		for (var i = 0; i < elems.length; i++) {
			(function (h) {
				exports.hasClass(elements.get(h), 'ng-hide').then(function (isHidden) {
					if (isHidden === false) {
						exports.verifyElementContainsText(elements.get(h), string);
					}
				});
			})(i);
		}
	})
};

// TOASTER functions

exports.runNonAngular = function (fn) {
	var flow = protractor.promise.controlFlow();
	flow.execute(function () {
		browser.ignoreSynchronization = true;
	});
	flow.execute(fn);
	flow.execute(function () {
		browser.ignoreSynchronization = false;
	});
};

//checks toaster title and message
exports.checkToastMessage = function (title, message) {

//	browser.wait(EC.presenceOf(sharedElements.toast), 15000);
	expect($('.toast-title').getText()).toBe(title);
	expect($('.toast-message').getText()).toBe(message);
	$('.toast').click();
	exports.currentDate = dateFormat(Date(), "m/d/yyyy");
	return true;
};


exports.getCurrentDateAndTime = function (format) {

	exports.currentDate = dateFormat(Date(), format);
};

exports.selectDropdownOption = function (dropdownElement, optionValue) {

	exports.waitAndClick(dropdownElement);
	var optionElement = dropdownElement.all(by.cssContainingText('option', optionValue)).get(0);
	exports.waitPresenceAndClick(optionElement);
};

exports.selectDropdownOptionInDepartmentModal = function (dropdownElement, optionValue) {
	exports.waitAndClick(dropdownElement);
	dropdownElement.click();
	var optionElement = dropdownElement.all(by.cssContainingText('option', optionValue)).get(0);
	browser.sleep(2000);
	exports.waitVisibility(optionElement);
	exports.waitPresenceAndClick(optionElement);
};

exports.selectItemnOnDropdownList = function (dropdownElement, optionValue) {

	exports.waitAndClick(dropdownElement);
	var optionElement = element(by.cssContainingText('li', optionValue));
	exports.waitAndClick(optionElement);
};


exports.switchToWindow = function (index, url) {
	browser.getAllWindowHandles().then(function (handles) {
		var newHandle = handles[index];
		browser.switchTo().window(newHandle);
//		var currentHandle = browser.getWindowHandle();
		browser.driver.executeScript('window.focus();').then(function () {
			browser.wait(EC.urlContains(url), 15000);
		});
	});
};

exports.switchToFirstTab = function (url) {
	browser.getAllWindowHandles().then(function (handles) {
		var firstTab = handles[0];
//		var secondTab = handles[1];

		browser.driver.close();
		browser.switchTo().window(firstTab);

		browser.driver.executeScript('window.focus();').then(function () {
			browser.wait(EC.urlContains(url), D.timeout);
		});
	});
};

//exports.openNewTab = function (url) {
// 	browser.driver.executeScript(function () {
// 		(function (a) {
// 			document.body.appendChild(a);
// 			a.setAttribute('href', location.href);
// 			a.dispatchEvent((function (e) {
// 				e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
// 				return e;
// 			}(document.createEvent('MouseEvents'))))
// 		}(document.createElement('a')));
// 	});
//  	exports.selectWindow(1);
//  return browser.executeScript('window.focus();');
//  };

exports.selectWindow = function (index) {
	// wait for handels[index] to exists
	browser.driver.wait(function () {
		return browser.driver.getAllWindowHandles().then(function (handles) {
			/**
			 * Assume that handles.length >= 1 and index >=0.
			 * So when I call selectWindow(index) I return
			 * true if handles contains that window.
			 */
			if (handles.length > index) {
				return true;
			}
		});
	});
	// here i know that the requested window exists

	// switch to the window
	return browser.driver.getAllWindowHandles().then(function (handles) {
		browser.driver.switchTo().window(handles[index]);
		return browser.driver.executeScript('window.focus();');
	});
};

//________________________________________________________________________________________________________________________________________________________
//uploading files

exports.uploadFile = function (filename, fileInputNumber, otherSelector) {
	var fileToUpload = './' + filename,
		absolutePath = path.resolve(__dirname, fileToUpload);

	var fileInputs = browser.driver.findElements(by.css('input[type="file"]'));

	if (otherSelector !== undefined){
		fileInputs = browser.driver.findElement(by.css(otherSelector)).findElements(by.css('input[type="file"]'))
	}


	browser.driver.wait(function () {
		return fileInputs
			.then(function (elems) {
				elems[fileInputNumber-1].sendKeys(absolutePath);
				return true;
			});
	}, 50000);
};

exports.uploadFile1 = function (filename, fieldNo) {
	var fileToUpload = './' + filename,
		absolutePath = path.resolve(__dirname, fileToUpload);

	browser.driver.wait(function () {
		return browser.driver.findElements(by.css('input[type="file"]'))
			.then(function (elems) {
				elems[fieldNo].sendKeys(absolutePath);
				return true;
			});
	}, 50000);
};

String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.contains = function (it) {
	return this.indexOf(it) != -1;
};

module.exports = exports;



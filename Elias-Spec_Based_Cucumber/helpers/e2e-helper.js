'use strict';

var EC = protractor.ExpectedConditions;
// var D = require('../data-provider/conf-data.js');
var path = require('path');

//________________________________________________________________________________________________________________________________________________________
//login functions

exports.waitElementToBeClickable = function (element) {

	browser.wait(EC.elementToBeClickable(element), 60000);
};


exports.waitVisibility = function (element) {

	browser.wait(EC.visibilityOf(element), 60000);
};

exports.waitAndClick = function (element) {
	exports.waitElementToBeClickable(element);
	element.click();
};


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



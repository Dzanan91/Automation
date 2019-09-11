import scrollIntoView from "./scrollIntoView";

/**
 * @param inputElementWithLabel {ElementFinder}
 * @returns {Promise.<ElementFinder>}
 */
export const getInputsLabelElement = async inputElementWithLabel => {
  const inputId = await inputElementWithLabel.getAttribute("id");

  return $(`[for='${inputId}']`);
};

/**
 * @param element {ElementFinder}
 * @returns {Promise.<ElementFinder>}
 */
export const scrollAndClick = async element => {
  scrollIntoView(element);
  await element.click();

  return element;
};

export const waitForElementToAppear = async (element, timeout) => {
  var until = protractor.ExpectedConditions;

  if (!timeout) {
    browser.wait(function() {
      return element.isPresent();
    });
  } else {
    browser.wait(
      until.presenceOf(element),
      5000,
      "Element taking too long to appear in the DOM"
    );
  }
};

//if non angular forms
export const angularWait = async () => {
  browser.ignoreSynchronization = true;
  browser.waitForAngular();
  browser.sleep(500);
};

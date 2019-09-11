from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class AgggWordsAndTime(object):
    def __init__(self, driver):
        self.driver = driver

        self.aggregatedWordsXpath = driver.find_element(By.XPATH, locatorsAndUsers.aggregatedWordsXpath)
        self.aggregatedTimeXpath = driver.find_element(By.XPATH, locatorsAndUsers.aggregatedTimeXpath)
        self.reportsButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.reportsButtonXpath)


    def getAggWords(self):
        aggregatedWords_str = self.aggregatedWordsXpath.text
        print("Total amount of aggregated words is: ", aggregatedWords_str)

    def getAggTime(self):
        aggregatedTime_str = self.aggregatedTimeXpath.text
        print("Total amount of aggregated time is: ", aggregatedTime_str)

    def RepButton(self):
        self.reportsButtonXpath.click()




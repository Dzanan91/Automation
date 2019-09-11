from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By


class aggReportsSection(object):

    def __init__(self, driver):
        self.driver = driver

        self.ckuAggregatedReportsButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.ckuAggregatedReportsButtonXpath)
        self.ckuOnlyReportsButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.ckuOnlyReportsButtonXpath)

    def ckuAggNav(self):
        self.ckuAggregatedReportsButtonXpath.click()

    def CkuOnlyNav(self):
            self.ckuOnlyReportsButtonXpath.click()






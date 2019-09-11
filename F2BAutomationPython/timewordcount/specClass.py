from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class classIcon(object):
    def __init__(self, driver):
        self.driver = driver

        self.classButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.classButtonXpath)

    def ClassButton(self):
        self.classButtonXpath.click()

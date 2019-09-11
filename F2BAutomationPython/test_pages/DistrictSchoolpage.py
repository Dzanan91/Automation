from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class disSchool(object):
    def __init__(self,driver):
        self.driver = driver

        self.manageClassBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.manageClassBtnXpath)

    def manageClassBtnclick(self):
        self.manageClassBtnXpath.click()

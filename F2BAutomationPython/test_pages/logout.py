from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class LogOut(object):
    def __init__(self, driver):
        self.driver = driver
        self.logoutButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.logoutButtonXpath)

    def logoutFx(self):
        self.logoutButtonXpath.click()

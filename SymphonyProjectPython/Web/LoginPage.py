from locators import Locators
from selenium.webdriver.common.by import By

class Login(object):

    def __init__(self, driver):
        self.driver = driver

        self.LoginUserEmailXpath = driver.find_element(By.XPATH, Locators.LoginUserEmailXpath)
        self.LoginUserPwXpath = driver.find_element(By.XPATH, Locators.LoginUserPwXpath)
        self.LoginButton = driver.find_element(By.XPATH, Locators.LoginButton)

    def setEmail(self):
        email = "admin@phptravels.com"
        self.LoginUserEmailXpath.clear()
        self.LoginUserEmailXpath.send_keys(email)

    def setPw(self):
        pw = "demoadmin"
        self.LoginUserPwXpath.clear()
        self.LoginUserPwXpath.send_keys(pw)

    def LoginBtn(self):
        self.LoginButton.click()

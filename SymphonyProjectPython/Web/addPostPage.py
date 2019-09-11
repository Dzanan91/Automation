from locators import Locators
from selenium.webdriver.common.by import By

class addPost(object):

    def __init__(self, driver):
        self.driver = driver

        self.addBtnXpath = driver.find_element(By.XPATH, Locators.addBtnXpath)

    def goAdd(self):
        self.addBtnXpath.click()

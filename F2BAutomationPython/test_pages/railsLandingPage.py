from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class landingPage(object):
    def __init__(self,driver):
        self.driver = driver
        self.classManagementBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.classManagementBtnXpath)

    def classManagementBtnclick(self):
        self.classManagementBtnXpath.click()





from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class StudentSearch(object):
    def __init__(self, driver):
        self.driver = driver

        self.findStudentsButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.findStudentsButtonXpath)

    def studentSearchButton(self):
        self.findStudentsButtonXpath.click()

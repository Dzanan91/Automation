from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By


class DesiredStudent(object):
    def __init__(self, driver):
        self.driver = driver

        self.testStudentXpath = driver.find_element(By.XPATH, locatorsAndUsers.testStudentXpath)

    def teststudent(self):
        self.testStudentXpath.click()


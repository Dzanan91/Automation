from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class myClassroom(object):
    def __init__(self,driver):
        self.driver = driver

        self.addStudentBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.addStudentBtnXpath)

    def addStudentclick(self):
        self.addStudentBtnXpath.click()


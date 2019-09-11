from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class SearchingStud(object):
    def __init__(self, driver):
        self.driver = driver

        self.studentFirstNameFieldXpath = driver.find_element(By.XPATH, locatorsAndUsers.studentFirstNameFieldXpath)
        self.studentIDFieldXpath = driver.find_element(By.XPATH, locatorsAndUsers.studentIDFieldXpath)
        self.searchButtonXpath = driver.find_element(By.XPATH, locatorsAndUsers.searchButtonXpath)

    def setStudentFN(self):
        name = "Autotest"
        self.studentFirstNameFieldXpath.send_keys(name)

    def setStudentID(self):
        ID = "123qa"
        self.studentIDFieldXpath.send_keys(ID)

    def SearcButton(self):
        self.searchButtonXpath.click()




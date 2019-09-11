from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By


class addNewStudent(object):
    def __init__(self, driver):
        self.driver = driver

        self.addStudentBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.addStudentBtnXpath)
        self.firstNameXpath = driver.find_element(By.XPATH, locatorsAndUsers.firstNameXpath)
        self.lastNameXpath = driver.find_element(By.XPATH, locatorsAndUsers.lastNameXpath)
        self.studentIDXpath = driver.find_element(By.XPATH, locatorsAndUsers.studentIDXpath)
        self.dateOfBirthXpath = driver.find_element(By.XPATH, locatorsAndUsers.dateOfBirthXpath)


    def addStudentclick(self):
            self.addStudentBtnXpath.click()

    def addFirstname(self):
            firstname = "Automation5"
            self.firstNameXpath.click()
            self.firstNameXpath.clear()
            self.firstNameXpath.send_keys(firstname)

    def addLastname(self):
            lastName = "test5"
            self.lastNameXpath.click()
            self.lastNameXpath.clear()
            self.lastNameXpath.send_keys(lastName)

    def addId(self):
            ID = "test5"
            self.studentIDXpath.click()
            self.studentIDXpath.clear()
            self.studentIDXpath.send_keys(ID)

    def addDateofBirth(self):
            self.dateOfBirthXpath.click()

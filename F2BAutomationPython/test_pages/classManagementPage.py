from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class classManagement(object):
    def __init__(self,driver):
        self.driver = driver

        self.classManagementBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.classManagementBtnXpath)
        self.manageClassBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.manageClassBtnXpath)
        self.addStudentBtnXpath = driver.find_element(By.NAME, locatorsAndUsers.addStudentBtnXpath)
        self.firstNameXpath = driver.find_element(By.XPATH, locatorsAndUsers.firstNameXpath)
        self.lastNameXpath = driver.find_element(By.XPATH, locatorsAndUsers.lastNameXpath)
        self.studentIDXpath = driver.find_element(By.XPATH, locatorsAndUsers.studentIDXpath)
        self.dateOfBirthXpath = driver.find_element(By.XPATH, locatorsAndUsers.dateOfBirthXpath)
        self.dateNumberXpath = driver.find_element(By.XPATH, locatorsAndUsers.dateNumberXpath)
        self.checkBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.checkBtnXpath)
        self.createNewstudentBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.createNewstudentBtnXpath)
        self.createBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.createBtnXpath)

    def classManagementBtnclick(self):
        self.classManagementBtnXpath.click()

    def manageClassBtnclick(self):
        self.manageClassBtnXpath.click()

    def addStudentclick(self):
        self.addStudentBtnXpath.click()

    def addFirstname(self):
        firstname = "Automation"
        self.firstNameXpath.clear()
        self.firstNameXpath.send_keys(firstname)

    def addLastname(self):
        lastName = "test"
        self.lastNameXpath.click()
        self.lastNameXpath.clear()
        self.lastNameXpath.send_keys(lastName)

    def addId(self):
        iD = "test123"
        self.studentIDXpath.click()
        self.studentIDXpath.clear()
        self.studentIDXpath.send_keys(iD)

    def addDateofBirth(self):
        self.dateOfBirthXpath.click()

    def adddateNumber(self):
        self.dateNumberXpath.click()

    def checkButton(self):
        self.checkBtnXpath.click()

    def createButton(self):
        self.createNewstudentBtnXpath.click()

    def createStudentBtn(self):
        self.createBtnXpath.click()



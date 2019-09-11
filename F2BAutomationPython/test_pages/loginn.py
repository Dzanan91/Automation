from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class Role(object):
    def __init__(self, driver):
        self.driver = driver
        self.userNameFieldID = driver.find_element(By.ID, locatorsAndUsers.userNameFieldID)
        self.passwordFieldName = driver.find_element(By.NAME, locatorsAndUsers.passwordFieldName)
        self.loginButtonName = driver.find_element(By.NAME, locatorsAndUsers.loginButtonName)

    def setTeacherUsername(self):
        name = "leomessi"
        self.userNameFieldID.clear()
        self.userNameFieldID.send_keys(name)

    def setTeacherPassword(self):
        password = "leomessi"
        self.passwordFieldName.clear()
        self.passwordFieldName.send_keys(password)

    def setAdminUsername(self):
            username = "qaengineer"
            self.userNameFieldID.clear()
            self.userNameFieldID.send_keys(username)

    def setAdminPassword(self):
            password = "qaengineer"
            self.passwordFieldName.clear()
            self.passwordFieldName.send_keys(password)

    def submitButton(self):
        self.loginButtonName.click()

class adminDash(object):

    def __init__(self, driver):
        self.driver = driver
        self.userNameFieldID = driver.find_element(By.ID, locatorsAndUsers.userNameFieldID)
        self.passwordFieldName = driver.find_element(By.NAME, locatorsAndUsers.passwordFieldName)
        self.loginButtonName = driver.find_element(By.NAME, locatorsAndUsers.loginButtonName)
        self.f2bAdminBtnXpath = driver.find_element(By.XPATH, locatorsAndUsers.f2bAdminBtnXpath)

    def f2bAdminBtnClick(self):
        self.f2bAdminBtnXpath.click()






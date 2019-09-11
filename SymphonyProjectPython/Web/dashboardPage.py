from locators import Locators
from selenium.webdriver.common.by import By



class Dashboard(object):
    def __init__(self, driver):
        self.driver = driver

        self.QuickBookingXpath = driver.find_element(By.XPATH, Locators.QuickBookingXpath)
        self.BookingsXpath = driver.find_element(By.XPATH, Locators.BookingsXpath)
        self.CmsPagesXpath = driver.find_element(By.XPATH, Locators.CmsPagesXpath)
        self.BlogXpath = driver.find_element(By.XPATH, Locators.BlogXpath)
        self.SendNewsletterXpath = driver.find_element(By.XPATH, Locators.SendNewsletterXpath)
        self.BackupDatabaseXpath = driver.find_element(By.XPATH, Locators.BackupDatabaseXpath)

#Here we can define any necessary behaviour of our elements and then just call it in test file
    def textQBXpath(self):
        print(self.QuickBookingXpath.text)

    def textBX(self):
        print(self.BookingsXpath.text)

    def textCMSX(self):
        print(self.CmsPagesXpath.text)

    def textBlogX(self):
        print(self.BlogXpath.text)
        self.BlogXpath.click()

    def textSNX(self):
        print(self.SendNewsletterXpath.text)

    def textBDX(self):
        print(self.BackupDatabaseXpath.text)

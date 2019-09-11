from locatorsUserdata import locatorsAndUsers
from selenium.webdriver.common.by import By

class ckuOnlyWandT(object):
    def __init__(self, driver):
        self.driver = driver

        self.ckuOnlyWordsXpath = driver.find_element(By.XPATH, locatorsAndUsers.ckuOnlyWordsXpath)
        self.ckuOnlyTimeXpath = driver.find_element(By.XPATH, locatorsAndUsers.ckuOnlyTimeXpath)

    def ckuOnlyWords(self):
        ckuOnlywords_str = self.ckuOnlyWordsXpath.text
        print("Amount of words read in CKU is: ", ckuOnlywords_str)

    def ckuOnlyTime(self):
        ckuOnlytime_str = self.ckuOnlyTimeXpath.text
        print("Amount of time spent in CKU is: ", ckuOnlytime_str)

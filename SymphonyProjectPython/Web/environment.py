import unittest
from selenium import webdriver
import datetime

class TestEnvironment(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("C:\\Users\\T440s\\Desktop\\Selenium\\chromedriver.exe")
        self.driver.get("https://www.phptravels.net/admin")
        self.driver.maximize_window()

    def tearDown(self):
        if (self.driver != None):
            print("=============================")
            print("Test environment terminated")
            print("Test completed at: ", str(datetime.datetime.now()))
            self.driver.quit()
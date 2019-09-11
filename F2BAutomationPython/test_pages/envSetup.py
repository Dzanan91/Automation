import unittest
import datetime
from selenium import webdriver
import HtmlTestRunner

class Testenvironment(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("C:\\Users\\T440s\\Desktop\\Selenium\\chromedriver.exe")
        self.driver.get("https://www.stage.myf2b.com/reports/reports_landing_page")
        self.driver.maximize_window()

    def tearDown(self):
        if (self.driver != None):
            print("=============================")
            print("Test environment terminated")
            print("Test completed at: ", str(datetime.datetime.now()))
            self.driver.quit()

if __name__ == '__main__':
        unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='C:\\Users\\T440s\\Desktop\\F2BAutomation'))

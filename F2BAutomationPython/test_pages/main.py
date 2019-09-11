import time
import unittest

import HtmlTestRunner
from ReportsNav import aggReportsSection
from aggWordsandTime import AgggWordsAndTime
from ckuOnlyWordsandTime import ckuOnlyWandT
from searchingStudent import SearchingStud
from specClass import classIcon
from specStudent import DesiredStudent
from studentSearch import StudentSearch

from Pages.loginn import Role
from envSetup import Testenvironment


class CkuFlow(Testenvironment):

    def test1(self):
        driver = self.driver

        role = Role(driver)
        role.setUsername()
        role.setPassword()
        role.submitButton()

        agg = aggReportsSection(driver)
        agg.ckuAggNav()

        student = StudentSearch(driver)
        student.studentSearchButton()

        student_info = SearchingStud(driver)
        student_info.setStudentFN()
        student_info.setStudentID()
        student_info.SearcButton()

        aggWT = AgggWordsAndTime(driver)
        aggWT.getAggWords()
        aggWT.getAggTime()
        aggWT.RepButton()

        agg = aggReportsSection(driver)
        agg.CkuOnlyNav()

        sclass = classIcon(driver)
        sclass.ClassButton()

        time.sleep(8)
        sstudent = DesiredStudent(driver)
        sstudent.teststudent()

        time.sleep(8)
        ckuOnlyWT = ckuOnlyWandT(driver)
        ckuOnlyWT.ckuOnlyWords()
        ckuOnlyWT.ckuOnlyTime()

        ckuOnlyWordsXpath = driver.find_element_by_xpath("//*[@id='report']/table[1]/tbody/tr/td[1]")
        ckuOnlywords_str = ckuOnlyWordsXpath

        ckuOnlyTimeXpath = driver.find_element_by_xpath("//*[@id='report']/table[1]/tbody/tr/td[4]")
        ckuOnlytime_str = ckuOnlyTimeXpath

        aggregatedWordsXpath = "//*[@id='table']/tbody[2]/tr[1]/td[11]"
        aggregatedWords_str = aggregatedWordsXpath

        aggregatedTimeXpath = "//*[@id='table']/tbody[2]/tr[1]/td[12]"
        aggregatedTime_str = aggregatedTimeXpath

        assert aggregatedWords_str != ckuOnlywords_str and aggregatedTime_str != ckuOnlytime_str
        print("Test has passed")

if __name__ == '__main__':
        unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='C:\\Users\\T440s\\Desktop\\F2BAutomation'))











import unittest
import time
from test_pages.loginn import Role
from envSetup import Testenvironment
from test_pages.logout import LogOut
import HtmlTestRunner
from test_pages.railsLandingPage import landingPage
from test_pages.DistrictSchoolpage import disSchool
from test_pages.myClassPage import myClassroom
from test_pages.addStudentPage import addNewStudent


class TestRails(Testenvironment):
    def test1(self):
        #Testing login feature

        driver = self.driver

        role = Role(driver)
        role.setTeacherUsername()
        role.setTeacherPassword()
        role.submitButton()
        assert 'Reports' in driver.title
        print('Test has passed,user has successfully logged in')
        if not 'Reports' in driver.title:
            print("Test has failed")
            raise AssertionError()

    def test2(self):
        #Testing logout feature

        driver = self.driver

        role = Role(driver)
        role.setTeacherUsername()
        role.setTeacherPassword()
        role.submitButton()
        assert 'Reports' in driver.title
        if not 'Reports' in driver.title:
            print("Test has failed")
            raise AssertionError()
        Logout = LogOut(driver)
        Logout.logoutFx()
        time.sleep(3)
        assert 'My Library' in driver.title
        print('Test has passed,user has successfully logged out')
        if not 'My Library' in driver.title:
            print("Test has failed")
            raise AssertionError()

    def test3(self):
        #Testing Add Student feature
        driver = self.driver

        role = Role(driver)
        role.setTeacherUsername()
        role.setTeacherPassword()
        role.submitButton()

        addStudent = landingPage(driver)
        assert 'Reports' in driver.title
        if not 'Reports' in driver.title:
            raise AssertionError()
        addStudent.classManagementBtnclick()
        time.sleep(3)
        assert 'Class Management' in driver.title
        if not 'Class Management' in driver.title:
            raise AssertionError()
        addStudent2 = disSchool(driver)
        addStudent2.manageClassBtnclick()
        assert 'Class Management' in driver.title
        if not 'Class Management' in driver.title:
            raise AssertionError()
        time.sleep(4)
        assert 'Class Management' in driver.title
        if not 'Class Management' in driver.title:
            raise AssertionError("Test has failed")
        addStudent3 = myClassroom(driver)
        addStudent3.addStudentclick()
        time.sleep(3)
        addStudent4 = addNewStudent(driver)
        addStudent4.addFirstname()
        addStudent4.addLastname()
        addStudent4.addId()
        addStudent4.addDateofBirth()
        driver.find_element_by_xpath("//*[@id='ui-datepicker-div']/table/tbody/tr[1]/td[6]/a").click()
        driver.find_element_by_xpath("//*[@id='submit']").click()
        time.sleep(5)
        driver.find_element_by_xpath("//*[@id='cboxLoadedContent']/div/div[2]/div/a").click()
        time.sleep(5)
        driver.find_element_by_xpath("//*[@id='submit-btns-section']/input").click()
        assert 'Class Management' in driver.title
        if not 'Class Management' in driver.title:
            raise AssertionError("Test has failed")
        time.sleep(7)

    def test_4(self):
        driver = self.driver

        role = Role(driver)
        role.setAdminUsername()
        role.setAdminPassword()
        role.submitButton()
        assert 'Reports' in driver.title
        if not 'Reports' in driver.title:
            raise AssertionError()
        driver.find_element_by_xpath("//*[@id='menu_green']/li[8]/a/div[2]").click()
        time.sleep(2)
        assert 'Admin Dashboard' in driver.title
        if not 'Admin Dashboard' in driver.title:
            raise AssertionError("Test has failed")


    if __name__ == '__main__':
        unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='C:\\Users\\T440s\\Desktop\\F2BAutomation'))
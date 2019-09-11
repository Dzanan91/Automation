from environment import TestEnvironment
from LoginPage import Login
from dashboardPage import Dashboard
import time
from blogpage import newBlog
from addPostPage import addPost
from selenium.webdriver.support.select import Select



class NewPostFlow(TestEnvironment):

    def test1(self):
        driver = self.driver

        log = Login(driver)
        log.setEmail()
        log.setPw()
        log.LoginBtn()
        time.sleep(5)

    #Navigating to Dashhboard page where we will verify that page contains 6 buttons with given text
        dash = Dashboard(driver)
        dash.textQBXpath()
        dash.textBX()
        dash.textBDX()
        dash.textCMSX()
        dash.textSNX()
        dash.textBlogX()
        time.sleep(5)
    #Setting up new blog

        post = addPost(driver)
        post.goAdd()
        time.sleep(3)
        blog = newBlog(driver)
        blog.setTitle()
        time.sleep(3)
        driver.switch_to.frame(driver.find_element_by_tag_name("iframe"))
        driver.find_element_by_xpath("/html/body").send_keys("This is my first post")
        driver.switch_to_default_content()
        blog.postStatus()
        blog.postCategory()
        blog.relatedPosts()
        time.sleep(3)
        blog.setKeyword()
        blog.setdesc()
        blog.submitBtn()
        time.sleep(5)
        driver.find_element_by_xpath("//*[contains(text(), 'Test Post')]").click()
        time.sleep(3)
        related = Select(driver.find_element_by_xpath("//*[@id='GENERAL']/div[3]/div/div/div[2]/div[3]/div/select"))
        related.select_by_value("30")
        related.select_by_value("24")
        driver.find_element_by_xpath("//*[@id='content']/div/form/div/div[2]/button").click()
        time.sleep(3)
        driver.find_element_by_xpath("//*[@id='content']/div/div[2]/div/div/div[1]/div[2]/table/tbody/tr[1]/td[9]/span/a[2]/i").click()
        time.sleep(5)
        alert = driver.switch_to_alert()
        alert.accept()









from locators import Locators
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

class newBlog(object):

    def __init__(self, driver):
        self.driver = driver

        self.postTitleXpath = driver.find_element(By.XPATH, Locators.postTitleXpath)
        self.postDescXpath = driver.find_element(By.XPATH, Locators.postDescXpath)
        self.postSettingsStatusXpath = driver.find_element(By.XPATH, Locators.postSettingsStatusXpath)
        self.postSettingsCategoryXPath = driver.find_element(By.XPATH, Locators.postSettingsCategoryXPath)
        self.postSettingsRelPostsXpath = driver.find_element(By.XPATH, Locators.postSettingsRelPostsXpath)
        self.postThumbnailXpath = driver.find_element(By.XPATH, Locators.postThumbnailXpath)
        self.keyWordsXpath = driver.find_element(By.XPATH, Locators.keyWordsXpath)
        self.descXpath = driver.find_element(By.XPATH, Locators.descXpath)
        self.submitButtonXpath = driver.find_element(By.XPATH, Locators.submitButtonXpath)


    def setTitle(self):
        posttitle = "Test Post"
        self.postTitleXpath.clear()
        self.postTitleXpath.send_keys(posttitle)

    def setDescription(self):
        description = "This is my first post"
        self.postDescXpath.send_keys(description)

    def postStatus(self):
        self.postSettingsStatusXpath.click()
        disable = Select(self.postSettingsStatusXpath)
        disable.select_by_visible_text("Disable")

    def postCategory(self):
        self.postSettingsCategoryXPath.click()
        adventure = Select(self.postSettingsCategoryXPath)
        adventure.select_by_visible_text("Adventure")

    def relatedPosts(self):
        related = Select(self.postSettingsRelPostsXpath)
        related.select_by_value("30")
        related.select_by_value("31")

    def relatedPosts2(self):
        related = Select(self.postSettingsRelPostsXpath)
        related.select_by_value("30")
        related.select_by_value("24")

    def uploadImage(self):
        self.postThumbnailXpath.click()
        self.postThumbnailXpath.send_keys("C:\\Users\\T440s\\Desktop\\Pythonstuff\\SymphonY\\es")

    def setKeyword(self):
        keywords = "Test"
        self.keyWordsXpath.send_keys(keywords)

    def setdesc(self):
        desc = "What a beautiful post"
        self.descXpath.send_keys(desc)

    def submitBtn(self):
        self.submitButtonXpath.click()






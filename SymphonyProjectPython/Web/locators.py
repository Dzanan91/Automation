class Locators(object):

#login page locators
    LoginUserEmailXpath = "/html/body/div[1]/form[1]/div[1]/input[1]"
    LoginUserPwXpath = "/html/body/div[1]/form[1]/div[1]/input[2]"
    LoginButton = "/html/body/div[1]/form[1]/button"

#dashboard locators
    QuickBookingXpath = "//*[@id='content']/div[1]/div[1]/button/div"
    BookingsXpath = "//*[@id='content']/div[1]/div[2]/form/button"
    CmsPagesXpath = "//*[@id='content']/div[1]/div[3]/form/button/div"
    BlogXpath = "//*[@id='content']/div[1]/div[4]/form/button/div"
    SendNewsletterXpath = "//*[@id='content']/div[1]/div[5]/form/button/div"
    BackupDatabaseXpath = "//*[@id='content']/div[1]/div[6]/form/button/div"

#blog locators
    addBtnXpath = "//*[@id='content']/div/form/button"
    postTitleXpath = "//*[@id='GENERAL']/div[1]/div[1]/div/input"
    postDescXpath = "//*[@id='cke_1_contents']/iframe"
    postSettingsStatusXpath = "//*[@id='GENERAL']/div[3]/div/div/div[2]/div[1]/div/select"
    postSettingsCategoryXPath = "//*[@id='GENERAL']/div[3]/div/div/div[2]/div[2]/div/select"
    postSettingsRelPostsXpath = "//*[@id='GENERAL']/div[3]/div/div/div[2]/div[3]/div/select"
    postThumbnailXpath = "//*[@id='image_default']"
    keyWordsXpath = "//*[@id='GENERAL']/div[4]/div/div/div[2]/div[1]/div/input"
    descXpath = "//*[@id='GENERAL']/div[4]/div/div/div[2]/div[2]/div/input"
    submitButtonXpath = "//*[@id='content']/div/form/div/div[2]/button"
    myPostXpath = "self//*[@id='content0]/div/div[2]/div/div/div[1]/div[2]/table/tbody/tr[1]/td[4]/a"




class locatorsAndUsers(object):

        #Login page locators
        userNameFieldID = "login"
        passwordFieldName = "password"
        loginButtonName = "commit"


        #Landing page locators
        logoutButtonXpath = "//*[@id='logout_link']/a/img"
        classMngXpath = "//*[@id='menu_green']/li[2]/a/div[2]"
        f2bAdminBtnXpath = "//*[@id='menu_green']/li[8]/a/div[2]"

        #Class management locators
        classManagementBtnXpath = "//*[@id='menu_green']/li[2]/a"
        manageClassBtnXpath = "//*[@id='student_classes']/tbody/tr/td[4]/a[1]"
        addStudentBtnXpath = "//*[@id='center_reports']/div[5]/div/span[1]"
        firstNameXpath = "//*[@id='student_first_name']"
        lastNameXpath = "//*[@id='student_last_name']"
        studentIDXpath = "//*[@id='student_student_id']"
        dateOfBirthXpath = "//*[@id='student_date_of_birth']"
        dateNumberXpath = "//*[@id='ui-datepicker-div']/table/tbody/tr[1]/td[6]/a"
        checkBtnXpath = "//*[@id='submit']"
        createNewstudentBtnXpath = "//*[@id='cboxLoadedContent']/div/div[2]/div/a"
        createBtnXpath = "//*[@id='submit-btns-section']/input"

        #POC
        ckuAggregatedReportsButtonXpath = "//*[@id='center_reports']/div[3]/div/div[1]/a/img"
        findStudentsButtonXpath = "//*[@id='nav_reports']/a[2]"
        studentFirstNameFieldXpath = "//*[@id='first_name']"
        studentIDFieldXpath = "//*[@id='student_id']"
        searchButtonXpath = "//*[@id='search']"
        aggregatedWordsXpath = "//*[@id='table']/tbody[2]/tr[1]/td[11]"
        aggregatedTimeXpath = "//*[@id='table']/tbody[2]/tr[1]/td[12]"
        reportsButtonXpath = "//*[@id='menu_green']/li[1]/a/div[2]"
        ckuOnlyReportsButtonXpath = "//*[@id='center_reports']/div[3]/div/div[2]/a/img"
        classButtonXpath = "//*[@id='student_classes']/tbody/tr/td[3]/a/img"
        testStudentXpath = "//*[@id='report']/table[2]/tbody/tr[3]/td[1]/a"
        ckuOnlyWordsXpath = "//*[@id='report']/table[1]/tbody/tr/td[1]"
        ckuOnlyTimeXpath = "//*[@id='report']/table[1]/tbody/tr/td[4]"
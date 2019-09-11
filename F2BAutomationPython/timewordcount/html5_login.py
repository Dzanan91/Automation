from testEnv import Testenvironment
import pyautogui
import time

class Html5_test(Testenvironment):
    def test1_loginonapp(self):
        driver = self.driver
        pyautogui.PAUSE = 1
        pyautogui.FAILSAFE = False
        time.sleep(15)
        pyautogui.moveTo(1240,350)
        pyautogui.click()
        pyautogui.moveTo(1400,975)
        pyautogui.click()
        pyautogui.moveTo(951,965)
        pyautogui.click()
        pyautogui.moveTo(1110,805)
        pyautogui.click()
        pyautogui.moveTo(1420,800)
        pyautogui.click()
        pyautogui.moveTo(642,552)
        pyautogui.click()
        pyautogui.moveTo(1427,372)
        pyautogui.click()
        time.sleep(10)



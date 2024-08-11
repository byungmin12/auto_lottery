import { Page } from 'puppeteer';

export const navigateToPage = async (page :  Page, url: string) => {
  await page.goto(url);
}

export const loginToSite = async (page: Page, userId: string, password: string): Promise<void> => {
  await page.click("#userId");
  await page.type('#userId', userId);

  await page.click('[title="비밀번호"]');
  await page.type('[title="비밀번호"]', password);

  await page.keyboard.press("Enter");
  await page.waitForNavigation();
};

export const selectLotteryNumbers = async (page: Page): Promise<void> => {
  await page.click('#num2');
  await page.click('#amoundApply');
  await page.keyboard.press("1");
  await page.keyboard.press("Enter");
  await page.click('#btnSelectNum');
};

export const confirmAndBuy = async (page: Page): Promise<void> => {
  await page.click('#btnBuy');
  await page.evaluate(() => {
    const confirmButtonSelector = '.box .btns input[value="확인"]';
    const buttons = Array.from(document.querySelectorAll(confirmButtonSelector)) as HTMLElement[];
    const visibleButtons = buttons.filter(button => button.offsetParent !== null);
    visibleButtons.forEach(button => button.click());
  });
};
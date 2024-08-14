import puppeteer from 'puppeteer';
import { LOGIN_PAGE, PURCHASE_PAGE } from './constant';
import { confirmAndBuy, loginToSite, navigateToPage, selectLotteryNumbers, sendEmail } from './operations';

(async (): Promise<void> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await navigateToPage(page, LOGIN_PAGE);
  await loginToSite(page, 'kbm19940526', 'Qudals12!@');

  await navigateToPage(page, PURCHASE_PAGE);
  await selectLotteryNumbers(page);
  await confirmAndBuy(page);

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();

  // await sendEmail();
})();

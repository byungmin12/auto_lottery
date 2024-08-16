import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { LOGIN_PAGE, PURCHASE_PAGE } from './constant';
import { checkDetourApi, confirmAndBuy, loginToSite, navigateToPage, selectLotteryNumbers } from './operations';

dotenv.config();

(async (): Promise<void> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await navigateToPage(page, LOGIN_PAGE);
  if (!process.env.LOTTERY_ID || !process.env.LOTTEY_PASSWORD) {
    throw Error('env를 설정해주세요');
  }
  await loginToSite(page, process.env.LOTTERY_ID, process.env.LOTTEY_PASSWORD);

  await navigateToPage(page, PURCHASE_PAGE);

  await checkDetourApi(page);

  await selectLotteryNumbers(page);
  await confirmAndBuy(page);

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  console.log('done');
  // console.log(await page.content());

  await browser.close();

  // await sendEmail();
})();

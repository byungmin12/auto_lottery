import nodemailer from 'nodemailer';
import { Page } from 'puppeteer';

export const navigateToPage = async (page: Page, url: string) => {
  await page.goto(url);
};

export const loginToSite = async (page: Page, userId: string, password: string): Promise<void> => {
  await page.click('#userId');
  await page.type('#userId', userId);

  await page.click('[title="비밀번호"]');
  await page.type('[title="비밀번호"]', password);

  await page.keyboard.press('Enter');
  await page.waitForNavigation();
};

export const selectLotteryNumbers = async (page: Page): Promise<void> => {
  await page.click('#num2');
  await page.click('#amoundApply');
  await page.keyboard.press('1');
  await page.keyboard.press('Enter');
  await page.click('#btnSelectNum');
};

export const confirmAndBuy = async (page: Page): Promise<void> => {
  await page.click('#btnBuy');
  await page.evaluate(() => {
    const confirmButtonSelector = '.box .btns input[value="확인"]';
    const buttons = Array.from(document.querySelectorAll(confirmButtonSelector)) as HTMLElement[];
    const visibleButtons = buttons.filter((button) => button.offsetParent !== null);
    visibleButtons.forEach((button) => button.click());
  });
};

export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // 받을 이메일 주소
    subject: '복권 구매', // 이메일 제목
    text: `${Date.now()} 구매`, // 이메일 내용

    html: `<p>
    <p>${Date.now()} 구매</p>
    <img src="./screenshot.png" alt="복권 구매">
    </p>`,
  });
};

export const checkDetourApi = async (page: Page) => {
  const button = await page.evaluate(() => {
    const popup = document.querySelector('#popupLayerAlert');
    console.log(popup);
    if (popup) {
      return Array.from(popup.querySelectorAll('button')).find((button) => button.textContent === '확인');
    }
    return null;
  });

  if (button) button.click();
};

import process from 'node:process';
import type { BrowserCommand } from 'vitest/node';

export interface OpenAppPageResult {
  title: string;
  bodyText: string;
}

export const openAppPage: BrowserCommand<[], Promise<OpenAppPageResult>> = async (ctx) => {
  if (ctx.provider.name !== 'playwright') {
    throw new Error('openAppPage requires the Playwright browser provider');
  }
  const { context } = ctx as { context: import('playwright').BrowserContext };
  const appUrl = process.env.E2E_APP_URL ?? 'http://localhost:4180';
  const page = await context.newPage();
  try {
    await page.goto(appUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const title = await page.title();
    const bodyText = await page.locator('body').innerText();
    return { title, bodyText };
  } finally {
    await page.close();
  }
};

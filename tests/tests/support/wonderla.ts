import { expect, type Page } from '@playwright/test';

export const WONDERLA_BASE_URL = 'https://www.wonderla.com';

export const WONDERLA_HOME_TITLE =
  'Wonderla Parks & Resort | Largest Amusement Park in India | Wonderla';

const siteShellMarker = [
  'a[href*="/park-booking"]',
  'a[href$="/rides"]',
  'a[href$="/restaurants"]',
  'body:has-text("Select your destination")',
  'body:has-text("Plan your adventure")',
].join(', ');

export async function gotoWonderla(page: Page, path = '/') {
  const response = await page.goto(new URL(path, WONDERLA_BASE_URL).toString(), {
    waitUntil: 'domcontentloaded',
    timeout: 45_000,
  });

  expect(response?.ok()).toBe(true);

  const skipSplash = page.getByRole('button', { name: /^skip$/i });
  await skipSplash.click({ timeout: 3_000 }).catch(() => {});
  await expect(skipSplash).toBeHidden({ timeout: 15_000 }).catch(() => {});
  await expect(page.locator(siteShellMarker).first()).toBeAttached({
    timeout: 30_000,
  });

  return response;
}

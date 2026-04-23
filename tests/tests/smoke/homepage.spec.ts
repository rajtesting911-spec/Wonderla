import { expect, test } from '@playwright/test';

import { gotoWonderla, WONDERLA_HOME_TITLE } from '../support/wonderla';

test.setTimeout(60_000);

test('homepage loads @smoke', async ({ page }) => {
  await gotoWonderla(page);

  await expect(page).toHaveTitle(WONDERLA_HOME_TITLE);
});

test('homepage shows primary navigation and booking entry points', async ({
  page,
}) => {
  await gotoWonderla(page);

  await expect(page.locator('a[href$="/park-booking"]').first()).toHaveAttribute(
    'href',
    /\/park-booking$/,
  );
  await expect(page.locator('a[href$="/rides"]').first()).toHaveAttribute(
    'href',
    /\/rides$/,
  );
  await expect(page.locator('a[href$="/restaurants"]').first()).toHaveAttribute(
    'href',
    /\/restaurants$/,
  );
});

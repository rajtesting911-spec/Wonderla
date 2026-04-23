import { expect, test } from '@playwright/test';

import { gotoWonderla } from '../support/wonderla';

test.setTimeout(90_000);

const destinations = [
  'Kochi',
  'Bengaluru',
  'Hyderabad',
  'Bhubaneswar',
  'Chennai',
];

test('booking entry opens the destination selection step', async ({ page }) => {
  await gotoWonderla(page);

  await page.getByRole('link', { name: /book tickets/i }).first().click();

  await expect(page).toHaveURL(/\/park-booking$/);
  await expect(page.locator('body')).toContainText(/Select your destination/i);

  for (const destination of destinations) {
    await expect(page.locator('body')).toContainText(destination);
  }

  await expect(page.locator('body')).toContainText('Location');
  await expect(page.locator('body')).toContainText('Visit Date');
  await expect(page.locator('body')).toContainText('Tickets');
  await expect(page.locator('body')).toContainText('Billing');
});

test('selecting a destination shows visit date and ticket planning details', async ({
  page,
}) => {
  await gotoWonderla(page, '/park-booking');

  const bengaluruDestination = page
    .locator('main')
    .last()
    .getByText('Bengaluru', { exact: true });

  await expect(bengaluruDestination).toBeVisible();
  await bengaluruDestination.click();

  await expect(page).toHaveURL(/\/park-booking\?.*step=2.*location=1/);
  await expect(page.locator('body')).toContainText(/Plan your adventure/i);
  await expect(page.locator('body')).toContainText('Bengaluru');
  await expect(page.locator('body')).toContainText(/Park Timings/i);
  await expect(page.locator('body')).toContainText(/Entry to any ride/i);
  await expect(page.locator('body')).toContainText('selected date of visit');
});

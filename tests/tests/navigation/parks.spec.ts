import { expect, test } from '@playwright/test';

import { gotoWonderla } from '../support/wonderla';

test.setTimeout(60_000);

const parks = [
  {
    name: 'Chennai',
    path: '/chennai',
    title: /Wonderla Chennai/,
  },
  {
    name: 'Kochi',
    path: '/kochi',
    title: /Wonderla Kochi/,
  },
  {
    name: 'Bengaluru',
    path: '/bengaluru',
    title: /Wonderla Bengaluru/,
  },
  {
    name: 'Hyderabad',
    path: '/hyderabad',
    title: /Wonderla Hyderabad/,
  },
  {
    name: 'Bhubaneswar',
    path: '/bhubaneswar',
    title: /Wonderla Bhubaneswar/,
  },
];

const primaryNavigation = [
  '/offers',
  '/rides',
  '/restaurants',
  '/events',
  '/park-booking',
];

test('homepage links to every Wonderla park destination', async ({ page }) => {
  await gotoWonderla(page);

  for (const park of parks) {
    await expect(page.locator(`a[href$="${park.path}"]`).first()).toHaveAttribute(
      'href',
      new RegExp(`${park.path}$`),
    );
  }
});

test('homepage exposes primary navigation links', async ({ page }) => {
  await gotoWonderla(page);

  for (const path of primaryNavigation) {
    await expect(page.locator(`a[href$="${path}"]`).first()).toHaveAttribute(
      'href',
      new RegExp(`${path}$`),
    );
  }
});

for (const park of parks) {
  test(`${park.name} park page loads from navigation URL`, async ({ page }) => {
    await gotoWonderla(page, park.path);

    await expect(page).toHaveURL(new RegExp(`${park.path}$`));
    await expect(page).toHaveTitle(park.title);
    await expect(page.locator('body')).toContainText(park.name);
    await expect(
      page.getByRole('link', { name: /book tickets/i }).first(),
    ).toHaveAttribute('href', /\/park-booking/);
  });
}

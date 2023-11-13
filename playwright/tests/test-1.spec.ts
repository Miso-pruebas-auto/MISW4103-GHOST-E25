import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:2368/ghost/');
  await page.goto('http://localhost:2368/ghost/#/signin');
  await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('jamie@example.com').press('Tab');
  await page.getByPlaceholder('•••••••••••••••').fill('AdminAndes1**');
  await page.getByRole('button', { name: 'Sign in →' }).click();
  await page.getByRole('link', { name: 'Members 2' }).click();
  await page.getByRole('link', { name: 'New member' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('test');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Please enter an email.').click();
});
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/ghost/#/dashboard');
  await page.goto('http://localhost:3001/ghost/#/signin');
  await page.getByPlaceholder('jamie@example.com').click();
  await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('•••••••••••••••').click();
  await page.getByPlaceholder('•••••••••••••••').fill('AdminAndes1**');
  await page.getByRole('button', { name: 'Sign in →' }).click();

});
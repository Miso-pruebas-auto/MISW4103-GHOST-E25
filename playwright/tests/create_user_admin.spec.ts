import { test, expect } from '@playwright/test';

test('Creación de usuario admin', async ({ page }) => {
  await page.goto('http://localhost:3001/ghost/');
  await page.goto('http://localhost:3001/ghost/#/setup');
  await page.getByPlaceholder('The Daily Awesome').click();
  await page.getByPlaceholder('The Daily Awesome').fill('grupo 25');
  await page.getByPlaceholder('The Daily Awesome').press('Tab');
  await page.getByPlaceholder('Jamie Larson').fill('andes');
  await page.getByPlaceholder('Jamie Larson').press('Tab');
  await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('jamie@example.com').press('Tab');
  await page.getByPlaceholder('At least 10 characters').fill('AdminAndes1**');
  await page.getByRole('button', { name: 'Create account & start publishing →' }).click();
  await page.getByRole('link', { name: 'Explore Ghost admin View the dashboard, click around, and explore Ghost for yourself.' }).click();
});
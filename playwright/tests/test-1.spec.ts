import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Pages' }).click();
  await page.getByRole('link', { name: 'New page' }).click();
  await page.getByPlaceholder('Page title').click();
  await page.getByPlaceholder('Page title').fill('Test');
  await page.locator('.koenig-editor__editor').click();
  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByText('Set it live now').click();
  await page.getByRole('button', { name: 'Publish', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View Page' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'Test' }).click();
  await page1.getByText('test', { exact: true }).click();
});
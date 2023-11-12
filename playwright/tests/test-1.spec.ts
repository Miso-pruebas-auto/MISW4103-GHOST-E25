import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/ghost/#/signin');
  await page.getByPlaceholder('jamie@example.com').click();
  await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('jamie@example.com').press('Tab');
  await page.getByPlaceholder('•••••••••••••••').fill('AdminAndes1**');
  await page.getByRole('button', { name: 'Sign in →' }).click();
  await page.getByRole('link', { name: 'Pages' }).click();
  await page.getByText('Title').click();
  await page.getByRole('link', { name: 'New page' }).click();
  await page.getByPlaceholder('Page title').click();
  await page.getByPlaceholder('Page title').fill('Nueva Pagina 1 Test');
  await page.locator('.koenig-editor__editor').click();
  await page.getByText('Add feature image Upload Cuerpo de pagina 1 test').click();
  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByRole('link', { name: 'Pages' }).click();

  expect(await page.title()).toBe('Pages - Test Blog');
});
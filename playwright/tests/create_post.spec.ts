import { test, expect } from '@playwright/test';

test('Creación de un post', async ({ page }) => {
  await page.goto('http://localhost:3001/ghost/#/dashboard');
  await page.goto('http://localhost:3001/ghost/#/signin');
  await page.getByPlaceholder('jamie@example.com').click();
  await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('jamie@example.com').press('Tab');
  await page.getByPlaceholder('•••••••••••••••').fill('AdminAndes1**');
  await page.getByRole('button', { name: 'Sign in →' }).click();
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  await page.locator('#ember77').click();
  await page.getByPlaceholder('Post title').click();
  await page.getByPlaceholder('Post title').press('CapsLock');
  await page.getByPlaceholder('Post title').fill('T');
  await page.getByPlaceholder('Post title').press('CapsLock');
  await page.getByPlaceholder('Post title').fill('Test tilulo 1');
  await page.getByRole('paragraph').click();
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Contenido de prueba');

  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByRole('button', { name: 'Continue, final review →' }).click();
});
import { test, expect, type Page } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { createUserAdmin } from '../utils/create_user_admin';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await loginSessionAdmin(page);
});

test('creación de pagina sin publicar', async ({ page }) => {
  await page.getByRole('link', { name: 'Pages' }).click();
  await page.getByRole('link', { name: 'New page' }).click();
  await page.getByPlaceholder('Page title').click();
  await page.getByPlaceholder('Page title').fill('Nueva Pagina Test');
  await page.locator('.koenig-editor__editor').click();
  await page.getByRole('link', { name: 'Pages' }).click();

  expect(await page.title()).toBe('Nueva Pagina Test - grupo 25');
});



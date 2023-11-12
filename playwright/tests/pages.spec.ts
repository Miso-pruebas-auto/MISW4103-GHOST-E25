import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {      
  await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
  });
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



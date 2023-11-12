import { test, expect } from '@playwright/test';
import { loginSesionAdmin } from '../utils/login_sesion_admin';

test.describe('sección páginas', () => {
  let loginUser = false;

  test.beforeEach(async ({ page }) => {
    if (!loginUser) {
      await loginSessionAdmin(page);
      loginUser = true;
      console.log("Usuario logeado con éxito " + loginUser);
    }
  });

  test('creación de pagina sin publicar', async ({ page }) => {
    await page.goto('http://localhost:3001/ghost/#/signin');
    await page.getByPlaceholder('jamie@example.com').fill('admin@admin.com');
    await page.getByPlaceholder('jamie@example.com').press('Tab');
    await page.getByPlaceholder('•••••••••••••••').fill('AdminAndes1**');
    await page.getByRole('button', { name: 'Sign in →' }).click();
    await page.getByRole('link', { name: 'Pages' }).click();
    await page.getByRole('link', { name: 'New page' }).click();
    await page.getByPlaceholder('Page title').click();
    await page.getByPlaceholder('Page title').fill('Nueva Pagina Test');
    await page.locator('.koenig-editor__editor').click();
    await page.getByRole('link', { name: 'Pages' }).click();
  
    expect(await page.title()).toBe('Nueva Pagina Test - grupo 25');
  });

});


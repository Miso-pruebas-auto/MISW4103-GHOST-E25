import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {      
  await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
  });
});

test('creación de pagina sin publicar', async ({ page }) => {
  await test.step('When: El usuario hace clic en "Pages"', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('And: El usuario hace clic en "New page"', async () => {
    await page.getByRole('link', { name: 'New page' }).click();
  });

  await test.step('And: El usuario crea el título de la nueva pagina', async () => {
    await page.getByPlaceholder('Page title').click();
    await page.getByPlaceholder('Page title').fill('Nueva Pagina Test');
  });

  await test.step('And: El usuario publica la nueva pagina', async () => {
    await page.locator('.koenig-editor__editor').click();
  });

  await test.step('And: El usuario regresa la lista de paginas creadas', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('Then: La nueva pagina se muestra en la lista de paginas creadas', async () => {
    expect(await page.title()).toBe('Nueva Pagina Test - grupo 25');
  });
});


test('creación de pagina publicada', async ({ page }) => {
  await test.step('When: El usuario hace clic en "Pages"', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('And: El usuario hace clic en "New page"', async () => {
    await page.getByRole('link', { name: 'New page' }).click();
  });

  await test.step('And: El usuario crea el título de la nueva pagina', async () => {
    await page.getByPlaceholder('Page title').click();
    await page.getByPlaceholder('Page title').fill('Nueva Pagina Test');
  });

  await test.step('And: El usuario publica la nueva pagina', async () => {
    await page.locator('.koenig-editor__editor').click();
  });

  await test.step('And: El usuario regresa la lista de paginas creadas', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('Then: La nueva pagina se muestra en la lista de paginas creadas', async () => {
    expect(await page.title()).toBe('Nueva Pagina Test - grupo 25');
  });
});

import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {      
  await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
  });
});

test('creación de pagina sin publicar', async ({ page }) => {
  const newPageTitle = `test-${faker.word.noun()}`;

  await test.step('When: El usuario hace clic en "Pages"', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('And: El usuario hace clic en "New page"', async () => {
    await page.getByRole('link', { name: 'New page' }).click();
  });

  await test.step('And: El usuario crea el título de la nueva pagina', async () => {
    await page.getByPlaceholder('Page title').click();
    await page.getByPlaceholder('Page title').fill(newPageTitle);
  });

  await test.step('And: El usuario publica la nueva pagina', async () => {
    await page.locator('.koenig-editor__editor').click();
  });

  await test.step('And: El usuario regresa la lista de paginas creadas', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('Then: La nueva pagina se muestra en la lista de paginas creadas', async () => {
    expect(await page.title()).toBe(`${newPageTitle} - grupo 25`);
  });
});

test('creación de pagina publicada', async ({ page }) => {
  const newPageTitle = `test-${faker.word.noun()}`;

  await test.step('When: El usuario hace clic en "Pages"', async () => {
    await page.getByRole('link', { name: 'Pages' }).click();
  });

  await test.step('And: El usuario hace clic en "New page"', async () => {
    await page.getByRole('link', { name: 'New page' }).click();
  });

  await test.step('And: El usuario crea el título de la nueva pagina', async () => {
    await page.getByPlaceholder('Page title').click();
    await page.getByPlaceholder('Page title').fill(newPageTitle);
    await page.locator('button').filter({ hasText: '.close-stroke_svg__a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-l' }).click();
  });

  await test.step('And: El usuario publica la nueva pagina', async () => {
    await page.getByRole('button', { name: 'Publish' }).click();
    await page.getByText('Set it live now').click();
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
  });
  
  await test.step('Then: El usuario puede abrir la nueva pagina publicada', async () => {
    await page.goto(`/${newPageTitle.toLowerCase().replace(' ', '-')}`);
    expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
  });
});

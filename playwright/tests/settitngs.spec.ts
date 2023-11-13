import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';

test.describe('settings', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });
  });

  test('cambiar el site title con otro nombre', async ({ page }) => {
    const newPageTitle = `test-${faker.word.noun()}`;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      await page.locator('#ember114').fill(newPageTitle);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(1000);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.title()).toBe(newPageTitle);
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
    });
  });

  test('cambiar el site title con un string vacio', async ({ page }) => {
    const newPageTitle = ``;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      await page.locator('#ember114').fill(newPageTitle);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(1000);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.title()).toBe(newPageTitle);
    });
  });

  test('cambiar el site description de la pagina', async ({ page }) => {
    const newPageDescription = `${faker.word.noun()}`;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      await page.locator('#ember116').fill(newPageDescription);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(1000);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
    });
    
  });

  test('cambiar el site description por un string vacío', async ({ page }) => {
    const newPageDescription = `&nbsp;`;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      await page.locator('#ember116').fill(newPageDescription);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(1000);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
    });
    
  });

});
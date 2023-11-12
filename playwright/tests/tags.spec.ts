import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe('tags', () => {

  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });

  });

  test('Creación de tag con título y color', async ({ page }) => {
    const name_tag = 'Nuevo tag test';
    const color_tag = '555555';
    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').fill(color_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: Se verifica ingresando a la URL del nuevo tag que tengo el nombre y color correctos', async () => {
      await page.goto('./ghost/#/tags/nuevo-tag-test');

      const value_name_tag = await page.getByLabel('Name').innerText();
      expect(value_name_tag).toBe(name_tag);

      const value_color_tag = await page.getByPlaceholder('15171A').innerText();
      expect(value_color_tag).toBe(name_tag);

    });
  });
});

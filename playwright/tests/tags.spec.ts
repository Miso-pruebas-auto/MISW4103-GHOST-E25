import { Page, test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { rgbToHex } from '../utils/rgb_to_hex';

test.describe('tags', () => {

  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });

  });

  test('Creación de tag con título y color', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = '555555';
    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').fill(color_tag);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });
    // await test.step('And: El usuario se dirige al tag creado', async () => {
    //   await page.goto(`/ghost/#/tags/${name_tag}/`);
    // });

    await test.step('Then: Se verifica ingresando a la URL del nuevo tag que tengo el nombre y color correctos', async () => {
      
    const url = page.url();
    expect(url.split('/tags/')[1]).toBe(name_tag);
    // Selecciona el input.
    const input = await page.locator('.color-box-container');

    // Obtiene el valor del estilo `background-color`.
    const backgroundColor = await input.evaluate((input) => {
      return window.getComputedStyle(input).getPropertyValue('background-color');
    });

    const hexColor = rgbToHex(backgroundColor);
    // Imprime el valor del estilo en la consola.
    console.log(hexColor);
    expect(hexColor).toBe(`#${color_tag}`);

    });
  });
});

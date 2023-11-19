import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { rgbToHex } from '../utils/rgb_to_hex';
import { screenshotPagePath } from '../utils/utils';

test.describe('tags', () => {

  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });
    
    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });

  });

  test('Creación de tag con título y color', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = '555555';
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').fill(color_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('Then: Se verifica el nuevo tag contenga el nombre y color correctos', async () => {
      
    const url = page.url();
    expect(url.split('/tags/')[1]).toBe(name_tag);
    // Selecciona el input.
    const input = await page.locator('.color-box-container');

    // Obtiene el valor del estilo `background-color`.
    const backgroundColor = await input.evaluate((input) => {
      return window.getComputedStyle(input).getPropertyValue('background-color');
    });

    const hexColor = rgbToHex(backgroundColor);

    console.log(hexColor);
    expect(hexColor).toBe(`#${color_tag}`);
    await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);

    });
  });

  test('Creación de tag sin color', async ({ page }) => {
    const name_tag = faker.word.noun();
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('Then: Se verifica que el nuevo tag solo tenga el nombre sin color', async () => {
  
    const url = page.url();
    expect(url.split('/tags/')[1]).toBe(name_tag);
    await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);

    });
  });

  test('Creación de tag sin titulo', async ({ page }) => {
    const name_tag = faker.word.noun();
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('Then: Se valida el mensaje de tag sin título', async () => {
    const error_title = "You must specify a name for the tag"
    const validation_title =  await page.getByText('You must specify a name for the tag.').innerHTML();

    expect(validation_title).toContain(error_title);
    await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);

    });
  });

  test('Creación de tag con título y color forzando dos veces el botón crear', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = '666666';
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').fill(color_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: hace clic dos veces rápidamente en el "Save"', async () => {
      const saveButton = await page.getByRole('button', { name: 'Save' });
      await saveButton.dblclick();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('Then: Se verifica que al dar doble clic en el botón de crear el nuevo tag contenga el nombre y color correctos', async () => {
      
    const url = page.url();
    expect(url.split('/tags/')[1]).toBe(name_tag);
    // Selecciona el input.
    const input = await page.locator('.color-box-container');

    // Obtiene el valor del estilo `background-color`.
    const backgroundColor = await input.evaluate((input) => {
      return window.getComputedStyle(input).getPropertyValue('background-color');
    });

    const hexColor = rgbToHex(backgroundColor);

    console.log(hexColor);
    expect(hexColor).toBe(`#${color_tag}`);
    await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);

    });
  });
  
});

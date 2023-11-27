import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { rgbToHex } from '../utils/rgb_to_hex';
import { screenshotPagePath } from '../utils/utils';
import { getAprioriData, cleanMockaroHex } from '../utils/getMockaroJson';

test.describe('Tags - A priori data', () => {

  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });
    
    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });

  });

  test('Creación de tag con título y color sin descripción', async ({ page }) => {
    const tagData = await getAprioriData('tags.json');
    const name_tag = tagData.name;
    const color_tag = cleanMockaroHex(tagData.color);
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').fill(color_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);
    });

    await test.step('Then: Se verifica el nuevo tag contenga el nombre y color correctos', async () => {      
      await page.waitForTimeout(1000);

      const url = page.url();
      expect(url.split('/tags/')[1]).toBe(name_tag);
      // Selecciona el input.
      const input = await page.locator('.color-box-container');

      // Obtiene el valor del estilo `background-color`.
      const backgroundColor = await input.evaluate((input) => {
        return window.getComputedStyle(input).getPropertyValue('background-color');
      });

      const hexColor = rgbToHex(backgroundColor);

      expect(hexColor).toBe(`#${color_tag}`);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color', paso++);

    });
  });

  test('Creación de tag con título, sin color y sin descripción', async ({ page }) => {
    const tagData = await getAprioriData('tags.json');

    const name_tag = tagData.name;
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);
    });

    await test.step('Then: Se verifica que el nuevo tag solo tenga el nombre sin color', async () => {      
      await page.waitForTimeout(1000);

      const url = page.url();
      expect(url.split('/tags/')[1]).toBe(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_color', paso++);

    });
  });

  test('Creación de tag con título vacío sin color y sin descripción', async ({ page }) => {
    const tagData = await getAprioriData('tags.json');

    const name_tag = '';
    const color_tag = cleanMockaroHex(tagData.color);
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_sin_titulo', paso++);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
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
    const tagData = await getAprioriData('tags.json');

    const name_tag = tagData.name;
    const color_tag = cleanMockaroHex(tagData.color);
    let paso = 1;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
        await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').fill(name_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').fill(color_tag);
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('And: hace clic dos veces rápidamente en el "Save"', async () => {
      const saveButton = await page.getByRole('button', { name: 'Save' });
      await saveButton.dblclick();
      await screenshotPagePath(page, 'tags', 'Creación_de_tag_con_título_y_color_forzando_dos_veces_el_botón_crear', paso++);
    });

    await test.step('Then: Se verifica que al dar doble clic en el botón de crear el nuevo tag contenga el nombre y color correctos', async () => {
      await page.waitForTimeout(1000);
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

  test('Creación de tag con título, color y descripción', async ({ page }) => {
    const tagData = await getAprioriData('tags.json');
    const name_tag = tagData.name;
    const color_tag = cleanMockaroHex(tagData.color);
    const description_tag = tagData.description;

    await test.step('When: El usuario hace clic en "Tags"', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en la sección tags', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
      await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').click();
      await page.getByPlaceholder('15171A').fill(color_tag);
    });
    
    await test.step('And: Hace clic en el campo de descripción y lo llena', async () => {
      await page.getByLabel('Description').click();
      await page.getByLabel('Description').fill(description_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: Se verifica el nuevo tag contenga el nombre, color y descripción correctos', async () => {
      await page.waitForTimeout(1000);
      await page.goto(`/ghost/#/tags/${name_tag}`);
      expect(page.url().split('/tags/')[1]).toBe(name_tag);
      expect(page.getByRole('link', { name: `${name_tag} ${description_tag}` })).toBeTruthy();
    });
  });
})

test.describe('Tags - Dynamic data', () => {
  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });
    
    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });
  });

  test('Falla creación de tag con título con más de 50 palabras, color y descripción', async ({ page }) => {
    const name_tag = faker.lorem.words(51);
    const color_tag = '15171A';

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

    await test.step('Then: El sistema indica que el nombre del tag es muy largo', async () => {    
      const errMsg = await page.getByText('Tag names cannot be longer than 191 characters.').innerText();
      expect(errMsg).toBe('Tag names cannot be longer than 191 characters.');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con título, color y descripción con más de 500 caracteres', async ({ page }) => {
    const name_tag = faker.lorem.words(5);
    const color_tag = '15171A';
    const description_tag = faker.lorem.words(501);

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
    
    await test.step('And: Hace clic en el campo de descripción y lo llena', async () => {
      await page.getByLabel('Description').fill(description_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El sistema indica que la descripción del tag es muy larga', async () => {    
      const errorMsg = await page.getByText('Description cannot be longer than 500 characters.').innerText();
      expect(errorMsg).toBe('Description cannot be longer than 500 characters.');
      
      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con color no hexadecimal', async ({ page }) => {
    const name_tag = faker.lorem.words(5);
    const color_tag = 'zzzzzz';

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

    await test.step('Then: El sistema indica que el color del tag no es hexadecimal', async () => {    
      const errorMsg = await page.getByText('The colour should be in valid hex format').innerText();
      expect(errorMsg).toBe('The colour should be in valid hex format');
      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con slug con mas de 191 caracteres', async ({ page }) => {
    const name_tag = faker.lorem.words(1);
    const color_tag = '15171A';
    const slug_tag = faker.lorem.words(192);

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
    
    await test.step('And: Hace clic en el campo de slug y lo llena', async () => {
      await page.getByLabel('Slug').fill(slug_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El sistema bordea el slug del tag en rojo', async () => {    
      const slugElement = await page.getByLabel('Slug');

      const borderColor = await slugElement.evaluate((input) => {
        return window.getComputedStyle(input).getPropertyValue('border-color');
      });

      const hexColor = rgbToHex(borderColor);
      expect(hexColor).toBe('#f50b23');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con Meta data con más de 70 caracteres en el meta title', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = cleanMockaroHex(faker.internet.color());
    const description_tag = faker.lorem.paragraphs(1);
    const meta_title_tag = faker.lorem.words(71);

    await test.step('When: El usuario hace clic en "Tags"', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en la sección tags', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
      await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').click();
      await page.getByPlaceholder('15171A').fill(color_tag);
    });
    
    await test.step('And: Hace clic en el campo de descripción y lo llena', async () => {
      await page.getByLabel('Description').click();
      await page.getByLabel('Description').fill(description_tag);
    });

    await test.step('And: Hace clic en el botón Expand de Meta data', async () => {
      await page.getByRole('button', { name: 'Expand' }).first().click();
    });

    await test.step('And: Hace clic en el campo de meta title y lo llena', async () => {
      await page.getByPlaceholder(name_tag).click();
      await page.getByPlaceholder(name_tag).fill(meta_title_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El Meta title indica que el campo es demasiado largo', async () => {
      const errMsg = await page.getByText('Meta Title cannot be longer than 300 characters.').innerText();
      expect(errMsg).toBe('Meta Title cannot be longer than 300 characters.');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });
})

test.describe('Tags - Random data', () => {
  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });
    
    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });
  });

  test('Falla creación de tag llenando color con valores aleatorios', async ({ page }) => {
    const name_tag = faker.lorem.words(5);
    const color_tag = faker.string.alphanumeric(faker.number.int({ min: 7, max: 100 }));

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

    await test.step('Then: El sistema indica que el color del tag no es hexadecimal', async () => {    
      const errorMsg = await page.getByText('The colour should be in valid hex format').innerText();
      expect(errorMsg).toBe('The colour should be in valid hex format');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con Meta data con más de 156 caracteres aleatorios en el meta description', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = cleanMockaroHex(faker.internet.color());
    const description_tag = faker.lorem.paragraphs(1);
    const meta_description_tag = faker.word.words(157);

    await test.step('When: El usuario hace clic en "Tags"', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en la sección tags', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
      await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').click();
      await page.getByPlaceholder('15171A').fill(color_tag);
    });
    
    await test.step('And: Hace clic en el campo de descripción y lo llena', async () => {
      await page.getByLabel('Description').click();
      await page.getByLabel('Description').fill(description_tag);
    });

    await test.step('And: Hace clic en el botón Expand de Meta data', async () => {
      await page.getByRole('button', { name: 'Expand' }).first().click();
    });

    await test.step('And: Hace clic en el campo de meta description y lo llena', async () => {
      await page.getByPlaceholder(description_tag).click();
      await page.getByPlaceholder(description_tag).fill(meta_description_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El Meta description indica que el campo es demasiado largo', async () => {
      const errMsg = await page.getByText('Meta Description cannot be longer than 500 characters.').innerText();
      expect(errMsg).toBe('Meta Description cannot be longer than 500 characters.');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Fall creación de tag con título usando 1 palabra de mas de 191 caracteres random', async ({ page }) => {
    const name_tag = faker.string.alphanumeric({ length: 192});
    const color_tag = '15171A';

    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en la sección tags', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
      await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').click();
      await page.getByPlaceholder('15171A').fill(color_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El sistema indica que el nombre del tag es muy largo', async () => {    
      const errMsg = await page.getByText('Tag names cannot be longer than 191 characters.').innerText();
      expect(errMsg).toBe('Tag names cannot be longer than 191 characters.');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con twitter title con más de 70 caracteres aleatorios', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = cleanMockaroHex(faker.internet.color());
    const description_tag = faker.lorem.paragraphs(1);
    const twitter_title_tag = faker.word.words(71);

    await test.step('When: El usuario hace clic en "Tags"', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en la sección tags', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
      await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').click();
      await page.getByPlaceholder('15171A').fill(color_tag);
    });
    
    await test.step('And: Hace clic en el campo de descripción y lo llena', async () => {
      await page.getByLabel('Description').click();
      await page.getByLabel('Description').fill(description_tag);
    });

    await test.step('And: Hace clic en el botón Expand de Twitter card', async () => {
      await page.getByRole('button', { name: 'Expand' }).nth(1).click();
    });

    await test.step('And: Hace clic en el campo de twitter title y lo llena', async () => {
      await page.getByPlaceholder(name_tag).click();
      await page.getByPlaceholder(name_tag).fill(twitter_title_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El twitter title indica que el campo es demasiado largo', async () => {
      const errMsg = await page.getByText('Validation error, cannot save tag. Validation failed for twitter_title. .close-s').innerText();
      expect(errMsg).toBe('Validation error, cannot save tag. Validation failed for twitter_title.');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });
  });

  test('Falla creación de tag con twitter description con más de 200 caracteres aleatorios', async ({ page }) => {
    const name_tag = faker.word.noun();
    const color_tag = cleanMockaroHex(faker.internet.color());
    const description_tag = faker.lorem.paragraphs(1);
    const twitter_description_tag = faker.word.words(201);

    await test.step('When: El usuario hace clic en "Tags"', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en la sección tags', async () => {
      await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
      await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de tag y lo llena', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(name_tag);
    });

    await test.step('And: Hace clic en el campo de color y lo llena', async () => {
      await page.getByPlaceholder('15171A').click();
      await page.getByPlaceholder('15171A').fill(color_tag);
    });
    
    await test.step('And: Hace clic en el campo de descripción y lo llena', async () => {
      await page.getByLabel('Description').click();
      await page.getByLabel('Description').fill(description_tag);
    });

    await test.step('And: Hace clic en el botón Expand de Twitter card', async () => {
      await page.getByRole('button', { name: 'Expand' }).nth(1).click();
    });

    await test.step('And: Hace clic en el campo de twitter description y lo llena', async () => {
      await page.getByPlaceholder(description_tag).click();
      await page.getByPlaceholder(description_tag).fill(twitter_description_tag);
    });

    await test.step('And: hace clic en "Save"', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
    });

    await test.step('Then: El twitter description indica que el campo es demasiado largo', async () => {
      const errMsg = await page.getByText('Validation error, cannot save tag. Validation failed for twitter_description').innerText();
      expect(errMsg).toBe('Validation error, cannot save tag. Validation failed for twitter_description.');

      const errBtn = await page.getByRole('button', { name: 'Retry' }).innerText();
      expect(errBtn).toBe('Retry');
    });

  });

})

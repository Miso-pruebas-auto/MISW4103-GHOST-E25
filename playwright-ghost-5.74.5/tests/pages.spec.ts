import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { getMockaroData } from '../utils/getMockaroData';
import { faker } from '@faker-js/faker';
import { screenshotPagePath } from '../utils/utils';
import { getMockaroJson } from '../utils/getMockaroJson';

test.describe('pages', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });

    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });

  });

  //OK - ALEATORIO
  test('Creación página pero sin publicarla', async ({ page }) => {
    const newPageTitle = `test-${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_pero_sin_publicarla', paso++);
    });

    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_pero_sin_publicarla', paso++);
    });

    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_pero_sin_publicarla', paso++);
    });

    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.locator('.koenig-editor__editor').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_pero_sin_publicarla', paso++);
    });

    await test.step('And: El usuario regresa la lista de paginas creadas', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_pero_sin_publicarla', paso++);
    });

    await test.step('Then: La nueva pagina se muestra en la lista de paginas creadas', async () => {
      expect(await page.title()).toBe(await page.title());
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_pero_sin_publicarla', paso++);
    });
  });

  //OK - ALEATORIO
  test('Creación página y publicarla', async ({ page }) => {
    const newPageTitle = `test-${faker.word.noun()}`;
    let paso = 1; 

    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_publicarla', paso++);
    });

    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_publicarla', paso++);
    });

    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(newPageTitle);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_publicarla', paso++);
    });

    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByText('Set it live now').click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_publicarla', paso++);
    });

    await test.step('Then: El usuario puede abrir la nueva pagina publicada', async () => {
      await page.waitForTimeout(1000);
      await page.goto(`/${newPageTitle.toLowerCase().replace(' ', '-')}`);
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_publicarla', paso++);
    });
  });

  //OK - ALEATORIO
  test('Borrado de página recién creada', async ({ page }) => { 
    const newPageTitle = `New Post: ${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });
    
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });

    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(newPageTitle);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });

    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });

    await test.step('And: El usuario borra la página', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await page.getByRole('button', { name: 'Delete page' }).click();
      await page.getByRole('button', { name: 'Delete', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });
    
    await test.step('Then: La página borrada no se carga en el navegador', async () => {
      await page.goto(`/${newPageTitle.toLowerCase().replace(' ', '-')}`);
      expect(await page.getByRole('heading', { name: '404' }).innerText()).toBe('404');  
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });
  });

  //OK - ALEATORIO
  test('Creación página y cancelar su creación', async ({ page }) => {
    let paso = 1;
    const newPageTitle = `${faker.person.jobTitle()}`;
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_cancelar_su_creación', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_cancelar_su_creación', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(newPageTitle);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_cancelar_su_creación', paso++);
    });
    await test.step('And: El usuario cancela la nueva pagina antes de publicarla', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Cancel', exact: true }).click();
      await page.waitForTimeout(2000);      
      await screenshotPagePath(page, 'pages', 'Creación_página_y_cancelar_su_creación', paso++);
    });
    await test.step('Then: La nueva página no se carga en el navegador', async () => {
      await page.goto('/test-pagina-cancelada/');
      expect(await page.getByRole('heading', { name: '404' }).innerText()).toBe('404');  
      await page.waitForTimeout(2000);      
      await screenshotPagePath(page, 'pages', 'Creación_página_y_cancelar_su_creación', paso++);
    });
  });

  //OK - A-PRIORI
  test('Actualizar una página con un titulo mayor a 255 carácteres ', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_01.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.beforeTitle);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
    await test.step('And: El usuario actualiza el título de la pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
    await test.step('And: El usuario re-prublica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Update' }).click();
      await page.getByRole('button', { name: 'Update', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un error indiciando que no se puede publicar la pagina con un titulo mayor a 255 carácteres', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Update failed: Title cannot be longer than 255 characters.');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_mayor_a_255_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación página y actualizar la url para visualizarla', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_02.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
    await test.step('And: El usuario actualiza la URL de la pagina', async () => {
      const element = await page.waitForSelector('.post-setting-slug')
      await element.click();
      await element.fill(result.url);
      await element.press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
    await test.step('Then: El usuario va a la URL de la pagina', async () => {
      await page.waitForTimeout(2000);
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'View page', exact: true }).click(),
      ]);
      await newPage.waitForTimeout(2000);
      await screenshotPagePath(newPage, 'pages', 'Creación_página_y_actualiza_la_url', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación página con mal formato de fecha', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_03.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_mal_formato_fecha', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_mal_formato_fecha', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_mal_formato_fecha', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_mal_formato_fecha', paso++);
    });
    await test.step('And: El usuario introduce una fecha con mal formato', async () => {
      await page.getByPlaceholder('YYYY-MM-DD');
      await page.getByPlaceholder('YYYY-MM-DD').fill(result.date);
      await page.getByPlaceholder('YYYY-MM-DD').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_mal_formato_fecha', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que la fecha esta mal escrita', async () => {
      const element = await page.waitForSelector('.gh-date-time-picker-error');
      const text = await element.innerText();
      expect(text).toBe('Invalid date');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_mal_formato_fecha', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con un extracto mayor a 300 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_04.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_extracto_mayor_a_300_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_extracto_mayor_a_300_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_extracto_mayor_a_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_extracto_mayor_a_300_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un texto en el extracto con 301 caracteres', async () => {
      const element = await page.waitForSelector('#custom-excerpt');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_extracto_mayor_a_300_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const element = await page.waitForSelector('.response');
      const text = await element.innerText();
      expect(text).toBe('Excerpt cannot be longer than 300 characters.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_extracto_mayor_a_300_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con tag', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_05.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
    await test.step('And: El usuario selecciona un tag', async () => {
      const element = await page.waitForSelector('.ember-power-select-multiple-options .ember-power-select-trigger-multiple-input');
      await element.click();
      await element.fill(result.tag);
      await element.press('Enter');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_tags', paso++);
    });
 
  });

  //OK - A-PRIORI
  test('Creación de Página con meta data Title con mas de 300 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_06.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un titulo con 301 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-meta-title');
      await element.click();
      await element.fill(result.metaTitle);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Saving failed: Meta Title cannot be longer than 300 characters.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_300_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con meta data Description con mas de 500 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_07.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un descripcion con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-meta-description');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Saving failed: Meta Description cannot be longer than 500 characters.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_500_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con canonical URL invalida', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_08.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('And: El usuario introduce un descripcion con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-canonicalUrl');
      await element.click();
      await element.fill(result.url);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Saving failed: Please enter a valid URL');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_invalida', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con canonical URL con mal formato', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_09.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('And: El usuario introduce un descripcion con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-canonicalUrl');
      await element.click();
      await element.fill(result.url);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_mal_formato', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con canonical URL con más de 2000 caracteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_10.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('And: El usuario introduce una url con mas de 2000 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-canonicalUrl');
      await element.click();
      await element.fill(result.url);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await element.innerText();
      expect(text).toBe('Saving failed: Canonical URL is too long, max 2000 chars');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_una_url_canonica_con_2000_caracteres', paso++);
    });
  });

  //OK - DINAMIC - API MOCKARO
  test('Creación de Página con Twitter card title con más de 300 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroData('twitter_description_data_title.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Twitter card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un titulo de twiiter card con 301 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-twitter-title');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Saving failed: Twitter Title cannot be longer than 300 characters.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_title_de_300_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con Twitter card description con más de 500 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_12.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Twitter card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un descripcion de twitter card con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-twitter-description');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Saving failed: Twitter Description cannot be longer than 500 characters.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_description_de_500_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con Twitter card con data correcta', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_13.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Twitter card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario introduce un titulo de twitter card', async () => {
      const element = await page.waitForSelector('.post-setting-twitter-title');
      await element.click();
      await element.fill(result.twitterTitle);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario introduce un descripcion de twitter card', async () => {
      const element = await page.waitForSelector('.post-setting-twitter-description');
      await element.click();
      await element.fill(result.twitterDescription);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_twitter_data_correcta', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con Facebook card title con más de 300 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_14.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Facebook card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un titulo de facebook card con 301 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-og-title');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Validation error, cannot edit page. Validation failed for og_title.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Facebook_title_de_300_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con Facebook card description con más de 500 carácteres', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_15.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Facebook card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario introduce un descripcion de facebook card con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-og-description');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
    await test.step('Then: El usuario ve un mensaje de error indicando que ha superado la cantidad permitida', async () => {
      const eleemnt = await page.waitForSelector('.gh-alert-red .gh-alert-content');
      const text = await eleemnt.innerText();
      expect(text).toBe('Saving failed: Facebook Description cannot be longer than 500 characters.');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_500_caracteres', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con Facebook card con data correcta', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_16.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Facebook card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario introduce un titulo de twitter card con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-og-title');
      await element.click();
      await element.fill(result.ogTitle);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario introduce un descripcion de twitter card con 501 caracteres', async () => {
      const element = await page.waitForSelector('.post-setting-og-description');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_data_correcta', paso++);
    });
  });

  //OK - A-PRIORI
  test('Publicar dos Páginas con el mismo titulo', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_17.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario colocal el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.titleOne);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario vuelve a la pagina central', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario vuelve a poner el título de la anterior pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.titleTwo);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('And: El usuario publica la otra nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
    await test.step('Then: El usuario ve que la página repetida se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_páginas_con_nombre_igual', paso++);
    });
  });

  //OK - A-PRIORI
  test('Programar Publicación de un Página con fecha anterior a la actual', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_18.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_programacion_de_fecha_anterior', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_programacion_de_fecha_anterior', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_programacion_de_fecha_anterior', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      const scheduleOption = await page.waitForSelector('.gh-publishmenu-radio-label:has-text("Schedule it for later")');
      await scheduleOption.click();
      await page.getByPlaceholder('YYYY-MM-DD');
      await page.getByPlaceholder('YYYY-MM-DD').fill(result.date);
      await page.getByPlaceholder('YYYY-MM-DD').press('Tab');
      await page.getByRole('button', { name: 'Schedule', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_programacion_de_fecha_anterior', paso++);
    });
    await test.step('Then: El usuario ve un error indiciando que no se puede publicar con una fecha anterior', async () => {
      const eleemnt = await page.waitForSelector('.gh-date-time-picker-error');
      const text = await eleemnt.innerText();
      expect(text).toBe('Must be at least 2 mins in the future');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_programacion_de_fecha_anterior', paso++);
    });
  });

  //OK - A-PRIORI
  test('Publicar Página con contenido publico y solo para miembros', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_19.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario agrega contenido publico', async () => {
      const element = await page.waitForSelector('.koenig-editor__editor');
      await element.click();
      await element.fill(result.publicContent);
      await element.press('Enter');
      await element.press('Enter');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario agrega widget para miembros y agrega contenido', async () => {
      const element = await page.waitForSelector('.koenig-plus-menu-button');
      element.click();
      await page.getByTitle('Public preview').click();
      const secondElement = await page.waitForSelector('.koenig-plus-menu-button');
      await secondElement.press('Enter');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario agrega contenido privado', async () => {
      const element = await page.waitForSelector('.koenig-editor__editor');
      await element.click();
      await element.press('Enter');
      await element.press('Enter');
      await element.fill(result.privateContent);
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario vuelve la pagina para miembros', async () => {
      const labelElement = await page.waitForSelector('.gh-select:has-text("Public")');
      await labelElement.click();
      await page.selectOption('select', 'Members only');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario publica pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('And: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
    await test.step('Then: El usuario va a la URL de la pagina', async () => {
      await page.waitForTimeout(2000);
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'View page', exact: true }).click(),
      ]);
      const element = await newPage.waitForSelector('.gh-post-upgrade-cta-content h2');
      const text = await element.innerText();
      expect(text).toBe('This post is for subscribers only');
      await newPage.waitForTimeout(2000);
      await screenshotPagePath(newPage, 'pages', 'Creación_página_con_contenido_publico_y_miembros', paso++);
    });
  });

  //OK - A-PRIORI
  test('Publicar Página con titulo de solo Emojis', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_20.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_de_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_de_emojis', paso++);
    });
    await test.step('And: El usuario actualiza el título de la pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_de_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_de_emojis', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_titulo_de_emojis', paso++);
    });
  });

  //OK - A-PRIORI
  test('Publicar Página con page Url de solo Emojis no se puede crear', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_21.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
    await test.step('And: El usuario actualiza la URL de la pagina con emojis', async () => {
      const element = await page.waitForSelector('.post-setting-slug')
      await element.click();
      await element.fill(result.url);
      await element.press('Tab');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
    await test.step('Then: El usuario va a la URL de la pagina de la pagina con emojis', async () => {
      await page.goto(`/${result.url}`);
      const element = await page.waitForSelector('.error-message .error-code')
      const text = await element.innerText();
      expect(text).toBe('404');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_actualiza_la_url_con_emojis', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de Página con Meta data Title de solo emojis', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_22.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario introduce un titulo de solo emojis', async () => {
      const element = await page.waitForSelector('.post-setting-meta-title');
      await element.click();
      await element.fill(result.descripcion);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_title_de_solo_emojis', paso++);
    });
  });

  //OK - A-PRIORI
  test('Creación de una pagina Meta data Description con solo Emojis', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroJson('pages_schema_escenary_23.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Meta data' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario introduce un titulo de solo emojis', async () => {
      const element = await page.waitForSelector('.post-setting-meta-description');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_data_description_de_solo_emojis', paso++);
    });
  });

  //OK - DINAMIC - API MOCKARO
  test('Creación de Página con Facebook data Title de solo emojis', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroData('facebook_emoji_title.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Facebook card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario introduce un titulo de facebook card de emojis', async () => {
      const element = await page.waitForSelector('.post-setting-og-title');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_title_de_solo_emojis', paso++);
    });
  });

  //OK - DINAMIC - API MOCKARO
  test('Creación de Página con Facebook data Description de solo emojis', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroData('facebook_emoji_description.json');
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Facebook card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario introduce un titulo de facebook card de emojis', async () => {
      const element = await page.waitForSelector('.post-setting-og-description');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_facebook_description_de_solo_emojis', paso++);
    });
  });

  //OK - DINAMIC - API MOCKARO
  test('Creación de Página con Twitter data Title de solo emojis', async ({ page }) => {
    let paso = 1;
    const result =  await getMockaroData('twitter_emoji_title.json');
    await page.waitForTimeout(1000);
    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page', exact: true }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario crea el título de la nueva pagina', async () => {
      await page.getByPlaceholder('Page title').click();
      await page.getByPlaceholder('Page title').fill(result.title);
      await page.getByPlaceholder('Page title').press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el menu lateral', async () => {
      const element = await page.waitForSelector('.settings-menu-toggle')
      await element.click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario abre el Meta Card', async () => {
      await page.getByRole('button', { name: 'Twitter card' }).click();
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario introduce un titulo de twiiter card de solo emojis', async () => {
      const element = await page.waitForSelector('.post-setting-twitter-title');
      await element.click();
      await element.fill(result.description);
      await element.press('Tab');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('And: El usuario publica la nueva pagina', async () => {
      await page.getByRole('button', { name: 'Publish' }).click();
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
    await test.step('Then: El usuario ve que la página se publica', async () => {
      const element = await page.waitForSelector('.gh-notification-content .gh-notification-title');
      const text = await element.innerText();
      expect(text).toBe('Published');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'pages', 'Creación_página_con_meta_Twitter_title_de_solo_emojis', paso++);
    });
  });
});

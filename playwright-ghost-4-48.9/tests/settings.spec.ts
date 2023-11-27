import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { screenshotPagePath } from '../utils/utils';
import { getMockaroJson } from '../utils/getMockaroJson';


test.describe('settings', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });
  });

  test('Title & description: Modificar el site title con solo números aleatorios de (12 cifras)', async ({ page }) => {
    const newPageTitle = `${faker.number.int({ min: 100000000000, max: 999999999999 })}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });
  });

  test('Title & description: No se puede modificar el site title con valores máximos (151)', async ({ page }) => {
    // const newPageTitle: string = "a".repeat(151);
    const aprioriData = await getMockaroJson('/settings/title-description-apriori.json');
    const newPageTitle = aprioriData[0].titleMax151;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_title_con_valores_máximos_(151)', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_title_con_valores_máximos_(151)', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_title_con_valores_máximos_(151)', paso++);
    });

    await test.step('Then: La pagina muestra un mensaje de Title is too long', async () => {
      expect(await page.getByText('Title is too long').innerText()).toBe('Title is too long');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_title_con_valores_máximos_(151)', paso++);
    });
  });

  test('Title & description: Modificar el site title con nombre aleatorio', async ({ page }) => {
    const newPageTitle = `test-${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_nombre_aleatorio', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_nombre_aleatorio', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_nombre_aleatorio', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_nombre_aleatorio', paso++);
    });
  });


  test('Title & description: Modificar el site title con emojis', async ({ page }) => {
    // crear una variable con emojis 
    const aprioriData = await getMockaroJson('/settings/emoji-apropri.json');
    const newPageTitle = aprioriData[0].titleEmoji;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_emojis', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_emojis', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_emojis', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      const data = await page.getByRole('heading', { name: newPageTitle }).innerText()
      expect(data).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_emojis', paso++);
    });
  });


  test('Title & description: Modificar el site title con URL', async ({ page }) => {
    // crear una variable de url aleatorias con faker
    const newPageTitle = `${faker.internet.url()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_URL', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_URL', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_URL', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_URL', paso++);
    });
  });
  
  test('Title & description: Modificar el site title con caracteres especiales', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/especial-caracters.json');
    const newPageTitle = aprioriData[0].titleEspecialCaracters;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_caracteres_especiales', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_caracteres_especiales', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_caracteres_especiales', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_caracteres_especiales', paso++);
    });
  });
  
  test('Title & description: Modificar el site title con texto de inyección sql', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/sql-inyeccion.json');
    const newPageTitle = aprioriData[0].sqlInyeccion;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_texto_de_inyección_sql', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_texto_de_inyección_sql', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();

      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();


      if (primerInput) {
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_texto_de_inyección_sql', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_texto_de_inyección_sql', paso++);
    });
  });
  
  test('Title & description: Modificar el site description de la pagina con nombre aleatorio', async ({ page }) => {
    const newPageDescription = `${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description:_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description:_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el segundo input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const secondInput = await page.locator('.gh-setting-content-extended input[type="text"]').nth(1);

      // Obtiene el segundo input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').nth(1);


      if (secondInput) {
        await secondInput.fill(newPageDescription);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageDescription);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description:_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description:_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });
    
  });
  

  test('Title & description: Modificar el site description de la pagina con emojis', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/emoji-apropri.json');
    const newPageDescription = aprioriData[0].titleEmoji;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_emojis', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_emojis', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el segundo input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const secondInput = await page.locator('.gh-setting-content-extended input[type="text"]').nth(1);

      // Obtiene el segundo input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').nth(1);


      if (secondInput) {
        await secondInput.fill(newPageDescription);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageDescription);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_emojis', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_emojis', paso++);
    });
    
  });

  test('Title & description: Modificar el site description de la pagina con URL', async ({ page }) => {
    const newPageDescription = `${faker.internet.url()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_URL', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_URL', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el segundo input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const secondInput = await page.locator('.gh-setting-content-extended input[type="text"]').nth(1);

      // Obtiene el segundo input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').nth(1);


      if (secondInput) {
        await secondInput.fill(newPageDescription);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageDescription);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_URL', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_URL', paso++);
    });
    
  });

  test('Title & description: Modificar el site description con texto de inyección sql', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/sql-inyeccion.json');
    const newPageDescription = aprioriData[0].sqlInyeccion;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_con_texto_de_inyección_sql', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_con_texto_de_inyección_sql', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el segundo input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const secondInput = await page.locator('.gh-setting-content-extended input[type="text"]').nth(1);

      // Obtiene el segundo input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').nth(1);


      if (secondInput) {
        await secondInput.fill(newPageDescription);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageDescription);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_con_texto_de_inyección_sql', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_con_texto_de_inyección_sql', paso++);
    });
    
  });

  test('Title & description: No se puede modificar el site description de la pagina con valores máximos (207)', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/title-description-apriori.json');
    const newPageDescription = aprioriData[0].descriptionMax207;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_description_de_la_pagina_con_valores_máximos_(207)', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_description_de_la_pagina_con_valores_máximos_(207)', paso++);
    });

    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().click();
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').first().press('Tab');  
      // Obtiene el segundo input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const secondInput = await page.locator('.gh-setting-content-extended input[type="text"]').nth(1);

      // Obtiene el segundo input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').nth(1);


      if (secondInput) {
        await secondInput.fill(newPageDescription);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.fill(newPageDescription);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_description_de_la_pagina_con_valores_máximos_(207)', paso++);
    });

    await test.step('Then: La pagina se muestra un mensaje de Description is too long', async () => {
      expect(await page.getByText('Description is too long').innerText()).toBe('Description is too long');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_No_se_puede_modificar_el_site_description_de_la_pagina_con_valores_máximos_(207)', paso++);
    });
    
  });

  test('Site timezone: No puede cambiar la zona horaria sin guardarla', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/time-zone.json');
    const timezone_stantdard = aprioriData[0].timezoneStantdard;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario hace clic en "Site timezone"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(1).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario cambia la zona horaria por Anchorage y cierra"', async () => {
      await page.locator('#timezone').selectOption(timezone_stantdard);
      await page.getByRole('button', { name: 'Close' }).click();
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario recarga la pagina y no se observa ningun mensaje"', async () => {
      await page.reload();
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario hace clic en "Site timezone"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(1).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });
    
    await test.step('Then: se valida que no se actualizo el campo', async () => {
      // Obtiene el valor del elemento de entrada con el selector '#timezone'
      const valorDelInput = await page.evaluate(() => {
        const select = document.getElementById('timezone') as HTMLSelectElement | null;
        return select ? select.value : null;
      });

      if (valorDelInput !== null) {
        console.log('Valor seleccionado:', valorDelInput);
      }

      expect(valorDelInput).toBe('Etc/UTC');
      // Asegúrate de que el valorDelInput no contenga la data de timezone_standard
      expect(valorDelInput).not.toContain(timezone_stantdard);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Site_timezone_No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

  });

  test('Publication Language: No debería permitir guardar un emojis como idioma', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/emoji-apropri.json');
    const lenguage = aprioriData[0].titleEmoji;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_emojis_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_emojis_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_emojis_como_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma numeros"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_emojis_como_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_emojis_como_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo numeros en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_emojis_como_idioma', paso++);
    });

  });

  test('Publication Language: No debería permitir guardar una URL como idioma', async ({ page }) => {
    const lenguage = `${faker.internet.url()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_una_URL_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_una_URL_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_una_URL_como_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma numeros"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_una_URL_como_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_una_URL_como_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo numeros en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_una_URL_como_idioma', paso++);
    });

  });

  test('Publication Language: No debería permitir guardar un numero como idioma', async ({ page }) => {
    const lenguage = `${faker.number.int({ min: 100000000000, max: 999999999999 })}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_numero_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_numero_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_numero_como_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma numeros"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_numero_como_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_numero_como_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo numeros en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_debería_permitir_guardar_un_numero_como_idioma', paso++);
    });

  });

  test('Publication Language: No debería permitir guardar caracteres extraños como idioma', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/especial-caracters.json');
    const lenguage = aprioriData[0].titleEspecialCaracters;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_caracteres_extraños_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_caracteres_extraños_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_caracteres_extraños_como_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma caracteres"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_caracteres_extraños_como_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_caracteres_extraños_como_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo caracteres en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_caracteres_extraños_como_idioma', paso++);
    });

  });

  test('Publication Language: No deberia permitir guardar más de 4 letras como idioma', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/language.json');
    const lenguage = aprioriData[0].languageCode;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_más_de_4_letras_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_más_de_4_letras_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_más_de_4_letras_como_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma caracteres"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_más_de_4_letras_como_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_más_de_4_letras_como_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo más de 4 letras en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_deberia_permitir_guardar_más_de_4_letras_como_idioma', paso++);
    });

  });
  
  test('Publication Language: No permite guardar con en el campo idioma con valores máximos (4800)', async ({ page }) => {
    // Crear una cadena con 4800 caracteres o más
    // const lenguage: string = "a".repeat(4800);
    const lenguage = `${faker.lorem.words(4800)}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_permite_guardar_con_en_el_campo_idioma_con_valores_máximos_(4800)', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_permite_guardar_con_en_el_campo_idioma_con_valores_máximos_(4800)', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_permite_guardar_con_en_el_campo_idioma_con_valores_máximos_(4800)', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma caracteres"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_permite_guardar_con_en_el_campo_idioma_con_valores_máximos_(4800)', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_permite_guardar_con_en_el_campo_idioma_con_valores_máximos_(4800)', paso++);
    });
    
    await test.step('Then: se valida que genera una excepción por el máximo de caracteres', async () => {
      
       // captura el valor del error
       const error_page = page.getByText('Internal server error, cannot edit setting. ENAMETOOLONG: name too long, open \'/');
       // se valida que contiene una parte del error_page
       expect(error_page).toContainText('Internal server error, cannot edit setting. ENAMETOOLONG: name too long, open \'/');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_permite_guardar_con_en_el_campo_idioma_con_valores_máximos_(4800)', paso++);
    });

  });
  
  test('Publication Language: protección contra inyección sql en campo idioma', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/sql-inyeccion.json');
    const lenguage = aprioriData[0].sqlInyeccion;

    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_protección_contra_inyección_sql_en_campo_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_protección_contra_inyección_sql_en_campo_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_protección_contra_inyección_sql_en_campo_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma caracteres"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_protección_contra_inyección_sql_en_campo_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_protección_contra_inyección_sql_en_campo_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo más de 4 letras en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_protección_contra_inyección_sql_en_campo_idioma', paso++);
    });

  });
  
  // Meta data
  test('Meta title: crear el title con solo números aleatorios de 50 caracteres', async ({ page }) => {
    const newPageTitle = `${faker.number.int({ min: 100000000000, max: 999999999999 })}`;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_solo_números_aleatorios_de_50_caracteres', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_solo_números_aleatorios_de_50_caracteres', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();

      if (primerInput) {
        await primerInput.clear();
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.clear();
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_solo_números_aleatorios_de_50_caracteres', paso++);
    });

    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();

      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_solo_números_aleatorios_de_50_caracteres', paso++);
    });
  });

  test('Meta title: crear el title con superando los valores recomendados (71 caracteres)', async ({ page }) => {
    // Faker que genere 71 caracteres aleatorios en string
    const aprioriData = await getMockaroJson('/settings/meta-title.json');
    const newPageTitle = aprioriData[0].shortTextTitle;

    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_superando_los_valores_recomendados_(71_caracteres)', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_superando_los_valores_recomendados_(71_caracteres)', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();

      if (primerInput) {
        // limpiar el campo
        await primerInput.clear();
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.clear();
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_superando_los_valores_recomendados_(71_caracteres)', paso++);
    });
    
    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();

      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_superando_los_valores_recomendados_(71_caracteres)', paso++);
    });
  });

  test('Meta title: crear el title con valores de inyección sql', async ({ page }) => {
    // Faker que genere 71 caracteres aleatorios en string
    const aprioriData = await getMockaroJson('/settings/sql-inyeccion.json');
    const newPageTitle = aprioriData[0].sqlInyeccion;

    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_valores_de_inyección_sql', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_valores_de_inyección_sql', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();

      if (primerInput) {
        // limpiar el campo
        await primerInput.clear();
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.clear();
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_valores_de_inyección_sql', paso++);
    });
    
    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();

      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_valores_de_inyección_sql', paso++);
    });
  });
  
  test('Meta title: crear el title con emojis', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/emoji-apropri.json');
    const newPageTitle = aprioriData[0].titleEmoji;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_emojis', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_emojis', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();

      if (primerInput) {
        // limpiar el campo
        await primerInput.clear();
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.clear();
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_emojis', paso++);
    });
    
    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_emojis', paso++);
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();

      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_emojis', paso++);
    });
  });
  
  test('Meta title: crear el title con caracteres especiales', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/especial-caracters.json');
    const newPageTitle = aprioriData[0].titleEspecialCaracters;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_caracteres_especiales', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_caracteres_especiales', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();

      if (primerInput) {
        // limpiar el campo
        await primerInput.clear();
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.clear();
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_caracteres_especiales', paso++);
    });
    
    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_caracteres_especiales', paso++);
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();

      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_crear_el_title_con_caracteres_especiales', paso++);
    });
  });
  // Meta title: no se puede crear el title con más de 301 caracteres
  
  test('Meta title: no se puede crear el title con más de 301 caracteres)', async ({ page }) => {
    // Faker que genere 301 caracteres aleatorios en string
    const newPageTitle = `${faker.lorem.words(301)}`;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_no_se_puede_crear_el_title_con_más_de_301_caracteres', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_no_se_puede_crear_el_title_con_más_de_301_caracteres', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('.gh-setting-content-extended input[type="text"]').first();
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const inputConIdEmber = await page.locator('input[id^="#ember"]').first();

      if (primerInput) {
        // limpiar el campo
        await primerInput.clear();
        await primerInput.fill(newPageTitle);
      }else if (inputConIdEmber) {       
        await inputConIdEmber.clear();
        await inputConIdEmber.fill(newPageTitle);
      }
        else {
        throw new Error('No se encontró el elemento del titulo. La prueba se detendrá.');
  
      }
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_title_no_se_puede_crear_el_title_con_más_de_301_caracteres', paso++);
    });
     
    await test.step('Then: La pagina muestra un mensaje de maximum length of 300 characters.', async () => {
      // captura el valor del error
      const error_page = page.getByText('Validation error, cannot edit setting. ValidationError: Value in [settings.meta_');
      // se valida que contiene una parte del error_page
      expect(error_page).toContainText('Validation error, cannot edit setting. ValidationError: Value in [settings.meta_');
      await screenshotPagePath(page, 'settings', 'Meta_title_no_se_puede_crear_el_title_con_más_de_301_caracteres', paso++);
    });
  });

  //*** */ Meta description: permite crear la description con caracteres especiales
  
  test('Meta description: crear el description con caracteres especiales', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/especial-caracters.json');
    const newPageTitle = aprioriData[0].titleEspecialCaracters;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_caracteres_especiales', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_caracteres_especiales', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('#metaDescription');
      await primerInput.clear();
      await primerInput.fill(newPageTitle);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_caracteres_especiales', paso++);
    });
    
    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_caracteres_especiales', paso++);
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('#metaDescription');
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();

      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_caracteres_especiales', paso++);
    });
  });
  
  test('Meta description: crear el description con emojis', async ({ page }) => {
    const aprioriData = await getMockaroJson('/settings/emoji-apropri.json');
    const newPageTitle = aprioriData[0].titleEmoji;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_emojis', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_emojis', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('#metaDescription');
      await primerInput.clear();
      await primerInput.fill(newPageTitle);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      
    });
    
    await test.step('and: recarga la pagina e ingresa a Meta data', async () => {
      //recarga la pagina
      await page.reload();
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_emojis', paso++);
    });  
          
    await test.step('Then: valida que la pagina se muestra con el nuevo titulo', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember
      const primerInput = await page.locator('#metaDescription');
      // Obtiene el valor de la variable primerInput
      const valorDelInput = await primerInput.inputValue();
      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_crear_el_description_con_emojis', paso++);
    });
  });
  
  test('Meta description: No permite guardar con en el campo descripción con valores máximos (501)', async ({ page }) => {

    const newPageTitle = `${faker.lorem.words(501)}`;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_No_permite_guardar_con_en_el_campo_descripción_con_valores_máximos_(501)', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_No_permite_guardar_con_en_el_campo_descripción_con_valores_máximos_(501)', paso++);
    });

    // paso a modificar el botón de expand
    await test.step('And: El usuario cambia el título de la pagina', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Site meta settings Meta data Extra content for search engines Expand Twitter car' }).getByRole('button').first().click();
      // Obtiene el primer input que se encuentre en la pagina que contenga la clase y sea input de tipo texto
      const primerInput = await page.locator('#metaDescription');
      await primerInput.clear();
      await primerInput.fill(newPageTitle);
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_No_permite_guardar_con_en_el_campo_descripción_con_valores_máximos_(501)', paso++);
    });
    
  
    await test.step('Then: valida que no se guarda con éxito la descripción', async () => {
      // Obtiene el primer input que se encuentre en la pagina que contenga el id que empiece con #ember

      // captura el valor del error
      const errorPage = await page.locator('text=Validation error, cannot edit setting. ValidationError: Value in [settings.meta_');
      const textoDelError = await errorPage.textContent();
      
      // Se valida que contiene una parte del error_page
      expect(textoDelError).toContain('Validation error, cannot edit setting. ValidationError: Value in [settings.meta_');
      
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Meta_description_No_permite_guardar_con_en_el_campo_descripción_con_valores_máximos_(501)', paso++);
    });
  });


});
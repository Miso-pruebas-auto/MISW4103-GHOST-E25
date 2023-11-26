import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { screenshotPagePath } from '../utils/utils';

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
      expect(await page.title()).toBe(newPageTitle);
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });
  });

  test('Title & description: No se puede modificar el site title con valores máximos (151)', async ({ page }) => {
    // Crear una cadena con 4800 caracteres o más
    const newPageTitle: string = "a".repeat(151);
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
      expect(await page.title()).toBe(newPageTitle);
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_nombre_aleatorio', paso++);
    });
  });


  test('Title & description: Modificar el site title con un string vació', async ({ page }) => {
    const newPageTitle = "";
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_un_string_vació', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_un_string_vació', paso++);
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
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_un_string_vació', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.title()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_un_string_vació', paso++);
    });
  });
  
  test('Title & description: Modificar el site description de la pagina con nombre aleatorio', async ({ page }) => {
    const newPageDescription = `${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
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
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_de_la_pagina_con_nombre_aleatorio', paso++);
    });
    
  });
  
  test('Title & description: No se puede modificar el site description de la pagina con valores máximos (207)', async ({ page }) => {
    const newPageDescription: string = "a".repeat(207);
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

  test('Title & description: Modificar el site description por un string vacío', async ({ page }) => {
    const newPageDescription = `&nbsp;`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000); 
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_por_un_string_vacío', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000); 
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_por_un_string_vacío', paso++);
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
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_por_un_string_vacío', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000); 
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_description_por_un_string_vacío', paso++);
    });
    
  });

  test('Site timezone: No puede cambiar la zona horaria sin guardarla', async ({ page }) => {
    const timezone_stantdard = 'America/Anchorage';
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
  
  test('Publication Language: No puede guardar en el idioma vació', async ({ page }) => {
    const lenguage = '';
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_puede_guardar_en_el_idioma_vació', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_puede_guardar_en_el_idioma_vació', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_puede_guardar_en_el_idioma_vació', paso++);
    });

    await test.step('And: El usuario borra y deja vacio el Publication Language y lo cierra"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Limpiar el campo (dejarlo vacío)
      await inputLocator.clear();
      // llena el campo
      await inputLocator.fill(lenguage);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_puede_guardar_en_el_idioma_vació', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_puede_guardar_en_el_idioma_vació', paso++);
    });
    
    await test.step('Then: se valida que no se guarda vacios en Lenguage', async () => {
      
      // captura el valor del error
      const error_page = page.getByText('Validation error, cannot edit setting. ValidationError: Validation (isEmpty) fai')
      // se valida que contiene una parte del error_page
      expect(error_page).toContainText('Validation error, cannot edit setting. ValidationError: Validation (isEmpty) fai');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Publication_Language_No_puede_guardar_en_el_idioma_vació', paso++);
    });

  });
  
  test('Publication Language: No debería permitir guardar un numero como idioma', async ({ page }) => {
    const lenguage = '7898';
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

  test('Publication Language: No deberia permitir guardar caracteres extraños como idioma', async ({ page }) => {
    const lenguage = '*a!"*+-/()=?¿¡¿¡';
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
    const lenguage = 'engl';
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
    const lenguage: string = "a".repeat(4800);
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

  // Meta data
  test('Meta title: crear el title con solo números aleatorios de 50 caracteres', async ({ page }) => {
    const newPageTitle = `${faker.number.int({ min: 100000000000, max: 999999999999 })}`;
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
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
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
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
      console.log("valorDelInput "+ valorDelInput)
      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });
  });

  // Meta title: crear el title con superando los valores recomendados (71 caracteres)
  test('Meta title: crear el title con superando los valores recomendados (71 caracteres)', async ({ page }) => {
    // Faker que genere 71 caracteres aleatorios en string
    const newPageTitle = "a".repeat(71);
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
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
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
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
      console.log("valorDelInput "+ valorDelInput)
      await page.waitForTimeout(2000);
      expect(valorDelInput).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });
  });


  // Meta title: no se puede crear el title con más de 301 caracteres
  test('Meta title: no se puede crear el title con más de 301 caracteres)', async ({ page }) => {
    // Faker que genere 301 caracteres aleatorios en string
    const newPageTitle = "a".repeat(301);
    let paso = 1;

    // paso obligatorio
    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });

    // paso obligatorio
    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
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
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });
     
    await test.step('Then: La pagina muestra un mensaje de maximum length of 300 characters.', async () => {
      // captura el valor del error
      const error_page = page.getByText('Validation error, cannot edit setting. ValidationError: Value in [settings.meta_');
      // se valida que contiene una parte del error_page
      expect(error_page).toContainText('Validation error, cannot edit setting. ValidationError: Value in [settings.meta_');
      await screenshotPagePath(page, 'settings', 'Title_&_description_Modificar_el_site_title_con_solo_números_aleatorios_de_(12_cifras)', paso++);
    });
  });


  // Meta description: permite crear la description con caracteres especiales
  // Meta description: crear la description superando los valores recomendados (156 caracteres)
  // Meta description: no se puede crear el description con más de 501 caracteres


 // Meta data: permite modificar campos creados y dejar title y descripción vacios


  
  
});
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

  test('No puede cambiar la zona horaria sin guardarla', async ({ page }) => {
    const timezone_stantdard = 'America/Anchorage';
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario hace clic en "Site timezone"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(1).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario cambia la zona horaria por Anchorage y cierra"', async () => {
      await page.locator('#timezone').selectOption(timezone_stantdard);
      await page.getByRole('button', { name: 'Close' }).click();
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario recarga la pagina y no se observa ningun mensaje"', async () => {
      await page.reload();
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

    await test.step('And: El usuario hace clic en "Site timezone"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(1).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
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
      await screenshotPagePath(page, 'settings', 'No_puede_cambiar_la_zona_horaria_sin_guardarla', paso++);
    });

  });

  test('No puede guardar en Publication Language el idioma vació', async ({ page }) => {
    const lenguage = '';
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_guardar_en_Publication_Language_el_idioma_vació', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_guardar_en_Publication_Language_el_idioma_vació', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_guardar_en_Publication_Language_el_idioma_vació', paso++);
    });

    await test.step('And: El usuario borra y deja vacio el Publication Language y lo cierra"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Borra el contenido del input
      await inputLocator.fill(lenguage);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_guardar_en_Publication_Language_el_idioma_vació', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_guardar_en_Publication_Language_el_idioma_vació', paso++);
    });
    
    await test.step('Then: se valida que no se guarda vacios en Lenguage', async () => {
      
      // captura el valor del error
      const error_page = page.getByText('Validation error, cannot edit setting. ValidationError: Validation (isEmpty) fai')
      // se valida que contiene una parte del error_page
      expect(error_page).toContainText('Validation error, cannot edit setting. ValidationError: Validation (isEmpty) fai');
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_puede_guardar_en_Publication_Language_el_idioma_vació', paso++);
    });

  });


  test('No deberia permitir guardar en Publication Language un numero como idioma', async ({ page }) => {
    const lenguage = '7898';
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_deberia_permitir_guardar_en_Publication_Language_un_numero_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_deberia_permitir_guardar_en_Publication_Language_un_numero_como_idioma', paso++);
    });

    await test.step('And: El usuario hace clic en "Publication Language"', async () => {
      await page.getByRole('main').locator('div').filter({ hasText: 'Publication info Title & description The details used to identify your publicati' }).getByRole('button').nth(2).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_deberia_permitir_guardar_en_Publication_Language_un_numero_como_idioma', paso++);
    });

    await test.step('And: El usuario borra el campo de idioma y escribe en el campo de idioma numeros"', async () => {
        
      // Selector específico para el input
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();

      // Borra el contenido del input
      await inputLocator.fill(lenguage);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_deberia_permitir_guardar_en_Publication_Language_un_numero_como_idioma', paso++);

    });

    await test.step('And: El usuario oprime el botón guardar"', async () => {
      // hace clic en botón save
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_deberia_permitir_guardar_en_Publication_Language_un_numero_como_idioma', paso++);
    });
    
    await test.step('Then: se valida que guardo numeros en en Lenguage', async () => {
      
      // validamos que el campo de idioma al recargar si contenga numeros
      const inputLocator = await page.locator('div:nth-child(3) > .gh-expandable-content input[type="text"]').first();
      // obtenemos el valor del input
      const valorDelInput = await inputLocator.inputValue();
      
      expect(lenguage).toBe(valorDelInput);

      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'No_deberia_permitir_guardar_en_Publication_Language_un_numero_como_idioma', paso++);
    });

  });



  test('cambiar el site title con otro nombre', async ({ page }) => {
    const newPageTitle = `test-${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_otro_nombre', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_otro_nombre', paso++);
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
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_otro_nombre', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.title()).toBe(newPageTitle);
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_otro_nombre', paso++);
    });
  });

  test('cambiar el site title con un string vacio', async ({ page }) => {
    const newPageTitle = "";
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_un_string_vacio', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_un_string_vacio', paso++);
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
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_un_string_vacio', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.title()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_title_con_un_string_vacio', paso++);
    });
  });

  test('cambiar el site description de la pagina', async ({ page }) => {
    const newPageDescription = `${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_de_la_pagina', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_de_la_pagina', paso++);
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
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_de_la_pagina', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_de_la_pagina', paso++);
    });
    
  });

  test('cambiar el site description por un string vacío', async ({ page }) => {
    const newPageDescription = `&nbsp;`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "settings"', async () => {
      await page.locator('#ember34').click();
      await page.waitForTimeout(2000); 
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_por_un_string_vacío', paso++);
    });

    await test.step('And: El usuario hace clic en "Detalles Generales"', async () => {
      await page.getByRole('link', { name: 'General Basic publication details and site metadata' }).click();
      await page.waitForTimeout(2000); 
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_por_un_string_vacío', paso++);
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
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_por_un_string_vacío', paso++);
    });

    await test.step('Then: La pagina se muestra con el nuevo titulo', async () => {
      await page.goto('/');
      expect(await page.getByText(newPageDescription).innerText()).toBe(newPageDescription);
      await page.waitForTimeout(2000); 
      await screenshotPagePath(page, 'settings', 'cambiar_el_site_description_por_un_string_vacío', paso++);
    });
    
  });

});
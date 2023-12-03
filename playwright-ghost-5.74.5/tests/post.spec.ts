import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { screenshotPagePath, replaceSpaceByHyphen } from '../utils/utils';
import { getAprioriData } from '../utils/getMockaroJson';
let newPageURL = '';
test.describe('Posts - A priori data', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });

    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });

  });

  test('Crear un nuevo post con solo título y descripción', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');

    const titulo_post = postsData.title;
    const contenido = postsData.content;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(newPage, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });


    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {
      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);
      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('section').first().innerText();
      expect(title_post_create).toBe(titulo_post);
      expect(content_post_create).toMatch(contenido)
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título_y_descripción', paso++);
    });
  });

  test('Crear un nuevo post con solo título', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');
    const titulo_post = postsData.title;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(newPage, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {
      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);
      const title_post_create = await page.locator('h1').innerText();
      expect(title_post_create).toBe(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_solo_título', paso++);
    });

  });

  test('Crear un nuevo post con título y descripción y tag', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');
    const titulo_post = postsData.title;
    const contenido = postsData.content;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Selecciona el botón se configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(newPage, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con título, contenido y tag se a creado correctamente', async () => {
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('section').first().innerText();
      const tag = await page.getByRole('link', { name: 'NEWS' }).innerText();


      expect(title_post_create).toBe(titulo_post);
      expect(content_post_create).toMatch(contenido)
      expect(tag).toBe('NEWS');
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_título_y_descripción_y_tag', paso++);

    });


  });

  test('Crear un post con título con caracteres especiales', async ({ page }) => {
    const specialCharsData = await getAprioriData('special_chars.json');
    const postsData = await getAprioriData('posts.json');
    let paso = 1;
    const titulo_post = specialCharsData.special_characters;
    const contenido = postsData.content;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el título del post con caracteres especiales', async () => {
      await page.waitForTimeout(2000);
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(newPage, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {

      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').first().innerText();

      expect(title_post_create).toBe(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_título_con_caracteres_especiales', paso++);
    });
  });

  test('Crear un post con contenido con caracteres especiales', async ({ page }) => {
    const specialCharsData = await getAprioriData('special_chars.json');
    const postsData = await getAprioriData('posts.json');
    const titulo_post = postsData.title;
    const contenido = specialCharsData.special_characters;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });


    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(newPage, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {

      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('section').first().innerText();

      expect(title_post_create).toBe(titulo_post);
      expect(content_post_create).toMatch(contenido)

      await screenshotPagePath(page, 'post', 'crear_un_post_con_contenido_con_caracteres_especiales', paso++);
    });


  });

  test('Crear un post con excerpt', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');
    const titulo_post = postsData.title;
    const contenido = postsData.content;
    const excerpt = postsData.excerpt;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Llena el excerpt', async () => {
      await page.getByLabel('Excerpt').click();
      await page.getByLabel('Excerpt').fill(excerpt);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con excerpt se a creado correctamente', async () => {
      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('section').first().innerText();
      const excerpt_post_create = await page.getByText(excerpt).first().innerText();
      const tag = await page.getByRole('link', { name: 'NEWS' }).innerText();

      expect(title_post_create).toBe(titulo_post);
      expect(content_post_create).toMatch(contenido)
      expect(excerpt_post_create).toBe(excerpt);
      expect(tag).toBe('NEWS');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt', paso++);
    });

  });

  test('Crear un post con excerpt con caracteres especiales', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');
    const specialCharsData = await getAprioriData('special_chars.json');

    const titulo_post = postsData.title;
    const contenido = postsData.content;
    const excerpt = specialCharsData.special_characters;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Llena el excerpt', async () => {
      await page.getByLabel('Excerpt').click();
      await page.getByLabel('Excerpt').fill(excerpt);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(newPage, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con excerpt se a creado correctamente', async () => {
      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);
      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('section').first().innerText();
      const excerpt_post_create = await page.getByText(excerpt).first().innerText();
      const tag = await page.getByRole('link', { name: 'NEWS' }).innerText();

      expect(title_post_create).toBe(titulo_post);
      expect(content_post_create).toMatch(contenido)
      expect(excerpt_post_create).toBe(excerpt);
      expect(tag).toBe('NEWS');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_con_caracteres_especiales', paso++);
    });

  });

  test('Crear un post con hora de publicación', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');
    const titulo_post = postsData.title;
    const contenido = postsData.content;
    const hour = postsData.hour;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Define la hora de publicación', async () => {
      await page.getByRole('textbox').nth(3).fill(hour);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

    await test.step('And: Hace clic en el botón de: "publish post, righ now"', async () => {

      const container = await page.locator('text=Ready, set, publish. Share it with the world. Your post will be published on you').first();

      // Dentro de ese elemento, selecciona el primer botón
      const button = await container.locator('button').first();

      // Obtiene las coordenadas del botón o devuelve null si no es visible
      const box = await button.boundingBox();

      if (box) {
        // Mueve el mouse a las coordenadas del botón y realiza el clic
        const mouse = await page.mouse;
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await mouse.click(x, y)
      }

      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);

    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      // Haz clic en el enlace que abrirá una nueva pestaña
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'grupo 25 •andes' }).click()
      ]);

      // Espera a que la nueva página cargue completamente
      await newPage.waitForLoadState('load');

      // Toma un screenshot si es necesario
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);

      // crear una variable global para que la tome el siguiente step
      newPageURL = ''
      newPageURL = newPage.url();

      // Cierra la nueva página
      await newPage.close();
    });

    await test.step('Then: Se verifica que el Post con excerpt se a creado correctamente', async () => {
      // abre la new page
      await page.goto(newPageURL);
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').innerText();
      expect(title_post_create).toBe(titulo_post);
      expect(page.getByText(contenido)).toBeTruthy();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_hora_de_publicación', paso++);
    });

  });

  test('Botón borrar post aparece antes de crearlo', async ({ page }) => {
    const postsData = await getAprioriData('posts.json');
    const titulo_post = postsData.title;
    const contenido = postsData.content;
    const excerpt = postsData.excerpt;
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

    await test.step('And: Llena el excerpt', async () => {
      await page.getByLabel('Excerpt').click();
      await page.getByLabel('Excerpt').fill(excerpt);
    });

    await test.step('Then: Se verifica que el botón borrar post aparece antes de que sea creado correctamente', async () => {
      await page.waitForTimeout(2000);
      const btnDelete = await page.getByRole('button', { name: 'Delete post' }).innerText();
      expect(btnDelete).toBe('Delete post');
      await screenshotPagePath(page, 'post', 'botón_borrar_post_aparece_antes_de_crearlo', paso++);
    });

  });
});

test.describe('Posts - Dynamic data', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });

    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });

  });

  test('Crear un post con caracteres random en la hora de publicación, dejando la hora default', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido = faker.word.noun();
    const hour = faker.string.alphanumeric(5);
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Define la hora de publicación', async () => {
      await page.getByRole('textbox').nth(3).fill(hour);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout(4000);
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.getByRole('button', { name: 'Continue, final review →' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      // await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page.getByRole('button', { name: 'Publish post, right now' }).dispatchEvent('click');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      await page.waitForTimeout(2000);
      await page.goto(`./${replaceSpaceByHyphen(titulo_post)}/`);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

    await test.step('Then: Se verifica que el Post con excerpt se a creado correctamente', async () => {
      await page.waitForTimeout(2000);
      const title_post_create = await page.locator('h1').innerText();
      expect(title_post_create).toBe(titulo_post);
      expect(page.getByText(contenido)).toBeTruthy();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_caracteres_random_en_la_hora_de_publicación_dejando_la_hora_default', paso++);
    });

  });


  test('Crear un post post sin título', async ({ page }) => {
    const contenido = faker.word.noun();
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Continue, final review →' }).dispatchEvent('click');
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      // await page.locator('button:has-text("Publish")').click();
      await page.getByRole('button', { name: 'Publish post, right now' }).dispatchEvent('click');
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      const postURL = await page.getByLabel('Post URL').inputValue();
      await page.goto(`/${postURL}/`);
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });

    await test.step('Then: Se verifica que el Post se crea con el título untitled', async () => {
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.getByText(contenido).innerText();

      expect(title_post_create).toBe('(Untitled)');
      expect(content_post_create.split(' ')[0]).toBe(contenido.split(' ')[0]);
      await screenshotPagePath(page, 'post', 'crear_un_post_post_sin_título', paso++);
    });
  });

  test('Falla la creación de un post sin Autor', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido = faker.word.noun();
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Removemos el autor', async () => {
      await page.getByRole('button', { name: 'andes remove element' }).getByLabel('remove element').click();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

    await test.step('Then: Se verifica que el Post valide que un post sin autor no se puede crear', async () => {
      await page.waitForTimeout(2000);
      expect(page.getByText('Validation failed: At least one author is required.')).toBeTruthy();
      await screenshotPagePath(page, 'post', 'falla_la_creación_de_un_post_sin_autor', paso++);
    });

  });
});

test.describe('Posts - Random data', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });

    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });
  });

  test('Crear un nuevo post con contenido de 1 sola palabra con 5000 caracteres random', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido = faker.string.alphanumeric(5000);
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(4000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });


    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      // Selecciona el botón utilizando el atributo data-test-button
      const buttonSelector = '[data-test-button="continue"]';
      await page.waitForSelector(buttonSelector);

      // Hace clic en el botón
      await page.click(buttonSelector);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.waitForTimeout(2000);
      await page.getByRole('button', { name: 'Publish post, right now' }).dispatchEvent('click');
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      await page.waitForTimeout(4000);
      await page.goto(`./${replaceSpaceByHyphen(titulo_post)}/`);
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });

    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {
      await page.waitForTimeout(2000);

      const title_post_create = await page.locator('h1').innerText();
      expect(title_post_create).toBe(titulo_post);
      expect(page.getByText(contenido).innerText()).toBeTruthy();
      await screenshotPagePath(page, 'post', 'crear_un_nuevo_post_con_contenido_de_1_sola_palabra_con_5000_caracteres_random', paso++);
    });
  });

  test('Crear un post con excerpt de 1 sola palabra con 50.000 caracteres random', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido = faker.lorem.paragraph();
    const excerpt = faker.string.alphanumeric(5000);
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Llena el excerpt', async () => {
      await page.getByLabel('Excerpt').click();
      await page.getByLabel('Excerpt').fill(excerpt);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.locator('button:has-text("Publish")').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

    await test.step('Then: Se verifica que el Post con excerpt se a creado correctamente', async () => {
      const errorMsg = await page.getByText('Validation failed: Excerpt cannot be longer than 300 characters.').innerText();
      expect(errorMsg).toBe('Validation failed: Excerpt cannot be longer than 300 characters.');

      const excerptErrMsg = await page.getByText('Excerpt cannot be longer than 300 characters.', { exact: true }).innerText();
      expect(excerptErrMsg).toBe('Excerpt cannot be longer than 300 characters.');

      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_1_sola_palabra_con_50_000_caracteres_random', paso++);
    });

  });


 test('Crear un post con excerpt de 5000 palabras random', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido = faker.lorem.paragraph();
    const excerpt = faker.word.words(5000);
    let paso = 1;

    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.waitForTimeout(2000);

      await page.getByRole('link', { name: 'New post' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab');
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.getByRole('paragraph').click;
      await page.getByRole('paragraph').fill(contenido);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Selecciona el botón de configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Llena el excerpt', async () => {
      await page.getByLabel('Excerpt').click();
      await page.getByLabel('Excerpt').fill(excerpt);
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.waitForTimeout
      await page.getByRole('button', { name: 'Publish' }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.locator('button:has-text("Publish")').click();
      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

    await test.step('Then: Se verifica que se genera un mensaje indicando que el excerpt es demasiado largo', async () => {
      expect(page.getByText('Validation failed: Excerpt cannot be longer than 300 characters. Close')).toBeTruthy();

      const errMsg = await page.getByText('Validation failed: Excerpt cannot be longer than 300 characters. Close').innerText();
      const excerptErrMsg = await page.getByText('Excerpt cannot be longer than 300 characters.', { exact: true }).innerText();

      expect(errMsg).toBe('Validation failed: Excerpt cannot be longer than 300 characters.');
      expect(excerptErrMsg).toBe('Excerpt cannot be longer than 300 characters.');

      await screenshotPagePath(page, 'post', 'crear_un_post_con_excerpt_de_5000_palabras_random', paso++);
    });

  });

});


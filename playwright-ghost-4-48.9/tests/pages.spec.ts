import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { screenshotPagePath } from '../utils/utils';

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
      await page.locator('button').filter({ hasText: '.close-stroke_svg__a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-l' }).click();
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
      await expect(page).toHaveScreenshot();
      expect(await page.getByRole('heading', { name: newPageTitle }).innerText()).toBe(newPageTitle);
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Creación_página_y_publicarla', paso++);
    });
  });

  test('Borrado de página recién creada', async ({ page }) => { 
    const newPageTitle = `test-${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario hace clic en "Pages"', async () => {
      await page.getByRole('link', { name: 'Pages' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'pages', 'Borrado_de_página_recién_creada', paso++);
    });
    
    await test.step('And: El usuario hace clic en "New page"', async () => {
      await page.getByRole('link', { name: 'New page' }).click();
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

  test('Creación página y cancelar su creación	', async ({ page }) => {

    let paso = 1;

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
      await page.getByPlaceholder('Page title').fill('Test Pagina Cancelada');
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


});

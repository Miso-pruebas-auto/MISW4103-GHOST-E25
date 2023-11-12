import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe('sección posts', () => {

  test.beforeEach(async ({ page }) => {    
    await loginSessionAdmin(page);
    console.log("Usuario logeado con éxito ");
  });

  test('Creación de un nuevo post', async ({ page }) => {
    await page.getByRole('link', { name: 'New post' }).click();
    await page.getByPlaceholder('Post title').click();
    const titulo_post = 'Titulo de prueba';
    const contenido = 'Contenido de prueba';
    await page.getByPlaceholder('Post title').fill(titulo_post);
    await page.getByPlaceholder('Post title').press('Tab');
    await page.getByRole('textbox').nth(1).fill(contenido);
    await page.getByRole('button', { name: 'Publish' }).click();
    await page.getByRole('button', { name: 'Continue, final review →' }).click();
    await page.waitForTimeout(1000);
    const buttonSelector = `//button[contains(., 'Publish post, right now')]`;
    await page.locator(buttonSelector).click();
  
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: `${titulo_post} ${contenido} grupo 25 •andes` }).click();
    const page1 = await page1Promise;
    await page1.locator('h1').click();
    
    expect(await page1.locator('h1').innerHTML()).toBe(titulo_post);
    console.log('El titulo es igual');
    const mainElement = await page1.locator('main');
    const contenidoActual = await mainElement.innerText();
    expect(contenidoActual).toMatch(contenido);
    console.log('El contenido es igual');
  });

});


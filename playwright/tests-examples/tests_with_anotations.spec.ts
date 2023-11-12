import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe('Posts creación', () => {

    test.beforeEach(async ({ page }) => {    
      // Given: El usuario ha iniciado sesión
      test.info().annotations.push({
        type: 'Given',
        description: 'El usuario ha iniciado sesión',
      });
      await loginSessionAdmin(page);
    });
  
    test('Crear un nuevo post con solo título y descripción', async ({ page }) => {
      const titulo_post = 'Titulo de prueba';
      const contenido = 'Contenido de prueba';
      
      // When: El usuario hace clic en "New post"
      test.info().annotations.push({
        type: 'When',
        description: 'El usuario hace clic en "New post"',
      });
  
      await page.getByRole('link', { name: 'New post' }).click(); 
      
      // And: Hace clic en el campo de título del post
      test.info().annotations.push({
        type: 'And',
        description: 'Hace clic en el campo de título del post"',
      });
      await page.getByPlaceholder('Post title').click(); 
      
      // And: Llena el título del post
      test.info().annotations.push({
        type: 'And',
        description: 'Llena el título del post',
      });
      await page.getByPlaceholder('Post title').fill(titulo_post); 
      
      // And: Presiona Tab
      test.info().annotations.push({
        type: 'And',
        description: 'Presiona Tab',
      });
      await page.getByPlaceholder('Post title').press('Tab'); 
      
      // And: Llena el contenido del post
      test.info().annotations.push({
        type: 'And',
        description: 'Llena el contenido del post',
      });
      await page.getByRole('textbox').nth(1).fill(contenido); 
      
      // And: Hace clic en "Publish"
      test.info().annotations.push({
        type: 'And',
        description: 'Hace clic en "Publish"',
      });
      await page.getByRole('button', { name: 'Publish' }).click(); 
      
      // And: Hace clic en "Continue, final review →"
      test.info().annotations.push({
        type: 'And',
        description: 'Hace clic en "Continue, final review →"',
      });
      await page.getByRole('button', { name: 'Continue, final review →' }).click(); 
      
      // Espera un segundo
      test.info().annotations.push({
        type: 'And',
        description: 'Espera un segundo',
      });
      await page.waitForTimeout(1000); 
      const buttonSelector = `//button[contains(., 'Publish post, right now')]`;
      
      // And: Hace clic en el botón final de publicación
      test.info().annotations.push({
        type: 'And',
        description: 'Hace clic en el botón final de publicación',
      });
      await page.locator(buttonSelector).click(); 
      
      // And: Espera un segundo
      test.info().annotations.push({
        type: 'And',
        description: 'Espera un segundo',
      });
      await page.waitForTimeout(1000);
      const dato = `${titulo_post} ${contenido} •andes`
      
      // And: Hace clic en el enlace del post creado
      test.info().annotations.push({
        type: 'And',
        description: 'Hace clic en el enlace del post creado',
      });
      const page1Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: dato }).click();
  
      // And: Hace clic en el título del post
      test.info().annotations.push({
        type: 'And',
        description: 'Hace clic en el título del post',
      });
      const page1 = await page1Promise;
      await page1.locator('h1').click();
      await page1.locator('h1').click(); 
      
      // Then: Se verifica que el Post con título y contenido se a creado correctamente
      test.info().annotations.push({
        type: 'Then',
        description: 'Se verifica que el Post con título y contenido se a creado correctamente',
      });
  
      expect(await page1.locator('h1').innerText()).toBe(titulo_post); 
      const mainElement = await page1.locator('main');
      const contenidoActual = await mainElement.innerText();
      expect(contenidoActual).toMatch(contenido); 
    
    });
});

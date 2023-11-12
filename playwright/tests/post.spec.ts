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

  test('Crear un nuevo post con solo título', async ({ page }) => {
    // When: El usuario hace clic en "New post"
    const titulo_post = 'Titulo de prueba 2';
    
    test.info().annotations.push({
      type: 'When',
      description: 'El usuario hace clic en "New post"',
    });
    await page.getByRole('link', { name: 'New post' }).click(); 
    
    
    // And: Hace clic en el campo de título del post
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el campo de título del post',
    });
    await page.getByPlaceholder('Post title').click(); 
    
    // And: Llena el título del post
    test.info().annotations.push({
      type: 'And',
      description: 'Llena el título del post',
    });
    await page.getByPlaceholder('Post title').fill(titulo_post); 
    
    // And: Presiona Enter
    test.info().annotations.push({
      type: 'And',
      description: 'Presiona Enter',
    });
    await page.getByPlaceholder('Post title').press('Enter'); 
        
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
    
    // And: Espera un segundo
    test.info().annotations.push({
      type: 'And',
      description: 'Espera un segundo',
    });
    await page.waitForTimeout(1000); 
    
    
    // And: Hace clic en el botón final de publicación
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el botón final de publicación',
    });
    const buttonSelector = `//button[contains(., 'Publish post, right now')]`;
    await page.locator(buttonSelector).click(); 
    
    // And: Espera un segundo
    test.info().annotations.push({
      type: 'And',
      description: 'Espera un segundo',
    });
    await page.waitForTimeout(1000);
           
    // And: Hace clic en el enlace del post creado
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el enlace del post creado',
    });
    const dato = `${titulo_post} •andes`
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: dato }).click();
    const page1 = await page1Promise;
       
    // Then: Se verifica que el Post con título se a creado correctamente
    test.info().annotations.push({
      type: 'Then',
      description: 'Se verifica que el Post con título se a creado correctamente',
    });
    expect(await page1.locator('h1').innerText()).toBe(titulo_post); 
  
  });
  
  test('Crear un nuevo post con titulo y descripción y tag', async ({ page }) => {
    // When: El usuario hace clic en "New post"
    const titulo_post = 'Titulo de prueba';
    const contenido = 'Contenido de prueba';
    
    test.info().annotations.push({
      type: 'When',
      description: 'El usuario hace clic en "New post"',
    });

    await page.getByRole('link', { name: 'New post' }).click(); 
    
    // And: Hace clic en el campo de título del post
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el campo de título del post',
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

    // And: Selecciona el botón se configuración
    test.info().annotations.push({
      type: 'And',
      description: 'Selecciona el botón se configuración',
    });
    await page.getByRole('button', { name: 'Settings' }).click();

    // And: Selecciona el campo tag haciendo clic en el tag 'News'
    test.info().annotations.push({
      type: 'And',
      description: 'Selecciona el campo tag haciendo clic en el tag "News"',
    });
    await page.click('#tag-input');
    await page.getByRole('option', { name: 'News' }).click();
    await page.getByRole('button', { name: 'Settings' }).click();

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
    
    // And: Espera un segundo
    test.info().annotations.push({
      type: 'And',
      description: 'Espera un segundo',
    });
    await page.waitForTimeout(1000); 
    
    // And: Hace clic en el botón final de publicación
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el botón final de publicación',
    });
    const buttonSelector = `//button[contains(., 'Publish post, right now')]`;
    await page.locator(buttonSelector).click(); 
    
    // And: Espera un segundo
    test.info().annotations.push({
      type: 'And',
      description: 'Espera un segundo',
    });
    await page.waitForTimeout(1000);
    
    // And: Hace clic en el enlace del post creado
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el enlace del post creado',
    });
    const dato = `${titulo_post} ${contenido} •andes`
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: dato }).click();
    
    // And: Hace clic en el título del post
    test.info().annotations.push({
      type: 'And',
      description: 'Hace dos clics en el título del post',
    });
    const page1 = await page1Promise;
    await page1.locator('h1').click();
    await page1.locator('h1').click(); 
    
    // Then: Se verifica que el Post con título, contenido y tag se a creado correctamente
    test.info().annotations.push({
      type: 'Then',
      description: 'Se verifica que el Post con título, contenido y tag se a creado correctamente',
    });
    expect(await page1.locator('h1').innerText()).toBe(titulo_post); 
    const mainElement = await page1.locator('main');
    const contenidoActual = await mainElement.innerText();
    expect(contenidoActual).toMatch(contenido); 
    const value = await page1.getByRole('link', { name: 'News' }).innerText();
    expect(value).toBe('NEWS');

  });
  
  test('Validar si deja crear un post sin Autor', async ({ page }) => {
    // When: El usuario hace clic en "New post"
    const titulo_post = 'Titulo de prueba';
    const contenido = 'Contenido de prueba';
    
    test.info().annotations.push({
      type: 'When',
      description: 'El usuario hace clic en "New post"',
    });

    await page.getByRole('link', { name: 'New post' }).click(); 
    
    // And: Hace clic en el campo de título del post
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en el campo de título del post',
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

    // And: Selecciona el botón se configuración
    test.info().annotations.push({
      type: 'And',
      description: 'Selecciona el botón se configuración',
    });
    await page.getByRole('button', { name: 'Settings' }).click();

    // And: Selecciona el campo tag haciendo clic en el tag 'News'
    test.info().annotations.push({
      type: 'And',
      description: 'Selecciona el campo tag haciendo clic en el tag "News"',
    });
    await page.click('#tag-input');
    await page.getByRole('option', { name: 'News' }).click();

    // And: Removemos el autor
    test.info().annotations.push({
      type: 'And',
      description: 'Removemos el autor',
    });
    await page.getByRole('button', { name: 'andes remove element' }).getByLabel('remove element').click();
 
    // And: Hace clic en "Publish"
    test.info().annotations.push({
      type: 'And',
      description: 'Hace clic en "Publish"',
    });
    await page.getByRole('button', { name: 'Publish' }).click(); 

    // Then: Se verifica que el Post valide que un post sin autor no se puede crear
    test.info().annotations.push({
      type: 'Then',
      description: 'Se verifica que el Post valide que un post sin autor no se puede crear',
    });
    const value = await page.getByText('Validation failed: At least one author is required. Close').innerText();
    expect(value).toBe('Validation failed: At least one author is required.');

  });

});

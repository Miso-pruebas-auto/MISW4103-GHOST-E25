import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';

test.describe('Posts creación', () => {

  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
        await page.waitForTimeout(1000); 
    });

    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });
    
  });

  test('Crear un nuevo post con solo título y descripción', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido =`Contenido de ${titulo_post}`;
    
    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.getByRole('link', { name: 'New post' }).click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab'); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.locator('.koenig-editor__editor').click();
      await page.locator('.koenig-editor__editor').fill(contenido);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.getByRole('button', { name: 'Publish' }).click(); 
    }); 
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.locator('button:has-text("Publish")').click();
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      await page.goto(`./${titulo_post}/`);
    });


    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {
      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('main').innerText();
      expect(title_post_create).toBe(titulo_post); 
      expect(content_post_create).toMatch(contenido)
    });
    
  
  });

  test('Crear un nuevo post con solo título', async ({ page }) => {
    const titulo_post = faker.word.noun();
    
    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.getByRole('link', { name: 'New post' }).click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab'); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.getByRole('button', { name: 'Publish' }).click(); 
    }); 
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.locator('button:has-text("Publish")').click();
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      await page.goto(`./${titulo_post}/`);
    });


    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Then: Se verifica que el Post con título y contenido se a creado correctamente', async () => {
      const title_post_create = await page.locator('h1').innerText();
      expect(title_post_create).toBe(titulo_post); 
    });
  
  });
  
  test('Crear un nuevo post con título y descripción y tag', async ({ page }) => {

    const titulo_post = faker.word.noun();
    const contenido =`Contenido de ${titulo_post}`;
    
    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.getByRole('link', { name: 'New post' }).click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab'); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.locator('.koenig-editor__editor').click();
      await page.locator('.koenig-editor__editor').fill(contenido);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Selecciona el botón se configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'Getting Started' }).click();
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.getByRole('button', { name: 'Publish' }).click(); 
    }); 
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.locator('button:has-text("Publish")').click();
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: El usuario se dirige al post creado', async () => {
      await page.goto(`./${titulo_post}/`);
    });


    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Then: Se verifica que el Post con título, contenido y tag se a creado correctamente', async () => {
      const title_post_create = await page.locator('h1').innerText();
      const content_post_create = await page.locator('main').innerText();
      const tag_post_create = await page.getByRole('link', { name: 'Getting Started' }).innerText();

      expect(title_post_create).toBe(titulo_post); 
      expect(content_post_create).toMatch(contenido)
      expect(tag_post_create).toBe('GETTING STARTED'); // Getting Started

    });
    

  });
  
  test('Validar si deja crear un post sin Autor', async ({ page }) => {
    const titulo_post = faker.word.noun();
    const contenido =`Contenido de ${titulo_post}`;
    
    await test.step('When: El usuario hace clic en "New post', async () => {
      await page.getByRole('link', { name: 'New post' }).click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el campo de título del post', async () => {
      await page.getByPlaceholder('Post title').click(); 
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el título del post', async () => {
      await page.getByPlaceholder('Post title').fill(titulo_post); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Presiona Tab', async () => {
      await page.getByPlaceholder('Post title').press('Tab'); 
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Llena el contenido del post', async () => {
      await page.locator('.koenig-editor__editor').click();
      await page.locator('.koenig-editor__editor').fill(contenido);
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Selecciona el botón se configuración', async () => {
      await page.getByRole('button', { name: 'Settings' }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Selecciona el campo tag haciendo clic en el tag "News"', async () => {
      await page.click('#tag-input');
      await page.getByRole('option', { name: 'News' }).click();
    });
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Removemos el autor', async () => {
      await page.getByRole('button', { name: 'andes remove element' }).getByLabel('remove element').click();
    });

    await test.step('And: Hace clic en "Publish"', async () => {
      await page.getByRole('button', { name: 'Publish' }).click(); 
    }); 
    
    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: hace clic en confirmación de publicación', async () => {
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: Hace clic en el botón de publicar para confirmar', async () => {
      await page.locator('button:has-text("Publish")').click();
    });

    await test.step('And: Espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Then: Se verifica que el Post valide que un post sin autor no se puede crear', async () => {
      const value = await page.getByText('Saving failed: At least one author is required.').innerText();
      expect(value).toBe('Saving failed: At least one author is required.');  

    });
    
  });

});

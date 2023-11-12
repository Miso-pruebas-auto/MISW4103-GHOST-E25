import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe('Tags creación', () => {

  test.beforeEach(async ({ page }) => {      
    await test.step('Given: El usuario ha iniciado sesión', async () => {
        await loginSessionAdmin(page);
    });

  });

  test('Creación de tag con título y color', async ({ page }) => {
    await test.step('When: El usuario hace clic en "Tags"', async () => {
        await page.getByRole('link', { name: 'Tags' }).click();
    });

    await test.step('And: hace clic en el botón de "New tag"', async () => {
        await page.getByRole('link', { name: 'New tag', exact: true }).click();
    });

    await test.step('And: Hace clic en el campo de nombre del tag', async () => {
      // Código para llenar el título
    });

    await test.step('And: El usuario presiona Tab', async () => {
      // Código para presionar Tab
    });

    await test.step('And: El usuario llena el contenido del post', async () => {
      // Código para llenar el contenido
    });

    await test.step('And: El usuario hace clic en "Publish"', async () => {
      // Código para hacer clic en "Publish"
    });

    await test.step('And: El usuario hace clic en "Continue, final review →"', async () => {
      // Código para hacer clic en "Continue, final review →"
    });

    await test.step('And: Se espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: El usuario hace clic en el botón final de publicación', async () => {
      // Código para hacer clic en el botón final de publicación
    });

    await test.step('And: Se espera un segundo', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('And: El usuario hace clic en el enlace del post creado', async () => {
      // Código para hacer clic en el enlace del post creado
    });

    await test.step('And: El usuario hace clic en el título del post', async () => {
      // Código para hacer clic en el título del post
    });

    await test.step('Then: Se verifica que el título y contenido son correctos', async () => {
      // Código para verificar el título y el contenido
    });
  });
});

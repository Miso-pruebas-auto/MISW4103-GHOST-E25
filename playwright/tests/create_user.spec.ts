import { test, expect } from '@playwright/test';
import { createUserAdminTest } from '../utils/create_user_admin';

test('creación de usuario y autenticación', async ({ page }) => {
  // La página ya está disponible como parte del entorno de prueba de Playwright Test.

  await createUserAdminTest(page);

  // Agrega aserciones según sea necesario para verificar que la prueba sea exitosa.
  // Por ejemplo, puedes verificar si la creación de usuario fue exitosa y si la página de destino es la correcta.
  expect(await page.title()).toBe('Título Esperado'); // Reemplaza 'Título Esperado' con el título real esperado.
});

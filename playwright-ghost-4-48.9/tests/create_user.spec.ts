import { test } from '@playwright/test';
import { createUserAdmin } from '../utils/create_user_admin';

test('user', async ({ page }) => {
  // La página ya está disponible como parte del entorno de prueba de Playwright Test.
  await createUserAdmin(page);
});

import { test } from '@playwright/test';
import { loginSesionAdmin } from './1. login_sesion_admin.spec';
// import { createUserAdminTest } from './2. create_user_admin.spec';
// import { createPostTest } from './3. create_post.spec';

test.describe('create post complete', () => {
    let loggedIn = false;
  
    test.beforeEach(async ({ page }) => {
      if (!loggedIn) {
        await loginSesionAdmin(page);
        loggedIn = true;
      }
    });
  
    test('Ejecutar pruebas en orden y validar el registro', async ({ page }) => {
      // Ejecuta las pruebas en el orden deseado
      console.log("test")
  
    });
  });
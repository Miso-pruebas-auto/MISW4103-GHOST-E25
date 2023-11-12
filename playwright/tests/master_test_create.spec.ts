import { test } from '@playwright/test';
import { createUserAdminTest } from './create_user_admin.spec.js';
// import { loginSesionAdmin } from './login_sesion_admin.spec.js';
import { createPostTest } from './create_post.spec.js';

test.describe('creación de usuario y autenticación', () => {
  let createUser = false;
  let createPost= false;

  test.beforeEach(async ({ page }) => {
    if (!createUser) {
      await createUserAdminTest(page);
      createUser = true;
      console.log("Usuario creado con éxito "+ createUser);
    }
  });

  test('Ejecutar la creación del Post', async ({ page }) => {
    // Ejecuta las pruebas en el orden deseado
    console.log("test")
    await createPostTest(page);
    createPost = true;
    console.log("Post creado con éxito "+ createPost);

  });
});
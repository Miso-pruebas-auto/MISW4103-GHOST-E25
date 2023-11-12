import { test } from '@playwright/test';
import { loginSesionAdmin } from '../utils/login_sesion_admin';
import { createPostTest } from '../utils/create_post';

test.describe('creación de usuario y autenticación', () => {
  let loginUser = false;
  let createPost = false;

  test.beforeEach(async ({ page }) => {
    if (!loginUser) {
      await loginSesionAdmin(page);
      loginUser = true;
      console.log("Usuario logeado con éxito " + loginUser);
    }
  });

  test('creación de un nuevo post', async ({ page }) => {
    if (!createPost) {
      await createPostTest(page);
      createPost = true;
      console.log("Post creado con éxito " + createPost);
    }

    // Agrega aserciones según sea necesario para verificar que la creación del post sea exitosa.
  });

});

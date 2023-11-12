import { test } from '@playwright/test';

test.describe('create post complete', () => {
    let loggedIn = false;
  
    test.beforeEach(async ({ page }) => {
      if (!loggedIn) {
        console.log();
      }
    });
  
    test('Ejecutar pruebas en orden y validar el registro', async ({ page }) => {
      // Ejecuta las pruebas en el orden deseado
      console.log("test")
  
    });
  });
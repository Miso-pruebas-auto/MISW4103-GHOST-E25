import { test } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';

test.describe('sección posts', () => {

  test.beforeEach(async ({ page }) => {    
    await loginSessionAdmin(page);
  });

  test('creación de un nuevo post', async ({ page }) => {
    await page.getByRole('link', { name: 'New post' }).click();
    await page.getByPlaceholder('Post title').click();
    await page.getByPlaceholder('Post title').fill('test 1');
    await page.getByPlaceholder('Post title').press('Tab');
    await page.getByRole('textbox').nth(1).fill('contenido');
    await page.getByRole('button', { name: 'Publish' }).click();
    await page.getByRole('button', { name: 'Continue, final review →' }).click();
    await page.waitForTimeout(3000);
    const buttonSelector = `//button[contains(., 'Publish post, right now')]`;
    await page.locator(buttonSelector).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'test 1 contenido grupo 25 •andes' }).click();
    const page1 = await page1Promise;
    await page1.locator('h1').click();
    await page1.getByRole('main').getByText('contenido').click();
  });

});

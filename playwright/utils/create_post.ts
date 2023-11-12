// import { Page } from 'playwright';
import { Page, expect } from '@playwright/test';
export async function createPostTest(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'New post' }).click();
  await page.getByPlaceholder('Post title').click();
  await page.getByPlaceholder('Post title').fill('test 1');
  await page.getByPlaceholder('Post title').press('Tab');
  await page.getByRole('textbox').nth(1).fill('contenido');
  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByRole('button', { name: 'Continue, final review →' }).click();
  // await page.waitForTimeout(3000);
  await page.locator('button:has-text("Publish post, right now")').click();


  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'test 1 contenido grupo 25 •andes' }).click();
  const page1 = await page1Promise;
  await page1.locator('h1').click();
  await page1.getByRole('main').getByText('contenido').click();


  // await page.getByRole('button', { name: 'Publish post, right now' }).click();
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'test 1 contenido grupo 25 •andes' }).click();
  // const page1 = await page1Promise;
  // await page1.getByRole('heading', { name: 'test 1' }).click();
  // await page1.getByText('contenido').click();
  
  // expect(await page.title()).toBe('Título Esperado'); // Reemplaza 'Título Esperado' con el título real esperado.
};

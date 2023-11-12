import { Page } from 'playwright';

export async function createPostTest(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Posts', exact: true }).click();
  await page.getByRole('link', { name: 'New post' }).click();
  await page.getByPlaceholder('Post title').click();
  await page.getByPlaceholder('Post title').fill('Test tilulo 1');
  await page.getByRole('paragraph').click();
  await page.getByRole('textbox').nth(1).fill('Contenido de prueba');
  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByRole('button', { name: 'Continue, final review →' }).click();
};

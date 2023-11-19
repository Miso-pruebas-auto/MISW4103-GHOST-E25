import { Page } from 'playwright';

export async function createUserAdmin(page: Page): Promise<void> {
  await page.goto('/ghost/');
  await page.goto('/ghost/#/setup');
  await page.getByRole('link', { name: '2' }).click();
  await page.getByPlaceholder('The Daily Awesome').click();
  await page.getByPlaceholder('The Daily Awesome').fill('grupo 25');
  await page.getByPlaceholder('The Daily Awesome').press('Tab');
  await page.getByPlaceholder('Eg. John H. Watson').fill('andes');
  await page.getByPlaceholder('Eg. John H. Watson').press('Tab');
  await page.getByPlaceholder('Eg. john@example.com').fill('admin@admin.com');
  await page.getByPlaceholder('Eg. john@example.com').press('Tab');
  await page.getByPlaceholder('At least 10 characters').fill('AdminAndes1**');
  // await page.getByRole('button', { name: 'Create account & start publishing →' }).click();
 
  await page.getByRole('button', { name: 'Last step: Invite staff users →' }).click();
  await page.waitForTimeout(3000);
  await page.goto('/ghost/');
};

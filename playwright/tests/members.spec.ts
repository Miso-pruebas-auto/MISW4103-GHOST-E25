import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';

test.describe('members', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });
  });

  test('creación de miembro', async ({ page }) => {
    const newMemberName = `test-${faker.word.noun()}`;
    const newMemberEmail = `test-${faker.internet.email()}`;
    const newMemberNote = `test-${faker.lorem.sentence()}`;
    
    await test.step('When: El usuario se dirige a la sección members', async () => {
        await page.locator('button').filter({ hasText: '.close-stroke_svg__a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-l' }).click();
        await page.goto('/ghost/#/members');
    });

    await test.step('And: El usuario hace clic en "New member"', async () => {
        await page.getByRole('link', { name: 'New member' }).click();
    });

    await test.step('And: El usuario crea el nuevo miembro', async () => {
        await page.getByLabel('Name').dblclick();
        await page.getByLabel('Name').fill(newMemberName);
  
        await page.getByLabel('Email').dblclick();
        await page.getByLabel('Email').fill(newMemberEmail);

        await page.getByLabel('Note (not visible to member)').dblclick();
        await page.getByLabel('Note (not visible to member)').fill(newMemberNote);
    });
    
    await test.step('And: El usuario guarda el nuevo miembro', async () => {
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForTimeout(2000);
    });

    await test.step('Then: El nuevo miembro se muestra en la lista de miembros creados', async () => {
        await page.goto('/ghost/#/members');
        await page.waitForTimeout(1000);
        await page.getByRole('link', { name: `${newMemberName} ${newMemberEmail}` }).click();
        
        expect(await page.getByRole('heading', { name: newMemberName, exact: true }).innerText()).toBe(newMemberName);
        expect(await page.getByRole('link', { name: newMemberEmail }).innerText()).toBe(newMemberEmail);    
    });

  });

});
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

    test.step('When: El usuario se dirige a la sección members', async () => {
        await page.getByRole('link', { name: 'Members 0' }).click();
        // await page.goto('/ghost/#/members')
    });
    
    test.step('And: El usuario hace clic en "New member"', async () => {
        await page.getByRole('link', { name: 'New member' }).click();
    });

    test.step('And: El usuario crea el nombre del nuevo miembro', async () => {
        await page.getByLabel('Name').click();
        await page.getByLabel('Name').fill(newMemberName);
    });

    test.step('And: El usuario crea el correo del nuevo miembro', async () => {
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill(newMemberEmail);
    });
    
    test.step('And: El usuario crea la nota del nuevo miembro', async () => {
        await page.getByLabel('Note (not visible to member)').click();
        await page.getByLabel('Note (not visible to member)').fill(newMemberNote);
    });
    
    test.step('And: El usuario guarda el nuevo miembro', async () => {
        await page.getByRole('button', { name: 'Save' }).click();
    });

    test.step('Then: El nuevo miembro se muestra en la lista de miembros creados', async () => {
        await page.goto('/ghost/#/members')
        await page.getByRole('link', { name: `${newMemberName} ${newMemberEmail}` }).click();
        
        expect(await page.getByRole('heading', { name: newMemberName, exact: true }).innerText()).toBe(newMemberName);
        expect(await page.getByRole('link', { name: newMemberEmail }).innerText()).toBe(newMemberEmail);    
    });
  });

});
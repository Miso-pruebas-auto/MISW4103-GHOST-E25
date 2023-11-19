import { test, expect } from '@playwright/test';
import { loginSessionAdmin } from '../utils/login_sesion_admin';
import { faker } from '@faker-js/faker';
import { screenshotPagePath } from '../utils/utils';

test.describe('members', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Given: El usuario ha iniciado sesión', async () => {
      await loginSessionAdmin(page);
    });

    test.info().annotations.push({
      type: 'Given',
      description: 'El usuario ha iniciado sesión',
    });
    
  });

  test('creación de miembro', async ({ page }) => {
    const newMemberName = `test-${faker.word.noun()}`;
    const newMemberEmail = `test-${faker.internet.email()}`;
    const newMemberNote = `test-${faker.lorem.sentence()}`;
    let paso = 1;

    await test.step('When: El usuario se dirige a la sección members', async () => {
      await page.goto('/ghost/#/members');
      await screenshotPagePath(page, 'members', 'creación_de_miembro', paso++);
    });

    await test.step('And: El usuario hace clic en "New member"', async () => {
      await page.getByRole('link', { name: 'New member' }).click();
      await screenshotPagePath(page, 'members', 'creación_de_miembro', paso++);
    });

    await test.step('And: El usuario crea el nuevo miembro', async () => {
      await page.getByLabel('Name').dblclick();
      await page.getByLabel('Name').fill(newMemberName);

      await page.getByLabel('Email').dblclick();
      await page.getByLabel('Email').fill(newMemberEmail);

      await page.getByLabel('Note (not visible to member)').dblclick();
      await page.getByLabel('Note (not visible to member)').fill(newMemberNote);
      await screenshotPagePath(page, 'members', 'creación_de_miembro', paso++);
    });

    await test.step('And: El usuario guarda el nuevo miembro', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'members', 'creación_de_miembro', paso++);
    });

    await test.step('Then: El nuevo miembro se muestra en la lista de miembros creados', async () => {
      await page.goto('/ghost/#/members');
      await page.waitForTimeout(1000);
      await page.getByRole('link', { name: `${newMemberName} ${newMemberEmail}` }).click();

      expect(await page.getByRole('heading', { name: newMemberName, exact: true }).innerText()).toBe(newMemberName);
      expect(await page.getByRole('link', { name: newMemberEmail }).innerText()).toBe(newMemberEmail);
      await screenshotPagePath(page, 'members', 'creación_de_miembro', paso++);
    });

  });

  test('creación de miembro sin correo', async ({ page }) => {
    const newMemberName = `test-${faker.word.noun()}`;
    let paso = 1;

    await test.step('When: El usuario se dirige a la sección members', async () => {
      await page.goto('/ghost/#/members');
      await screenshotPagePath(page, 'members', 'creación_de_miembro_sin_correo', paso++);
    });

    await test.step('And: El usuario hace clic en "New member"', async () => {
      await page.getByRole('link', { name: 'New member' }).click();
      await screenshotPagePath(page, 'members', 'creación_de_miembro_sin_correo', paso++);
    });

    await test.step('And: El usuario crea el nuevo miembro sin correo', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(newMemberName);
      await screenshotPagePath(page, 'members', 'creación_de_miembro_sin_correo', paso++);
    });
    
    await test.step('And: El usuario guarda el nuevo miembro', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'members', 'creación_de_miembro_sin_correo', paso++);
    });

    await test.step('Then: El nuevo miembro se muestra en la lista de miembros creados', async () => {
      expect(await page.getByText('Please enter an email.').innerText()).toBe('Please enter an email.');
      await screenshotPagePath(page, 'members', 'creación_de_miembro_sin_correo', paso++);
    });
  });

  test('creación de miembro con correo inválido', async ({ page }) => {
    const newMemberName = `test-${faker.word.noun()}`;
    const newMemberEmail = `correoinvalido`;
    let paso = 1;

    await test.step('When: El usuario se dirige a la sección members', async () => {
      await page.goto('/ghost/#/members');
      await screenshotPagePath(page, 'members', 'creación_de_miembro_con_correo_inválid', paso++);
    });

    await test.step('And: El usuario hace clic en "New member"', async () => {
      await page.getByRole('link', { name: 'New member' }).click();
      await screenshotPagePath(page, 'members', 'creación_de_miembro_con_correo_inválid', paso++);
    });

    await test.step('And: El usuario crea el nuevo miembro sin correo', async () => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Name').fill(newMemberName);

      await page.getByLabel('Email').dblclick();
      await page.getByLabel('Email').fill(newMemberEmail);
      await screenshotPagePath(page, 'members', 'creación_de_miembro_con_correo_inválid', paso++);
    });
    
    await test.step('And: El usuario guarda el nuevo miembro', async () => {
      await page.getByRole('button', { name: 'Save' }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, 'members', 'creación_de_miembro_con_correo_inválid', paso++);
    });

    await test.step('Then: El nuevo miembro se muestra en la lista de miembros creados', async () => {
      expect(await page.getByText('Invalid Email.').innerText()).toBe('Invalid Email.');
      await screenshotPagePath(page, 'members', 'creación_de_miembro_con_correo_inválid', paso++);
    });
  });

  test('cancelar creación de miembro', async ({ page }) => {
    const newMemberName = `test-${faker.word.noun()}`;
    const newMemberEmail = `test-${faker.internet.email()}`;
    const newMemberNote = `test-${faker.lorem.sentence()}`;
    let paso = 1; 

    await test.step('When: El usuario se dirige a la sección members', async () => {
      await page.goto('/ghost/#/members');
      await screenshotPagePath(page, 'members', 'cancelar_creación_de_miembro', paso++);
    });

    await test.step('And: El usuario hace clic en "New member"', async () => {
      await page.getByRole('link', { name: 'New member' }).click();
      await screenshotPagePath(page, 'members', 'cancelar_creación_de_miembro', paso++);
    });

    await test.step('And: El usuario llena el formulario de nuevo miembro', async () => {
      await page.getByLabel('Name').dblclick();
      await page.getByLabel('Name').fill(newMemberName);

      await page.getByLabel('Email').dblclick();
      await page.getByLabel('Email').fill(newMemberEmail);

      await page.getByLabel('Note (not visible to member)').dblclick();
      await page.getByLabel('Note (not visible to member)').fill(newMemberNote);
      await screenshotPagePath(page, 'members', 'cancelar_creación_de_miembro', paso++);
    });

    await test.step('And: El usuario llena el formulario de nuevo miembro', async () => {
      await page.goto('/ghost/#/members');
      await page.waitForTimeout(1000);
      await screenshotPagePath(page, 'members', 'cancelar_creación_de_miembro', paso++);
    });

    await test.step('Then: El usuario no continua creando el miembro', async () => {
      expect(await page.getByRole('button', { name: 'Leave' }).innerText()).toBe('Leave');
      expect(await page.getByRole('heading', { name: 'Are you sure you want to leave this page?' }).innerText()).toBe('Are you sure you want to leave this page?'); 
      await screenshotPagePath(page, 'members', 'cancelar_creación_de_miembro', paso++);
    });

  });

});
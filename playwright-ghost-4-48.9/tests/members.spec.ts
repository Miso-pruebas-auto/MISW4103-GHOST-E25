import { expect, test } from "@playwright/test";
import { loginSessionAdmin } from "../utils/login_sesion_admin";
import { faker } from "@faker-js/faker";
import { screenshotPagePath } from "../utils/utils";
import data from "../utils/data/members.json";

import no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres
  from "../utils/data/members/no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres.json";

import se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes
  from "../utils/data/members/se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes.json";

import no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres
  from "../utils/data/members/no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres.json";

import no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres
  from "../utils/data/members/no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres.json";

import no_se_puede_crear_el_miembro_si_el_campo_label_excede_500_caracteres
  from "../utils/data/members/no_se_puede_crear_el_miembro_si_el_campo_label_excede_500_caracteres.json";

type DataType = {
  id: number;
  name: string;
  email: string;
  note: string;
  labels: string;
}

function getRandomDataValue(): DataType {
  return data[Math.floor(Math.random() * data.length)];
}

function generateRandomFakerData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const email = faker.internet.email({ firstName, lastName });
  const note = `${fullName} ${faker.lorem.sentence()}`;

  return {
    fullName,
    firstName,
    lastName,
    email,
    note
  };
}

function generarDatosAleatorios() {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  const longitud = 10;
  for (let i = 0; i < longitud; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}


test.describe("members", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("Given: El usuario ha iniciado sesión", async () => {
      await loginSessionAdmin(page);
    });

    test.info().annotations.push({
      type: "Given",
      description: "El usuario ha iniciado sesión"
    });

  });

  test("creación de miembro", async ({ page }) => {
    const { email, fullName, note } = generateRandomFakerData();
    const newMemberName = fullName;
    const newMemberEmail = email;
    const newMemberNote = note;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "creación_de_miembro", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "creación_de_miembro", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);
      await screenshotPagePath(page, "members", "creación_de_miembro", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "creación_de_miembro", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await page.getByRole("link", { name: `${newMemberName} ${newMemberEmail}` }).click();

      expect(await page.getByRole("heading", { name: newMemberName, exact: true }).innerText()).toBe(newMemberName);
      expect(await page.getByRole("link", { name: newMemberEmail }).innerText()).toBe(newMemberEmail);
      await screenshotPagePath(page, "members", "creación_de_miembro", paso++);
    });

  });

  test("creación de miembro sin correo", async ({ page }) => {
    const { fullName, note } = generateRandomFakerData();
    const newMemberName = fullName;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "creación_de_miembro_sin_correo", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "creación_de_miembro_sin_correo", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro sin correo", async () => {
      await page.getByLabel("Name").click();
      await page.getByLabel("Name").fill(newMemberName);
      await screenshotPagePath(page, "members", "creación_de_miembro_sin_correo", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "creación_de_miembro_sin_correo", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Please enter an email.").innerText()).toBe("Please enter an email.");
      await screenshotPagePath(page, "members", "creación_de_miembro_sin_correo", paso++);
    });
  });

  test("creación de miembro con correo inválido", async ({ page }) => {
    const { fullName, email } = generateRandomFakerData();
    const newMemberName = `test-${fullName}`;
    const newMemberEmail = email.replace("@", "");
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "creación_de_miembro_con_correo_inválid", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "creación_de_miembro_con_correo_inválid", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro sin correo", async () => {
      await page.getByLabel("Name").click();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);
      await screenshotPagePath(page, "members", "creación_de_miembro_con_correo_inválid", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "creación_de_miembro_con_correo_inválid", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Invalid Email.").innerText()).toBe("Invalid Email.");
      await screenshotPagePath(page, "members", "creación_de_miembro_con_correo_inválid", paso++);
    });
  });

  test("cancelar creación de miembro", async ({ page }) => {
    const { email, fullName, note } = generateRandomFakerData();
    const newMemberName = fullName;
    const newMemberEmail = email;
    const newMemberNote = note;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "cancelar_creación_de_miembro", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "cancelar_creación_de_miembro", paso++);
    });

    await test.step("And: El usuario llena el formulario de nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);
      await screenshotPagePath(page, "members", "cancelar_creación_de_miembro", paso++);
    });

    await test.step("And: El usuario llena el formulario de nuevo miembro", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "cancelar_creación_de_miembro", paso++);
    });

    await test.step("Then: El usuario no continua creando el miembro", async () => {
      expect(await page.getByRole("button", { name: "Leave" }).innerText()).toBe("Leave");
      expect(await page.getByRole("heading", { name: "Are you sure you want to leave this page?" }).innerText()).toBe("Are you sure you want to leave this page?");
      await screenshotPagePath(page, "members", "cancelar_creación_de_miembro", paso++);
    });
  });

  test("No se puede crear miembro si campos en blanco", async ({ page }) => {
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_campos_en_blanco", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_campos_en_blanco", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_campos_en_blanco", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Please enter an email.").innerText()).toBe("Please enter an email.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_campos_en_blanco", paso++);
    });
  });

  test("No se puede crear miembro si solo se llena el campo labels", async ({ page }) => {
    const selected = getRandomDataValue();
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_solo_se_llena_el_campo_tags", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_solo_se_llena_el_campo_tags", paso++);
    });

    await test.step("And: El usuario asigna un nuevo label", async () => {
      await page.locator("input[type=\"search\"]").fill(selected.labels);
      await page.keyboard.press("Enter");

      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_solo_se_llena_el_campo_tags", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_solo_se_llena_el_campo_tags", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Please enter an email.").innerText()).toBe("Please enter an email.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_solo_se_llena_el_campo_tags", paso++);
    });
  });

  test("No se puede crear miembro si solo llena el campo labels con multiples valores", async ({ page }) => {
    const labels = [];

    for (let i = 0; i < 5; i++) {
      labels.push(faker.lorem.word());
    }

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_llena_el_campo_tags_con_multiples_valores", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_llena_el_campo_tags_con_multiples_valores", paso++);
    });

    for (const label of labels) {
      await test.step("And: El usuario asigna el label: " + label, async () => {
        await page.locator("input[type=\"search\"]").fill(label);
        await page.keyboard.press("Enter");

        await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_llena_el_campo_tags_con_multiples_valores", paso++);
      });
    }


    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_llena_el_campo_tags_con_multiples_valores", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Please enter an email.").innerText()).toBe("Please enter an email.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_llena_el_campo_tags_con_multiples_valores", paso++);
    });
  });

  test("No se puede crear miembro si el campo note excede 500 caracteres", async ({ page }) => {
    const selected = no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres as DataType;
    const newMemberName = `test -${selected.name}`;
    const newMemberEmail = `test -${selected.email}`;
    const newMemberNote = selected.note;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Note is too long.").innerText()).toBe("Note is too long.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_note_excede_500_caracteres", paso++);
    });
  });

  test("No se puede crear miembro si el campo email excede 191 caracteres", async ({ page }) => {
    const { email, name } = no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres as DataType;
    const newMemberName = `test-${name}`;
    const newMemberEmail = `${email}`;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres", paso++);
    });


    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      await page.waitForTimeout(2000);
      const text = page.locator("body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.gh-cp-member-email-name > div.form-group.max-width.error.ember-view > p");
      expect(['Email cannot be longer than 191 characters.', 'Invalid Email.']).toContain(await text.innerText());
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_email_excede_191_caracteres", paso++);
    });
  });

  test("No se puede crear miembro si el campo name excede 191 caracteres.", async ({ page }) => {
    const { name, email } = no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres as DataType;
    const newMemberName = name;
    const newMemberEmail = email;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      await page.waitForTimeout(2000);
      expect(await page.getByText("Name cannot be longer than 191 characters.").innerText()).toBe("Name cannot be longer than 191 characters.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_el_campo_name_excede_191_caracteres", paso++);
    });
  });

  test("No se puede crear el miembro si el campo label excede 500 caracteres", async ({ page }) => {
    const {
      email,
      name,
      note,
      labels
    } = no_se_puede_crear_el_miembro_si_el_campo_label_excede_500_caracteres as DataType;
    const newMemberName = name;
    const newMemberEmail = email;
    const newMemberNote = note;
    const newMemberLabel = labels;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_el_miembro_si_el_campo_label_execde_500_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_el_miembro_si_el_campo_label_execde_500_caracteres", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_crear_el_miembro_si_el_campo_label_execde_500_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.getByRole("button", { name: "Save" }).click();
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_crear_el_miembro_si_el_campo_label_execde_500_caracteres", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Validation error, cannot save member. Validation failed for name.").innerText()).toBe("Validation error, cannot save member. Validation failed for name.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_el_miembro_si_el_campo_label_execde_500_caracteres", paso++);
    });
  });

  test("Creacion de usuario si desactiva subscripcion a newlestter", async ({ page }) => {
    const selected = generateRandomFakerData();
    const newMemberName = `test -${selected.fullName}`;
    const newMemberEmail = `test-${selected.email}`;
    const newMemberNote = selected.note;
    const newMemberLabel = faker.lorem.word();

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_desactiva_subscripcion_a_newlestter", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_desactiva_subscripcion_a_newlestter", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_desactiva_subscripcion_a_newlestter", paso++);
    });

    await test.step("And: El usuario desactiva la subscripcion a newlestter", async () => {
      await page.locator("label.switch > span").click();
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_desactiva_subscripcion_a_newlestter", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_desactiva_subscripcion_a_newlestter", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Members")).toBeTruthy();
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_desactiva_subscripcion_a_newlestter", paso++);
    });
  });

  test("Creacion de usuario si se presiona control + s", async ({ page }) => {
    const { email, fullName, note } = generateRandomFakerData();
    const newMemberName = `;
  test-${fullName}`;
    const newMemberEmail = email;
    const newMemberNote = note;
    const newMemberLabel = faker.lorem.word();

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "creacion_de_usuario_si_se_presiona_control_s", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_se_presiona_control_s", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_se_presiona_control_s", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.waitForTimeout(2000);
      await page.keyboard.press("Control+S");
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_se_presiona_control_s", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Members")).toBeTruthy();
      await screenshotPagePath(page, "members", "creacion_de_usuario_si_se_presiona_control_s", paso++);
    });
  });

  test("No se puede crear miembro si se usan caracteres aleatorios en todos los campos", async ({ page }) => {
    const newMemberName = `;
  test -${generarDatosAleatorios()}`;
    const newMemberEmail = `;
  test -${generarDatosAleatorios()}`;
    const newMemberNote = `;
  test -${generarDatosAleatorios()}`;
    const newMemberLabel = `${generarDatosAleatorios()}`;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Invalid Email.").innerText()).toBe("Invalid Email.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });
  });

  test("No se puede crear miembro si se usan caracteres aleatorios en el campo email", async ({ page }) => {
    const newMemberName = `;
  test -${faker.person.fullName()}`;
    const newMemberEmail = `;
  test -${generarDatosAleatorios()}`;
    const newMemberNote = `;
  test -${faker.lorem.sentence()}`;
    const newMemberLabel = `${faker.lorem.word()}`;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("And: El usuario hace clic en \"New member\"", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("link", { name: "New member" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("And: El usuario crea el nuevo miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("And: El usuario guarda el nuevo miembro", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Invalid Email.").innerText()).toBe("Invalid Email.");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });
  });

  test("No se encuentra miembro al buscar por nombre usando caracteres aleatorios", async ({ page }) => {
    const newMemberName = `;
  test -${generarDatosAleatorios()}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_encuentra_miembro_al_buscar_por_nombre_usando_caracteres_aleatorios", paso++);
    });

    await test.step("And: El usuario busca el nuevo miembro por nombre", async () => {
      await page.waitForTimeout(2000);
      await page.locator("input[type=\"text\"]").fill(newMemberName);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_encuentra_miembro_al_buscar_por_nombre_usando_caracteres_aleatorios", paso++);
    });

    await test.step("Then: Se observa mensaje sobre no se encuentran miembros con el filtro actual", async () => {
      expect(await page.getByText("No members match the current filter").innerText()).toBe("No members match the current filter");
      await screenshotPagePath(page, "members", "no_se_encuentra_miembro_al_buscar_por_nombre_usando_caracteres_aleatorios", paso++);
    });
  });

  test("Al buscar miembro por nombre usando mas de 4000 parrafos hace que la pagina no responda", async ({ page }) => {
    const newMemberName = `${faker.lorem.paragraphs(4000)}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "al_buscar_miembro_por_nombre_usando_mas_de_40_parrafos_hace_que_la_pagina_se_rompa", paso++);
    });

    await test.step("And: El usuario busca el nuevo miembro por nombre", async () => {
      await page.waitForTimeout(2000);
      await page.locator("input[type=\"text\"]").fill(newMemberName);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "al_buscar_miembro_por_nombre_usando_mas_de_40_parrafos_hace_que_la_pagina_se_rompa", paso++);
    });

    await test.step("Then: Se observa indicador de carga", async () => {
      await page.waitForTimeout(2000);
      expect(await page.isVisible(".gh-loading-spinner")).toBe(true);
      await screenshotPagePath(page, "members", "al_buscar_miembro_por_nombre_usando_mas_de_40_parrafos_hace_que_la_pagina_se_rompa", paso++);
    });
  });

  test("No se puede editar el primer miembro si se usan caracteres aleatorios en todos los campos", async ({ page }) => {
    const newMemberName = `;
  test -${generarDatosAleatorios()}`;
    const newMemberEmail = `;
  test -${generarDatosAleatorios()}`;
    const newMemberNote = `;
  test -${generarDatosAleatorios()}`;
    const newMemberLabel = `${generarDatosAleatorios()}`;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.waitForTimeout(2000);
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.getByLabel("Name").dblclick();
      await page.getByLabel("Name").fill(newMemberName);

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });

    await test.step("Then: El miembro editado se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Invalid Email.").innerText()).toBe("Invalid Email.");
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_todos_los_campos", paso++);
    });
  });

  test("No se puede editar el primer miembro si se usan caracteres aleatorios en el campo email", async ({ page }) => {
    const newMemberEmail = `;
  test -${generarDatosAleatorios()}`;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.waitForTimeout(2000);
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {

      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);

      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });

    await test.step("Then: El miembro editado se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Invalid Email.").innerText()).toBe("Invalid Email.");
      await screenshotPagePath(page, "members", "no_se_puede_editar_el_primer_miembro_si_se_usan_caracteres_aleatorios_en_el_campo_email", paso++);
    });
  });

  test("Se puede adicionar un label al primer miembro de la lista", async ({ page }) => {
    const newMemberLabel = `${faker.lorem.word()}`;

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "se_puede_adicionar_un_label_al_primer_miembro_de_la_lista", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.waitForTimeout(2000);
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "se_puede_adicionar_un_label_al_primer_miembro_de_la_lista", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "se_puede_adicionar_un_label_al_primer_miembro_de_la_lista", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "se_puede_adicionar_un_label_al_primer_miembro_de_la_lista", paso++);
    });

    await test.step("Then: El miembro editado se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Members")).toBeTruthy();
      await screenshotPagePath(page, "members", "se_puede_adicionar_un_label_al_primer_miembro_de_la_lista", paso++);
    });
  });

  test("No se puede crear miembro si existe un miembro con el mismo email", async ({ page }) => {
    const selected = generateRandomFakerData();
    const newMemberName = `test-${selected.fullName}`;
    const newMemberEmail = selected.email;
    const newMemberNote = selected.note;
    const newMemberLabel = faker.lorem.word();

    let paso = 1;

    for (let i = 0; i < 2; i++) {
      await test.step("When: El usuario se dirige a la sección members", async () => {
        await page.goto("/ghost/#/members");
        await page.waitForTimeout(2000);
        await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_existe_un_miembro_con_el_mismo_email", paso++);
      });

      await test.step("And: El usuario hace clic en \"New member\"", async () => {
        await page.getByRole("link", { name: "New member" }).click();
        await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_existe_un_miembro_con_el_mismo_email", paso++);
      });

      await test.step("And: El usuario crea el nuevo miembro", async () => {
        await page.getByLabel("Name").dblclick();
        await page.getByLabel("Name").fill(newMemberName);

        await page.getByLabel("Email").dblclick();
        await page.getByLabel("Email").fill(newMemberEmail);

        await page.getByLabel("Note (not visible to member)").dblclick();
        await page.getByLabel("Note (not visible to member)").fill(newMemberNote);

        await page.locator("input[type=\"search\"]").fill(newMemberLabel);
        await page.keyboard.press("Enter");
        await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_existe_un_miembro_con_el_mismo_email", paso++);
      });

      await test.step("And: El usuario guarda el nuevo miembro", async () => {
        await page.getByRole("button", { name: "Save" }).click();
        await page.waitForTimeout(2000);
        await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_existe_un_miembro_con_el_mismo_email", paso++);
      });
    }

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Validation error, cannot save member. Member already exists. Attempting to add member with existing email address").innerText()).toBe("Validation error, cannot save member. Member already exists. Attempting to add member with existing email address");
      await screenshotPagePath(page, "members", "no_se_puede_crear_miembro_si_existe_un_miembro_con_el_mismo_email", paso++);
    });
  });

  test("Se puede cambiar el email del primer miembro de la lista", async ({ page }) => {
    const newMemberEmail = faker.internet.email();

    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "se_puede_cambiar_el_email_del_primer_miembro_de_la_lista", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.waitForTimeout(2000);
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "se_puede_cambiar_el_email_del_primer_miembro_de_la_lista", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.getByLabel("Email").dblclick();
      await page.getByLabel("Email").fill(newMemberEmail);
      await screenshotPagePath(page, "members", "se_puede_cambiar_el_email_del_primer_miembro_de_la_lista", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "se_puede_cambiar_el_email_del_primer_miembro_de_la_lista", paso++);
    });

    await test.step("Then: El miembro editado se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Members")).toBeTruthy();
      await screenshotPagePath(page, "members", "se_puede_cambiar_el_email_del_primer_miembro_de_la_lista", paso++);
    });
  });

  test("Se puede utilizar el mismo nombre para dos miembros diferentes", async ({ page }) => {
    const selected = se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes as DataType;
    const newMemberName = `test-${selected.name}`;

    let paso = 1;

    for (let i = 0; i < 2; i++) {
      await test.step("When: El usuario se dirige a la sección members", async () => {
        await page.goto("/ghost/#/members");
        await page.waitForTimeout(2000);
        await screenshotPagePath(page, "members", "se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes", paso++);
      });

      await test.step("And: El usuario hace clic en \"New member\"", async () => {
        await page.getByRole("link", { name: "New member" }).click();
        await screenshotPagePath(page, "members", "se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes", paso++);
      });

      await test.step("And: El usuario crea el nuevo miembro", async () => {
        await page.getByLabel("Name").dblclick();
        await page.getByLabel("Name").fill(newMemberName);

        await page.getByLabel("Email").dblclick();
        await page.getByLabel("Email").fill(faker.internet.email());

        await page.getByLabel("Note (not visible to member)").dblclick();
        await page.getByLabel("Note (not visible to member)").fill(faker.lorem.sentence());

        await page.locator("input[type=\"search\"]").fill(faker.word.words(1));
        await page.keyboard.press("Enter");
        await screenshotPagePath(page, "members", "se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes", paso++);
      });

      await test.step("And: El usuario guarda el nuevo miembro", async () => {
        await page.getByRole("button", { name: "Save" }).click();
        await page.waitForTimeout(2000);
        await screenshotPagePath(page, "members", "se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes", paso++);
      });
    }

    await test.step("Then: El nuevo miembro se muestra en la lista de miembros creados", async () => {
      expect(await page.getByText("Members")).toBeTruthy();
      await screenshotPagePath(page, "members", "se_puede_utilizar_el_mismo_nombre_para_dos_miembros_diferentes", paso++);
    });
  });

  test("No se puede filtrar por fecha si se usan caracteres aleatorios", async ({ page }) => {
    const randomValue = `;
  test -${generarDatosAleatorios()}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_fecha_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("And: el usuario abre el dropdown de filtrado", async () => {
      await page.waitForTimeout(2000);
      await page.locator("body > div.gh-app > div > main > section > div > header > section > div.view-actions-top-row > div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-icon.gh-btn-action-icon").click();
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_fecha_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("And: El usuario selecciona la opcion \"Created\" del select", async () => {
      await page.waitForTimeout(2000);
      await page.selectOption("#ember-basic-dropdown-wormhole > div > section > div.gh-filter-block > div > div > span:nth-child(1) > select", "created_at");
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_fecha_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("And: El usuario ponen caracteres aleatorios en el campo de fecha", async () => {
      await page.waitForTimeout(2000);
      await page.getByPlaceholder("YYYY-MM-DD").fill(randomValue);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_fecha_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("Then: Se observa mensaje de validacion por ingresar un valor incorrecto", async () => {
      expect(await page.getByText("Date must be YYYY-MM-DD").innerText()).toBe("Date must be YYYY-MM-DD");
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_fecha_si_se_usan_caracteres_aleatorios", paso++);
    });
  });

  test("No se puede filtrar por last seen si se usan caracteres aleatorios", async ({ page }) => {
    const randomValue = `;
  test -${generarDatosAleatorios()}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_last_seen_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("And: el usuario abre el dropdown de filtrado", async () => {
      await page.waitForTimeout(2000);
      await page.locator("body > div.gh-app > div > main > section > div > header > section > div.view-actions-top-row > div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-icon.gh-btn-action-icon").click();
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_last_seen_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("And: El usuario selecciona la opcion \"Last seen\" del select", async () => {
      await page.waitForTimeout(2000);
      await page.selectOption("#ember-basic-dropdown-wormhole > div > section > div.gh-filter-block > div > div > span:nth-child(1) > select", "last_seen_at");
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_last_seen_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("And: El usuario ponen caracteres aleatorios en el campo de fecha", async () => {
      await page.waitForTimeout(2000);
      await page.getByPlaceholder("YYYY-MM-DD").fill(randomValue);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_last_seen_si_se_usan_caracteres_aleatorios", paso++);
    });

    await test.step("Then: Se observa mensaje de validacion por ingresar un valor incorrecto", async () => {
      expect(await page.getByText("Date must be YYYY-MM-DD").innerText()).toBe("Date must be YYYY-MM-DD");
      await screenshotPagePath(page, "members", "no_se_puede_filtrar_por_last_seen_si_se_usan_caracteres_aleatorios", paso++);
    });
  });

  test("Al filtrar por email usando mas de 4000 parrafos hace que la pagina no responda", async ({ page }) => {
    const newMemberEmail = `${faker.lorem.paragraphs(4000)}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");

      await screenshotPagePath(page, "members", "al_filtrar_por_email_usando_mas_de_4000_parrafos_hace_que_la_pagina_no_responda", paso++);
    });

    await test.step("And: el usuario abre el dropdown de filtrado", async () => {
      await page.waitForTimeout(2000);
      await page.locator("body > div.gh-app > div > main > section > div > header > section > div.view-actions-top-row > div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-icon.gh-btn-action-icon").click();
      await screenshotPagePath(page, "members", "al_filtrar_por_email_usando_mas_de_4000_parrafos_hace_que_la_pagina_no_responda", paso++);
    });

    await test.step("And: El usuario selecciona la opcion \"Email\" del select", async () => {
      await page.waitForTimeout(2000);
      await page.selectOption("#ember-basic-dropdown-wormhole > div > section > div.gh-filter-block > div > div > span:nth-child(1) > select", "email");
      await screenshotPagePath(page, "members", "al_filtrar_por_email_usando_mas_de_4000_parrafos_hace_que_la_pagina_no_responda", paso++);
    });

    await test.step("And: El usuario busca el nuevo miembro por email", async () => {
      await page.waitForTimeout(2000);
      await page.locator("div > section > div.gh-filter-block > div > div > input").fill(newMemberEmail);
      await page.getByText("Apply filters").click();
      await screenshotPagePath(page, "members", "al_filtrar_por_email_usando_mas_de_4000_parrafos_hace_que_la_pagina_no_responda", paso++);
    });

    await test.step("Then: Se observa indicador de carga", async () => {
      await page.waitForTimeout(2000);
      expect(await page.isVisible(".gh-loading-spinner")).toBe(true);
      await screenshotPagePath(page, "members", "al_filtrar_por_email_usando_mas_de_4000_parrafos_hace_que_la_pagina_no_responda", paso++);
    });
  });

  test("No se puede modificar el primer miembro si en el campo note se usan mas de 500 caracteres", async ({ page }) => {
    const newMemberNote = `${faker.lorem.paragraphs(20)}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_note_se_usan_mas_de_500_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_note_se_usan_mas_de_500_caracteres", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.getByLabel("Note (not visible to member)").dblclick();
      await page.getByLabel("Note (not visible to member)").fill(newMemberNote);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_note_se_usan_mas_de_500_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_note_se_usan_mas_de_500_caracteres", paso++);
    });

    await test.step("Then: Se observa mensaje de validacion por ingresar un valor incorrecto", async () => {
      expect(await page.getByText("Note is too long.").innerText()).toBe("Note is too long.");
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_note_se_usan_mas_de_500_caracteres", paso++);
    });
  });

  test("No se puede modificar el primer miembro si en el campo name se usan mas de 191 caracteres", async ({ page }) => {
    const newMemberName = `${faker.lorem.paragraphs(20)}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_name_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_name_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.getByLabel("Name").click();
      await page.getByLabel("Name").fill(newMemberName);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_name_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_name_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("Then: Se observa mensaje de validacion por ingresar un valor incorrecto", async () => {
      expect(await page.getByText("Name cannot be longer than 191 characters.").innerText()).toBe("Name cannot be longer than 191 characters.");
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_name_se_usan_mas_de_191_caracteres", paso++);
    });
  });

  test("No se puede modificar el primer miembro si en el campo email se usan mas de 191 caracteres", async ({ page }) => {
    const newMemberEmail = `${faker.word.words(100)}@${faker.word.words(90)}.com`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_email_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_email_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.getByLabel("Email").click();
      await page.getByLabel("Email").fill(newMemberEmail);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_email_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_email_se_usan_mas_de_191_caracteres", paso++);
    });

    await test.step("Then: Se observa mensaje de validacion por ingresar un valor incorrecto", async () => {
      const text = page.locator("body > div.gh-app > div > main > section > div:nth-child(2) > form > div > section > div > div:nth-child(1) > div > div.gh-cp-member-email-name > div.form-group.max-width.error.ember-view > p");
      expect(['Email cannot be longer than 191 characters.', 'Invalid Email.']).toContain(await text.innerText());

      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_campo_email_se_usan_mas_de_191_caracteres", paso++);
    });
  });

  test("No se puede modificar el primer miembro si en el se asigna un label con mas de 191 caracteres", async ({ page }) => {
    const newMemberLabel = `${faker.lorem.paragraphs(20)}`;
    let paso = 1;

    await test.step("When: El usuario se dirige a la sección members", async () => {
      await page.goto("/ghost/#/members");
      await page.waitForTimeout(2000);
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_se_asigna_un_label_con_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario hace clic en el primer miembro de la lista", async () => {
      await page.locator("table > tbody > tr > a").first().click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_se_asigna_un_label_con_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario edita el miembro", async () => {
      await page.locator("input[type=\"search\"]").fill(newMemberLabel);
      await page.keyboard.press("Enter");
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_se_asigna_un_label_con_mas_de_191_caracteres", paso++);
    });

    await test.step("And: El usuario guarda el miembro editado", async () => {
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Save" }).click();
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_se_asigna_un_label_con_mas_de_191_caracteres", paso++);
    });

    await test.step("Then: Se observa mensaje de validacion por ingresar un valor incorrecto", async () => {
      expect(await page.getByText("Validation error, cannot edit member. Validation failed for name.").innerText()).toBe("Validation error, cannot edit member. Validation failed for name.");
      await screenshotPagePath(page, "members", "no_se_puede_modificar_el_primer_miembro_si_en_el_se_asigna_un_label_con_mas_de_191_caracteres", paso++);
    });
  });
});

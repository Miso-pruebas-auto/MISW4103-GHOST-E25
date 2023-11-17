const {
  When,
  BeforeStep,
  AfterStep,
  Then,
  Before,
} = require('@cucumber/cucumber');
const assert = require('assert');
const fs = require('fs');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

Before(function (scenario) {
  this.currentScenario = scenario.pickle.name;
  this.currentFeature = scenario.gherkinDocument.feature.name;
  this.stepCount = 0;
});

BeforeStep(function (step) {
  this.stepCount++;
});

AfterStep(async function (step) {
  try {
    const folderName = `./screenshots/${this.currentFeature.toLowerCase()}/${this.currentScenario
      .toLowerCase()
      .replaceAll(' ', '_')}`;

    if (!fs.existsSync(folderName)) {
      fs.mkdir(folderName, { recursive: true }, async (err) => {
        if (err) throw err;

        let screenshot = await this.driver.saveScreenshot(
          `${folderName}/${this.stepCount}.png`,
        );
        this.attach(screenshot, 'image/png');
        console.log(`Screenshot taken: ${folderName}/${this.stepCount}.png`);
      });
      return;
    }

    let screenshot = await this.driver.saveScreenshot(
      `${folderName}/${this.stepCount}.png`,
    );
    this.attach(screenshot, 'image/png');
    console.log(`Screenshot taken: ${folderName}/${this.stepCount}.png`);
  } catch (e) {
    console.log(e);
    console.log('KRAKEN: Could not take screenshot');
  }
  return;
});

When(
  'I authenticate using the credentials {kraken-string} and {kraken-string} and go to {kraken-string}',
  async function (email, password, page) {
    const loginForm = await this.driver.$('#login');
    const isLoginPage = await loginForm.isExisting();

    if (isLoginPage) {
      const emailInput = await this.driver.$('input[name="identification"]');
      await emailInput.setValue(email);
      const passwordInput = await this.driver.$('input[name="password"]');
      await passwordInput.setValue(password);
      const submit = await this.driver.$('button[type="submit"]');
      await submit.click();
      await sleep(5000);
      return;
    }

    const blogTitleInput = await this.driver.$('input[name="blog-title"]');
    await blogTitleInput.setValue('Ghost Demo App');
    const fullNameInput = await this.driver.$('input[name="name"]');
    await fullNameInput.setValue('Jhon Doe');
    const emailInput = await this.driver.$('input[name="email"]');
    await emailInput.setValue(email);
    const passwordInput = await this.driver.$('input[name="password"]');
    await passwordInput.setValue(password);
    const submit = await this.driver.$('button[type="submit"]');
    await submit.click();
    await sleep(5000);

    return await this.driver.url(page);
  },
);

Then('I should see the title {string}', async function (title) {
  const element = await this.driver.$('.gh-canvas-title');
  const text = await element.getText();

  return assert.strictEqual(title, text);
});

Then('I should see the title containing {string}', async function (title) {
  const element = await this.driver.$('.gh-canvas-title');
  const text = await element.getText();
  const words = text
    .trim()
    .split('\n')
    .map((word) => word.toLowerCase());

  return assert.strictEqual(words.includes(title.toLowerCase()), true);
});

Then('I should see input with name {string}', async function (name) {
  return await this.driver.$(`input[name="${name}"]`);
});

Then('I should see textarea with name {string}', async function (name) {
  return await this.driver.$(`textarea[name="${name}"]`);
});

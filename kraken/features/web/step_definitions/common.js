const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

When(
  'I setup credentials with {kraken-string} and {kraken-string} and go to {kraken-string}',
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

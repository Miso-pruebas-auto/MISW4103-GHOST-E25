const { BeforeAll, Given, When, Then } = require('@cucumber/cucumber');

When('I enter email {kraken-string}', async function (email) {
  let element = await this.driver.$('#email');
  return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
  let element = await this.driver.$('#password');
  return await element.setValue(password);
});

When('I click create account', async function () {
  let element = await this.driver.$('button[type="submit"]');
  return await element.click();
});

Then('I click on the first conversation', async function () {
  let element = await this.driver.$(
    '.x1av1boa > div:nth-child(1) > div:nth-child(1)',
  );
  return await element.click();
});

Then('I click on the redact message inputbox', async function () {
  let element = await this.driver.$('p.xat24cr');
  return await element.click();
});

Then('I send the message', async function () {
  let element = await this.driver.$('span.x3nfvp2:nth-child(3)');
  return await element.click();
});

When('I enter site tile', async function () {
  let element = await this.driver.$('#blog-title');
  return await element.setValue('Ghost');
});

When('I enter full name', async function () {
  let element = await this.driver.$('#name');
  return await element.setValue('Jhon Doe');
});

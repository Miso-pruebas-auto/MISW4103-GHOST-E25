const { When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');
const { faker } = require('@faker-js/faker');
const assert = require('assert');

Then('I should see a create new tag button', async function () {
  return await this.driver.$('a[href="#/tags/new/');
});

Then('I should have see new tag being saved', async function () {
  const element = await this.driver.$('.view-actions button');
  const text = await element.getText();

  return assert.strictEqual(text, 'Saved');
});

Then('I should see a validation error when no title specified', async function () {
  const errors = await this.driver.$('.error .response');

  return assert.strictEqual(await errors.getText(), 'You must specify a name for the tag.')
})

When('I navigate to tags list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/tags`);
});

When('I click on create new tag', async function () {
  const element = await this.driver.$('a[href="#/tags/new/');

  return await element.click();
});

When('I enter random tag name', async function () {
  let element = await this.driver.$('input[name="name"]');

  return await element.setValue(faker.word.words(2));
});

When('I enter random tag accent color', async function () {
  let element = await this.driver.$('input[name="accent-color"]');

  return await element.setValue(
    faker.color.rgb({
      prefix: '',
    }),
  );
});

When('I enter tag name {string}', async function (name) {
  let element = await this.driver.$('#email');

  return await element.setValue(name);
});

When('I click on save new tag', async function () {
  const element = await this.driver.$('.view-actions button');

  return await element.click();
});

const { When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');
const assert = require('assert');
const { faker } = require('@faker-js/faker');

When('I navigate to settings page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/settings`);
});

When('I navigate to general settings page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/settings/general`);
});

When('I expand Title & description settings', async function () {
  const button = await this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-header > button',
  );

  return await button.click();
});

When('I change site name into a random value', async function () {
  const field = this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-content > div > div > div > div:nth-child(1) > input',
  );

  return await field.setValue(faker.word.words(1));
});

When('I change site name into with empty value', async function () {
  const field = this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-content > div > div > div > div:nth-child(1) > input',
  );

  return await field.setValue("");
});


When('I change site description into a random value', async function () {
  const field = this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-content > div > div > div > div.description-container.form-group.ember-view > input',
  );

  return await field.setValue(faker.word.words(5));
});

When('I change description name into with empty value', async function () {
  const field = this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-content > div > div > div > div.description-container.form-group.ember-view > input',
  );

  return await field.setValue("");
});

When('I click on save settings changes', async function () {
  const element = await this.driver.$('.view-actions button');

  return await element.click();
});

Then('I should see {string} settings being saved', async function (setting) {
  const element = await this.driver.$('.view-actions button');
  const text = await element.getText();

  return assert.strictEqual(text, 'Saved');
});

Then('I should see {string} settings', async function (section) {
  const element = await this.driver.$('.gh-expandable-title');
  const text = await element.getText();

  return assert.strictEqual(text, section);
});

Then('I should see site name field', async function () {
  return await this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-content > div > div > div > div:nth-child(1) > input',
  );
});

Then('I should see site description field', async function () {
  return await this.driver.$(
    'body > div.gh-app > div > main > section > div:nth-child(2) > section > div:nth-child(1) > div.gh-expandable-content > div > div > div > div.description-container.form-group.ember-view > input',
  );
});

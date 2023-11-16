const { When, Then, Given } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');
const { faker } = require('@faker-js/faker');
const assert = require('assert');

Given('I navigate to members list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/members`);
});

Given('I click New Member Button', async function() {
  const element = await this.driver.$('a[href="#/members/new/');
  return await element.click();
})

When('I enter Random Member Name', async function () {
  let element = await this.driver.$('input[name="name"]');
  return await element.setValue(faker.person.firstName());
});

When('I enter Random Member Email', async function () {
  let element = await this.driver.$('input[name="email"]');
  return await element.setValue(faker.internet.email());
});

When('I enter Invalid Member Email', async function () {
  let element = await this.driver.$('input[name="email"]');
  return await element.setValue(faker.internet.userName());
});

Given('I click Save Button', async function() {
  const submit = await this.driver.$('.view-actions button');
  await submit.click();
})

Then('I should have see new member being saved', async function () {
  const element = await this.driver.$('.view-actions .ember-view');
  const text = await element.getText();
  assert.notEqual(text, 'Save');
});

Then('I should have see a created date label', async function () {
  //EL SEGUNDO P
  const element = await this.driver.$('.gh-member-details-meta p:nth-child(2)');
  const text = await element.getText();
  assert.strictEqual(text.includes('Created on'), true);
})

Then('I should see a email validation error when is not valid', async function () {
  const errors = await this.driver.$('.error .response');
  return assert.strictEqual(await errors.getText(), 'Invalid Email.')
})

Then('I should see a email validation error when is empty', async function () {
  const errors = await this.driver.$('.error .response');
  return assert.strictEqual(await errors.getText(), 'Please enter an email.')
})

Then('I should see a Retry title button', async function () {
  const element = await this.driver.$('.view-actions .ember-view');
  const text = await element.getText();
  assert.notEqual(text, 'Save');
  return assert.equal(text, 'Retry');
})

Then('I should have see a modal confirmation operation', async function () {
  const element = await this.driver.$('.modal-header h1');
  const text = await element.getText();
  // console.log(text);
  return assert.equal(text, 'Are you sure you want to leave this page?');
})

Then('I should have see in a modal a button with leave operation', async function () {
  const element = await this.driver.$('.modal-footer button:nth-child(2)');
  const text = await element.getText();
  // console.log(text);
  return assert.equal(text, 'Leave');
})

Then('I click Leave Modal Button', async function() {
  const submit = await this.driver.$('.modal-footer button:nth-child(2)');
  await submit.click();
})

Then('I verificate Stay in Members List page', async function() {
  const element = await this.driver.$('.gh-nav-manage li:nth-child(4) a');
  const text = await element.getAttribute('class');
  // console.log(text);
  return assert.equal(text, 'active ember-view');
})

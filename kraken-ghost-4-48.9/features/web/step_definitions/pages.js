const { Given, When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');
const { faker } = require('@faker-js/faker');
const assert = require('assert');

Given('I navigate to pages list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/pages`);
});

Given('I click New Page Button', async function() {
  const element = await this.driver.$('a[href="#/editor/page/"');
  return await element.click();
})

When('I input Random Title Name', async function() {
  const element = await this.driver.$('.gh-koenig-editor-pane textarea');

  return await element.setValue(faker.person.jobTitle());
})

When('I input Random Content text', async function() {
  const element = await this.driver.$('.koenig-editor__editor');

  return await element.setValue(faker.word.words(5));
})

When('I click Pages Button', async function() {
  const element = await this.driver.$('a[href="#/pages/');
  return await element.click();
})

When('I click Open Publish Button', async function() {
  const element = await this.driver.$('.gh-publishmenu-trigger');
  return await element.click();
})

When('I click Publish Page', async function() {
  const element = await this.driver.$('.gh-publishmenu-button');
  return await element.click();
})

When('I open sidebar options', async function() {
  const element = await this.driver.$('.settings-menu-toggle');
  return await element.click();
})

When('I select delete page', async function() {
  const element = await this.driver.$('.settings-menu-delete-button');
  return await element.click();
})

Then('I should have see new page Published notification', async function () {
  const element = await this.driver.$('.gh-notification-title');
  const text = await element.getText()
  // console.log(text)
  return assert.strictEqual(text, 'Published');
})

Then('I should have see new Page draft was created', async function () {
  const firstListItem = await this.driver.$('.gh-posts-list-item a:nth-child(2)');
  const textSecondA = await firstListItem.getText()
  // console.log(textSecondA)
  return assert.strictEqual(textSecondA, 'DRAFT');
})

Then('I should have see a modal with confirmation', async function () {
  const element = await this.driver.$('.modal-header h1');
  const text = await element.getText();
  return assert.equal(text, 'Are you sure you want to delete this page?');
})

Then('I should have select delete button', async function() {
  const submit = await this.driver.$('.modal-footer button:nth-child(2)');
  await submit.click();
})

Then('I should have see a Pages site', async function() {
  const currentUrl = await this.driver.getUrl()
  return assert.equal(currentUrl.includes("ghost/#/pages"), true);
})

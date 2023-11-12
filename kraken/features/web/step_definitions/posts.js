const { When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');
const assert = require('assert');
const { faker } = require('@faker-js/faker');
const { Key } = require('webdriverio');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

Then('I should see a create new post button', async function () {
  return await this.driver.$('a[href="#/editor/post/');
});

When('I navigate to posts list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/posts`);
});

Then('I should see the editor post status {string}', async function (title) {
  const element = await this.driver.$('.gh-editor-post-status');
  const text = await element.getText();

  return assert.strictEqual(title, text);
});

Then('I should see post title input', async function () {
  return await this.driver.$(`textarea`);
});
Then('I should see post content editor', async function () {
  return await this.driver.$('div[data-kg="editor"]');
});

Then('I should see publish post button', async function () {
  return await this.driver.$('.gh-publishmenu-trigger');
});

Then('I should see publish post confirmation', async function () {
  return await this.driver.$('.epm-modal');
});

Then('I should see open post setting button', async function () {
  return await this.driver.$('.settings-menu-toggle');
});

Then(
  'I should see a validation error when no author specified',
  async function () {
    const errors = await this.driver.$('.for-select .response');

    return assert.strictEqual(
      await errors.getText(),
      'At least one author is required.',
    );
  },
);

When('I enter random post name', async function () {
  let element = await this.driver.$('textarea');

  return await element.setValue(faker.word.words(2));
});

When('I assign an existing tag to new post', async function () {
  const input = await this.driver.$('#tag-input');
  await input.click();

  await sleep(2000);

  const elements = await this.driver.$$('ul .ember-power-select-option');
  await elements[0].click();
});

When('I remove the post author', async function () {
  const elements = await this.driver.$$(
    'ul .ember-power-select-multiple-remove-btn',
  );

  elements.forEach(async () => {
    const input = await this.driver.$('#author-list input[type="search"]');
    await input.click();
    await input.keys('Backspace');
  });
});

When('I click on publish post', async function () {
  const dropdown = await this.driver.$('.gh-publishmenu-trigger');
  await dropdown.click();
  const publishButton = await this.driver.$('.gh-publishmenu-button');
  return await publishButton.click();
});

When('I click on open post settings button', async function () {
  const button = await this.driver.$('.settings-menu-toggle');

  return await button.click();
});

When('I click on confirm publish post', async function () {
  const dropdown = await this.driver.$('button.gh-btn-black');

  return await dropdown.click();
});

When('I enter random post content', async function () {
  let element = await this.driver.$('div[data-kg="editor"]');

  return await element.setValue(faker.word.words(10));
});

When('I click on post content', async function () {
  let element = await this.driver.$('div[data-kg="editor"]');

  return await element.click();
});

When('I click on create new post', async function () {
  const element = await this.driver.$('a[href="#/editor/post/');

  return await element.click();
});

When("I shouldn't see publish post button", async function () {
  let visible = true;

  await this.driver.$('.gh-publishmenu-trigger').catch(() => {
    visible = false;
  });

  return assert.strictEqual(visible, false);
});

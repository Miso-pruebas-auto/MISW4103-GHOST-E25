const { When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');

When('I navigate to posts list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/posts`);
});

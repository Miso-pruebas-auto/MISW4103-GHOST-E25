const { When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');

When('I navigate to pages list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/pages`);
});

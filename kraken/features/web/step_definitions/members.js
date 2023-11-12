const { When, Then } = require('@cucumber/cucumber');
const { GHOST_URL } = require('../support/config');

When('I navigate to members list page', async function () {
  return await this.driver.url(`${GHOST_URL}/#/members`);
});

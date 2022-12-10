require('dotenv').config();

const { SlackBot } = require('./bot/slackBot');
/* const { TestBot } = require('./bot/testBot'); */
const token = require('../rsc/config/bot.json');

const mainBot = new SlackBot(token.TOKEN, token.SIGNING_SECRET, token.APP_TOKEN);
/* const testBot = new TestBot(token.TEST_TOKEN); */

(async () => {
  await mainBot.start();
})();
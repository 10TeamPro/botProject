require('dotenv').config();

const { SlackBot } = require('./bot/slackBot');
/* const { TestBot } = require('./bot/testBot'); */
const token = require('../rsc/config/bot.json');

const mainBot = new SlackBot(token.MAIN_TOKEN);
/* const testBot = new TestBot(token.TEST_TOKEN); */

mainBot
  .start()
  .then(() => mainBot.hiAndInfo())
  .then(() => mainBot.listen());
/* testBot.start().then(() => testBot.ready()).then(() => testBot.listen()); */

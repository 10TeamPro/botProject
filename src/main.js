require('dotenv').config();

const { Bot } = require('./app');
const token = require('../config/bot.json');

const mainBot = new Bot(token.Signing_SECRET);
const testBot = new Bot(token.TEST_TOKEN);

mainBot.start();

mainBot.listen();

testBot.start();

testBot.listen();

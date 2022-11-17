require('dotenv').config();

const { Bot } = require('./app');
const token = require('../config/bot.json').Signing_SECRET;

Bot.start(token);

Bot.listen('message');

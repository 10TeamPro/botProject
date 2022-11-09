require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const token = require('../config/bot.json').Signing_SECRET;

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (!isNaN(text)) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi':
      case 'hello':
      case '안녕':
        greeting(rtm, channel);
        break;
      default:
        rtm.sendMessage('Im alive', channel);
    }
  }
});

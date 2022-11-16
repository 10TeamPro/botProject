require('dotenv').config();

const { Bot } = require('./app');
const token = require('../config/bot.json').Signing_SECRET;

Bot.start(token);

Bot.on('message');

// const { RTMClient } = require('@slack/rtm-api');

// const token = require('../config/bot.json').Signing_SECRET;

// const rtm = new RTMClient(token);
// rtm.start();

// const greeting = require('./greeting');
// const square = require('./square');

// let responseLevel = 1;

// rtm.on('message', (message) => {
//   const { channel } = message;
//   const { text } = message;

//   if (!Number.isNaN(Number(text))) {
//     if (responseLevel === 1) square(rtm, text, channel);
//   } else {
//     switch (text) {
//       case 'hi':
//       case 'hello':
//       case '안녕':
//         if (responseLevel === 1) {
//           greeting(rtm, channel);
//         }
//         break;
//       case '학사일정':
//         if (responseLevel === 1) {
//           rtm.sendMessage('원하시는 날짜를 입력해주세요 (월/일)', channel);
//           responseLevel = 2;
//         }
//         break;
//       case '오늘':
//         if (responseLevel === 2) {
//           rtm.sendMessage('결과 : ...', channel);
//           responseLevel = 1;
//         }
//         break;
//       default:
//         rtm.sendMessage('Im alive', channel);
//     }
//   }
// });

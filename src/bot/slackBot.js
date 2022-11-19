const greeting = require('../greeting');
const square = require('../square');
const { Bot } = require('./bot');


class SlackBot extends Bot {

  listen() {
    // rtm.sendMessage()도 promise 반환하므로 async로 전환했습니다.
    this.rtm.on('message', async (message) => {
      const { channel, text } = message;

      try {
        await this.send(text, channel);
      } catch (e) {
        console.log(e);
      }
    });
  }

  /** 문자열 분석 후 그룹지어 봇이 어떤 작업을 할지 전달합니다. */
  send(text, channel) {
    return new Promise((resolve, reject) => {
      let instruction;

      switch (text) {
        case 'hi':
          instruction = greeting(this.rtm, channel);
          break;
        case '학사일정':
          // TODO: feature 2
          break;
        case '오늘 밥 뭐야':
          // TODO: feature 3
          break;
        case '*학부':
          // TODO: feature 4
          break;
        default:
          instruction = 'undefined';
          break;
      }
      if (!Number.isNaN(Number(text))) resolve(square(this.rtm, text, channel));
      else if (instruction === 'undefined') reject();
      else resolve(instruction);
    });
  }
}

module.exports.SlackBot = SlackBot;
const { RTMClient } = require('@slack/rtm-api');
const greeting = require('./greeting');
const square = require('./square');

class Bot {
  static #rtm;

  static responseLevel = 1;

  static start(token) {
    Bot.#rtm = new RTMClient(token);
    Bot.#rtm.start();
    console.log('hello');
  }

  static on(eventType) {
    this.#rtm.on(eventType, (message) => {
      const { channel } = message;
      const { text } = message;

      console.log(text);

      switch (this.responseLevel) {
        case 1:
          switch (this.decode(text)) {
            case 'calculation':
              square(this.#rtm, text, channel);
              break;
            case 'greeting':
              greeting(this.#rtm, channel);
              break;
            case 'schedule':
              this.#rtm.sendMessage('원하시는 날짜를 입력해주세요 (월/일)', channel);
              this.responseLevel = 2;
              break;
            case 'location':
              this.#rtm.sendMessage('tel : xxxxxxxxxxxx', channel);
              break;
            case 'menu':
              this.#rtm.sendMessage('삼겹살  ⭐⭐⭐', channel);
              break;
            default:
              break;
          }
          break;
        case 2:
          switch (this.decode(text)) {
            case 'date':
              this.#rtm.sendMessage('선거날입니다.', channel);
              this.responseLevel = 1;
              break;
            default:
              this.#rtm.sendMessage('ERROR', channel);
          }
          break;
        default:
          break;
      }
    });
  }

  static decode(text) {
    if (!Number.isNaN(Number(text))) return 'calculation';

    switch (text) {
      case 'hi':
      case 'hello':
      case '안녕':
        return 'greeting';
      case '학사일정':
        return 'schedule';
      case '*학부':
        return 'location';
      case '오늘 밥 뭐야':
        return 'menu';
      case '오늘':
      case '내일':
      case '12/25':
        return 'date';
      default:
        return 'undefined';
    }
  }
}

module.exports = {
  Bot,
};

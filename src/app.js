const { RTMClient } = require('@slack/rtm-api');
const greeting = require('./greeting');
const square = require('./square');

class Bot {
  /** rtm 개체 */
  static #rtm;

  /** 응답 가능한 단계 */
  static #responseLevel;

  constructor() {
    this.#rtm = null;
    this.#responseLevel = 1;
  }

  /** rtm 할당 및 모니터링 시작 */
  static async start(token) {
    this.#rtm = new RTMClient(token);
    await this.#rtm.start(); // start 메서드는 promise를 반환하므로 async로 전환했습니다.

    console.log(`${Date().substring(4, 25)}  |  Start Point`);
  }

  static listen(eventType = 'message') {
    // rtm.sendMessage()도 promise 반환하므로 async로 전환했습니다.
    this.#rtm.on(eventType, async (message) => {
      const { channel, text } = message;

      try {
        await this.send(text, channel);
      } catch (e) {
        console.log(e);
      }
    });
  }

  /** 문자열 분석 후 그룹지어 봇이 어떤 작업을 할지 전달합니다. */
  static send(text, channel) {
    return new Promise((resolve, reject) => {
      let instruction;

      switch (text) {
        case 'hi':
          instruction = greeting(this.#rtm, channel);
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
      if (!Number.isNaN(Number(text))) resolve(square(this.#rtm, text, channel));
      else if (instruction === 'undefined') reject(this.#rtm.sendMessage('Say hi or number', channel));
      else resolve(instruction);
    });
  }
}

module.exports = {
  Bot
};

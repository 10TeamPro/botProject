// const fs = require('fs');

const { RTMClient } = require('@slack/rtm-api');
const greeting = require('./greeting');
const square = require('./square');

class Bot {
  /** rtm 개체 */
   #rtm;

  /** 응답 가능한 단계 */
   #responseLevel;
  
  /** 학사 일정 텍스트 파일 */
  static #departmentSchedule;

  /**  학식 메뉴 텍스트 파일 */
  static #menuSchedule;

  /** 학과 사무실 정보 */
  static #departmentInfo;

  /** 정적으로 시스템이 켜질 때 한번만 데이터를 미리 로드합니다. */
  constructor(token) {
    this.#rtm = null;
    this.#responseLevel = 1;
    this.#rtm = new RTMClient(token);

    // this.#departmentSchedule = fs.readFileSync('rsc/data/schedule.txt').toString().split('\n');
    // this.#menuSchedule = fs.readFileSync('rsc/data/menu.txt').toString().split('\n');
    // this.#departmentInfo = fs.readFileSync('rsc/data/info.txt').toString().split('\n');
  }

  /** 모니터링 시작 */
   async start() {
    await this.#rtm.start(); // start 메서드는 promise를 반환하므로 async로 전환했습니다.

    console.log(`${Date().substring(4, 25)} ${this.#rtm} starts`);
  }

   listen() {
    // rtm.sendMessage()도 promise 반환하므로 async로 전환했습니다.
    this.#rtm.on('message', async (message) => {
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

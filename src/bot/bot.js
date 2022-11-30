// const fs = require('fs');

const { RTMClient, LogLevel } = require('@slack/rtm-api');

class Bot {
  /** rtm 개체 */
  rtm;

  /** 응답 가능한 단계 */
  responseLevel;

  constructor(token) {
    this.rtm = null;
    this.responseLevel = 1;
    this.rtm = new RTMClient(token, { logLevel: LogLevel.INFO });
  }

  /** 모니터링 시작 */
  async start() {
    await this.rtm.start(); // start 메서드는 promise를 반환하므로 async로 전환했습니다.

    console.log(`${Date().substring(4, 25)}  RUNNING....`);
  }
}

module.exports.Bot = Bot;

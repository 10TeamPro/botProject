// const fs = require('fs');

const { App } = require('@slack/bolt');

class Bot {
  /** rtm 개체 */
  app;

  /** 응답 가능한 단계 */
  responseLevel;

  constructor(_token, _signingSecret, _appToken) {
    this.app = null;
    this.responseLevel = 1;
    this.app = new App(
      {
        token: _token,
        signingSecret: _signingSecret,
        socketMode: true,
        appToken: _appToken
      }
    );
  }

  /** 모니터링 시작 */
  async start() {
    await this.app.start();
    console.log("⚡️ Bolt app is running!");
  }
}

module.exports.Bot = Bot;

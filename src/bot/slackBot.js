const greeting = require('../greeting');
const square = require('../square');
const schedule = require('../schedule');
const menu = require('../menu');
const { Bot } = require('./bot');
const findOffice = require('../findOffice');

class SlackBot extends Bot {
  /** 멤버들의 id를 담을 hashset */
  #userHash = new Set();

  /** 유저가 봇이 존재하는 채널에서 처음 타이핑을 시작할 때 봇은 가이드를 줍니다. */
  hiAndInfo() {
    this.rtm.on('user_typing', async (event) => {
      if (this.#userHash.has(event.user)) {
        return;
      }
      const stringFormat = `     안녕하세요? <@${event.user}>님\n
       아래 메시지를 입력하시면 응답 가능합니다.\n
      |                 hi\n 
      |               학사일정\n
      |             오늘 밥 뭐야\n 
      |              (전공)학부 \n`;
      this.#userHash.add(event.user);
      await this.rtm.sendMessage(
        stringFormat,
        event.channel
      );
    });
  }

  listen() {
    // rtm.sendMessage()도 promise 반환하므로 async로 전환했습니다.
    this.rtm.on('message', async (message) => {
      const { channel, text } = message;

      try {
        if (this.responseLevel === 1) {
          await this.send(text, channel);
        } else if (this.responseLevel === 2) {
          const result = schedule(text);
          await this.rtm.sendMessage(result.msg, channel);
          if (result.success) {
            this.responseLevel = 1;
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  /** 문자열 분석 후 그룹지어 봇이 어떤 작업을 할지 전달합니다. */
  send(text, channel) {
    return new Promise((resolve, reject) => {
      let instruction;

      const checkENG = /[a-zA-Z]/;

      if (checkENG.test(text)) {
        text = { ...text.toLowerCase() };
      }

      switch (text) {
        case 'hi':
          instruction = greeting();
          break;
        case '학사일정':
          // TODO: feature 2
          instruction = this.requestDate(channel);
          this.responseLevel += 1;
          break;
        case '오늘 밥 뭐야':
          // TODO: feature 3
          instruction = menu(
            this.rtm,
            new Date().getDay(),
            channel
          );
          break;
        default:
          instruction = findOffice(text);
          break;
      }
      if (!Number.isNaN(Number(text)))
        resolve(square(this.rtm, text, channel));
      else if (instruction === 'undefined') reject();
      else resolve(instruction);
    });
  }

  requestDate(channel) {
    const stringFormat =
      '| 안내 받을 날짜를 입력해주세요 \n' +
      '| 형식 : 월/일 (12/13)';
    return this.rtm.sendMessage(stringFormat, channel);
  }
}

module.exports.SlackBot = SlackBot;

const { Bot } = require('./bot');
// const { TEST_CHANNEL } = require('../../rsc/config/bot.json');

const greeting = require('../greeting');
const schedule = require('../schedule');
const menu = require('../menu');
const findOffice = require('../findOffice');
const evaluation = require('../evaluation');
const evaluationWeek = require('../evaluationWeek');

const requestDate =
  '| 안내 받을 날짜를 입력해주세요 \n' +
  '| 형식 : 월/일 (12/13)';

const requestDept = `| 학과 이름을 입력해주세요 \n| (⨂ 영문입력 바람)`;

const guideText = {
  'blocks': [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "아래 메시지를 입력하시면 응답 가능합니다."
      }
    },
    {
      "type": "divider"
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': ' *hi*\n' +
          ' *학사일정*\n' +
          ' *오늘 밥 뭐야*\n' +
          ' *이번 주 식단 <https://sobi.chonbuk.ac.kr/menu/week_menu.php|(전북대학교 생활협동조합)>*\n' +
          ' *학과사무실안내*'
      },
      'accessory': {
        'type': 'image',
        'image_url': 'https://upload.wikimedia.org/wikipedia/ko/thumb/e/e2/JBNU_Emblem.svg/1200px-JBNU_Emblem.svg.png',
        'alt_text': 'plane'
      }
    },
    {
      'type': 'section',
      'text':{
        'type': 'mrkdwn',
        'text':
          'Architectural Engineering\n' +
          ' Mechanical Engineering\n' +
          ' Urban Engineering\n' +
          'Electronic Engineering\n' +
          ' Computer Science and Engineering\n' +
          ' Chemical Engineering\n' +
          'Accounting\n' +
          ' International Trade Korean Language and Literature\n' +
          ' Library and Information Science'
      }
    }
  ]
};

class SlackBot extends Bot {
  /** User ID Set */
  // #userHash = new Set();

  /** 채널 별로 응답상황을 인지
   * @Key : Channel Hash ID
   * @Value : response Level on Channel
   * */
  #channelMap = new Map();

  async start() {
    await super.start();
    await this.hint();
    await this.listen();
  }

  checkChannel(channel) {
    if (!this.#channelMap.has(channel)) {
      this.#channelMap.set(channel, 1);
    }
    this.responseLevel = this.#channelMap.get(channel);
  }

  listen() {

    this.app.message(async ({ event, say }) => {
      const { channel, text } = event;

      this.checkChannel(channel);
      try {
        const msg = await this.send(text, channel);
        await say(msg);
      } catch (e) {
        console.log(e);
      }
    });
  }

  hint() {
    this.app.command('/hint', async ({ ack, say }) => {
      await ack();
      await say(guideText);
    });
  }

  /** 문자열 분석 후 그룹지어 봇이 어떤 작업을 할지 전달합니다. */
  send(text, channel) {
    let sendMsg;

    switch (this.responseLevel) {
      case 1:
        switch (text) {
          case 'hi':
            sendMsg = greeting();
            break;
          case '학사일정':
            sendMsg = requestDate;
            this.#channelMap.set(channel, 2);
            break;
          case '오늘 밥 뭐야':
            sendMsg = menu(
              this.app,
              new Date().getDay(),
              channel
            );
            if (sendMsg == null) sendMsg = evaluation();
            break;
          case '이번 주 식단':
            sendMsg = menu(
              this.app,
              new Date().getDay(),
              channel
            );
            if (sendMsg == null) sendMsg = evaluationWeek();
            break;
          case '학과 사무실 안내':
            sendMsg = requestDept;
            this.#channelMap.set(channel, 3);
            break;
          default:
            break;
        }
        break;
      case 2: {
        const temp = schedule(text);
        sendMsg = temp.msg;
        this.#channelMap.set(channel, temp.success ? 1 : 2);
        break;
      }
      case 3: {
        const temp = findOffice(text);
        sendMsg = temp.msg;
        this.#channelMap.set(channel, temp.success ? 1 : 3);
        break;
      }
      default:
        sendMsg = 'error';
        console.assert(
          this.responseLevel < 3,
          'response level should less than 3'
        );
        break;
    }
    return sendMsg;
  }
}

module.exports.SlackBot = SlackBot;

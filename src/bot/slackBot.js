const { Bot } = require('./bot');

const greeting = require('../greeting');
const schedule = require('../schedule');
const menu = require('../menu');
const findOffice = require('../findOffice');

const requestDate =
  '| 안내 받을 날짜를 입력해주세요 \n' +
  '| 형식 : 월/일 (12/13)';

const departmentBlock = {
  'blocks': [
    {
      'type': 'section',
      'block_id': 'slack_dept_section',
      'text': {
        'type': 'mrkdwn',
        'text': '학과 리스트'
      },
      'accessory': {
        'action_id': 'slack_dept_list',
        'type': 'static_select',
        'placeholder': {
          'type': 'plain_text',
          'text': '학과 리스트'
        },
        'options': [
          {
            'text': {
              'type': 'plain_text',
              'text': 'Architectural Engineering'
            },
            'value': 'Architectural Engineering'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Mechanical Engineering'
            },
            'value': 'Mechanical Engineering'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Urban Engineering'
            },
            'value': 'Urban Engineering'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Electronic Engineering'
            },
            'value': 'Electronic Engineering'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Computer Science and Engineering'
            },
            'value': 'Computer Science and Engineering'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Chemical Engineering'
            },
            'value': 'Chemical Engineering'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Accounting'
            },
            'value': 'Accounting'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'International Trade'
            },
            'value': 'International Trade'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Korean Language and Literature'
            },
            'value': 'Korean Language and Literature'
          },
          {
            'text': {
              'type': 'plain_text',
              'text': 'Library and Information Science'
            },
            'value': 'Library and Information Science'
          }
        ]
      }
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `| 학과 이름을 입력해주세요 | (영문입력 바람)`
      }
    },
    {
      'type': 'divider'
    }
  ]
};

const guideText = {
  'blocks': [
    {
      'type': 'header',
      'text': {
        'type': 'plain_text',
        'text': '아래 메시지를 입력하시면 응답 가능합니다.'
      }
    },
    {
      'type': 'divider'
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': ' *hi*\n' +
          ' *<https://cse.jbnu.ac.kr/cse/3576/subview.do|학사일정>*\n' +
          ' *오늘 밥 뭐야*\n' +
          ' *<https://sobi.chonbuk.ac.kr/menu/week_menu.php|이번 주 식단>*\n' +
          ' *학과사무실안내*'
      },
      'accessory': {
        'type': 'image',
        'image_url': 'https://upload.wikimedia.org/wikipedia/ko/thumb/e/e2/JBNU_Emblem.svg/1200px-JBNU_Emblem.svg.png',
        'alt_text': 'plane'
      }
    },
    departmentBlock.blocks[0]
  ]
};

class SlackBot extends Bot {
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

  /** @description 다른 유저로부터 메시지 감지시에 발생하는 이벤트 정의 */
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

  /** @description 메시지 창에서 /hint 입력시 발생하는 이벤트 정의 */
  hint() {
    this.app.command('/hint', async ({ ack, say}) => {
      await ack();
      await say(guideText);
    });

    this.app.action('slack_dept_list', async ({ action, ack, say,  body }) => {
      await ack();

      const result = this.getResult(findOffice,action.selected_option.value, body.container.channel_id);

      await say(result);
    });
  }

  /** 문자열 분석 후 그룹지어 봇이 어떤 작업을 할지 전달합니다. */
  send(text, channel) {
    let sendMsg;

    const trimmedText = text.replace(/ /gi, '');

    switch (this.responseLevel) {

      case 1:
        switch (trimmedText) {
          case 'hi':
            sendMsg = greeting();
            break;
          case '학사일정':
            sendMsg = requestDate;
            this.#channelMap.set(channel, 2);
            break;
          case '오늘밥뭐야':
          case '이번주식단':
            sendMsg = menu(new Date().getDay(), trimmedText);
            break;
          case '학과사무실안내':
            sendMsg = departmentBlock;
            this.#channelMap.set(channel, 3);
            break;
          default:
            break;
        }
        break;
      case 2: {
        sendMsg = this.getResult(schedule, trimmedText, channel);
        break;
      }
      case 3: {
        sendMsg = this.getResult(findOffice, trimmedText, channel);
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

  getResult(func, text, channel){
    const result = func(text);

    if (result.success) {
      this.#channelMap.set(channel, 1);
    }
    return result.msg;
  }
}

module.exports.SlackBot = SlackBot;

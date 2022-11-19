const { Bot } = require('./bot');
const PRIVATE_CHANNEL = require('../../config/bot.json').TEST_CHANNEL;
const MAIN_BOT_ID = require('../../config/bot.json').MAIN_ID;

class TestBot extends Bot {

  /** 테스트 결과 출력 버퍼 */
  #resultBuf;

  /** 테스트 inputs */
  #number;

  constructor(token) {
    super(token);
    this.#resultBuf = '';
    this.#number = 10;
  }

  /** 메세지 보낼 준비 완료  */
  ready() {
    this.rtm.on('ready', async () => {
      try {
        await this.rtm.sendMessage('테스트 준비 완료 (테스트 시작 입력시 시작)', PRIVATE_CHANNEL);
      } catch (e) { /* empty */
      }
    });
  }

  /** @description
   * 저희들이 입력하는건 무시합니다. (테스트 시작할게요 제외)
   * 테스트 진행중일 때는 메인 봇의 메세지만 받아야합니다.
   * -> 이를 위해서 메인 봇의 UserID를 식별
   * */
  async listen() {
    this.rtm.on('message', async (message) => {
      const { text, user } = message;

      if (user === MAIN_BOT_ID) {
        await this.check(text)
          .then((response) => this.test(response));
      } else if (text === '테스트 시작') {
        await this.rtm.sendMessage('테스트 시작할게요.', PRIVATE_CHANNEL)
          .then(() => this.test(this.responseLevel));
      }
    });
  }

  check(result) {
    return new Promise((resolve) => {
      switch (this.responseLevel) {
        case 1:
          if (result === 'Hello?') {
            this.#resultBuf += 'Test #1 Greeting : 성공\n';
          } else {
            this.#resultBuf += 'Test #1 Greeting : 실패\n';
          }
          this.responseLevel += 1;
          break;
        case 2:
          if (Number(result) === this.#number ** 2) {
            this.#resultBuf += 'Test #2 Square    : 성공\n';
          } else {
            this.#resultBuf += 'Test #2 Square    : 실패\n';
          }
          this.responseLevel += 1;
          break;
        default:
          console.log(`response level error | current response : ${this.responseLevel}`);
          this.responseLevel = 1;
          break;
      }
      resolve(this.responseLevel);
    });


  }

  test(responseLevel) {
    return new Promise((resolve) => {
        let text;
        switch (responseLevel) {
          case 1:
            text = 'hi';
            break;
          case 2:
            text = this.#number.toString();
            break;
          case 3:
            text = this.#resultBuf;
            break;
          default:
            console.log(`reset response level | current response : ${this.responseLevel}`);
            this.responseLevel = 1;
            break;
        }
        resolve(this.rtm.sendMessage(text, PRIVATE_CHANNEL));
      }
    );
  }


}

module.exports.TestBot = TestBot;
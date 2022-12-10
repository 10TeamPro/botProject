const sinon = require('sinon');
const { Bot } = require('./bot');
const PRIVATE_CHANNEL =
  require('../../rsc/config/bot.json').TEST_CHANNEL;
const MAIN_BOT_ID =
  require('../../rsc/config/bot.json').MAIN_ID;

const greeting = require('../greeting');
const schedule = require('../schedule');
// const menu = require('../menu');
const findOffice = require('../findOffice');

const testData = require('../../rsc/test/testData.json');

function sleep(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((r) => setTimeout(r, ms));
}

function check(condition, num) {
  return condition
    ? `|          Test #${num}  : 성공       |\n`
    : `|          Test #${num}  : 실패       |\n`;
}

class TestBot extends Bot {
  /** 테스트 결과 출력 버퍼 */
  #resultBuf = testData.entryPoint;

  /** 테스트 중 ? */
  #testing = false;

  #receivedBuf = '';

  #generator;

  /** 메세지 보낼 준비 완료  */
  ready() {
    this.rtm.on('ready', async () => {
      const strFormat =
        '테스트 준비 완료\n' +
        '(테스트 시작 입력시 테스트 시작)';
      await this.rtm.sendMessage(
        strFormat,
        PRIVATE_CHANNEL
      );
    });
  }

  listen() {
    this.rtm.on('message', async (message) => {
      const { text, user } = message;
      // Bot이 보낸 메세지 Case
      if (user === MAIN_BOT_ID && this.#testing) {
        this.#receivedBuf = text;
        this.#generator.next();
      }
      // User가 테스트 시작 Case
      else if (
        text === '테스트 시작' &&
        this.#testing === false
      ) {
        this.#generator = await this.startTest();
        this.#generator.next();
      }
    });
  }

  async *startTest() {
    const stringFormat =
      '------------------------------\n' +
      '|         TEST START          |\n' +
      '------------------------------';

    await this.rtm.sendMessage(
      stringFormat,
      PRIVATE_CHANNEL
    );

    this.#resultBuf = testData.entryPoint;
    this.#testing = true;

    const gr = this.testGreet();
    yield await gr.next();
    yield await gr.next();
    yield await gr.next();
    await gr.next();

    yield await this.testSchedule();

    // yield await this.testMenu();
    yield await this.testDepartment();

    this.#resultBuf += '\n------------------------------';

    console.log(this.#resultBuf);
    await this.rtm.sendMessage(
      this.#resultBuf,
      PRIVATE_CHANNEL
    );

    this.#testing = false;
  }

  async *testGreet() {
    let randomStub;

    const send = async (num) => {
      randomStub = sinon
        .stub(Math, 'random')
        .returns(num / 3);
      randomStub();
      await this.rtm.sendMessage(
        testData.greeting,
        PRIVATE_CHANNEL
      );
    };

    const test = async (expectedGreetText, num) => {
      this.#resultBuf +=
        greeting() === expectedGreetText
          ? `|       Test #1${num + 1}  : 성공        |\n`
          : `|       Test #1${num + 1}  : 실패        |\n`;
      randomStub.restore();
    };

    yield await send(0);
    await test("Hi. We're here to help", 1);

    yield await send(1);
    await test('Good to see you!', 2);

    yield await send(2);
    yield await test('Hi', 3);
  }

  async testSchedule() {
    const scheduleData = testData.schedule;
    const todaySchedule =
      scheduleData[
        Math.floor(
          Math.random() * Object.keys(scheduleData).length
        )
      ];

    await this.rtm.sendMessage('학사일정', PRIVATE_CHANNEL);
    await sleep(1500);

    await this.rtm.sendMessage(
      todaySchedule,
      PRIVATE_CHANNEL
    );

    await sleep(1500);

    this.#resultBuf += check(
      schedule(todaySchedule).success,
      2
    );
  }

  testMenu() {
    const send = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.rtm.sendMessage(
            testData.menu,
            PRIVATE_CHANNEL
          )
        );
      }, 1000);
    });

    return new Promise((resolve, reject) => {
      send.then(() => {
        setTimeout(() => {
          if (this.notified === false) {
            this.#resultBuf += 'Main Bot 응답없음';
            reject(this.#resultBuf);
          } else {
            this.#resultBuf += 'Test #3  : 보류\n';
          }
          console.log(this.#resultBuf);
          resolve(this.#resultBuf);
          this.toggleNotify();
        }, 1000);
      });
    });
  }

  async testDepartment() {
    const { department } = testData;
    const randDept =
      department[
        Math.floor(
          Math.random() * Object.keys(department).length
        )
      ];

    await this.rtm.sendMessage(randDept, PRIVATE_CHANNEL);

    await sleep(1500);

    this.#resultBuf += check(findOffice(randDept), 3);
  }
}

module.exports.TestBot = TestBot;

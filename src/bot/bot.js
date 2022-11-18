// const fs = require('fs');

const { RTMClient, LogLevel } = require('@slack/rtm-api');

class Bot {
  /** rtm 개체 */
  rtm;

  /** 응답 가능한 단계 */
  responseLevel;

  /** 학사 일정 텍스트 파일 */
  static departmentSchedule;

  /**  학식 메뉴 텍스트 파일 */
  static menuSchedule;

  /** 학과 사무실 정보 */
  static departmentInfo;

  /** 시스템이 켜질 때  한번만 데이터를 미리 로드합니다. */
  constructor(token) {
    this.rtm = null;
    this.responseLevel = 1;
    this.rtm = new RTMClient(token, { logLevel: LogLevel.INFO });

    // this.#departmentSchedule = fs.readFileSync('rsc/data/schedule.txt').toString().split('\n');
    // this.#menuSchedule = fs.readFileSync('rsc/data/menu.txt').toString().split('\n');
    // this.#departmentInfo = fs.readFileSync('rsc/data/info.txt').toString().split('\n');
  }

  /** 모니터링 시작 */
  async start() {
    await this.rtm.start(); // start 메서드는 promise를 반환하므로 async로 전환했습니다.

    console.log(`${Date().substring(4, 25)}  RUNNING....`);
  }
}

module.exports.Bot = Bot;
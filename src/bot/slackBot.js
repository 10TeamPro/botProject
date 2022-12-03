const {Bot} = require('./bot');
const PRIVATE_CHANNEL = require('../../rsc/config/bot.json').TEST_CHANNEL;

const greeting = require('../greeting');
const schedule = require('../schedule');
const menu = require('../menu');
const findOffice = require('../findOffice');

const requestDate =
    '| 안내 받을 날짜를 입력해주세요 \n' +
    '| 형식 : 월/일 (12/13)';

const requestDept =
    '| 학과 이름을 입력해주세요 \n' +
    '| (⨂ 영문입력 바람)';

class SlackBot extends Bot {
    /** User ID Set */
    #userHash = new Set();

    /** 채널 별로 응답상황을 인지
     * @Key : Channel Hash ID
     * @Value : response Level on Channel
     * */
    #channelMap = new Map();

    /** 유저가 봇이 존재하는 채널에서 처음 타이핑을 시작할 때 봇은 가이드를 줍니다. */
    async hiAndInfo() {
        this.rtm.on('user_typing', async (event) => {
            const {user, channel} = event;

            if (!this.#channelMap.has(channel)) {
                this.#channelMap.set(channel, 1);
            }
            if (this.#userHash.has(user) || channel === PRIVATE_CHANNEL) {
                return;
            }
            const stringFormat = `안녕하세요? <@${user}>님\n
    아래 메시지를 입력하시면 응답 가능합니다.\n
    |                 hi\n 
    |               학사일정\n
    |             오늘 밥 뭐야\n 
    |              학과 사무실 안내 \n`;
            this.#userHash.add(user);
            await this.rtm.sendMessage(
                stringFormat,
                channel
            );
        });
    }

    listen() {
        this.rtm.on('message', async (message) => {
            const {channel, text} = message;

            this.responseLevel = this.#channelMap.get(channel);
            try {
                const msg = await this.send(text, channel);
                await this.rtm.sendMessage(msg, channel);
            } catch (e) {
                console.log(e);
            }
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
                        sendMsg = menu(this.rtm, new Date().getDay(), channel);
                        break;
                    case '학과 사무실 안내':
                        sendMsg = requestDept;
                        this.#channelMap.set(channel, 3);
                        break;
                    default:
                        sendMsg = findOffice(text);
                        break;
                }
                break;
            case 2: {
                const temp = schedule(text);
                sendMsg = temp.success ? temp.msg : 'INPUT ERROR';
                this.#channelMap.set(channel, temp.success ? 1 : 2);
                break;
            }
            case 3: {
                const temp = findOffice(text);
                /** @todo 이부분에 성공했는지 여부 확인 후 성공시 1로 돌아가고 아니면 루프 */
                // sendMsg = temp.success ? temp.msg : 'INPUT ERROR';
                this.#channelMap.set(channel, temp.success ? 1 : 3);
                break;
            }
            default:
                sendMsg = 'error';
                console.assert(this.responseLevel < 3, 'response level should less than 3');
                break;

        }
        return sendMsg;

    }
}

module.exports.SlackBot = SlackBot;
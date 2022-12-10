const scraping = require('./scraping');

const foodList = require('../rsc/data/food.json');

const star = (counts) => {
  let strBuf = '';
  for (let i = 0; i < counts; i += 1) {
    strBuf += '⭐';
  }
  return strBuf;
};


/* 일주일 식단 평가하는 함수 */
async function evaluationWeek() {
  /* 오늘이 무슨 요일인지 알아내기  */
  let score = 0;
  const scoreArr = [];
  let index = 0;
  let booL = false;
  const msgArr = [];

  /* 스크랩핑하는 부분 */
  const arr = await scraping(
    'https://sobi.chonbuk.ac.kr/menu/week_menu.php'
  );

  const response = (menuArr, s) => ({
    'blocks': [
      {
        'type': 'header',
        'text': {
          'type': 'plain_text',
          'text': `이번주 식단표 `
        }
      },
      {
        'type': 'divider'
      },
      {

        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `*월요일* \t\t ${s[0]}`
        },
        'fields': [
          {
            'type': 'mrkdwn',
            'text': `${menuArr[0]}\n`
          }
        ]
      },
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `*화요일* \t\t ${s[1]}`
        },
        'fields': [
          {
            'type': 'mrkdwn',
            'text': `${menuArr[1]}\n`
          }
        ]
      },
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `*수요일* \t\t ${s[2]}`
        },
        'fields': [
          {
            'type': 'mrkdwn',
            'text': `${menuArr[2]}\n`
          }
        ]
      },
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `*목요일* \t\t ${s[3]}`
        },
        'fields': [
          {
            'type': 'mrkdwn',
            'text': `${menuArr[3]}\t`
          }
        ]
      },
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `*금요일* \t\t ${s[4]}`
        },
        'fields': [
          {
            'type': 'mrkdwn',
            'text': `${menuArr[4]}\t`
          }
        ]
      }
    ]
  });


  /* 몇 점짜리 음식 유형인지 계산 */

  arr.forEach((dayOfWeek) => {
    dayOfWeek.forEach((food) => {
      foodList[3].some((foodElement) => {
        if (food.includes(foodElement)) {
          score += 3;
          booL = true;
        }
        return booL;
      });

      if (!booL) {
        foodList[2].some((foodElement) => {
          if (food.includes(foodElement)) {
            score += 2;
            booL = true;
          }
          return booL;
        });
      }
      if (!booL) score += 1;
      booL = false;
    });
    score = Math.round(score / dayOfWeek.length);
    score = star(score);
    scoreArr.push(score);
    msgArr.push(arr[index].join('\n'));

    index += 1;
    score = 0;
  });


  return response(msgArr, scoreArr);
}

module.exports = evaluationWeek;

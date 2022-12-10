const scraping = require('./scraping');

const foodList = require('../rsc/data/food.json');

const weekday = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일'
];

const star = (counts) => {
  let strBuf = '';
  for (let i = 0; i < counts; i += 1) {
    strBuf += '⭐';
  }
  return strBuf;
};

/* 식단 평가하는 함수 */
async function evaluation() {

  /* 스크랩핑하는 부분 */
  const arr = await scraping(
    'https://sobi.chonbuk.ac.kr/menu/week_menu.php'
  );


  /* 오늘이 무슨 요일인지 알아내기  */
  const dayOfWeek = new Date().getDay() - 1;
  const todayMenu = arr[dayOfWeek];

  let score = 0;
  let booL = false;

  const response = (menuArr, s) => ({
    'blocks': [
      {
        'type': 'header',
        'text': {
          'type': 'plain_text',
          'text': `${weekday[dayOfWeek]} 식단표 \t\t ${s} `
        }
      },
      {
        'type': 'divider'
      },
      {
        'type': 'section',
        'fields': [
          {
            'type': 'mrkdwn',
            'text': `${menuArr}`
          }
        ]
      }
    ]
  });


  /* 몇 점짜리 음식 유형인지 계산 */
  todayMenu.forEach((food) => {
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
          return booL;
        }
        return booL;
      });
    }
    if (!booL) score += 1;
    booL = false;
  });

  score = Math.round(score / todayMenu.length);
  score = star(score);

  const menus = todayMenu.join('\n');
  return response(menus, score);
}

module.exports = evaluation;

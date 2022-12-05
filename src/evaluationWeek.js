const scraping = require('./scraping');

const foodList = require('../rsc/data/food.json');

const weekday = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
];

/* 일주일 식단 평가하는 함수 */
async function evaluationWeek() {
  /* 오늘이 무슨 요일인지 알아내기  */
  let score = 0;
  let index = 0;
  let booL = false;
  let messageBuffer = '';

  /* 스크랩핑하는 부분 */
  const arr = await scraping(
    'https://sobi.chonbuk.ac.kr/menu/week_menu.php'
  );

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
    console.log(score);
    score = Math.round(score / dayOfWeek.length);
    messageBuffer += `${weekday[index]}: ${arr[index]} - ${score}점\n`;
    index += 1;
    score = 0;
  });

  return messageBuffer;
}

module.exports = evaluationWeek;

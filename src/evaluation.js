const scraping = require('./scraping');

const foodList = require('../rsc/data/food.json');

const weekday = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
];

/* 식단 평가하는 함수 */
async function evaluation() {
  /* 오늘이 무슨 요일인지 알아내기  */
  const today = new Date();
  const dayOfWeek = today.getDay() - 1;

  let score = 0;
  let booL = false;

  /* 스크랩핑하는 부분 */
  const arr = await scraping(
    'https://sobi.chonbuk.ac.kr/menu/week_menu.php'
  );

  /* 몇 점짜리 음식 유형인지 계산 */

  arr[dayOfWeek].forEach((food) => {
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

  score = Math.round(score / arr[dayOfWeek].length);

  return `${weekday[dayOfWeek]}: ${arr[dayOfWeek]} - ${score}점`;
}

module.exports = evaluation;

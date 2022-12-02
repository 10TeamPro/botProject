/* const webscrap = require('./webscrap');

const foodList = require('../rsc/data/food.json'); 주석 지워주세요. */

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
  /* let score = 0; 주석 지워주세요. */

  /* 스크랩핑하는 부분 */
  /* const arr = await webscrap(); 주석 지워주세요. */

  console.log(weekday[dayOfWeek]);
  /* console.log(arr[dayOfWeek]); 주석 지워주세요. */

  /* 몇 점짜리 음식 유형인지 계산 */

  /* arr[dayOfWeek].forEach((food) => {
    if (food.includes(foodList[3])) score += 3;
    else if (food.includes(foodList[2])) score += 2;
    else score += 1;
  }); 

  score /= arr[dayOfWeek].length; 주석지워주세요. */
  /* console.log(score); 주석 지워주세요. */
}

evaluation();

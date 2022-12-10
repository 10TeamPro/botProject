const evaluation = require('./evaluation');
const evaluationWeek = require('./evaluationWeek');

const menu = (day, type) => {
  if (day % 6 === 0) {
    return '주말 | 공휴일은 제공되지 않습니다.'
  }

  switch (type) {
    case '오늘밥뭐야':
      return evaluation();
    case '이번주식단':
      return evaluationWeek();
    default:
      return "UNEXPECTED ERROR ON MENU"
  }
};

module.exports = menu;

const fs = require('fs');

const data = fs.readFileSync('rsc/data/schedule.txt').toString().split('\n');

const parseDate = (date, duration) => {
  const [start, end] = duration.split(':')[0].split('-');

  const startDate = new Date(start);
  const endDate = new Date(end);
  const currentDate = new Date(date);

  return startDate <= currentDate && currentDate <= endDate;

};

/** 날짜 포맷 형식을 맞춥니다 ex) 1/3 -> 01/03 */
const uniformFormat = (input) => {
  if (!input.includes('/'))
    return input;

  let [month, day] = input.split('/');
  if (Number(month) < 10) {
    month = `0${month}`;
  }
  if (Number(day) < 10) {
    day = `0${day}`;
  }
  return `${month}/${day}`;
};

const schedule = (date) => {

    let stringBuffer = '';

    /** 날짜 정규식 */
    const datePattern = /(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

    /** @exception 정규식에 부합하지 않으면 바로 반환합니다. */
    if (!datePattern.test(uniformFormat(date))) {
      return {
        msg: '올바른 날짜를 입력하세요',
        success: false
      };
    }

    /** 가지고 있는 데이터에서 입력받은 날짜를 확인합니다. */
    data.forEach((dateElement) => {
      if (dateElement.includes(date)) {
        stringBuffer += `${dateElement}\n`;
      } else if (dateElement.includes('-')) {
        stringBuffer += parseDate(date, dateElement) ? `${dateElement}\n` : '';
      }
    });

    return {
      msg: stringBuffer === '' ?
        '해당 날짜에는 행사가 없습니다!' : stringBuffer,
      success: true
    };
  }
;


module.exports = schedule;
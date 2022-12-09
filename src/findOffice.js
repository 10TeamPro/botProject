const fs = require('fs');
const levenshtein = require('fast-levenshtein');

const dataInput = fs
  .readFileSync('./rsc/data/dept.txt', 'utf-8')
  .toString()
  .split('\n');

/* 파일에서 학과의 사무실 위치 탐색 */
function findOffice(department) {
  let distance = 0;
  let office = 'undefined';
  let realDepart = 'undefined';
  let rawData = [];
  let result = '학과 이름을 올바르게 입력해주세요.';
  let data = '';

  const trimmedInput = department.replace(/ /gi, '');

  // eslint-disable-next-line array-callback-return
  dataInput.some((element) => {

    data = element.split('-');
    const trimmedData = data[0].replace(/ /gi, '');
    rawData = trimmedData.substring(0, trimmedInput.length);

    distance = levenshtein.get(trimmedInput.toLowerCase(), trimmedData.toLowerCase());
    const distanceType2 = levenshtein.get(trimmedInput.toLowerCase(), rawData.toLowerCase());

    if (trimmedData.toLowerCase() === trimmedInput.toLowerCase()) {
      result = data[1].trim();
      return true;
    }

    if (distance < 6) {
      realDepart = data[0].trim();
      office = data[1].trim();
      result = `${realDepart}을 말씀하시는건가요? ${office} 입니다.`;
      return true;
    }
    if (distanceType2 < 4) {
      console.log('OK');

      result = `${data[0]}을 말씀하시는건가요? ${data[1]} 입니다.`;
      return true;
    }
    return false;
  });

  console.log('HELLO');
  return {
    msg: result,
    success: result !== '학과 이름을 올바르게 입력해주세요.'
  };

}

module.exports = findOffice;

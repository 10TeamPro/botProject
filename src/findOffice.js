const fs = require('fs');
const levenshtein = require('fast-levenshtein');

const dataInput = fs
  .readFileSync('./rsc/data/dept.txt', 'utf-8')
  .toString()
  .split('\n');

/* 파일에서 학과의 사무실 위치 탐색 */
function findOffice(department) {
  let distance = 0;
  let min = 100;
  let office = 'undefined';
  let realDepart = 'undefined';
  let lowDept = 'undefined';
  let result = '학과 이름을 올바르게 입력해주세요.';
  let data = '';

  const trimmedInput = department.replace(/ /gi, '');

  dataInput.forEach((element) => {
    data = element.split('-');
    const trimmedData = data[0].replace(/ /gi, '');
    // 입력으로 들어온 학과의 사무실을 찾았을 경우
    if (
      trimmedData.toLowerCase() ===
      trimmedInput.toLowerCase()
    ) {
      result = data[1].trim();
    }
    // 입력과 일치하는 이름이 없을 경우 비슷한 이름 탐색
    else {
      lowDept = department.toLowerCase();
      trimmedData.forEach((word) => {
        distance = levenshtein.get(lowDept, word);
        if (distance < min && word !== 'and') {
          min = distance;
          realDepart = data[0].trim();
          office = data[1].trim();
        }
      });

      office = `${realDepart}를 말씀하시는건가요? ${office} 입니다.`;
    }
  });

  return {
    msg: result,
    success:
      result !== '학과 이름을 올바르게 입력해주세요.',
  };
}

module.exports = findOffice;

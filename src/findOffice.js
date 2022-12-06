const fs = require('fs');

const dataInput = fs
  .readFileSync('./rsc/data/dept.txt', 'utf-8')
  .toString()
  .split('\n');

/* 파일에서 학과의 사무실 위치 탐색 */
function findOffice(department) {
  let result = '학과 이름을 올바르게 입력해주세요.';
  let data = '';

  const trimmedInput = department.replace(/ /gi, '');

  /* 입력으로 들어온 학과의 사무실을 찾았을 경우 */
  dataInput.forEach((element) => {
    data = element.split('-');
    const trimmedData = data[0].replace(/ /gi, '');
    if (trimmedData.toLowerCase() === trimmedInput.toLowerCase()) {
      result = data[1].trim();
    }
  });

  return { msg: result, success: result !== '학과 이름을 올바르게 입력해주세요.' };
}

module.exports = findOffice

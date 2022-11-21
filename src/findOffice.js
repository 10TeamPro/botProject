const fs = require('fs');

const dataInput = fs
  .readFileSync('./rsc/data/dept.txt', 'utf-8')
  .toString()
  .split('\n');

/* 파일에서 학과의 사무실 위치 탐색 */
function findOffice(department) {
  let office = 'undefined';
  let buffer = '';

  /* 입력으로 들어온 학과의 사무실을 찾았을 경우 */
  dataInput.forEach((element) => {
    if (element.includes(department)) {
      buffer = element.split('-');
      office = buffer[1].trim();
    }
  });

  return office;
}

module.exports = findOffice;

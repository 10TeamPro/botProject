const fs = require('fs');
const closest = require('fastest-levenshtein');

const dataInput = fs
  .readFileSync('./rsc/data/dept.txt', 'utf-8')
  .toString()
  .split('\n');

/* 파일에서 학과의 사무실 위치 탐색 */
function findOffice(department) {
  let office = 'undefined';
  let realDepart = 'undefined';
  let buffer = '';

  /* 입력으로 들어온 학과의 사무실 찾기 */
  dataInput.forEach((element) => {
    if (element.includes(department)) {
      buffer = element.split('-');
      office = buffer[1].trim();
    } else {
      realDepart = closest(department, element);
      realDepart = realDepart[0].trim();
      office = `${department}를 말씀하시는건가요? ${realDepart} 입니다.`;
    }
  });

  return office;
}

module.exports = findOffice;

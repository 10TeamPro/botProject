const { assert } = require('chai');
const findOffice = require('../src/findOffice');

/* 학과의 사무실 주소정보 매핑되어 있는 map */
const locationInfo = [
  { department: 'Architectural Engineering', office: 'College of Engineering Building 1, 132' },
  { department: 'Mechanical Engineering', office: 'College of Engineering Building 4, 212' },
  { department: 'Urban Engineering', office: 'College of Engineering Building 9, 917' },
  { department: 'Electronic Engineering', office: 'College of Engineering Building 7, 224' },
  {
    department: 'Computer Science and Engineering',
    office: 'College of Engineering Building 7, 224',
  },
  { department: 'Chemical Engineering', office: 'College of Engineering Building 6, 999' },
  { department: 'Accounting', office: 'College of Commerce 2, 9999' },
  { department: 'International Trade', office: 'College of Commerce 1, 9999' },
  { department: 'Korean Language and Literature', office: 'College of Humanities, 320' },
  { department: 'Library and Information Science', office: 'College of Humanities, 427' },
];

describe('학과 사무실 찾기 테스트', () => {
  it('sayOffice should return departmentOffice', () => {
    locationInfo.forEach((element) => {
      assert.equal(findOffice(element.department), element.office);
    });
  });
});

const { expect } = require('chai');

const schedule = require('../src/schedule');

const inputValid = ['8/4', '8/22', '9/1', '9/4', '10/15', '10/19', '10/27', '11/3', '11/24', '12/21', '12/23'];

const exceptionValid = ['123', '123/123', '999999999999', 'hi', 'hello', '여보세요', '13/12'];

describe('학사일정 테스트', () => {
  it('Valid  Input Should return true ', () => {
    inputValid.forEach((input) => {
      expect(schedule(input).success).to.equal(true);
    });

  });
  it('Invalid Input Should return false', () => {
    exceptionValid.forEach((input) => {
      expect(schedule(input).success).to.equal(false);
    });
  });
});
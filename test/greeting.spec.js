const sinon = require('sinon');
const assert = require('assert');
const greeting = require('../src/greeting');

const greetArray = [
  "Hi. We're here to help",
  'Good to see you!',
  'Hi',
];

describe('인사 테스트', () => {
  it('Case 0', () => {
    const stub = sinon.stub(Math, 'random').returns(0 / 3);
    stub();
    assert.equal(greeting(), greetArray[0]);
  });
  it('Case 1', () => {
    const stub = sinon.stub(Math, 'random').returns(1 / 3);
    stub();
    assert.equal(greeting(), greetArray[1]);
  });
  it('Case 2', () => {
    const stub = sinon.stub(Math, 'random').returns(2 / 3);
    stub();
    assert.equal(greeting(), greetArray[2]);
  });
});

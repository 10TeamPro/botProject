const assert = require('assert');
const greetings = require('../src/greeting').greeting;

const greetArray = [
  "Hi. We're here to help",
  'Good to see you!',
  'Hi',
];

describe('greeting test', () => {
  it('greetings should return random greeting', () => {
    greetArray.forEach((element) => {
      assert.equal(greetings(), element);
    });
  });
});

const assert = require('assert');
const sayHello = require('../src/test').SayHello;





describe('App test!', () => {
  it('sayHello should return "hello"', () => {
    assert.equal(sayHello(), 'hello');
  });
});

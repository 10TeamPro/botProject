const _ = require('lodash');

const greeting = function (rtm, channel) {
  const greetings = ['Have a good day', 'Good to see you!', 'Hello'];
  const randomValue = _.sample(greetings);
  rtm.sendMessage(randomValue, channel);
};

module.exports = greeting;

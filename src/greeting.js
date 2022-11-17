const greeting = function (rtm, channel) {
  console.log('Greeting Here');
  return rtm.sendMessage('Hello?', channel);
};

module.exports = greeting;

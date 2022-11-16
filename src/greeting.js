const greeting = (rtm, channel) => {
  /* eslint-disable no-console */
  console.log('Greeting Here');
  /* eslint-enable no-console */
  rtm.sendMessage('HIHIHIHIHIHIHIHIHIHII', channel);
};

module.exports = greeting;

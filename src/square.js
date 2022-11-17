const square = (rtm, text, channel) => {
  /* eslint-disable no-console */
  console.log('square : ');
  console.log(text);
  /* eslint-enable no-console */
  return rtm.sendMessage(`:::::${text * text}`, channel);
};

module.exports = square;

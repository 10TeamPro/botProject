const square = (rtm, text, channel) => {
  /* eslint-disable no-console */
  console.log('square : ');
  return rtm.sendMessage(`${text * text}`, channel);
};

module.exports = square;

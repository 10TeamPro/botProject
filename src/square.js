const square = function (rtm, text, channel) {
  console.log('square : ');
  console.log(text);
  rtm.sendMessage(`:::::${text * text}`, channel);
};

module.exports = square;

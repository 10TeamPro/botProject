const greeting = (rtm, channel) => {
  const greetings = [
    "Hi. We're here to help",
    'Good to see you!',
    'Hi',
  ];
  const randomValue = Math.floor(
    Math.random() * greetings.length
  );
  rtm.sendMessage(randomValue, channel);
};

module.exports = greeting;

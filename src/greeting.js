const greeting = () => {
  const greetings = [
    "Hi. We're here to help",
    'Good to see you!',
    'Hi',
  ];
  const randomValue = Math.floor(
    Math.random() * greetings.length
  );
  return greetings[randomValue];
};

module.exports = greeting;

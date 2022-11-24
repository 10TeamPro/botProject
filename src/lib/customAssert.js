function check(condition, msg) {
  return new Promise((resolve, reject) => {
    if (condition) resolve();
    reject(msg);
  });
}

module.exports = check;

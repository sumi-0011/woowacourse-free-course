const { validInteger } = require('./validation');

const convertToInteger = (value) => {
  validInteger(value);
  return Number.parseInt(value, 10);
};

module.exports = {
  convertToInteger,
};

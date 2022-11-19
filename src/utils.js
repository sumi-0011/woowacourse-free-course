const { validInteger } = require('./validation');

const convertToInteger = (value) => {
  try {
    validInteger(value);
  } catch (error) {
    console.log('error: ', error);
  }
  return Number.parseInt(value, 10);
};

module.exports = {
  convertToInteger,
};

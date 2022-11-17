const { MOVING } = require('./Constant');

/**
 * @param {string} value
 * @returns {boolean | ERROR}
 */
const validInteger = (value) => {
  const regex = /^[0-9]+$/;
  const number = parseInt(value, 10);

  if (regex.test(number)) {
    return true;
  }

  throw new Error('[ERROR] 입력값이 정수가 아닙니다');
};

const validMoveInput = (answer) => {
  if (MOVING.includes(answer)) {
    return true;
  }
  throw new Error('[ERROR] "U"또는 "D"를 입력하여야 합니다. (위: U, 아래: D)');
};

module.exports = {
  validInteger,
  validMoveInput,
};

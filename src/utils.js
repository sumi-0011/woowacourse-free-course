const { Console } = require('@woowacourse/mission-utils');
const { validInteger } = require('./validation');
const { ERROR_MESSAGE } = require('./Constant');

/**
 * @param {string} value
 * @returns {int}
 */
const convertToInteger = (value) => {
  try {
    validInteger(value);
  } catch (error) {
    Console.print(ERROR_MESSAGE.wrong_input);
  }
  return Number.parseInt(value, 10);
};

/**
 * @param {<'O' | 'X'>[]} paths
 * @returns {<'O' | 'X' | ' '>[][]} [resU, resD]
 */
const calcMap = (paths) => {
  let resU = [];
  let resD = [];
  paths.forEach(({ move, isFail }) => {
    const OX = isFail ? 'X' : 'O';
    move === 'U' ? resU.push(OX) : resU.push(' ');
    move === 'D' ? resD.push(OX) : resD.push(' ');
  });
  return [resU, resD];
};

module.exports = {
  convertToInteger,
  calcMap,
};

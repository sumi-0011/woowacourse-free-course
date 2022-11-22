const {
  MOVING_COMMAND,
  ERROR_MESSAGE,
  GAME_COMMANDS,
} = require('./utils/constants');
const { Console } = require('@woowacourse/mission-utils');

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

  throw new Error(ERROR_MESSAGE.wrong_input);
};

/**
 * @param {any[]} list
 * @param {string} value 배열안에 있는지 검증할 값
 * @returns
 */
const validIncludeValue = (list, value) => {
  if (list.includes(value)) {
    return true;
  }

  throw new Error(ERROR_MESSAGE.wrong_input);
};

/**
 * @param {number} number
 * @returns {ERROR | true}
 */
const validNumber = (number) => {
  if (Number.isNaN(number)) {
    throw new Error('[ERROR] 입력값이 NaN입니다.');
  }
  return true;
};

/**
 * @param  {...number} numbers
 */
const validNumbers = (...numbers) => {
  numbers.forEach((number) => {
    validNumber(number);
  });
};

/**
 * @param {number} number
 * @param {number} minBound
 * @param {number} maxBound
 */
const validInBound = (number, minBound, maxBound) => {
  validNumbers(number, minBound, maxBound);
  if (number < minBound || number > maxBound) {
    throw new Error(ERROR_MESSAGE.wrong_input);
  }
  return true;
};

const validBridgeSizeInput = (value) => {
  try {
    validInteger(value);
    validInBound(value, 3, 20);
    return true;
  } catch (error) {
    Console.print(ERROR_MESSAGE.wrong_bridge_size_input);
    return false;
  }
};

const validMoveInput = (answer) => {
  try {
    validIncludeValue(MOVING_COMMAND, answer);
    return true;
  } catch (error) {
    Console.print(ERROR_MESSAGE.wrong_move_command);
    return false;
  }
};

const validGameCommand = (answer) => {
  try {
    validIncludeValue(GAME_COMMANDS, answer);
    return true;
  } catch (error) {
    Console.print(ERROR_MESSAGE.wrong_game_command);
    return false;
  }
};

module.exports = {
  validInteger,
  validMoveInput,
  validGameCommand,
  validBridgeSizeInput,
};

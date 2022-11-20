const {
  MOVING_COMMAND_LIST,
  ERROR_MESSAGE,
  GAME_COMMANDS,
} = require('./Constant');
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

const validBridgeSizeInput = (value) => {
  try {
    validInteger(value);
    return true;
  } catch (error) {
    Console.print(ERROR_MESSAGE.wrong_bridge_size_input);
    return false;
  }
};

const validMoveInput = (answer) => {
  try {
    validIncludeValue(MOVING_COMMAND_LIST, answer);
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

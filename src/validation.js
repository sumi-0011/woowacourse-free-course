const { MOVING, GAME_COMMAND } = require('./Constant');
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

  throw new Error('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
};

const validIncludeValue = (list, value) => {
  if (list.includes(value)) {
    return true;
  }
  throw new Error('[ERROR] 잘못된 입력입니다.');
};

const validBridgeSizeInput = (value) => {
  try {
    validInteger(value);

    return true;
  } catch (error) {
    Console.print('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    return false;
  }
};

const validMoveInput = (answer) => {
  try {
    validIncludeValue(MOVING, answer);

    return true;
  } catch (error) {
    Console.print('[ERROR] "U"또는 "D"를 입력하여야 합니다. (위: U, 아래: D)');

    return false;
  }
};

const validGameCommand = (answer) => {
  try {
    const gameCommand = [GAME_COMMAND.RETRY, GAME_COMMAND.QUIT];
    validIncludeValue(gameCommand, answer);

    return true;
  } catch (error) {
    Console.print(
      '[ERROR] "R"또는 "Q"를 입력하여야 합니다. (재시도: R, 종료: Q)',
    );

    return false;
  }
};

module.exports = {
  validInteger,
  validMoveInput,
  validGameCommand,
  validBridgeSizeInput,
};

const { Console } = require('@woowacourse/mission-utils');
const { GAME_COMMAND } = require('./Constant');
const { convertToInteger } = require('./utils');
const {
  validMoveInput,
  validGameCommand,
  validBridgeSizeInput,
} = require('./validation');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(callback) {
    this.readLine(
      '다리의 길이를 입력해주세요.',
      (answer) => {
        const bridgeSize = Number.parseInt(answer, 10);
        callback(bridgeSize);
      },
      validBridgeSizeInput,
    );
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(callback) {
    this.readLine(
      '이동할 칸을 선택해주세요. (위: U, 아래: D)',
      (answer) => {
        callback(answer);
      },
      validMoveInput,
    );
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(callback) {
    this.readLine(
      '게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)',
      (answer) => {
        const isRetry = GAME_COMMAND.RETRY === answer;
        callback(isRetry);
      },
      validGameCommand,
    );
  },

  readLine(msg, callback, validation) {
    Console.readLine(msg, (answer) => {
      const isSuccess = validation ? validation(answer) : true;

      isSuccess ? callback(answer) : this.readLine(msg, callback, validation);
    });
  },
};

module.exports = InputView;

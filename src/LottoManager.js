const { Console } = require('@woowacourse/mission-utils');
const {
  validInputBonusNumber,
  validInputWinningNumber,
} = require('./validation');
const { convertToInteger } = require('./utils');

class LottoManager {
  #winningNumber;
  #bonusNumber;

  constructor() {
    this.#winningNumber = [];
    this.#bonusNumber = 0;
  }

  inputWinningNumber(callback) {
    this.#readLine('당첨 번호를 입력해 주세요.', (answer) => {
      const numbers = answer.split(',').map((str) => convertToInteger(str));
      this.#setWinningNumber([...numbers]);

      callback();
    });
  }

  inputBouseNumber(callback) {
    this.#readLine('보너스 번호를 입력해 주세요.', (answer) => {
      const bonusNumber = convertToInteger(answer);

      this.#setBonusNumber(bonusNumber);

      callback();
    });
  }

  getBouseNumber() {
    return this.#bonusNumber;
  }

  getWinningNumber() {
    return this.#winningNumber;
  }

  #setWinningNumber(winningNumber) {
    validInputWinningNumber(winningNumber);

    this.#winningNumber = winningNumber;
  }

  #setBonusNumber(bonusNumber) {
    validInputBonusNumber(this.#winningNumber, bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  #readLine(msg, callback) {
    Console.readLine(`${msg}\n`, (answer) => {
      this.#print('\n');

      callback(answer.trim());
    });
  }

  #print(msg) {
    Console.print(msg);
  }
}

module.exports = LottoManager;

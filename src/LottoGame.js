const { Console } = require('@woowacourse/mission-utils');
const { validInteger, validThousandWonUnit } = require('./validation');
class LottoGame {
  constructor() {}

  startGame() {
    this.print('구입금액을 입력해 주세요.', (answer) => {
      validInteger(answer);
      validThousandWonUnit(answer);

      this.exit();
    });
  }
  print(msg, callback) {
    Console.readLine(msg, (answer) => {
      callback(answer);
    });
  }

  exit() {
    Console.close();
  }
}

module.exports = LottoGame;

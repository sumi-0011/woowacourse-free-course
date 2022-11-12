const { Console } = require('@woowacourse/mission-utils');
const { validInteger, validThousandWonUnit } = require('./validation');
const { getRandomNumbers, calcPortion } = require('./utils');
const LOTTO_PRICE = 1000;

class LottoGame {
  constructor() {}

  startGame() {
    this.print('구입금액을 입력해 주세요.', (answer) => {
      validInteger(answer);
      validThousandWonUnit(answer);
      const money = parseInt(answer);

      const lottoCount = calcPortion(money, LOTTO_PRICE);

      console.log('lottoCount: ', lottoCount);
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

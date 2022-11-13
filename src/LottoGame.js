const { Console } = require('@woowacourse/mission-utils');
const { validInteger, validThousandWonUnit } = require('./validation');
const { getRandomNumbers, calcPortion } = require('./utils');
const Lotto = require('./Lotto');

const LOTTO_MIN_BOUND = 1;
const LOTTO_MAX_MOUND = 45;
const LOTTO_COUNT = 6;
const LOTTO_PRICE = 1000;

class LottoGame {
  constructor() {
    this.lottos = [];
  }

  startGame() {
    this.readLine('구입금액을 입력해 주세요.', (answer) => {
      validInteger(answer);
      validThousandWonUnit(answer);
      const money = parseInt(answer);

      const lottoCount = calcPortion(money, LOTTO_PRICE);
      this.publishLottos(lottoCount);
      this.printLottos();
      this.exit();
    });
  }

  publishLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const newLotto = this.publishLotto();
      lottos.push(newLotto);
    }
    this.lottos = lottos;
  }

  publishLotto() {
    const randomNumbers = getRandomNumbers(
      LOTTO_COUNT,
      LOTTO_MIN_BOUND,
      LOTTO_MAX_MOUND
    );

    randomNumbers.sort();
    const lotto = new Lotto(randomNumbers);
    return lotto;
  }

  printLottos() {
    this.lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      this.print(lottoNumbers);
    });
  }

  print(msg) {
    Console.print(msg);
  }

  readLine(msg, callback) {
    Console.readLine(msg, (answer) => {
      callback(answer);
    });
  }

  exit() {
    Console.close();
  }
}

module.exports = LottoGame;

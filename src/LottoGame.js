/* eslint-disable class-methods-use-this */
const { Console } = require('@woowacourse/mission-utils');
const {
  validInteger,
  validThousandWonUnit,
  validListLength,
  validBoundInsideNumber,
  validBoundInsideNumberList,
} = require('./validation');
const { getRandomNumbers, calcPortion } = require('./utils');
const Lotto = require('./Lotto');

const LOTTO_MIN_BOUND = 1;
const LOTTO_MAX_MOUND = 45;
const LOTTO_COUNT = 6;
const LOTTO_PRICE = 1000;

const INIT_WINNING_COUNT = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

class LottoGame {
  constructor() {
    this.lottos = [];
    this.winningNumber = [];
    this.bonus = -1;
  }

  startGame() {
    this.readLine('구입금액을 입력해 주세요.', (answer) => {
      const lottoCount = this.getLottoCount(answer);

      this.publishLottos(lottoCount);

      this.inputWinningNumber();
    });
  }

  inputWinningNumber() {
    this.readLine('당첨 번호를 입력해 주세요.', (answer) => {
      const numbers = answer.split(',').map((str) => parseInt(str, 10));

      validListLength(numbers, 6);
      validBoundInsideNumberList(numbers, 1, 45);

      this.winningNumber = [...numbers];

      this.inputBonusNumber();
    });
  }

  //   guessWin() {
  //     console.log('guessWin: ', guessWin);
  //   }

  inputBonusNumber() {
    this.readLine('보너스 번호를 입력해 주세요.', (answer) => {
      const bonusNumber = parseInt(answer, 10);

      validBoundInsideNumber(bonusNumber, 1, 45);

      this.bonus = bonusNumber;

      this.guessWinningDetails();
    });
  }

  guessWinningDetails() {
    const winning = { ...INIT_WINNING_COUNT };

    this.lottos.forEach((lotto) => {
      const rank = this.guessLottoRank(lotto);

      if (rank !== -1) {
        winning[rank] += 1;
      }
    });

    console.log('winning: ', winning);
  }

  guessLottoRank(lotto) {
    const lottoNumbers = lotto.getNumbers();
    const isMatchBonus =
      lottoNumbers.findIndex((num) => num === this.bonus) !== -1;

    const matchCount = this.checkMatchNumberCount(
      lottoNumbers,
      this.winningNumber,
    );

    const result = this.getWinningRank(matchCount, isMatchBonus);
    return result;
  }

  getWinningRank(matchCount, isMatchBonus) {
    switch (matchCount) {
      case 6:
        return 1;
      case 5:
        return isMatchBonus ? 2 : 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return -1;
    }
  }

  checkMatchNumberCount(lottoNumber, winningNumber) {
    const intersection = lottoNumber.filter((it) => winningNumber.includes(it));
    return intersection.length;
  }

  getLottoCount(answer) {
    validInteger(answer);
    validThousandWonUnit(answer);

    const money = parseInt(answer, 10);
    const lottoCount = calcPortion(money, LOTTO_PRICE);

    return lottoCount;
  }

  publishLottos(count) {
    const lottos = [];

    for (let i = 0; i < count; i += 1) {
      const newLotto = this.publishLotto();
      lottos.push(newLotto);
    }

    this.lottos = lottos;

    this.print(`${count}개를 구매했습니다.`);
    this.printLottos();
  }

  publishLotto() {
    const randomNumbers = getRandomNumbers(
      LOTTO_COUNT,
      LOTTO_MIN_BOUND,
      LOTTO_MAX_MOUND,
    );

    randomNumbers.sort((a, b) => a - b);

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
      callback(answer.trim());
    });
  }

  exit() {
    Console.close();
  }
}

module.exports = LottoGame;

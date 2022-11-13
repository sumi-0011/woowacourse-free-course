/* eslint-disable class-methods-use-this */
const { Console } = require('@woowacourse/mission-utils');
const {
  validInteger,
  validThousandWonUnit,
  validListLength,
  validBoundInsideNumber,
  validBoundInsideNumberList,
  validNoDuplication,
  validExistedDuplication,
} = require('./validation');
const {
  getRandomNumbers,
  calcPortion,
  roundNDigit,
  getIntersectionList,
} = require('./utils');
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

const WINNING_AMOUNT = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
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
      validNoDuplication(numbers);

      this.winningNumber = [...numbers];

      this.print('/n');

      this.inputBonusNumber();
    });
  }

  inputBonusNumber() {
    this.readLine('보너스 번호를 입력해 주세요.', (answer) => {
      const bonusNumber = parseInt(answer, 10);

      validBoundInsideNumber(bonusNumber, 1, 45);
      validExistedDuplication(this.winningNumber, [bonusNumber]);

      this.bonus = bonusNumber;

      this.print('/n');

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

    const earningRate = this.getEarningsRate(winning);

    this.printWinningDetail(winning);
    this.printEarningRate(earningRate);

    this.exit();
  }

  printWinningDetail(winning) {
    this.print('당첨 통계');
    this.print('---');
    this.print(`3개 일치 (5,000원) - ${winning[5]}개`);
    this.print(`4개 일치 (50,000원) - ${winning[4]}개`);
    this.print(`5개 일치 (1,500,000원) - ${winning[3]}개`);
    this.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winning[2]}개`);
    this.print(`6개 일치 (2,000,000,000원) - ${winning[1]}개`);
  }

  printEarningRate(earningRate) {
    this.print(`총 수익률은 ${earningRate}%입니다.`);
  }

  getEarningsRate(winning) {
    const purchaseLottoCount = this.lottos.length;
    const purchaseMoney = purchaseLottoCount * LOTTO_PRICE;

    let totalAmount = 0;

    Object.keys(winning).forEach((rank) => {
      totalAmount += winning[rank] * WINNING_AMOUNT[rank];
    });
    return roundNDigit((totalAmount / purchaseMoney) * 100, 2);
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
    const intersection = getIntersectionList(lottoNumber, winningNumber);

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
      const printStr = `[${lottoNumbers.join(', ')}]`;
      this.print(printStr);
    });
    this.print('\n');
  }

  print(msg) {
    Console.print(msg);
  }

  readLine(msg, callback) {
    Console.readLine(`${msg}\n`, (answer) => {
      callback(answer.trim());
    });
  }

  exit() {
    Console.close();
  }
}

module.exports = LottoGame;

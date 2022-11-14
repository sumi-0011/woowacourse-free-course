/* eslint-disable class-methods-use-this */
const { Console } = require('@woowacourse/mission-utils');
const {
  validPurchaseLotto,
  validInputWinningNumber,
  validInputBonusNumber,
} = require('./validation');
const {
  getRandomNumbers,
  calcPortion,
  roundNDigit,
  getIntersectionList,
  convertToInteger,
} = require('./utils');
const {
  LOTTO_MIN_BOUND,
  LOTTO_MAX_MOUND,
  LOTTO_COUNT,
  LOTTO_PRICE,
  INIT_WINNING_COUNT,
  WINNING_AMOUNT,
} = require('./Constant');
const Lotto = require('./Lotto');

class LottoGame {
  #lottos;
  #winningNumber;
  #bonus;

  constructor() {
    this.#lottos = [];
    this.#winningNumber = [];
    this.#bonus = -1;
  }

  startGame() {
    this.#purchaseLottoStep();
  }

  #purchaseLottoStep() {
    this.#readLine('구입금액을 입력해 주세요.', (answer) => {
      validPurchaseLotto(answer);

      const lottoCount = this.#getLottoCount(answer);

      this.#publishLottos(lottoCount);

      this.#inputWinningNumberStep();
    });
  }

  #inputWinningNumberStep() {
    this.#readLine('당첨 번호를 입력해 주세요.', (answer) => {
      const numbers = answer.split(',').map((str) => convertToInteger(str));

      validInputWinningNumber(numbers);

      this.#winningNumber = [...numbers];

      this.#inputBonusNumberStep();
    });
  }

  #inputBonusNumberStep() {
    this.#readLine('보너스 번호를 입력해 주세요.', (answer) => {
      const bonusNumber = convertToInteger(answer);

      validInputBonusNumber(this.#winningNumber, bonusNumber);

      this.#bonus = bonusNumber;

      this.#guessWinningDetailStep();
    });
  }

  #guessWinningDetailStep() {
    const winning = this.#getWinningRankCount();
    const earningRate = this.#getEarningsRate(winning);

    this.#printWinningDetail(winning);
    this.#printEarningRate(earningRate);

    this.#exit();
  }

  #publishLottos(count) {
    const lottos = [];

    for (let i = 0; i < count; i += 1) {
      const newLotto = this.#publishLotto();
      lottos.push(newLotto);
    }

    this.#lottos = lottos;

    this.#print(`${count}개를 구매했습니다.`);
    this.#printLottos();
  }

  #publishLotto() {
    const randomNumbers = getRandomNumbers(
      LOTTO_COUNT,
      LOTTO_MIN_BOUND,
      LOTTO_MAX_MOUND,
    );

    randomNumbers.sort((a, b) => a - b);

    const lotto = new Lotto(randomNumbers);
    return lotto;
  }

  #getLottoCount(answer) {
    const money = convertToInteger(answer);
    const lottoCount = calcPortion(money, LOTTO_PRICE);

    return lottoCount;
  }

  #getWinningRankCount() {
    const winning = { ...INIT_WINNING_COUNT };

    this.#lottos.forEach((lotto) => {
      const rank = this.#guessLottoRank(lotto);

      if (rank !== -1) {
        winning[rank] += 1;
      }
    });

    return winning;
  }

  #checkMatchNumberCount(lottoNumber, winningNumber) {
    const intersection = getIntersectionList(lottoNumber, winningNumber);

    return intersection.length;
  }

  #guessLottoRank(lotto) {
    const lottoNumbers = lotto.getNumbers();
    const isMatchBonus =
      lottoNumbers.findIndex((num) => num === this.#bonus) !== -1;

    const matchCount = this.#checkMatchNumberCount(
      lottoNumbers,
      this.#winningNumber,
    );

    const result = this.#getWinningRank(matchCount, isMatchBonus);
    return result;
  }

  #getWinningRank(matchCount, isMatchBonus) {
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

  #getEarningsRate(winning) {
    const purchaseLottoCount = this.#lottos.length;
    const purchaseMoney = purchaseLottoCount * LOTTO_PRICE;

    let totalAmount = 0;

    Object.keys(winning).forEach((rank) => {
      totalAmount += winning[rank] * WINNING_AMOUNT[rank];
    });
    return roundNDigit((totalAmount / purchaseMoney) * 100, 2);
  }

  #printWinningDetail(winning) {
    this.#print('당첨 통계');
    this.#print('---');
    this.#print(`3개 일치 (5,000원) - ${winning[5]}개`);
    this.#print(`4개 일치 (50,000원) - ${winning[4]}개`);
    this.#print(`5개 일치 (1,500,000원) - ${winning[3]}개`);
    this.#print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winning[2]}개`);
    this.#print(`6개 일치 (2,000,000,000원) - ${winning[1]}개`);
  }

  #printEarningRate(earningRate) {
    this.#print(`총 수익률은 ${earningRate}%입니다.`);
  }

  #printLottos() {
    this.#lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      const printStr = `[${lottoNumbers.join(', ')}]`;
      this.#print(printStr);
    });
    this.#print('\n');
  }

  #print(msg) {
    Console.print(msg);
  }

  #readLine(msg, callback) {
    Console.readLine(`${msg}\n`, (answer) => {
      this.#print('\n');

      callback(answer.trim());
    });
  }

  #exit() {
    Console.close();
  }
}

module.exports = LottoGame;

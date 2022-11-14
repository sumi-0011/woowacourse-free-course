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
    this.#inputPurchaseMoney();
  }

  #inputPurchaseMoney() {
    this.#readLine('구입금액을 입력해 주세요.', (answer) => {
      this.purchaseLottoStep(answer);

      this.#printLottos();

      this.#inputWinningNumber();
    });
  }

  #inputWinningNumber() {
    this.#readLine('당첨 번호를 입력해 주세요.', (answer) => {
      this.#winningNumberStep(answer);

      this.#inputBonusNumber();
    });
  }

  #inputBonusNumber() {
    this.#readLine('보너스 번호를 입력해 주세요.', (answer) => {
      this.#bonusNumberStep(answer);

      this.#guessWinningDetail();
    });
  }

  #guessWinningDetail() {
    const { winning, totalAmount } = this.getWinningRankCount();
    const earningRate = this.getEarningsRate(totalAmount);

    this.#printWinningDetail(winning);
    this.#printEarningRate(earningRate);

    this.#exit();
  }

  purchaseLottoStep(answer) {
    validPurchaseLotto(answer);

    const money = convertToInteger(answer);
    const lottoCount = calcPortion(money, LOTTO_PRICE);

    this.#lottos = this.publishLottos(lottoCount);
  }

  #winningNumberStep(answer) {
    const numbers = answer.split(',').map((str) => convertToInteger(str));

    validInputWinningNumber(numbers);

    this.#winningNumber = [...numbers];
  }

  #bonusNumberStep(answer) {
    const bonusNumber = convertToInteger(answer);

    validInputBonusNumber(this.#winningNumber, bonusNumber);

    this.#bonus = bonusNumber;
  }

  publishLottos(count) {
    const lottos = [];

    for (let i = 0; i < count; i += 1) {
      const newLotto = this.publishLotto();
      lottos.push(newLotto);
    }

    return lottos;
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

  getWinningRankCount() {
    const winning = { ...INIT_WINNING_COUNT };
    let totalAmount = 0;

    this.#lottos.forEach((lotto) => {
      const { rank, money } = lotto.getWinningDetail(
        this.#winningNumber,
        this.#bonus,
      );
      totalAmount += money;

      rank !== -1 ? (winning[rank] += 1) : null;
    });

    return { winning, totalAmount };
  }

  getEarningsRate(totalAmount) {
    const lottoCount = this.#lottos.length;
    const purchaseMoney = lottoCount * LOTTO_PRICE;

    return roundNDigit((totalAmount / purchaseMoney) * 100, 2);
  }

  #printLottos() {
    const lottoCount = this.#lottos.length;
    this.#print(`${lottoCount}개를 구매했습니다.`);

    this.#lottos.forEach((lotto) => {
      this.#print(lotto.print());
    });

    this.#print('\n');
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

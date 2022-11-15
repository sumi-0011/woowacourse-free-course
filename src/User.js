const { Console } = require('@woowacourse/mission-utils');
const { validPurchaseLotto } = require('./validation');
const {
  calcPortion,
  roundNDigit,
  convertToInteger,
  readLineConsole,
  printConsole,
} = require('./utils');
const {
  LOTTO_MIN_BOUND,
  LOTTO_MAX_MOUND,
  LOTTO_COUNT,
  LOTTO_PRICE,
  INIT_WINNING_COUNT,
} = require('./Constant');

class User {
  #lottos;
  constructor() {
    this.#lottos = [];
  }

  setLottos(lottos) {
    // TODO:  로또 validation
    this.#lottos = lottos;
  }

  getLottos() {
    return this.#lottos;
  }

  inputPurchaseMoney(callback) {
    readLineConsole('구입금액을 입력해 주세요.', (answer) => {
      validPurchaseLotto(answer);

      const purchaseLottoCount = this.getLottoCount(answer);
      callback(purchaseLottoCount);
    });
  }

  getLottoCount(answer) {
    const money = convertToInteger(answer);
    const lottoCount = calcPortion(money, LOTTO_PRICE);

    return lottoCount;
  }

  printWinningDetail(winningNumber, bonusNumber) {
    const { winning, earningRate } = this.guessWinningDetail(
      winningNumber,
      bonusNumber,
    );

    this.#printWinningDetail(winning);
    this.#printEarningRate(earningRate);
  }

  guessWinningDetail(winningNumber, bonusNumber) {
    const lottos = this.#lottos;
    const { winning, totalAmount } = this.getWinningDetails(
      lottos,
      winningNumber,
      bonusNumber,
    );
    const earningRate = this.getEarningsRate(totalAmount);

    return { winning, earningRate };
  }

  getWinningDetails(lottos, winningNumber, bonus) {
    const winning = { ...INIT_WINNING_COUNT };
    let totalAmount = 0;

    lottos.forEach((lotto) => {
      const { rank, money } = lotto.getWinningDetail(winningNumber, bonus);
      totalAmount += money;

      rank !== -1 ? (winning[rank] += 1) : null;
    });

    return { winning, totalAmount };
  }

  getEarningsRate(totalAmount) {
    const purchaseMoney = this.#lottos.length * LOTTO_PRICE;

    return roundNDigit((totalAmount / purchaseMoney) * 100, 2);
  }

  printLottos() {
    const lottoCount = this.#lottos.length;
    printConsole(`${lottoCount}개를 구매했습니다.`);

    this.#lottos.forEach((lotto) => {
      printConsole(lotto.print());
    });

    printConsole('\n');
  }

  #printEarningRate(earningRate) {
    printConsole(`총 수익률은 ${earningRate}%입니다.`);
  }

  #printWinningDetail(winning) {
    printConsole('당첨 통계');
    printConsole('---');
    printConsole(`3개 일치 (5,000원) - ${winning[5]}개`);
    printConsole(`4개 일치 (50,000원) - ${winning[4]}개`);
    printConsole(`5개 일치 (1,500,000원) - ${winning[3]}개`);
    printConsole(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winning[2]}개`);
    printConsole(`6개 일치 (2,000,000,000원) - ${winning[1]}개`);
  }
}

module.exports = User;

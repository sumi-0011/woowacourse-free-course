const { Console } = require('@woowacourse/mission-utils');
const { validPurchaseLotto } = require('./validation');
const {
  getRandomNumbers,
  calcPortion,
  roundNDigit,
  convertToInteger,
} = require('./utils');
const {
  LOTTO_MIN_BOUND,
  LOTTO_MAX_MOUND,
  LOTTO_COUNT,
  LOTTO_PRICE,
  INIT_WINNING_COUNT,
} = require('./Constant');
const Lotto = require('./Lotto');
const LottoManager = require('./LottoManager');

class LottoGame {
  #lottos;

  constructor() {
    this.#lottos = [];
    this.lottoManager = new LottoManager();
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
    this.lottoManager.inputWinningNumber(() => {
      this.#inputBonusNumber();
    });
  }

  #inputBonusNumber() {
    this.lottoManager.inputBouseNumber(() => {
      this.#guessWinningDetail();
    });
  }

  #guessWinningDetail() {
    const { winning, totalAmount } = this.getWinningDetails(
      this.#lottos,
      this.lottoManager.getWinningNumber(),
      this.lottoManager.getBouseNumber(),
    );
    const earningRate = this.getEarningsRate(this.#lottos.length, totalAmount);

    this.#printWinningDetail(winning);
    this.#printEarningRate(earningRate);

    this.#exit();
  }

  purchaseLottoStep(answer) {
    validPurchaseLotto(answer);

    const lottoCount = this.getLottoCount(answer);
    this.#lottos = this.publishLottos(lottoCount);
  }

  publishLottos(count) {
    const lottos = [];

    for (let i = 0; i < count; i += 1) {
      const newLotto = this.#publishLotto();
      lottos.push(newLotto);
    }

    return lottos;
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

  getLottoCount(answer) {
    const money = convertToInteger(answer);
    const lottoCount = calcPortion(money, LOTTO_PRICE);

    return lottoCount;
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

  getEarningsRate(lottoCount, totalAmount) {
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

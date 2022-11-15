const { Console } = require('@woowacourse/mission-utils');
const { getRandomNumbers } = require('./utils');

const LottoManager = require('./LottoManager');
const User = require('./User');

class LottoGame {
  constructor() {
    this.lottoManager = new LottoManager();
    this.user = new User();
  }

  startGame() {
    this.#inputPurchaseMoney();
  }

  #inputPurchaseMoney() {
    this.user.inputPurchaseMoney((purchaseLottoCount) => {
      this.#purchaseLottos(purchaseLottoCount);

      this.#inputWinningNumber();
    });
  }

  #purchaseLottos(purchaseLottoCount) {
    this.user.setLottos(lottos);
    this.user.printLottos();
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
    this.user.printWinningDetail(
      this.lottoManager.getWinningNumber(),
      this.lottoManager.getBouseNumber,
    );

    this.#exit();
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
  #exit() {
    Console.close();
  }
}

module.exports = LottoGame;

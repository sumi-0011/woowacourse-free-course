const {
  validNoDuplication,
  validListLength,
  validBoundInsideNumber,
} = require('./validation');
const { getIntersectionList } = require('./utils');
const {
  WINNING_AMOUNT,
  LOTTO_COUNT,
  LOTTO_MIN_BOUND,
  LOTTO_MAX_MOUND,
} = require('./Constant');

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    validListLength(numbers, LOTTO_COUNT);
    validNoDuplication(numbers);
    numbers.forEach((number) => {
      validBoundInsideNumber(number, LOTTO_MIN_BOUND, LOTTO_MAX_MOUND);
    });
  }

  getWinningDetail(winningNumber, bonusNumber) {
    const lottoNumbers = this.#numbers;
    const isMatchBonus =
      lottoNumbers.findIndex((num) => num === bonusNumber) !== -1;

    const matchCount = getIntersectionList(lottoNumbers, winningNumber).length;

    const rank = this.#getWinningRank(matchCount, isMatchBonus);
    const money = this.#getWinningAmount(rank);

    return { rank, money };
  }

  #getWinningAmount(rank) {
    return rank !== -1 ? WINNING_AMOUNT[rank] : 0;
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

  print() {
    return `[${this.#numbers.join(', ')}]`;
  }
}

module.exports = Lotto;

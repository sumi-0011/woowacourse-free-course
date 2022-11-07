const { Random } = require("@woowacourse/mission-utils");

/**
 * n개의 서로 다른 랜덤한 숫자 생성
 * @param {number} n
 * @returns {number[]}
 */
const getRandomNumbers = (n) => {
  const randomNumbers = [];

  while (randomNumbers.length < n) {
    let random = Random.pickNumberInRange(1, 9);
    if (!randomNumbers.includes(random)) {
      randomNumbers.push(random);
    }
  }
  return randomNumbers;
};

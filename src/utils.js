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

/**
 * @param {string} str
 * @returns {number}
 */
const convertStringToNumber = (str) => {
  const res = parseInt(str);

  if (res == isNaN) {
    throw new Error(`${str}은 숫자로 변환할 수 없습니다. `);
  }
  return res;
};

/**
 * @param {string[]} strList Number형 string
 * @returns {number[]}
 */
const convertStringsToNumbers = (strList) => {
  return strList.map((str) => convertStringToNumber(str));
};

module.exports = { getRandomNumbers, convertStringsToNumbers };

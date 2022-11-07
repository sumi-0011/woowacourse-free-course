const { Random } = require("@woowacourse/mission-utils");
const { CONVERT_TO_NUMBER_FAIL } = require("../src/errorMessage");

/**
 * n개의 서로 다른 랜덤한 숫자 생성
 * @param {number} n
 * @param {number} minBound
 * @param {number} maxBound
 * @returns {number[]}
 */
const getRandomNumbers = (n, minBound = 1, maxBound = 9) => {
  const randomNumbers = [];

  while (randomNumbers.length < n) {
    let random = Random.pickNumberInRange(minBound, maxBound);
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

  if (isNaN(res)) {
    throw new Error(CONVERT_TO_NUMBER_FAIL);
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

module.exports = {
  getRandomNumbers,
  convertStringsToNumbers,
  convertStringToNumber,
};

const { Random } = require('@woowacourse/mission-utils');
const { NOT_NUMBER_DIVISION } = require('./errorMessage');

/**
 *  minBound ~ maxBound 사이의 n개의 서로 다른 랜덤한 숫자 생성
 * @param {number} n
 * @param {number} minBound
 * @param {number} maxBound
 * @returns {number[]}
 */
const getRandomNumbers = (n, minBound = 1, maxBound = 9) => {
  const randomNumbers = Random.pickUniqueNumbersInRange(minBound, maxBound, n);

  return randomNumbers;
};

// /**
//  * @param {string} str
//  * @returns {number}
//  */
// const convertStringToNumber = (str) => {
//   const res = Number(str);

//   if (Number.isNaN(res)) {
//     throw new Error(CONVERT_TO_NUMBER_FAIL);
//   }
//   return res;
// };

/**
 * 몫 계산
 * @param {number} number
 * @param {number} divider
 * @returns
 */
const calcPortion = (number, divider) => {
  if (Number.isNaN(number) || Number.isNaN(divider)) {
    throw new Error(NOT_NUMBER_DIVISION);
  }
  return parseInt(number / divider, 10);
};

/**
 * 소수점 n 자리에서 반올림
 * @param {number} number
 * @param {number} n
 * @returns number
 */
const roundNDigit = (number, n) => {
  const pow = 10 ** n;
  const result = Math.round(number * pow) / pow;
  return result;
};

module.exports = {
  getRandomNumbers,
  calcPortion,
  roundNDigit,
};

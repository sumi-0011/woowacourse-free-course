const {
  NOT_THOUSAND_WON_UNIT,
  NOT_INTEGER,
  ERROR_BASIC,
  VALID_INPUT_FAIL,
} = require('./errorMessage');

const validNumber = (...params) => {
  params.forEach((param) => {
    if (Number.isNaN(parseInt(param, 10))) {
      throw new Error(`${ERROR_BASIC} ${param}은 숫자가 아닙니다.`);
    }
    if (typeof param !== 'number') {
      throw new Error(`${ERROR_BASIC} ${param}은 숫자가 아닙니다.`);
    }
  });
};

/**
 * @param {any[]} list
 * @param {number} length
 * @returns {boolean | ERROR}
 */
const validListLength = (list, length) => {
  if (list.length === length) {
    return true;
  }

  throw new Error(VALID_INPUT_FAIL);
};

/**
 * @param {string} value
 * @returns {boolean | ERROR}
 */
const validInteger = (value) => {
  const number = parseInt(value, 10);

  if (Number.isInteger(number)) {
    return true;
  }

  throw new Error(NOT_INTEGER);
};

const validThousandWonUnit = (value) => {
  if (value % 1000 === 0) {
    return true;
  }

  throw new Error(NOT_THOUSAND_WON_UNIT);
};

/**
 * @param {number} number
 * @param {number} minBound
 * @param {number} maxBound
 */
const validBoundInsideNumber = (number, minBound, maxBound) => {
  validNumber(number, minBound, maxBound);

  if (number >= minBound && number <= maxBound) {
    return true;
  }

  throw new Error(`[ERROR] 입력값이 ${minBound}~${maxBound} 의 값이 아닙니다.`);
};
/**
 * @param {number} number
 * @param {number} minBound
 * @param {number} maxBound
 */
const validBoundInsideNumberList = (numbers, minBound, maxBound) => {
  validNumber(minBound, maxBound);

  numbers.forEach((number) => {
    validBoundInsideNumber(number, minBound, maxBound);
  });
};

module.exports = {
  validInteger,
  validThousandWonUnit,
  validBoundInsideNumber,
  validNumber,
  validListLength,
  validBoundInsideNumberList,
};

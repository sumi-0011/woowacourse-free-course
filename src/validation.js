const {
  NOT_THOUSAND_WON_UNIT,
  NOT_INTEGER,
  VALID_INPUT_FAIL,
  IS_DUPLICATE,
} = require('./errorMessage');

/**
 * parameter로 들어온 값들이 모두 Number형인지 확인
 * @param  {string[]} ...params
 * @returns {void | ERROR}
 */
const validNumber = (...params) => {
  params.forEach((param) => {
    if (Number.isNaN(parseInt(param, 10))) {
      throw new Error(`[ERROR] ${param}은 숫자가 아닙니다.`);
    }
    if (typeof param !== 'number') {
      throw new Error(`[ERROR] ${param}은 숫자가 아닙니다.`);
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
  const regex = /^[0-9]+$/;

  const number = parseInt(value, 10);

  if (regex.test(number)) {
    return true;
  }

  throw new Error(NOT_INTEGER);
};

/**
 * value가 1000원 단위인지 확인
 * @param {number} value
 * @returns {boolean | ERROR}
 */
const validThousandWonUnit = (value) => {
  if (value % 1000 === 0) {
    return true;
  }

  throw new Error(NOT_THOUSAND_WON_UNIT);
};

/**
 * 입력값이 criterion 이상인지 확인
 * @param {string} str
 * @param {number} criterion
 * @returns {boolean | ERROR}
 */
const validHigherNumber = (str, criterion) => {
  validInteger(criterion);

  const number = parseInt(str, 10);
  if (number >= criterion) {
    return true;
  }
  return new Error(`[ERROR] 입력이 ${criterion} 이상이여야 합니다.`);
};

/**
 * @param {number} number
 * @param {number} minBound
 * @param {number} maxBound
 * @returns {boolean | ERROR}
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
 * @return void
 */
const validBoundInsideNumberList = (numbers, minBound, maxBound) => {
  validNumber(minBound, maxBound);

  numbers.forEach((number) => {
    validBoundInsideNumber(number, minBound, maxBound);
  });
};

/**
 * 리스트 안에 중복된 값이 있는지 확인
 * @param {any[]} list
 * @returns {boolean | ERROR}
 */
const validNoDuplication = (list) => {
  const uniqueSet = new Set(list);
  const uniqueArr = [...uniqueSet];
  if (list.length === uniqueArr.length) {
    return true;
  }

  throw new Error(IS_DUPLICATE);
};

/**
 * 두 리스트간의 중복된 요소가 있는지 확인
 * @param {any[]} list1
 * @param {any[]} list2
 * @returns {boolean | ERROR}
 */
const validExistedDuplication = (list1, list2) => {
  const intersectionList = list1.filter((it) => list2.includes(it));
  if (intersectionList.length === 0) {
    return true;
  }

  throw new Error(IS_DUPLICATE);
};

const validPurchaseLotto = (answer) => {
  validInteger(answer);
  validThousandWonUnit(answer);
  validHigherNumber(answer, 1000);
};

const validInputWinningNumber = (numbers) => {
  validListLength(numbers, 6);
  validBoundInsideNumberList(numbers, 1, 45);
  validNoDuplication(numbers);
};

const validInputBonusNumber = (winningNumbers, bonusNumber) => {
  validBoundInsideNumber(bonusNumber, 1, 45);
  validExistedDuplication(winningNumbers, [bonusNumber]);
};

module.exports = {
  validInteger,
  validThousandWonUnit,
  validBoundInsideNumber,
  validNumber,
  validListLength,
  validBoundInsideNumberList,
  validNoDuplication,
  validExistedDuplication,
  validPurchaseLotto,
  validInputWinningNumber,
  validInputBonusNumber,
};

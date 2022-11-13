const ERROR_BASIC = '[ERROR]';
const NOT_INTEGER = `${ERROR_BASIC} 입력한 값이 정수값이 아닙니다. `;
const NOT_THOUSAND_WON_UNIT = `${ERROR_BASIC} 입력 금액이 1,000원 단위가 아닙니다.`;
const NOT_NUMBER_DIVISION = `${ERROR_BASIC} 입력값이 숫자가 아닙니다.`;
const NOT_NUMBER = `${ERROR_BASIC} 입력값이 숫자가 아닙니다.`;
const VALID_INPUT_FAIL = `${ERROR_BASIC} 잘못된 입력입니다. `;
module.exports = {
  NOT_INTEGER,
  NOT_THOUSAND_WON_UNIT,
  NOT_NUMBER_DIVISION,
  NOT_NUMBER,
  ERROR_BASIC,
  VALID_INPUT_FAIL,
};

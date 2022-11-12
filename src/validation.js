const { NOT_THOUSAND_WON_UNIT, NOT_INTEGER } = require('../src/errorMessage');

const validInteger = (value) => {
  const number = parseInt(value);

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

module.exports = { validInteger, validThousandWonUnit };

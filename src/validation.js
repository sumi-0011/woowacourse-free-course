const { NOT_THOUSAND_WON_UNIT, NOT_INTEGER } = require('./errorMessage');

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

module.exports = { validInteger, validThousandWonUnit };

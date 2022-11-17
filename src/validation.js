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

module.exports = {
  validInteger,
};

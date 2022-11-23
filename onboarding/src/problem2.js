const CONTINUOUS_CHAR_REGEX = /([a-z])\1+/g;

const decryptedCryptogram = (cryptogram) => {
  return cryptogram.replace(CONTINUOUS_CHAR_REGEX, "");
};

const checkIsCryptogram = (str) => {
  return str.match(CONTINUOUS_CHAR_REGEX);
};

function problem2(cryptogram) {
  let res = cryptogram;

  while (checkIsCryptogram(res)) {
    res = decryptedCryptogram(res);
  }

  return res;
}

module.exports = problem2;

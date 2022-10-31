const decryptedCyptogram = (cryptogram) => {
  const regex = /([a-z])\1+/g;

  return cryptogram.replace(regex, "");
};

const checkIsCryptogram = (str) => {
  const regex = /([a-z])\1+/g;

  return str.match(regex);
};

function problem2(cryptogram) {
  let res = cryptogram;

  while (checkIsCryptogram(res)) {
    res = decryptedCyptogram(res);
  }

  return res;
}

module.exports = problem2;

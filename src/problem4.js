const UPPER_FIRST_CODE = "A".charCodeAt(0);
const UPPER_LAST_CODE = "Z".charCodeAt(0);
const LOWER_FIRST_CODE = "a".charCodeAt(0);
const LOWER_LAST_CODE = "z".charCodeAt(0);

const checkAlpha = (char) => {
  return (
    char.charCodeAt(0) >= UPPER_FIRST_CODE &&
    char.charCodeAt(0) <= LOWER_LAST_CODE
  );
};

const checkUpperCase = (char) => {
  return (
    char.charCodeAt(0) >= UPPER_FIRST_CODE &&
    char.charCodeAt(0) <= UPPER_LAST_CODE
  );
};

const getReverseChar = (char) => {
  const isUpper = checkUpperCase(char);
  const charCode = char.charCodeAt(0);

  if (isUpper) {
    const reverseCode = UPPER_LAST_CODE - charCode + UPPER_FIRST_CODE;
    return reverseCode;
  } else {
    const reverseCode = LOWER_LAST_CODE - charCode + LOWER_FIRST_CODE;
    return reverseCode;
  }
};

const convertReserveWord = (char) => {
  if (char === " " || !checkAlpha(char)) return char;
  const reserveChar = String.fromCharCode(getReverseChar(char));
  return reserveChar;
};

function problem4(word) {
  var answer = [...word].map((char) => convertReserveWord(char)).join("");

  return answer;
}

module.exports = problem4;

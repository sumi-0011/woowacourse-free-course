const isNumber = (value) => {
  return !isNaN(value);
};

const convertNumbers = (strList) => {
  return strList.map((str) => parseInt(str));
};

const checkAnotherThreeNumber = (inputList) => {
  if (inputList.length !== 3) {
    return false;
  }

  for (const word of inputList) {
    if (!isNumber(word)) {
      return false;
    }
  }
  return true;
};

const checkUserCurrentInput = (answer) => {
  const inputAnswer = answer.trim();
  const answerList = inputAnswer.split(" ");

  if (checkAnotherThreeNumber(answerList)) {
    const numbers = convertNumbers(answerList);
    return numbers;
  } else {
    throw new Error("사용자가 잘못된 값을 입력했습니다");
  }
};

module.exports = { checkUserCurrentInput };

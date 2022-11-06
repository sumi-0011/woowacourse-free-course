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

const checkBall = (answer, rightAnswers) => {
  return rightAnswers.findIndex((rightAnswer) => rightAnswer === answer) !== -1;
};

const getBaseballHint = ({ strike, ball }) => {
  if (strike === 0 && ball === 0) {
    return "낫싱";
  }

  let answer = "";
  if (ball > 0) {
    answer += `${ball}볼`;
  }
  if (strike > 0) {
    answer += ` ${strike}스트라이크`;
  }

  return answer.trim();
};

const getResult = (answers, rightAnswers) => {
  let strikeNum = 0;
  let ballNum = 0;

  for (const idx in answers) {
    if (answers[idx] === rightAnswers[idx]) {
      strikeNum += 1;
      continue;
    }
    if (checkBall(answers[idx], rightAnswers)) {
      ballNum += 1;
      continue;
    }
  }

  return { strike: strikeNum, ball: ballNum };
};

module.exports = { checkUserCurrentInput, getResult, getBaseballHint };

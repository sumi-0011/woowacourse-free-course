const checkSuccessfulOpenPage = (leftPage, rightPage) => {
  return rightPage - leftPage !== 1;
};

const getNumberList = (number) => {
  return [...number.toString()].map((s) => parseInt(s));
};

const getPlus = (numbers) => {
  const result = numbers.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);
  return result;
};

const getMultiple = (numbers) => {
  const result = numbers.reduce(function multi(res, currValue) {
    return res * currValue;
  }, 1);
  return result;
};

const getMaxNumber = (personNumberList) => {
  const calcRes = [];

  personNumberList.forEach((numberList) => {
    calcRes.push(getPlus(numberList));
    calcRes.push(getMultiple(numberList));
  });

  return Math.max(...calcRes);
};

function problem1(pobi, crong) {
  if (checkSuccessfulOpenPage(...pobi) || checkSuccessfulOpenPage(...crong)) {
    return -1;
  }

  const pobiNumbers = pobi.map((po) => getNumberList(po));
  const crongNumbers = crong.map((cr) => getNumberList(cr));

  const pobiMax = getMaxNumber(pobiNumbers);
  const crongMax = getMaxNumber(crongNumbers);

  if (pobiMax == crongMax) {
    return 0;
  } else if (pobiMax > crongMax) {
    return 1;
  } else {
    return 2;
  }
}

module.exports = problem1;

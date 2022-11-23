const getNumberToCharList = (number) => {
  return number.toString().split("");
};

const get369Count = (arr) => {
  return arr.filter((c) => c === "3" || c === "6" || c === "9").length;
};

function problem3(number) {
  var answer = 0;

  for (let i = 1; i <= number; i++) {
    const chars = getNumberToCharList(i);
    answer += get369Count(chars);
  }

  return answer;
}

module.exports = problem3;

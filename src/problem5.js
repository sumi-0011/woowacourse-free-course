const BILL = [50000, 10000, 5000, 1000, 500, 100, 50, 10, 1];

const getMaxUnitCnt = (unit, money) => {
  return parseInt(money / unit);
};

const getUnitRest = (unit, money) => {
  return money % unit;
};

function problem5(money) {
  const answer = [];
  let n = money;

  for (const unit of BILL) {
    const [cnt, rest] = [getMaxUnitCnt(unit, n), getUnitRest(unit, n)];
    n = rest;
    answer.push(cnt);
  }

  return answer;
}

module.exports = problem5;

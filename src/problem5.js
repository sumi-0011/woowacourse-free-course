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
    const maxUnitCnt = getMaxUnitCnt(unit, n);
    const rest = getUnitRest(unit, n);
    answer.push(maxUnitCnt);
    n = rest;
  }

  return answer;
}

module.exports = problem5;

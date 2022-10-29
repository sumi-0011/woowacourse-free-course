const getRelationPeople = (friends) => {
  const obj = {};

  for (const [f1, f2] of friends) {
    f1 in obj ? (obj[f1] = [...obj[f1], f2]) : (obj[f1] = [f2]);
    f2 in obj ? (obj[f2] = [...obj[f2], f1]) : (obj[f2] = [f1]);
  }

  return obj;
};

const getVisitorsCnt = (visitors) => {
  const obj = {};

  for (const visitor of visitors) {
    visitor in obj ? (obj[visitor] += 1) : (obj[visitor] = 1);
  }

  return obj;
};
function problem7(user, friends, visitors) {
  const relations = getRelationPeople(friends);
  const vistiedCnt = getVisitorsCnt(visitors);
}

module.exports = problem7;

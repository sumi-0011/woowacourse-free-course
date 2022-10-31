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

const getKnowSameCnt = (user1, user2, relation) => {
  if (!(user1 in relation) || !(user2 in relation)) return 0;

  const freind1 = relation[user1];
  const freind2 = relation[user2];

  const difference = freind1.filter((x) => freind2.includes(x) && x !== user2);

  return difference.length;
};

const compareScoreAndName = (a, b) => {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;

  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const getRecommandScore = (user, people, relations, vistiedCnt) => {
  const recommandScore = [];

  for (person of people) {
    let score = 0;

    if (person in relations) {
      score += getKnowSameCnt(person, user, relations) * 10;
    }
    if (person in vistiedCnt) {
      score += vistiedCnt[person];
    }

    if (score !== 0) {
      recommandScore.push({ score, name: person });
    }
  }

  return recommandScore;
};

const getNotUserFreinds = (user, relations, vistiedCnt) => {
  const allPeople = [
    ...new Set([...Object.keys(relations), ...Object.keys(vistiedCnt)]),
  ];

  const notUserFreinds = allPeople.filter((person) =>
    checkNotUserFreinds(user, person, relations)
  );

  return notUserFreinds;
};

const checkNotUserFreinds = (user, person, relations) => {
  if (user in relations)
    return person !== user && !relations[user].includes(person);
  return true;
};

function problem7(user, friends, visitors) {
  const relations = getRelationPeople(friends);
  const vistiedCnt = getVisitorsCnt(visitors);

  const notUserFreinds = getNotUserFreinds(user, relations, vistiedCnt);

  const recommandScore = getRecommandScore(
    user,
    notUserFreinds,
    relations,
    vistiedCnt
  );

  const sortedRecommandScoreName = recommandScore.sort(compareScoreAndName);

  const resultNameList = sortedRecommandScoreName
    .map((res) => res.name)
    .slice(0, 5);

  return resultNameList;
}

module.exports = problem7;

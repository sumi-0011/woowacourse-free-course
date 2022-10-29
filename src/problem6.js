const seperateName = (name) => {
  const arr = [];

  for (let i = 0; i < name.length - 1; i++) {
    arr.push(name[i] + name[i + 1]);
  }

  return arr;
};

const getDuplicate = (obj) => {
  const res = [];

  for (const key in obj) {
    const emailList = obj[key];

    if (emailList.length > 1) {
      res.push(...emailList);
    }
  }

  return [...new Set(res)];
};

const getSeperateNameObj = (forms) => {
  const obj = {};

  for (const person of forms) {
    const [email, name] = person;
    const names = seperateName(name);

    names.forEach((name) => {
      name in obj ? (obj[name] = [...obj[name], email]) : (obj[name] = [email]);
    });
  }

  return obj;
};

function problem6(forms) {
  const seperateNameObj = getSeperateNameObj(forms);

  const uniqueArr = getDuplicate(seperateNameObj);

  const sortedRes = uniqueArr.sort();

  return sortedRes;
}

module.exports = problem6;

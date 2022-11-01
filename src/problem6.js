const separateName = (name) => {
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

const getSeparateNameObj = (forms) => {
  const obj = {};

  for (const person of forms) {
    const [email, name] = person;
    const names = separateName(name);

    names.forEach((name) => {
      name in obj ? (obj[name] = [...obj[name], email]) : (obj[name] = [email]);
    });
  }

  return obj;
};

function problem6(forms) {
  const separateNameObj = getSeparateNameObj(forms);

  const uniqueArr = getDuplicate(separateNameObj);

  const sortedRes = uniqueArr.sort();

  return sortedRes;
}

module.exports = problem6;

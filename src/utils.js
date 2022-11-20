const { validInteger } = require('./validation');

const convertToInteger = (value) => {
  try {
    validInteger(value);
  } catch (error) {
    console.log('error: ', error);
  }
  return Number.parseInt(value, 10);
};

const calcMap = (paths) => {
  let resU = [];
  let resD = [];
  paths.forEach(({ move, isFail }) => {
    const OX = isFail ? 'X' : 'O';
    move === 'U' ? resU.push(OX) : resU.push(' ');
    move === 'D' ? resD.push(OX) : resD.push(' ');
  });

  return [resU, resD];
};

module.exports = {
  convertToInteger,
  calcMap,
};

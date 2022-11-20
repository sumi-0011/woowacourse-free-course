const { Console } = require('@woowacourse/mission-utils');
const { calcMap } = require('./utils');

const OutputView = {
  printMap(paths) {
    const [resU, resD] = calcMap(paths);

    Console.print(`[ ${resU.join(' | ')} ]`);
    Console.print(`[ ${resD.join(' | ')} ]`);
    Console.print('\n');
  },

  printResult(paths, gameClear, tryCount) {
    Console.print('최종 게임 결과');
    this.printMap(paths);

    Console.print(`게임 성공 여부: ${gameClear}`);
    Console.print(`총 시도한 횟수: ${tryCount}`);
  },
};

module.exports = OutputView;

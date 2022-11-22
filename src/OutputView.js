const { Console } = require('@woowacourse/mission-utils');

const OutputView = {
  printMap(pathMap) {
    const [resD, resU] = pathMap;

    Console.print(`[ ${resU.join(' | ')} ]`);
    Console.print(`[ ${resD.join(' | ')} ]`);
    Console.print('\n');
  },

  printResult(pathMap, gameClearMsg, tryCount) {
    Console.print('최종 게임 결과');
    const [resD, resU] = pathMap;

    Console.print(`[ ${resU.join(' | ')} ]`);
    Console.print(`[ ${resD.join(' | ')} ]`);
    Console.print('\n');

    Console.print(`게임 성공 여부: ${gameClearMsg}`);
    Console.print(`총 시도한 횟수: ${tryCount}`);
  },
};

module.exports = OutputView;

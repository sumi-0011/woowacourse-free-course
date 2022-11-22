const Bridge = require('../src/Bridge');
const BridgeGame = require('../src/BridgeGame');
const { MOVE_RESULT } = require('../src/Constant');
const { mockRandoms } = require('../src/mock');

const INIT_TRY_COUNT = 1;

describe('다리 건너기 게임 테스트', () => {
  let bridgeGame;

  beforeEach(() => {
    mockRandoms([0, 1, 1]); // ['D', 'U', 'U']
    const bridge = new Bridge(3);

    bridgeGame = new BridgeGame(bridge);
  });
  it('이동 후 결과가 정상적으로 나오는지 테스트 / 성공 ', () => {});
  // it('이동 후 결과가 정상적으로 나오는지 테스트 / 성공 ', () => {
  //   const moves = ['D', 'U', 'U'];

  //   const moveResult = [
  //     MOVE_RESULT.MOVEABLE,
  //     MOVE_RESULT.MOVEABLE,
  //     MOVE_RESULT.END,
  //   ];

  //   const pathResults = [
  //     {
  //       move: 'D',
  //       isFail: false,
  //     },
  //     {
  //       move: 'U',
  //       isFail: false,
  //     },
  //     {
  //       move: 'U',
  //       isFail: false,
  //     },
  //   ];

  //   moves.forEach((position, idx) => {
  //     const { moveResult: currentMoveResult, paths } =
  //       bridgeGame.move(position);
  //     const currentPathResult = pathResults.slice(0, idx + 1);

  //     expect(currentMoveResult).toEqual(moveResult[idx]);
  //     expect(paths).toEqual(currentPathResult);
  //   });
  // });

  // it('이동 후 결과가 정상적으로 나오는지 테스트 / 실패 ', () => {
  //   const moves = ['D', 'D'];

  //   const moveResult = [MOVE_RESULT.MOVEABLE, MOVE_RESULT.FAIL];

  //   const pathResults = [
  //     {
  //       move: 'D',
  //       isFail: false,
  //     },
  //     {
  //       move: 'D',
  //       isFail: true,
  //     },
  //   ];

  //   moves.forEach((position, idx) => {
  //     const { moveResult: currentMoveResult, paths } =
  //       bridgeGame.move(position);
  //     const currentPathResult = pathResults.slice(0, idx + 1);

  //     expect(currentMoveResult).toEqual(moveResult[idx]);
  //     expect(paths).toEqual(currentPathResult);
  //   });
  // });

  // it('재시작 후 player 시도횟수 증가, 경로 초기화 테스트 ', () => {
  //   const try1 = bridgeGame.getResult();
  //   bridgeGame.retry();
  //   const try2 = bridgeGame.getResult();

  //   expect(try1.tryCount).toBe(INIT_TRY_COUNT);
  //   expect(try1.path).toHaveLength(0);
  //   expect(try2.tryCount).toBe(INIT_TRY_COUNT + 1);
  //   expect(try2.path).toHaveLength(0);
  // });
});

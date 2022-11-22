const Bridge = require('../src/Bridge');
const BridgeMaker = require('../src/BridgeMaker');
const BridgeRandomNumberGenerator = require('../src/BridgeRandomNumberGenerator');
const { MOVE_RESULT } = require('../src/utils/constants');
const { mockRandoms } = require('../src/utils/mock');

describe('Bridge, BridgeMarker 테스트', () => {
  let result;
  beforeEach(() => {
    mockRandoms([0, 1, 1]);
    res = ['D', 'U', 'U'];
  });

  it('bridge 생성 테스트', () => {
    const size = 3;

    const makeBridge = BridgeMaker.makeBridge(
      size,
      BridgeRandomNumberGenerator.generate,
    );

    expect(makeBridge).toHaveLength(size);
    expect(makeBridge).toEqual(res);
  });

  // it('이동 가능 여부 체크 기능 테스트', () => {
  //   const size = 3;
  //   const bridge = new Bridge(size);

  //   const res = [
  //     { step: 0, move: 'D', result: MOVE_RESULT.MOVEABLE },
  //     { step: 0, move: 'U', result: MOVE_RESULT.FAIL },
  //     { step: 1, move: 'D', result: MOVE_RESULT.FAIL },
  //     { step: 1, move: 'U', result: MOVE_RESULT.MOVEABLE },
  //     { step: 2, move: 'D', result: MOVE_RESULT.FAIL },
  //     { step: 2, move: 'U', result: MOVE_RESULT.END },
  //   ];

  //   res.forEach(({ step, move, result }) => {
  //     expect(bridge.getMoveable(step, move)).toEqual(result);
  //   });
  // });
});

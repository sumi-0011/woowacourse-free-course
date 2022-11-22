const Bridge = require('../src/Bridge');
const { MOVE_RESULT } = require('../src/utils/constants');

describe('Bridge 클래스 테스트', () => {
  let bridge;
  beforeEach(() => {
    const madeBridge = ['D', 'U', 'U'];
    bridge = new Bridge(madeBridge);
  });

  it('이동 결과 확인 체크 기능 테스트 / 전체 이동 성공 케이스', () => {
    const answer = ['D', 'U', 'U'];
    const expectedValue = [
      MOVE_RESULT.MOVEABLE,
      MOVE_RESULT.MOVEABLE,
      MOVE_RESULT.END,
    ];

    expectedValue.forEach((result, idx) => {
      const paths = answer.slice(0, idx + 1);
      expect(bridge.getMoveable(paths)).toEqual(result);
    });
  });

  it('이동 결과 확인 기능 테스트 / 이동 실패 케이스', () => {
    const answer = ['D', 'D'];
    const expectedValue = [MOVE_RESULT.MOVEABLE, MOVE_RESULT.FAIL];

    expectedValue.forEach((result, idx) => {
      const paths = answer.slice(0, idx + 1);
      expect(bridge.getMoveable(paths)).toEqual(result);
    });
  });

  it('이동 가능 여부 체크 기능 테스트', () => {
    const answer = ['D', 'U', 'D'];
    const expectedValue = [true, true, false];

    expectedValue.forEach((result, idx) => {
      const paths = answer.slice(0, idx + 1);
      expect(bridge.getIsMoveable(paths)).toEqual(result);
    });
  });

  it('마지막 단계인지 확인 기능 테스트', () => {
    const answers = [
      ['D', 'U', 'D'],
      ['D', 'U', 'U'],
      ['D', 'U'],
    ];
    const expectedValue = [true, true, false];

    expectedValue.forEach((result, idx) => {
      const paths = answers[idx];
      expect(bridge.getIsLast(paths)).toEqual(result);
    });
  });
});

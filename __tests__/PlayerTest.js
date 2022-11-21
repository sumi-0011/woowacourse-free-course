const Player = require('../src/Player');

const INIT_TRY_COUNT = 1;

describe('Player 클래스 테스트', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  });

  it('Player 생성 후 초기화 테스트 ', () => {
    const { tryCount, path } = player.getResult();

    expect(tryCount).toBe(INIT_TRY_COUNT);
    expect(path).toHaveLength(0);
  });

  it('플레이어 이동 path 결과 테스트', () => {
    const result = [
      {
        move: 'U',
        isFail: false,
      },
      {
        move: 'U',
        isFail: false,
      },
      {
        move: 'D',
        isFail: true,
      },
    ];

    result.forEach((res, idx) => {
      const currentResult = result.slice(0, idx + 1);
      const path = player.move(res.move, !res.isFail);

      expect(path).toEqual(currentResult);
    });
  });

  it('플레이어 이동 후 결과 테스트', () => {
    const result = {
      move: 'U',
      isFail: false,
    };

    player.move(result.move, !result.isFail);

    const { tryCount, path } = player.getResult();

    expect(tryCount).toBe(INIT_TRY_COUNT);
    expect(path).toHaveLength(1);
    expect(path).toEqual([result]);
  });

  it('게임 재시작 후 시도횟수 증가, 경로 초기화 확인 테스트', () => {
    const try1 = player.getResult();
    player.retry();
    const try2 = player.getResult();

    expect(try1.tryCount).toBe(INIT_TRY_COUNT);
    expect(try1.path).toHaveLength(0);
    expect(try2.tryCount).toBe(INIT_TRY_COUNT + 1);
    expect(try2.path).toHaveLength(0);
  });
});

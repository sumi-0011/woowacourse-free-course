/* eslint-disable no-undef */
const Lotto = require('../src/Lotto');
const LottoGame = require('../src/LottoGame');

describe('로또 게임 클래스 테스트 / 구매 금액 입력', () => {
  const lottoGame = new LottoGame();

  test('구매 금액 입력이 숫자가 아니면 예외가 발생한다.', () => {
    const answer = '8000a';

    expect(() => {
      lottoGame.purchaseLottoStep(answer);
    }).toThrow('[ERROR]');
  });

  test('구매 금액 입력이 1,000원 단위가 아니면 예외가 발생한다.', () => {
    const answer = '7500';

    expect(() => {
      lottoGame.purchaseLottoStep(answer);
    }).toThrow('[ERROR]');
  });

  test('구매 금액 입력이 1,000원 이하이면 예외가 발생한다.', () => {
    const answer = '750';

    expect(() => {
      lottoGame.purchaseLottoStep(answer);
    }).toThrow('[ERROR]');
  });

  test('구매 금액에 따른 로또 개수가 발행하는지 확인', () => {
    const answer = '2000';
    const lottoCount = lottoGame.getLottoCount(answer);

    expect(lottoCount).toBe(2);
  });

  test('원하는 로또 개수가 발행되는지 확인', () => {
    const lottoCount = 2;
    const lottos = lottoGame.publishLottos(lottoCount);

    expect(lottos).toHaveLength(lottoCount);
  });
});

describe('로또 게임 클래스 테스트 / 당첨 번호 입력', () => {
  const lottoGame = new LottoGame();

  test('당첨 번호 입력이 모두 정수가 아니면 예외가 발생한다. ', () => {
    const answer = '1,2,3,4,5,a';

    expect(() => {
      lottoGame.winningNumberStep(answer);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 입력이 1~45 사이의 입력이 아니면 예외가 발생한다.', () => {
    const answer = '1,2,3,4,5,80';

    expect(() => {
      lottoGame.winningNumberStep(answer);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 입력의 개수가 6개가 아니면 예외가 발생한다. ', () => {
    const answer = '1,2,3,4,5,6,7';

    expect(() => {
      lottoGame.winningNumberStep(answer);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 입력에 중복이 있으면 예외가 발생한다.', () => {
    const answer = '1,2,3,4,5,5';

    expect(() => {
      lottoGame.winningNumberStep(answer);
    }).toThrow('[ERROR]');
  });
});

describe('로또 게임 클래스 테스트 / 보너스 번호 입력', () => {
  const lottoGame = new LottoGame();

  test('보너스 번호가 1~45 사이의 입력이 아니라면 예외가 발생한다.', () => {
    const answer = '80';

    expect(() => {
      lottoGame.bonusNumberStep(answer);
    }).toThrow('[ERROR]');
  });

  test('당첨번호와 보너스번호에 중복이 존재하면 예외가 발생한다. ', () => {
    const winningNumber = '1,2,3,4,5,10';
    const answer = '10';
    lottoGame.winningNumberStep(winningNumber);

    expect(() => {
      lottoGame.bonusNumberStep(answer);
    }).toThrow('[ERROR]');
  });
});

describe('로또 게임 클래스 테스트 / 당첨 내역 ', () => {
  const lottoGame = new LottoGame();

  test('당첨 내역이 정상적으로 출력되는지 테스트', () => {
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 5, 8]),
      new Lotto([1, 2, 3, 4, 5, 9]),
      new Lotto([1, 2, 3, 4, 9, 8]),
    ];

    const resultWinning = {
      1: 1,
      2: 1,
      3: 2,
      4: 1,
      5: 0,
    };
    const resultTotalAmount = 2033050000;

    const { winning, totalAmount } = lottoGame.getWinningRank(
      lottos,
      winningNumber,
      bonusNumber,
    );

    expect(winning).toEqual(resultWinning);
    expect(totalAmount).toBe(resultTotalAmount);
  });
});

describe('로또 게임 클래스 테스트 / 수익률 계산 ', () => {
  const lottoGame = new LottoGame();

  test('수익률 계산이 정상적으로 되는지 테스트 1', () => {
    const lottoCount = 8;
    const totalAmount = 2033050000;

    const res = 25413125;

    expect(lottoGame.getEarningsRate(lottoCount, totalAmount)).toEqual(res);
  });

  test('수익률 계산이 정상적으로 되는지 테스트 2', () => {
    const lottoCount = 2;
    const totalAmount = 1500000 + 50000;

    const res = 77500;

    expect(lottoGame.getEarningsRate(lottoCount, totalAmount)).toEqual(res);
  });
});

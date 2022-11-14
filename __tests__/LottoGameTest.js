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

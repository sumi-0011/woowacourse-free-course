const MissionUtils = require('@woowacourse/mission-utils');
const LottoManager = require('../src/LottoManager');

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce(
    (acc, input) =>
      acc.mockImplementationOnce((question, callback) => {
        callback(input);
      }),
    MissionUtils.Console.readLine,
  );
};

describe('로또 매니저 클래스 테스트 / 당첨 번호 입력', () => {
  const lottoManager = new LottoManager();

  test('당첨 번호 입력이 모두 정수가 아니면 예외가 발생한다. ', () => {
    const answer = ['1,2,3,4,5,a'];

    mockQuestions(answer);

    expect(() => {
      lottoManager.inputWinningNumber(() => {});
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 입력이 1~45 사이의 입력이 아니면 예외가 발생한다.', () => {
    const answer = ['1,2,3,4,5,80'];

    mockQuestions(answer);

    expect(() => {
      lottoManager.inputWinningNumber(() => {});
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 입력의 개수가 6개가 아니면 예외가 발생한다. ', () => {
    const answer = ['1,2,3,4,5,6,7'];

    mockQuestions(answer);

    expect(() => {
      lottoManager.inputWinningNumber(() => {});
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 입력에 중복이 있으면 예외가 발생한다.', () => {
    const answer = ['1,2,3,4,5,5'];

    mockQuestions(answer);

    expect(() => {
      lottoManager.inputWinningNumber(() => {});
    }).toThrow('[ERROR]');
  });
});

describe('로또 게임 클래스 테스트 / 보너스 번호 입력', () => {
  const lottoManager = new LottoManager();

  test('보너스 번호가 1~45 사이의 입력이 아니라면 예외가 발생한다.', () => {
    const answer = ['80'];

    mockQuestions(answer);

    expect(() => {
      lottoManager.inputBouseNumber(() => {});
    }).toThrow('[ERROR]');
  });

  test('당첨번호와 보너스번호에 중복이 존재하면 예외가 발생한다. ', () => {
    const winningNumber = '1,2,3,4,5,10';
    const answer = '10';

    mockQuestions([winningNumber, answer]);

    expect(() => {
      lottoManager.inputWinningNumber(() => {});
      lottoManager.inputBouseNumber(() => {});
    }).toThrow('[ERROR]');
  });
});

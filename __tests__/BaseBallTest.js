const App = require('../src/App');
const MissionUtils = require('@woowacourse/mission-utils');
const { INPUT_FAIL_ERROR_MESSAGE } = require('../src/errorMessage');

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((question, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};
const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};
describe('게임 시작', () => {
  test('게임 시작 문구 출력 ', () => {
    const logSpy = getLogSpy();

    const app = new App();
    app.play();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('숫자 야구 게임을 시작합니다.')
    );
  });

  test('컴퓨터가 랜덤한 3개의 숫자 생성', () => {
    const app = new App();
    const minBound = 1;
    const maxBound = 9;
    const randomNumbers = app.computer.randomNumbers;

    randomNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(minBound);
      expect(number).toBeLessThanOrEqual(maxBound);
    });

    const randomNumberSet = new Set(randomNumbers);
    expect(randomNumbers).toHaveLength(randomNumberSet.size);
  });
});



describe("숫자 야구 결과값", () => {
  test("사용자 입력값에 따른 strike, ball 예측", () => {
    const rightAnswers = [1, 2, 3];
    const answer = [
      [1, 2, 3],
      [3, 4, 5],
      [5, 6, 7],
      [1, 2, 9],
      [3, 1, 2],
      [3, 1, 9],
      [1, 8, 9],
      [1, 8, 2],
    ];
    const result = [
      { strike: 3, ball: 0 },
      { strike: 0, ball: 1 },
      { strike: 0, ball: 0 },
      { strike: 2, ball: 0 },
      { strike: 0, ball: 3 },
      { strike: 0, ball: 2 },
      { strike: 1, ball: 0 },
      { strike: 1, ball: 1 },
    ];

    const app = new App();
    result.forEach((output, idx) => {
      expect(app.getResult(answer[idx], rightAnswers)).toEqual(output);
    });
  });

  test('잘못된 사용자의 입력값에 따른 strike, ball 예측', () => {
    const rightAnswers = [1, 2, 3];
    const answer = [1, 2];

    expect(() => {
      const app = new App();
      app.getResult(answer, rightAnswers);
    }).toThrow(new Error(INPUT_FAIL_ERROR_MESSAGE));
  });
});

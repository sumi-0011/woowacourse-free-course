const App = require("../src/App");
const { INPUT_FAIL_ERROR_MESSAGE } = require("../src/errorMessage");
const MissionUtils = require("@woowacourse/mission-utils");



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

  test("잘못된 사용자의 입력값에 따른 strike, ball 예측", () => {
    const rightAnswers = [1, 2, 3];
    const answer = [1, 2];

    expect(() => {
      const app = new App();
      app.getResult(answer, rightAnswers);
    }).toThrow(new Error(INPUT_FAIL_ERROR_MESSAGE));
  });
});

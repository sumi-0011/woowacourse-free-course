const MissionUtils = require('@woowacourse/mission-utils');
const InputView = require('../src/InputView');
const {
  mockQuestions,
  expectLogContains,
  getLogSpy,
  getOutput,
  EMPTY_CALLBACK,
} = require('../src/utils/mock');

const runException = (input, runCallback) => {
  mockQuestions([input]);
  const logSpy = getLogSpy();

  runCallback();

  expectLogContains(getOutput(logSpy), ['[ERROR]']);
  expect(MissionUtils.Console.readLine).toBeCalledTimes(2);
};

describe('입력값 검증 테스트 / 재입력 테스트', () => {
  it('다리 길이 입력 경계값 예외 테스트', () => {
    const testCallback = () => {
      InputView.readBridgeSize(EMPTY_CALLBACK);
    };

    runException('a', testCallback);
    runException(1, testCallback);
    runException(21, testCallback);
  });

  it('이동 위치 입력 예외 테스트', () => {
    const testCallback = () => {
      InputView.readMoving(EMPTY_CALLBACK);
    };

    runException('a', testCallback);
    runException(3, testCallback);
  });

  it('재입력 커멘드 입력 예외 테스트', () => {
    const testCallback = () => {
      InputView.readGameCommand(EMPTY_CALLBACK);
    };

    runException('U', testCallback);
    runException(3, testCallback);
  });
});

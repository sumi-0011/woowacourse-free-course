const MissionUtils = require('@woowacourse/mission-utils');
const InputView = require('../src/InputView');

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((_, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join('');
};

const expectLogContains = (received, logs) => {
  logs.forEach((log) => {
    expect(received).toEqual(expect.stringContaining(log));
  });
};

const EMPTY_CALLBACK = () => {};

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

const MOVING_COMMAND = {
  0: 'D',
  1: 'U',
};

const MOVING_COMMAND_LIST = Object.values(MOVING_COMMAND);

const MOVE_RESULT = {
  MOVEABLE: 0,
  END: 1,
  FAIL: 2,
};

const MOVE_RESULT_NAME = {
  [MOVE_RESULT.MOVEABLE]: 'moveable',
  [MOVE_RESULT.END]: 'end',
  [MOVE_RESULT.FAIL]: 'fail',
};

const GAME_COMMAND = {
  RETRY: 'R',
  QUIT: 'Q',
};

const GAME_COMMANDS = Object.values(GAME_COMMAND);

const ERROR_MESSAGE = {
  wrong_input: '[ERROR] 잘못된 입력입니다. ',
  wrong_bridge_size_input:
    '[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.',
  wrong_move_command:
    '[ERROR] "U"또는 "D"를 입력하여야 합니다. (위: U, 아래: D)',
  wrong_game_command:
    '[ERROR] "R"또는 "Q"를 입력하여야 합니다. (재시도: R, 종료: Q)',
};

module.exports = {
  MOVING_COMMAND,
  MOVING_COMMAND_LIST,
  MOVE_RESULT,
  GAME_COMMAND,
  GAME_COMMANDS,
  MOVE_RESULT_NAME,
  ERROR_MESSAGE,
};

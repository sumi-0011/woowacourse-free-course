const MOVING = ['D', 'U'];

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

module.exports = {
  MOVING,
  MOVE_RESULT,
  GAME_COMMAND,
  MOVE_RESULT_NAME,
};

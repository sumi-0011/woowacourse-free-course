const MOVING = ['D', 'U'];

const MOVE_RESULT = {
  MOVEABLE: 0,
  END: 1,
  FAIL: 2,
};

const GAME_COMMAND = {
  RETRY: 'R',
  QUIT: 'Q',
};

module.exports = {
  MOVING,
  MOVE_RESULT,
  GAME_COMMAND,
};

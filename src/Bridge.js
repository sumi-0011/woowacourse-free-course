const { MOVE_RESULT } = require('./utils/constants');

class Bridge {
  #bridge;

  constructor(bridge) {
    this.#bridge = bridge;
  }

  getIsMoveable(paths) {
    const index = paths.length - 1;
    return paths[index] === this.#bridge[index];
  }

  getIsLast(paths) {
    return paths.length === this.#bridge.length;
  }

  getMoveable(paths) {
    const isMoveable = this.getIsMoveable(paths);
    const isLast = this.getIsLast(paths);

    if (isMoveable) {
      return isLast ? MOVE_RESULT.END : MOVE_RESULT.MOVEABLE;
    }
    return MOVE_RESULT.FAIL;
  }
}

module.exports = Bridge;

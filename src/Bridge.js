const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');
const BridgeMaker = require('./BridgeMaker');
const { MOVE_RESULT } = require('./Constant');

class Bridge {
  #bridge;

  constructor(size) {
    this.#bridge = this.#init(size);
  }

  #init(size) {
    const bridge = BridgeMaker.makeBridge(
      size,
      BridgeRandomNumberGenerator.generate,
    );

    return bridge;
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

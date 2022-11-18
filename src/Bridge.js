const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');
const { MOVE_RESULT } = require('./Constant');

class Bridge {
  #bridge;
  constructor(size) {
    this.#bridge = this.init(size);
  }

  init(size) {
    const bridge = BridgeMaker.makeBridge(
      size,
      BridgeRandomNumberGenerator.generate,
    );
    return bridge;
  }

  getMoveable(step, move) {
    if (!this.#bridge[step] === move) {
      return MOVE_RESULT.FAIL;
    }
    return step + 1 === this.#bridge.length
      ? MOVE_RESULT.END
      : MOVE_RESULT.MOVEABLE;
  }
}

module.exports = Bridge;

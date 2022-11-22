const { MOVE_RESULT } = require('./Constant');
const Path = require('./Path');

const INIT_TRY_COUNT = 1;

class BridgeGame {
  #bridge;
  #path;
  #step;
  #tryCount;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#path = new Path();
    this.#step = 0;
    this.#tryCount = INIT_TRY_COUNT;
  }

  move(position) {
    this.#path.move(position);
    const moveResult = this.#bridge.getMoveable(this.#step, position);

    const isMoveable =
      moveResult === MOVE_RESULT.MOVEABLE || moveResult === MOVE_RESULT.END;

    this.#step += 1;

    const pathMap = this.#path.mark(isMoveable);

    return { moveResult, pathMap };
  }

  retry() {
    this.#step = 0;
    this.#tryCount += 1;
    this.#path = new Path();
  }

  getResult() {
    return {
      tryCount: this.#tryCount,
      pathMap: this.#path.getPathMap(),
    };
  }
}

module.exports = BridgeGame;

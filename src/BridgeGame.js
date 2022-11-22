const { INIT_TRY_COUNT, MOVE_RESULT } = require('./utils/constants');
const Path = require('./Path');

const MOVEABLE_RESULT = [MOVE_RESULT.MOVEABLE, MOVE_RESULT.END];

class BridgeGame {
  #bridge;
  #path;
  #tryCount;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#path = new Path();
    this.#tryCount = INIT_TRY_COUNT;
  }

  move(position) {
    const paths = this.#path.move(position);
    const moveResult = this.#bridge.getMoveable(paths);

    const isMoveable = MOVEABLE_RESULT.includes(moveResult);
    const pathMap = this.#path.mark(isMoveable);

    return { moveResult, pathMap };
  }

  retry() {
    this.#tryCount += 1;
    this.#path = new Path();
  }

  getIsClear() {
    const paths = this.#path.getPaths();
    return this.#bridge.getIsClear(paths);
  }

  getResult() {
    return {
      tryCount: this.#tryCount,
      pathMap: this.#path.getPathMap(),
      isClear: this.getIsClear(),
    };
  }
}

module.exports = BridgeGame;

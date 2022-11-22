const { MOVEABLE, INIT_TRY_COUNT } = require('./utils/constants');
const Path = require('./Path');

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

    const isMoveable = MOVEABLE.includes(moveResult);
    const pathMap = this.#path.mark(isMoveable);

    return { moveResult, pathMap };
  }

  retry() {
    this.#tryCount += 1;
    this.#path = new Path();
  }

  getIsClear() {
    const paths = this.#path.getPaths();
    const isClear = this.#bridge.getIsLast(paths);
    return isClear;
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

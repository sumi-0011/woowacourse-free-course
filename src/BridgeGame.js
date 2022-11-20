const { MOVE_RESULT } = require('./Constant');
const Player = require('./Player');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #player;
  #step;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#player = new Player();
    this.#step = 0;
  }

  move(position) {
    const moveResult = this.#bridge.getMoveable(this.#step, position);
    const isMoveable =
      moveResult === MOVE_RESULT.MOVEABLE || moveResult === MOVE_RESULT.END;
    const paths = this.#player.move(position, isMoveable);

    this.#step += 1;

    return { moveResult, paths };
  }

  retry() {
    this.#step = 0;
    this.#player.retry();
  }

  getResult() {
    return this.#player.getResult();
  }
}

module.exports = BridgeGame;

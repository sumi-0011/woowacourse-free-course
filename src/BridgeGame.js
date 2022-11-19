const { MOVE_RESULT, GAME_COMMAND } = require('./Constant');
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

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(position) {
    const moveResult = this.#bridge.getMoveable(this.#step, position);

    const isMoveable =
      moveResult === MOVE_RESULT.MOVEABLE || moveResult === MOVE_RESULT.END;
    const paths = this.#player.move(position, isMoveable);

    // this.#player.printPaths();
    this.#step += 1;

    return { moveResult, paths };
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}
}

module.exports = BridgeGame;

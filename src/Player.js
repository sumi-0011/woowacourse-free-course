const INIT_TRY_COUNT = 1;

class Player {
  #tryCount;
  #paths;
  constructor() {
    this.#tryCount = INIT_TRY_COUNT;
    this.#paths = [];
  }

  move(position, isMoveable) {
    this.#paths = [...this.#paths, { move: position, isFail: !isMoveable }];

    return [...this.#paths];
  }

  retry() {
    this.#tryCount += 1;
    this.#paths = [];
  }

  getResult() {
    return {
      tryCount: this.#tryCount,
      path: this.#paths,
    };
  }
}

module.exports = Player;

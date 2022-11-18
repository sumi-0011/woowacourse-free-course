const InputView = require('./InputView');
const OutputView = require('./OutputView');

class Player {
  #tryCount;
  #paths;
  constructor() {
    this.#tryCount = 0;
    this.#paths = [];
  }

  move(position, isMoveable) {
    this.#paths = [...this.#paths, { move: position, isFail: !isMoveable }];
    // this.printPaths();
  }

  printPaths() {
    OutputView.printMap(this.#paths);
  }

  retry() {
    this.#tryCount += 1;
    this.#paths = [];
  }
}

module.exports = Player;

const InputView = require('./InputView');
const OutputView = require('./OutputView');

class Player {
  #tryCount;
  #paths;
  #step;
  constructor() {
    this.#tryCount = 0;
    this.#paths = [];
    this.#step = 0;
  }

  move(bridge, callback) {
    InputView.readMoving((answer) => {
      const isMoveable = bridge.getMoveable(this.#step, answer);

      this.#paths = [...this.#paths, { move: answer, isFail: !isMoveable }];
      this.#step += 1;
      this.printPaths();

      callback(isMoveable);
    });
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

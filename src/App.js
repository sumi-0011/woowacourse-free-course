const { Console } = require('@woowacourse/mission-utils');
const InputView = require('./InputView');
const OutputView = require('./OutputView');
const Bridge = require('./Bridge');
const BridgeGame = require('./BridgeGame');
const { MOVE_RESULT_NAME } = require('./utils/constants');

class App {
  constructor() {
    this.game = null;
  }

  play() {
    this.start();
  }

  start() {
    InputView.readBridgeSize((size) => {
      const bridge = new Bridge(size);
      this.game = new BridgeGame(bridge);

      this.movePlayer();
    });
  }

  movePlayer() {
    InputView.readMoving((position) => {
      const { moveResult, pathMap } = this.game.move(position);

      OutputView.printMap(pathMap);

      this.#afterMove(moveResult);

      return MOVE_RESULT_NAME[moveResult];
    });
  }

  #guessRetry() {
    InputView.readGameCommand((isRetry) => {
      isRetry ? this.#retry() : this.#end(true);
    });
  }

  #retry() {
    this.game.retry();
    this.movePlayer();
  }

  #end(isFail) {
    const gameSuccessfulMsg = isFail ? '실패' : '성공';

    // const { tryCount, path } = this.game.getResult();
    const { tryCount, pathMap } = this.game.getResult();

    OutputView.printResult(pathMap, gameSuccessfulMsg, tryCount);
    Console.close();
  }

  #afterMove(moveResult) {
    const moveList = [
      () => this.movePlayer(),
      () => this.#end(false),
      () => this.#guessRetry(),
    ];

    const moving = moveList[moveResult];
    moving();
  }
}

module.exports = App;

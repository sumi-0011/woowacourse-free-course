const { Console } = require('@woowacourse/mission-utils');
const InputView = require('./InputView');
const OutputView = require('./OutputView');
const Bridge = require('./Bridge');
const BridgeGame = require('./BridgeGame');
const { MOVE_RESULT_NAME } = require('./utils/constants');

class App {
  #actionCommand;

  constructor() {
    this.#actionCommand = [this.movePlayer, this.#end, this.#guessRetry];
    this.game = null;
  }

  play() {
    this.init();
  }

  init() {
    InputView.readBridgeSize((size) => {
      const bridge = new Bridge(size);
      this.game = new BridgeGame(bridge);

      this.start();
    });
  }

  start() {
    this.movePlayer();
  }

  movePlayer() {
    InputView.readMoving((position) => {
      const { moveResult, pathMap } = this.game.move(position);

      OutputView.printMap(pathMap);

      this.#actionCommand[moveResult].call(this);

      return MOVE_RESULT_NAME[moveResult];
    });
  }

  #guessRetry() {
    InputView.readGameCommand((isRetry) => {
      isRetry ? this.#retry() : this.#end();
    });
  }

  #retry() {
    this.game.retry();
    this.movePlayer();
  }

  #end() {
    const { tryCount, pathMap, isClear } = this.game.getResult();

    const gameClearMsg = isClear ? '성공' : '실패';
    OutputView.printResult(pathMap, gameClearMsg, tryCount);

    Console.close();
  }

  // #afterMove(moveResult) {
  //   // const moveList = [
  //   //   () => this.movePlayer(),
  //   //   () => this.#end(),
  //   //   () => this.#guessRetry(),
  //   // ];

  //   const moving = t[moveResult];
  //   moving();
  // }
}

module.exports = App;

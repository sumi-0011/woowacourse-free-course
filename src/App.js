const InputView = require('./InputView');
const Bridge = require('./Bridge');
const BridgeGame = require('./BridgeGame');
const { MOVE_RESULT } = require('./Constant');
const OutputView = require('./OutputView');
const { Console } = require('@woowacourse/mission-utils');
// const Player = require('./Player');

class App {
  constructor() {
    this.game = null;
    this.bridge = null;
    // this.player = new Player();
  }

  play() {
    InputView.readBridgeSize((size) => {

      
      const bridge = new Bridge(size);
      this.bridge = bridge;
      this.game = new BridgeGame(bridge);

      this.movePlayer();
    });
  }

  movePlayer() {
    InputView.readMoving((position) => {
      const { moveResult, paths } = this.game.move(position);
      OutputView.printMap(paths);
      this.afterMove(moveResult);
    });
  }

  retry() {
    InputView.readGameCommand((isRetry) => {
      if (isRetry) {
        this.game.retry();
        this.movePlayer();
        return;
      }

      this.end(true);
    });
  }

  end(isFail) {
    const gameSuccessfulMsg = isFail ? '실패' : '성공';

    const { tryCount, path } = this.game.getResult();

    OutputView.printResult(path, gameSuccessfulMsg, tryCount);

    Console.close();
  }

  afterMove(moveResult) {
    switch (moveResult) {
      case MOVE_RESULT.MOVEABLE:
        this.movePlayer();
        return;
      case MOVE_RESULT.FAIL:
        this.retry();
        return;
      case MOVE_RESULT.END:
        this.end(false);
        return;
      default:
        throw new Error('[ERROR] 잘못된 입력입니다.');
    }
  }
}

module.exports = App;

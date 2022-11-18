const InputView = require('./InputView');
const Bridge = require('./Bridge');
const BridgeGame = require('./BridgeGame');
const { MOVE_RESULT } = require('./Constant');

class App {
  constructor() {
    this.game = null;
    this.bridge = null;
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
      const moveResult = this.game.move(position);
      console.log('moveResult: ', moveResult);
    });
  }

  retry() {}

  end() {}

  afterMove(moveResult) {
    switch (moveResult) {
      case MOVE_RESULT.MOVEABLE:
        this.movePlayer();
        return;
      case MOVE_RESULT.FAIL:
        this.retry();
      case MOVE_RESULT.END:
        this.end();
      default:
        throw new Error('[ERROR] 잘못된 입력입니다.');
        break;
    }
  }
}

module.exports = App;

const InputView = require('./InputView');
const Bridge = require('./Bridge');
const BridgeGame = require('./BridgeGame');

class App {
  play() {
    InputView.readBridgeSize((size) => {
      const bridge = new Bridge(size);

      const game = new BridgeGame(bridge);
    });
  }
}

module.exports = App;

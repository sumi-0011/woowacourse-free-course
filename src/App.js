const InputView = require('./InputView');
const Bridge = require('./Bridge');

class App {
  play() {
    InputView.readBridgeSize((size) => {
      const bridge = new Bridge(size);
    });
  }
}

module.exports = App;

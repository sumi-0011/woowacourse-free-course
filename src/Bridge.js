const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');

class Bridge {
  constructor(size) {
    this.bridge = this.init(size);
  }

  init(size) {
    const bridge = BridgeMaker.makeBridge(
      size,
      BridgeRandomNumberGenerator.generate,
    );
    return bridge;
  }
}

module.exports = Bridge;

const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');

class Bridge {
  #bridge;
  constructor(size) {
    this.#bridge = this.init(size);
  }

  init(size) {
    const bridge = BridgeMaker.makeBridge(
      size,
      BridgeRandomNumberGenerator.generate,
    );
    console.log('bridge: ', bridge);
    return bridge;
  }

  getMoveable(step, move) {
    // console.log('this.getMoveable', step, move);
    // console.log('bridge: ', this.#bridge);
    return this.#bridge[step] === move;
  }
}

module.exports = Bridge;

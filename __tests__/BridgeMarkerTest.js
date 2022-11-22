const BridgeMaker = require('../src/BridgeMaker');
const BridgeRandomNumberGenerator = require('../src/BridgeRandomNumberGenerator');
const { mockRandoms } = require('../src/utils/mock');

describe('BridgeMarker 테스트', () => {
  beforeEach(() => {
    mockRandoms([0, 1, 1]);
  });

  it('bridge 생성 테스트', () => {
    const size = 3;
    const makeBridge = BridgeMaker.makeBridge(
      size,
      BridgeRandomNumberGenerator.generate,
    );

    const expectedBridgeValue = ['D', 'U', 'U'];

    expect(makeBridge).toHaveLength(size);
    expect(makeBridge).toEqual(expectedBridgeValue);
  });
});

const {
  getRandomNumbers,
  convertStringsToNumbers,
} = require("../src/utils");

describe("random function test", () => {
  test("3개의 서로 다른 랜덤한 숫자가 생성되는지 확인", () => {
    const n = 3;

    const res = getRandomNumbers(n);
    const resSet = new Set(res);

    expect(res).toHaveLength(n);
    expect(res.length).toEqual(resSet.size);
  });

  test("생성한 랜덤한 숫자가 원하는 범위내에 있는지 확인", () => {
    const n = 1;
    const minBound = 1;
    const maxBound = 9;
    const [randomNumber] = getRandomNumbers(n, minBound, maxBound);

    expect(randomNumber).toBeGreaterThan(minBound);
    expect(randomNumber).toBeLessThan(maxBound);
  });
});

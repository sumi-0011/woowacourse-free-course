const {
  getRandomNumbers,
  convertStringsToNumbers,
  convertStringToNumber,
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

describe("string to number test", () => {
  test("숫자형 문자를 숫자로 변환", () => {
    const str = "1";
    const res = convertStringToNumber(str);

    expect(res).toBe(parseInt(str));
  });

  test("숫자형이 아닌 문자를 숫자로 변환", () => {
    const str = "a";

    expect(() => {
      convertStringToNumber(str);
    }).toThrow(`${str}은 숫자로 변환할 수 없습니다.`);
  });

  test("숫자형 문자 리스트를 숫자 리스트로 변환", () => {
    const arr = ["1", "2", "3"];
    const res = convertStringsToNumbers(arr);

    expect(res).toEqual([1, 2, 3]);
  });

  test("숫자형이 아닌 요소가 있는 문자 리스트를 숫자 리스트로 변환", () => {
    const arr = ["a", "2", "3"];

    expect(() => {
      convertStringsToNumbers(arr);
    }).toThrow(`${arr[0]}은 숫자로 변환할 수 없습니다.`);
  });
});

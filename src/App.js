const {
  checkUserCurrentInput,
  getResult,
  getBaseballHint,
} = require("./baseball");
const { Console, Random } = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.computer = {
      randomNumbers: [],
    };
  }

  play() {
    this.startGame();
  }

  startGame() {
    Console.print("숫자 야구 게임을 시작합니다.");

    this.setRandomNumbers();
    this.playNumberBaseball();
  }

  playNumberBaseball() {
    Console.readLine("숫자를 입력해주세요 :", (answer) => {
      const userNumbers = checkUserCurrentInput(answer);
      const computerNumbers = this.computer.randomNumbers;

      const result = getResult(userNumbers, computerNumbers);
      const res = getBaseballHint(result);
      console.log("res: ", res);

      Console.close();
    });
  }

  setRandomNumbers() {
    const randomNumbers = this.getRandomNumbers(3);
    this.computer = {
      randomNumbers,
    };
  }

  getRandomNumbers(cnt) {
    const numbers = [];
    for (let i = 0; i < cnt; i++) {
      let random = 0;
      do {
        random = Random.pickNumberInRange(1, 9);
      } while (numbers.includes(random));
      numbers.push(random);
    }

    return numbers;
  }
}

module.exports = App;

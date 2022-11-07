const {
  checkUserCurrentInput,
  getResult,
  getBaseballHint,
} = require("./baseball");
const { Console } = require("@woowacourse/mission-utils");
const { getRandomNumbers } = require("./utils");

const BASEBALL_NUMBER_CNT = 3;

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
    this.print("숫자 야구 게임을 시작합니다.");

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
    const randomNumbers = getRandomNumbers(BASEBALL_NUMBER_CNT);

    this.computer = {
      randomNumbers,
    };
  }

  readLine(message, callback) {
    Console.readLine(message, callback);
  }

  print(message) {
    Console.print(message);
  }
}

module.exports = App;

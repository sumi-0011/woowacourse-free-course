const { Console, Random } = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.computer = {
      randomNumbers: [],
    };
  }

  startGame() {
    Console.print("숫자 야구 게임을 시작합니다.");

    this.setRandomNumbers();

    Console.close();
  }

  play() {
    this.startGame();

    return;
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

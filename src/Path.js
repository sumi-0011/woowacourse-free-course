const { MOVING } = require('./Constant');

const MARKING = {
  RIGHT: 'O',
  WRONG: 'X',
  EMPTY: ' ',
};

class Path {
  #paths;
  #pathMap;

  constructor() {
    this.#paths = [];
    this.#pathMap = [[], []];
  }

  move(position) {
    this.#paths.push(position);
    return this.#paths;
  }

  mark(isRight) {
    const currentPath = this.getCurrentPath();
    const marking = isRight ? MARKING.RIGHT : MARKING.WRONG;

    currentPath === 'D' ? this.#markD(marking) : this.#markU(marking);

    return this.#pathMap;
  }

  getCurrentPath() {
    return this.#paths[this.#paths.length - 1];
  }

  getPathMap() {
    return this.#pathMap;
  }

  getPaths() {
    return this.#paths;
  }

  #markU(marking) {
    const current = this.#paths.length - 1;

    this.#pathMap[MOVING.U][current] = marking;
    this.#pathMap[MOVING.D][current] = MARKING.EMPTY;
  }

  #markD(marking) {
    const current = this.#paths.length - 1;

    this.#pathMap[MOVING.U][current] = MARKING.EMPTY;
    this.#pathMap[MOVING.D][current] = marking;
  }
}

module.exports = Path;

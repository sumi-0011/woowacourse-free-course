const { MOVING, MARKING } = require('./utils/constants');

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

  mark(isMoveable) {
    const currentPath = this.getCurrentPath();
    const marking = isMoveable ? MARKING.RIGHT : MARKING.WRONG;

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

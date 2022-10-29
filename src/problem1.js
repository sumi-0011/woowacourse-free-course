function checkSuccessfulOpenPage(leftPage, rightPage) {
  return rightPage - leftPage !== 1;
}
function problem1(pobi, crong) {
  if (checkSuccessfulOpenPage(...pobi) || checkSuccessfulOpenPage(...crong)) {
    return -1;
  }
}

module.exports = problem1;

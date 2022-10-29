function checkSuccessfulOpenPage(leftPage, rightPage) {
  return rightPage - leftPage !== 1;
}

function getNumberList(number) {
  return [...number.toString()].map((s) => parseInt(s));
}
function problem1(pobi, crong) {
  if (checkSuccessfulOpenPage(...pobi) || checkSuccessfulOpenPage(...crong)) {
    return -1;
  }

  const pobiNumbers = pobi.map((po) => getNumberList(po));
  const crongNumbers = crong.map((cr) => getNumberList(cr));

}

module.exports = problem1;

function problem2(cryptogram) {
  const stack = [""];
  let idx = 0;

  for (const c of cryptogram) {
    if (c === stack[idx]) {
      stack.pop();
      idx--;
    } else {
      stack.push(c);
      idx++;
    }
  }

  return stack.join("");
}

module.exports = problem2;

function divide(a, b) {
  if (b == 0) {
    throw new Error();
  }
  return a / b;
}

module.exports = { divide };

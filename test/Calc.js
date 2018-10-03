class Calc {
  add(a, b) {
    return a + b;
  }

  divide(a, b) {
    if (b == 0) {
      throw new Error();
    }
    return a / b;
  }
}

module.exports = { Calc };

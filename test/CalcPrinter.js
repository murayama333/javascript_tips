class CalcPrinter {

  constructor(calc){
    this.calc = calc;
  }

  print4add(a, b) {
    const c = this.calc.add(a, b);
    return `${a} + ${b} = ${c}`;
  }
}

module.exports = { CalcPrinter };

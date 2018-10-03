const Calc = require('./Calc').Calc;

test('Calc#add 1, 2 to equal 3', () => {
  var calc = new Calc();
  expect(calc.add(1, 2)).toBe(3);
});

test('Calc#divide 4, 2 to equal 2', () => {
  var calc = new Calc();
  expect(calc.divide(4, 2)).toBe(2);
});

test('Calc#divide 4, 0 to throw Error', () => {
  var calc = new Calc();
  expect(() => {calc.divide(4, 0)}).toThrow(Error);
});

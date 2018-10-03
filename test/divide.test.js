const divide = require('./divide').divide;

test('divides 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});

test('divides 0 / 2 to equal 0', () => {
  expect(divide(0, 2)).toBe(0);
});

test('divides 2 / 0 to throw exception', () => {
  expect(() => { divide(2, 0); }).toThrow(Error);
});

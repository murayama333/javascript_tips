const CalcPrinter = require('./CalcPrinter').CalcPrinter;
// const Calc = require('./Calc').Calc;

describe("Calc", () => {
  describe("print4add", () => {
    it("should be print '1 + 2 = 3'", () => {
      // const calc = new Calc();
      const mockedCalc = { add: jest.fn((a, b) => 3) }
      const calcPrinter = new CalcPrinter(mockedCalc);
      expect(calcPrinter.print4add(1, 2)).toBe("1 + 2 = 3");

      expect(mockedCalc.add.mock.calls.length).toBe(1);
      expect(mockedCalc.add.mock.calls[0]).toEqual([1, 2]);
    });
  });
});

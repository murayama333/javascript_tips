# Jest超入門

---

## Jestビギナーの感想

+ RSpecライクなテストフレームワーク
+ カバレッジが良い感じ。スナップショットテスト気になる。
+ 結論：とってもよさげ

---

## 単体テストフレームワークの歴史

+ 2000年代：JUnitなどのxUnit系テストフレームワークが登場
  + XPでTDDが提唱される by ケントベック。TDDブームに。
+ Railsの登場後、DSLな雰囲気が強まってRSpecが人気に。
  + オシャレにBDDとかいわれるように。ビヘイビア駆動。
  + JSはJasmineとか。
+ FBがJestを開発。Reactもサポート。

---

## テスト（ビヘイビア＝振る舞いの仕様）を先に書くと何が嬉しいの？

> どうだろうね。

---

## テスト（ビヘイビア＝振る舞いの仕様）を先に書くと何が嬉しいの？

> 答え：ライブラリの利用者目線でコードを書くことになります。

---

## ところで、現役ITエンジニアのみなさん

「優れたコードの定義とはなにか」

+ 可読性の高いコード？
+ 高速に動作するコード？
+ 短いコード？

---

## 否

テストしやすいコードです。

> 10何年やってそう思っています。

---

## それではテストしやすいコードとは何か

再利用性の高いコードです。

---

## 再利用性の高いコードとは何か

+ 責務が明確である
+ 依存が少ない
+ 責務。

> 責務とか難しくかきましたが、クラスやメソッドのやるべきことが明確で、単純ってことです。

---

## やってみよう。Jest

1. functionのテスト
2. クラスのテスト
3. モックを使ったテスト

---

### 0. プロジェクトの準備

Nodeのプロジェクトを作ります。開発用ライブラリとしてjestをインストールします。

```
npm init
```

```
npm install --save-dev jest
```

package.jsonのscriptsを修正します。

```js
{
  // ..
  "scripts": {
    "test": "jest"
  },
  // ..
}
```

以降は以下のようにテストできます。

```
npm test
```


---

### 1. functionのテスト

sum.jsを作ります。

```js
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

---

sum.test.jsを作ります。

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

テストしましょう。

```
$ npm test

> test2@1.0.0 test /Users/murayama/Desktop/test2
> jest

 PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.572s
Ran all test suites.
```

---

#### 課題

1 + 0 = 1のテストコードを追加してください。


---


```js
test('adds 1 + 0 to equal 1', () => {
  expect(sum(1, 0)).toBe(1);
});
```

テストしましょう。

```
$ npm test

> test2@1.0.0 test /Users/murayama/Desktop/test2
> jest

 PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (4ms)
  ✓ adds 1 + 0 to equal 1 (6ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.493s
Ran all test suites.
```



---

#### テストファースト

foo.js => foo.test.jsの順に作るのではなく、<br>foo.test.jsから先に作ります。

---

それでは足し算に続いて、割り算にチャレンジしましょう。divide.test.jsを作成します。

```js
const divide = require('./divide').divide;

test('divides 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});
```

まだ存在しないdivideメソッドを、利用者目線でテストケースとして定義します。

> 刮目せよ。<br>今、君はdivide functionの仕様（振る舞い）を定義している。

---

次にdivide.jsを作成します。

```js
function divide(a, b) {
  return a / b;
}

module.exports = { divide };
```

> テストを実行してみましょう。

---

0による除算はどうでしょう。divide.test.jsを更新します。


```js
const divide = require('./divide').divide;

test('divides 4 / 2 to equal 2', () => {
  expect(divide(4, 2)).toBe(2);
});

test('divides 2 / 0 to throw exception', () => {
  expect(() => { divide(2, 0); }).toThrow(Error);
});
```

> ここでは例外（Errorオブジェクト）がスローされることを期待しています。

---

プロダクトコード（divide.js）を修正します。

```js
function divide(a, b) {
  if (b == 0) {
    throw new Error();
  }
  return a / b;
}

module.exports = { divide };
```

> テストを実行してみましょう。


---

### 2. クラスのテスト

functionのテストに続いてクラスをテストしてみましょう。

計算機（Calc）クラスを定義します。

---

さきにテストコード（Calc.test.js）です。

```js
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
```

> 正しくはここでテストを実行します。<br>テストに失敗するところから開発をスタートします。

---

それからプロダクトコード（Calc.js）を実装します。


```js
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
```
> テストしましょう。

---

Calc.test.jsはリファクタリングできます。

// TODO

---

### 3. モックを使ったテスト

次に依存関係のあるクラスをテストしてみましょう。

CalcPrinterクラスはCalcクラスに依存するものとします。

+ CalcPrinter => Calc

> Calcクラスはすでに作成済みのものを使います。


CalcPrinterクラスのprint4addメソッドは引数に1, 2を受け取ると、次のような文字列を出力します。

```
"1 + 2 = 3"
```

> Calc#add(1, 2) => 3 です。<br>CalcPrinter#print4add(1, 2) => "1 + 2 = 3" です。

---

CalcPrinterのテストコード（CalcPrinter.test.js）を作成します。

```js
const CalcPrinter = require('./CalcPrinter').CalcPrinter;
const Calc = require('./Calc').Calc;

describe("Calc", () => {
  describe("print4add", () => {
    it("should be print '1 + 2 = 3'", () => {
      const calc = new Calc();
      const calcPrinter = new CalcPrinter(calc);
      expect(calcPrinter.print4add(1, 2)).toBe("1 + 2 = 3");
    });
  });
});
```
> テストを実行します。失敗するところから始めましょう。

---

それからプロダクトコード（CalcPrinter.js）を作成します。

```js
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
```

> print4addの中では、文字列の中で変数を展開しています。

テストしてみましょう。

---

#### テストカバレッジ

テストによってどの程度、プロダクトコードをテストできたか確認してみましょう。

---

```
npm test -- --coverage

> test2@1.0.0 test /Users/murayama/Desktop/test2
> jest "--coverage"
 PASS  ./sum.test.js
 PASS  ./CalcPrinter.test.js
 PASS  ./divide.test.js
 PASS  ./Calc.test.js
----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |      100 |      100 |      100 |      100 |                   |
 Calc.js        |      100 |      100 |      100 |      100 |                   |
 CalcPrinter.js |      100 |      100 |      100 |      100 |                   |
 divide.js      |      100 |      100 |      100 |      100 |                   |
 sum.js         |      100 |      100 |      100 |      100 |                   |
----------------|----------|----------|----------|----------|-------------------|
Test Suites: 4 passed, 4 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.102s
Ran all test suites.
```

> おや、coverageフォルダに気づいたかい。


---


他にも--verboseオプションも確認してみましょう。

```
npm test -- --verbose
```





---

#### 依存関係について


さっきのテストコード、ちょっと問題があります。

さて何が良くないのでしょうか。

---


# CalcPrinterクラスをテストしたいのに、<br>Calcクラスもテストしちゃっている問題

ここではCalcオブジェクトを使わずに、<br>モックオブジェクトを使うようにします。

> 注意：モックを使うことが必ずしも正義ではありません。プロジェクトの特性に合わせて、判断しましょう。


---

CalcPrinterのテストコード（CalcPrinter.test.js）を作成します。

```js
const CalcPrinter = require('./CalcPrinter').CalcPrinter;
// const Calc = require('./Calc').Calc;

describe("Calc", () => {
  describe("print4add", () => {
    it("should be print '1 + 2 = 3'", () => {
      // const calc = new Calc();
      // mock object
      const mockedCalc = { add: jest.fn((a, b) => 3) }
      const calcPrinter = new CalcPrinter(mockedCalc);
      expect(calcPrinter.print4add(1, 2)).toBe("1 + 2 = 3");

      // mock method call inspection
      expect(mockedCalc.add.mock.calls.length).toBe(1);
      expect(mockedCalc.add.mock.calls[0]).toEqual([1, 2]);
    });
  });
});
```

> モックオブジェクトは、自己検証機能をもちます。


---


CalcPrinterクラスのテストにおいて、Calcクラスのテストを含まないようにします。これは責任範囲を明確にするためです。

Calcクラスを実装するのはAさん、CalcPrinterクラスを実装するのはBさんというように考えてみてください。

> 外部リソースに依存するクラス（DBとかWebAPI叩くようなクラス）はモックオブジェクトにするとパフォーマンス面でもメリットがあります。

---


### 次にやること

おめでとう。あとはマニュアル読めば大体できるようになります。

+ Using Matchers
  + https://jestjs.io/docs/ja/using-matchers
+ Testing Asynchronous Code
  + https://jestjs.io/docs/ja/asynchronous
+ Snapshot Test
  + https://jestjs.io/docs/ja/snapshot-testing

次回はReactでSnapshot Testやりましょう。
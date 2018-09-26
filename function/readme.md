# 関数呼び出しについて

+ 関数呼び出し
+ メソッド呼び出し
+ コンストラクタ呼び出し
+ ES6：クラスベースへの置き換え
+ applyメソッドによる呼び出し
+ クロージャ

---

## 関数呼び出し

```js
var my_function = function() {
  console.log("foo");
}

my_function();
```

+ 関数名の付け方について
+ アロー関数式について

---

## メソッド呼び出し

```js
var myObject = {
  myProp: "myProp",
  myMethod: function() {
    console.log("myMethod", this.myProp);
  }
}

myObject.myMethod();
```

+ 関数とメソッドの違いについて
+ レシーバオブジェクトについて

---

## コンストラクタ呼び出し

```js
var Car = function(name, gas){
  this.name = name;
  this.gas = gas;

  this.move = function() {
    if (this.gas > 0) {
      console.log(this.name, "move", this.gas);
      this.gas--;
    } else {
      console.log(this.name, "stop", this.gas);
    }
  }
}

var car1 = new Car("kwagon", 5);
var car2 = new Car("kbox", 3);

for (var i = 0; i < 4; i++) {
  car1.move();
  car2.move();
}
```

+ コンストラクターとは何か
+ prototypeとは何か

---

## ES6：クラスベースへの置き換え

```js
class Car {
  constructor(name, gas) {
    this.name = name;
    this.gas = gas;
  }

  move(){
    if (this.gas > 0) {
      console.log(this.name, "move", this.gas);
      this.gas--;
    } else {
      console.log(this.name, "stop", this.gas);
    }
  }
}

var car1 = new Car("kwagon", 5);
var car2 = new Car("kbox", 3);

for (var i = 0; i < 5; i++) {
  car1.move();
  car2.move();
}
```

+ クラスベースとprototypeの違いについて

---


## applyメソッドによる呼び出し

```js
class Car {
  constructor(name, gas) {
    this.name = name;
    this.gas = gas;
  }

  move(){
    if (this.gas > 0) {
      console.log(this.name, "move", this.gas);
      this.gas--;
    } else {
      console.log(this.name, "stop", this.gas);
    }
  }
}
var car1 = new Car("kwagon", 5);

car1.move.apply({name: "foo", gas:10});
```

+ applyメソッドの第1引数は何か
+ callメソッドについて

---

## クロージャ

```js
var counter = function(){
  var count = 0;
  return function() {
    count++;
    console.log("count", count);
  }
}();

counter();
counter();
counter();
```

+ クロージャとは何か
+ クロージャとオブジェクトの違いは何か

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

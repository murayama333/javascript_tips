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


Car.prototype.show = function() {
  console.log(this.gas);
}

car1.show();
car2.show();

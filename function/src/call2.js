var myObject = {
  myProp: "myProp",
  myMethod: function() {
    console.log("myMethod", this.myProp);
  }
}

myObject.myMethod();

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

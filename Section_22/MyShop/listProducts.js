var faker = require('faker');

function shop(n){
  for(var i = 0; i < n; i++){
    console.log(faker.commerce.productName() + " - " + faker.commerce.price());
  }  
}

console.log("===================");
console.log("WELCOME TO MY SHOP!");
console.log("===================");
var list = shop(10);
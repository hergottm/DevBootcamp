var age = Number(prompt("Please enter your age"));

if(age < 0){
	console.log("less than 0");
}

if(age === 21) {
	console.log("happy 21st birthday");
}

if(age % 2 !==0) {
	console.log("your age is odd");
}

if(age % Math.sqrt(age) === 0) {
	console.log("Your age is perfect sqaure!");
}
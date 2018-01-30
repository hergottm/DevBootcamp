
//Is the number even?
function isEven(x){
	return x % 2 === 0;	
}
//call to function
isEven(11);



//Factorial 4x3x2x1 = 24
function factorial(num){
	var result = 1;
	for(var i=1; i<=num; i++){
		result	= result * i;
	}
	return result;
}
//call to function
factorial(4)





//String Replace
function kebabToSnake(str) {
	//replace all dashes with underscores
	var newStr = str.replace(/-/g , "_");
	return newStr;
}
//call to function
kebabToSnake("hello-world");
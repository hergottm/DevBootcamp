//printReverse
// takes an array as an argument 
// and prints out the element in the array
// in reverse order
	function printReverse(array){
		for(var i = array.length-1; i>=0; i--){
			console.log(array[i]);
		}
	}


// FUNCTION isUniform()
// take an array as an argument and returns 
// true of all elements in the array are identical
	function isUniform(array){
		//grab first array element to conpare to the others
		var first = array[0];
		// loop through all the elements comparing 
		for(var i = 1; i < array.length; i++){
			if(array[i] !== first){
				return false;
			}
		}
		return true;
	}

// FUNCTION sumArray()
// accepts an array of number and returns the sum of all numbers in the array
	function sumArray(array){
		var total = 0;
		array.forEach(function(element){
			total+=element;
		})
		return total;
	}	

// // FUNCTION max()
// // accepts an array of numbers and returns the maximum number in the array
	function max(array){
		var counter = array[0];
		for(var i = 0; i<array.length; i++){
			if(array[i] > counter){
				counter = array[i];
			}
		}
		return counter;
	}


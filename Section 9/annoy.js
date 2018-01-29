// var answer = prompt("are we there yet");

// while(answer != "yes" && answer != "ya"){
// 	var answer = prompt("are we there yet");
// }

// alert("YAY, we made it");

//version 2

var answer = prompt("are we there yet");

while(answer.indexOf("yes")){
	var answer = prompt("are we there yet");
}

alert("YAY, we made it");
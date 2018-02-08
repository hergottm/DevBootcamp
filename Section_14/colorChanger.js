var button = document.querySelector("button");
var isPurple = false;
button.addEventListener("click", function(){
	// the  .toggle below saves you from having to set
	// boolean values and shortens the code
	// but you have to add that specific class in a 
	// style in css.
	document.body.classList.toggle("purple");	
})






// document.addEventListener("click",function(){
// 	if(isPurple === true){
// 		document.body.style.backgroundColor = "white";
// 	} else {
// 		document.body.style.backgroundColor = "purple";
// 	}
// 	isPurple = !isPurple;
// });
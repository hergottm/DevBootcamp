//creat secret Number
var secretNumber = 4;

//ask user for guess
var stringGuess = prompt("Guess a number!");
var guess = Number(stringGuess);

//check if guess is right?
if(guess === secretNumber){
	alert("You have guessed the secret number!!!")
} 

//other check if guess is higher
else if (guess > secretNumber){
	alert("Your number is too high")
}

//otherwise, check if lower
else {
	alert("Too low, guess again")
}


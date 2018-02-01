// selects the player 1 button
var p1Button = document.querySelector("#p1");
// selects the player 2 button
var p2Button = document.getElementById("p2");
// selects the reset button
var resetButton = document.getElementById("reset");
// selects the p1 score from html span "p1Display"
var p1Display = document.querySelector("#p1Display");
// selects the p2 score from html span "p2Display"
var p2Display = document.querySelector("#p2Display");
// select the input bar on screen
var numInput = document.querySelector("input[type='number']");
var playingToDisplay = document.querySelector("p span");
//set the p1score to 0
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;


p1Button.addEventListener("click", function(){
	if(!gameOver){
		p1Score++;
		console.log(p1Score, winningScore)
		if (p1Score === winningScore) {
			p1Display.classList.add("winner");
			gameOver = true;
		}
		p1Display.textContent = p1Score;
	}
})

p2Button.addEventListener("click", function(){
	if (!gameOver) {
		p2Score++;
		if (p2Score === winningScore) {
			p2Display.classList.add("winner");
			gameOver = true;
		}
		p2Display.textContent = p2Score;
	}	
})


resetButton.addEventListener("click", function(){
	reset();
})


function reset(){
		// set p1 and p2 score back to zero
	p1Score = 0;
	p2Score = 0;

	// set the set p1 and p2 score back to zero on screen
	p1Display.textContent = 0;
	p2Display.textContent = 0;

	// remove the winner class from the screen
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	// set game over to false, so the game can be played again
	gameOver = false;
	

	// add a "change" event
	numInput.addEventListener("change", function(){
		playingToDisplay.textContent = this.value;
		// change the input from the textbox to a "number"
		winningScore = Number(this.value);
		reset();
	});
}












/* Farkle game for one player.

Developed by Liam Knight for CareSense.*/

// Initialize variables
let diceArr = [];
let turnCount = 0;
let ultimateScore = 0;
let rollScoresForTurnArr = [];
let turnScoresForTotalArr = [];

/* Changed to diceArr[i].id = "die" + (i + 1); 
added parentheses, seemed to be an error in setting the ids of the dice.*/
function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
		//diceArr[i].counted = false;
	}
}

/*Rolling dice values.*/
function rollDice(){
	if(turnCount < 4){
		console.log("rollDice called")
		for(let i=0; i < 6; i++){
			// If dice not clicked, set it a random value between 1-6
			if(diceArr[i].clicked === 0){
				diceArr[i].value = Math.floor((Math.random() * 6) + 1);
			}
			// If the dice is clicked, do nothing (debug statement)
			else{
				console.log(diceArr[i] + " is clicked ")
			}
		}
		updateDiceImg();
	}
	//else{
		//console.log("You've had 4 turns, this is your last chance to bank a good score!")
	//}
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	let diceImage;
	for(let i = 0; i < 6; i++){
		//console.log(diceArr[i].id + " has value " + diceArr[i].value)
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	// First we get the data-number for the dice we clicked on (0-5)
	let i = img.getAttribute("data-number");
	// If dice was unclicked, set it to clicked
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
		//diceArr[i].counted = true;
		img.style.opacity = 0.5;
		//console.log(i + " counted state = " + diceArr[i].counted)
	}
}

/* TODO: Checks if the roll was a Farkle.
function checkFarkle(){

}*/

/* Sets all dice back to unclicked. */
function setAllUnclicked(){
	for(let i = 0; i < 6; i++){
		diceArr[i].clicked = 0;
	}
}

/* Sets all dice back to untransparent. */
function setAllUntransparent(){
	for(let i = 0; i < 6; i++){
		let diceId = "die" + (i + 1);
		document.getElementById(diceId).style.opacity = 1;
	}
}

/* Calculate score. */
function calculateTurnScore() {
	let ones = [];
	let twos = [];
	let threes = [];
	let fours = [];
	let fives = [];
	let sixes = [];

	let onesScore = 0;
	let twosScore = 0;
	let threesScore = 0;
	let foursScore = 0;
	let fivesScore = 0;
	let sixesScore = 0;

	/* Go through each dice position and if it is clicked, add its value to the right list,
	TODO: make it so we do not include die clicked on previous rolls (within same turn)
	when we calculate the roll score, find a way to indicate when a die has already been counted
	(add counted property to dice object?). */
	for(let i=0; i < 6; i++){
		if (diceArr[i].clicked === 1) {
			switch (diceArr[i].value){
				case 1: ones.push(1);
				break;

				case 2: twos.push(2);
				break;

				case 3: threes.push(3);
				break;

				case 4: fours.push(4);
				break;

				case 5: fives.push(5);
				break;

				case 6: sixes.push(6);
				break;
			}
		}
	}

	/* Calculate the length of each list and add points as appropriate,
	my assumption here that if have four 5s, for example, that
	the points stack up as the (total for three 5s + one 5), etc.
	Another assumption: if they click four or five 2s (or 3s, 4s, or 6s), they receive
	the points for three of that number (aka four 2s gets 200 points).
	Note: Updated to switch-case logic. */
	
	switch(ones.length){
		case 1: onesScore = 100;
		break;
		
		case 2: onesScore = 200;
		break;

		case 3: onesScore = 1000;
		break;

		case 4: onesScore = 1100;
		break; 

		case 5: onesScore = 1200;
		break;

		case 6: onesScore = 2000;
		break;
	}

	switch(twos.length){
		case 3: twosScore = 200;
		break;

		case 4: twosScore = 200;
		break;

		case 5: twosScore = 200;
		break;

		case 6: twosScore = 400;
		break;

		default: twosScore = 0;
	}

	switch(threes.length){
		case 3: threesScore = 300;
		break;

		case 4: threesScore = 300;
		break;

		case 5: threesScore = 300;
		break;

		case 6: threesScore = 600;
		break;

		default: threesScore = 0;
	}

	switch(fours.length){
		case 3: foursScore = 400;
		break;

		case 4: foursScore = 400;
		break;

		case 5: foursScore = 400;
		break;

		case 6: foursScore = 800;
		break;

		default: foursScore = 0;
	}

	switch(fives.length){
		case 1: fivesScore = 50;
		break;
		
		case 2: fivesScore = 100;
		break;

		case 3: fivesScore = 500;
		break;

		case 4: fivesScore = 550;
		break; 

		case 5: fivesScore = 600;
		break;

		case 6: fivesScore = 1000;
		break;
	}

	switch(sixes.length){
		case 3: sixesScore = 600;
		break;

		case 4: sixesScore = 600;
		break;

		case 5: sixesScore = 600;
		break;

		case 6: sixesScore = 1200;
		break;

		default: sixesScore = 0;
	}
	
	// Add up each {numbers}Score for total points for this roll
	let sum = onesScore + twosScore + threesScore + foursScore + fivesScore + sixesScore;
	
	if(sum === 0){
		console.log("Farkle! Your turn is over.")
	}
	console.log("roll sum is " + sum)

	// Add this roll score to the total turn score array
	rollScoresForTurnArr.push(sum);
	console.log("rollScoresForTurnArr is ")
	console.log(rollScoresForTurnArr)

	return sum
}

/* Display the player's score and the number of turns they've taken. */
function displayTempScore(){
	console.log("displayTempScore called")
	// Calculate score for that roll
	let tempScore = calculateTurnScore()
	// Displaying
	const scoreDisplay = document.getElementById("row-score")
	scoreDisplay.innerHTML = tempScore
	const turnDisplay = document.getElementById('row-turns')
	turnDisplay.innerHTML = turnCount
}

/* Increase turn count, display the player's score and the number of turns they've taken,
set all dice to unclicked/untransparent to prepare for next turn. */
function bankScore(){
	console.log("bank Score called")
	//showTotalScoresArrAndSum();
	let turnSum = 0;
	turnCount += 1;
	
	/* Currently, take only last term on totalScoresArr 
	(which will be cumulative over all rolls in turn)*/
	turnSum = rollScoresForTurnArr[rollScoresForTurnArr.length - 1];

	// Display sum and turn count
	const scoreDisplay = document.getElementById("row-score")
	scoreDisplay.innerHTML = turnSum
	const turnDisplay = document.getElementById('row-turns')
	turnDisplay.innerHTML = turnCount
	
	// Set ready for next turn
	setAllUnclicked();
	setAllUntransparent();
	
	// Empty the array of roll scores for the turn
	rollScoresForTurnArr = [];

	// Add turnSum to an array of scores for each turn
	turnScoresForTotalArr.push(turnSum);
	console.log("turnScoresForTotalArr is ")
	console.log(turnScoresForTotalArr)

	// Display last chance message
	//TODO: change to display on screen not console
	if(turnCount === 4){
		console.log("You've had 4 turns, this is your last chance to bank a good score!")
	}

	// Display ultimate score after 5 turns
	//TODO: change to display final message and score on screen not console
	if(turnCount === 5){
		console.log("Game over! Your final score is: ")
		for(let i = 0; i < turnScoresForTotalArr.length; i++){
			ultimateScore += turnScoresForTotalArr[i];
		}
		console.log(ultimateScore)
	}
}

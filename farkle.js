/* Note: Extended comments at bottom of file. */


var diceArr = [];
var turnCount = 0;


/* Changed to diceArr[i].id = "die" + (i + 1);
added parentheses, seemed to be an error in setting
the ids of the dice*/
function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	
}


/*Rolling dice values*/
function rollDice(){
	if(turnCount < 4){
		console.log("rollDice called")
		for(var i=0; i < 6; i++){
			// if dice not clicked, set it a random
			// value between 1-6
			if(diceArr[i].clicked === 0){
				diceArr[i].value = Math.floor((Math.random() * 6) + 1);
			}
			//if the dice is clicked, do nothing
		}
		updateDiceImg();
		//increment the number of turns the player has used
		turnCount += 1;
		
	}
	else{
		console.log("You've now had 5 turns, game over!")
	}
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		console.log(diceArr[i].id + " has value " + diceArr[i].value)
		
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	//first we get the data-number for the dice we clicked on (0-5)
	var i = img.getAttribute("data-number");

	//toggles the transparent-ish back and forth
	img.classList.toggle("transparent");
	
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked == 1;
		console.log(diceArr[i].clicked)
	}
	else{
		diceArr[i].clicked = 0;
	}

}

/* Calculate score */
function calculateTurnScore() {
	var ones = [];
	var twos = [];
	var threes = [];
	var fours = [];
	var fives = [];
	var sixes = [];

	var onesScore = 0;
	var twosScore = 0;
	var threesScore = 0;
	var foursScore = 0;
	var fivesScore = 0;
	var sixesScore = 0;


	// array to keep partial scores in
	var scoresArr = []

	// array to keep each turn's score in
	var tempScoresArr = [];

	

	/* Go through each dice position and if it is clicked, add its value to the right list,
	TODO: finish implementing the inclusion of the clicked state feature where we take 
	clicked into account. */
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			if(diceArr[i].value === 1){
				ones.push(1)
			}
			if(diceArr[i].value === 2){
				twos.push(2)
			}
			if(diceArr[i].value === 3){
				threes.push(3)
			}
			if(diceArr[i].value === 4){
				fours.push(4)
			}
			if(diceArr[i].value === 5){
				fives.push(5)
			}
			if(diceArr[i].value === 6){
				sixes.push(6)
			}
		}
	}

	/* Calculate the length of each list and add points as appropriate,
	my assumption here that if have four 5s, for example, that
	the points stack up as the (total for three 5s + one 5), etc.
	Note: If given more time I would code this in a more efficient/elegant way. */
	if(ones.length >= 1){
		if(ones.length === 1){
			onesScore = 100
		}
		if(ones.length === 2){
			onesScore = 200
		}
		if(ones.length === 3){
			onesScore = 1000
		}
		if(ones.length === 4){
			onesScore = 1100
		}
		if(ones.length === 5){
			onesScore = 1200
		}
		if(ones.length === 6){
			onesScore = 2000
		}

		scoresArr.push(onesScore)
	}
	
	if(twos.length >= 1){
		if(twos.length === 3){
			twosScore = 200
		}
		if(twos.length === 6){
			twosScore = 400
		}
		scoresArr.push(twosScore)
	}
	if(threes.length >= 1){
		if(threes.length === 3){
			threesScore = 300
		}
		if(threes.length === 6){
			threesScore = 600
		}
		scoresArr.push(threesScore)
	}
	if(fours.length >= 1){
		if(fours.length === 3){
			foursScore = 400
		}
		if(fours.length === 6){
			foursScore = 800
		}
		scoresArr.push(foursScore)
	}
	if(fives.length >= 1){
		if(fives.length === 1){
			fivesScore = 50
		}
		if(fives.length === 2){
			fivesScore = 100
		}
		if(fives.length === 3){
			fivesScore = 500
		}
		if(fives.length === 4){
			fivesScore = 550
		}
		if(fives.length === 5){
			fivesScore = 600
		}
		if(fives.length === 6){
			fivesScore = 1000
		}

		scoresArr.push(fivesScore)
	}
	if(sixes.length >= 1){
		if(sixes.length === 3){
			sixesScore = 600
		}
		if(sixes.length === 6){
			sixesScore = 1200
		}
		scoresArr.push(sixesScore)
	}

	console.log(scoresArr)
	//add up everything in scoresArr for total turn points
	var sum = 0
	for(var i = 0; i < scoresArr.length; i++){
		sum += scoresArr[i];
	}
	if(sum === 0){
		console.log("Farkle! Your turn is over.")
	}

	/* TODO: finish implementing adding this current sum to the array of scores, 
	then sum over the scores to find the new sum to return (and thus be displayed)
	tempScoresArr.push(sum)*/

	return sum
	
}




/* Display the player's score and the number of turns they've taken. */
function displayScore(){
	const scoreDisplay = document.getElementById('score')
	let score = calculateTurnScore()
	scoreDisplay.innerHTML = score
	const turnDisplay = document.getElementById('turns')
	turnDisplay.innerHTML = turnCount
}


/* I did not have time to implement the features I originally planned, due to the fact that
relative unfamiliarity with Javascript/HTML made me need to spend a good mount of time checking syntax,
functions etc, and figuring out what would be feasible for me to do in this amount of time.

What I started but abandoned due to time awareness, less critical:
	- displaying the score where the graphics imply it should be 
	- have the Farkle message (if a dice roll results in score of 0) display on screen instead of to console,
	same for '5 turns' message

The plan for what I would keep working on/implement if given the opportunity, most critical:
	- a modified, single player Farkle game of chance, where the challenge is to see if you can beat 5,000 points
	in 5 turns or less (to be adjusted as necessary)
	-  currently the program autocalculates your max score for each roll of the dice with the player having to
	click anything, I would finish implementing the functionality that requires the player to click before
	a particular die is including in the score for that turn
	- ultimately make a more complicated multiplayer game that also accounts for the choice a player has 
	in terms of either banking their points for a particular roll and passing, or going again, which I laid the groundwork
	for and mapped out in a pseudocode diagram

*/
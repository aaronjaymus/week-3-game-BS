var word; //The word we will be guessing for the game
var guess; //When key is pressed, this will assume value of keystroke
var wordArray = []; //This will start as all underscores, the length of the word. But will fill in with letters as they are guessed
var guessArray = []; // This will contain the letters that have been guessed
var wordSplit;
var wordGroup = ["pabst", "bohemian", "whiskey", "brews", "hopfest", "tequila", "beer", "scotch", "bourbon"]
var wrongCount = 0; //this will track how many wrong guesses the user makes
var guessAmount = 10;
var gameOver = false;
var userWin = false;
var gameStart = false;




var game = {
	//this will select word from wordGroup based on random number selected.
	selectWord () {
		var random = Math.floor(Math.random() * wordGroup.length);
		console.log(random);
		word = wordGroup[random];
		wordSplit = word.split("");
		console.log(wordSplit);
		console.log(word);
	}, 
	//this will set an array of all underscores to begin with, length of the word selected on page load
	setWordArray () {
		for (var i = 0; i < word.length; i++) {
			wordArray.push("_");
		}
		
		//console.log(wordArray);
	},
	//this will add letter to wordArray one at a time as letters are guessed. 
	fillWordArray (letter) {
		var index = word.indexOf(letter);

		console.log("Index: " + index);
		
		if (index !== -1) {
			for (var i=0; i < wordArray.length; i++){
				if(letter===wordSplit[i]){
					wordArray[i]=wordSplit[i];
				}
			}
		}
	},
	//adds guessed letter to guessArray
	fillGuessArray (letter){
		guessArray.push(letter);
	},
	//this will check that guessed letter is part of word selected. 
	checkLetter (letter) {
		var index1 = guessArray.indexOf(letter); //index of letter in the guessedArray
		console.log("Index1: " + index1);

		//checks if letter has already been guessed
		if(index1 === -1) {
			this.fillGuessArray(letter);

			var index2 = word.indexOf(letter); //index of letter in word to be guessed
		
			console.log("Index2: " + index2);
		
			if (index2 !== -1) {
				this.fillWordArray();
			} else {
				wrongCount += 1;
			}

		}	
		console.log("Wrong count: " + wrongCount);
	},
	//this will check to see if they've maxed out their wrong guesses. They get 10 wrong guesses.
	checkWrongCount () {
		if (wrongCount >= 10){
			gameOver = true;
			game.buttonWin();
		}
	},
	checkWin () {
		var index = wordArray.indexOf("_");
		if(index === -1) {
			gameOver = true;
			userWin = true;
			var song = new Audio('assets/sound/whiskeynights.mp3');
			song.play();
			game.buttonWin();
		}	
	},
	printGuessesLeft () {
		var guessCounter = document.getElementById("guessRemain");
		guessCounter.innerHTML = guessAmount - wrongCount;
	},
	//prints what is in the word array to the page after each letter press. 
	printWordArray () {
		var printWord = document.getElementById("wordFill");
		printWord.innerHTML = "";
		for(var i=0; i < wordArray.length; i++){
			var printLetter = document.createElement("div");
			printLetter.className = "col-md-1";
			printLetter.innerHTML = wordArray[i];
			printWord.appendChild(printLetter);
		}
	},
	//prints what letters have been guessed.
	printGuessArray () {
		var printGuess = document.getElementById("guessMade");
		printGuess.innerHTML = "";
		var firstLetter = true;
		for (var i=0; i < guessArray.length; i++) {
			var newGuess = document.createElement("div");
			newGuess.className = "col-md-1";
			if(firstLetter) {
				newGuess.innerHTML = guessArray[i];
				firstLetter = false;
			} else {
				newGuess.innerHTML = guessArray[i];
			}
			printGuess.appendChild(newGuess);
		}
	},
	//creates a "You Win" or "You Lose" message and a button that allows you to refresh the page to play again.
	buttonWin () {
		var winArea = document.getElementById("winArea");
		var youWin = document.createElement("h3");		
		var winButton = document.createElement("button");
		winButton.className = "btn btn-primary";
		winButton.onclick = function () {
			location.reload();
		}
		if (userWin) {
		youWin.innerHTML = "YOU WIN!";
		game.printPicWin();
		} else {
			youWin.innerHTML = "YOU LOSE!";
			document.getElementById("wordImage").src = "assets/images/hung.png"
		}
		winButton.innerHTML = "Play again?";
		winArea.appendChild(youWin);
		winArea.appendChild(winButton);	
	},
	printPicWin () {
		var imageIndex = wordGroup.indexOf(word);
		switch (imageIndex) {
			case 0:
			document.getElementById("wordImage").src = "assets/images/pbr.jpg";
			break;
			
			case 1:
			document.getElementById("wordImage").src = "assets/images/nattyboh.jpg";
			break;
			
			case 2: 
			document.getElementById("wordImage").src = "assets/images/whiskey.jpg";
			break;
			
			case 3:
			document.getElementById("wordImage").src = "assets/images/brews.jpg";
			break;
			
			case 4: 
			document.getElementById("wordImage").src = "assets/images/hops.jpg";
			break;
			
			case 5:
			document.getElementById("wordImage").src = "assets/images/tequila.jpg";
			break;
			
			case 6:
			document.getElementById("wordImage").src = "assets/images/beer.jpg";
			break;
			
			case 7:			
			document.getElementById("wordImage").src = "assets/images/scotch.jpg";
			break;
			
			case 8:
			document.getElementById("wordImage").src = "assets/images/bourbon.jpg";
			break;
			
			default:
			break;
		}
	},
	printPicLose () {

	}

}


window.onload = function () {
	game.selectWord();
   	game.setWordArray();
   	game.printGuessesLeft();
   	game.printWordArray();
}


document.onkeyup = function(event) {


	// Determines which key was pressed, then makes it lowercase. Assigns it to variable "guess". 
    guess = String.fromCharCode(event.keyCode).toLowerCase();
   	
   	if(event.keyCode == 32 && gameStart === false){
        gameStart = true;
        document.getElementById("gameBegin").innerHTML = " ";
    } else if (gameOver === false && gameStart) {
   
   	game.checkLetter(guess);
   	game.fillWordArray(guess);
   	game.printWordArray();
   	game.printGuessesLeft();
   	game.printGuessArray();
   	console.log(wordArray);
   	console.log(guessArray);
   	game.checkWrongCount();
   	game.checkWin();

   }
}

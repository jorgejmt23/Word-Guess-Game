//have win variable be global from start game function to track wins
var wins = 0;

function start() {

	//make new game

	//my random words or phrases
	randomWordArr = ["yoda","chewbacca","wookie","r2-d2","c-3po","han+solo","luke+skywalker","darth+vader","light+saber","tatooine","jabba+the+hut","boba+fett","obi-wan+kenobi","qui-gon+jinn","leia+organa","padme+amidala","anakin+skywalker","dagobah"];
	randomWord = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];
	console.log(randomWord);

	//generate random music and play once game started
	var musicTracks = ["assets/audio/music/02_MainTitle_RebelBlockadeRunner.mp3","assets/audio/music/01_TheImperialMarch.mp3","assets/audio/music/03_AttackingAStarDestroyer.mp3","assets/audio/music/03_TheDroidsAreCaptured.mp3","assets/audio/music/04_YodaAndTheForce.mp3","assets/audio/music/06_TheAsteroidField.mp3","assets/audio/music/09_HanSoloAndThePrincess.mp3","assets/audio/music/12_CantinaBand2.mp3","assets/audio/music/20_TheWaysoftheForce.mp3"]
	var randomMusic = musicTracks[Math.floor(Math.random() * musicTracks.length)];
	console.log(randomMusic)
	music = document.getElementById('music');
	music.innerHTML = "<source src='" + randomMusic + "' type='audio/mpeg'>";
	music.load();
	music.play();


	//count guessable characters
	var searchDashes = "-"
	var searchAnds = "+"
	for(var i=countDashes=0; i<randomWord.length; countDashes+=+(searchDashes===randomWord[i++]));
	for(var i=countAnds=0; i<randomWord.length; countAnds+=+(searchAnds===randomWord[i++]));
	var answerLength = randomWord.length - countDashes - countAnds;

	var counter = 7;
	var win = 0;

	//set initial values
	document.getElementById("count").innerHTML = counter;
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("letters").innerHTML = [];

	//generate random lefthand image
	var stImages = ["assets/images/image1.jpg","assets/images/image2.gif","assets/images/image3.jpg","assets/images/image4.jpg","assets/images/image5.jpg"]
	var randSTImages = stImages[Math.floor(Math.random() * stImages.length)];
	document.getElementById('randImage').src = randSTImages;

	//replace random word with underscores (while keeping dashes and spaces)
	var answerArray = randomWord.split("");

	for (var i = 0; i < randomWord.length; i++) {
		if (answerArray[i] === "+") {
			answerArray[i] = "+";
		} else if (answerArray[i] == "-") {
			answerArray[i] = "-";
		}
		else {
			answerArray[i] = "_";
		}
	}
	document.getElementById("answer").innerHTML = answerArray.join(" ");

	
	var your_array = [];

	document.onkeydown = function (e) {
		var keyPress;
		//make array while ignoring duplicate characters
		if (typeof event !== 'undefined') {
		    keyPress = event.keyCode;
		}
		else if (e) {
			keyPress = e.which;
		}

		your_array.push(String.fromCharCode(keyPress));
			var uniq = your_array.reduce(function(a,b){
	    	if (a.indexOf(b) < 0 ) a.push(b);
	    	return a;
	  	},[]);

		//creating string of guessed words
		var lettersGuessedArrString = uniq.toString().toLowerCase();
		letterAns = uniq.toString().toLowerCase().replace(/,/g,"");
		var lettersGuessedArrEdited = lettersGuessedArrString.replace(/,/g,", ");
		document.getElementById("letters").innerHTML = lettersGuessedArrEdited;



		//Add keyboard listener
		document.onkeyup = function (event) {
			// console.log(event.key);
			var keyStroke=event.key;



			//variable for counting misses
			var test = false;

			//variable for counting hits
			var hits = 0;


			//if keystroke not used before, variable letter is passed through
			if (uniq.length === your_array.length) {
				var letter = keyStroke;
				console.log(uniq, your_array)
			}
			//if keystroke already used, remove last one used and set letter as empty
			if (uniq.length !== your_array.length) {
				your_array.pop();
				console.log(uniq, your_array);
				var letter = "";
				test = true;
			}

			//making loop checking letter value with random word array
			if (letter.length > 0) {
			console.log(letter)

				for (var j = 0; j < randomWord.length; j++) {
					if (letter === randomWord[j]) {
						answerArray[j] = letter;
						test = true;
						hits += 1;
					}
				}

			}



			var youWon = 0

			//add how many correct hits were met
			if (win < answerLength) {
					win += hits;
					document.getElementById("answer").innerHTML = answerArray.join(" ");
					// console.log("win:" + win)
					// console.log(answerLength)
			}
			if (win === answerLength) {
				//record a win
				youWon = 1;
				wins = wins + youWon;
				document.getElementById("answer").innerHTML = answerArray.join(" ");
				//have to set timer for last character to show before alert
				setTimeout(function(){
					var snd = new Audio("assets/audio/forcestrong.mp3"); // buffers automatically when created
					snd.play();
					alert("You Won!");
					reset();      
				}, 50);
			}

			//count misses and change "hangman" image state
			if (test == false) {
				if (counter <= 7 && counter >= 0) {
					counter--;
					
					document.getElementById("count").innerHTML = counter;

					if (counter === 6) {
						var snd = new Audio("assets/audio/lukeLearntheways.mp3"); // buffers automatically when created
						snd.play();
					};
					if (counter === 5) {
						var snd = new Audio("assets/audio/Chewie.mp3"); // buffers automatically when created
						snd.play();
					};
					if (counter === 4) {
						var snd = new Audio("assets/audio/jabba.mp3"); // buffers automatically when created
						snd.play();
					};
					if (counter === 3) {
						var snd = new Audio("assets/audio/yodaDoordonot.mp3"); // buffers automatically when created
						snd.play();
					};
					if (counter === 2) {
						var snd = new Audio("assets/audio/hansoloBadfeeling.mp3"); // buffers automatically when created
						snd.play();
					};
					if (counter === 1) {
						var snd = new Audio("assets/audio/c3poYourfault.mp3"); // buffers automatically when created
						snd.play();
					};
					if (counter === 0) {
						counter = 0;
						alert("You lost!");
					};
				};
			};

		};

	};

};

//reset goes back to start
function reset() {
	start();
};